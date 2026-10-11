"use client";

import { useState } from "react";

// Every answer describes the workspace as it is built today. Where it does
// not do something (execute, monitor, sync), the answer says so.
const FAQ = [
    {
        q: "What is AltureLock?",
        a: "AltureLock is a trading workspace that helps you prepare trades, follow your predefined rules, manage active trades and review your performance.",
    },
    {
        q: "What is the Rules section?",
        a: "Rules is the guided trading workflow. It walks you through choosing an asset, planning your entry, stop loss and take profit on a chart, confirming you are ready, tracking the trade against your plan and reviewing the outcome.",
    },

    {
        q: "Does AltureLock execute trades automatically?",
        a: "No. AltureLock supports your trading workflow. You place and close trades with your own broker and record them here. It does not send orders, and it does not watch the market for you: prices and trade updates are the ones you enter.",
    },
    {
        q: "Can I customise my trading rules?",
        a: "Yes. In Settings you can rename, add and remove your rules. They appear as reminders under the readiness checks, and any rule you add yourself becomes its own check that can be required before a trade is ready.",
    },
    {
        q: "Is AltureLock the same as the Alture Indicator?",
        a: "No. AltureLock is the trading workspace and journal. The Alture Indicator is a separate TradingView product by Crypto Diva.",
    },
    {
        q: "Does AltureLock guarantee profitable trades?",
        a: "No. AltureLock is a tool for structuring and reviewing trading decisions. It does not guarantee results or remove trading risk.",
    },
    {
        q: "Where is my data saved?",
        a: "In this browser, on this device. Your trades, notes and rules are not sent to a server, so they will not appear on another device and are lost if you clear this browser's site data.",
    },
];

const AltureLockFaq = () => {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div>
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87] mb-4">Frequently asked questions</p>
            <div className="rounded-sm border border-white/15 divide-y divide-white/15 overflow-hidden">
                {FAQ.map((item, i) => {
                    const expanded = open === i;
                    return (
                        <div key={item.q} className="bg-black">
                            <button
                                type="button"
                                onClick={() => setOpen(expanded ? null : i)}
                                aria-expanded={expanded}
                                aria-controls={`alturelock-faq-${i}`}
                                className="w-full flex items-center justify-between gap-6 px-5 py-4 text-left hover:bg-[#0c0c0c] transition-colors"
                            >
                                <span className={`text-[15px] font-medium transition-colors ${expanded ? "text-accent" : "text-white"}`}>{item.q}</span>
                                <span className={`flex-shrink-0 text-lg leading-none transition-transform duration-200 ${expanded ? "rotate-45 text-accent" : "text-white/60"}`} aria-hidden="true">
                                    +
                                </span>
                            </button>
                            {expanded && (
                                <p id={`alturelock-faq-${i}`} className="px-5 pb-5 -mt-1 text-sm leading-relaxed text-[#9a9aa5] max-w-3xl">
                                    {item.a}
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AltureLockFaq;
