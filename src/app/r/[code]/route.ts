import { NextRequest, NextResponse } from "next/server";
import { admin, affiliateByCode, cleanCode, REF_COOKIE, REF_DAYS } from "@/integrations/affiliates";

// A partner's link: /r/<code>, optionally ?to=/education. Remembers the partner for 90 days,
// then the first payment ties the customer to them for life. An unknown code just goes on.
export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    const { code: raw } = await params;
    const to = req.nextUrl.searchParams.get("to") ?? "/alturelock";
    const target = /^\/[a-z0-9/_-]*$/i.test(to) && !to.startsWith("//") ? to : "/alturelock";
    const res = NextResponse.redirect(new URL(target, req.url));
    const code = cleanCode(raw);
    const db = admin();
    // A partner already remembered on this browser keeps the visitor.
    if (!req.cookies.get(REF_COOKIE)?.value && code && db && (await affiliateByCode(db, code))) {
        res.cookies.set(REF_COOKIE, code, { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: REF_DAYS * 86400, path: "/" });
    }
    return res;
}
