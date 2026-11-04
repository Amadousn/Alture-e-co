import { NextResponse } from "next/server";
import { connectionLimit, planOf, signedInUser, stripe } from "@/integrations/billing";

const NO_STORE = { "Cache-Control": "no-store" };

// The signed-in customer's plan. "enforced: false" means no plan applies: payments are off, or this is not a customer account.
export async function GET() {
    const api = stripe();
    const user = await signedInUser();
    if (!api || !user?.email) return NextResponse.json({ enforced: false }, { headers: NO_STORE });
    try {
        const plan = await planOf(api, user.id, user.email);
        const limit = connectionLimit(plan);
        return NextResponse.json({ enforced: true, plan, connections: limit === Infinity ? null : limit }, { headers: NO_STORE });
    } catch {
        return NextResponse.json({ error: "The plan could not be read." }, { status: 502, headers: NO_STORE });
    }
}
