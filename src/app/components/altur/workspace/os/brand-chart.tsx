"use client";

import { useEffect, useId, useState } from "react";

type Candle = { t: number; o: number; h: number; l: number; c: number };
type Level = { label: string; price: number; color: string };

const W = 1000;
const H = 400;
const PAD = 26;

const fmt = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5, maximumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5 })}`;

// The Alture & Co. chart: one white line, a breath of light under it, and a
// live dot, as on the homepage. Real candles' closing prices, nothing drawn in.
const BrandChart = ({ symbol, interval, levels = [], onReading }: { symbol: string; interval: string; levels?: Level[]; onReading?: (reading: { price: number; time: number } | null) => void }) => {
    const fillId = useId();
    const [data, setData] = useState<{ key: string; candles: Candle[] } | null>(null);
    const [failed, setFailed] = useState(false);
    const [hover, setHover] = useState<number | null>(null);
    const key = `${symbol}|${interval}`;

    useEffect(() => {
        let cancelled = false;
        setFailed(false);
        const load = async () => {
            try {
                const res = await fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}`, { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setData({ key: `${symbol}|${interval}`, candles: json.candles });
            } catch {
                if (!cancelled) setFailed(true);
            }
        };
        load();
        const id = setInterval(load, 15000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [symbol, interval]);

    const candles = data?.key === key ? data.candles : null;
    if (!candles) return <div className="flex h-full items-center justify-center text-sm text-white/40">{failed ? "The chart is unavailable right now: the market data source could not be reached." : "Loading the chart…"}</div>;

    const closes = candles.map((candle) => candle.c);
    const shown = levels.filter((level) => level.price > 0);
    const min = Math.min(...closes, ...shown.map((level) => level.price));
    const max = Math.max(...closes, ...shown.map((level) => level.price));
    const range = max - min || 1;
    const last = closes.length - 1;
    const x = (i: number) => (i / last) * (W - 12);
    const y = (price: number) => PAD + (1 - (price - min) / range) * (H - PAD * 2);
    const line = closes.map((price, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)},${y(price).toFixed(1)}`).join(" ");
    const up = closes[last] >= closes[0];
    const at = hover ?? last;

    const track = (clientX: number, target: HTMLDivElement) => {
        const rect = target.getBoundingClientRect();
        const index = Math.max(0, Math.min(last, Math.round(((clientX - rect.left) / (rect.width * ((W - 12) / W))) * last)));
        setHover(index);
        onReading?.({ price: closes[index], time: candles[index].t });
    };
    const leave = () => {
        setHover(null);
        onReading?.(null);
    };
    const left = (i: number) => `${(x(i) / W) * 100}%`;
    const top = (price: number) => `${(y(price) / H) * 100}%`;

    return (
        <div className="relative h-full cursor-crosshair touch-none" onPointerMove={(event) => track(event.clientX, event.currentTarget)} onPointerDown={(event) => track(event.clientX, event.currentTarget)} onPointerLeave={leave}>
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
                <defs>
                    <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.1" />
                        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {shown.map((level) => (
                    <line key={level.label} x1="0" x2={W} y1={y(level.price)} y2={y(level.price)} stroke={level.color} strokeOpacity="0.7" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
                ))}
                <path d={`${line} L${x(last).toFixed(1)},${H} L0,${H} Z`} fill={`url(#${fillId})`} />
                <path d={line} fill="none" stroke="#FFFFFF" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
            </svg>

            {shown.map((level) => (
                <span key={level.label} className="pointer-events-none absolute left-0 -translate-y-1/2 bg-black pr-2 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ top: top(level.price), color: level.color }}>
                    {level.label} <span className="font-mono font-normal tracking-normal">{fmt(level.price)}</span>
                </span>
            ))}

            <span className="pointer-events-none absolute right-0 top-0 font-mono text-[10px] tabular-nums text-white/30">{fmt(max)}</span>
            <span className="pointer-events-none absolute right-0 bottom-0 font-mono text-[10px] tabular-nums text-white/30">{fmt(min)}</span>

            {hover !== null && <span className="pointer-events-none absolute top-0 bottom-0 w-px bg-white/15" style={{ left: left(hover) }} />}
            <span className="pointer-events-none absolute -ml-1.5 -mt-1.5 flex h-3 w-3" style={{ left: left(at), top: top(closes[at]) }}>
                {hover === null && <span className={`absolute inline-flex h-full w-full rounded-full ${up ? "bg-[#20B8A8]" : "bg-[#E955A8]"} cockpit-ping`} />}
                <span className={`relative inline-flex h-3 w-3 rounded-full ring-2 ring-black ${hover !== null ? "bg-white" : up ? "bg-[#20B8A8]" : "bg-[#E955A8]"}`} />
            </span>
        </div>
    );
};

export default BrandChart;
