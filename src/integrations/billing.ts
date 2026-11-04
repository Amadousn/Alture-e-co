// The customer's plan, read from Stripe itself, so it is never a guess kept
// elsewhere. A customer's Stripe record carries their account id.

import Stripe from "stripe";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type PlanId = "free" | "journal" | "terminal" | "alturelock";
export type Interval = "monthly" | "yearly";

// Stripe's lookup keys, created once by scripts/stripe-setup.mjs.
export const priceKey = (plan: string, interval: Interval) => `alture_${plan}_${interval}`;
export const PAID = ["journal", "terminal", "alturelock"] as const;

export const stripe = () => {
    const key = process.env.STRIPE_SECRET_KEY;
    return key ? new Stripe(key) : null;
};

export async function signedInUser() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    const jar = await cookies();
    const client = createServerClient(url, key, {
        cookies: {
            getAll: () => jar.getAll(),
            setAll: (list) => {
                try {
                    list.forEach(({ name, value, options }) => jar.set(name, value, options));
                } catch {}
            },
        },
    });
    const { data } = await client.auth.getUser();
    return data.user;
}

export async function findCustomer(api: Stripe, userId: string, email: string) {
    const { data } = await api.customers.list({ email, limit: 20 });
    return data.find((customer) => customer.metadata.user_id === userId) ?? null;
}

// The plan a customer's live subscriptions give. Past-due keeps access while Stripe retries the card.
export async function planOf(api: Stripe, userId: string, email: string): Promise<PlanId> {
    const customer = await findCustomer(api, userId, email);
    if (!customer) return "free";
    const { data } = await api.subscriptions.list({ customer: customer.id, status: "all", limit: 20, expand: ["data.items.data.price"] });
    const keys = data.filter((sub) => ["active", "trialing", "past_due"].includes(sub.status)).flatMap((sub) => sub.items.data.map((item) => item.price.lookup_key ?? ""));
    if (keys.some((key) => /_alturelock_/.test(key))) return "alturelock";
    if (keys.some((key) => key.includes("_terminal_"))) return "terminal";
    if (keys.some((key) => key.includes("_journal_"))) return "journal";
    return "free";
}

// How many exchange accounts a plan may connect.
export const connectionLimit = (plan: PlanId) => (plan === "alturelock" ? Infinity : plan === "free" ? 0 : 1);

export const opensTerminal = (plan: PlanId) => plan === "terminal" || plan === "alturelock";

// Whether this visitor may open the Terminal. Only a customer account is limited: payments off and the owner's login stay open,
// and a moment when Stripe cannot be reached does not lock out someone who has paid.
export async function terminalAllowed() {
    const api = stripe();
    if (!api) return true;
    const user = await signedInUser();
    if (!user?.email) return true;
    try {
        return opensTerminal(await planOf(api, user.id, user.email));
    } catch {
        return true;
    }
}
