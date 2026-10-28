"use client";

import { useEffect, useState } from "react";

// A small line of the last two days of hourly closes, from Bybit's public data.
export function useCloses(symbol: string, interval = "60", count = 48) {
    const [closes, setCloses] = useState<number[] | null>(null);
    useEffect(() => {
        let cancelled = false;
        fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}`, { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : null))
            .then((json) => {
                if (!cancelled && json?.candles) setCloses((json.candles as { c: number }[]).slice(-count).map((candle) => candle.c));
            })
            .catch(() => undefined);
        return () => {
            cancelled = true;
        };
    }, [symbol, interval, count]);
    return closes;
}

const Sparkline = ({ values, width = 84, height = 26 }: { values: number[] | null; width?: number; height?: number }) => {
    if (!values || values.length < 2) return <span style={{ width, height }} className="inline-block" aria-hidden="true" />;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const points = values.map((value, i) => `${((i / (values.length - 1)) * width).toFixed(1)},${(height - 2 - ((value - min) / (max - min || 1)) * (height - 4)).toFixed(1)}`).join(" ");
    const up = values[values.length - 1] >= values[0];
    return (
        <svg width={width} height={height} className="block flex-shrink-0" aria-hidden="true">
            <polyline points={points} fill="none" stroke={up ? "#20B8A8" : "#E955A8"} strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
    );
};

export default Sparkline;
