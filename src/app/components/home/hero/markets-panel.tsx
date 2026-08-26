"use client";

import { useEffect, useState } from "react";

type MarketItem = {
    symbol: string;
    price: number;
    prevClose: number;
    decimals: number;
};

const INITIAL_MARKETS: MarketItem[] = [
    { symbol: "SPX", price: 5880.25, prevClose: 5872.10, decimals: 2 },
    { symbol: "NASDAQ", price: 19420.50, prevClose: 19390.75, decimals: 2 },
    { symbol: "GOLD", price: 2385.40, prevClose: 2379.80, decimals: 2 },
    { symbol: "OIL", price: 78.65, prevClose: 79.05, decimals: 2 },
];

const DRIFT_MS = 45 * 1000;

function driftPrice(price: number): number {
    const changePct = (Math.random() - 0.5) * 0.003;
    return price * (1 + changePct);
}

const MarketsPanel = () => {
    const [markets, setMarkets] = useState<MarketItem[]>(INITIAL_MARKETS);

    useEffect(() => {
        const id = setInterval(() => {
            setMarkets((current) => current.map((m) => ({ ...m, price: driftPrice(m.price) })));
        }, DRIFT_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="border-l border-white/10 pl-4 md:pl-5">
            <p className="text-primary/50 font-light tracking-[0.2em] text-[10px] md:text-xs mb-3 md:mb-4 uppercase">
                Markets
            </p>
            <div className="space-y-2.5 md:space-y-3">
                {markets.map((m) => {
                    const changePct = ((m.price - m.prevClose) / m.prevClose) * 100;
                    const up = changePct >= 0;
                    return (
                        <div key={m.symbol} className="flex items-center justify-between gap-3 md:gap-4">
                            <span className="text-white/60 font-light tracking-widest text-[10px] md:text-xs">{m.symbol}</span>
                            <div className="flex items-center gap-2 md:gap-3">
                                <span className="text-white font-light text-xs md:text-sm" style={{ letterSpacing: "0.5px" }}>
                                    {m.price.toLocaleString(undefined, { minimumFractionDigits: m.decimals, maximumFractionDigits: m.decimals })}
                                </span>
                                <span className={`inline-flex items-center gap-1 font-light text-[10px] md:text-xs ${up ? "text-emerald-300/70" : "text-red-300/70"}`} style={{ letterSpacing: "0.5px" }}>
                                    <svg
                                        className="w-2 h-2 md:w-2.5 md:h-2.5"
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={1.5}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {up ? (
                                            <path d="M5 8.5V1.5M5 1.5L1.5 5M5 1.5L8.5 5" />
                                        ) : (
                                            <path d="M5 1.5V8.5M5 8.5L1.5 5M5 8.5L8.5 5" />
                                        )}
                                    </svg>
                                    {up ? "+" : ""}{changePct.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MarketsPanel;
