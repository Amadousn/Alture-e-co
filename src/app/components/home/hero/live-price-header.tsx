"use client";

import { useEffect, useState } from "react";

const REFRESH_MS = 45 * 1000;
const FALLBACK_PRICE = "$78,000.00";

function parsePrice(value: string): number | null {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return Number.isNaN(num) ? null : num;
}

const LivePriceHeader = () => {
    const [price, setPrice] = useState<string>(FALLBACK_PRICE);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/ticker", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (cancelled || !Array.isArray(data.items)) return;
                const btc = data.items.find((item: { symbol: string; value: string }) => item.symbol === "BTC");
                if (btc && parsePrice(btc.value) != null) setPrice(btc.value);
            } catch {
                // keep the last known price if the fetch fails
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    return (
        <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="live-header-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
                <span className="text-white font-mono text-lg md:text-xl tracking-tight">{price}</span>
            </div>
            <p className="text-gray-500 text-[10px] md:text-xs tracking-[0.2em] font-light">
                BTC/USD LIVE
            </p>

            <style jsx>{`
                @keyframes liveHeaderPing {
                    0% { transform: scale(1); opacity: 0.75; }
                    75%, 100% { transform: scale(2.2); opacity: 0; }
                }
                .live-header-ping {
                    animation: liveHeaderPing 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default LivePriceHeader;
