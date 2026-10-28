"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import { useSessions } from "./os/sessions";
import EquityChart from "@/app/components/altur/cmd/equity-chart";
import Sparkline, { useCloses } from "@/app/components/altur/cmd/sparkline";
import type { ClosedTrade } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { analyse } from "@/utils/journal-analytics";
import { useNews, useTickers } from "@/utils/use-market-intel";
import { useActiveTrade, useImports, useRecordedTrades, useTradeReviews, useWorkspaceSettings } from "@/utils/workspace-store";

// The command overview: the trader's realised results and curve, the one next
// action, the state of their discipline, and the market at the bottom. Real
// data only; the demo passes its sample trades, and says so.

const money = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
const RANGES = [
    ["1M", 30],
    ["3M", 91],
    ["6M", 182],
    ["All", Infinity],
] as const;
const SESSIONS = [
    { name: "Asia", from: 0, to: 8 },
    { name: "London", from: 7, to: 16 },
    { name: "New York", from: 13, to: 21 },
];
const MARKETS = [
    ["BTCUSDT", "BTC"],
    ["ETHUSDT", "ETH"],
    ["SOLUSDT", "SOL"],
    ["HYPEUSDT", "HYPE"],
] as const;

const Market = ({ symbol, name, price, change }: { symbol: string; name: string; price?: number; change?: number }) => {
    const closes = useCloses(symbol);
    return (
        <div className="flex items-center gap-3">
            <div className="min-w-[96px]">
                <p className="cmd-label">{name}</p>
                <p className="mt-1 font-mono text-[15px] text-white">
                    {price !== undefined ? `$${price.toLocaleString("en-US", { maximumFractionDigits: price > 1000 ? 0 : 2 })}` : "…"}
                    {change !== undefined && <span className={`ml-2 text-xs ${tone(change)}`}>{`${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}</span>}
                </p>
            </div>
            <Sparkline values={closes} />
        </div>
    );
};

// demoTrades: the sample trades of the demo. Without them, the trader's own journal.
const WorkspaceHome = ({ demoTrades }: { demoTrades?: ClosedTrade[] }) => {
    const demo = demoTrades !== undefined;
    const [settings] = useWorkspaceSettings();
    const [recorded] = useRecordedTrades();
    const [imports] = useImports();
    const [reviews] = useTradeReviews();
    const [active] = useActiveTrade();
    const tickers = useTickers();
    const news = useNews("crypto");
    const { rows, now } = useSessions();
    const [range, setRange] = useState<(typeof RANGES)[number][0]>("All");
    const [hour, setHour] = useState<number | null>(null);
    useEffect(() => setHour(new Date().getHours()), []);

    const all = useMemo(() => (demoTrades ? [...demoTrades] : [...recorded, ...Object.values(imports).flatMap((item) => item.trades)]).sort((a, b) => a.closedAt - b.closedAt), [demoTrades, recorded, imports]);
    const days = RANGES.find(([id]) => id === range)![1];
    const trades = useMemo(() => (days === Infinity ? all : all.filter((trade) => trade.closedAt >= Date.now() - days * 86400000)), [all, days]);
    const stats = useMemo(() => computeJournalStats(trades), [trades]);
    const data = useMemo(() => analyse(all, demo ? {} : reviews), [all, reviews, demo]);
    const months = useMemo(() => {
        const out = new Map<string, number>();
        for (const trade of all) {
            const d = new Date(trade.closedAt);
            const key = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
            out.set(key, (out.get(key) ?? 0) + trade.profitLoss);
        }
        return [...out.entries()].slice(-4).map(([key, value]) => ({ label: new Date(Date.UTC(Number(key.split("-")[0]), Number(key.split("-")[1]), 1)).toLocaleString("en-US", { month: "short", timeZone: "UTC" }), value }));
    }, [all]);
    const sessions = SESSIONS.map((session) => ({ ...session, list: all.filter((trade) => { const h = new Date(trade.openedAt ?? trade.closedAt).getUTCHours(); return h >= session.from && h < session.to; }) })).map((s) => ({ name: s.name, total: s.list.reduce((sum, t) => sum + t.profitLoss, 0), count: s.list.length }));
    const bestSession = [...sessions].filter((s) => s.count).sort((a, b) => b.total - a.total)[0];
    const bestDay = [...data.weekdays].filter((d) => d.trades).sort((a, b) => b.profitLoss - a.profitLoss)[0];
    const withRules = all.filter((trade) => trade.rulesFollowed !== undefined);
    const kept = withRules.filter((trade) => trade.rulesFollowed).length;
    const todayLosses = all.filter((trade) => trade.profitLoss < 0 && new Date(trade.closedAt).toDateString() === new Date().toDateString()).length;
    const maxLosses = settings.limits?.maxLosses;

    const greeting = hour === null ? "Hello." : hour < 12 ? "Good morning." : hour < 18 ? "Good afternoon." : "Good evening.";
    const next = now === null ? null : [...rows].sort((a, b) => a.state.changesAt - b.state.changesAt)[0];
    const minutes = next && now !== null ? Math.round((next.state.changesAt - now) / 60000) : 0;
    const when = minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    const ring = 2 * Math.PI * 34;
    const terminal = demo ? "/alturelock/demo" : "/alturelock/workspace";
    const journal = demo ? "/alturelock/demo/journal" : "/alturelock/journal";

    return (
        <WorkspaceShell width="full" demo={demo}>
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                <div>
                    <p className="cmd-label">Command overview{demo ? " · sample trades" : ""}</p>
                    <h1 className="mt-2 !text-2xl md:!text-[28px] !font-normal !leading-tight text-white">
                        {greeting} {next && <span className="text-white/50">{`${next.session.name} ${next.state.open ? "closes" : "opens"} in ${when}.`}</span>}
                    </h1>
                </div>
                <div className="flex gap-1 rounded-md border border-white/10 bg-white/[0.02] p-1" role="group" aria-label="Period">
                    {RANGES.map(([id]) => (
                        <button key={id} type="button" aria-pressed={range === id} onClick={() => setRange(id)} className={`rounded px-3 py-1 font-mono text-xs transition-colors ${range === id ? "bg-white/[0.1] text-white" : "text-white/45 hover:text-white"}`}>
                            {id}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
                <section className="cmd-panel !py-6 px-6" aria-label="Realised results">
                    <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
                        <div>
                            <p className="cmd-label">Realized P&amp;L · {range === "All" ? "all time" : `last ${range}`}</p>
                            <p className={`mt-2 text-[44px] font-semibold leading-none tracking-tight tabular-nums ${tone(stats.totalPnl)}`}>{all.length ? money(stats.totalPnl) : "$0.00"}</p>
                        </div>
                        <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
                            {(
                                [
                                    ["Trades", String(stats.totalTrades)],
                                    ["Profit factor", stats.profitFactor === null ? "-" : stats.profitFactor.toFixed(2)],
                                    ["Per trade", trades.length ? whole(stats.expectancy) : "-"],
                                    ["Max drawdown", trades.length ? `-$${stats.maxDrawdown.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : "-"],
                                ] as const
                            ).map(([term, value]) => (
                                <div key={term} className="border-l border-white/[0.08] pl-4 first:border-0 first:pl-0">
                                    <dt className="cmd-label">{term}</dt>
                                    <dd className="mt-1.5 font-mono text-lg text-white">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                    {months.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                            {months.map((month) => (
                                <span key={month.label} className={`rounded border px-3 py-1.5 ${month.value >= 0 ? "border-[#20B8A8]/25 bg-[#20B8A8]/[0.06]" : "border-[#E955A8]/25 bg-[#E955A8]/[0.06]"}`}>
                                    <span className="cmd-label block !text-[9.5px]">{month.label}</span>
                                    <span className={`font-mono text-sm ${tone(month.value)}`}>{whole(month.value)}</span>
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="mt-6">{trades.length ? <EquityChart trades={trades} height={330} /> : <div className="flex h-[330px] items-center justify-center text-sm text-white/40">Your equity curve appears with your first recorded trade.</div>}</div>
                </section>

                <div className="grid gap-4">
                    <section className="cmd-panel !py-6 px-6" aria-label="Next action">
                        <p className="cmd-label">Next action</p>
                        <p className="mt-3 text-lg font-medium text-white">{active ? "A trade is in progress." : "No trade in progress."}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/55">{active ? "Go back to it and manage it by your plan." : "No trade is a position too. Read the market, and plan a trade only when your setup is there."}</p>
                        <div className="mt-5 grid grid-cols-2 gap-2.5">
                            <Link href={active && !demo ? "/alturelock/rules" : terminal} className="rounded-md border border-[#20B8A8]/40 bg-[#20B8A8]/10 px-3.5 py-3 transition-colors hover:bg-[#20B8A8]/15">
                                <span className="cmd-label block !text-[#20B8A8]">{active && !demo ? "Resume" : "Open"}</span>
                                <span className="mt-1 block text-sm font-medium text-white">{active && !demo ? "Trade" : "Terminal"} →</span>
                            </Link>
                            <Link href={journal} className="rounded-md border border-white/10 bg-white/[0.02] px-3.5 py-3 transition-colors hover:border-white/25">
                                <span className="cmd-label block">Review</span>
                                <span className="mt-1 block text-sm font-medium text-white">Journal →</span>
                            </Link>
                        </div>
                    </section>

                    <section className="cmd-panel !py-6 px-6" aria-label="Discipline">
                        <p className="cmd-label">System</p>
                        <div className="mt-4 flex items-center gap-6">
                            <svg viewBox="0 0 80 80" className="h-[88px] w-[88px] flex-shrink-0" aria-label={`${Math.round(stats.winRate)}% win rate`} role="img">
                                <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                                <circle cx="40" cy="40" r="34" fill="none" stroke="#20B8A8" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(ring * stats.winRate) / 100} ${ring}`} transform="rotate(-90 40 40)" style={{ filter: "drop-shadow(0 0 4px rgba(32,184,168,0.6))" }} />
                                <text x="40" y="42" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="600">{`${Math.round(stats.winRate)}%`}</text>
                                <text x="40" y="55" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6.5" letterSpacing="1.2">WIN RATE</text>
                            </svg>
                            <dl className="flex-1 space-y-2.5 text-sm">
                                <div className="flex justify-between gap-3">
                                    <dt className="text-white/55">Rules kept</dt>
                                    <dd className="font-mono text-white">{withRules.length ? `${kept}/${withRules.length}` : "-"}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-white/55">Best session</dt>
                                    <dd className="text-white">{bestSession?.name ?? "-"}</dd>
                                </div>
                                <div className="flex justify-between gap-3">
                                    <dt className="text-white/55">Losses today</dt>
                                    <dd className={`font-mono ${maxLosses && todayLosses >= maxLosses ? "text-[#E955A8]" : "text-[#20B8A8]"}`}>{maxLosses ? `${todayLosses} of ${maxLosses}` : todayLosses}</dd>
                                </div>
                            </dl>
                        </div>
                        {bestDay && bestSession && (
                            <p className="mt-5 border-t border-white/[0.07] pt-4 text-sm leading-relaxed text-white/55">
                                Strongest so far: <span className="text-white">{bestDay.label}, {bestSession.name}</span>. One period of data proves little.
                            </p>
                        )}
                    </section>
                </div>
            </div>

            <section className="cmd-panel !py-5 mt-4 grid gap-6 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]" aria-label="Market">
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                    {MARKETS.map(([symbol, name]) => {
                        const ticker = tickers.status === "live" ? tickers.bySymbol[symbol] : undefined;
                        return <Market key={symbol} symbol={symbol} name={name} price={ticker?.price} change={ticker?.change24h} />;
                    })}
                </div>
                <div className="border-white/[0.07] lg:border-l lg:pl-6">
                    <p className="cmd-label">Wire</p>
                    {news.status === "live" ? (
                        <ul className="mt-2 space-y-1.5">
                            {news.items.slice(0, 2).map((item) => (
                                <li key={item.id} className="truncate text-sm">
                                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/75">
                                        {item.title}
                                    </a>
                                    <span className="ml-2 text-xs text-white/40">{item.source}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2 text-sm text-white/40">{news.status === "loading" ? "Loading headlines…" : "Headlines are unavailable right now."}</p>
                    )}
                </div>
            </section>
            {demo && <p className="mt-4 text-right font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/30">Sample trades · live market data</p>}
        </WorkspaceShell>
    );
};

export default WorkspaceHome;
