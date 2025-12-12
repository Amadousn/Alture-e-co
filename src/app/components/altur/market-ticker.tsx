"use client";

import React from 'react';

// Mock data for the ticker
const MARKET_DATA = [
    { symbol: "S&P 500", value: "4,783.45", change: "+0.54%", isUp: true },
    { symbol: "NASDAQ", value: "15,055.65", change: "+0.89%", isUp: true },
    { symbol: "DOW JONES", value: "37,689.54", change: "-0.12%", isUp: false },
    { symbol: "FTSE 100", value: "7,689.61", change: "+0.14%", isUp: true },
    { symbol: "DAX", value: "16,751.64", change: "+0.33%", isUp: true },
    { symbol: "CAC 40", value: "7,543.18", change: "-0.05%", isUp: false },
    { symbol: "NIKKEI 225", value: "33,377.42", change: "+0.78%", isUp: true },
    { symbol: "GOLD", value: "2,062.90", change: "+0.24%", isUp: true },
    { symbol: "OIL (WTI)", value: "71.65", change: "-0.87%", isUp: false },
    { symbol: "BTC/USD", value: "45,231.00", change: "+3.45%", isUp: true },
    { symbol: "ETH/USD", value: "2,389.15", change: "+2.12%", isUp: true },
    { symbol: "EUR/USD", value: "1.1045", change: "-0.08%", isUp: false },
];

const MarketTicker = () => {
    return (
        <div
            className="w-full bg-black border-y border-primary/20 overflow-hidden py-3 relative z-30"
            suppressHydrationWarning={true}
        >
            {/* Gradient masks for smooth fade effect at edges */}
            <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div className="flex animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
                {/* First set of items */}
                <div className="flex items-center gap-12 px-6">
                    {MARKET_DATA.map((item, index) => (
                        <div key={`ticker-1-${index}`} className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-white tracking-wider">
                                {item.symbol}
                            </span>
                            <span className="font-mono text-sm text-gray">
                                {item.value}
                            </span>
                            <span className={`font-mono text-xs font-medium flex items-center ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {item.isUp ? '▲' : '▼'} {item.change}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Duplicated set for seamless loop */}
                <div className="flex items-center gap-12 px-6">
                    {MARKET_DATA.map((item, index) => (
                        <div key={`ticker-2-${index}`} className="flex items-center gap-3">
                            <span className="font-mono text-sm font-bold text-white tracking-wider">
                                {item.symbol}
                            </span>
                            <span className="font-mono text-sm text-gray">
                                {item.value}
                            </span>
                            <span className={`font-mono text-xs font-medium flex items-center ${item.isUp ? 'text-green-500' : 'text-red-500'}`}>
                                {item.isUp ? '▲' : '▼'} {item.change}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MarketTicker;
