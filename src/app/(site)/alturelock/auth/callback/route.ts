import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Where the links in confirmation and password emails land. The templates send a
// token_hash, which works on any device; the code form only works in the browser
// that asked for the email, so it stays for links already sent.
export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get("code");
    const tokenHash = req.nextUrl.searchParams.get("token_hash");
    const type = req.nextUrl.searchParams.get("type");
    const reset = req.nextUrl.searchParams.get("reset") === "1" || type === "recovery";
    const res = NextResponse.redirect(new URL(reset ? "/alturelock/login?mode=reset" : "/alturelock/workspace", req.url));
    if (!code && !tokenHash) return NextResponse.redirect(new URL("/alturelock/login", req.url));
    const client = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
        cookies: {
            getAll: () => req.cookies.getAll(),
            setAll: (list) => list.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
        },
    });
    const { error } = tokenHash ? await client.auth.verifyOtp({ token_hash: tokenHash, type: type === "recovery" ? "recovery" : "email" }) : await client.auth.exchangeCodeForSession(code!);
    return error ? NextResponse.redirect(new URL("/alturelock/login?link=expired", req.url)) : res;
}
