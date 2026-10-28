"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { useTradeReviews, TradeReviews } from "@/utils/workspace-store";
import TradeRecap from "./trade-recap";
import TradeDetails, { TradeDetail } from "./trade-details";
import ShareMonth from "./share-month";
import Strategies from "./strategies";

// The journal as one analysis environment: the result, a dominant chart that
// reads as equity, drawdown or outcomes, a month strip that filters the
// history, trades that open in place, and where the results come from.
// Every figure is computed from the trades it is given.

const TEAL = "#3cc9b8";
const PINK = "#e4609f";
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const SESSIONS = [
    { name: "Asia", from: 0, to: 7 },
    { name: "London", from: 7, to: 13 },
    { name: "New York", from: 13, to: 21 },
    { name: "Late", from: 21, to: 24 },
];
const money = (value: number, digits = 2) => `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
const axisMoney = (value: number) => {
    const a = Math.abs(value);
    return `${value < 0 ? "−" : ""}$${a >= 1000 ? `${(a / 1000).toFixed(a >= 10000 ? 0 : 1)}K` : a.toFixed(0)}`;
};
const tone = (value: number) => (value > 0 ? "text-[#3cc9b8]" : value < 0 ? "text-[#e4609f]" : "text-white/60");
const asset = (symbol: string) => symbol.replace(/USDT$/, "");
const price = (value: number) => value.toLocaleString("en-US", { maximumFractionDigits: value >= 100 ? 1 : 4 });
const held = (trade: ClosedTrade) => {
    if (trade.openedAt === undefined) return "Not recorded";
    const minutes = Math.round((trade.closedAt - trade.openedAt) / 60000);
    return minutes >= 1440 ? `${(minutes / 1440).toFixed(1)} days` : minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
};
const dayKey = (at: number) => new Date(at).toISOString().slice(0, 10);
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

// ---------- the chart ----------

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
    const height = 340;
    const axis = 64;
    const plotW = Math.max(0, width - axis);
    const plotH = height - 30;
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
    min -= mode === "equity" ? 0 : pad;
    const y = (v: number) => 10 + ((max - v) / (max - min)) * (plotH - 10);
    const x = (i: number) => (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
    const slot = n ? plotW / n : 0;
    const bx = (i: number) => i * slot + slot / 2;
    // Round steps for the price axis.
    const raw = (max - min) / 4;
    const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)));
    const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
    const ticks: number[] = [];
    for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
    // One label at the start of each month.
    const months: { i: number; label: string }[] = [];
    points.forEach((p, i) => {
        const d = new Date(p.trade.closedAt);
        const label = `${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear() !== new Date().getUTCFullYear() ? d.getUTCFullYear() : ""}`.trim();
        if (!months.length || months[months.length - 1].label !== label) months.push({ i, label });
    });
    const line = series.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
    const base = mode === "drawdown" ? y(0) : y(Math.max(min, 0));
    const color = mode === "drawdown" ? PINK : TEAL;
    const active = hover !== null ? points[hover] : null;
    const at = (clientX: number, el: HTMLElement) => {
        const px = clientX - el.getBoundingClientRect().left;
        if (!n || px < 0 || px > plotW) return setHover(null);
        setHover(mode === "outcomes" ? Math.min(n - 1, Math.floor(px / slot)) : Math.round((px / plotW) * (n - 1)));
    };
    const hx = hover === null ? 0 : mode === "outcomes" ? bx(hover) : x(hover);

    return (
        <div ref={ref} className="relative select-none" style={{ height }} onMouseMove={(e) => at(e.clientX, e.currentTarget)} onMouseLeave={() => setHover(null)} role="img" aria-label={n ? `${mode} over ${n} trades` : "No trades"}>
            {width > 0 && n > 0 && (
                <svg width={width} height={height} className="block overflow-visible">
                    <defs>
                        <linearGradient id="studio-fill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0" stopColor={color} stopOpacity={mode === "drawdown" ? 0 : 0.2} />
                            <stop offset="1" stopColor={color} stopOpacity={mode === "drawdown" ? 0.22 : 0} />
                        </linearGradient>
                        <linearGradient id="studio-sheen" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0" stopColor="#fff" stopOpacity="0" />
                            <stop offset="0.85" stopColor="#fff" stopOpacity="0.5" />
                            <stop offset="1" stopColor="#fff" stopOpacity="0.9" />
                        </linearGradient>
                        <clipPath id="studio-reveal">
                            <rect x="-4" y="-10" height={height + 20} width={drawn ? width + 8 : 0} style={{ transition: "width 0.9s cubic-bezier(0.2,0.7,0.2,1)" }} />
                        </clipPath>
                    </defs>
                    {ticks.map((v) => (
                        <g key={v}>
                            <line x1="0" x2={plotW} y1={y(v)} y2={y(v)} stroke={v === 0 ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.045)"} />
                            <text x={plotW + 14} y={y(v) + 4} fill="rgba(255,255,255,0.38)" fontSize="11.5" fontFamily="var(--font-geist-mono, ui-monospace), monospace">
                                {axisMoney(v)}
                            </text>
                        </g>
                    ))}
                    {months.map((m) => (
                        <text key={m.label + m.i} x={Math.min(plotW - 24, mode === "outcomes" ? bx(m.i) : x(m.i))} y={height - 6} fill="rgba(255,255,255,0.38)" fontSize="11.5">
                            {m.label}
                        </text>
                    ))}
                    <g clipPath="url(#studio-reveal)">
                        {mode === "outcomes" ? (
                            points.map((p, i) => {
                                const v = p.trade.profitLoss;
                                return <rect key={p.trade.id} x={bx(i) - Math.max(1, slot * 0.32)} width={Math.max(2, slot * 0.64)} y={Math.min(y(v), y(0))} height={Math.max(1, Math.abs(y(v) - y(0)))} fill={v >= 0 ? TEAL : PINK} opacity={hover === null || hover === i ? 0.95 : 0.3} rx="1" />;
                            })
                        ) : (
                            <>
                                <path d={`${line} L${x(n - 1)},${base} L${x(0)},${base} Z`} fill="url(#studio-fill)" />
                                <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
                                {/* A thin white light along the most recent stretch of the curve. */}
                                {mode === "equity" && <path d={line} fill="none" stroke="url(#studio-sheen)" strokeWidth="1.2" strokeLinejoin="round" style={{ mixBlendMode: "screen" }} />}
                                <circle cx={x(n - 1)} cy={y(series[n - 1])} r="3.5" fill="#fff" />
                                <circle cx={x(n - 1)} cy={y(series[n - 1])} r="10" fill="#fff" opacity="0.08" />
                            </>
                        )}
                    </g>
                    {active && hover !== null && (
                        <g>
                            <line x1={hx} x2={hx} y1="4" y2={plotH} stroke="rgba(255,255,255,0.22)" />
                            {mode !== "outcomes" && <circle cx={hx} cy={y(series[hover])} r="4.5" fill="#0a0b0d" stroke="#fff" strokeWidth="1.5" />}
                        </g>
                    )}
                </svg>
            )}
            {active && hover !== null && (
                <div className="pointer-events-none absolute z-10 w-56 bg-[#141619]/95 px-4 py-3 text-[12.5px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8)] backdrop-blur" style={{ left: Math.min(hx + 18, Math.max(0, plotW - 230)), top: 16 }}>
                    <p className="text-white/45">
                        Trade {hover + 1} of {n} · {new Date(active.trade.closedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })}
                    </p>
                    <p className="mt-1.5 text-white">
                        {asset(active.trade.instrument)} {active.trade.direction.toLowerCase()}
                        {active.trade.setup ? <span className="text-white/45"> · {active.trade.setup}</span> : null}
                    </p>
                    <p className="mt-2 flex justify-between">
                        <span className="text-white/45">Result</span>
                        <span className={`font-mono ${tone(active.trade.profitLoss)}`}>{money(active.trade.profitLoss)}</span>
                    </p>
                    <p className="mt-1 flex justify-between">
                        <span className="text-white/45">{mode === "drawdown" ? "Below the peak" : "Running total"}</span>
                        <span className="font-mono text-white">{money(mode === "drawdown" ? active.drawdown : active.equity)}</span>
                    </p>
                </div>
            )}
        </div>
    );
};

// ---------- analysis pieces ----------

const BarRows = ({ rows, sub = true }: { rows: Group[]; sub?: boolean }) => {
    const largest = Math.max(1, ...rows.map((r) => Math.abs(r.total)));
    return (
        <ul className="mt-3 space-y-3.5">
            {rows.map((r) => (
                <li key={r.label}>
                    <div className="grid grid-cols-[7.5rem_1fr_5.5rem] items-center gap-3 text-[13.5px]">
                        <span className="truncate text-white">
                            {r.label} {!sub && <span className="text-white/30">{r.count}</span>}
                        </span>
                        <span className="h-[5px] bg-white/[0.05]">
                            <span className="block h-full" style={{ width: `${(Math.abs(r.total) / largest) * 100}%`, background: r.total >= 0 ? `linear-gradient(90deg, rgba(60,201,184,0.35), ${TEAL})` : `linear-gradient(90deg, rgba(228,96,159,0.35), ${PINK})` }} />
                        </span>
                        <span className={`text-right font-mono text-[13px] ${tone(r.total)}`}>{money(r.total, 0)}</span>
                    </div>
                    {sub && (
                        <p className="mt-1 pl-[8.25rem] text-[12px] text-white/35">
                            {r.count} {r.count === 1 ? "trade" : "trades"} · {Math.round((r.wins / Math.max(1, r.count)) * 100)}% won
                        </p>
                    )}
                </li>
            ))}
        </ul>
    );
};

const Heading = ({ children }: { children: React.ReactNode }) => <h3 className="mt-9 text-[14px] font-medium text-white first:mt-4">{children}</h3>;

// ---------- the page ----------

type Props = {
    trades: ClosedTrade[];
    positions: OpenPosition[];
    notes?: Record<string, string>;
    onSaveNote?: (dateKey: string, text: string | null) => void;
    sample?: boolean;
    reviewable?: boolean;
    status?: React.ReactNode;
};
type Filter = "all" | "wins" | "losses" | "long" | "short";

const JournalStudio = ({ trades, positions, notes, onSaveNote, sample = false, reviewable = false, status }: Props) => {
    const [stored] = useTradeReviews();
    const reviews: TradeReviews = reviewable ? stored : {};
    const [mode, setMode] = useState<Mode>("equity");
    const [range, setRange] = useState<"1M" | "3M" | "All">("All");
    const [filter, setFilter] = useState<Filter>("all");
    const [strategy, setStrategy] = useState<string | null>(null);
    const [day, setDay] = useState<string | null>(null);
    const [open, setOpen] = useState<string | null>(null);
    const [shown, setShown] = useState(12);
    const [detail, setDetail] = useState<TradeDetail | null>(null);
    const [sharing, setSharing] = useState(false);
    const [draft, setDraft] = useState("");

    const ordered = useMemo(() => [...trades].sort((a, b) => a.closedAt - b.closedAt), [trades]);
    const ranged = useMemo(() => (range === "All" ? ordered : ordered.filter((t) => t.closedAt >= Date.now() - (range === "1M" ? 30 : 91) * 86400000)), [ordered, range]);
    const stats = useMemo(() => computeJournalStats(ranged), [ranged]);
    const strategyOf = (t: ClosedTrade) => reviews[t.id]?.strategy ?? t.setup;

    // The month shown in the strip: the latest month with a trade, or this month.
    const latest = ordered.length ? new Date(ordered[ordered.length - 1].closedAt) : new Date();
    const [month, setMonth] = useState({ y: latest.getUTCFullYear(), m: latest.getUTCMonth() });
    useEffect(() => {
        if (!ordered.length) return;
        const d = new Date(ordered[ordered.length - 1].closedAt);
        setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
    }, [ordered.length]); // eslint-disable-line react-hooks/exhaustive-deps
    const byDay = useMemo(() => {
        const out = new Map<string, ClosedTrade[]>();
        for (const t of ordered) out.set(dayKey(t.closedAt), [...(out.get(dayKey(t.closedAt)) ?? []), t]);
        return out;
    }, [ordered]);
    const daysIn = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    const monthTrades = ordered.filter((t) => {
        const d = new Date(t.closedAt);
        return d.getUTCFullYear() === month.y && d.getUTCMonth() === month.m;
    });
    const monthTotal = monthTrades.reduce((s, t) => s + t.profitLoss, 0);
    const tradedDays = new Set(monthTrades.map((t) => dayKey(t.closedAt))).size;
    const shiftMonth = (by: number) => {
        const d = new Date(Date.UTC(month.y, month.m + by, 1));
        setMonth({ y: d.getUTCFullYear(), m: d.getUTCMonth() });
        setDay(null);
    };

    const history = useMemo(() => {
        const list = [...ordered].reverse().filter((t) => {
            if (day && dayKey(t.closedAt) !== day) return false;
            if (strategy && strategyOf(t) !== strategy) return false;
            if (filter === "wins") return t.profitLoss > 0;
            if (filter === "losses") return t.profitLoss < 0;
            if (filter === "long") return t.direction === "Long";
            if (filter === "short") return t.direction === "Short";
            return true;
        });
        return list;
    }, [ordered, day, strategy, filter, reviews]); // eslint-disable-line react-hooks/exhaustive-deps
    const visible = history.slice(0, shown);
    const strategies = [...new Set(ordered.map(strategyOf).filter(Boolean) as string[])];

    // Where the results come from, on the chosen range.
    const byStrategy = strategies.map((s) => group(s, ranged.filter((t) => strategyOf(t) === s))).filter((g) => g.count).sort((a, b) => b.total - a.total);
    const longShort = (["Long", "Short"] as const).map((d) => group(d, ranged.filter((t) => t.direction === d)));
    const byAsset = [...new Set(ranged.map((t) => t.instrument))].map((s) => group(asset(s), ranged.filter((t) => t.instrument === s))).sort((a, b) => b.total - a.total);
    const byWeekday = [1, 2, 3, 4, 5, 6, 0].map((d) => group(WEEKDAYS[d], ranged.filter((t) => new Date(t.closedAt).getUTCDay() === d))).filter((g, i) => g.count || i < 5);
    const bySession = SESSIONS.map((s) => group(s.name, ranged.filter((t) => { const h = new Date(t.openedAt ?? t.closedAt).getUTCHours(); return h >= s.from && h < s.to; }))).filter((g) => g.count);
    const rated = ranged.filter((t) => reviews[t.id]?.rating);
    const byRating = [5, 4, 3, 2, 1].map((r) => group("★".repeat(r), rated.filter((t) => reviews[t.id]?.rating === r))).filter((g) => g.count);
    const days = [...new Set(ranged.map((t) => dayKey(t.closedAt)))].map((k) => ({ k, total: (byDay.get(k) ?? []).filter((t) => ranged.includes(t)).reduce((s, t) => s + t.profitLoss, 0) })).sort((a, b) => b.total - a.total);
    const weekMax = Math.max(1, ...byWeekday.map((g) => Math.abs(g.total)));

    const selectDay = (k: string) => {
        setDay(day === k ? null : k);
        setDraft(notes?.[k] ?? "");
        setShown(12);
    };
    const label = (k: string) => new Date(`${k}T00:00:00Z`).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });

    // History grouped by day.
    const groups: { k: string; trades: ClosedTrade[] }[] = [];
    for (const t of visible) {
        const k = dayKey(t.closedAt);
        if (groups.length && groups[groups.length - 1].k === k) groups[groups.length - 1].trades.push(t);
        else groups.push({ k, trades: [t] });
    }
    const link = "transition-colors hover:text-white";

    return (
        <div className="relative">
            {/* A soft white light from above, behind the result. */}
            <div className="pointer-events-none absolute -top-40 left-[8%] h-[420px] w-[70%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(255,255,255,0.07),transparent)]" aria-hidden="true" />

            <div className="relative flex flex-wrap items-end gap-x-14 gap-y-6">
                <div>
                    <p className="text-[13px] text-white/45">
                        Realised P&amp;L · {range === "All" ? "all time" : range === "1M" ? "last 30 days" : "last 3 months"}
                        {sample && <span className="ml-3 text-[#d9b75a]">Simulated trades</span>}
                    </p>
                    <p className={`mt-3 font-mono text-[56px] font-light leading-none tracking-[-0.04em] md:text-[64px] ${ranged.length ? tone(stats.totalPnl) : "text-white"}`}>{ranged.length ? money(stats.totalPnl) : "$0.00"}</p>
                </div>
                <dl className="flex flex-wrap gap-x-10 gap-y-4 pb-1.5">
                    {(
                        [
                            ["Trades", String(stats.totalTrades)],
                            ["Win rate", ranged.length ? `${Math.round(stats.winRate)}%` : "–"],
                            ["Profit factor", stats.profitFactor === null ? "–" : stats.profitFactor.toFixed(2)],
                            ["Per trade", ranged.length ? money(stats.expectancy, 0) : "–"],
                            ["Max drawdown", ranged.length ? `−$${stats.maxDrawdown.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "–"],
                        ] as const
                    ).map(([k, v]) => (
                        <div key={k}>
                            <dt className="text-[12.5px] text-white/45">{k}</dt>
                            <dd className="mt-1.5 font-mono text-xl text-white">{v}</dd>
                        </div>
                    ))}
                </dl>
                <div className="ml-auto flex items-center gap-5 pb-2 text-[13px]">
                    {status && <span className="hidden text-white/40 xl:inline">{status}</span>}
                    {ordered.length > 0 && (
                        <button type="button" onClick={() => setSharing(true)} className={`text-white/60 ${link}`}>
                            Share ↗
                        </button>
                    )}
                </div>
            </div>

            {/* Chart */}
            <div className="relative mt-10 flex flex-wrap items-baseline gap-x-7 border-b border-white/[0.06] text-[14px]" role="tablist" aria-label="Chart">
                {(
                    [
                        ["equity", "Equity"],
                        ["drawdown", "Drawdown"],
                        ["outcomes", "Trade outcomes"],
                    ] as const
                ).map(([id, text]) => (
                    <button key={id} type="button" role="tab" aria-selected={mode === id} onClick={() => setMode(id)} className={`-mb-px pb-3 transition-colors ${mode === id ? "border-b-[1.5px] border-[#3cc9b8] text-white" : "text-white/45 hover:text-white"}`}>
                        {text}
                    </button>
                ))}
                <span className="ml-auto flex gap-5 text-[13px]" role="group" aria-label="Period">
                    {(["1M", "3M", "All"] as const).map((r) => (
                        <button key={r} type="button" aria-pressed={range === r} onClick={() => setRange(r)} className={range === r ? "text-white" : `text-white/40 ${link}`}>
                            {r}
                        </button>
                    ))}
                </span>
            </div>
            <div className="relative mt-5">{ranged.length ? <Chart trades={ranged} mode={mode} /> : <p className="flex h-[340px] items-center justify-center text-sm text-white/40">{ordered.length ? "No trades in this period." : "Your curve appears with your first recorded trade."}</p>}</div>

            {/* Month strip */}
            <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3 text-[13px]">
                <p className="flex items-baseline gap-3">
                    <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className={`text-white/45 ${link}`}>
                        ‹
                    </button>
                    <span className="text-white">
                        {MONTHS[month.m]} {month.y}
                    </span>
                    <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className={`text-white/45 ${link}`}>
                        ›
                    </button>
                    <span className="text-white/40">
                        {tradedDays} trading {tradedDays === 1 ? "day" : "days"}
                        {monthTrades.length ? (
                            <>
                                {" · "}
                                <span className={`font-mono ${tone(monthTotal)}`}>{money(monthTotal, 0)}</span>
                            </>
                        ) : null}
                    </span>
                </p>
                <span className="text-white/35">{day ? <button type="button" onClick={() => setDay(null)} className={link}>Clear the day ×</button> : "Choose a day to read it below"}</span>
            </div>
            <div className="mt-3 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${daysIn}, minmax(0, 1fr))` }}>
                {Array.from({ length: daysIn }, (_, i) => {
                    const k = `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
                    const list = byDay.get(k) ?? [];
                    const total = list.reduce((s, t) => s + t.profitLoss, 0);
                    const strength = list.length ? Math.min(0.85, 0.25 + Math.abs(total) / 4000) : 0;
                    const weekend = [0, 6].includes(new Date(`${k}T00:00:00Z`).getUTCDay());
                    return (
                        <button
                            key={k}
                            type="button"
                            aria-pressed={day === k}
                            aria-label={`${label(k)}${list.length ? `: ${list.length} trades, ${money(total)}` : ""}${notes?.[k] ? ", has a note" : ""}`}
                            onClick={() => selectDay(k)}
                            className={`group relative h-10 transition-transform hover:-translate-y-0.5 ${day === k ? "outline outline-1 outline-offset-2 outline-white" : ""}`}
                            style={{ background: list.length ? (total >= 0 ? `rgba(60,201,184,${strength})` : `rgba(228,96,159,${strength})`) : weekend ? "rgba(255,255,255,0.018)" : "rgba(255,255,255,0.04)" }}
                        >
                            <span className="absolute left-1 top-0.5 text-[9.5px] text-white/35">{i + 1}</span>
                            {notes?.[k] && <span className="absolute bottom-1 right-1 h-1 w-1 rounded-full bg-white/70" aria-hidden="true" />}
                        </button>
                    );
                })}
            </div>

            {positions.length > 0 && (
                <p className="mt-8 text-[13px] text-white/55">
                    Open now:{" "}
                    {positions.map((p) => (
                        <span key={p.instrument + p.openedAt} className="mr-4 text-white">
                            {asset(p.instrument)} {p.direction.toLowerCase()} <span className={`font-mono ${tone(p.unrealisedPnl)}`}>{money(p.unrealisedPnl)}</span>
                        </span>
                    ))}
                </p>
            )}

            {/* History and analysis */}
            <div className="mt-14 grid gap-x-16 gap-y-14 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
                <section className="!bg-transparent !py-0" aria-label="Trades">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h2 className="!text-[18px] !font-medium text-white">{day ? label(day) : "Trades"}</h2>
                        <span className="text-[13px] text-white/40">
                            {history.length} {history.length === 1 ? "trade" : "trades"}
                        </span>
                    </div>
                    <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[13px]">
                        {(
                            [
                                ["all", "All"],
                                ["wins", "Wins"],
                                ["losses", "Losses"],
                                ["long", "Long"],
                                ["short", "Short"],
                            ] as const
                        ).map(([id, text]) => (
                            <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)} className={filter === id ? "text-white" : `text-white/45 ${link}`}>
                                {text}
                            </button>
                        ))}
                        {strategies.length > 0 && (
                            <label className="ml-auto flex items-baseline gap-2 text-white/45">
                                Strategy
                                <select value={strategy ?? ""} onChange={(e) => setStrategy(e.target.value || null)} className="!w-auto !border-0 !bg-transparent !p-0 !text-[13px] !text-white">
                                    <option value="">All</option>
                                    {strategies.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                    </div>

                    {day && onSaveNote && (
                        <div className="mt-6">
                            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} onBlur={() => onSaveNote(day, draft.trim() ? draft : null)} rows={2} maxLength={2000} placeholder="A note for this day: the market, your state of mind, what you would repeat." className="!block !w-full !rounded-none !border-0 !border-l !border-white/20 !bg-white/[0.025] !px-4 !py-3 !text-sm !text-white placeholder:!text-white/30" />
                        </div>
                    )}

                    {history.length === 0 ? (
                        <p className="mt-8 text-sm text-white/45">{day ? "No trade closed on this day." : "No trade matches these filters."}</p>
                    ) : (
                        groups.map((g) => {
                            const total = (byDay.get(g.k) ?? []).reduce((s, t) => s + t.profitLoss, 0);
                            return (
                                <div key={g.k} className="mt-7">
                                    <div className="flex items-baseline justify-between text-[12.5px]">
                                        <button type="button" onClick={() => selectDay(g.k)} className={`text-white/45 ${link}`}>
                                            {label(g.k)}
                                        </button>
                                        <span className={`font-mono ${tone(total)}`}>{money(total)}</span>
                                    </div>
                                    {g.trades.map((t) => {
                                        const r = reviews[t.id];
                                        const isOpen = open === t.id;
                                        const time = new Date(t.closedAt).toISOString().slice(11, 16);
                                        return (
                                            <div key={t.id} className={`border-t border-white/[0.05] transition-colors ${isOpen ? "-mx-5 mt-2 border-white/10 bg-gradient-to-b from-white/[0.045] to-white/[0.01] px-5 pb-6" : ""}`}>
                                                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : t.id)} className="grid w-full grid-cols-[3.5rem_minmax(0,1fr)_auto_6.5rem] items-center gap-3 py-3.5 text-left text-[14px] hover:text-white">
                                                    <span className="font-mono text-[12.5px] text-white/40">{time}</span>
                                                    <span className="truncate text-white">
                                                        {asset(t.instrument)} <span className="text-white/45">{t.direction.toLowerCase()}{strategyOf(t) ? ` · ${strategyOf(t)}` : ""}</span>
                                                    </span>
                                                    <span className="text-[12px] tracking-[0.1em] text-white/35">{r?.rating ? "★".repeat(r.rating) : ""}</span>
                                                    <span className={`text-right font-mono ${tone(t.profitLoss)}`}>{money(t.profitLoss)}</span>
                                                </button>
                                                {isOpen && (
                                                    <div className="cockpit-rise">
                                                        <div className="grid gap-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
                                                            <div className="overflow-hidden">
                                                                <TradeRecap trade={t} sample={sample} bare />
                                                            </div>
                                                            <dl className="text-[13px]">
                                                                {(
                                                                    [
                                                                        ["Entry → exit", `${price(t.entryPrice)} → ${price(t.exitPrice)}`],
                                                                        ["Size", `${t.quantity} ${asset(t.instrument)} at ${t.leverage}x`],
                                                                        ["Held", held(t)],
                                                                        ["Fees", `$${t.fee.toFixed(2)}`],
                                                                        ["Plan followed", t.rulesFollowed === undefined ? "Not recorded" : t.rulesFollowed ? "Yes" : "No"],
                                                                        ["Execution", r?.rating ? "★".repeat(r.rating) + "☆".repeat(5 - r.rating) : "Not rated"],
                                                                    ] as const
                                                                ).map(([k, v]) => (
                                                                    <div key={k} className="flex justify-between gap-4 py-1.5">
                                                                        <dt className="text-white/45">{k}</dt>
                                                                        <dd className={`text-right ${k === "Entry → exit" || k === "Fees" ? "font-mono" : ""} ${v === "Yes" ? "text-[#3cc9b8]" : v === "No" ? "text-[#e4609f]" : "text-white"}`}>{v}</dd>
                                                                    </div>
                                                                ))}
                                                            </dl>
                                                        </div>
                                                        {(r?.confluences?.length || r?.tags?.length) && <p className="mt-4 text-[12.5px] text-white/65">{[...(r?.confluences ?? []), ...(r?.tags ?? [])].join("  ·  ")}</p>}
                                                        {(r?.notes || t.reflection) && <p className="mt-3 text-[14px] leading-relaxed text-white/80">“{r?.notes || t.reflection}”</p>}
                                                        <button type="button" onClick={() => setDetail({ kind: "closed", trade: t })} className={`mt-4 text-[13px] text-white/55 ${link}`}>
                                                            {reviewable ? "Review this trade" : "Open the full trade"} →
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    )}
                    {history.length > shown && (
                        <button type="button" onClick={() => setShown(shown + 20)} className={`mt-6 text-[13px] text-white/55 ${link}`}>
                            Show {Math.min(20, history.length - shown)} more
                        </button>
                    )}
                </section>

                <aside className="xl:sticky xl:top-20 xl:self-start" aria-label="Where the results come from">
                    <h2 className="!text-[18px] !font-medium text-white">Where the results come from</h2>
                    {ranged.length === 0 ? (
                        <p className="mt-4 text-sm text-white/45">Appears with your first trades.</p>
                    ) : (
                        <>
                            {byStrategy.length > 0 && (
                                <>
                                    <Heading>By strategy</Heading>
                                    <BarRows rows={byStrategy} />
                                </>
                            )}

                            <Heading>Long or short</Heading>
                            <div className="mt-3.5 flex h-[6px] gap-[3px]">
                                {longShort.map((g, i) => (g.count ? <span key={g.label} style={{ flex: g.count, background: i ? "rgba(255,255,255,0.28)" : TEAL }} /> : null))}
                            </div>
                            <div className="mt-2.5 flex justify-between gap-4 text-[13px]">
                                {longShort.map((g) => (
                                    <span key={g.label}>
                                        {g.label} <span className="text-white/40">{g.count} · {g.count ? Math.round((g.wins / g.count) * 100) : 0}% won ·</span> <span className={`font-mono ${tone(g.total)}`}>{money(g.total, 0)}</span>
                                    </span>
                                ))}
                            </div>

                            <Heading>By asset</Heading>
                            <BarRows rows={byAsset} sub={false} />

                            <Heading>By weekday</Heading>
                            <div className="mt-3 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${byWeekday.length}, minmax(0,1fr))` }}>
                                {byWeekday.map((g) => (
                                    <div key={g.label} className="py-3 text-center text-[12px]" style={{ background: g.count ? (g.total >= 0 ? `rgba(60,201,184,${0.08 + (Math.abs(g.total) / weekMax) * 0.4})` : `rgba(228,96,159,${0.08 + (Math.abs(g.total) / weekMax) * 0.4})`) : "rgba(255,255,255,0.025)" }}>
                                        <span className="text-white/80">{g.label}</span>
                                        <span className={`mt-1 block font-mono text-[11px] ${g.count ? tone(g.total) : "text-white/25"}`}>{g.count ? axisMoney(g.total) : "–"}</span>
                                    </div>
                                ))}
                            </div>

                            {bySession.length > 0 && (
                                <>
                                    <Heading>By session of entry (UTC)</Heading>
                                    <BarRows rows={bySession} />
                                </>
                            )}

                            {byRating.length > 0 && (
                                <>
                                    <Heading>By execution rating</Heading>
                                    <BarRows rows={byRating} />
                                </>
                            )}

                            {days.length > 1 && (
                                <div className="mt-9 grid grid-cols-2 gap-6 text-[13px]">
                                    {[
                                        ["Best day", days[0]],
                                        ["Worst day", days[days.length - 1]],
                                    ].map(([k, d]) => {
                                        const v = d as { k: string; total: number };
                                        return (
                                            <button key={k as string} type="button" onClick={() => { const dd = new Date(`${v.k}T00:00:00Z`); setMonth({ y: dd.getUTCFullYear(), m: dd.getUTCMonth() }); selectDay(v.k); }} className="text-left">
                                                <span className="block text-white/45">{k as string}</span>
                                                <span className={`mt-1 block font-mono text-lg ${tone(v.total)}`}>{money(v.total, 0)}</span>
                                                <span className="text-[12px] text-white/35">{new Date(`${v.k}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}

                            <p className="mt-9 text-[12px] leading-relaxed text-white/35">
                                {ranged.length} {sample ? "simulated " : ""}
                                {ranged.length === 1 ? "trade" : "trades"}. Enough to describe what happened, not to prove an edge.
                            </p>
                        </>
                    )}
                </aside>
            </div>

            {reviewable && (
                <div className="mt-16 max-w-3xl">
                    <Strategies />
                </div>
            )}

            {sharing && <ShareMonth monthLabel={`${MONTHS[month.m]} ${month.y}`} monthShort={MONTHS[month.m].slice(0, 3)} year={month.y} month={month.m} trades={monthTrades} initialDay={day ? Number(day.slice(8)) : null} sample={sample} onClose={() => setSharing(false)} />}
            {detail && <TradeDetails detail={detail} onClose={() => setDetail(null)} reviewable={reviewable} />}
        </div>
    );
};

export default JournalStudio;
