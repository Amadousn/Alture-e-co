// Creates a partner: their row, their link, and (if they give a discount) their Stripe code.
// Test keys only unless ALLOW_LIVE=1.
// Run: node --env-file=.env scripts/affiliate-create.mjs <code> "<name>" <commission % or -> <discount % or -> [private]
//   e.g. node --env-file=.env scripts/affiliate-create.mjs sarah "Sarah" 20 15 private
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const [code, name, rate, discount, priv] = process.argv.slice(2);
if (!/^[a-z0-9-]{3,32}$/.test(code ?? "") || !name) throw new Error('Usage: <code> "<name>" <commission %|-> <discount %|-> [private]');
const key = process.env.STRIPE_SECRET_KEY ?? "";
if (!key.startsWith("sk_test_") && process.env.ALLOW_LIVE !== "1") throw new Error("Not a test key.");
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const api = new Stripe(key);
const pct = (v) => (v && v !== "-" ? Number(v) / 100 : null);
const commission = pct(rate), off = pct(discount);

let promotion = null;
if (off) {
    const coupon = await api.coupons.create({ percent_off: off * 100, duration: "once", name: `Partner ${code}`, metadata: { affiliate_code: code } });
    promotion = (await api.promotionCodes.create({ promotion: { type: "coupon", coupon: coupon.id }, code: code.toUpperCase(), metadata: { affiliate_code: code } })).id;
}
const { error } = await db.from("affiliates").insert({ code, name, commission_rate: commission, customer_discount: off, stripe_promotion_code: promotion, private: priv === "private" });
if (error) throw new Error(error.message);
console.log(`Partner ${name} created.`);
console.log(`Link: https://www.altureandco.com/r/${code}   (Education: /r/${code}?to=/education)`);
console.log(`Commission: ${commission === null ? "not set" : commission * 100 + " %"} · Customer discount: ${off ? off * 100 + " % with code " + code.toUpperCase() : "none"}`);
