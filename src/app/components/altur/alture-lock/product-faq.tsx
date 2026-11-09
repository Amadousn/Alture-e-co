"use client";

import { useState } from "react";

// The public FAQ on the AltureLock page. Every answer describes the product as it is today:
// read-only, alarms only, no orders, no promised results.
const FAQ: [string, string][] = [
    ["What is AltureLock?", "A trading terminal and a journal in one place. You set your rules before the trade, AltureLock checks them and sounds the alarm when one is broken, and every finished trade is recorded and reviewed in the journal."],
    ["Does AltureLock place or close trades for me?", "No. AltureLock is read-only. You place and close your trades on your exchange. AltureLock reads them, checks them against your rules and alerts you; the decision stays yours."],
    ["Which exchanges can I connect?", "Bybit, Binance, OKX, Bitget and Hyperliquid, with a read-only key. Trading, transfers and withdrawals stay off, so the key can only read your trades."],
    ["What happens when I break one of my rules?", "AltureLock sounds the alarm and shows which rule was broken, so you can check the chart. Rules on a candle close ask you to look; only a clear break of structure says the trade is no longer valid."],
    ["Can I use AltureLock without connecting an exchange?", "Yes. You can enter your trades by hand in the journal. The demo runs on a simulated account, with no account needed."],
    ["Does the AI tell me what to buy or sell?", "No. The market briefing summarises the news and what it may mean. It never gives a buy or sell signal."],
    ["Which TradingView plan do the indicators need?", "Volume Profile + Footprint and Order Flow CVD read TradingView's footprint data, so they need a Premium or Ultimate plan. Volume Profile + VWAP, Volume Profile + FVG + MS, Trend Lines and Range run on every plan."],
    ["Are the indicators included in AltureLock?", "Yes. The AltureLock plan includes Volume Profile + Footprint and Order Flow CVD. The free indicators are free for everyone."],
    ["Does AltureLock guarantee results?", "No. It helps you follow your own plan and see your trading clearly. It does not remove the risk of trading, and no win rate is promised."],
    ["How do I get access?", "AltureLock is offered by request. Send a request from the contact form and we will come back to you."],
];

const ProductFaq = () => {
    const [open, setOpen] = useState<number | null>(0);
    return (
        <section id="faq" className="scroll-mt-16 bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                        <p className="mb-5 text-[11px] uppercase tracking-[0.14em] text-accent">FAQ</p>
                        <h2 className="!text-3xl md:!text-[40px] md:!leading-[1.1] text-white">Common questions.</h2>
                    </div>
                    <ul className="lg:col-span-8 border-t border-white/10">
                        {FAQ.map(([q, a], i) => {
                            const expanded = open === i;
                            return (
                                <li key={q} className="border-b border-white/10">
                                    <button type="button" aria-expanded={expanded} aria-controls={`faq-${i}`} onClick={() => setOpen(expanded ? null : i)} className="flex w-full items-baseline justify-between gap-6 py-5 text-left">
                                        <span className={`text-[16px] md:text-[17px] font-medium transition-colors ${expanded ? "text-white" : "text-white/75 hover:text-white"}`}>{q}</span>
                                        <span aria-hidden="true" className={`flex-shrink-0 text-xl leading-none text-white/50 transition-transform duration-200 ${expanded ? "rotate-45" : ""}`}>+</span>
                                    </button>
                                    <div id={`faq-${i}`} className={`grid transition-[grid-template-rows] duration-300 ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                        <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-white/60">
                                            <span className="block pb-6">{a}</span>
                                        </p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ProductFaq;
