"use client";

import { useMemo, useState } from "react";
import EquityChart from "./equity-chart";
import TradeRecap from "@/app/components/altur/journal/trade-recap";
import type { ClosedTrade } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { analyse, Group } from "@/utils/journal-analytics";
import type { TradeReviews } from "@/utils/workspace-store";

// The analytical top of the journal: the equity curve with every trade's
// outcome under it (or the drawdown), the trade under review, and which
// strategies and confluences pay.

const money = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const short = (value: number) => {
    const a = Math.abs(value);
    return `${value >= 0 ? "+" : "-"}$${a >= 1000 ? `${(a / 1000).toFixed(1)}K` : a.toFixed(0)}`;
};
const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
const RANGES = [
    ["1M", 30],
    ["3M", 91],
    ["All", Infinity],
] as const;
const held = (trade: ClosedTrade) => {
    if (trade.openedAt === undefined) return "Not recorded";
    const minutes = Math.round((trade.closedAt - trade.openedAt) / 60000);
    return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
};

const Bars = ({ rows }: { rows: Group[] }) => {
    const largest = Math.max(1, ...rows.map((row) => Math.abs(row.profitLoss)));
    return (
        <ul className="mt-4 space-y-4">
            {rows.map((row) => (
                <li key={row.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-white">{row.label}</span>
                        <span className={`font-mono ${tone(row.profitLoss)}`}>{short(row.profitLoss)}</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-3">
                        <span className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.07]">
                            <span className="block h-full rounded-full" style={{ width: `${(Math.abs(row.profitLoss) / largest) * 100}%`, backgroundColor: row.profitLoss >= 0 ? "#20B8A8" : "#E955A8" }} />
                        </span>
                        <span className="w-14 text-right font-mono text-[11px] text-white/40">
                            {row.trades} {row.trades === 1 ? "trade" : "trades"}
                        </span>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const JournalCommand = ({ trades, reviews, sample = false, onOpenTrade }: { trades: ClosedTrade[]; reviews: TradeReviews; sample?: boolean; onOpenTrade: (trade: ClosedTrade) => void }) => {
    const [mode, setMode] = useState<"equity" | "drawdown">("equity");
    const [range, setRange] = useState<(typeof RANGES)[number][0]>("All");
    const days = RANGES.find(([id]) => id === range)![1];
    const list = useMemo(() => [...trades].filter((trade) => days === Infinity || trade.closedAt >= Date.now() - days * 86400000).sort((a, b) => a.closedAt - b.closedAt), [trades, days]);
    const stats = useMemo(() => computeJournalStats(list), [list]);
    const data = useMemo(() => analyse(list, reviews), [list, reviews]);
    const [cursor, setCursor] = useState(0);
    const newest = [...list].reverse();
    const trade = newest[Math.min(cursor, newest.length - 1)];
    const review = trade ? reviews[trade.id] : undefined;

    // Strategies come from the trader's reviews; without any, from the setup recorded in Rules.
    const strategies = data.strategies.length ? data.strategies : setupGroups(list);
    const confluences = data.confluences.filter((row) => row.trades >= 2);
    const best = confluences.length ? [...confluences].sort((a, b) => b.winRate - a.winRate)[0] : null;
    const overall = stats.winRate;

    return (
        <div className="mb-4">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                <div>
                    <p className="cmd-label">Journal · analytical view{sample ? " · sample trades" : ""}</p>
                    <p className="mt-2 text-2xl md:text-[28px] text-white">
                        {stats.totalTrades} trades <span className="text-white/40">·</span> <span className={tone(stats.totalPnl)}>{short(stats.totalPnl).replace(/\.\dK$/, (m) => m)}</span> <span className="text-white/40">· profit factor {stats.profitFactor === null ? "-" : stats.profitFactor.toFixed(2)}</span>
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.02] p-1" role="group" aria-label="View">
                        {(
                            [
                                ["equity", "Equity + outcomes"],
                                ["drawdown", "Drawdown"],
                            ] as const
                        ).map(([id, text]) => (
                            <button key={id} type="button" aria-pressed={mode === id} onClick={() => setMode(id)} className={`rounded px-3 py-1 text-xs transition-colors ${mode === id ? "bg-white/[0.1] text-white" : "text-white/45 hover:text-white"}`}>
                                {text}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.02] p-1" role="group" aria-label="Period">
                        {RANGES.map(([id]) => (
                            <button key={id} type="button" aria-pressed={range === id} onClick={() => setRange(id)} className={`rounded px-3 py-1 font-mono text-xs transition-colors ${range === id ? "bg-white/[0.1] text-white" : "text-white/45 hover:text-white"}`}>
                                {id}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="cmd-panel mt-5 px-5 pb-4 pt-6">
                {list.length ? <EquityChart key={`${mode}-${range}`} trades={list} height={380} bars={mode === "equity"} drawdown={mode === "drawdown"} /> : <div className="flex h-[380px] items-center justify-center text-sm text-white/40">No trades in this period.</div>}
                <div className="mt-2 flex flex-wrap justify-between gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/35">
                    <span>{mode === "equity" ? "Outcome per trade · teal win · magenta loss" : "Distance from the highest point reached"}</span>
                    {list.length > 0 && (
                        <span>
                            {new Date(list[0].closedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short" })} → {new Date(list[list.length - 1].closedAt).toLocaleDateString("en-US", { day: "2-digit", month: "short" })}
                        </span>
                    )}
                </div>
            </div>

            {trade && (
                <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                    <div className="cmd-panel p-5">
                        <div className="flex items-center justify-between gap-3">
                            <p className="cmd-label">Trade review</p>
                            <div className="flex items-center gap-1.5">
                                <button type="button" aria-label="Previous trade" disabled={cursor >= newest.length - 1} onClick={() => setCursor((c) => c + 1)} className="h-7 w-7 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30">
                                    ‹
                                </button>
                                <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[11px] text-white/60">
                                    {newest.length - cursor} / {newest.length}
                                </span>
                                <button type="button" aria-label="Next trade" disabled={cursor === 0} onClick={() => setCursor((c) => c - 1)} className="h-7 w-7 rounded border border-white/10 text-white/60 hover:text-white disabled:opacity-30">
                                    ›
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <p className="text-lg font-semibold text-white">{trade.instrument}</p>
                            <span className={`rounded-sm border px-1.5 py-0.5 font-mono text-[10.5px] uppercase ${trade.direction === "Long" ? "border-[#20B8A8]/50 text-[#20B8A8]" : "border-[#E955A8]/50 text-[#E955A8]"}`}>
                                {trade.direction} {trade.leverage}x
                            </span>
                            <span className={`font-mono text-lg ${tone(trade.profitLoss)}`}>{money(trade.profitLoss)}</span>
                            <span className="ml-auto font-mono text-[11px] text-white/40">
                                {new Date(trade.closedAt).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
                            </span>
                        </div>
                        <div className="mt-4 grid gap-5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                            <div className="overflow-hidden rounded border border-white/[0.06]">
                                <TradeRecap key={trade.id} trade={trade} sample={sample} bare />
                            </div>
                            <div>
                                <p className="cmd-label">Execution</p>
                                <dl className="mt-2 space-y-1.5 text-sm">
                                    {(
                                        [
                                            ["Plan followed", trade.rulesFollowed === undefined ? "Not recorded" : trade.rulesFollowed ? "Yes" : "No"],
                                            ["Setup", review?.strategy ?? trade.setup ?? "Not recorded"],
                                            ["Rating", review?.rating ? "★".repeat(review.rating) : "Not rated"],
                                            ["Held", held(trade)],
                                        ] as const
                                    ).map(([term, value]) => (
                                        <div key={term} className="flex justify-between gap-3">
                                            <dt className="text-white/50">{term}</dt>
                                            <dd className={`text-right ${value === "Yes" ? "text-[#20B8A8]" : value === "No" ? "text-[#E955A8]" : "text-white"}`}>{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                                {(review?.confluences?.length || review?.tags?.length) && (
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {[...(review?.confluences ?? []), ...(review?.tags ?? [])].map((item) => (
                                            <span key={item} className="rounded-sm border border-white/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/70">
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <button type="button" onClick={() => onOpenTrade(trade)} className="mt-4 text-xs text-white/60 underline-offset-4 hover:text-white hover:underline">
                                    {sample ? "Open the full trade" : "Open and review this trade"} →
                                </button>
                            </div>
                        </div>
                        {(review?.notes || trade.reflection) && <p className="mt-4 border-l-2 border-[#20B8A8]/60 pl-3 text-sm italic text-white/70">&ldquo;{review?.notes || trade.reflection}&rdquo;</p>}
                    </div>

                    <div className="cmd-panel p-5">
                        <p className="cmd-label">Strategy · confluence</p>
                        {strategies.length ? <Bars rows={strategies} /> : <p className="mt-3 text-sm text-white/45">Review your trades with a strategy to see which one pays.</p>}
                        <div className="mt-5 border-t border-white/[0.07] pt-4">
                            <p className="cmd-label">Insight</p>
                            <p className="mt-2 text-sm leading-relaxed text-white/75">
                                {best
                                    ? `Trades with ${best.label.toLowerCase()} won ${Math.round(best.winRate)}% of the time, against ${Math.round(overall)}% overall.`
                                    : strategies.length > 1
                                      ? `${[...strategies].sort((a, b) => b.average - a.average)[0].label} made the most per trade: ${short([...strategies].sort((a, b) => b.average - a.average)[0].average)} on average.`
                                      : "Tick the confluences in your reviews: once a few trades share one, this shows whether it helps."}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Trades grouped by the setup chosen in the Rules checklist.
function setupGroups(list: ClosedTrade[]): Group[] {
    return (["Reversal", "Continuation"] as const)
        .map((setup) => {
            const items = list.filter((trade) => trade.setup === setup);
            const wins = items.filter((trade) => trade.profitLoss > 0).length;
            const profitLoss = items.reduce((sum, trade) => sum + trade.profitLoss, 0);
            return { label: setup, trades: items.length, wins, winRate: items.length ? (wins / items.length) * 100 : 0, profitLoss, average: items.length ? profitLoss / items.length : 0 };
        })
        .filter((group) => group.trades > 0);
}

export default JournalCommand;
