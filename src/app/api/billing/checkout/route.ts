import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { admin, affiliateByCode, attribute, cleanCode, REF_COOKIE } from "@/integrations/affiliates";
import { findCustomer, Interval, PAID, planOf, priceKey, signedInUser, stripe } from "@/integrations/billing";

const NO_STORE = { "Cache-Control": "no-store" };
const fail = (error: string, status: number) => NextResponse.json({ error }, { status, headers: NO_STORE });

// Sends a signed-in customer to Stripe's own payment page. Card details never reach this site.
export async function POST(req: NextRequest) {
    const origin = req.headers.get("origin");
    if (origin && origin !== req.nextUrl.origin) return fail("Refused.", 403);
    const api = stripe();
    if (!api) return fail("Payments are not open yet.", 503);
    const user = await signedInUser();
    if (!user?.email) return fail("Sign in first.", 401);
    const body = (await req.json().catch(() => ({}))) as { plan?: string; interval?: string };
    const interval: Interval = body.interval === "yearly" ? "yearly" : "monthly";
    if (!(PAID as readonly string[]).includes(body.plan ?? "")) return fail("Unknown plan.", 400);
    try {
        if ((await planOf(api, user.id, user.email)) !== "free") return fail("You already have a plan. Change it from your billing page.", 409);
        const { data: prices } = await api.prices.list({ lookup_keys: [priceKey(body.plan!, interval)], active: true, limit: 1 });
        if (!prices[0]) return fail("This plan is not available.", 400);
        const customer = (await findCustomer(api, user.id, user.email)) ?? (await api.customers.create({ email: user.email, metadata: { user_id: user.id } }));
        // A partner's link ties this customer to the partner (the first one stays, for life),
        // and gives the partner's discount when they have one. Without a link, a code can be typed on Stripe's page.
        let promotion: string | null = null;
        const db = admin();
        const code = cleanCode((await cookies()).get(REF_COOKIE)?.value);
        if (db && code) {
            const partner = await affiliateByCode(db, code);
            if (partner) {
                const kept = await attribute(db, customer.id, partner.id, "link", user.id);
                if (kept === partner.id && partner.customer_discount && partner.stripe_promotion_code) promotion = partner.stripe_promotion_code;
            }
        }
        const session = await api.checkout.sessions.create({
            mode: "subscription",
            customer: customer.id,
            line_items: [{ price: prices[0].id, quantity: 1 }],
            ...(promotion ? { discounts: [{ promotion_code: promotion }] } : { allow_promotion_codes: true }),
            success_url: `${req.nextUrl.origin}/alturelock/settings?paid=1`,
            cancel_url: `${req.nextUrl.origin}/alturelock#pricing`,
        });
        return NextResponse.json({ url: session.url }, { headers: NO_STORE });
    } catch {
        return fail("The payment page could not be opened. Try again.", 502);
    }
}
