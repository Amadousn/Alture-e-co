"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { assetFor } from "@/utils/trade-plan";
import type { Tickers } from "@/utils/use-market-intel";
import { useWatchlist } from "@/utils/workspace-store";

export const fmtPrice = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5, maximumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5 })}`;
export const fmtPct = (value: number | null) => (value === null ? "—" : `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`);
const fmtMoney = (value: number) => (value >= 1e9 ? `$${(value / 1e9).toFixed(2)}B` : value >= 1e6 ? `$${(value / 1e6).toFixed(1)}M` : `$${Math.round(value).toLocaleString()}`);
const tone = (value: number | null) => (value === null ? "text-white/45" : value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white");
const base = (symbol: string) => symbol.replace(/USDT$/, "");
export const stamp = (time: number) => new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";

// The trader's instruments with live figures. Each row opens that instrument's chart.
const Watchlist = ({ tickers, compact = false, selected, onSelect }: { tickers: Tickers; compact?: boolean; selected?: string; onSelect?: (symbol: string) => void }) => {
    const [list, setList, store] = useWatchlist();
    const [editing, setEditing] = useState(false);
    const [query, setQuery] = useState("");
    const live = tickers.status === "live" ? tickers : null;

    const matches = useMemo(() => {
        const text = query.trim().toUpperCase();
        if (!live || text.length < 2) return [];
        return live.all.filter((item) => item.symbol.includes(text) && !list.includes(item.symbol)).sort((a, b) => b.turnover24h - a.turnover24h).slice(0, 6);
    }, [query, live, list]);

    const move = (symbol: string, by: number) =>
        setList((current) => {
            const index = current.indexOf(symbol);
            const target = index + by;
            if (index < 0 || target < 0 || target >= current.length) return current;
            const next = [...current];
            [next[index], next[target]] = [next[target], next[index]];
            return next;
        });

    const columns = compact ? "grid-cols-[1fr_auto_3.7rem]" : "grid-cols-[1fr_auto_4.5rem] md:grid-cols-[minmax(9rem,1.3fr)_1fr_5rem_5rem_5.5rem_6.5rem_auto]";

    return (
        <div>
            <div className={`mb-2 flex items-baseline justify-between gap-4 ${compact ? "px-4" : ""}`}>
                <p className={label}>Watchlist</p>
                {compact && !onSelect ? (
                    <Link href="/alturelock/workspace" className="group text-xs font-medium text-white/70 hover:text-white transition-colors">
                        Markets <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                ) : (
                    <button type="button" onClick={() => setEditing((value) => !value)} aria-pressed={editing} className={`nav-link pb-1 text-xs font-medium ${editing ? "is-active" : ""}`}>
                        {editing ? "Done" : compact ? "Edit" : "Edit watchlist"}
                    </button>
                )}
            </div>

            {!compact && (
                <div className={`hidden md:grid ${columns} gap-x-5 border-t border-white/15 py-2 ${label} !tracking-[0.08em]`}>
                    <span>Instrument</span>
                    <span className="text-right">Price</span>
                    <span className="text-right">1h</span>
                    <span className="text-right">24h</span>
                    <span className="text-right">24h range</span>
                    <span className="text-right">24h volume</span>
                    <span className="w-16" />
                </div>
            )}

            <ul>
                {store.ready &&
                    list.map((symbol, index) => {
                        const ticker = live?.bySymbol[symbol];
                        const name = assetFor(symbol)?.name ?? base(symbol);
                        const row = (
                            <>
                                <span className="min-w-0">
                                    <span className={`block truncate font-medium tracking-tight text-white ${compact ? "text-sm" : "text-[15px]"}`}>{name}</span>
                                    <span className="block truncate text-[11px] text-white/40">{compact ? symbol : `${symbol} · Perpetual`}</span>
                                </span>
                                <span className={`text-right tabular-nums text-white ${compact ? "text-sm" : "text-[15px]"}`}>{ticker ? fmtPrice(ticker.price) : tickers.status === "loading" ? "…" : "Unavailable"}</span>
                                {!compact && <span className={`hidden md:block text-right text-sm tabular-nums ${tone(ticker?.change1h ?? null)}`}>{fmtPct(ticker?.change1h ?? null)}</span>}
                                <span className={`text-right tabular-nums ${compact ? "text-xs" : "text-sm"} ${tone(ticker?.change24h ?? null)}`}>{fmtPct(ticker?.change24h ?? null)}</span>
                                {!compact && <span className="hidden md:block text-right text-sm tabular-nums text-white/70">{ticker?.range24h != null ? `${ticker.range24h.toFixed(2)}%` : "—"}</span>}
                                {!compact && <span className="hidden md:block text-right text-sm tabular-nums text-white/70">{ticker ? fmtMoney(ticker.turnover24h) : "—"}</span>}
                            </>
                        );
                        return (
                            <li key={symbol} className={compact ? "" : "border-t border-white/15"}>
                                {editing ? (
                                    <div className={`grid ${columns} items-center gap-x-3 py-3 ${compact ? "px-4" : ""}`}>
                                        {row}
                                        <span className="col-span-3 md:col-span-1 flex justify-end gap-1">
                                            <button type="button" aria-label={`Move ${name} up`} disabled={index === 0} onClick={() => move(symbol, -1)} className="h-7 w-7 border border-white/25 text-xs text-white hover:bg-white/10 disabled:opacity-25">
                                                ↑
                                            </button>
                                            <button type="button" aria-label={`Move ${name} down`} disabled={index === list.length - 1} onClick={() => move(symbol, 1)} className="h-7 w-7 border border-white/25 text-xs text-white hover:bg-white/10 disabled:opacity-25">
                                                ↓
                                            </button>
                                            <button type="button" aria-label={`Remove ${name}`} onClick={() => setList((current) => current.filter((item) => item !== symbol))} className="h-7 px-2 border border-white/25 text-xs text-[#E955A8] hover:bg-white/10">
                                                Remove
                                            </button>
                                        </span>
                                    </div>
                                ) : onSelect ? (
                                    <button type="button" aria-pressed={selected === symbol} onClick={() => onSelect(symbol)} className={`relative grid w-full ${columns} items-center gap-x-3 px-4 py-2 text-left transition-colors hover:bg-white/[0.04] ${selected === symbol ? "bg-white/[0.06]" : ""}`}>
                                        {selected === symbol && <span className="absolute inset-y-1 left-0 w-0.5 bg-accent" aria-hidden="true" />}
                                        {row}
                                    </button>
                                ) : (
                                    <Link href={`/alturelock/workspace?symbol=${symbol}`} className={`group grid ${columns} items-center gap-x-5 py-3 transition-colors hover:bg-white/[0.03]`}>
                                        {row}
                                        {!compact && <span className="hidden md:block w-16 text-right text-xs text-white/45 group-hover:text-white transition-colors">Chart →</span>}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                {store.ready && list.length === 0 && <li className={`py-4 text-sm text-white/55 ${compact ? "px-4" : "border-t border-white/15"}`}>Your watchlist is empty. Use Edit to add instruments.</li>}
                {!compact && <li className="border-t border-white/15" aria-hidden="true" />}
            </ul>

            {editing && (
                <div className={`cockpit-rise mt-4 max-w-md ${compact ? "px-4" : ""}`}>
                    <label htmlFor="watchlist-add" className={`${label} mb-1.5 block`}>
                        Add an instrument
                    </label>
                    <input id="watchlist-add" type="text" autoComplete="off" placeholder="Type a symbol, for example DOGE" value={query} onChange={(event) => setQuery(event.target.value)} className="!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white" />
                    {!live && <p className="mt-2 text-xs text-white/45">The instrument list is unavailable right now.</p>}
                    <ul className="mt-1">
                        {matches.map((item) => (
                            <li key={item.symbol}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setList((current) => [...current, item.symbol]);
                                        setQuery("");
                                    }}
                                    className="flex w-full items-baseline justify-between gap-4 border-b border-white/10 py-2.5 text-left text-sm hover:bg-white/[0.04]"
                                >
                                    <span className="text-white">{item.symbol}</span>
                                    <span className="tabular-nums text-white/55">
                                        {fmtPrice(item.price)} · {fmtMoney(item.turnover24h)} 24h
                                    </span>
                                </button>
                            </li>
                        ))}
                        {live && query.trim().length >= 2 && matches.length === 0 && <li className="py-2.5 text-xs text-white/45">No Bybit USDT perpetual matches that, or it is already on your list.</li>}
                    </ul>
                </div>
            )}

            <p className={`mt-3 text-[11px] leading-relaxed text-white/35 ${compact ? "hidden" : ""}`}>{live ? `${live.source}. Updated ${stamp(live.fetchedAt)}, refreshed every 15 seconds.` : tickers.status === "loading" ? "Loading prices…" : "Prices are unavailable right now: the market data source could not be reached."}</p>
        </div>
    );
};

export default Watchlist;
