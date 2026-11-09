"use client";

import { useState } from "react";

// The public FAQ on the AltureLock page. Every answer describes the product as it is today:
// read-only, alarms only, no orders, no promised results.
const GROUPS: { title: string; items: [string, string][] }[] = [
    {
        title: "AltureLock",
        items: [
            ["What is AltureLock?", "A trading terminal and a journal in one place. You set your rules before the trade, AltureLock checks them and sounds the alarm when one is broken, and every finished trade is recorded and reviewed in the journal."],
            ["Does AltureLock place or close trades for me?", "No. AltureLock is read-only. You place and close your trades on your exchange. AltureLock reads them, checks them against your rules and alerts you; the decision stays yours."],
            ["What are the pre-trade rules?", "Before you enter, AltureLock prepares the next trade with you: entry, stop loss, take profit, risk in dollars and in percent of your capital, and the ratio. Each rule stays pending until you confirm it. The stop loss can be set after the entry."],
            ["What happens when I break one of my rules?", "AltureLock sounds the alarm and shows which rule was broken, so you can check the chart. Rules on a candle close ask you to look; only a clear break of structure says the trade is no longer valid."],
            ["What do the V1 and V2 alarms mean?", "V1 is the exit signal, on a clear break of your structure. V2 is critical, when your risk is at stake: full screen and sound until you confirm you have seen it."],
            ["Which markets does the terminal show?", "Crypto, WTI and Brent crude oil, gold, silver, the Nasdaq 100 and the S&P 500, and crypto stocks, with live prices, news and the economic calendar."],
            ["Does the AI tell me what to buy or sell?", "No. The market briefing summarises the news and what it may mean. It never gives a buy or sell signal."],
            ["Does AltureLock guarantee results?", "No. It helps you follow your own plan and see your trading clearly. It does not remove the risk of trading, and no win rate is promised."],
        ],
    },
    {
        title: "Trading journal",
        items: [
            ["What does the journal record?", "Every finished trade: entry, exit, size, fees and result, shown on the real candles of the moment. You see your P&L calendar, your equity curve and your results by setup, day and session."],
            ["How do my trades get into the journal?", "With an exchange connected, your closed trades are imported automatically. Without one, you enter them by hand: instrument, direction, entry, exit and size."],
            ["Can I add notes and screenshots to a trade?", "Yes. Each trade has its notes, its setup and its screenshots, so you can see later what you saw at the time."],
            ["Can I review a trade on the chart?", "Yes. Open a trade and it is drawn on the real candles of that moment, with its entry, its exit, its stop loss and its take profit."],
            ["Does the journal include backtesting?", "Yes. You can replay real market history and test a setup before you trade it."],
        ],
    },
    {
        title: "Exchanges and your data",
        items: [
            ["Which exchanges can I connect?", "Bybit, Binance, OKX, Bitget and Hyperliquid, with a read-only key. Trading, transfers and withdrawals stay off, so the key can only read your trades."],
            ["Is a read-only key safe?", "A read-only key cannot place an order, move funds or withdraw. It only lets AltureLock read your trades and positions. Never create a key with trading or withdrawal rights for AltureLock."],
            ["Can I use AltureLock without connecting an exchange?", "Yes. You can enter your trades by hand in the journal. The demo runs on a simulated account, with no account needed."],
        ],
    },
    {
        title: "Indicators",
        items: [
            ["How do I find the indicators on TradingView?", "In TradingView, open Indicators and search for the name, for example \u201cRange \u00b7 Alture & Co\u201d. For a paid indicator, access is added to your TradingView username once you have subscribed; it then appears under Invite-only scripts."],
            ["How do I add an indicator to my chart?", "Click its name in the Indicators list and it is added to the chart you have open. Its settings open from the gear next to its name on the chart."],
            ["Which TradingView plan do the indicators need?", "Volume Profile + Footprint and Order Flow CVD read TradingView's footprint data, so they need a Premium or Ultimate plan. Volume Profile + VWAP, Volume Profile + FVG + MS, Trend Lines and Range run on every plan."],
            ["What is the difference between Footprint and VWAP?", "Volume Profile + Footprint reads every trade at the bid and the ask from TradingView's footprint. Volume Profile + VWAP rebuilds the buying and selling pressure from 1-minute data, so it runs on every plan."],
            ["Are the indicators included in AltureLock?", "Yes. The AltureLock plan includes Volume Profile + Footprint and Order Flow CVD. The free indicators are free for everyone."],
            ["Do the indicators work on any market?", "They run on any TradingView chart. The order flow ones need a market where TradingView has footprint data."],
        ],
    },
    {
        title: "Plans and access",
        items: [
            ["Is there a free plan?", "Yes. The free plan gives you the trading journal with your trades entered by hand, the P&L calendar, the equity curve and the analysis, with one strategy."],
            ["What is the difference between Journal, Terminal and AltureLock?", "Journal adds the automatic import from your exchange and unlimited strategies. Terminal gives you the pre-trade rules, the position size calculator, the live charts and the news. AltureLock includes both, plus the two premium indicators."],
            ["Can I pay yearly?", "Yes. Each paid plan has a yearly price, lower per month than the monthly one."],
            ["How do I get access?", "AltureLock is offered by request. Send a request from the contact form and we will come back to you."],
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
                                                        <span className="block pb-6">{a}</span>
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
