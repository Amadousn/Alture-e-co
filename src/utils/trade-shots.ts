"use client";

// Chart screenshots attached to a trade. Images are too large for localStorage,
// so they live in this browser's IndexedDB, keyed by trade id. Each image is
// resized and re-encoded as JPEG before it is kept.

export type Shot = { id: string; src: string; addedAt: number };

const DB = "alturelock";
const STORE = "trade-shots";
const MAX = 1600;

const open = () =>
    new Promise<IDBDatabase>((resolve, reject) => {
        const request = indexedDB.open(DB, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

const run = async <T>(mode: IDBTransactionMode, act: (store: IDBObjectStore) => IDBRequest) => {
    const db = await open();
    return new Promise<T>((resolve, reject) => {
        const request = act(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
    });
};

export const readShots = async (tradeId: string) => ((await run<Shot[] | undefined>("readonly", (store) => store.get(tradeId))) ?? []);
export const writeShots = (tradeId: string, shots: Shot[]) => run("readwrite", (store) => (shots.length ? store.put(shots, tradeId) : store.delete(tradeId)));

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
