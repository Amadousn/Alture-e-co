"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

// The equity curve of the command centre: cumulative realised P&L, one point
// per trade, with an optional row of outcome bars under it (teal win, magenta
// loss) and a reading of the trade under the pointer.

export type EquityTrade = { id: string; instrument: string; direction: "Long" | "Short"; profitLoss: number; closedAt: number };
const TEAL = "#20B8A8";
const MAGENTA = "#E955A8";

const money = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const short = (value: number) => {
    const a = Math.abs(value);
    return `${value < 0 ? "-" : ""}$${a >= 1000 ? `${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}K` : a.toFixed(0)}`;
};
const day = (at: number) => new Date(at).toLocaleDateString("en-US", { day: "2-digit", month: "short", timeZone: "UTC" }).toUpperCase();

function useSize<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [width, setWidth] = useState(0);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return { ref, width };
}

const EquityChart = ({ trades, height = 300, bars = false, drawdown = false }: { trades: EquityTrade[]; height?: number; bars?: boolean; drawdown?: boolean }) => {
    const { ref, width } = useSize<HTMLDivElement>();
    const id = useId().replace(/:/g, "");
    const [hover, setHover] = useState<number | null>(null);
    const [drawn, setDrawn] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setDrawn(true), 30);
        return () => clearTimeout(t);
    }, []);

    const ordered = useMemo(() => [...trades].sort((a, b) => a.closedAt - b.closedAt), [trades]);
    const points = useMemo(() => {
        let total = 0;
        let peak = 0;
        return ordered.map((trade) => {
            total += trade.profitLoss;
            peak = Math.max(peak, total);
            return { trade, cumulative: total, drawdown: total - peak };
        });
    }, [ordered]);

    const axis = 56;
    const barH = bars ? 64 : 0;
    const gap = bars ? 14 : 0;
    const plotW = Math.max(0, width - axis);
    const plotH = height - barH - gap - 26;
    const series = points.map((p) => (drawdown ? p.drawdown : p.cumulative));
    const values = [0, ...series];
    let max = Math.max(...values);
    let min = Math.min(...values);
    if (max === min) [max, min] = [max + 1, min - 1];
    const pad = (max - min) * 0.08;
    [max, min] = [max + pad, min - (drawdown ? pad : 0)];
    const y = (value: number) => 8 + ((max - value) / (max - min)) * (plotH - 8);
    const n = points.length;
    const x = (i: number) => (n <= 1 ? plotW : (i / (n - 1)) * plotW);
    const line = series.map((value, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(value).toFixed(1)}`).join(" ");
    const area = n ? `${line} L${x(n - 1).toFixed(1)},${y(Math.min(0, min)).toFixed(1)} L0,${y(Math.min(0, min)).toFixed(1)} Z` : "";
    const ticks = [0.15, 0.5, 0.85].map((k) => min + (max - min) * k);
    const largest = Math.max(1, ...points.map((p) => Math.abs(p.trade.profitLoss)));
    const slot = n ? plotW / n : 0;
    const labels = n ? [0, Math.floor(n / 3), Math.floor((2 * n) / 3), n - 1].filter((v, i, a) => a.indexOf(v) === i) : [];
    const color = drawdown ? MAGENTA : TEAL;

    const pick = (clientX: number, target: HTMLElement) => {
        const box = target.getBoundingClientRect();
        const px = clientX - box.left;
        if (!n || px < 0 || px > plotW) return setHover(null);
        setHover(Math.max(0, Math.min(n - 1, Math.round((px / plotW) * (n - 1)))));
    };
    const active = hover !== null ? points[hover] : null;

    return (
        <div ref={ref} className="relative w-full select-none" style={{ height }} onMouseMove={(event) => pick(event.clientX, event.currentTarget)} onMouseLeave={() => setHover(null)} role="img" aria-label={n ? `${drawdown ? "Drawdown" : "Equity curve"} over ${n} trades, ending at ${money(series[n - 1])}` : "No trades yet"}>
            {width > 0 && (
                <svg width={width} height={height} className="block">
                    <defs>
                        <linearGradient id={`fill-${id}`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
                            <stop offset="100%" stopColor={color} stopOpacity="0" />
                        </linearGradient>
                        <filter id={`glow-${id}`} x="-5%" y="-20%" width="110%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <clipPath id={`reveal-${id}`}>
                            <rect x="0" y="0" height={height} width={drawn ? width : 0} style={{ transition: "width 1.1s cubic-bezier(0.2,0.7,0.2,1)" }} />
                        </clipPath>
                    </defs>
                    {ticks.map((value) => (
                        <g key={value}>
                            <line x1="0" x2={plotW} y1={y(value)} y2={y(value)} stroke="rgba(255,255,255,0.05)" />
                            <text x={plotW + 10} y={y(value) + 4} fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="ui-monospace, Menlo, monospace">
                                {short(value)}
                            </text>
                        </g>
                    ))}
                    <line x1="0" x2={plotW} y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.18)" strokeDasharray="3 4" />
                    <g clipPath={`url(#reveal-${id})`}>
                        <path d={area} fill={`url(#fill-${id})`} />
                        <path d={line} fill="none" stroke={color} strokeWidth="2" filter={`url(#glow-${id})`} strokeLinejoin="round" />
                    </g>
                    {bars &&
                        points.map((p, i) => {
                            const mid = plotH + gap + barH / 2;
                            const h = (Math.abs(p.trade.profitLoss) / largest) * (barH / 2 - 2);
                            const up = p.trade.profitLoss >= 0;
                            return <rect key={p.trade.id} x={i * slot + slot * 0.2} width={Math.max(1, slot * 0.6)} y={up ? mid - h : mid} height={Math.max(1, h)} fill={up ? TEAL : MAGENTA} opacity={hover === null || hover === i ? 0.9 : 0.35} rx="1" />;
                        })}
                    {bars && <line x1="0" x2={plotW} y1={plotH + gap + barH / 2} y2={plotH + gap + barH / 2} stroke="rgba(255,255,255,0.12)" />}
                    {labels.map((i) => (
                        <text key={i} x={Math.min(plotW - 30, Math.max(20, x(i)))} y={height - 6} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="ui-monospace, Menlo, monospace">
                            {day(points[i].trade.closedAt)}
                        </text>
                    ))}
                    {active && hover !== null && (
                        <g>
                            <line x1={x(hover)} x2={x(hover)} y1="0" y2={height - 22} stroke="rgba(255,255,255,0.25)" strokeDasharray="2 3" />
                            <circle cx={x(hover)} cy={y(series[hover])} r="5" fill="#0d1114" stroke={color} strokeWidth="2" />
                        </g>
                    )}
                </svg>
            )}
            {active && hover !== null && (
                <div className="cmd-panel pointer-events-none absolute z-10 w-60 px-4 py-3" style={{ position: "absolute", left: Math.min(Math.max(0, x(hover) + 16), Math.max(0, plotW - 240)), top: Math.max(0, Math.min(y(series[hover]) - 30, plotH - 110)) }}>
                    <p className="cmd-label !text-[10px]">
                        Trade {hover + 1} / {n} · {new Date(active.trade.closedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-white">
                        {active.trade.instrument} · {active.trade.direction}
                    </p>
                    <dl className="mt-2 space-y-1 font-mono text-xs">
                        <div className="flex justify-between">
                            <dt className="text-white/50">Realized</dt>
                            <dd className={active.trade.profitLoss >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}>{money(active.trade.profitLoss)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-white/50">{drawdown ? "From peak" : "Cumulative"}</dt>
                            <dd className={series[hover] >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}>{money(series[hover])}</dd>
                        </div>
                    </dl>
                </div>
            )}
        </div>
    );
};

export default EquityChart;
