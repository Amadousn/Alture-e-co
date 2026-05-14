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
    { symbol: "GOLD", value: "$2,750.80", change: "+0.3%", up: true },
    { symbol: "S&P 500", value: "5,890.20", change: "+0.8%", up: true },
    { symbol: "EUR/USD", value: "1.0845", change: "-0.1%", up: false },
    { symbol: "NASDAQ", value: "18,430.50", change: "+1.1%", up: true },
    { symbol: "OIL (WTI)", value: "$76.40", change: "+0.4%", up: true },
];

const REFRESH_MS = 5 * 60 * 1000;

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
        <div className="w-full bg-black/80 backdrop-blur-md border-t border-b border-white/5 overflow-hidden py-2 md:py-3 relative z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {displayedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-4 md:mx-8 space-x-2 md:space-x-3">
                        <span className="text-gray-400 font-bold tracking-widest text-[10px] md:text-xs">{item.symbol}</span>
                        <span className="text-white font-light text-xs md:text-sm">{item.value}</span>
                        <span className={`${item.up ? "text-green-400" : "text-red-400"} text-[10px] md:text-xs font-medium`}>
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
          animation: marquee 40s linear infinite;
        }
        @media (max-width: 768px) {
            .animate-marquee {
                animation: marquee 30s linear infinite;
            }
        }
      `}</style>
        </div>
    );
};

export default Ticker;
