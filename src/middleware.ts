import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/alturelock"],
};

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

export async function middleware(req: NextRequest) {
    const secret = process.env.ALTURELOCK_SESSION_SECRET;
    const loginUrl = new URL("/alturelock/login", req.url);

    if (!secret) {
        return NextResponse.redirect(loginUrl);
    }

    const cookie = req.cookies.get("alturelock_session")?.value;
    if (!cookie) {
        return NextResponse.redirect(loginUrl);
    }

    const expected = await computeSignature(secret);
    if (cookie !== expected) {
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
