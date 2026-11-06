"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import { useSessions } from "./os/sessions";
import { THEMES, Module } from "./os/design";
import PrivacyToggle from "./os/privacy-toggle";
import EquityChart from "@/app/components/altur/cmd/equity-chart";
import Sparkline, { useCloses } from "@/app/components/altur/cmd/sparkline";
import type { ClosedTrade } from "@/utils/bybit";
import { computeJournalStats } from "@/utils/journal-stats";
import { analyse } from "@/utils/journal-analytics";
import { useNews, useTickers } from "@/utils/use-market-intel";
import { useTheme } from "@/utils/use-theme";
import { HOME_MARKET_CHOICES, MASK, useActiveTrade, useHomeMarkets, useImports, usePrivacy, useRecordedTrades, useTimezone, useTradeReviews, useWorkspaceSettings, type HomeMarkets } from "@/utils/workspace-store";

// Home: the trader's realised results and curve, the one next action, the
// state of their discipline, and, if they want it, a market watch. Real data
// only; the demo passes its sample trades and the bar on top marks it as a demo.
// Cards, colours and type come from the Journal's design system (os/design).

let HIDE = false;
const money = (value: number) => (HIDE ? `${value < 0 ? "−" : "+"}${MASK}` : `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
const whole = (value: number) => (HIDE ? `${value < 0 ? "−" : "+"}${MASK}` : `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`);
const tone = (value: number) => (value > 0 ? "text-[var(--j-up)]" : value < 0 ? "text-[var(--j-dn)]" : "text-[var(--j-mu)]");
const quiet = "text-[var(--j-mu)] transition-colors hover:text-[var(--j-ink)]";
const chip = (on: boolean) => `rounded-md px-2.5 py-1 transition-colors ${on ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`;

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
const nameOf = (symbol: string) => symbol.replace(/USDT$/, "");

// The hour in the trader's chosen timezone ("local" follows the device).
const hourIn = (timezone: string) => {
    try {
        return Number(new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23", timeZone: timezone === "local" ? undefined : timezone }).format(new Date()));
    } catch {
        return new Date().getHours();
    }
};

const Market = ({ symbol, price, change, expanded }: { symbol: string; price?: number; change?: number; expanded: boolean }) => {
    const closes = useCloses(expanded ? symbol : "");
    return (
        <div className="flex items-center gap-3">
            <div className={expanded ? "min-w-[104px]" : ""}>
                <p className="text-[12.5px] text-[var(--j-mu)]">{nameOf(symbol)}</p>
                <p className="mt-0.5 font-mono text-[15px]">
                    {price !== undefined ? `$${price.toLocaleString("en-US", { maximumFractionDigits: price > 1000 ? 0 : price > 1 ? 2 : 4 })}` : "…"}
                    {change !== undefined && <span className={`ml-2 text-[12px] ${tone(change)}`}>{`${change >= 0 ? "+" : ""}${change.toFixed(2)}%`}</span>}
                </p>
            </div>
            {expanded && <Sparkline values={closes} />}
        </div>
    );
};

// Choosing what the market watch shows: which markets, their order, and the view.
const MarketEditor = ({ value, onChange, onClose }: { value: HomeMarkets; onChange: (next: HomeMarkets) => void; onClose: () => void }) => {
    const move = (i: number, by: number) => {
        const list = [...value.symbols];
        [list[i], list[i + by]] = [list[i + by], list[i]];
        onChange({ ...value, symbols: list });
    };
    const others = HOME_MARKET_CHOICES.filter((s) => !value.symbols.includes(s));
    return (
        <div className="mt-4 grid gap-5 border-t border-[var(--j-line)] pt-4 text-[13px] md:grid-cols-[minmax(0,1fr)_auto]">
            <div>
                <p className="text-[var(--j-mu)]">Shown, in this order</p>
                <ul className="mt-2 space-y-1">
                    {value.symbols.map((s, i) => (
                        <li key={s} className="flex max-w-xs items-center justify-between gap-3 rounded-md bg-[var(--j-s2)] px-3 py-1.5">
                            <span className="font-mono">{nameOf(s)}</span>
                            <span className="flex gap-1">
                                <button type="button" disabled={i === 0} onClick={() => move(i, -1)} aria-label={`Move ${nameOf(s)} up`} className={`px-1.5 disabled:opacity-30 ${quiet}`}>↑</button>
                                <button type="button" disabled={i === value.symbols.length - 1} onClick={() => move(i, 1)} aria-label={`Move ${nameOf(s)} down`} className={`px-1.5 disabled:opacity-30 ${quiet}`}>↓</button>
                                <button type="button" disabled={value.symbols.length === 1} onClick={() => onChange({ ...value, symbols: value.symbols.filter((x) => x !== s) })} aria-label={`Remove ${nameOf(s)}`} className={`px-1.5 disabled:opacity-30 ${quiet}`}>×</button>
                            </span>
                        </li>
                    ))}
                </ul>
                {others.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        <span className="text-[var(--j-mu)]">Add</span>
                        {others.map((s) => (
                            <button key={s} type="button" onClick={() => onChange({ ...value, symbols: [...value.symbols, s] })} className="rounded-md border border-[var(--j-line)] px-2.5 py-1 font-mono transition-colors hover:border-[var(--j-mu)]">
                                + {nameOf(s)}
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start gap-3">
                <span className="flex rounded-lg bg-[var(--j-s2)] p-0.5" role="group" aria-label="Market view">
                    {(["compact", "expanded"] as const).map((v) => (
                        <button key={v} type="button" aria-pressed={value.view === v} onClick={() => onChange({ ...value, view: v })} className={`capitalize ${chip(value.view === v)}`}>
                            {v}
                        </button>
                    ))}
                </span>
                <button type="button" onClick={() => onChange({ ...value, show: false })} className={quiet}>
                    Hide the market watch
                </button>
                <button type="button" onClick={onClose} className="rounded-lg bg-[var(--j-active)] px-3 py-1.5 text-[var(--j-activeink)]">
                    Done
                </button>
            </div>
        </div>
    );
};

// demoTrades: the sample trades of the demo. Without them, the trader's own journal.
const WorkspaceHome = ({ demoTrades }: { demoTrades?: ClosedTrade[] }) => {
    const demo = demoTrades !== undefined;
    const [theme, setTheme] = useTheme();
    const [hidden] = usePrivacy();
    HIDE = hidden;
    const [settings] = useWorkspaceSettings();
    const [timezone] = useTimezone();
    const [markets, setMarkets] = useHomeMarkets();
    const [editing, setEditing] = useState(false);
    const [recorded] = useRecordedTrades();
    const [imports] = useImports();
    const [reviews] = useTradeReviews();
    const [active] = useActiveTrade();
    const tickers = useTickers();
    const news = useNews("crypto");
    const { rows, now } = useSessions();
    const [range, setRange] = useState<(typeof RANGES)[number][0]>("All");
    const [hour, setHour] = useState<number | null>(null);
    useEffect(() => setHour(hourIn(timezone)), [timezone, now]);

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
    const fees = trades.reduce((sum, trade) => sum + trade.fee, 0);

    // The demo has no profile, so it never shows a name.
    const name = demo ? "" : settings.name.trim();
    const part = hour === null ? "Hello" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
    const greeting = name ? `${part}, ${name}.` : `${part}.`;
    const next = now === null ? null : [...rows].sort((a, b) => a.state.changesAt - b.state.changesAt)[0];
    const minutes = next && now !== null ? Math.round((next.state.changesAt - now) / 60000) : 0;
    const when = minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
    const ring = 2 * Math.PI * 34;
    const terminal = demo ? "/alturelock/demo" : "/alturelock/workspace";
    const journal = demo ? "/alturelock/demo/journal" : "/alturelock/journal";
    const vars = THEMES[theme] as unknown as React.CSSProperties;

    return (
        <WorkspaceShell width="full" demo={demo} themed>
            <div style={vars} className="-mx-4 -mt-6 min-h-[calc(100dvh-49px)] bg-[var(--j-bg)] [background-image:var(--j-glow,none)] px-4 pb-16 pt-6 text-[var(--j-ink)] md:-mx-8 md:px-8 xl:-mx-10 xl:px-10">
                <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                    <div>
                        <h1 className="!text-[26px] !font-normal !leading-tight !text-[var(--j-ink)] md:!text-[30px]">{greeting}</h1>
                        {next && <p className="mt-1 text-[13.5px] text-[var(--j-mu)]">{`${next.session.name} ${next.state.open ? "closes" : "opens"} in ${when}.`}</p>}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
                        <span className="flex rounded-lg bg-[var(--j-s2)] p-0.5" role="group" aria-label="Period">
                            {RANGES.map(([id]) => (
                                <button key={id} type="button" aria-pressed={range === id} onClick={() => setRange(id)} className={chip(range === id)}>
                                    {id}
                                </button>
                            ))}
                        </span>
                        <PrivacyToggle className={quiet} />
                        <span className="flex rounded-lg bg-[var(--j-s2)] p-0.5 text-[12px]" role="group" aria-label="Theme">
                            {(["light", "dark"] as const).map((t) => (
                                <button key={t} type="button" aria-pressed={theme === t} onClick={() => setTheme(t)} className={`capitalize ${chip(theme === t)}`}>
                                    {t}
                                </button>
                            ))}
                        </span>
                    </div>
                </div>

                <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <Module label="Realised results" className="p-6">
                        <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
                            <div>
                                <p className="text-[12.5px] text-[var(--j-mu)]">Net P&amp;L · {range === "All" ? "all time" : `last ${range}`}</p>
                                <p className={`mt-2 font-logo text-[42px] font-extralight leading-none tracking-tight ${all.length ? tone(stats.totalPnl) : "text-[var(--j-fa)]"}`}>{all.length ? money(stats.totalPnl) : "No trades yet"}</p>
                                {trades.length > 0 && <p className="mt-2 text-[12px] text-[var(--j-fa)]">Realised, after {HIDE ? "fees" : `$${fees.toLocaleString("en-US", { maximumFractionDigits: 0 })} of fees`}</p>}
                            </div>
                            <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
                                {(
                                    [
                                        ["Trades", String(stats.totalTrades)],
                                        ["Profit factor", stats.profitFactor === null ? "–" : stats.profitFactor.toFixed(2)],
                                        ["Per trade", trades.length ? whole(stats.expectancy) : "–"],
                                        ["Max drawdown", trades.length ? (HIDE ? `−${MASK}` : `−$${stats.maxDrawdown.toLocaleString("en-US", { maximumFractionDigits: 0 })}`) : "–"],
                                    ] as const
                                ).map(([term, value]) => (
                                    <div key={term} className="border-l border-[var(--j-line)] pl-4 first:border-0 first:pl-0">
                                        <dt className="text-[12.5px] text-[var(--j-mu)]">{term}</dt>
                                        <dd className="mt-1 font-mono text-[18px]">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        {months.length > 0 && (
                            <div className="mt-5 flex flex-wrap gap-2">
                                {months.map((month) => (
                                    <span key={month.label} className={`rounded-lg px-3 py-1.5 ${month.value >= 0 ? "bg-[var(--j-upbg)]" : "bg-[var(--j-dnbg)]"}`}>
                                        <span className="block text-[11px] text-[var(--j-mu)]">{month.label}</span>
                                        <span className={`font-mono text-[13.5px] ${tone(month.value)}`}>{whole(month.value)}</span>
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="mt-6">{trades.length ? <EquityChart trades={trades} height={330} /> : <div className="flex h-[330px] items-center justify-center text-sm text-[var(--j-mu)]">Your equity curve appears with your first recorded trade.</div>}</div>
                    </Module>

                    <div className="grid content-start gap-4">
                        <Module label="Next action" className="p-6">
                            <p className="text-[12.5px] text-[var(--j-mu)]">Next action</p>
                            <p className="mt-2 text-[17px] font-medium">{active ? "A trade is in progress." : "No trade in progress."}</p>
                            <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--j-mu)]">{active ? "Go back to it and manage it by your plan." : "No trade is a position too. Read the market, and plan a trade only when your setup is there."}</p>
                            <div className="mt-5 grid grid-cols-2 gap-2.5 text-[13.5px]">
                                <Link href={active && !demo ? "/alturelock/rules" : terminal} className="rounded-lg bg-[var(--j-active)] px-3.5 py-3 text-[var(--j-activeink)] transition-opacity hover:opacity-90">
                                    <span className="block text-[11.5px] opacity-70">{active && !demo ? "Resume" : "Open"}</span>
                                    <span className="mt-0.5 block font-medium">{active && !demo ? "Trade" : "Terminal"} →</span>
                                </Link>
                                <Link href={journal} className="rounded-lg bg-[var(--j-s2)] px-3.5 py-3 transition-colors hover:bg-[var(--j-s3)]">
                                    <span className="block text-[11.5px] text-[var(--j-mu)]">Review</span>
                                    <span className="mt-0.5 block font-medium">Journal →</span>
                                </Link>
                            </div>
                        </Module>

                        <Module label="Discipline" className="p-6">
                            <p className="text-[12.5px] text-[var(--j-mu)]">System</p>
                            <div className="mt-4 flex items-center gap-6">
                                <svg viewBox="0 0 80 80" className="h-[88px] w-[88px] flex-shrink-0" aria-label={`${Math.round(stats.winRate)}% win rate`} role="img">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--j-s3)" strokeWidth="5" />
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--j-up)" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${(ring * stats.winRate) / 100} ${ring}`} transform="rotate(-90 40 40)" />
                                    <text x="40" y="42" textAnchor="middle" fill="var(--j-ink)" fontSize="17" fontWeight="500">{`${Math.round(stats.winRate)}%`}</text>
                                    <text x="40" y="55" textAnchor="middle" fill="var(--j-mu)" fontSize="6.5" letterSpacing="1">WIN RATE</text>
                                </svg>
                                <dl className="flex-1 space-y-2.5 text-[13.5px]">
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-[var(--j-mu)]">Rules kept</dt>
                                        <dd className="font-mono">{withRules.length ? `${kept}/${withRules.length}` : "–"}</dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-[var(--j-mu)]">Best session</dt>
                                        <dd>{bestSession?.name ?? "–"}</dd>
                                    </div>
                                    <div className="flex justify-between gap-3">
                                        <dt className="text-[var(--j-mu)]">Losses today</dt>
                                        <dd className={`font-mono ${maxLosses && todayLosses >= maxLosses ? "text-[var(--j-dn)]" : ""}`}>{maxLosses ? `${todayLosses} of ${maxLosses}` : todayLosses}</dd>
                                    </div>
                                </dl>
                            </div>
                            {bestDay && bestSession && (
                                <p className="mt-5 border-t border-[var(--j-line)] pt-4 text-[13.5px] leading-relaxed text-[var(--j-mu)]">
                                    Strongest so far: <span className="text-[var(--j-ink)]">{bestDay.label}, {bestSession.name}</span>. One period of data proves little.
                                </p>
                            )}
                        </Module>
                    </div>
                </div>

                <div className={`mt-4 grid gap-4 ${markets.show ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]" : ""}`}>
                    {markets.show && (
                        <Module label="Market watch" className="p-5">
                            <div className="flex items-baseline justify-between gap-3">
                                <p className="text-[12.5px] text-[var(--j-mu)]">Market watch</p>
                                {!editing && (
                                    <button type="button" onClick={() => setEditing(true)} className={`text-[12.5px] ${quiet}`}>
                                        Edit
                                    </button>
                                )}
                            </div>
                            <div className={`mt-3 flex flex-wrap items-center ${markets.view === "expanded" ? "gap-x-8 gap-y-4" : "gap-x-6 gap-y-2"}`}>
                                {markets.symbols.map((symbol) => {
                                    const ticker = tickers.status === "live" ? tickers.bySymbol[symbol] : undefined;
                                    return <Market key={symbol} symbol={symbol} price={ticker?.price} change={ticker?.change24h} expanded={markets.view === "expanded"} />;
                                })}
                            </div>
                            {editing && <MarketEditor value={markets} onChange={setMarkets} onClose={() => setEditing(false)} />}
                        </Module>
                    )}
                    <Module label="Headlines" className="p-5">
                        <div className="flex items-baseline justify-between gap-3">
                            <p className="text-[12.5px] text-[var(--j-mu)]">Headlines</p>
                            {!markets.show && (
                                <button type="button" onClick={() => { setMarkets({ ...markets, show: true }); setEditing(true); }} className={`text-[12.5px] ${quiet}`}>
                                    + Market watch
                                </button>
                            )}
                        </div>
                        {news.status === "live" ? (
                            <ul className="mt-2 space-y-1.5">
                                {news.items.slice(0, 2).map((item) => (
                                    <li key={item.id} className="truncate text-[13.5px]">
                                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-75">
                                            {item.title}
                                        </a>
                                        <span className="ml-2 text-[12px] text-[var(--j-fa)]">{item.source}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-[13.5px] text-[var(--j-mu)]">{news.status === "loading" ? "Loading headlines…" : "Headlines are unavailable right now."}</p>
                        )}
                    </Module>
                </div>
            </div>
        </WorkspaceShell>
    );
};

export default WorkspaceHome;
