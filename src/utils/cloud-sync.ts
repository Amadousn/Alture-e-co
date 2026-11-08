"use client";

import { hasAccounts, supabase } from "@/utils/supabase/client";
import { moveImagesToAccount } from "@/utils/trade-shots";

// Keeps a signed-in customer's workspace in their account. localStorage stays the
// working copy, so pages behave as before and survive a lost connection; values not
// yet saved are remembered and sent on the next visit. Last write wins, per value.
// Screenshots go to the account's private storage (see utils/trade-shots).

const OWNER = "alturelock:account";
const UNSYNCED = "alturelock:unsynced";

let userId: string | null = null;
let started: Promise<void> | null = null;
const timers = new Map<string, ReturnType<typeof setTimeout>>();

const unsynced = (): string[] => {
    try {
        return JSON.parse(localStorage.getItem(UNSYNCED) ?? "[]");
    } catch {
        return [];
    }
};
const mark = (key: string, on: boolean) => {
    const rest = unsynced().filter((k) => k !== key);
    localStorage.setItem(UNSYNCED, JSON.stringify(on ? [...rest, key] : rest));
};

const push = async (key: string) => {
    const raw = localStorage.getItem(key);
    if (!userId || raw === null) return;
    const { error } = await supabase().from("workspace_data").upsert({ user_id: userId, key, value: JSON.parse(raw), updated_at: new Date().toISOString() });
    if (!error) mark(key, false);
};

// Called after every local save. Does nothing until the account's copy has been read,
// so a value written while a page loads can never replace what the account holds.
export const queuePush = (key: string) => {
    if (!userId) return;
    mark(key, true);
    clearTimeout(timers.get(key));
    timers.set(key, setTimeout(() => void push(key), 800));
};

const wipe = (keys: string[], images = true) => {
    keys.forEach((key) => localStorage.removeItem(key));
    localStorage.removeItem(UNSYNCED);
    // Screenshots belong to whoever used this browser before.
    if (images) indexedDB.deleteDatabase("alturelock");
};

export const startSync = (keys: string[], changeEvent: string) =>
    (started ??= (async () => {
        if (!hasAccounts) return;
        const { data } = await supabase().auth.getUser();
        const id = data.user?.id;
        if (!id) return;
        const previous = localStorage.getItem(OWNER);
        if (previous && previous !== id) wipe(keys);
        const { data: rows, error } = await supabase().from("workspace_data").select("key, value");
        if (error || !rows) return; // Unreachable: keep working locally, nothing is pushed over the account.
        localStorage.setItem(OWNER, id);
        const pending = unsynced();
        const held = new Set(rows.map((row) => row.key));
        for (const row of rows) {
            if (!keys.includes(row.key) || pending.includes(row.key)) continue;
            localStorage.setItem(row.key, JSON.stringify(row.value));
            window.dispatchEvent(new CustomEvent(changeEvent, { detail: row.key }));
        }
        userId = id;
        // Unsaved changes, and on a first sign-in whatever this browser already held.
        await Promise.all(keys.filter((key) => pending.includes(key) || (!held.has(key) && localStorage.getItem(key) !== null)).map(push));
        await moveImagesToAccount();
    })());

// Signing out leaves nothing of this customer in the browser, after saving what is pending.
export const endSync = async (keys: string[]) => {
    timers.forEach(clearTimeout);
    timers.clear();
    await Promise.all(unsynced().map(push));
    // An image that could not be sent stays in this browser rather than being lost.
    const moved = await moveImagesToAccount();
    if (hasAccounts) await supabase().auth.signOut();
    userId = null;
    started = null;
    wipe(keys, moved);
    localStorage.removeItem(OWNER);
};
