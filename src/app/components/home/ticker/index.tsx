"use client";
import React, { useEffect, useState } from "react";

type TickerItem = {
    symbol: string;
    value: string;
    change: string;
    up: boolean;
};

const FALLBACK_ITEMS: TickerItem[] = [
    { symbol: "BTC", value: "$98,432.10", change: "+2.4%", up: true },
    { symbol: "ETH", value: "$2,845.50", change: "+1.2%", up: true },
    { symbol: "SOL", value: "$324.15", change: "-0.5%", up: false },
    { symbol: "XRP", value: "$2.1500", change: "+0.9%", up: true },
    { symbol: "BNB", value: "$695.20", change: "+0.6%", up: true },
    { symbol: "DOGE", value: "$0.31500", change: "-1.1%", up: false },
];

const REFRESH_MS = 45 * 1000;

const Ticker = () => {
    const [tickerItems, setTickerItems] = useState<TickerItem[]>(FALLBACK_ITEMS);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/ticker", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (!cancelled && Array.isArray(data.items) && data.items.length > 0) {
                    setTickerItems(data.items);
                }
            } catch {
                // garde le fallback
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    const displayedItems = [...tickerItems, ...tickerItems, ...tickerItems];

    return (
        <div className="w-full bg-black/80 backdrop-blur-md border-t border-t-primary/40 border-b border-b-white/5 overflow-hidden py-2 md:py-3 relative z-20">
            <div className="ticker-scan absolute inset-y-0 w-24 md:w-40 bg-gradient-to-r from-transparent via-primary/10 to-transparent pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap relative z-10">
                {displayedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-4 md:mx-8 space-x-2 md:space-x-3">
                        <span className="text-primary/50 font-light tracking-widest text-[10px] md:text-xs">{item.symbol}</span>
                        <span className="text-white font-light text-xs md:text-sm" style={{ letterSpacing: "1px" }}>{item.value}</span>
                        <span className={`inline-flex items-center gap-1 font-light text-[10px] md:text-xs ${item.up ? "text-emerald-300/70" : "text-red-300/70"}`} style={{ letterSpacing: "0.75px" }}>
                            <svg
                                className="w-2 h-2 md:w-2.5 md:h-2.5"
                                viewBox="0 0 10 10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {item.up ? (
                                    <path d="M5 8.5V1.5M5 1.5L1.5 5M5 1.5L8.5 5" />
                                ) : (
                                    <path d="M5 1.5V8.5M5 8.5L1.5 5M5 8.5L8.5 5" />
                                )}
                            </svg>
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>

            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 100s linear infinite;
        }
        @media (max-width: 768px) {
            .animate-marquee {
                animation: marquee 70s linear infinite;
            }
        }
        @keyframes tickerScan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(500%); }
        }
        .ticker-scan {
          left: 0;
          animation: tickerScan 14s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Ticker;
