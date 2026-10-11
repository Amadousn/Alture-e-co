import { NextRequest, NextResponse } from "next/server";
import { DEMO_OPEN, LOGIN_OPEN } from "@/utils/launch";

// The real AltureLock workspace is for signed-in users. The product page needs
// no login. The demo and logging in open only when the owner opens them (see utils/launch).
const WORKSPACE = ["/alturelock/workspace", "/alturelock/rules", "/alturelock/journal", "/alturelock/connections", "/alturelock/settings", "/alturelock/help"];

export const config = {
    matcher: ["/alturelock/workspace", "/alturelock/rules", "/alturelock/journal", "/alturelock/connections", "/alturelock/settings", "/alturelock/help", "/alturelock/demo", "/alturelock/demo/:path*"],
};

type ProtectedRoute = {
    prefix: string;
    cookieName: string;
    secretEnv: string;
    loginPath: string;
    payload: string;
};

const PROTECTED_ROUTES: ProtectedRoute[] = WORKSPACE.map((prefix) => ({ prefix, cookieName: "alturelock_session", secretEnv: "ALTURELOCK_SESSION_SECRET", loginPath: "/alturelock/login", payload: "alturelock-session" }));

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
    const path = req.nextUrl.pathname;
    if (path === "/alturelock/demo" || path.startsWith("/alturelock/demo/")) {
        return DEMO_OPEN ? NextResponse.next() : NextResponse.redirect(new URL("/alturelock", req.url));
    }

    const route = PROTECTED_ROUTES.find((r) => path === r.prefix);
    if (!route) {
        return NextResponse.next();
    }
    // Until access begins nobody is let in, whatever their browser holds.
    if (!LOGIN_OPEN) {
        return NextResponse.redirect(new URL(route.loginPath, req.url));
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
