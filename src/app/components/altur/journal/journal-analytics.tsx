"use client";

import { useMemo, useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { analyse, Group } from "@/utils/journal-analytics";
import { TradeReviews } from "@/utils/workspace-store";

// Where the results come from: best and worst days, direction, asset, time of
// day, and, once trades are reviewed, strategy, confluences, tags and rating.

const UP = "#20B8A8";
const DOWN = "#E955A8";
const label = "text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]";
const card = "rounded-sm border border-white/15 bg-black p-4";
const money = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white/60");
const hold = (ms: number) => {
    const minutes = Math.round(ms / 60000);
    return minutes >= 1440 ? `${(minutes / 1440).toFixed(1)} days` : minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
};

// A row per group: name, trades, win rate as a bar, and the result.
const Table = ({ title, rows, empty }: { title: string; rows: Group[]; empty: string }) => (
    <div className={card}>
        <p className={label}>{title}</p>
        {rows.length === 0 ? (
            <p className="mt-3 text-sm leading-relaxed text-white/45">{empty}</p>
        ) : (
            <ul className="mt-3 space-y-2.5">
                {rows.map((row) => (
                    <li key={row.label} className="grid grid-cols-[minmax(0,1fr)_4.5rem_5.5rem] items-center gap-x-3 text-sm">
                        <span className="truncate text-white">{row.label}</span>
                        <span className="flex items-center gap-2 text-xs tabular-nums text-white/55">
                            <span className="h-1 w-8 overflow-hidden rounded-full bg-white/10">
                                <span className="block h-full bg-white/70" style={{ width: `${row.winRate}%` }} />
                            </span>
                            {Math.round(row.winRate)}%
                        </span>
                        <span className={`text-right tabular-nums ${tone(row.profitLoss)}`}>{money(row.profitLoss)}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

// Results by hour or weekday, as bars above and below a zero line.
const Bars = ({ rows, every = 1 }: { rows: Group[]; every?: number }) => {
    const largest = Math.max(1, ...rows.map((row) => Math.abs(row.profitLoss)));
    return (
        <div className="mt-4 flex h-28 items-stretch gap-[3px]">
            {rows.map((row, i) => (
                <div key={row.label} className="group relative flex flex-1 flex-col items-center" title={`${row.label}: ${row.trades} trades, ${money(row.profitLoss)}`}>
                    <div className="flex w-full flex-1 items-end">
                        {row.profitLoss > 0 && <span className="block w-full rounded-t-[1px]" style={{ height: `${(row.profitLoss / largest) * 100}%`, backgroundColor: UP }} />}
                    </div>
                    <span className="h-px w-full bg-white/20" />
                    <div className="flex w-full flex-1 items-start">
                        {row.profitLoss < 0 && <span className="block w-full rounded-b-[1px]" style={{ height: `${(-row.profitLoss / largest) * 100}%`, backgroundColor: DOWN }} />}
                    </div>
                    <span className="mt-1 h-3 text-[10px] tabular-nums text-white/40">{i % every === 0 ? row.label.replace(":00", "") : ""}</span>
                </div>
            ))}
        </div>
    );
};

const JournalAnalytics = ({ trades, reviews }: { trades: ClosedTrade[]; reviews: TradeReviews }) => {
    const [range, setRange] = useState<"all" | "90" | "30">("all");
    const list = useMemo(() => (range === "all" ? trades : trades.filter((trade) => trade.closedAt >= Date.now() - Number(range) * 86400000)), [trades, range]);
    const data = useMemo(() => analyse(list, reviews), [list, reviews]);
    if (trades.length === 0) return null;
    const most = data.assets[0];

    return (
        <section className="!py-0 mt-10" aria-label="Analytics">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-lg font-semibold tracking-tight text-white">Analytics</p>
                <div className="flex gap-1 rounded-sm border border-white/20 p-1" role="group" aria-label="Period">
                    {(
                        [
                            ["30", "30 days"],
                            ["90", "90 days"],
                            ["all", "All time"],
                        ] as const
                    ).map(([value, text]) => (
                        <button key={value} type="button" aria-pressed={range === value} onClick={() => setRange(value)} className={`rounded-sm px-3 py-1 text-xs transition-colors ${range === value ? "bg-white text-black" : "text-white/60 hover:text-white"}`}>
                            {text}
                        </button>
                    ))}
                </div>
            </div>

            {list.length === 0 ? (
                <p className="mt-4 text-sm text-white/50">No trades closed in this period.</p>
            ) : (
                <>
                    <div className="mt-4 grid gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
                        {(
                            [
                                ["Best day", data.bestDay ? money(data.bestDay.profitLoss) : "-", data.bestDay ? `${data.bestDay.label} · ${data.bestDay.trades} ${data.bestDay.trades === 1 ? "trade" : "trades"}` : "", data.bestDay?.profitLoss ?? 0],
                                ["Worst day", data.worstDay ? money(data.worstDay.profitLoss) : "-", data.worstDay ? `${data.worstDay.label} · ${data.worstDay.trades} ${data.worstDay.trades === 1 ? "trade" : "trades"}` : "", data.worstDay?.profitLoss ?? 0],
                                ["Most traded", most ? most.label : "-", most ? `${most.trades} trades · ${money(most.profitLoss)}` : "", 0],
                                ["Average hold", data.averageHold !== null ? hold(data.averageHold) : "Not recorded", `${data.tradingDays} trading days`, 0],
                            ] as const
                        ).map(([title, value, hint, sign]) => (
                            <div key={title} className="bg-black p-4">
                                <p className={label}>{title}</p>
                                <p className={`mt-2 text-xl font-semibold tabular-nums ${sign ? tone(sign) : "text-white"}`}>{value}</p>
                                <p className="mt-1 text-xs text-white/45">{hint}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-2">
                        <div className={card}>
                            <p className={label}>Long or short</p>
                            <div className="mt-3 grid grid-cols-2 gap-4">
                                {data.direction.map((side) => (
                                    <div key={side.label}>
                                        <p className="text-sm text-white">{side.label}</p>
                                        <p className={`mt-1 text-lg font-semibold tabular-nums ${tone(side.profitLoss)}`}>{money(side.profitLoss)}</p>
                                        <p className="text-xs text-white/45">
                                            {side.trades} trades · {Math.round(side.winRate)}% won
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={card}>
                            <p className={label}>By weekday</p>
                            <Bars rows={data.weekdays} />
                        </div>
                    </div>

                    <div className={`${card} mt-4`}>
                        <p className={label}>By hour of entry (UTC)</p>
                        <Bars rows={data.hours} every={3} />
                    </div>

                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                        <Table title="By strategy" rows={data.strategies} empty="Review your trades and pick their strategy to see which one pays." />
                        <Table title="Confluences, when present" rows={data.confluences} empty="Tick the confluences in each review to see which ones go with winning trades." />
                        <Table title="By tag" rows={data.tags} empty="Tag your trades (FOMO, followed the plan…) to see what each habit costs or earns." />
                    </div>
                    <div className="mt-4 grid gap-4 lg:grid-cols-3">
                        <Table title="By asset" rows={data.assets} empty="" />
                        <Table title="By execution rating" rows={data.ratings.filter((row) => row.trades > 0).map((row) => ({ ...row, label: "★".repeat(Number(row.label)) }))} empty="Rate the execution of each trade to see whether discipline pays." />
                        <div className={card}>
                            <p className={label}>Reviewed</p>
                            <p className="mt-2 text-xl font-semibold tabular-nums text-white">
                                {data.reviewed} <span className="text-sm font-normal text-white/45">of {list.length} trades</span>
                            </p>
                            {data.averageRating !== null && <p className="mt-1 text-xs text-white/45">Average execution {data.averageRating.toFixed(1)} of 5</p>}
                            <p className="mt-3 text-xs leading-relaxed text-white/45">Open any trade below to review it. The more you review, the more these figures tell you.</p>
                        </div>
                    </div>

                    <div className={`${card} mt-4 overflow-x-auto`}>
                        <p className={label}>Month by month</p>
                        <table className="mt-3 w-full min-w-[640px] border-separate border-spacing-1 text-xs">
                            <tbody>
                                {data.years.map((year) => (
                                    <tr key={year.year}>
                                        <th className="w-14 text-left font-medium text-white/60">{year.year}</th>
                                        {year.months.map((month) => (
                                            <td key={month.label} className={`rounded-sm px-1.5 py-2 text-center tabular-nums ${month.trades === 0 ? "bg-white/[0.03] text-white/25" : month.profitLoss >= 0 ? "bg-[#20B8A8]/15 text-[#20B8A8]" : "bg-[#E955A8]/15 text-[#E955A8]"}`} title={`${month.label} ${year.year}`}>
                                                <span className="block text-[10px] text-white/45">{month.label}</span>
                                                {month.trades === 0 ? "-" : money(month.profitLoss)}
                                                {month.trades > 0 && <span className="block text-[10px] text-white/40">{month.trades} trades</span>}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </section>
    );
};

export default JournalAnalytics;
