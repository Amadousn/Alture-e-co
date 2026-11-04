import { NextRequest, NextResponse } from "next/server";
import { findCustomer, signedInUser, stripe } from "@/integrations/billing";

const NO_STORE = { "Cache-Control": "no-store" };

// Stripe's own page to change card, change plan or cancel.
export async function POST(req: NextRequest) {
    const origin = req.headers.get("origin");
    if (origin && origin !== req.nextUrl.origin) return NextResponse.json({ error: "Refused." }, { status: 403, headers: NO_STORE });
    const api = stripe();
    const user = await signedInUser();
    if (!api || !user?.email) return NextResponse.json({ error: "Sign in first." }, { status: 401, headers: NO_STORE });
    try {
        const customer = await findCustomer(api, user.id, user.email);
        if (!customer) return NextResponse.json({ error: "No subscription yet." }, { status: 404, headers: NO_STORE });
        const session = await api.billingPortal.sessions.create({ customer: customer.id, return_url: `${req.nextUrl.origin}/alturelock/settings` });
        return NextResponse.json({ url: session.url }, { headers: NO_STORE });
    } catch {
        return NextResponse.json({ error: "The billing page could not be opened. Try again." }, { status: 502, headers: NO_STORE });
    }
}
