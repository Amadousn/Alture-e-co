// Creates AltureLock's products and prices in the Stripe account of STRIPE_SECRET_KEY. Safe to run twice.
// Refuses a live key unless ALLOW_LIVE=1. Run: node --env-file=.env scripts/stripe-setup.mjs
import Stripe from "stripe";
const key = process.env.STRIPE_SECRET_KEY ?? "";
if (!key.startsWith("sk_test_") && process.env.ALLOW_LIVE !== "1") throw new Error("Not a test key.");
const api = new Stripe(key);
const PLANS = [
    ["journal", "AltureLock Journal", 39, 396],
    ["terminal", "AltureLock Terminal", 59, 600],
    ["alturelock", "AltureLock", 149, 1524],
];
for (const [id, name, monthly, yearly] of PLANS) {
    const found = (await api.products.search({ query: `metadata['plan']:'${id}'` })).data[0];
    const product = found ?? (await api.products.create({ name, metadata: { plan: id } }));
    for (const [interval, amount, every] of [["monthly", monthly, "month"], ["yearly", yearly, "year"]]) {
        const lookup = `alture_${id}_${interval}`;
        const held = (await api.prices.list({ lookup_keys: [lookup], limit: 1 })).data[0];
        if (held) {
            console.log(lookup, "exists", held.unit_amount / 100, held.currency);
            continue;
        }
        const price = await api.prices.create({ product: product.id, currency: "usd", unit_amount: amount * 100, recurring: { interval: every }, lookup_key: lookup });
        console.log(lookup, "created", price.unit_amount / 100, price.currency);
    }
}
