"use client";

// Chart screenshots attached to a trade. For a signed-in customer they live in
// their account (private Supabase storage, one folder per customer). Without an
// account they stay in this browser's IndexedDB, keyed by trade id. Each image is
// resized and re-encoded as JPEG before it is kept.

import { supabase } from "@/utils/supabase/client";

export type Shot = { id: string; src: string; addedAt: number };

const DB = "alturelock";
const STORE = "trade-shots";
const RECAP_STORE = "screenshots";
const BUCKET = "trade-shots";
const MAX = 1600;

// Both image stores share this database; version 2 makes sure each one exists.
export const openImages = () =>
    new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB, 2);
        request.onupgradeneeded = () => {
            for (const name of [STORE, RECAP_STORE]) if (!request.result.objectStoreNames.contains(name)) request.result.createObjectStore(name);
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

const run = async <T>(mode: IDBTransactionMode, act: (store: IDBObjectStore) => IDBRequest, name = STORE) => {
    const db = await openImages();
    return new Promise<T>((resolve, reject) => {
        const request = act(db.transaction(name, mode).objectStore(name));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
    });
};

// The account's folder for a trade, or null when nobody is signed in.
export const accountFolder = async (tradeId: string) => {
    const { data } = await supabase().auth.getUser();
    return data.user ? `${data.user.id}/${tradeId.replace(/[^\w-]/g, "_")}` : null;
};
export const imageBucket = () => supabase().storage.from(BUCKET);

const toBlob = (src: string) => fetch(src).then((res) => res.blob());
const toSrc = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });

const fileOf = (shot: Pick<Shot, "id" | "addedAt">) => `${shot.addedAt}_${shot.id}.jpg`;

const readCloud = async (folder: string): Promise<Shot[]> => {
    const { data, error } = await imageBucket().list(folder, { limit: 20 });
    if (error) throw error;
    const files = (data ?? []).filter((file) => /^\d+_.+\.jpg$/.test(file.name)).sort((a, b) => a.name.localeCompare(b.name));
    return Promise.all(
        files.map(async (file) => {
            const { data: blob, error: failed } = await imageBucket().download(`${folder}/${file.name}`);
            if (failed || !blob) throw failed ?? new Error("Image unavailable");
            const [addedAt, id] = file.name.replace(/\.jpg$/, "").split(/_(.+)/);
            return { id, addedAt: Number(addedAt), src: await toSrc(blob) };
        })
    );
};

const writeCloud = async (folder: string, shots: Shot[]) => {
    const { data, error } = await imageBucket().list(folder, { limit: 20 });
    if (error) throw error;
    const held = (data ?? []).map((file) => file.name).filter((name) => /^\d+_/.test(name));
    const wanted = shots.map(fileOf);
    for (const shot of shots) {
        if (held.includes(fileOf(shot))) continue;
        const { error: failed } = await imageBucket().upload(`${folder}/${fileOf(shot)}`, await toBlob(shot.src), { contentType: "image/jpeg" });
        if (failed) throw failed;
    }
    const gone = held.filter((name) => !wanted.includes(name)).map((name) => `${folder}/${name}`);
    if (gone.length) {
        const { error: failed } = await imageBucket().remove(gone);
        if (failed) throw failed;
    }
};

// A trade used to have one separate screenshot. It joins the trade's charts the first time they are read.
const adoptRecap = async (tradeId: string, folder: string | null, shots: Shot[]) => {
    let blob: Blob | undefined;
    if (folder) {
        const { data } = await imageBucket().list(folder, { search: "recap" });
        if (!data?.some((file) => file.name === "recap")) return shots;
        const { data: held, error } = await imageBucket().download(`${folder}/recap`);
        if (error) throw error;
        blob = held ?? undefined;
    } else blob = await run<Blob | undefined>("readonly", (store) => store.get(tradeId), RECAP_STORE);
    if (!blob) return shots;
    const next = [{ id: crypto.randomUUID(), src: await toSrc(blob), addedAt: 1 }, ...shots];
    await writeShots(tradeId, next);
    if (folder) await imageBucket().remove([`${folder}/recap`]);
    else await run("readwrite", (store) => store.delete(tradeId), RECAP_STORE);
    return next;
};

export const readShots = async (tradeId: string) => {
    const folder = await accountFolder(tradeId);
    const shots = folder ? await readCloud(folder) : (await run<Shot[] | undefined>("readonly", (store) => store.get(tradeId))) ?? [];
    return adoptRecap(tradeId, folder, shots);
};
export const writeShots = async (tradeId: string, shots: Shot[]) => {
    const folder = await accountFolder(tradeId);
    if (folder) return writeCloud(folder, shots);
    return run("readwrite", (store) => (shots.length ? store.put(shots, tradeId) : store.delete(tradeId)));
};

// Moves what this browser still holds into the account. Each image is deleted here
// only once it is safely up. Returns false if something could not be moved.
export const moveImagesToAccount = async () => {
    try {
        const keys = await run<IDBValidKey[]>("readonly", (store) => store.getAllKeys());
        for (const key of keys) {
            const tradeId = String(key);
            const folder = await accountFolder(tradeId);
            if (!folder) return false;
            const local = (await run<Shot[] | undefined>("readonly", (store) => store.get(key))) ?? [];
            await writeCloud(folder, [...(await readCloud(folder)), ...local.filter((shot) => shot.src)]);
            await run("readwrite", (store) => store.delete(key));
        }
        const recaps = await run<IDBValidKey[]>("readonly", (store) => store.getAllKeys(), RECAP_STORE);
        for (const key of recaps) {
            const folder = await accountFolder(String(key));
            if (!folder) return false;
            const blob = await run<Blob | undefined>("readonly", (store) => store.get(key), RECAP_STORE);
            if (blob) {
                const { error } = await imageBucket().upload(`${folder}/recap`, blob, { upsert: true, contentType: blob.type });
                if (error) throw error;
            }
            await run("readwrite", (store) => store.delete(key), RECAP_STORE);
        }
        return true;
    } catch {
        return false;
    }
};

export const compress = (file: Blob) =>
    new Promise<string>((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => {
            const scale = Math.min(1, MAX / Math.max(image.width, image.height));
            const canvas = document.createElement("canvas");
            canvas.width = Math.round(image.width * scale);
            canvas.height = Math.round(image.height * scale);
            canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
            URL.revokeObjectURL(url);
            resolve(canvas.toDataURL("image/jpeg", 0.85));
        };
        image.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error("Not an image"));
        };
        image.src = url;
    });
