import { LOGIN_OPEN } from "@/utils/launch";
import { NextRequest, NextResponse } from "next/server";
import { ADAPTERS, ConnectionError } from "@/integrations/server";
import { seal, unseal, vaultReady } from "@/integrations/vault";
import type { ProviderId } from "@/integrations/types";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
// One cookie per account: the first account of a provider has no slot, each further one has its own.
const slotOf = (req: NextRequest) => {
    const slot = req.nextUrl.searchParams.get("slot") ?? "";
    return /^[a-z0-9]{1,8}$/.test(slot) ? slot : "";
};
const cookieName = (provider: string, slot = "") => `al_conn_${provider}${slot ? `_${slot}` : ""}`;
const COOKIE = { httpOnly: true, sameSite: "strict" as const, secure: process.env.NODE_ENV === "production", path: "/api/integrations", maxAge: 90 * 24 * 60 * 60 };

// Requests that change or use a connection must come from this site's own pages.
function sameOrigin(req: NextRequest) {
    const origin = req.headers.get("origin");
    return !origin || origin === req.nextUrl.origin;
}

const unknown = () => NextResponse.json({ error: "This provider has no connection yet." }, { status: 404, headers: NO_STORE });
const notConfigured = () => NextResponse.json({ error: "Connections are not switched on for this site yet." }, { status: 503, headers: NO_STORE });

type Context = { params: Promise<{ provider: string }> };

// Status only: never returns a key or a secret.
export async function GET(req: NextRequest, { params }: Context) {
    if (!LOGIN_OPEN) return NextResponse.json({ error: "Access is not open yet." }, { status: 403 });
    const { provider } = await params;
    const adapter = ADAPTERS[provider as ProviderId];
    if (!adapter) return unknown();
    if (!vaultReady()) return NextResponse.json({ connected: false, available: false }, { headers: NO_STORE });
    const stored = await unseal(req.cookies.get(cookieName(provider, slotOf(req)))?.value);
    return NextResponse.json(stored ? { connected: true, available: true, summary: adapter.describe(stored) } : { connected: false, available: true }, { headers: NO_STORE });
}

export async function POST(req: NextRequest, { params }: Context) {
    if (!LOGIN_OPEN) return NextResponse.json({ error: "Access is not open yet." }, { status: 403 });
    const { provider } = await params;
    const adapter = ADAPTERS[provider as ProviderId];
    if (!adapter) return unknown();
    if (!vaultReady()) return notConfigured();
    if (!sameOrigin(req)) return NextResponse.json({ error: "Refused." }, { status: 403, headers: NO_STORE });
    try {
        const { stored, summary } = await adapter.connect(await req.json().catch(() => null));
        // The same account twice would count every trade twice.
        const name = cookieName(provider, slotOf(req));
        for (const cookie of req.cookies.getAll()) {
            if (cookie.name === name || (cookie.name !== cookieName(provider) && !cookie.name.startsWith(`${cookieName(provider)}_`))) continue;
            const held = await unseal(cookie.value);
            const other = held ? adapter.describe(held) : null;
            if (other && other.keyHint === summary.keyHint && other.accountHint === summary.accountHint) {
                return NextResponse.json({ error: "This account is already connected.", failure: { message: "This account is already connected.", retryable: false, reconnect: true } }, { status: 409, headers: NO_STORE });
            }
        }
        const res = NextResponse.json({ connected: true, summary }, { headers: NO_STORE });
        res.cookies.set(name, await seal(stored), COOKIE);
        return res;
    } catch (error) {
        if (error instanceof ConnectionError) return NextResponse.json({ error: error.failure.message, failure: error.failure }, { status: error.status, headers: NO_STORE });
        return NextResponse.json({ error: "The connection could not be made. Try again." }, { status: 500, headers: NO_STORE });
    }
}

export async function DELETE(req: NextRequest, { params }: Context) {
    if (!LOGIN_OPEN) return NextResponse.json({ error: "Access is not open yet." }, { status: 403 });
    const { provider } = await params;
    if (!ADAPTERS[provider as ProviderId]) return unknown();
    if (!sameOrigin(req)) return NextResponse.json({ error: "Refused." }, { status: 403, headers: NO_STORE });
    const res = NextResponse.json({ connected: false }, { headers: NO_STORE });
    res.cookies.set(cookieName(provider, slotOf(req)), "", { ...COOKIE, maxAge: 0 });
    return res;
}
