// Where a connection's sealed credentials live. A signed-in customer's are in
// their account, so they follow them to any device. Each row is sealed together
// with its owner's id, so a row copied to another account does not open.
// Without a customer account (the owner's login), they stay in the HttpOnly cookie.

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { seal, unseal } from "./vault";

const TABLE = "exchange_connections";
export const COOKIE = { httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/api/integrations", maxAge: 90 * 24 * 60 * 60 };
export const slotOf = (req: NextRequest) => {
    const slot = req.nextUrl.searchParams.get("slot") ?? "";
    return /^[a-z0-9]{1,8}$/.test(slot) ? slot : "";
};
const cookieName = (provider: string, slot = "") => `al_conn_${provider}${slot ? `_${slot}` : ""}`;

async function account() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const jar = await cookies();
    const client = createServerClient(url, key, {
        cookies: {
            getAll: () => jar.getAll(),
            setAll: (list) => {
                try {
                    list.forEach(({ name, value, options }) => jar.set(name, value, options));
                } catch {}
            },
        },
    });
    const { data } = await client.auth.getUser();
    return data.user ? { client, userId: data.user.id } : null;
}

const openRow = async <T>(sealed: string, userId: string) => {
    const row = await unseal<{ owner: string; stored: T }>(sealed);
    return row && row.owner === userId ? row.stored : null;
};

export async function readConnection<T>(req: NextRequest, provider: string, slot: string): Promise<T | null> {
    const me = await account();
    if (!me) return unseal<T>(req.cookies.get(cookieName(provider, slot))?.value);
    const { data, error } = await me.client.from(TABLE).select("sealed").eq("provider", provider).eq("slot", slot).maybeSingle();
    if (error) throw new Error("Connections could not be read.");
    return data ? openRow<T>(data.sealed, me.userId) : null;
}

// The provider's other accounts of this customer, to refuse the same one twice.
export async function readOthers<T>(req: NextRequest, provider: string, slot: string): Promise<T[]> {
    const me = await account();
    if (!me) {
        const base = cookieName(provider);
        const names = req.cookies.getAll().map((cookie) => cookie.name).filter((name) => (name === base || name.startsWith(`${base}_`)) && name !== cookieName(provider, slot));
        const held = await Promise.all(names.map((name) => unseal<T>(req.cookies.get(name)?.value)));
        return held.filter((item): item is NonNullable<typeof item> => item !== null) as T[];
    }
    const { data, error } = await me.client.from(TABLE).select("sealed").eq("provider", provider).neq("slot", slot);
    if (error) throw new Error("Connections could not be read.");
    const held = await Promise.all((data ?? []).map((row) => openRow<T>(row.sealed, me.userId)));
    return held.filter((item): item is NonNullable<typeof item> => item !== null) as T[];
}

export async function writeConnection(res: NextResponse, provider: string, slot: string, stored: unknown) {
    const me = await account();
    if (!me) return void res.cookies.set(cookieName(provider, slot), await seal(stored), COOKIE);
    const { error } = await me.client.from(TABLE).upsert({ user_id: me.userId, provider, slot, sealed: await seal({ owner: me.userId, stored }), updated_at: new Date().toISOString() });
    if (error) throw new Error("The connection could not be saved.");
}

export async function removeConnection(res: NextResponse, provider: string, slot: string) {
    const me = await account();
    if (!me) return void res.cookies.set(cookieName(provider, slot), "", { ...COOKIE, maxAge: 0 });
    const { error } = await me.client.from(TABLE).delete().eq("provider", provider).eq("slot", slot);
    if (error) throw new Error("The connection could not be removed.");
}
