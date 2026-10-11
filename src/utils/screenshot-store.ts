"use client";

// Chart screenshots attached to journal trades. They are kept in this
// browser's own database (IndexedDB), like the rest of the journal, because
// images are too large for the storage the trades themselves use.

const DB = "alturelock";
const STORE = "screenshots";

function open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB, 1);
        request.onupgradeneeded = () => request.result.createObjectStore(STORE);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function run<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const db = await open();
    return new Promise((resolve, reject) => {
        const request = action(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export const getScreenshot = (tradeId: string) => run<Blob | undefined>("readonly", (store) => store.get(tradeId));
export const removeScreenshot = (tradeId: string) => run("readwrite", (store) => store.delete(tradeId));

// Shrinks a large capture to a sensible size before keeping it.
export async function saveScreenshot(tradeId: string, file: File): Promise<Blob> {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("encode"))), "image/jpeg", 0.88));
    await run("readwrite", (store) => store.put(blob, tradeId));
    return blob;
}
