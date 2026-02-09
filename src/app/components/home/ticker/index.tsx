"use client";
import React from "react";
// We'll use a simple CSS animation for the marquee if no library is preferred, 
// but to ensure smoothness without extra deps, let's use a standard CSS keyframe approach.

const Ticker = () => {
    const tickerItems = [
        { symbol: "BTC", value: "$98,432.10", change: "+2.4%", up: true },
        { symbol: "ETH", value: "$2,845.50", change: "+1.2%", up: true },
        { symbol: "SOL", value: "$324.15", change: "-0.5%", up: false },
        { symbol: "GOLD", value: "$2,750.80", change: "+0.3%", up: true },
        { symbol: "S&P 500", value: "5,890.20", change: "+0.8%", up: true },
        { symbol: "EUR/USD", value: "1.0845", change: "-0.1%", up: false },
        { symbol: "NASDAQ", value: "18,430.50", change: "+1.1%", up: true },
        { symbol: "OIL (WTI)", value: "$76.40", change: "+0.4%", up: true },
    ];

    // Duplicate items for seamless infinite scroll
    const displayedItems = [...tickerItems, ...tickerItems, ...tickerItems];

    return (
        <div className="w-full bg-black/80 backdrop-blur-md border-t border-b border-white/5 overflow-hidden py-3 relative z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {displayedItems.map((item, index) => (
                    <div key={index} className="flex items-center mx-8 space-x-3">
                        <span className="text-gray-400 font-bold tracking-widest text-xs">{item.symbol}</span>
                        <span className="text-white font-light text-sm">{item.value}</span>
                        <span className={`${item.up ? "text-green-400" : "text-red-400"} text-xs font-medium`}>
                            {item.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* Tailwind Custom Animation (Inline style for quick integration if tailwind config missing) */}
            <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Ticker;
