"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";

// The main performance view of Home and the Journal, drawn only from the trades
// it is given. Two modes on the same axis: the cumulative equity curve, and
// each trade as a bar (teal above zero, magenta below). Hover reads one trade.

const TEAL = "#20B8A8";
const MAGENTA = "#E955A8";
const DAY = 24 * 60 * 60 * 1000;
const RANGES = [
    { id: "1M", days: 30 },
    { id: "3M", days: 91 },
    { id: "6M", days: 182 },
    { id: "All", days: Infinity },
] as const;
type RangeId = (typeof RANGES)[number]["id"];
type Mode = "equity" | "trades";

const signed = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const compact = (value: number) => {
    const a = Math.abs(value);
    const body = a >= 1000 ? `${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}K` : a.toFixed(0);
    return `${value < 0 ? "-" : ""}$${body}`;
};

function useWidth<T extends HTMLElement>() {
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

type Props = {
    trades: ClosedTrade[];
    height?: number;
    // Shown in the corner so sample figures are never mistaken for a real account.
    demo?: boolean;
    defaultRange?: RangeId;
    className?: string;
};

const PerformanceChart = ({ trades, height = 340, demo = false, defaultRange = "All", className = "" }: Props) => {
    const [mode, setMode] = useState<Mode>("equity");
    const [range, setRange] = useState<RangeId>(defaultRange);
    const [hover, setHover] = useState<number | null>(null);
    const { ref, width } = useWidth<HTMLDivElement>();

    const ordered = useMemo(() => [...trades].sort((a, b) => a.closedAt - b.closedAt), [trades]);
    // Ranges count back from the latest trade, so a quiet week never empties the chart.
    const end = ordered.length > 0 ? ordered[ordered.length - 1].closedAt : 0;
    const days = RANGES.find((item) => item.id === range)!.days;
    const list = useMemo(() => ordered.filter((trade) => trade.closedAt >= end - days * DAY), [ordered, end, days]);
    const points = useMemo(() => {
        let total = 0;
        return list.map((trade, i) => ({ trade, index: i, cumulative: (total += trade.profitLoss) }));
    }, [list]);

    const padTop = 16;
    const padBottom = 26;
    const padRight = 56;
    const plotW = Math.max(0, width - padRight);
    const plotH = height - padTop - padBottom;
    const values = mode === "equity" ? [0, ...points.map((p) => p.cumulative)] : [0, ...points.map((p) => p.trade.profitLoss)];
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const span = rawMax - rawMin || 1;
    const min = rawMin - span * 0.08;
    const max = rawMax + span * 0.08;
    const y = (value: number) => padTop + ((max - value) / (max - min)) * plotH;
    const n = points.length;
    // Equity starts from a zero point before the first trade; bars sit in slots.
    const xEquity = (i: number) => (n === 0 ? 0 : ((i + 1) / n) * plotW);
    const slot = n > 0 ? plotW / n : 0;
    const xBar = (i: number) => (i + 0.5) * slot;
    const zero = y(0);

    const line = n > 0 ? `M0,${zero} ` + points.map((p, i) => `L${xEquity(i).toFixed(1)},${y(p.cumulative).toFixed(1)}`).join(" ") : "";
    const area = n > 0 ? `${line} L${plotW},${zero} L0,${zero} Z` : "";
    const ticks = [0, 1, 2, 3].map((k) => min + ((max - min) * (k + 0.5)) / 4);

    const pick = (clientX: number) => {
        const box = ref.current?.getBoundingClientRect();
        if (!box || n === 0) return;
        const x = clientX - box.left;
        const i = mode === "equity" ? Math.round((x / plotW) * n) - 1 : Math.floor(x / slot);
        setHover(Math.max(0, Math.min(n - 1, i)));
    };

    const active = hover !== null && hover < n ? points[hover] : null;
    const ax = active ? (mode === "equity" ? xEquity(active.index) : xBar(active.index)) : 0;
    const ay = active ? (mode === "equity" ? y(active.cumulative) : y(active.trade.profitLoss)) : 0;
    const total = points.length > 0 ? points[points.length - 1].cumulative : 0;
    const wins = list.filter((trade) => trade.profitLoss > 0).length;
    const id = `pc-${Math.round(height)}-${mode}`;

    return (
        <div className={className}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[12px]" role="tablist" aria-label="Chart mode">
                    {(
                        [
                            ["equity", "Equity"],
                            ["trades", "Each trade"],
                        ] as const
                    ).map(([key, label]) => (
                        <button key={key} type="button" role="tab" aria-selected={mode === key} onClick={() => setMode(key)} className={`rounded-full px-3 py-1 transition-colors ${mode === key ? "bg-white/[0.09] text-white" : "text-white/45 hover:text-white"}`}>
                            {label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3">
                    {demo && <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FACC15]">Sample data</span>}
                    <div className="flex items-center gap-0.5 text-[11px] tabular-nums" role="group" aria-label="Time range">
                        {RANGES.map((item) => (
                            <button key={item.id} type="button" aria-pressed={range === item.id} onClick={() => setRange(item.id)} className={`rounded-sm px-2 py-1 transition-colors ${range === item.id ? "text-white" : "text-white/35 hover:text-white/80"}`}>
                                {item.id}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div ref={ref} className="relative select-none" style={{ height }} onMouseMove={(e) => pick(e.clientX)} onMouseLeave={() => setHover(null)} onTouchMove={(e) => pick(e.touches[0].clientX)} onTouchEnd={() => setHover(null)}>
                {n === 0 ? (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">No trades in this range.</div>
                ) : (
                    width > 0 && (
                        <svg key={`${mode}-${range}`} width={width} height={height} className="perf-reveal block overflow-visible" role="img" aria-label={`${mode === "equity" ? "Equity curve" : "Result of each trade"}: ${n} trades, ${signed(total)}`}>
                            <defs>
                                <linearGradient id={`${id}-up`} x1="0" x2="0" y1={padTop} y2={zero} gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor={TEAL} stopOpacity="0.32" />
                                    <stop offset="1" stopColor={TEAL} stopOpacity="0.02" />
                                </linearGradient>
                                <linearGradient id={`${id}-down`} x1="0" x2="0" y1={zero} y2={padTop + plotH} gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor={MAGENTA} stopOpacity="0.02" />
                                    <stop offset="1" stopColor={MAGENTA} stopOpacity="0.28" />
                                </linearGradient>
                                <clipPath id={`${id}-above`}>
                                    <rect x="0" y="0" width={plotW} height={Math.max(0, zero)} />
                                </clipPath>
                                <clipPath id={`${id}-below`}>
                                    <rect x="0" y={zero} width={plotW} height={Math.max(0, height - zero)} />
                                </clipPath>
                            </defs>

                            {/* Fine grid and the value scale on the right */}
                            {ticks.map((value) => (
                                <g key={value}>
                                    <line x1="0" x2={plotW} y1={y(value)} y2={y(value)} stroke="rgba(255,255,255,0.05)" />
                                    <text x={plotW + 10} y={y(value) + 3.5} fill="rgba(255,255,255,0.32)" fontSize="10" className="tabular-nums">
                                        {compact(value)}
                                    </text>
                                </g>
                            ))}
                            <line x1="0" x2={plotW} y1={zero} y2={zero} stroke="rgba(255,255,255,0.22)" strokeDasharray="3 4" />

                            {mode === "equity" ? (
                                <>
                                    <path d={area} fill={`url(#${id}-up)`} clipPath={`url(#${id}-above)`} />
                                    <path d={area} fill={`url(#${id}-down)`} clipPath={`url(#${id}-below)`} />
                                    <path d={line} fill="none" stroke={TEAL} strokeWidth="1.75" strokeLinejoin="round" clipPath={`url(#${id}-above)`} />
                                    <path d={line} fill="none" stroke={MAGENTA} strokeWidth="1.75" strokeLinejoin="round" clipPath={`url(#${id}-below)`} />
                                </>
                            ) : (
                                points.map((p, i) => {
                                    const v = p.trade.profitLoss;
                                    const top = Math.min(y(v), zero);
                                    const w = Math.max(1, Math.min(28, slot * 0.62));
                                    return <rect key={p.trade.id} x={xBar(i) - w / 2} y={top} width={w} height={Math.max(1, Math.abs(y(v) - zero))} rx="1" fill={v >= 0 ? TEAL : MAGENTA} opacity={hover === null || hover === i ? 0.9 : 0.35} />;
                                })
                            )}

                            {/* Date marks under the plot */}
                            {[0, 0.5, 1].map((f) => {
                                const i = Math.min(n - 1, Math.round(f * (n - 1)));
                                const x = mode === "equity" ? xEquity(i) : xBar(i);
                                return (
                                    <text key={f} x={x} y={height - 6} fill="rgba(255,255,255,0.32)" fontSize="10" textAnchor={f === 0 ? "start" : f === 1 ? "end" : "middle"}>
                                        {new Date(points[i].trade.closedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })}
                                    </text>
                                );
                            })}

                            {active && (
                                <g pointerEvents="none">
                                    <line x1={ax} x2={ax} y1={padTop} y2={padTop + plotH} stroke="rgba(255,255,255,0.25)" />
                                    {mode === "equity" && <circle cx={ax} cy={ay} r="4" fill="#000" stroke={active.cumulative >= 0 ? TEAL : MAGENTA} strokeWidth="2" />}
                                </g>
                            )}
                        </svg>
                    )
                )}

                {active && (
                    <div className="pointer-events-none absolute top-2 z-10 w-[210px] rounded-md bg-[#111114]/95 px-3.5 py-3 text-[12px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/10" style={{ left: Math.min(Math.max(0, ax + 14), Math.max(0, plotW - 210)) }}>
                        <p className="text-white/50">
                            {new Date(active.trade.closedAt).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
                        </p>
                        <p className="mt-1.5 text-white">
                            {active.trade.instrument} · {active.trade.direction}
                        </p>
                        <dl className="mt-2 space-y-1 tabular-nums">
                            <div className="flex justify-between gap-3">
                                <dt className="text-white/45">Trade</dt>
                                <dd className="text-white/80">
                                    {active.index + 1} of {n}
                                </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-white/45">Realized</dt>
                                <dd style={{ color: active.trade.profitLoss >= 0 ? TEAL : MAGENTA }}>{signed(active.trade.profitLoss)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-white/45">Cumulative</dt>
                                <dd style={{ color: active.cumulative >= 0 ? TEAL : MAGENTA }}>{signed(active.cumulative)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt className="text-white/45">Fees</dt>
                                <dd className="text-white/60">{`$${active.trade.fee.toFixed(2)}`}</dd>
                            </div>
                        </dl>
                    </div>
                )}
            </div>

            <p className="mt-3 text-[11px] tabular-nums text-white/40">
                {n} {n === 1 ? "trade" : "trades"} · {n > 0 ? `${Math.round((wins / n) * 100)}% won` : "-"} · <span style={{ color: total >= 0 ? TEAL : MAGENTA }}>{signed(total)}</span> in this range
            </p>

            <style jsx global>{`
                @keyframes perfReveal {
                    from { clip-path: inset(0 100% 0 0); opacity: 0.4; }
                    to { clip-path: inset(0 0 0 0); opacity: 1; }
                }
                .perf-reveal { animation: perfReveal 0.7s cubic-bezier(0.22, 1, 0.36, 1); }
                @media (prefers-reduced-motion: reduce) { .perf-reveal { animation: none; } }
            `}</style>
        </div>
    );
};

export default PerformanceChart;
