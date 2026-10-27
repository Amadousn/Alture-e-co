"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import { EconomicCalendar } from "./os/tv";
import { useSessions } from "./os/sessions";
import { computeJournalStats } from "@/utils/journal-stats";
import { analyse } from "@/utils/journal-analytics";
import { useNews, useTickers } from "@/utils/use-market-intel";
import { useActiveTrade, useImports, useRecordedTrades, useTradeReviews, useWorkspaceSettings } from "@/utils/workspace-store";

// The first screen after signing in: the day at a glance. What the market is
// doing, what is on the calendar and in the news, and how the trader's own
// journal stands. It points to one next step and never pushes a trade.

const label = "text-[11px] uppercase tracking-[0.12em] text-white/45";
const card = "rounded-sm border border-white/10 bg-black p-5";
const money = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
const ago = (at: number) => {
    const minutes = Math.max(1, Math.round((Date.now() - at) / 60000));
    return minutes < 60 ? `${minutes} min ago` : minutes < 1440 ? `${Math.round(minutes / 60)} h ago` : `${Math.round(minutes / 1440)} d ago`;
};
// The trading sessions as UTC hours, to say which one the trader does best in.
const SESSIONS = [
    { name: "Asia", from: 0, to: 8 },
    { name: "London", from: 7, to: 16 },
    { name: "New York", from: 13, to: 21 },
];
const WATCH = [
    ["BTCUSDT", "Bitcoin"],
    ["ETHUSDT", "Ethereum"],
    ["SOLUSDT", "Solana"],
] as const;

const Curve = ({ values }: { values: number[] }) => {
    const points = [0, ...values];
    const min = Math.min(...points);
    const max = Math.max(...points);
    const y = (value: number) => 56 - ((value - min) / (max - min || 1)) * 52;
    const line = points.map((value, i) => `${(i / (points.length - 1 || 1)) * 100},${y(value)}`).join(" ");
    return (
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="mt-4 h-28 w-full" aria-hidden="true">
            <line x1="0" x2="100" y1={y(0)} y2={y(0)} stroke="rgba(255,255,255,0.12)" strokeDasharray="1.5 1.5" vectorEffect="non-scaling-stroke" />
            <polyline points={`0,60 ${line} 100,60`} fill="rgba(255,255,255,0.05)" stroke="none" />
            <polyline points={line} fill="none" stroke="#ffffff" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
    );
};

const WorkspaceHome = () => {
    const [settings] = useWorkspaceSettings();
    const [recorded] = useRecordedTrades();
    const [imports] = useImports();
    const [reviews] = useTradeReviews();
    const [active] = useActiveTrade();
    const tickers = useTickers();
    const news = useNews("crypto");
    const { rows } = useSessions();
    const [hour, setHour] = useState<number | null>(null);
    useEffect(() => setHour(new Date().getHours()), []);

    const trades = useMemo(() => [...recorded, ...Object.values(imports).flatMap((item) => item.trades)].sort((a, b) => a.closedAt - b.closedAt), [recorded, imports]);
    const stats = useMemo(() => computeJournalStats(trades), [trades]);
    const data = useMemo(() => analyse(trades, reviews), [trades, reviews]);
    const bySession = useMemo(
        () =>
            SESSIONS.map((session) => {
                const list = trades.filter((trade) => {
                    const h = new Date(trade.openedAt ?? trade.closedAt).getUTCHours();
                    return h >= session.from && h < session.to;
                });
                return { name: session.name, trades: list.length, profitLoss: list.reduce((sum, trade) => sum + trade.profitLoss, 0), wins: list.filter((trade) => trade.profitLoss > 0).length };
            }),
        [trades]
    );
    const bestDay = [...data.weekdays].filter((day) => day.trades > 0).sort((a, b) => b.profitLoss - a.profitLoss)[0];
    const bestSession = [...bySession].filter((session) => session.trades > 0).sort((a, b) => b.profitLoss - a.profitLoss)[0];
    const greeting = hour === null ? "Hello" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const name = settings.name.trim();
    const openSessions = rows.filter((row) => row.state.open).map((row) => row.session.name);
    const next = active ? { href: "/alturelock/rules", text: "Go back to your trade in progress" } : { href: "/alturelock/workspace", text: "Read the market in the terminal" };

    return (
        <WorkspaceShell width="max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                <div>
                    <h1 className="!text-3xl md:!text-4xl !font-light text-white">
                        {greeting}
                        {name ? `, ${name}` : ""}.
                    </h1>
                    <p className="mt-2 text-sm text-white/50">
                        {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
                        {openSessions.length > 0 ? ` · ${openSessions.join(" and ")} ${openSessions.length === 1 ? "is" : "are"} open` : " · no main session is open"}
                    </p>
                </div>
                <Link href={next.href} className="group inline-flex items-center gap-3 rounded-sm bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#e4e4e8]">
                    {next.text}
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>

            {/* The market, in one line */}
            <div className="mt-8 grid gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-3">
                {WATCH.map(([symbol, title]) => {
                    const ticker = tickers.status === "live" ? tickers.bySymbol[symbol] : undefined;
                    return (
                        <div key={symbol} className="bg-black px-5 py-4">
                            <p className={label}>{title}</p>
                            <p className="mt-2 text-xl font-semibold tabular-nums text-white">{ticker ? `$${ticker.price.toLocaleString("en-US", { maximumFractionDigits: ticker.price > 1000 ? 1 : 3 })}` : "…"}</p>
                            {ticker && <p className={`mt-0.5 text-xs tabular-nums ${tone(ticker.change24h)}`}>{`${ticker.change24h >= 0 ? "+" : ""}${ticker.change24h.toFixed(2)}% in 24 h`}</p>}
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-12">
                {/* Your trading */}
                <div className="space-y-6 lg:col-span-7">
                    <div className={card}>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className={label}>Your trading · all time</p>
                            <Link href="/alturelock/journal" className="text-xs text-white/50 hover:text-white">
                                Open the journal →
                            </Link>
                        </div>
                        {trades.length === 0 ? (
                            <div className="mt-4">
                                <p className="text-[15px] text-white">No trades in your journal yet.</p>
                                <p className="mt-1 text-sm text-white/50">Plan a trade with your rules and it lands here when you review it, or connect your exchange.</p>
                            </div>
                        ) : (
                            <>
                                <p className={`mt-3 text-4xl font-semibold tabular-nums ${tone(stats.totalPnl)}`}>{money(stats.totalPnl)}</p>
                                <Curve values={stats.daily.map((day) => day.cumulative)} />
                                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-4 sm:grid-cols-4">
                                    {(
                                        [
                                            ["Trades", String(stats.totalTrades)],
                                            ["Win rate", `${Math.round(stats.winRate)}%`],
                                            ["Profit factor", stats.profitFactor === null ? "-" : stats.profitFactor.toFixed(2)],
                                            ["Per trade", money(stats.expectancy)],
                                        ] as const
                                    ).map(([term, value]) => (
                                        <div key={term}>
                                            <dt className={label}>{term}</dt>
                                            <dd className="mt-1 text-lg font-semibold tabular-nums text-white">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </>
                        )}
                    </div>

                    {trades.length > 0 && (
                        <div className={card}>
                            <p className={label}>When you trade best</p>
                            <div className="mt-4 grid gap-6 sm:grid-cols-2">
                                <div>
                                    <p className="text-sm text-white/55">By session (UTC)</p>
                                    <ul className="mt-2 space-y-2">
                                        {bySession.map((session) => (
                                            <li key={session.name} className="flex items-baseline justify-between gap-4 text-sm">
                                                <span className="text-white">
                                                    {session.name}
                                                    <span className="ml-2 text-xs text-white/40">
                                                        {session.trades} {session.trades === 1 ? "trade" : "trades"}
                                                    </span>
                                                </span>
                                                <span className={`tabular-nums ${tone(session.profitLoss)}`}>{session.trades ? money(session.profitLoss) : "-"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-sm text-white/55">By weekday</p>
                                    <ul className="mt-2 space-y-2">
                                        {data.weekdays
                                            .filter((day) => day.trades > 0)
                                            .map((day) => (
                                                <li key={day.label} className="flex items-baseline justify-between gap-4 text-sm">
                                                    <span className="text-white">
                                                        {day.label}
                                                        <span className="ml-2 text-xs text-white/40">{Math.round(day.winRate)}% won</span>
                                                    </span>
                                                    <span className={`tabular-nums ${tone(day.profitLoss)}`}>{money(day.profitLoss)}</span>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                            {bestDay && bestSession && (
                                <p className="mt-4 border-t border-white/10 pt-3 text-sm text-white/65">
                                    Your strongest so far: {bestDay.label}, during the {bestSession.name} session. One period of data proves little; keep journaling and it becomes clearer.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Today */}
                <div className="space-y-6 lg:col-span-5">
                    <div className={card}>
                        <div className="flex items-baseline justify-between gap-4">
                            <p className={label}>Crypto news</p>
                            <Link href="/alturelock/workspace" className="text-xs text-white/50 hover:text-white">
                                All news →
                            </Link>
                        </div>
                        {news.status === "live" ? (
                            <ul className="mt-3 divide-y divide-white/10">
                                {news.items.slice(0, 5).map((item) => (
                                    <li key={item.id} className="py-2.5">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm leading-snug text-white hover:text-white/75">
                                            {item.title}
                                        </a>
                                        <p className="mt-1 text-xs text-white/40">
                                            {item.source} · {ago(item.publishedAt)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-3 text-sm text-white/45">{news.status === "loading" ? "Loading headlines…" : "Headlines are unavailable right now."}</p>
                        )}
                    </div>
                    <div className={card}>
                        <p className={label}>High-impact events</p>
                        <div className="mt-3 h-[320px]">
                            <EconomicCalendar highOnly className="h-full" />
                        </div>
                    </div>
                </div>
            </div>
        </WorkspaceShell>
    );
};

export default WorkspaceHome;
