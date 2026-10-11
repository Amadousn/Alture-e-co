"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { computeJournalStats, DailyPerformance } from "@/utils/journal-stats";
import TradeDetails, { TradeDetail } from "./trade-details";
import ShareMonth from "./share-month";
import DayPanel from "./day-panel";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WHITE = "#f5f5f5";
const RED = "#E955A8";

function formatSignedDollars(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatDollars(value: number): string {
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Calendar cells and gauges are narrow, so large amounts collapse to "+$1.2K".
function formatCompact(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    const abs = Math.abs(value);
    if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(abs >= 10000 ? 0 : 1)}K`;
    return `${sign}$${abs.toFixed(abs >= 100 ? 0 : 2)}`;
}

function formatPrice(value: number): string {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 6 })}`;
}

function formatTime(value: number): string {
    return new Date(value).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Eases a displayed number towards its new value whenever it changes.
function useCountUp(target: number, duration = 600): number {
    const [value, setValue] = useState(target);
    const from = useRef(target);
    useEffect(() => {
        const start = performance.now();
        const origin = from.current;
        let frame = 0;
        const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const next = origin + (target - origin) * eased;
            from.current = next;
            setValue(next);
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, duration]);
    return value;
}

const pnlColor = (value: number) => (value >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]");

const cardClass = "rounded-sm border border-white/15 bg-black";
const labelClass = "text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]";

// How many closed trades show before "Show all".
const COLLAPSED_TRADES = 4;

type SegmentId = "all" | "long" | "short" | "continuation" | "reversal";

const SEGMENT_FILTERS: Record<SegmentId, (trade: ClosedTrade) => boolean> = {
    all: () => true,
    long: (trade) => trade.direction === "Long",
    short: (trade) => trade.direction === "Short",
    continuation: (trade) => trade.setup === "Continuation",
    reversal: (trade) => trade.setup === "Reversal",
};

const DirectionTag = ({ direction, leverage }: { direction: "Long" | "Short"; leverage: number }) => (
    <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm text-black ${direction === "Long" ? "bg-[#20B8A8]" : "bg-[#E955A8]"}`}>
        {direction} {leverage.toLocaleString(undefined, { maximumFractionDigits: 1 })}×
    </span>
);

// Running P&L from zero. The line is white above break-even and red below it.
// Hovering (or dragging on touch) reads off the running total day by day.
const EquityCurve = ({ daily }: { daily: DailyPerformance[] }) => {
    const gradientId = useId();
    const fillId = useId();
    const [hover, setHover] = useState<number | null>(null);
    const height = 40;
    const values = [0, ...daily.map((d) => d.cumulative)];
    const min = Math.min(...values);
    const max = Math.max(...values);
    const span = max - min || 1;
    const y = (value: number) => height - 3 - ((value - min) / span) * (height - 6);
    const x = (i: number) => (i / (values.length - 1 || 1)) * 100;
    const zeroY = y(0);
    const line = values.map((value, i) => `${x(i)},${y(value)}`).join(" ");
    const zeroOffset = zeroY / height;

    const track = (clientX: number, target: HTMLDivElement) => {
        const rect = target.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        setHover(Math.round(ratio * (values.length - 1)));
    };
    const active = hover !== null && hover < values.length ? hover : null;
    const activeDay = active !== null && active > 0 ? daily[active - 1] : null;

    return (
        <div>
            <div
                className="relative h-20 cursor-crosshair touch-none"
                onPointerMove={(e) => track(e.clientX, e.currentTarget)}
                onPointerDown={(e) => track(e.clientX, e.currentTarget)}
                onPointerLeave={() => setHover(null)}
            >
                <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
                    <defs>
                        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={height}>
                            <stop offset={zeroOffset} stopColor={WHITE} />
                            <stop offset={zeroOffset} stopColor={RED} />
                        </linearGradient>
                        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor={WHITE} stopOpacity="0.12" />
                            <stop offset="1" stopColor={WHITE} stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    <polygon points={`0,${height} ${line} 100,${height}`} fill={`url(#${fillId})`} />
                    <line x1="0" x2="100" y1={zeroY} y2={zeroY} stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
                    <polyline points={line} fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.75" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                {active !== null && (
                    <>
                        <span className="absolute top-0 bottom-0 w-px bg-white/20 pointer-events-none" style={{ left: `${x(active)}%` }} />
                        <span
                            className={`absolute w-2 h-2 -ml-1 -mt-1 rounded-full pointer-events-none ${values[active] >= 0 ? "bg-white" : "bg-[#E955A8]"}`}
                            style={{ left: `${x(active)}%`, top: `${(y(values[active]) / height) * 100}%` }}
                        />
                    </>
                )}
            </div>
            <p className="text-[11px] tabular-nums text-gray-500 mt-2 h-4">
                {active === null ? (
                    <span className="font-sans font-light text-gray-600">Hover the curve to read each day</span>
                ) : activeDay ? (
                    <>
                        {activeDay.date} · day <span className={pnlColor(activeDay.profitLoss)}>{formatSignedDollars(activeDay.profitLoss)}</span> · total{" "}
                        <span className={pnlColor(activeDay.cumulative)}>{formatSignedDollars(activeDay.cumulative)}</span>
                    </>
                ) : (
                    "Start of month · $0.00"
                )}
            </p>
        </div>
    );
};

// One figure with a thin fill showing where it sits on its scale.
const Metric = ({ fraction, value, label, hint, negative }: { fraction: number; value: string; label: string; hint?: string; negative?: boolean }) => {
    // Starts empty so the bar sweeps in on first paint.
    const [drawn, setDrawn] = useState(false);
    useEffect(() => setDrawn(true), []);
    const clamped = drawn ? Math.max(0, Math.min(1, fraction)) : 0;
    return (
        <div className="bg-black px-4 py-3.5">
            <p className={`${labelClass} mb-1.5`}>{label}</p>
            <p className={`text-xl font-semibold tabular-nums ${negative ? "text-[#E955A8]" : "text-white"}`}>{value}</p>
            <div className="h-[3px] bg-white/15 mt-2.5">
                <div className={`h-full ${negative ? "bg-[#E955A8]" : "bg-white"}`} style={{ width: `${clamped * 100}%`, transition: "width 700ms cubic-bezier(0.22, 1, 0.36, 1)" }} />
            </div>
            <p className="text-[11px] tabular-nums text-[#7d7d87] mt-1.5 h-4">{hint}</p>
        </div>
    );
};

const Bars = ({ items }: { items: { label: string; value: number }[] }) => {
    const largest = Math.max(1, ...items.map((item) => Math.abs(item.value)));
    return (
        <div className="flex items-end gap-2 h-28">
            {items.map((item) => (
                <div key={item.label} className="flex-1 flex flex-col items-center justify-end gap-1.5 h-full min-w-0" title={`${item.label}: ${formatSignedDollars(item.value)}`}>
                    <span className={`text-[9px] tabular-nums ${item.value === 0 ? "text-gray-700" : pnlColor(item.value)}`}>{item.value === 0 ? "" : formatCompact(item.value)}</span>
                    <div
                        className={`w-full rounded-sm transition-all duration-500 hover:brightness-125 ${item.value < 0 ? "bg-[#E955A8]" : "bg-white/90"}`}
                        style={{ height: item.value === 0 ? 2 : `${Math.max(4, (Math.abs(item.value) / largest) * 60)}%`, opacity: item.value === 0 ? 0.15 : 1 }}
                    />
                    <span className="text-[10px] font-light text-gray-500">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

type Month = { year: number; month: number; label: string; short: string };

// The current month plus however many earlier months the synced range reaches.
function buildMonths(days: number): Month[] {
    const now = new Date();
    const earliest = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const months: Month[] = [];
    let year = now.getUTCFullYear();
    let month = now.getUTCMonth();
    while (year > earliest.getUTCFullYear() || (year === earliest.getUTCFullYear() && month >= earliest.getUTCMonth())) {
        const date = new Date(Date.UTC(year, month, 1));
        months.push({
            year,
            month,
            label: date.toLocaleString(undefined, { month: "long", year: "numeric", timeZone: "UTC" }),
            short: date.toLocaleString(undefined, { month: "short", timeZone: "UTC" }),
        });
        month -= 1;
        if (month < 0) {
            month = 11;
            year -= 1;
        }
    }
    return months;
}

type Props = {
    env?: "demo" | "live";
    readOnlyVerified?: boolean;
    days: number;
    trades: ClosedTrade[];
    positions: OpenPosition[];
    // Shows a greeting above the journal when given.
    ownerName?: string;
    // Replaces the "Synced from Bybit" line with the caller's own description
    // of where these trades come from.
    status?: React.ReactNode;
    // Daily notes, keyed YYYY-MM-DD. Passing onSaveNote turns every calendar
    // date into something that can be opened, traded on or not.
    notes?: Record<string, string>;
    onSaveNote?: (dateKey: string, text: string | null) => void;
    // Public demo: hides the greeting and labels the data as sample trades.
    sample?: boolean;
    onRefresh?: () => void;
};

const JournalDashboard = ({ env = "demo", readOnlyVerified = false, days, trades, positions, ownerName, status, notes, onSaveNote, sample, onRefresh }: Props) => {
    const months = useMemo(() => buildMonths(days), [days]);
    const [monthIndex, setMonthIndex] = useState(0);
    const [breakdown, setBreakdown] = useState<"weekday" | "month">("weekday");
    const [selectedDay, setSelectedDay] = useState<number | null>(null);
    const [detail, setDetail] = useState<TradeDetail | null>(null);
    const [sharing, setSharing] = useState(false);
    const [segment, setSegment] = useState<SegmentId>("all");
    const [showAllTrades, setShowAllTrades] = useState(false);
    const [dayPanel, setDayPanel] = useState<number | null>(null);
    const selected = months[monthIndex];

    // Clicking a calendar day narrows the list to that day and opens its first
    // trade; the arrows in the panel then step through the rest of the day.
    const openDay = (day: number) => {
        const dayTrades = monthTrades.filter((trade) => new Date(trade.closedAt).getUTCDate() === day);
        // With notes on, a date opens its own panel (note first, trades under it).
        if (onSaveNote) {
            setDayPanel(day);
            return;
        }
        setSelectedDay(day);
        if (dayTrades.length > 0) setDetail({ kind: "closed", trade: dayTrades[0] });
    };

    const dateKey = (day: number) => `${selected.year}-${String(selected.month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const changeMonth = (index: number) => {
        setMonthIndex(index);
        setSelectedDay(null);
        setSegment("all");
    };

    const monthTrades = useMemo(
        () =>
            trades.filter((trade) => {
                const closed = new Date(trade.closedAt);
                return closed.getUTCFullYear() === selected.year && closed.getUTCMonth() === selected.month;
            }),
        [trades, selected]
    );
    const stats = useMemo(() => computeJournalStats(monthTrades), [monthTrades]);
    const animatedPnl = useCountUp(stats.totalPnl);
    // Counts by direction and by setup. Setup is only known for trades that
    // went through the Trading Rules checklist; the rest are counted apart.
    const segments = useMemo(() => {
        const describe = (id: SegmentId, label: string, list: ClosedTrade[]) => {
            const wins = list.filter((trade) => trade.profitLoss > 0).length;
            return { id, label, count: list.length, winRate: list.length > 0 ? (wins / list.length) * 100 : 0, profitLoss: list.reduce((sum, trade) => sum + trade.profitLoss, 0) };
        };
        return [
            describe("all", "Total trades", monthTrades),
            describe("long", "Long", monthTrades.filter((trade) => trade.direction === "Long")),
            describe("short", "Short", monthTrades.filter((trade) => trade.direction === "Short")),
            describe("continuation", "Continuation", monthTrades.filter((trade) => trade.setup === "Continuation")),
            describe("reversal", "Reversal", monthTrades.filter((trade) => trade.setup === "Reversal")),
        ];
    }, [monthTrades]);
    const untagged = monthTrades.filter((trade) => trade.setup === undefined).length;

    const listedTrades = monthTrades.filter(
        (trade) => (selectedDay === null || new Date(trade.closedAt).getUTCDate() === selectedDay) && SEGMENT_FILTERS[segment](trade)
    );
    // The list opens on the latest few trades; the rest are one click away.
    // A day or a breakdown filter is already a short list, so it shows whole.
    const collapsible = selectedDay === null && segment === "all" && listedTrades.length > COLLAPSED_TRADES;
    const visibleTrades = collapsible && !showAllTrades ? listedTrades.slice(0, COLLAPSED_TRADES) : listedTrades;

    // Where the open details panel sits in the list, so it can step through it.
    const detailIndex = detail?.kind === "closed" ? listedTrades.findIndex((trade) => trade.id === detail.trade.id) : -1;

    // The breakdown card looks across the whole synced range, not one month.
    const breakdownItems = useMemo(() => {
        if (breakdown === "weekday") {
            const totals = Array(7).fill(0);
            trades.forEach((trade) => {
                totals[new Date(trade.closedAt).getUTCDay()] += trade.profitLoss;
            });
            return WEEKDAYS.map((label, i) => ({ label, value: totals[i] }));
        }
        return [...months].reverse().map((m) => ({
            label: m.short,
            value: trades
                .filter((trade) => {
                    const closed = new Date(trade.closedAt);
                    return closed.getUTCFullYear() === m.year && closed.getUTCMonth() === m.month;
                })
                .reduce((sum, trade) => sum + trade.profitLoss, 0),
        }));
    }, [breakdown, trades, months]);

    const dailyByDay = new Map(stats.daily.map((day) => [Number(day.date.slice(8)), day]));
    const daysInMonth = new Date(Date.UTC(selected.year, selected.month + 1, 0)).getUTCDate();
    const firstWeekday = new Date(Date.UTC(selected.year, selected.month, 1)).getUTCDay();
    const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    const now = new Date();
    const today = now.getUTCFullYear() === selected.year && now.getUTCMonth() === selected.month ? now.getUTCDate() : null;

    return (
        <div className="max-w-6xl mx-auto text-left">
            {ownerName && (
                <>
                    <h1 className="text-3xl sm:text-4xl font-light text-white leading-snug mb-2">
                        Welcome back{ownerName ? <>, <span className="text-primary">{ownerName}</span></> : ""}
                    </h1>
                    <p className="text-sm font-light text-gray-500 mb-8">
                        {now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })} · {positions.length === 0 ? "no open positions" : `${positions.length} open ${positions.length === 1 ? "position" : "positions"}`}
                    </p>
                </>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {status ? (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#9a9aa5]">{status}</div>
                ) : sample ? (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-[10px] tabular-nums uppercase px-1.5 py-0.5 rounded-sm bg-accent/15 text-accent">Demo</span>
                        <span className="font-light">Sample trades, not a real account. Click a day or a trade to open it, hover the curve.</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex rounded-full h-1.5 w-1.5 bg-[#20B8A8]" />
                        <span className="uppercase tracking-[0.15em]">Synced from Bybit</span>
                        <span className={`text-[10px] tabular-nums uppercase px-1.5 py-0.5 rounded ${env === "live" ? "bg-[#E955A8]/10 text-[#E955A8]" : "bg-white/5 text-gray-400"}`}>{env}</span>
                        <span className="text-gray-600 font-light hidden sm:inline">{readOnlyVerified ? "· read-only key confirmed" : "· read-only not confirmed on demo"}</span>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    {onRefresh && (
                        <button type="button" onClick={onRefresh} className="text-xs text-gray-500 hover:text-white transition-colors">
                            Refresh
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setSharing(true)}
                        disabled={stats.totalTrades === 0}
                        className="share-month-button group relative overflow-hidden h-10 pl-4 pr-3 rounded-sm bg-white text-black text-xs font-semibold flex items-center gap-2.5 transition-colors hover:bg-[#e9e9ec] disabled:opacity-30 disabled:hover:bg-white"
                    >
                        {/* A soft band sweeps across the button every few seconds */}
                        <span className="share-month-shine pointer-events-none absolute inset-y-0 -left-1/2 w-1/2" aria-hidden="true" />
                        <span className="relative">Share results</span>
                        <span className="relative flex h-5 w-5 items-center justify-center rounded-sm bg-black text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3">
                                <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col gap-4">
                    {/* Overall performance */}
                    <div className={`${cardClass} p-5`}>
                        <div className="flex items-center justify-between gap-3 mb-3">
                            <p className={labelClass}>Overall performance</p>
                            <p className="text-[11px] font-light text-gray-500">{selected.label}</p>
                        </div>
                        <p className={`text-[34px] leading-none font-semibold tracking-tight tabular-nums mb-4 ${stats.totalPnl >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{formatSignedDollars(animatedPnl)}</p>
                        <EquityCurve daily={stats.daily} />
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-light text-gray-500 mt-3">
                            <span>
                                {stats.totalTrades} {stats.totalTrades === 1 ? "trade" : "trades"}
                            </span>
                            <span className="text-gray-700">·</span>
                            <span>{formatDollars(stats.totalFees)} fees</span>
                            <span className="text-gray-700">·</span>
                            <span>{formatDollars(stats.maxDrawdown)} max drawdown</span>
                        </div>
                    </div>

                    {/* Key metrics */}
                    <div className={`${cardClass} overflow-hidden`}>
                        <p className={`${labelClass} px-4 pt-4 pb-3`}>Key metrics</p>
                        <div className="grid grid-cols-2 gap-px bg-white/15 border-t border-white/15">
                            <Metric fraction={stats.winRate / 100} value={`${stats.winRate.toFixed(0)}%`} label="Win rate" hint={`${stats.wins}W / ${stats.losses}L`} />
                            <Metric fraction={(stats.profitFactor ?? 0) / 3} value={stats.profitFactor === null ? "—" : stats.profitFactor.toFixed(2)} label="Profit factor" hint="Gross profit / gross loss" />
                            <Metric fraction={(stats.payoffRatio ?? 0) / 3} value={stats.payoffRatio === null ? "—" : stats.payoffRatio.toFixed(2)} label="Win / loss size" hint={`${formatCompact(stats.averageWin)} vs ${formatCompact(stats.averageLoss)}`} />
                            <Metric
                                fraction={stats.averageWin > 0 ? Math.abs(stats.expectancy) / stats.averageWin : 0}
                                value={stats.totalTrades === 0 ? "—" : formatCompact(stats.expectancy)}
                                label="Per trade"
                                hint="Average result"
                                negative={stats.expectancy < 0}
                            />
                        </div>
                    </div>

                    {/* Weekday / monthly breakdown */}
                    <div className={`${cardClass} p-5`}>
                        <div className="flex items-center justify-between gap-3 mb-4">
                            <p className={labelClass}>P&amp;L by {breakdown === "weekday" ? "weekday" : "month"}</p>
                            <div className="flex items-center rounded-sm border border-white/25 p-0.5 text-[11px]">
                                {(["weekday", "month"] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        type="button"
                                        onClick={() => setBreakdown(mode)}
                                        aria-pressed={breakdown === mode}
                                        className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${breakdown === mode ? "bg-white text-black lit" : "text-[#9a9aa5] hover:text-white"}`}
                                    >
                                        {mode === "weekday" ? "Weekday" : "Monthly"}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Bars items={breakdownItems} />
                        <p className="text-[10px] font-light text-gray-600 mt-3">Last {days} days</p>
                    </div>
                </div>

                {/* P&L calendar */}
                <div className={`${cardClass} p-4 md:p-5 lg:col-span-2`}>
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <p className={labelClass}>Calendar</p>
                        <div className="flex items-center gap-1 rounded-sm border border-white/25 px-1 py-0.5">
                            <button
                                type="button"
                                onClick={() => changeMonth(monthIndex + 1)}
                                disabled={monthIndex >= months.length - 1}
                                aria-label="Previous month"
                                className="text-gray-400 hover:text-white transition-colors disabled:opacity-25 disabled:hover:text-gray-400 px-2"
                            >
                                ‹
                            </button>
                            <span className="text-xs font-light text-white min-w-[104px] text-center">{selected.label}</span>
                            <button
                                type="button"
                                onClick={() => changeMonth(monthIndex - 1)}
                                disabled={monthIndex === 0}
                                aria-label="Next month"
                                className="text-gray-400 hover:text-white transition-colors disabled:opacity-25 disabled:hover:text-gray-400 px-2"
                            >
                                ›
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 md:gap-2">
                        {WEEKDAYS.map((day) => (
                            <div key={day} className="text-[10px] font-light text-gray-600 text-center pb-1">
                                {day}
                            </div>
                        ))}
                        {cells.map((day, i) => {
                            if (day === null) return <div key={`blank-${i}`} />;
                            const performance = dailyByDay.get(day);
                            const hasNote = Boolean(notes?.[dateKey(day)]);
                            const tone = !performance
                                ? "bg-[#0c0c0c]"
                                : performance.profitLoss >= 0
                                    ? "bg-[#20B8A8]/[0.18]"
                                    : "bg-[#E955A8]/[0.14]";
                            const cellClass = `rounded-sm ${tone} ${day === selectedDay ? "ring-1 ring-accent" : day === today ? "ring-1 ring-white/40" : ""} min-h-[54px] md:min-h-[86px] p-1.5 md:p-2.5 flex flex-col justify-between text-left`;
                            const dayNumber = (
                                <span className="flex items-center justify-end gap-1.5 w-full text-[10px] tabular-nums text-[#7d7d87]">
                                    {hasNote && <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" aria-hidden="true" />}
                                    {day}
                                </span>
                            );
                            if (!performance && !onSaveNote) {
                                return (
                                    <div key={day} className={cellClass}>
                                        {dayNumber}
                                    </div>
                                );
                            }
                            const described = performance
                                ? `${formatSignedDollars(performance.profitLoss)}, ${performance.trades} ${performance.trades === 1 ? "trade" : "trades"}`
                                : "no trades";
                            return (
                                <button
                                    key={day}
                                    type="button"
                                    onClick={() => openDay(day)}
                                    aria-pressed={day === selectedDay}
                                    aria-label={`${selected.short} ${day}: ${described}${hasNote ? ", has a note" : ""}`}
                                    className={`${cellClass} transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-125`}
                                >
                                    {dayNumber}
                                    {performance && (
                                        <span>
                                            <span className={`block text-[10px] md:text-sm tabular-nums leading-tight ${pnlColor(performance.profitLoss)}`}>{formatCompact(performance.profitLoss)}</span>
                                            <span className="hidden md:block text-[10px] font-light text-[#7d7d87] mt-0.5">
                                                {performance.trades} {performance.trades === 1 ? "trade" : "trades"}
                                            </span>
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-[10px] font-light text-[#7d7d87] mt-3">
                        {onSaveNote ? (
                            <>
                                Days are counted in UTC. Click any date to add a note or see its trades. <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FACC15] mx-1 align-middle" aria-hidden="true" /> marks a date with a note.
                            </>
                        ) : (
                            "Days are counted in UTC. Click a day to open its trades."
                        )}
                    </p>
                </div>
            </div>

            {/* Trade breakdown: click a figure to filter the list below */}
            <div className={`${cardClass} overflow-hidden mb-4`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 pt-4 pb-3">
                    <p className={labelClass}>Trade breakdown · {selected.label}</p>
                    <p className="text-[11px] text-[#7d7d87]">
                        Continuation and reversal are recorded by the Trading Rules checklist
                        {untagged > 0 ? `. ${untagged} ${untagged === 1 ? "trade was" : "trades were"} placed without it.` : "."}
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/15 border-t border-white/15">
                    {segments.map((item) => {
                        const active = segment === item.id;
                        const total = monthTrades.length || 1;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setSegment(active ? "all" : item.id)}
                                aria-pressed={active}
                                className={`text-left px-4 py-3.5 transition-colors ${item.id === "all" ? "col-span-2 md:col-span-1" : ""} ${active ? "bg-[#17171c] shadow-[inset_0_2px_0_#E3A1F7]" : "bg-black hover:bg-[#0c0c0c]"}`}
                            >
                                <span className={`${labelClass} flex items-center justify-between gap-2 mb-1.5`}>
                                    {item.label}
                                    {active && item.id !== "all" && <span className="text-white normal-case tracking-normal">Filtering ×</span>}
                                </span>
                                <span className="flex items-baseline gap-2">
                                    <span className="text-2xl font-semibold tabular-nums text-white">{item.count}</span>
                                    {item.id !== "all" && item.count > 0 && <span className="text-[11px] tabular-nums text-[#7d7d87]">{Math.round((item.count / total) * 100)}% of trades</span>}
                                </span>
                                <span className="flex items-center justify-between gap-2 text-[11px] tabular-nums mt-2">
                                    <span className="text-[#7d7d87]">{item.count === 0 ? "No trades" : `${item.winRate.toFixed(0)}% win rate`}</span>
                                    {item.count > 0 && <span className={pnlColor(item.profitLoss)}>{formatCompact(item.profitLoss)}</span>}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Open positions */}
            <div className={`${cardClass} p-5 mb-4`}>
                <p className={`${labelClass} mb-3`}>Open positions</p>
                {positions.length === 0 ? (
                    <p className="text-sm font-light text-gray-500">No open positions.</p>
                ) : (
                    <ul className="divide-y divide-white/5">
                        {positions.map((position) => (
                            <li key={`${position.instrument}-${position.direction}`}>
                                <button
                                    type="button"
                                    onClick={() => setDetail({ kind: "open", position })}
                                    className="w-full py-3 flex items-center justify-between gap-4 text-left rounded-sm -mx-2 px-2 hover:bg-[#0c0c0c] transition-colors"
                                >
                                    <span className="min-w-0">
                                        <span className="flex items-center gap-2 mb-1">
                                            <span className="text-sm font-light text-white tabular-nums">{position.instrument}</span>
                                            <DirectionTag direction={position.direction} leverage={position.leverage} />
                                        </span>
                                        <span className="block text-xs text-gray-500 tabular-nums">
                                            {formatPrice(position.entryPrice)} → {formatPrice(position.markPrice)} · {formatDollars(position.positionSize)} position
                                        </span>
                                    </span>
                                    <span className={`text-sm tabular-nums flex-shrink-0 ${pnlColor(position.unrealisedPnl)}`}>{formatSignedDollars(position.unrealisedPnl)}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Closed trades */}
            <div className={`${cardClass} p-5`}>
                <div className="flex items-center justify-between gap-4 mb-3">
                    <p className={labelClass}>
                        Closed trades · {selectedDay === null ? selected.label : `${selected.short} ${selectedDay}`}
                        {segment !== "all" && ` · ${segments.find((item) => item.id === segment)?.label}`}
                    </p>
                    {selectedDay !== null && (
                        <button type="button" onClick={() => setSelectedDay(null)} className="text-xs text-gray-500 hover:text-white transition-colors">
                            Show whole month
                        </button>
                    )}
                </div>
                {listedTrades.length === 0 ? (
                    <p className="text-sm font-light text-gray-500">{monthTrades.length === 0 ? "No closed trades this month." : "No trades match this filter."}</p>
                ) : (
                    <div className="overflow-x-auto -mx-2">
                        <table className="w-full text-xs tabular-nums">
                            <thead>
                                <tr className="text-[10px] text-gray-500 uppercase tracking-[0.1em]">
                                    <th className="text-left font-light p-2">Trade</th>
                                    <th className="text-right font-light p-2">Entry</th>
                                    <th className="text-right font-light p-2">Exit</th>
                                    <th className="text-right font-light p-2">P&amp;L</th>
                                    <th className="text-right font-light p-2">Closed</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {visibleTrades.map((trade) => (
                                    <tr
                                        key={trade.id}
                                        onClick={() => setDetail({ kind: "closed", trade })}
                                        className="cursor-pointer hover:bg-[#0c0c0c] transition-colors"
                                    >
                                        <td className="p-2 py-3 whitespace-nowrap">
                                            <button type="button" aria-label={`Open details for ${trade.instrument} ${trade.direction}`} className="inline-block mr-2 text-gray-500">
                                                ›
                                            </button>
                                            <span className="text-white mr-2">{trade.instrument}</span>
                                            <DirectionTag direction={trade.direction} leverage={trade.leverage} />
                                        </td>
                                        <td className="p-2 text-right text-gray-300">{formatPrice(trade.entryPrice)}</td>
                                        <td className="p-2 text-right text-gray-300">{formatPrice(trade.exitPrice)}</td>
                                        <td className={`p-2 text-right ${pnlColor(trade.profitLoss)}`}>{formatSignedDollars(trade.profitLoss)}</td>
                                        <td className="p-2 text-right text-gray-500 whitespace-nowrap">{formatTime(trade.closedAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {collapsible && (
                    <button
                        type="button"
                        onClick={() => setShowAllTrades((open) => !open)}
                        aria-expanded={showAllTrades}
                        className="mt-3 w-full h-10 rounded-sm border border-white/25 text-xs font-semibold text-white hover:bg-white/10 transition-colors"
                    >
                        {showAllTrades ? "Show fewer" : `Show all ${listedTrades.length} trades`}
                    </button>
                )}
            </div>

            <style jsx>{`
                @keyframes shareMonthShine {
                    0%, 62% { transform: translateX(0) skewX(-18deg); opacity: 0; }
                    66% { opacity: 1; }
                    92% { opacity: 1; }
                    100% { transform: translateX(420%) skewX(-18deg); opacity: 0; }
                }
                .share-month-shine {
                    background: linear-gradient(90deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0));
                    animation: shareMonthShine 3.6s ease-in-out infinite;
                }
                .share-month-button:disabled .share-month-shine {
                    display: none;
                }
                @media (prefers-reduced-motion: reduce) {
                    .share-month-shine {
                        animation: none;
                        display: none;
                    }
                }
            `}</style>

            {dayPanel !== null && onSaveNote && (
                <DayPanel
                    key={dateKey(dayPanel)}
                    dateLabel={new Date(Date.UTC(selected.year, selected.month, dayPanel)).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })}
                    note={notes?.[dateKey(dayPanel)] ?? ""}
                    onSave={(text) => onSaveNote(dateKey(dayPanel), text)}
                    trades={monthTrades.filter((trade) => new Date(trade.closedAt).getUTCDate() === dayPanel)}
                    onOpenTrade={(trade) => setDetail({ kind: "closed", trade })}
                    onClose={() => setDayPanel(null)}
                />
            )}

            {sharing && (
                <ShareMonth
                    monthLabel={selected.label}
                    monthShort={selected.short}
                    year={selected.year}
                    month={selected.month}
                    trades={monthTrades}
                    initialDay={selectedDay}
                    sample={sample}
                    onClose={() => setSharing(false)}
                />
            )}

            {detail && (
                <TradeDetails
                    detail={detail}
                    onClose={() => setDetail(null)}
                    onPrevious={detailIndex > 0 ? () => setDetail({ kind: "closed", trade: listedTrades[detailIndex - 1] }) : undefined}
                    onNext={detailIndex >= 0 && detailIndex < listedTrades.length - 1 ? () => setDetail({ kind: "closed", trade: listedTrades[detailIndex + 1] }) : undefined}
                    position={detailIndex >= 0 ? { index: detailIndex, total: listedTrades.length } : undefined}
                />
            )}
        </div>
    );
};

export default JournalDashboard;
