import { LOGIN_OPEN } from "@/utils/launch";
import { NextRequest, NextResponse } from "next/server";
import { ADAPTERS, ConnectionError } from "@/integrations/server";
import { unseal } from "@/integrations/vault";
import type { ProviderId } from "@/integrations/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const NO_STORE = { "Cache-Control": "no-store" };

// Reads the provider with the sealed credentials and returns journal-ready data.
export async function POST(req: NextRequest, { params }: { params: Promise<{ provider: string }> }) {
    if (!LOGIN_OPEN) return NextResponse.json({ error: "Access is not open yet." }, { status: 403 });
    const { provider } = await params;
    const adapter = ADAPTERS[provider as ProviderId];
    if (!adapter) return NextResponse.json({ error: "This provider has no connection yet." }, { status: 404, headers: NO_STORE });
    const origin = req.headers.get("origin");
    if (origin && origin !== req.nextUrl.origin) return NextResponse.json({ error: "Refused." }, { status: 403, headers: NO_STORE });

    const stored = await unseal(req.cookies.get(`al_conn_${provider}`)?.value);
    if (!stored) return NextResponse.json({ error: "Not connected.", failure: { message: "This connection is no longer active. Connect again.", retryable: false, reconnect: true } }, { status: 401, headers: NO_STORE });

    const body = (await req.json().catch(() => ({}))) as { since?: number };
    try {
        return NextResponse.json({ ok: true, syncedAt: Date.now(), ...(await adapter.sync(stored, Number(body?.since))) as object }, { headers: NO_STORE });
    } catch (error) {
        if (error instanceof ConnectionError) return NextResponse.json({ error: error.failure.message, failure: error.failure }, { status: error.status, headers: NO_STORE });
        return NextResponse.json({ error: "The sync failed. Try again.", failure: { message: "The sync failed. Try again.", retryable: true, reconnect: false } }, { status: 500, headers: NO_STORE });
    }
}
