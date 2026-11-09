"use client";

import { useState } from "react";

// The public FAQ on the AltureLock page. Every answer describes the product as it is today:
// read-only, alarms only, no orders, no promised results.
// Text in [brackets] is a placeholder waiting for confirmation: it is highlighted on the page
// and must be replaced before this is published.
const GROUPS: { title: string; items: [string, string][] }[] = [
    {
        title: "AltureLock",
        items: [
            ["What is AltureLock?", "A trading terminal and a journal in one place. You set your rules before the trade, AltureLock checks them and alerts you the moment one is broken, and every finished trade is recorded and reviewed in the journal."],
            ["Does AltureLock place or close trades for me?", "No. AltureLock is read-only. You place and close your trades on your exchange; AltureLock reads them, checks them against your rules and sounds the alarm. Every decision stays yours."],
            ["How is AltureLock different from a trading journal or TradingView alerts?", "A journal looks back at trades once they are closed. An alert watches a price. AltureLock covers the whole trade: your rules before the entry, alarms while the trade is open, and the review once it is closed, in one workspace."],
            ["Is AltureLock suitable for beginners?", "AltureLock is built for traders who already have a strategy and want to follow it with discipline. If you are starting out, Alture Education is the place to begin."],
            ["Does AltureLock guarantee results?", "No. It helps you follow your own plan and see your trading clearly. It does not remove the risk of trading, and no win rate is promised."],
        ],
    },
    {
        title: "Accounts and data",
        items: [
            ["Which exchanges can I connect, and is it safe?", "Bybit, Binance, OKX, Bitget and Hyperliquid, with a read-only API key. A read-only key cannot place an order, move funds or withdraw: it only lets AltureLock read your trades and positions. You can also use the journal without connecting an exchange, by entering your trades by hand."],
            ["Does AltureLock work with prop firm accounts?", "Prop firm accounts have not been tested with AltureLock yet, so we cannot confirm compatibility today. If you trade a prop firm account, tell us which platform you use before you request access."],
            ["What happens to my data?", "Your journal stays between you and your exchange. We have no access to it: we cannot see your trades, your notes or your results, and nobody at Alture & Co can open it. Your exchange key is read-only. The only things we keep are your email and your subscription, to run your account."],
            ["Does AltureLock work on a phone?", "The journal and your results work on a phone. The terminal is built as a desktop workspace and is best used on a computer."],
        ],
    },
    {
        title: "Indicators",
        items: [
            ["How do I find the Alture indicators on TradingView?", "In TradingView, open Indicators and search for the name, for example \u201cRange \u00b7 Alture & Co\u201d. For a paid indicator, send us your TradingView username after you subscribe: we add your access within 1 hour, and the indicator then appears under Invite-only scripts."],
            ["Which TradingView plan do the indicators need?", "Volume Profile + Footprint and Order Flow CVD read TradingView's footprint data, so they need a Premium or Ultimate plan. Volume Profile + VWAP, Volume Profile + FVG + MS, Trend Lines and Range run on every plan, and the last three are free."],
        ],
    },
    {
        title: "Payments and support",
        items: [
            ["How can I pay?", "Card and crypto payments are coming soon. Until then, AltureLock is offered by request: send a request from the contact form and we will come back to you."],
            ["Can I cancel at any time?", "Yes. You can cancel at any time, and you keep full access until the end of the period you have already paid for."],
            ["Do you offer refunds?", "On a yearly plan, if you cancel within the first month, we refund the yearly payment minus one month charged at the monthly price, not the discounted yearly rate."],
            ["How do I contact support?", "Write to contact@altureandco.com. We reply within 24 hours. Since we cannot see your journal, a screenshot of the problem helps us answer faster."],
        ],
    },
];

const ProductFaq = () => {
    const [open, setOpen] = useState<string | null>("0-0");
    return (
        <section id="faq" className="scroll-mt-16 bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="mb-5 text-[11px] uppercase tracking-[0.14em] text-accent">FAQ</p>
                        <h2 className="!text-3xl md:!text-[40px] md:!leading-[1.1] text-white">Common questions.</h2>
                    </div>
                    <div className="lg:col-span-8 space-y-12">
                        {GROUPS.map((group, g) => (
                            <div key={group.title}>
                                <p className="mb-3 text-[11px] uppercase tracking-[0.14em] text-white/40">{group.title}</p>
                                <ul className="border-t border-white/10">
                                    {group.items.map(([q, a], n) => {
                                        const i = `${g}-${n}`;
                                        const expanded = open === i;
                                        return (
                                            <li key={q} className="border-b border-white/10">
                                                <button type="button" aria-expanded={expanded} aria-controls={`faq-${i}`} onClick={() => setOpen(expanded ? null : i)} className="flex w-full items-baseline justify-between gap-6 py-5 text-left">
                                                    <span className={`text-[16px] md:text-[17px] font-medium transition-colors ${expanded ? "text-white" : "text-white/75 hover:text-white"}`}>{q}</span>
                                                    <span aria-hidden="true" className={`flex-shrink-0 text-xl leading-none text-white/50 transition-transform duration-200 ${expanded ? "rotate-45" : ""}`}>+</span>
                                                </button>
                                                <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                                    <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-white/60">
                                                        <span className="block pb-6">{a.split(/(\[[^\]]+\])/).map((part, k) => (part.startsWith("[") ? <mark key={k} className="rounded-sm bg-[#FACC15]/15 px-1 text-[#FACC15]">{part}</mark> : part))}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductFaq;
