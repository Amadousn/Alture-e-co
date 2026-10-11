import { LOGIN_OPEN } from "@/utils/launch";
import { NextRequest, NextResponse } from "next/server";
import { BybitError, fetchJournalSnapshot } from "@/utils/bybit";

export const dynamic = "force-dynamic";

const DEFAULT_DAYS = 30;
const MAX_DAYS = 90;

async function computeSignature(secret: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode("alturelock-session"));
    return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Owner-only: the same session cookie that gates /alturelock. Account data
// never leaves the server for anyone who is not signed in.
async function isSignedIn(req: NextRequest): Promise<boolean> {
    const secret = process.env.ALTURELOCK_SESSION_SECRET;
    const cookie = req.cookies.get("alturelock_session")?.value;
    if (!secret || !cookie) return false;
    return cookie === (await computeSignature(secret));
}

export async function GET(req: NextRequest) {
    if (!LOGIN_OPEN) return NextResponse.json({ error: "Access is not open yet." }, { status: 403 });
    if (!(await isSignedIn(req))) {
        return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }

    const requested = Number(req.nextUrl.searchParams.get("days"));
    const days = Number.isFinite(requested) && requested > 0 ? Math.min(Math.floor(requested), MAX_DAYS) : DEFAULT_DAYS;

    try {
        const data = await fetchJournalSnapshot(days);
        return NextResponse.json({ ...data, days }, { headers: { "Cache-Control": "no-store" } });
    } catch (err) {
        if (err instanceof BybitError) {
            return NextResponse.json({ error: err.message }, { status: err.status });
        }
        return NextResponse.json({ error: "Could not reach Bybit." }, { status: 502 });
    }
}
