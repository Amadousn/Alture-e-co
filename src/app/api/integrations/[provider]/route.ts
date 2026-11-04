import { LOGIN_OPEN } from "@/utils/launch";
import { NextRequest, NextResponse } from "next/server";
import { ADAPTERS, ConnectionError } from "@/integrations/server";
import { vaultReady } from "@/integrations/vault";
import { readConnection, readOthers, removeConnection, slotOf, writeConnection } from "@/integrations/connection-store";
import type { ProviderId } from "@/integrations/types";

export const dynamic = "force-dynamic";

const NO_STORE = { "Cache-Control": "no-store" };
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
    const stored = await readConnection<never>(req, provider, slotOf(req)).catch(() => null);
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
        const slot = slotOf(req);
        for (const held of await readOthers<never>(req, provider, slot)) {
            const other = adapter.describe(held);
            if (other.keyHint === summary.keyHint && other.accountHint === summary.accountHint) {
                return NextResponse.json({ error: "This account is already connected.", failure: { message: "This account is already connected.", retryable: false, reconnect: true } }, { status: 409, headers: NO_STORE });
            }
        }
        const res = NextResponse.json({ connected: true, summary }, { headers: NO_STORE });
        await writeConnection(res, provider, slot, stored);
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
    try {
        await removeConnection(res, provider, slotOf(req));
    } catch {
        return NextResponse.json({ error: "The connection could not be removed. Try again." }, { status: 500, headers: NO_STORE });
    }
    return res;
}
