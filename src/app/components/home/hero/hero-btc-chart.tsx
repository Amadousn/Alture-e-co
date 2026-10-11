"use client";

import { useEffect, useId, useState } from "react";

type PricePoint = { t: number; price: number };

const REFRESH_MS = 20 * 1000;
const VIEW_WIDTH = 100;
const VIEW_HEIGHT = 40;
const PADDING_Y = 5;
// Leaves room on the right so the live dot and its halo are never clipped.
const PADDING_RIGHT = 3;

function formatPrice(value: number): string {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatTime(value: number): string {
    return new Date(value).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

const HeroBtcChart = () => {
    const fillId = useId();
    const [history, setHistory] = useState<PricePoint[] | null>(null);
    const [hover, setHover] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/btc-history", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                // The endpoint answers with simulated points when its price
                // source is down. Those are never shown as a real price.
                if (cancelled || data.fallback || !Array.isArray(data.points) || data.points.length < 2) return;
                setHistory(data.points);
            } catch {
                // keep the last known history if the fetch fails
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    if (!history) {
        return (
            <div className="w-full h-[220px] flex items-center justify-center">
                <span className="text-xs font-light text-gray-600">Loading BTC price…</span>
            </div>
        );
    }

    const prices = history.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 1;
    const lastIndex = history.length - 1;

    const x = (i: number) => (i / lastIndex) * (VIEW_WIDTH - PADDING_RIGHT);
    const y = (price: number) => VIEW_HEIGHT - PADDING_Y - ((price - min) / range) * (VIEW_HEIGHT - PADDING_Y * 2);

    const line = history.map((p, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(2)},${y(p.price).toFixed(2)}`).join(" ");
    const area = `${line} L${x(lastIndex).toFixed(2)},${VIEW_HEIGHT} L0,${VIEW_HEIGHT} Z`;

    const latest = history[lastIndex];
    const change = ((latest.price - history[0].price) / history[0].price) * 100;
    const active = hover !== null && hover <= lastIndex ? hover : null;
    const shown = active !== null ? history[active] : latest;

    const track = (clientX: number, target: HTMLDivElement) => {
        const rect = target.getBoundingClientRect();
        const ratio = (clientX - rect.left) / (rect.width * ((VIEW_WIDTH - PADDING_RIGHT) / VIEW_WIDTH));
        setHover(Math.max(0, Math.min(lastIndex, Math.round(ratio * lastIndex))));
    };

    const left = (i: number) => `${(x(i) / VIEW_WIDTH) * 100}%`;
    const top = (price: number) => `${(y(price) / VIEW_HEIGHT) * 100}%`;

    return (
        <div className="w-full text-left">
            <div className="flex items-end justify-between gap-4 mb-2">
                <div>
                    <p className="flex items-center gap-2 text-[10px] font-light text-gray-500 uppercase tracking-[0.15em] mb-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="hero-btc-ping absolute inline-flex h-full w-full rounded-full bg-up" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-up" />
                        </span>
                        BTC / USD
                    </p>
                    <p className="font-logo text-4xl md:text-5xl font-extralight text-white leading-none tabular-nums">{formatPrice(shown.price)}</p>
                </div>
                <p className="text-xs font-mono text-right">
                    {active !== null ? (
                        <span className="text-gray-500">{formatTime(shown.t)}</span>
                    ) : (
                        <>
                            <span className={change >= 0 ? "text-up" : "text-down"}>
                                {change >= 0 ? "+" : ""}
                                {change.toFixed(2)}%
                            </span>
                            <span className="text-gray-600"> · 24h</span>
                        </>
                    )}
                </p>
            </div>

            <div
                className="relative h-36 md:h-52 lg:h-64 cursor-crosshair touch-none"
                onPointerMove={(e) => track(e.clientX, e.currentTarget)}
                onPointerDown={(e) => track(e.clientX, e.currentTarget)}
                onPointerLeave={() => setHover(null)}
            >
                <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
                    <defs>
                        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.10" />
                            <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <path d={area} fill={`url(#${fillId})`} />
                    <path d={line} fill="none" stroke="#FFFFFF" strokeWidth="1.5" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                </svg>

                {active !== null && (
                    <>
                        <span className="absolute top-0 bottom-0 w-px bg-white/15 pointer-events-none" style={{ left: left(active) }} />
                        <span className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none" style={{ left: left(active), top: top(shown.price) }} />
                    </>
                )}

                {/* Live price marker */}
                <span className="absolute pointer-events-none -ml-1.5 -mt-1.5 flex h-3 w-3" style={{ left: left(lastIndex), top: top(latest.price) }}>
                    <span className="hero-btc-ping absolute inline-flex h-full w-full rounded-full bg-up" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-up ring-2 ring-black" />
                </span>
            </div>

            <style jsx>{`
                @keyframes heroBtcPing {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2.6); opacity: 0; }
                }
                .hero-btc-ping {
                    animation: heroBtcPing 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default HeroBtcChart;
