// Referrals: who brought a customer, and what each confirmed payment owes them.
// Server only. Uses the service role, so it must never be imported by a client component.

import Stripe from "stripe";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export const REF_COOKIE = "alture_ref";
export const REF_DAYS = 90;

export type Affiliate = {
    id: string;
    code: string;
    commission_rate: number | null;
    customer_discount: number | null;
    stripe_promotion_code: string | null;
    active: boolean;
};

export const admin = (): SupabaseClient | null => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
};

export const cleanCode = (raw: string | undefined | null) => {
    const code = (raw ?? "").trim().toLowerCase();
    return /^[a-z0-9-]{3,32}$/.test(code) ? code : null;
};

export async function affiliateByCode(db: SupabaseClient, code: string) {
    const { data } = await db.from("affiliates").select("id, code, commission_rate, customer_discount, stripe_promotion_code, active").eq("code", code).eq("active", true).maybeSingle();
    return (data as Affiliate | null) ?? null;
}

async function affiliateById(db: SupabaseClient, id: string) {
    const { data } = await db.from("affiliates").select("id, code, commission_rate, customer_discount, stripe_promotion_code, active").eq("id", id).maybeSingle();
    return (data as Affiliate | null) ?? null;
}

// Records the partner for this customer if they have none yet. The first partner stays, for life.
export async function attribute(db: SupabaseClient, customerId: string, affiliateId: string, source: "link" | "code", userId?: string) {
    await db.from("referrals").upsert({ stripe_customer_id: customerId, affiliate_id: affiliateId, source, user_id: userId ?? null }, { onConflict: "stripe_customer_id", ignoreDuplicates: true });
    const { data } = await db.from("referrals").select("affiliate_id").eq("stripe_customer_id", customerId).maybeSingle();
    return (data?.affiliate_id as string | undefined) ?? null;
}

// The partner of a customer: their referral, or the partner behind a promotion code used on this payment.
async function partnerFor(db: SupabaseClient, api: Stripe, customerId: string, discounts: (string | Stripe.Discount | Stripe.DeletedDiscount)[]) {
    const { data } = await db.from("referrals").select("affiliate_id").eq("stripe_customer_id", customerId).maybeSingle();
    if (data?.affiliate_id) return affiliateById(db, data.affiliate_id as string);
    for (const d of discounts) {
        const discount = typeof d === "string" ? null : d;
        const promo = discount?.promotion_code;
        const promoId = typeof promo === "string" ? promo : promo?.id;
        if (!promoId) continue;
        const { data: found } = await db.from("affiliates").select("id").eq("stripe_promotion_code", promoId).maybeSingle();
        if (found?.id) {
            const kept = await attribute(db, customerId, found.id as string, "code");
            return kept ? affiliateById(db, kept) : null;
        }
    }
    void api;
    return null;
}

// One commission per confirmed payment. The rate is the partner's rate at the time of payment.
export async function recordPayment(
    db: SupabaseClient,
    api: Stripe,
    p: { ref: string; customerId: string; paymentIntent: string | null; product: string; amountPaid: number; currency: string; discounts: (string | Stripe.Discount | Stripe.DeletedDiscount)[] },
) {
    if (p.amountPaid <= 0) return "nothing paid";
    const partner = await partnerFor(db, api, p.customerId, p.discounts);
    if (!partner) return "no partner";
    if (partner.commission_rate === null) return "rate not set";
    const commission = Math.round(p.amountPaid * Number(partner.commission_rate));
    const { error } = await db.from("commissions").insert({
        affiliate_id: partner.id,
        stripe_customer_id: p.customerId,
        payment_ref: p.ref,
        payment_intent: p.paymentIntent,
        product: p.product,
        amount_paid: p.amountPaid,
        currency: p.currency,
        rate: partner.commission_rate,
        commission,
    });
    if (error?.code === "23505") return "already recorded";
    if (error) throw new Error(error.message);
    return "recorded";
}

// Money returned to the customer (a refund you chose to give, or a lost bank dispute): the commission follows it.
export async function reverse(db: SupabaseClient, paymentIntent: string, returned: number, total: number, note: string) {
    const { data } = await db.from("commissions").select("id, commission, status").eq("payment_intent", paymentIntent);
    for (const row of data ?? []) {
        const back = total > 0 ? Math.min(row.commission as number, Math.round(((row.commission as number) * returned) / total)) : (row.commission as number);
        // A commission already paid out stays "paid": the amount taken back is deducted from the next payout.
        const status = row.status === "paid" ? "paid" : back >= (row.commission as number) ? "reversed" : "earned";
        await db.from("commissions").update({ reversed_amount: back, status, note }).eq("id", row.id);
    }
}
