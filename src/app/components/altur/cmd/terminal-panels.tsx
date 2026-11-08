"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Tickers } from "@/utils/use-market-intel";
import { MARKETS, MARKET_GROUPS, marketFor, marketName, searchMarkets } from "@/utils/markets";
import { useWatchlist, useWorkspaceSettings } from "@/utils/workspace-store";

// The two side columns of the command-centre terminal. Left: the watchlist with
// two days of hourly price for each instrument. Right: what state the trader is
// in, their risk for the day, and their own rules before an entry.

const base = (symbol: string) => symbol.replace(/USDT$/, "");
const tone = (value: number) => (value > 0 ? "text-[#4DD0E1]" : value < 0 ? "text-[#E955A8]" : "text-white/60");
const price = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: value >= 100 ? 1 : value >= 1 ? 3 : 5, maximumFractionDigits: value >= 100 ? 1 : value >= 1 ? 4 : 6 });

const GROUPS = ["Favorites", ...MARKET_GROUPS] as const;
type Group = (typeof GROUPS)[number];

// The markets: favorites, the catalogue by group, and search over every Bybit
// USDT perpetual. A row opens that market's chart; the star keeps it in Favorites.
// levels is kept in the signature for callers; the chart draws the plan itself.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WatchPanel = ({ tickers, selected, onSelect, levels, onCollapse }: { tickers: Tickers; selected: string; onSelect: (symbol: string) => void; levels: { label: string; price: number }[]; onCollapse?: () => void }) => {
    const [favorites, setFavorites, store] = useWatchlist();
    const [group, setGroup] = useState<Group>("Favorites");
    const [query, setQuery] = useState("");
    const live = tickers.status === "live" ? tickers : null;
    const symbols = query.trim()
        ? searchMarkets(query, live ? [...live.all].sort((a, b) => b.turnover24h - a.turnover24h).map((t) => t.symbol) : []).slice(0, 30)
        : group === "Favorites"
          ? favorites
          : MARKETS.filter((m) => m.group === group).map((m) => m.symbol);
    const star = (symbol: string) => setFavorites((list) => (list.includes(symbol) ? list.filter((s) => s !== symbol) : [...list, symbol]));

    return (
        <div className="cmd-panel flex min-h-0 w-full flex-col overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 pt-3">
                {onCollapse && (
                    <button type="button" onClick={onCollapse} title="Hide markets" aria-label="Hide markets" className="px-1 text-[13px] text-white/40 hover:text-white">
                        ‹
                    </button>
                )}
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search · oil, gold, BTC" aria-label="Search markets" className="min-w-0 flex-1 rounded-md bg-white/[0.04] px-2.5 py-1.5 text-[12.5px] text-white placeholder:text-white/35 focus:outline-none" />
            </div>
            {!query.trim() && (
                <div className="flex flex-wrap gap-x-3 gap-y-1 px-3 pb-1 pt-2.5 text-[11.5px]" role="tablist" aria-label="Market groups">
                    {GROUPS.map((g) => (
                        <button key={g} type="button" role="tab" aria-selected={group === g} onClick={() => setGroup(g)} className={`pb-0.5 transition-colors ${group === g ? "border-b border-[#4DD0E1] text-white" : "text-white/45 hover:text-white"}`}>
                            {g}
                        </button>
                    ))}
                </div>
            )}
            <div className="min-h-0 flex-1 overflow-y-auto py-1">
                {store.ready && symbols.length === 0 && <p className="px-3 py-3 text-[12px] text-white/40">{query.trim() ? "No Bybit market matches." : "Star a market to keep it here."}</p>}
                {symbols.map((symbol) => {
                    const ticker = live?.bySymbol[symbol];
                    const market = marketFor(symbol);
                    const on = symbol === selected;
                    const fav = favorites.includes(symbol);
                    return (
                        <div key={symbol} className={`group relative flex items-center ${on ? "bg-[var(--j-s2,rgba(255,255,255,0.05))]" : "hover:bg-white/[0.03]"}`}>
                            {on && <span className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-[#4DD0E1]" aria-hidden="true" />}
                            <button type="button" aria-pressed={on} onClick={() => onSelect(symbol)} className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-2 py-1.5 pl-3 text-left">
                                <span className="min-w-0 truncate text-[12.5px] text-white">{marketName(symbol)}</span>
                                <span className="font-mono text-[12px] text-white">{ticker ? price(ticker.price) : live ? "—" : "…"}</span>
                                <span className="truncate font-mono text-[10px] text-white/35">{market?.tracks ? `${market.tracks} · ` : ""}PERP</span>
                                <span className={`text-right font-mono text-[10.5px] ${ticker ? tone(ticker.change24h) : "text-white/35"}`}>{ticker ? `${ticker.change24h >= 0 ? "+" : ""}${ticker.change24h.toFixed(2)}%` : ""}</span>
                            </button>
                            <button type="button" onClick={() => star(symbol)} aria-pressed={fav} aria-label={fav ? `Remove ${marketName(symbol)} from favorites` : `Add ${marketName(symbol)} to favorites`} className={`px-2 text-[12px] transition-opacity ${fav ? "text-[#4DD0E1]" : "text-white/30 opacity-0 group-hover:opacity-100 focus:opacity-100"}`}>
                                {fav ? "★" : "☆"}
                            </button>
                        </div>
                    );
                })}
            </div>
            <p className="border-t border-white/[0.07] px-3 py-2 text-[10.5px] leading-snug text-white/35">Bybit public data · USDT perpetuals · view only</p>
        </div>
    );
};

export const StatePanel = ({ demo, state, detail, href, action, rules: rulesSlot }: { demo: boolean; state: "idle" | "planning" | "active"; detail: string; href: string; action: string; rules?: React.ReactNode }) => {
    const [settings] = useWorkspaceSettings();
    const [ticked, setTicked] = useState<Record<string, boolean>>({});
    useEffect(() => setTicked({}), [state]);
    const rules = settings.checklist.slice(0, 5);
    const ring = 2 * Math.PI * 30;
    const words = { idle: ["Idle", "Waiting for your setup"], planning: ["Planning", "A trade is being prepared"], active: ["Active", "A trade is open"] } as const;
    return (
        <div className="flex flex-col gap-3">
            <div className="cmd-panel p-4">
                <div className="flex items-center justify-between">
                    <p className="cmd-label">Trade state</p>
                    <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${state === "active" ? "border-[#4DD0E1]/50 text-[#4DD0E1]" : "border-white/15 text-white/55"}`}>{words[state][0]}</span>
                </div>
                <p className="mt-2.5 text-[15px] font-medium text-white">{words[state][1]}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/50">{detail}</p>
                <Link href={href} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[var(--j-active,#f2f2f3)] px-3.5 py-2 text-xs font-medium text-[var(--j-activeink,#111214)] transition-opacity hover:opacity-90">
                    {action} →
                </Link>
            </div>

            <div className="cmd-panel p-4">
                <p className="cmd-label">Risk</p>
                <div className="mt-3 flex items-center gap-5">
                    <svg viewBox="0 0 70 70" className="h-[70px] w-[70px] flex-shrink-0" role="img" aria-label="0% of the daily limit used">
                        <circle cx="35" cy="35" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeDasharray="2 3" />
                        <circle cx="35" cy="35" r="30" fill="none" stroke="#4DD0E1" strokeWidth="4" strokeDasharray={`0 ${ring}`} transform="rotate(-90 35 35)" />
                        <text x="35" y="39" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600">
                            0%
                        </text>
                    </svg>
                    <dl className="flex-1 space-y-1.5 text-[13px]">
                        <div className="flex justify-between gap-3">
                            <dt className="text-white/55">Max trades a day</dt>
                            <dd className="font-mono text-white">{settings.limits?.maxTrades ?? "Not set"}</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                            <dt className="text-white/55">Stop after losses</dt>
                            <dd className="font-mono text-[#E955A8]">{settings.limits?.maxLosses ?? "Not set"}</dd>
                        </div>
                    </dl>
                </div>
                {!demo && !settings.limits && (
                    <Link href="/alturelock/settings" className="mt-3 inline-block text-xs text-white/50 hover:text-white">
                        Set your daily limits →
                    </Link>
                )}
            </div>

            {rulesSlot ?? (
            <div className="cmd-panel p-4">
                <p className="cmd-label">Rules · before entry</p>
                <ul className="mt-3 space-y-2.5">
                    {rules.map((rule) => (
                        <li key={rule.id}>
                            <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-white/80">
                                <input type="checkbox" checked={Boolean(ticked[rule.id])} onChange={() => setTicked((all) => ({ ...all, [rule.id]: !all[rule.id] }))} className="mt-0.5 !h-4 !w-4 accent-[var(--j-up,#4DD0E1)]" />
                                {rule.label}
                            </label>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 rounded border border-dashed border-white/10 px-3 py-2 text-center text-[11px] text-white/40">Order entry stays on the exchange</p>
            </div>
            )}
        </div>
    );
};
