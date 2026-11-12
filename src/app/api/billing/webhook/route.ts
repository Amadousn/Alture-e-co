import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/integrations/billing";
import { admin, recordPayment, reverse } from "@/integrations/affiliates";

// Stripe tells this route about money that actually moved. Only signed events are read,
// and a commission exists only once a payment is confirmed.
export async function POST(req: NextRequest) {
    const api = stripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    const db = admin();
    if (!api || !secret || !db) return NextResponse.json({ error: "Not configured." }, { status: 503 });
    let event: Stripe.Event;
    try {
        event = api.webhooks.constructEvent(await req.text(), req.headers.get("stripe-signature") ?? "", secret);
    } catch {
        return NextResponse.json({ error: "Bad signature." }, { status: 400 });
    }
    try {
        if (event.type === "invoice.paid") {
            // Every subscription payment, the first and each renewal: partners earn on all of them, for life.
            const invoice = event.data.object as Stripe.Invoice;
            const customerId = typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id;
            if (customerId && invoice.id) {
                const full = await api.invoices.retrieve(invoice.id, { expand: ["discounts", "payments"] });
                const pi = full.payments?.data.find((p) => p.payment.type === "payment_intent")?.payment.payment_intent;
                await recordPayment(db, api, {
                    ref: `invoice:${invoice.id}`,
                    customerId,
                    paymentIntent: typeof pi === "string" ? pi : (pi?.id ?? null),
                    product: full.lines.data[0]?.description ?? "subscription",
                    amountPaid: full.amount_paid,
                    currency: full.currency,
                    discounts: full.discounts,
                });
            }
        } else if (event.type === "checkout.session.completed") {
            // One-time purchases (Alture Education). Subscriptions are counted by invoice.paid instead.
            const session = event.data.object as Stripe.Checkout.Session;
            const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id;
            if (session.mode === "payment" && session.payment_status === "paid" && customerId) {
                const full = await api.checkout.sessions.retrieve(session.id, { expand: ["total_details.breakdown.discounts.discount"] });
                const discounts = full.total_details?.breakdown?.discounts.map((d) => d.discount) ?? [];
                await recordPayment(db, api, {
                    ref: `checkout:${session.id}`,
                    customerId,
                    paymentIntent: typeof session.payment_intent === "string" ? session.payment_intent : (session.payment_intent?.id ?? null),
                    product: session.metadata?.product ?? "one-time",
                    amountPaid: session.amount_total ?? 0,
                    currency: session.currency ?? "usd",
                    discounts,
                });
            }
        } else if (event.type === "charge.refunded") {
            // Only refunds you decide to give. The commission is reduced in proportion.
            const charge = event.data.object as Stripe.Charge;
            const pi = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
            if (pi) await reverse(db, pi, charge.amount_refunded, charge.amount, "refunded");
        } else if (event.type === "charge.dispute.closed") {
            // A bank dispute the business lost: the money is gone, so is the commission.
            const dispute = event.data.object as Stripe.Dispute;
            const pi = typeof dispute.payment_intent === "string" ? dispute.payment_intent : dispute.payment_intent?.id;
            if (dispute.status === "lost" && pi) await reverse(db, pi, dispute.amount, dispute.amount, "dispute lost");
        }
    } catch {
        // Stripe retries a failed event; recording is safe to repeat.
        return NextResponse.json({ error: "Not recorded yet." }, { status: 500 });
    }
    return NextResponse.json({ received: true });
}
