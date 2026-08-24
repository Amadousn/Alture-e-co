import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
    let body: { username?: string; password?: string };
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const validUsername = process.env.ALTURELOCK_USERNAME;
    const validPassword = process.env.ALTURELOCK_PASSWORD;
    const secret = process.env.ALTURELOCK_SESSION_SECRET;

    if (!validUsername || !validPassword || !secret) {
        return NextResponse.json({ error: "Sign in is not configured yet." }, { status: 500 });
    }

    if (body.username !== validUsername || body.password !== validPassword) {
        return NextResponse.json({ error: "Incorrect username or password." }, { status: 401 });
    }

    const token = await computeSignature(secret);
    const res = NextResponse.json({ ok: true });
    res.cookies.set("alturelock_session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
    return res;
}
