"use client";

import { insightsOf, Insight, MIN_SCORE_TRADES, Score, scoreOf } from "@/utils/journal-insights";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { useTradeReviews, TradeReviews } from "@/utils/workspace-store";
import { useTheme } from "@/utils/use-theme";
import TradeRecap from "./trade-recap";
import TradeDetails, { TradeDetail } from "./trade-details";
import ShareMonth from "./share-month";
import Strategies from "./strategies";
import TradeForm from "./trade-form";
import { useRecordedTrades } from "@/utils/workspace-store";

// The trading journal. One period drives everything on the page: the overview,
// the curve, the months, the calendar, the history and the analysis. Days are
// counted in UTC, as the exchange counts them. Every figure is computed here
// from the trades given, so all of them agree.

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY = 86400000;
const SESSIONS = [
    { name: "Asia", from: 0, to: 7 },
    { name: "London", from: 7, to: 13 },
    { name: "New York", from: 13, to: 21 },
    { name: "After hours", from: 21, to: 24 },
];

const THEMES = {
    light: { "--j-bg": "#f3f4f7", "--j-s1": "#ffffff", "--j-s2": "#eef0f4", "--j-s3": "#e5e8ee", "--j-ink": "#0c0d10", "--j-mu": "#62656e", "--j-fa": "#9a9ea8", "--j-line": "#e2e4ea", "--j-up": "#0d8a7b", "--j-dn": "#c23a77", "--j-upbg": "#e1f2ef", "--j-dnbg": "#f7e4ec", "--j-upsoft": "#9fd3cc", "--j-shadow": "0 1px 2px rgba(23,24,26,0.04), 0 14px 32px -20px rgba(23,24,26,0.22)", "--j-tip": "#0c0d10", "--j-tipink": "#ffffff", "--j-active": "#0c0d10", "--j-activeink": "#ffffff", "--font-mono": "var(--font-logo)" },
    dark: { "--j-bg": "#040306", "--j-s1": "#0b090e", "--j-s2": "#151119", "--j-s3": "#1d1822", "--j-ink": "#ededee", "--j-mu": "#9a93a3", "--j-fa": "#625b6b", "--j-line": "#221c28", "--j-up": "#3cc9b8", "--j-dn": "#e4609f", "--j-upbg": "rgba(60,201,184,0.13)", "--j-dnbg": "rgba(228,96,159,0.13)", "--j-upsoft": "rgba(60,201,184,0.4)", "--j-border": "rgba(227,161,247,0.16)", "--j-shadow": "0 0 40px -18px rgba(227,161,247,0.35)", "--j-radius": "10px", "--j-glow": "radial-gradient(70% 40% at 15% 0%, rgba(227,161,247,0.16), transparent 70%)", "--font-mono": "var(--font-logo)", "--j-tip": "#f2f2f3", "--j-tipink": "#111214", "--j-active": "#f2f2f3", "--j-activeink": "#111214" },
} as const;

// When the trader hides amounts (on a shared screen, a stream, a screenshot), dollar
// figures become dots; percentages, counts and the shape of the charts stay.
let HIDDEN = false;
const MASK = "$ ••••";
const money = (value: number, digits = 2) => HIDDEN ? `${value < 0 ? "−" : "+"}${MASK}` : `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
const plain = (value: number) => HIDDEN ? MASK : `$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const axisMoney = (value: number) => {
    if (HIDDEN) return value === 0 ? "$0" : "••";
    const a = Math.abs(value);
    return `${value < 0 ? "−" : ""}$${a >= 1000 ? `${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}K` : a.toFixed(0)}`;
};
const tone = (value: number) => (value > 0 ? "text-[var(--j-up)]" : value < 0 ? "text-[var(--j-dn)]" : "text-[var(--j-mu)]");
const asset = (symbol: string) => symbol.replace(/USDT$/, "");
const price = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: value >= 100 ? 1 : 4 });
const dayKey = (at: number) => new Date(at).toISOString().slice(0, 10);
const startOfDay = (key: string) => Date.parse(`${key}T00:00:00Z`);
const longDay = (key: string) => new Date(startOfDay(key)).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
const shortDay = (at: number) => new Date(at).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const held = (trade: ClosedTrade) => {
    if (trade.openedAt === undefined) return null;
    const minutes = Math.round((trade.closedAt - trade.openedAt) / 60000);
    return minutes >= 1440 ? `${(minutes / 1440).toFixed(1)} days` : minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
};
// What each figure means, shown when the pointer rests on its name.
const DEFINE: Record<string, string> = {
    "Win rate": "Share of closed trades with a positive net result.",
    "Profit factor": "Gross profit divided by gross loss.",
    "Average trade": "Net result divided by the number of trades.",
    "Day win rate": "Share of trading days that closed with a net gain.",
    "Average win / loss": "Average winning trade divided by average losing trade.",
    Trades: "Closed trades in the period.",
    "Max drawdown": "The largest fall of the equity curve from a previous high.",
};
// Streaks and the shape of wins and losses, in trade order. R is used where the
// trade carries it (backtests); real exchange trades have no recorded stop.
const edgeOf = (list: ClosedTrade[]) => {
    const wins = list.filter((t) => t.profitLoss > 0);
    const losses = list.filter((t) => t.profitLoss < 0);
    const avgWin = wins.length ? wins.reduce((s, t) => s + t.profitLoss, 0) / wins.length : null;
    const avgLoss = losses.length ? -losses.reduce((s, t) => s + t.profitLoss, 0) / losses.length : null;
    let run = 0;
    let bestWin = 0;
    let bestLoss = 0;
    for (const t of list) {
        if (t.profitLoss === 0) continue;
        run = t.profitLoss > 0 ? (run > 0 ? run + 1 : 1) : run < 0 ? run - 1 : -1;
        bestWin = Math.max(bestWin, run);
        bestLoss = Math.max(bestLoss, -run);
    }
    const rs = list.map((t) => (t as ClosedTrade & { r?: number }).r).filter((r): r is number => typeof r === "number");
    return { avgWin, avgLoss, payoff: avgWin !== null && avgLoss ? avgWin / avgLoss : null, bestWin, bestLoss, current: run, expectancyR: rs.length === list.length && rs.length ? rs.reduce((s, r) => s + r, 0) / rs.length : null };
};
type Group = { label: string; count: number; wins: number; total: number };
const group = (label: string, list: ClosedTrade[]): Group => ({ label, count: list.length, wins: list.filter((t) => t.profitLoss > 0).length, total: list.reduce((s, t) => s + t.profitLoss, 0) });

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

const Module = ({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) => (
    <section aria-label={label} className={`rounded-[var(--j-radius,16px)] border border-[var(--j-border,transparent)] bg-[var(--j-s1)] shadow-[var(--j-shadow)] ${className}`}>
        {children}
    </section>
);

// ---------- the performance chart ----------

type Mode = "equity" | "drawdown" | "outcomes";
const Chart = ({ trades, mode }: { trades: ClosedTrade[]; mode: Mode }) => {
    const { ref, width } = useWidth<HTMLDivElement>();
    const [hover, setHover] = useState<number | null>(null);
    const [drawn, setDrawn] = useState(false);
    useEffect(() => {
        setDrawn(false);
        const t = setTimeout(() => setDrawn(true), 40);
        return () => clearTimeout(t);
    }, [mode, trades.length]);
    const height = 300;
    const plotW = Math.max(0, width - 60);
    const plotH = height - 28;
    const points = useMemo(() => {
        let total = 0;
        let peak = 0;
        return trades.map((trade) => {
            total += trade.profitLoss;
            peak = Math.max(peak, total);
            return { trade, equity: total, drawdown: total - peak };
        });
    }, [trades]);
    const n = points.length;
    const series = points.map((p) => (mode === "equity" ? p.equity : mode === "drawdown" ? p.drawdown : p.trade.profitLoss));
    let max = Math.max(0, ...series);
    let min = Math.min(0, ...series);
    if (max === min) max += 1;
    const pad = (max - min) * 0.08;
    max += mode === "drawdown" ? pad * 0.3 : pad;
    min -= mode === "equity" && min === 0 ? 0 : pad;
    const y = (v: number) => 8 + ((max - v) / (max - min)) * (plotH - 8);
    const x = (i: number) => (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const slot = n ? plotW / n : 0;
    const bx = (i: number) => i * slot + slot / 2;
    const raw = (max - min) / 4;
    const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
    const ticks: number[] = [];
    for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
    const labels: { i: number; text: string }[] = [];
    points.forEach((p, i) => {
        const d = new Date(p.trade.closedAt);
        const text = n > 20 ? MONTHS[d.getUTCMonth()].slice(0, 3) : shortDay(p.trade.closedAt);
        if (!labels.length || labels[labels.length - 1].text !== text) labels.push({ i, text });
    });
    const shown = labels.filter((_, k) => k % Math.ceil(labels.length / 7) === 0);
    const line = series.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const base = y(mode === "drawdown" ? 0 : Math.max(min, 0));
    const stroke = mode === "drawdown" ? "var(--j-dn)" : "var(--j-up)";
    const active = hover !== null ? points[hover] : null;
    const hx = hover === null ? 0 : mode === "outcomes" ? bx(hover) : x(hover);
    const pick = (clientX: number, el: HTMLElement) => {
        const px = clientX - el.getBoundingClientRect().left;
        if (!n || px < 0 || px > plotW) return setHover(null);
        setHover(mode === "outcomes" ? Math.min(n - 1, Math.floor(px / slot)) : Math.round((px / plotW) * (n - 1)));
    };
    return (
        <div ref={ref} className="relative select-none" style={{ height }} onMouseMove={(e) => pick(e.clientX, e.currentTarget)} onMouseLeave={() => setHover(null)} role="img" aria-label={n ? `${mode} over ${n} trades` : "No trades in this period"}>
            {width > 0 && n > 0 && (
                <svg width={width} height={height} className="block overflow-visible">
                    <defs>
                        <linearGradient id="jr-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" style={{ stopColor: mode === "drawdown" ? "var(--j-dn)" : "var(--j-up)" }} stopOpacity={mode === "drawdown" ? 0.02 : 0.2} />
                            <stop offset="1" style={{ stopColor: mode === "drawdown" ? "var(--j-dn)" : "var(--j-up)" }} stopOpacity={mode === "drawdown" ? 0.2 : 0.01} />
                        </linearGradient>
                        <filter id="jr-glow" x="-5%" y="-30%" width="110%" height="160%">
                            <feGaussianBlur stdDeviation="3.5" />
                        </filter>
                        <clipPath id="jr-reveal">
                            <rect x="-4" y="-10" height={height + 20} width={drawn ? width + 8 : 0} style={{ transition: "width 0.9s cubic-bezier(0.2,0.7,0.2,1)" }} />
                        </clipPath>
                    </defs>
                    {ticks.map((v) => (
                        <g key={v}>
                            <line x1="0" x2={plotW} y1={y(v)} y2={y(v)} style={{ stroke: v === 0 ? "var(--j-fa)" : "var(--j-line)" }} strokeOpacity={v === 0 ? 0.6 : 1} />
                            <text x={plotW + 10} y={y(v) + 4} style={{ fill: "var(--j-fa)" }} fontSize="11.5" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                                {axisMoney(v)}
                            </text>
                        </g>
                    ))}
                    {shown.map((l) => (
                        <text key={l.text + l.i} x={Math.min(plotW - 30, mode === "outcomes" ? bx(l.i) : x(l.i))} y={height - 4} style={{ fill: "var(--j-fa)" }} fontSize="11.5">
                            {l.text}
                        </text>
                    ))}
                    <g clipPath="url(#jr-reveal)">
                        {mode === "outcomes" ? (
                            points.map((p, i) => {
                                const v = p.trade.profitLoss;
                                return <rect key={p.trade.id} x={bx(i) - Math.max(1, slot * 0.32)} width={Math.max(2, slot * 0.64)} y={Math.min(y(v), y(0))} height={Math.max(1, Math.abs(y(v) - y(0)))} style={{ fill: v >= 0 ? "var(--j-up)" : "var(--j-dn)" }} opacity={hover === null || hover === i ? 0.95 : 0.35} rx="2" />;
                            })
                        ) : (
                            <>
                                <path d={`${line} L${x(n - 1)},${base} L${x(0)},${base} Z`} fill="url(#jr-fill)" />
                                <path d={line} fill="none" style={{ stroke }} strokeWidth="5" opacity="0.18" filter="url(#jr-glow)" />
                                <path d={line} fill="none" style={{ stroke }} strokeWidth="2" strokeLinejoin="round" />
                                <circle cx={x(n - 1)} cy={y(series[n - 1])} r="4" style={{ fill: stroke }} />
                            </>
                        )}
                    </g>
                    {active && hover !== null && (
                        <g>
                            <line x1={hx} x2={hx} y1="2" y2={plotH} style={{ stroke: "var(--j-fa)" }} strokeDasharray="3 3" />
                            {mode !== "outcomes" && <circle cx={hx} cy={y(series[hover])} r="5" style={{ fill: "var(--j-s1)", stroke }} strokeWidth="2" />}
                        </g>
                    )}
                </svg>
            )}
            {active && hover !== null && (
                <div className="pointer-events-none absolute z-10 w-56 rounded-xl bg-[var(--j-tip)] px-3.5 py-3 text-[12.5px] text-[var(--j-tipink)] shadow-xl" style={{ left: Math.min(hx + 16, Math.max(0, plotW - 230)), top: 10 }}>
                    <p className="opacity-60">
                        Trade {hover + 1} of {n} · {shortDay(active.trade.closedAt)}
                    </p>
                    <p className="mt-1">
                        {asset(active.trade.instrument)} {active.trade.direction.toLowerCase()}
                        {active.trade.setup ? <span className="opacity-60"> · {active.trade.setup}</span> : null}
                    </p>
                    <p className="mt-2 flex justify-between">
                        <span className="opacity-60">Net</span>
                        <span className="font-mono">{money(active.trade.profitLoss)}</span>
                    </p>
                    <p className="mt-0.5 flex justify-between">
                        <span className="opacity-60">{mode === "drawdown" ? "Below the high" : "Running total"}</span>
                        <span className="font-mono">{money(mode === "drawdown" ? active.drawdown : active.equity)}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

// A donut split between wins and losses, the share of wins written inside.
const Ring = ({ win, loss, size = 54 }: { win: number; loss: number; size?: number }) => {
    const r = 15.5;
    const c = 2 * Math.PI * r;
    const total = win + loss;
    const share = total ? win / total : 0;
    return (
        <svg viewBox="0 0 36 36" width={size} height={size} className="flex-shrink-0 -rotate-90" aria-hidden="true">
            <circle cx="18" cy="18" r={r} fill="none" stroke="var(--j-s3)" strokeWidth="3.2" />
            {total > 0 && <circle cx="18" cy="18" r={r} fill="none" stroke="var(--j-dn)" strokeWidth="3.2" strokeDasharray={`${c} ${c}`} />}
            {total > 0 && <circle cx="18" cy="18" r={r} fill="none" stroke="var(--j-up)" strokeWidth="3.2" strokeDasharray={`${share * c} ${c}`} strokeLinecap={share > 0 && share < 1 ? "round" : "butt"} />}
        </svg>
    );
};

// A half dial for the profit factor: 0 to 3, with 1 (break-even) marked.
const Gauge = ({ value }: { value: number | null }) => {
    const v = value === null ? 0 : Math.min(3, value);
    const len = Math.PI * 15;
    const color = value === null ? "var(--j-s3)" : value >= 1 ? "var(--j-up)" : "var(--j-dn)";
    return (
        <svg viewBox="0 0 36 20" width={60} height={34} className="flex-shrink-0" aria-hidden="true">
            <path d="M3 18 A15 15 0 0 1 33 18" fill="none" stroke="var(--j-s3)" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M3 18 A15 15 0 0 1 33 18" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeDasharray={`${(v / 3) * len} ${len}`} />
            <line x1="18" y1="1.2" x2="18" y2="5.6" stroke="var(--j-mu)" strokeWidth="0.8" transform="rotate(-30 18 18)" />
        </svg>
    );
};

// The Alture Score: a large ring, the parts it is made of, and what the trades say.
const ScoreCard = ({ score, insights, count }: { score: Score; insights: Insight[]; count: number }) => {
    const r = 15.5;
    const c = 2 * Math.PI * r;
    const color = (v: number) => (v >= 70 ? "var(--j-up)" : v >= 45 ? "var(--j-ink)" : "var(--j-dn)");
    return (
        <div className="grid gap-x-8 gap-y-6 p-5 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
            <div className="flex items-center gap-5">
                <div className="relative h-[112px] w-[112px] flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden="true">
                        <circle cx="18" cy="18" r={r} fill="none" stroke="var(--j-s3)" strokeWidth="2.4" />
                        {score && <circle cx="18" cy="18" r={r} fill="none" stroke={color(score.total)} strokeWidth="2.4" strokeLinecap="round" strokeDasharray={`${(score.total / 100) * c} ${c}`} className="transition-[stroke-dasharray] duration-700" />}
                    </svg>
                    <span className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-logo text-[34px] font-extralight leading-none">{score ? score.total : "–"}</span>
                        <span className="mt-1 text-[10.5px] text-[var(--j-fa)]">of 100</span>
                    </span>
                </div>
                <div className="lg:hidden xl:block">
                    <p className="text-[16px] font-medium">Alture Score</p>
                    <p className="mt-1 max-w-[13rem] text-[12px] leading-relaxed text-[var(--j-mu)]">{score ? "From your own trades in this period." : `Shows from ${MIN_SCORE_TRADES} closed trades. ${count} so far.`}</p>
                </div>
            </div>
            <ul className="space-y-2.5">
                {(score?.parts ?? []).map((p) => (
                    <li key={p.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)_2rem] items-center gap-3 text-[12.5px]" title={p.detail}>
                        <span className="truncate text-[var(--j-mu)]">{p.label}</span>
                        <span className="h-[5px] rounded-full bg-[var(--j-s2)]">
                            <span className="block h-full rounded-full transition-[width] duration-700" style={{ width: `${p.value}%`, background: color(p.value) }} />
                        </span>
                        <span className="text-right font-mono tabular-nums">{Math.round(p.value)}</span>
                    </li>
                ))}
            </ul>
            <div className="lg:border-l lg:border-[var(--j-line)] lg:pl-8">
                <p className="text-[12.5px] text-[var(--j-mu)]">What your trades say</p>
                {insights.length === 0 ? (
                    <p className="mt-2 text-[13px] leading-relaxed text-[var(--j-fa)]">{score ? "No clear pattern yet in this period. Findings appear when a difference is large enough to matter." : "Findings appear once there are enough trades to compare."}</p>
                ) : (
                    <ul className="mt-2 space-y-2.5">
                        {insights.map((i) => (
                            <li key={i.text} className="flex gap-3 text-[13.5px] leading-relaxed">
                                <span className="mt-[8px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: i.tone === "up" ? "var(--j-up)" : i.tone === "down" ? "var(--j-dn)" : "var(--j-mu)" }} />
                                {i.text}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const Bars = ({ rows, sub = false }: { rows: Group[]; sub?: boolean }) => {
    const largest = Math.max(1, ...rows.map((r) => Math.abs(r.total)));
    return (
        <ul className="mt-2.5 space-y-2.5">
            {rows.map((r) => (
                <li key={r.label} className="grid grid-cols-[minmax(0,7.5rem)_1fr_5.5rem] items-center gap-3 text-[13px]">
                    <span className="truncate">
                        {r.label} <span className="text-[var(--j-fa)]">{r.count}</span>
                    </span>
                    <span className="h-[6px] rounded-full bg-[var(--j-s2)]" title={sub ? undefined : `${Math.round((r.wins / Math.max(1, r.count)) * 100)}% won`}>
                        <span className="block h-full rounded-full" style={{ width: `${(Math.abs(r.total) / largest) * 100}%`, background: r.total >= 0 ? "var(--j-up)" : "var(--j-dn)" }} />
                    </span>
                    <span className={`text-right font-mono text-[12.5px] ${tone(r.total)}`}>{money(r.total, 0)}</span>
                </li>
            ))}
        </ul>
    );
};

// ---------- the page ----------

type Preset = "month" | "previous" | "quarter" | "year" | "all" | "custom";
type Props = {
    trades: ClosedTrade[];
    positions: OpenPosition[];
    notes?: Record<string, string>;
    onSaveNote?: (dateKey: string, text: string | null) => void;
    sample?: boolean;
    reviewable?: boolean;
    status?: React.ReactNode;
    // Overrides for the theme's colours and shapes (used to compare looks).
    look?: Record<string, string>;
};
type Filter = "all" | "wins" | "losses" | "long" | "short";

function rangeOf(preset: Preset, custom: { from: string; to: string }, first: number): { from: number; to: number; label: string } {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth();
    if (preset === "month") return { from: Date.UTC(y, m, 1), to: Date.UTC(y, m + 1, 1), label: `${MONTHS[m]} ${y}` };
    if (preset === "previous") return { from: Date.UTC(y, m - 1, 1), to: Date.UTC(y, m, 1), label: `${MONTHS[(m + 11) % 12]} ${m === 0 ? y - 1 : y}` };
    if (preset === "quarter") {
        const q = Math.floor(m / 3);
        return { from: Date.UTC(y, q * 3, 1), to: Date.UTC(y, q * 3 + 3, 1), label: `Q${q + 1} ${y}` };
    }
    if (preset === "year") return { from: Date.UTC(y, 0, 1), to: Date.UTC(y + 1, 0, 1), label: String(y) };
    if (preset === "custom" && custom.from && custom.to) {
        const from = startOfDay(custom.from);
        const to = startOfDay(custom.to) + DAY;
        return { from: Math.min(from, to - DAY), to: Math.max(to, from + DAY), label: `${shortDay(from)} – ${shortDay(to - DAY)}` };
    }
    return { from: first, to: Infinity, label: "All time" };
}

const JournalStudio = ({ trades, positions, notes, onSaveNote, sample = false, reviewable = false, status, look }: Props) => {
    const [theme, setTheme] = useTheme();
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        try {
            setHidden(window.localStorage.getItem("alturelock:hide-amounts") === "1");
        } catch {
            // storage refused: amounts stay visible
        }
    }, []);
    const toggleHidden = () => {
        const next = !hidden;
        setHidden(next);
        try {
            window.localStorage.setItem("alturelock:hide-amounts", next ? "1" : "0");
        } catch {
            // the choice lasts for this visit
        }
    };
    HIDDEN = hidden;
    const [stored] = useTradeReviews();
    const reviews: TradeReviews = reviewable ? stored : {};
    const [preset, setPreset] = useState<Preset>("all");
    const [custom, setCustom] = useState({ from: "", to: "" });
    const [mode, setMode] = useState<Mode>("equity");
    const [filter, setFilter] = useState<Filter>("all");
    const [strategy, setStrategy] = useState<string | null>(null);
    const [day, setDay] = useState<string | null>(null);
    const [open, setOpen] = useState<string | null>(null);
    const [shown, setShown] = useState(8);
    const [lens, setLens] = useState<string>("Strategy");
    const [detail, setDetail] = useState<TradeDetail | null>(null);
    // Trades recorded in this browser (by hand or through Rules) can be added, corrected and deleted; imported ones come from the exchange.
    const [recorded, setRecorded] = useRecordedTrades();
    const [editing, setEditing] = useState<ClosedTrade | "new" | null>(null);
    const [removing, setRemoving] = useState<string | null>(null);
    const ownIds = new Set(recorded.map((t) => t.id));
    const saveTrade = (trade: ClosedTrade) => {
        setRecorded((list) => (list.some((t) => t.id === trade.id) ? list.map((t) => (t.id === trade.id ? trade : t)) : [trade, ...list]));
        setEditing(null);
    };
    const [sharing, setSharing] = useState(false);
    const [draft, setDraft] = useState("");

    const ordered = useMemo(() => [...trades].sort((a, b) => a.closedAt - b.closedAt), [trades]);
    const first = ordered.length ? Date.UTC(new Date(ordered[0].closedAt).getUTCFullYear(), new Date(ordered[0].closedAt).getUTCMonth(), 1) : Date.now();
    const range = rangeOf(preset, custom, first);
    const inRange = useMemo(() => ordered.filter((t) => t.closedAt >= range.from && t.closedAt < range.to), [ordered, range.from, range.to]);
    const stats = useMemo(() => computeJournalStats(inRange), [inRange]);
    const score = useMemo(() => scoreOf(inRange, reviews), [inRange, reviews]);
    const fees = inRange.reduce((s, t) => s + t.fee, 0);
    const unrealised = positions.reduce((s, p) => s + p.unrealisedPnl, 0);
    const strategyOf = (t: ClosedTrade) => reviews[t.id]?.strategy ?? t.setup;

    // The calendar's month: the latest month of the period that has a trade.
    const anchor = inRange.length ? new Date(inRange[inRange.length - 1].closedAt) : new Date(Math.min(Date.now(), range.to === Infinity ? Date.now() : range.to - 1));
    const [cal, setCal] = useState({ y: anchor.getUTCFullYear(), m: anchor.getUTCMonth() });
    useEffect(() => {
        setCal({ y: anchor.getUTCFullYear(), m: anchor.getUTCMonth() });
        setDay(null);
    }, [range.from, range.to, ordered.length]); // eslint-disable-line react-hooks/exhaustive-deps
    const byDay = useMemo(() => {
        const out = new Map<string, ClosedTrade[]>();
        for (const t of ordered) out.set(dayKey(t.closedAt), [...(out.get(dayKey(t.closedAt)) ?? []), t]);
        return out;
    }, [ordered]);
    const calTrades = ordered.filter((t) => {
        const d = new Date(t.closedAt);
        return d.getUTCFullYear() === cal.y && d.getUTCMonth() === cal.m;
    });
    const calTotal = calTrades.reduce((s, t) => s + t.profitLoss, 0);
    const lead = (new Date(Date.UTC(cal.y, cal.m, 1)).getUTCDay() + 6) % 7;
    const daysIn = new Date(Date.UTC(cal.y, cal.m + 1, 0)).getUTCDate();
    const today = dayKey(Date.now());
    const shift = (by: number) => {
        const d = new Date(Date.UTC(cal.y, cal.m + by, 1));
        setCal({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
        setDay(null);
    };
    const years = ordered.length ? Array.from({ length: new Date().getUTCFullYear() - new Date(ordered[0].closedAt).getUTCFullYear() + 1 }, (_, i) => new Date(ordered[0].closedAt).getUTCFullYear() + i) : [new Date().getUTCFullYear()];

    // Months of the whole journal, for the month chart; the ones inside the period are emphasised.
    const months = useMemo(() => {
        const out = new Map<string, { y: number; m: number; list: ClosedTrade[] }>();
        for (const t of ordered) {
            const d = new Date(t.closedAt);
            const k = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
            out.set(k, { y: d.getUTCFullYear(), m: d.getUTCMonth(), list: [...(out.get(k)?.list ?? []), t] });
        }
        return [...out.values()].slice(-12).map((v) => ({ ...v, total: v.list.reduce((s, t) => s + t.profitLoss, 0) }));
    }, [ordered]);
    const monthMax = Math.max(1, ...months.map((m) => Math.abs(m.total)));
    const pickMonth = (y: number, m: number) => {
        const pad = (n: number) => String(n).padStart(2, "0");
        setCustom({ from: `${y}-${pad(m + 1)}-01`, to: `${y}-${pad(m + 1)}-${pad(new Date(Date.UTC(y, m + 1, 0)).getUTCDate())}` });
        setPreset("custom");
    };

    const history = useMemo(
        () =>
            [...inRange].reverse().filter((t) => {
                if (day && dayKey(t.closedAt) !== day) return false;
                if (strategy && strategyOf(t) !== strategy) return false;
                if (filter === "wins") return t.profitLoss > 0;
                if (filter === "losses") return t.profitLoss < 0;
                if (filter === "long") return t.direction === "Long";
                if (filter === "short") return t.direction === "Short";
                return true;
            }),
        [inRange, day, strategy, filter, reviews] // eslint-disable-line react-hooks/exhaustive-deps
    );
    const strategies = [...new Set(ordered.map(strategyOf).filter(Boolean) as string[])];
    const scope = day ? inRange.filter((t) => dayKey(t.closedAt) === day) : inRange;
    const edge = edgeOf(scope);
    const byStrategy = strategies.map((s) => group(s, scope.filter((t) => strategyOf(t) === s))).filter((g) => g.count).sort((a, b) => b.total - a.total);
    const bySide = (["Long", "Short"] as const).map((d) => group(d, scope.filter((t) => t.direction === d))).filter((g) => g.count);
    const insights = insightsOf(inRange, reviews, strategyOf);
    const byAsset = [...new Set(scope.map((t) => t.instrument))].map((s) => group(asset(s), scope.filter((t) => t.instrument === s))).sort((a, b) => b.total - a.total);
    const byWeekday = [1, 2, 3, 4, 5, 6, 0].map((d, i) => group(WEEK[i], scope.filter((t) => new Date(t.closedAt).getUTCDay() === d))).filter((g) => g.count);
    const bySession = SESSIONS.map((s) => group(s.name, scope.filter((t) => { const h = new Date(t.openedAt ?? t.closedAt).getUTCHours(); return h >= s.from && h < s.to; }))).filter((g) => g.count);
    const rated = scope.filter((t) => reviews[t.id]?.rating);
    const byRating = [5, 4, 3, 2, 1].map((r) => group("★".repeat(r), rated.filter((t) => reviews[t.id]?.rating === r))).filter((g) => g.count);

    const selectDay = (k: string) => {
        const next = day === k ? null : k;
        setDay(next);
        setDraft(next ? notes?.[next] ?? "" : "");
        setShown(8);
    };
    const dayTrades = day ? byDay.get(day) ?? [] : [];
    const dayTotal = dayTrades.reduce((s, t) => s + t.profitLoss, 0);
    const vars = { ...THEMES[look ? "dark" : theme], ...look } as unknown as React.CSSProperties;
    const quiet = "text-[var(--j-mu)] transition-colors hover:text-[var(--j-ink)]";
    const presets: [Preset, string][] = [
        ["month", "This month"],
        ["previous", "Previous month"],
        ["quarter", "Quarter"],
        ["year", "Year"],
        ["all", "All time"],
    ];

    return (
        <div style={vars} className="-mx-4 -mt-6 min-h-[calc(100dvh-49px)] bg-[var(--j-bg)] [background-image:var(--j-glow,none)] px-4 pb-16 pt-6 text-[var(--j-ink)] md:-mx-8 md:px-8 xl:-mx-10 xl:px-10">
            {/* Period, theme and sharing */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2 text-[13px]">
                {presets.map(([id, text]) => (
                    <button key={id} type="button" aria-pressed={preset === id} onClick={() => setPreset(id)} className={`rounded-lg px-3 py-1.5 transition-colors ${preset === id ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : quiet}`}>
                        {text}
                    </button>
                ))}
                <span className={`ml-1 flex items-center gap-1.5 rounded-lg px-2.5 py-1 ${preset === "custom" ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "bg-[var(--j-s1)] shadow-[var(--j-shadow)]"}`}>
                    <input type="date" aria-label="From" value={custom.from} onChange={(e) => { setCustom({ ...custom, from: e.target.value }); if (custom.to) setPreset("custom"); }} className="!w-[8.6rem] !border-0 !bg-transparent !p-0 !text-[13px] !text-inherit [color-scheme:inherit]" />
                    <span className="opacity-50">–</span>
                    <input type="date" aria-label="To" value={custom.to} onChange={(e) => { setCustom({ ...custom, to: e.target.value }); if (custom.from) setPreset("custom"); }} className="!w-[8.6rem] !border-0 !bg-transparent !p-0 !text-[13px] !text-inherit" />
                </span>
                <span className="ml-auto flex items-center gap-4">
                    {status && <span className="hidden text-[12.5px] text-[var(--j-mu)] 2xl:inline">{status}</span>}
                    {reviewable && (
                        <button type="button" onClick={() => setEditing("new")} className="rounded-lg bg-[var(--j-active)] px-3 py-1.5 text-[var(--j-activeink)]">
                            + Add a trade
                        </button>
                    )}
                    {ordered.length > 0 && (
                        <button type="button" onClick={() => setSharing(true)} className={quiet}>
                            Share ↗
                        </button>
                    )}
                    <button type="button" onClick={toggleHidden} aria-pressed={hidden} title={hidden ? "Show amounts" : "Hide amounts"} className={`flex items-center gap-1.5 ${quiet}`}>
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                            <circle cx="12" cy="12" r="3" />
                            {hidden && <path d="M4 4l16 16" />}
                        </svg>
                        {hidden ? "Show amounts" : "Hide amounts"}
                    </button>
                    <span className="flex rounded-lg bg-[var(--j-s2)] p-0.5 text-[12px]" role="group" aria-label="Theme">
                        {(["light", "dark"] as const).map((t) => (
                            <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)} className={`rounded-md px-2.5 py-1 capitalize transition-colors ${theme === t ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                                {t}
                            </button>
                        ))}
                    </span>
                </span>
            </div>

            {reviewable && ordered.length === 0 && (
                <Module label="Start" className="mt-4 flex flex-wrap items-center justify-between gap-5 p-6">
                    <div>
                        <p className="text-[17px] font-medium">Your journal is empty.</p>
                        <p className="mt-1 max-w-xl text-[13.5px] text-[var(--j-mu)]">Add a trade you have already closed, or plan your next one with your rules: it lands here when you review it. Notes can already be kept for any day in the calendar.</p>
                    </div>
                    <span className="flex gap-3 text-[13.5px]">
                        <button type="button" onClick={() => setEditing("new")} className="rounded-lg bg-[var(--j-active)] px-4 py-2.5 text-[var(--j-activeink)]">
                            Add a trade
                        </button>
                        <a href="/alturelock/rules" className="rounded-lg bg-[var(--j-s2)] px-4 py-2.5">
                            Plan a trade
                        </a>
                    </span>
                </Module>
            )}

            {/* 1. Overview */}
            <Module label="Overview" className="!py-0 mt-4 grid overflow-hidden sm:grid-cols-3 xl:grid-cols-[1.25fr_repeat(5,1fr)]">
                <div className="p-5 sm:col-span-3 xl:col-span-1">
                    <p className="text-[12.5px] text-[var(--j-mu)]" title="Realised result of closed trades, after fees. Open positions count once closed.">Net P&amp;L · {range.label}</p>
                    <p className={`mt-2 leading-none tracking-tight ${inRange.length ? `font-logo text-[40px] font-extralight ${tone(stats.totalPnl)}` : "text-[26px] text-[var(--j-fa)]"}`}>{inRange.length ? money(stats.totalPnl) : "No trades yet"}</p>
                    <p className="mt-2 text-[12px] text-[var(--j-fa)]">{inRange.length ? (hidden ? "Realised, after fees" : `Realised, after ${plain(fees)} of fees`) : ordered.length ? "Choose another period" : ""}</p>
                </div>
                {(() => {
                    const empty = <span className="text-[var(--j-fa)]">–</span>;
                    const days = [...new Set(inRange.map((t) => dayKey(t.closedAt)))].map((k) => inRange.filter((t) => dayKey(t.closedAt) === k).reduce((s, t) => s + t.profitLoss, 0));
                    const greenDays = days.filter((v) => v > 0).length;
                    const redDays = days.filter((v) => v < 0).length;
                    const avgW = stats.wins ? stats.averageWin : 0;
                    const avgL = stats.losses ? Math.abs(stats.averageLoss) : 0;
                    const cell = "flex items-center gap-3.5 border-t border-[var(--j-line)] p-5 sm:border-l xl:border-t-0";
                    const head = (k: string, text = k) => <p className="text-[12.5px] text-[var(--j-mu)]" title={DEFINE[k]}>{text}</p>;
                    const big = "mt-1.5 font-mono text-[22px] leading-none";
                    const small = "mt-1.5 whitespace-nowrap text-[11.5px] text-[var(--j-fa)]";
                    return (
                        <>
                            <div className={cell}>
                                <Ring win={stats.wins} loss={stats.losses} />
                                <div className="min-w-0">
                                    {head("Win rate")}
                                    <p className={big}>{inRange.length ? `${Math.round(stats.winRate)}%` : empty}</p>
                                    <p className={small}>{inRange.length ? `${stats.wins} won · ${stats.losses} lost` : ""}</p>
                                </div>
                            </div>
                            <div className={cell}>
                                <Gauge value={stats.profitFactor} />
                                <div className="min-w-0">
                                    {head("Profit factor")}
                                    <p className={big}>{stats.profitFactor === null ? empty : stats.profitFactor.toFixed(2)}</p>
                                    <p className={small}>{stats.profitFactor === null ? (stats.losses === 0 && stats.wins ? "No losing trade" : "") : "Above 1 earns"}</p>
                                </div>
                            </div>
                            <div className={cell}>
                                <Ring win={greenDays} loss={redDays} />
                                <div className="min-w-0">
                                    {head("Day win rate")}
                                    <p className={big}>{days.length ? `${Math.round((greenDays / Math.max(1, greenDays + redDays)) * 100)}%` : empty}</p>
                                    <p className={small}>{days.length ? `${greenDays} green · ${redDays} red days` : ""}</p>
                                </div>
                            </div>
                            <div className="border-t border-[var(--j-line)] p-5 sm:border-l xl:border-t-0">
                                {head("Average win / loss")}
                                <p className={big}>{avgW && avgL ? `${(avgW / avgL).toFixed(2)} ×` : empty}</p>
                                <div className="mt-3 flex h-[7px] gap-[3px] overflow-hidden rounded-full">
                                    <span className="rounded-l-full bg-[var(--j-up)]" style={{ flex: avgW || (avgL ? 0 : 1) }} />
                                    <span className="rounded-r-full bg-[var(--j-dn)]" style={{ flex: avgL || (avgW ? 0 : 1) }} />
                                </div>
                                <p className="mt-1.5 flex justify-between font-mono text-[11.5px]">
                                    <span className="text-[var(--j-up)]">{avgW ? money(avgW, 0) : ""}</span>
                                    <span className="text-[var(--j-dn)]">{avgL ? money(-avgL, 0) : ""}</span>
                                </p>
                            </div>
                            <div className="border-t border-[var(--j-line)] p-5 sm:border-l xl:border-t-0">
                                {head("Trades")}
                                <p className={big}>{inRange.length ? stats.totalTrades : empty}</p>
                                <p className={small}>{inRange.length ? (stats.maxDrawdown < 0.005 ? "No drawdown yet" : `Max drawdown ${hidden ? `−${MASK}` : `−$${stats.maxDrawdown.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}`) : ""}</p>
                            </div>
                        </>
                    );
                })()}
            </Module>

            {/* 1b. Score and findings */}
            {inRange.length > 0 && (
                <Module label="Alture Score" className="!py-0 mt-4">
                    <ScoreCard score={score} insights={insights} count={inRange.length} />
                </Module>
            )}

            {/* 2. Performance and months */}
            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
                <Module label="Performance" className="p-5">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                        <h2 className="!text-[16px] !font-medium !text-[var(--j-ink)]">Performance</h2>
                        <span className="ml-auto flex gap-4 text-[13px]" role="tablist" aria-label="Chart">
                            {(
                                [
                                    ["equity", "Equity"],
                                    ["drawdown", "Drawdown"],
                                    ["outcomes", "Trade outcomes"],
                                ] as const
                            ).map(([id, text]) => (
                                <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={mode === id ? "border-b-[1.5px] border-[var(--j-ink)] pb-1 text-[var(--j-ink)]" : `pb-1 ${quiet}`}>
                                    {text}
                                </button>
                            ))}
                        </span>
                    </div>
                    <div className="mt-4">{inRange.length ? <Chart trades={inRange} mode={mode} /> : <p className="flex h-[300px] items-center justify-center text-sm text-[var(--j-mu)]">{ordered.length ? "No trade closed in this period." : "Your curve appears with your first recorded trade."}</p>}</div>
                </Module>

                <Module label="By month" className="flex flex-col p-5">
                    <div className="flex items-baseline justify-between">
                        <h2 className="!text-[16px] !font-medium !text-[var(--j-ink)]">By month</h2>
                        <span className="text-[12.5px] text-[var(--j-fa)]">Choose a month to filter</span>
                    </div>
                    {months.length ? (
                        <div className="mt-4 flex flex-1 items-stretch gap-2" style={{ minHeight: 210 }}>
                            {months.map((mo) => {
                                const inside = mo.list.some((t) => t.closedAt >= range.from && t.closedAt < range.to);
                                const h = (Math.abs(mo.total) / monthMax) * 100;
                                return (
                                    <button key={`${mo.y}-${mo.m}`} type="button" onClick={() => pickMonth(mo.y, mo.m)} title={`${MONTHS[mo.m]} ${mo.y}: ${money(mo.total)} over ${mo.list.length} trades`} className="group flex min-w-0 flex-1 flex-col items-center">
                                        <span className={`font-mono text-[11.5px] ${tone(mo.total)}`}>{axisMoney(mo.total)}</span>
                                        <span className="relative mt-1.5 flex w-full flex-1 items-end justify-center">
                                            <span className="w-full max-w-[64px] rounded-md transition-all group-hover:opacity-80" style={{ height: `${Math.max(3, h)}%`, background: mo.total >= 0 ? (inside ? "var(--j-up)" : "var(--j-upsoft)") : inside ? "var(--j-dn)" : "var(--j-dnbg)" }} />
                                        </span>
                                        <span className={`mt-2 text-[12px] ${inside ? "text-[var(--j-ink)]" : "text-[var(--j-mu)]"}`}>{MONTHS[mo.m].slice(0, 3)}</span>
                                        <span className="text-[11px] text-[var(--j-fa)]">{mo.list.length} trades</span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="mt-6 text-sm text-[var(--j-mu)]">Months appear with your first trade.</p>
                    )}
                    <p className="mt-4 border-t border-[var(--j-line)] pt-3 text-[12.5px] text-[var(--j-mu)]">
                        Fees in this period <span className="font-mono text-[var(--j-ink)]">{plain(fees)}</span>
                        {positions.length > 0 && (
                            <>
                                {" · "}Unrealised on open positions <span className={`font-mono ${tone(unrealised)}`}>{money(unrealised)}</span>
                            </>
                        )}
                    </p>
                </Module>
            </div>

            {/* 3. Calendar and the chosen day */}
            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
                <Module label="Calendar" className="p-5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <button type="button" aria-label="Previous month" onClick={() => shift(-1)} className={`h-8 w-8 rounded-lg text-lg ${quiet} hover:bg-[var(--j-s2)]`}>
                            ‹
                        </button>
                        <select aria-label="Month" value={cal.m} onChange={(e) => setCal({ ...cal, m: Number(e.target.value) })} className="!w-auto !border-0 !bg-transparent !p-0 !text-[17px] !font-medium !text-[var(--j-ink)]">
                            {MONTHS.map((name, i) => (
                                <option key={name} value={i}>
                                    {name}
                                </option>
                            ))}
                        </select>
                        <select aria-label="Year" value={cal.y} onChange={(e) => setCal({ ...cal, y: Number(e.target.value) })} className="!w-auto !border-0 !bg-transparent !p-0 !text-[17px] !text-[var(--j-mu)]">
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>
                        <button type="button" aria-label="Next month" onClick={() => shift(1)} className={`h-8 w-8 rounded-lg text-lg ${quiet} hover:bg-[var(--j-s2)]`}>
                            ›
                        </button>
                        <span className="ml-auto text-[12.5px] text-[var(--j-mu)]">
                            {calTrades.length} trades · <span className={`font-mono ${tone(calTotal)}`}>{calTrades.length ? money(calTotal, 0) : "–"}</span> · days in UTC
                        </span>
                    </div>
                    <div className="mt-4 grid grid-cols-7 gap-1.5">
                        {WEEK.map((w) => (
                            <span key={w} className="px-2 pb-1 text-[12px] text-[var(--j-mu)]">
                                {w}
                            </span>
                        ))}
                        {Array.from({ length: lead }, (_, i) => (
                            <span key={`lead-${i}`} />
                        ))}
                        {Array.from({ length: daysIn }, (_, i) => {
                            const k = `${cal.y}-${String(cal.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                            const list = byDay.get(k) ?? [];
                            const total = list.reduce((s, t) => s + t.profitLoss, 0);
                            const outside = list.length > 0 && !list.some((t) => t.closedAt >= range.from && t.closedAt < range.to);
                            return (
                                <button
                                    key={k}
                                    type="button"
                                    aria-pressed={day === k}
                                    aria-label={`${longDay(k)}${list.length ? `, ${list.length} ${list.length === 1 ? "trade" : "trades"}, ${money(total)}` : ", no trade"}${notes?.[k] ? ", has a note" : ""}`}
                                    onClick={() => selectDay(k)}
                                    className={`flex h-[74px] flex-col justify-between rounded-xl p-2 text-left transition-transform hover:-translate-y-0.5 ${day === k ? "ring-2 ring-[var(--j-ink)]" : k === today ? "ring-1 ring-[var(--j-fa)]" : ""} ${outside ? "opacity-45" : ""}`}
                                    style={{ background: list.length ? (total >= 0 ? "var(--j-upbg)" : "var(--j-dnbg)") : "var(--j-s2)" }}
                                >
                                    <span className="flex items-center justify-between">
                                        <span className={`text-[12px] ${k === today ? "font-semibold text-[var(--j-ink)]" : "text-[var(--j-mu)]"}`}>{i + 1}</span>
                                        {notes?.[k] && <span className="h-1.5 w-1.5 rounded-full bg-[var(--j-mu)]" aria-hidden="true" />}
                                    </span>
                                    {list.length > 0 && (
                                        <span className="block leading-tight">
                                            <span className={`block font-mono text-[13.5px] ${tone(total)}`}>{axisMoney(total).replace(/^(?!−)/, "+")}</span>
                                            <span className="block text-[11px] text-[var(--j-mu)]">
                                                {list.length} {list.length === 1 ? "trade" : "trades"}
                                            </span>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Module>

                <Module label="Day" className="p-5">
                    {day ? (
                        <>
                            <div className="flex items-baseline justify-between gap-3">
                                <h2 className="!text-[16px] !font-medium !text-[var(--j-ink)]">{longDay(day)}</h2>
                                <button type="button" onClick={() => setDay(null)} className={`text-[12.5px] ${quiet}`}>
                                    Clear ×
                                </button>
                            </div>
                            {dayTrades.length ? (
                                <>
                                    <p className={`mt-3 font-mono text-[28px] leading-none ${tone(dayTotal)}`}>{money(dayTotal)}</p>
                                    <p className="mt-2 text-[12.5px] text-[var(--j-mu)]">
                                        {dayTrades.length} {dayTrades.length === 1 ? "trade" : "trades"} · {dayTrades.filter((t) => t.profitLoss > 0).length} won · fees {plain(dayTrades.reduce((s, t) => s + t.fee, 0))}
                                    </p>
                                    <ul className="mt-4 divide-y divide-[var(--j-line)] text-[13.5px]">
                                        {dayTrades.map((t) => (
                                            <li key={t.id} className="flex justify-between gap-3 py-2">
                                                <button type="button" onClick={() => setOpen(t.id)} className="text-left">
                                                    {asset(t.instrument)} <span className="text-[var(--j-mu)]">{t.direction.toLowerCase()}{strategyOf(t) ? ` · ${strategyOf(t)}` : ""}</span>
                                                </button>
                                                <span className={`font-mono ${tone(t.profitLoss)}`}>{money(t.profitLoss)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            ) : (
                                <p className="mt-3 text-sm text-[var(--j-mu)]">No trade closed on this day.</p>
                            )}
                            {onSaveNote ? (
                                <>
                                    <p className="mt-5 text-[13px] font-medium">Note for the day</p>
                                    <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={() => onSaveNote(day, draft.trim() ? draft : null)} rows={3} maxLength={2000} placeholder="The market, your state of mind, what you would repeat." className="!mt-2 !block !w-full !rounded-xl !border-0 !bg-[var(--j-s2)] !px-3 !py-2.5 !text-[13.5px] !text-[var(--j-ink)] placeholder:!text-[var(--j-fa)]" />
                                </>
                            ) : (
                                notes?.[day] && <p className="mt-5 text-[13.5px] leading-relaxed">“{notes[day]}”</p>
                            )}
                        </>
                    ) : (
                        <>
                            <h2 className="!text-[16px] !font-medium !text-[var(--j-ink)]">{range.label}</h2>
                            <p className="mt-1 text-[12.5px] text-[var(--j-mu)]">Choose a day in the calendar to read it here.</p>
                            {inRange.length > 0 && (() => {
                                const dayTotals = [...new Set(inRange.map((t) => dayKey(t.closedAt)))].map((k) => ({ k, total: (byDay.get(k) ?? []).reduce((s, t) => s + t.profitLoss, 0) })).sort((a, b) => b.total - a.total);
                                const green = dayTotals.filter((d) => d.total > 0).length;
                                return (
                                    <dl className="mt-5 space-y-3 text-[13.5px]">
                                        {(
                                            [
                                                ["Best day", dayTotals[0]],
                                                ["Worst day", dayTotals[dayTotals.length - 1]],
                                            ] as const
                                        ).map(([k, d]) => (
                                            <div key={k} className="flex justify-between gap-3">
                                                <dt className="text-[var(--j-mu)]">{k}</dt>
                                                <dd>
                                                    <button type="button" onClick={() => { const dd = new Date(startOfDay(d.k)); setCal({ y: dd.getUTCFullYear(), m: dd.getUTCMonth() }); selectDay(d.k); }} className="text-right">
                                                        <span className={`font-mono ${tone(d.total)}`}>{money(d.total, 0)}</span> <span className="text-[var(--j-fa)]">{shortDay(startOfDay(d.k))}</span>
                                                    </button>
                                                </dd>
                                            </div>
                                        ))}
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[var(--j-mu)]">Positive days</dt>
                                            <dd className="font-mono">
                                                {green} of {dayTotals.length}
                                            </dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[var(--j-mu)]">Best trade</dt>
                                            <dd className={`font-mono ${tone(stats.bestTrade)}`}>{money(stats.bestTrade, 0)}</dd>
                                        </div>
                                        <div className="flex justify-between gap-3">
                                            <dt className="text-[var(--j-mu)]">Worst trade</dt>
                                            <dd className={`font-mono ${tone(stats.worstTrade)}`}>{money(stats.worstTrade, 0)}</dd>
                                        </div>
                                    </dl>
                                );
                            })()}
                            {positions.length > 0 && (
                                <div className="mt-6 border-t border-[var(--j-line)] pt-4">
                                    <p className="text-[13px] font-medium">Open now · not counted above</p>
                                    {positions.map((p) => (
                                        <p key={p.instrument + p.openedAt} className="mt-2 flex justify-between text-[13.5px]">
                                            <span>
                                                {asset(p.instrument)} <span className="text-[var(--j-mu)]">{p.direction.toLowerCase()} · {p.leverage}x</span>
                                            </span>
                                            <span className={`font-mono ${tone(p.unrealisedPnl)}`}>{money(p.unrealisedPnl)}</span>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </Module>
            </div>

            {/* 4. History and 5. analysis */}
            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)]">
                <Module label="Trades" className="p-5">
                    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[13px]">
                        <h2 className="mr-2 !text-[16px] !font-medium !text-[var(--j-ink)]">Trades</h2>
                        {(
                            [
                                ["all", "All"],
                                ["wins", "Wins"],
                                ["losses", "Losses"],
                                ["long", "Long"],
                                ["short", "Short"],
                            ] as const
                        ).map(([id, text]) => (
                            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)} className={filter === id ? "border-b-[1.5px] border-[var(--j-ink)] pb-0.5" : `pb-0.5 ${quiet}`}>
                                {text}
                            </button>
                        ))}
                        {strategies.length > 0 && (
                            <label className="flex items-baseline gap-1.5 text-[var(--j-mu)]">
                                Strategy
                                <select value={strategy ?? ""} onChange={(e) => setStrategy(e.target.value || null)} className="!w-auto !border-0 !bg-transparent !p-0 !text-[13px] !text-[var(--j-ink)]">
                                    <option value="">All</option>
                                    {strategies.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                        <span className="ml-auto text-[var(--j-fa)]">
                            {history.length} {history.length === 1 ? "trade" : "trades"}
                            {day ? ` on ${shortDay(startOfDay(day))}` : ""}
                        </span>
                    </div>
                    <div className="mt-3">
                        {history.length === 0 ? (
                            <p className="py-10 text-center text-sm text-[var(--j-mu)]">{day ? "No trade closed on this day." : inRange.length ? "No trade matches these filters." : "No trade in this period."}</p>
                        ) : (
                            history.slice(0, shown).map((t) => {
                                const r = reviews[t.id];
                                const isOpen = open === t.id;
                                const facts: [string, string, string?][] = [
                                    ["Entry → exit", `${price(t.entryPrice)} → ${price(t.exitPrice)}`, "mono"],
                                    ["Size", `${t.quantity} ${asset(t.instrument)} · ${t.leverage}x`],
                                    ["Net · fees", `${money(t.profitLoss)} · ${plain(t.fee)}`, "mono"],
                                ];
                                if (held(t)) facts.push(["Held", held(t)!]);
                                if (t.rulesFollowed !== undefined) facts.push(["Plan followed", t.rulesFollowed ? "Yes" : "No"]);
                                const missing = [!r?.rating && "rating", !strategyOf(t) && "strategy", !(r?.notes || t.reflection) && "note"].filter(Boolean) as string[];
                                return (
                                    <div key={t.id} className={`border-t border-[var(--j-line)] first:border-t-0 ${isOpen ? "pb-4" : ""}`}>
                                        <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : t.id)} className="grid w-full grid-cols-[4.5rem_minmax(0,1fr)_5rem_7rem] items-center gap-3 py-3 text-left text-[14px]">
                                            <span className="font-mono text-[12.5px] text-[var(--j-mu)]">{shortDay(t.closedAt)}</span>
                                            <span className="truncate">
                                                {asset(t.instrument)} <span className="text-[var(--j-mu)]">{t.direction.toLowerCase()}{strategyOf(t) ? ` · ${strategyOf(t)}` : ""}</span>
                                            </span>
                                            <span className="text-[12px] tracking-[0.12em] text-[var(--j-fa)]">{r?.rating ? "★".repeat(r.rating) : ""}</span>
                                            <span className={`text-right font-mono ${tone(t.profitLoss)}`}>{money(t.profitLoss)}</span>
                                        </button>
                                        {isOpen && (
                                            <div className="cockpit-rise rounded-xl bg-[var(--j-s2)] p-4">
                                                <div className="grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                                                    <div className="overflow-hidden rounded-lg bg-[#0f1113]">
                                                        <TradeRecap trade={t} sample={sample} bare />
                                                    </div>
                                                    <dl className="text-[13px]">
                                                        {facts.map(([k, v, f]) => (
                                                            <div key={k} className="flex justify-between gap-4 py-1.5">
                                                                <dt className="text-[var(--j-mu)]">{k}</dt>
                                                                <dd className={`text-right ${f ? "font-mono" : ""} ${v === "Yes" ? "text-[var(--j-up)]" : v === "No" ? "text-[var(--j-dn)]" : ""}`}>{v}</dd>
                                                            </div>
                                                        ))}
                                                        {strategyOf(t) && (
                                                            <div className="flex justify-between gap-4 py-1.5">
                                                                <dt className="text-[var(--j-mu)]">Strategy</dt>
                                                                <dd>{strategyOf(t)}</dd>
                                                            </div>
                                                        )}
                                                        {r?.rating && (
                                                            <div className="flex justify-between gap-4 py-1.5">
                                                                <dt className="text-[var(--j-mu)]">Execution</dt>
                                                                <dd className="tracking-[0.1em]">{"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}</dd>
                                                            </div>
                                                        )}
                                                    </dl>
                                                </div>
                                                {(r?.confluences?.length || r?.tags?.length) && (
                                                    <p className="mt-3 flex flex-wrap gap-1.5">
                                                        {[...(r?.confluences ?? []), ...(r?.tags ?? [])].map((c) => (
                                                            <span key={c} className="rounded-md bg-[var(--j-s1)] px-2 py-0.5 text-[12px]">
                                                                {c}
                                                            </span>
                                                        ))}
                                                    </p>
                                                )}
                                                {(r?.notes || t.reflection) && <p className="mt-3 text-[14px] leading-relaxed">“{r?.notes || t.reflection}”</p>}
                                                <p className="mt-3 flex flex-wrap items-baseline justify-between gap-3 text-[12.5px]">
                                                    <span className="text-[var(--j-fa)]">{missing.length ? `Not recorded yet: ${missing.join(", ")}.` : ""}</span>
                                                    <span className="flex flex-wrap items-baseline gap-4">
                                                        {reviewable && ownIds.has(t.id) && (
                                                            removing === t.id ? (
                                                                <span className="flex items-baseline gap-3">
                                                                    <span className="text-[var(--j-mu)]">Delete this trade?</span>
                                                                    <button type="button" onClick={() => { setRecorded((list) => list.filter((x) => x.id !== t.id)); setRemoving(null); setOpen(null); }} className="text-[var(--j-dn)]">
                                                                        Delete
                                                                    </button>
                                                                    <button type="button" onClick={() => setRemoving(null)} className={quiet}>
                                                                        Keep
                                                                    </button>
                                                                </span>
                                                            ) : (
                                                                <>
                                                                    <button type="button" onClick={() => setEditing(t)} className={quiet}>
                                                                        Edit
                                                                    </button>
                                                                    <button type="button" onClick={() => setRemoving(t.id)} className={quiet}>
                                                                        Delete
                                                                    </button>
                                                                </>
                                                            )
                                                        )}
                                                        <button type="button" onClick={() => setDetail({ kind: "closed", trade: t })} className={quiet}>
                                                            {reviewable ? "Review this trade →" : "Open the full trade →"}
                                                        </button>
                                                    </span>
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                        {history.length > shown && (
                            <button type="button" onClick={() => setShown(shown + 20)} className={`mt-3 text-[13px] ${quiet}`}>
                                Show {Math.min(20, history.length - shown)} more
                            </button>
                        )}
                    </div>
                </Module>

                <Module label="Analysis" className="p-5 xl:sticky xl:top-[66px] xl:self-start">
                    <h2 className="!text-[16px] !font-medium !text-[var(--j-ink)]">Analysis</h2>
                    <p className="mt-1 text-[12.5px] text-[var(--j-mu)]">{day ? longDay(day) : range.label}</p>
                    {scope.length === 0 ? (
                        <p className="mt-4 text-sm text-[var(--j-mu)]">Nothing to analyse in this selection.</p>
                    ) : (
                        <div className="mt-2 divide-y divide-[var(--j-line)]">
                            <dl className="grid grid-cols-3 gap-x-4 gap-y-3 py-3.5 text-[13px]">
                                {(
                                    [
                                        ...(edge.expectancyR !== null ? [["Expectancy", `${edge.expectancyR >= 0 ? "+" : ""}${edge.expectancyR.toFixed(2)} R`, tone(edge.expectancyR), "What each trade earned on average, in units of the risk taken."]] : []),
                                        ["Best win streak", `${edge.bestWin}`, "", "Most winning trades in a row."],
                                        ["Worst loss streak", `${edge.bestLoss}`, "", "Most losing trades in a row."],
                                        ["Current streak", edge.current === 0 ? "—" : `${Math.abs(edge.current)} ${edge.current > 0 ? "won" : "lost"}`, edge.current > 0 ? "text-[var(--j-up)]" : edge.current < 0 ? "text-[var(--j-dn)]" : "", "Where the latest trades of this selection stand."],
                                    ] as [string, string, string, string][]
                                ).map(([term, value, color, hint]) => (
                                    <div key={term} className="min-w-0">
                                        <dt className="text-[12px] text-[var(--j-mu)]" title={hint}>{term}</dt>
                                        <dd className={`mt-0.5 font-mono tabular-nums ${color}`}>{value}</dd>
                                    </div>
                                ))}
                            </dl>
                            {(() => {
                                const views = (
                                    [
                                        ["Strategy", byStrategy],
                                        ["Side", bySide],
                                        ["Asset", byAsset],
                                        ["Weekday", byWeekday],
                                        ["Session", bySession],
                                        ["Rating", byRating],
                                    ] as const
                                ).filter(([, rows]) => rows.length);
                                const current = views.find(([title]) => title === lens) ?? views[0];
                                if (!current) return null;
                                return (
                                    <div className="py-3.5">
                                        <div className="flex flex-wrap gap-1 rounded-lg bg-[var(--j-s2)] p-0.5 text-[12px]" role="tablist" aria-label="Analyse by">
                                            {views.map(([title]) => (
                                                <button key={title} type="button" role="tab" aria-selected={current[0] === title} onClick={() => setLens(title)} className={`flex-1 rounded-md px-2 py-1 transition-colors ${current[0] === title ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                                                    {title}
                                                </button>
                                            ))}
                                        </div>
                                        {current[0] === "Session" && <p className="mt-2 text-[11.5px] text-[var(--j-fa)]">Session of entry, UTC</p>}
                                        <Bars rows={current[1] as Group[]} />
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </Module>
            </div>

            {reviewable && (
                <Module className="mt-4 max-w-3xl p-1">
                    <Strategies />
                </Module>
            )}

            {sharing && <ShareMonth monthLabel={`${MONTHS[cal.m]} ${cal.y}`} monthShort={MONTHS[cal.m].slice(0, 3)} year={cal.y} month={cal.m} trades={calTrades} initialDay={day ? Number(day.slice(8)) : null} sample={sample} onClose={() => setSharing(false)} />}
            {editing && <TradeForm colours={vars} trade={editing === "new" ? undefined : editing} onSave={saveTrade} onClose={() => setEditing(null)} />}
            {detail && <TradeDetails detail={detail} onClose={() => setDetail(null)} reviewable={reviewable} colours={vars} masked={hidden} />}
        </div>
    );
};

export default JournalStudio;
