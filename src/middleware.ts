import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/alturelock"],
};

type ProtectedRoute = {
    prefix: string;
    cookieName: string;
    secretEnv: string;
    loginPath: string;
    payload: string;
};

// /education is public: it's a presentation/pitch page, not gated content.
// The access form embedded on that page still sets education_session via
// /api/education-login, ready to gate the real member area once it exists.
const PROTECTED_ROUTES: ProtectedRoute[] = [
    { prefix: "/alturelock", cookieName: "alturelock_session", secretEnv: "ALTURELOCK_SESSION_SECRET", loginPath: "/alturelock/login", payload: "alturelock-session" },
];

async function computeSignature(secret: string, payload: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(req: NextRequest) {
    const route = PROTECTED_ROUTES.find((r) => req.nextUrl.pathname === r.prefix);
    if (!route) {
        return NextResponse.next();
    }

    const secret = process.env[route.secretEnv];
    const loginUrl = new URL(route.loginPath, req.url);

    if (!secret) {
        return NextResponse.redirect(loginUrl);
    }

    const cookie = req.cookies.get(route.cookieName)?.value;
    if (!cookie) {
        return NextResponse.redirect(loginUrl);
    }

    const expected = await computeSignature(secret, route.payload);
    if (cookie !== expected) {
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}
