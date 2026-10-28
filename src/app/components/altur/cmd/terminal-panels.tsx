"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sparkline, { useCloses } from "./sparkline";
import type { Tickers } from "@/utils/use-market-intel";
import { useWatchlist, useWorkspaceSettings } from "@/utils/workspace-store";

// The two side columns of the command-centre terminal. Left: the watchlist with
// two days of hourly price for each instrument. Right: what state the trader is
// in, their risk for the day, and their own rules before an entry.

const base = (symbol: string) => symbol.replace(/USDT$/, "");
const tone = (value: number) => (value > 0 ? "text-[#20B8A8]" : value < 0 ? "text-[#E955A8]" : "text-white/60");
const price = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: value >= 100 ? 1 : value >= 1 ? 3 : 5, maximumFractionDigits: value >= 100 ? 1 : value >= 1 ? 4 : 6 });

const Row = ({ symbol, tickers, selected, onSelect }: { symbol: string; tickers: Tickers; selected: boolean; onSelect: () => void }) => {
    const closes = useCloses(symbol);
    const ticker = tickers.status === "live" ? tickers.bySymbol[symbol] : undefined;
    return (
        <button type="button" aria-pressed={selected} onClick={onSelect} className={`relative grid w-full grid-cols-[1fr_auto] items-center gap-x-3 px-4 py-2.5 text-left transition-colors ${selected ? "bg-[#20B8A8]/[0.07]" : "hover:bg-white/[0.03]"}`}>
            {selected && <span className="absolute inset-y-1 left-0 w-[2px] rounded-full bg-[#20B8A8]" aria-hidden="true" />}
            <span className="min-w-0">
                <span className="text-[13px] font-semibold text-white">{base(symbol)}</span>
                <span className="ml-1.5 font-mono text-[9.5px] text-white/35">PERP</span>
                <span className="mt-1 block">
                    <Sparkline values={closes} width={110} height={18} />
                </span>
            </span>
            <span className="text-right font-mono">
                <span className="block text-[13px] text-white">{ticker ? price(ticker.price) : "…"}</span>
                {ticker && <span className={`mt-1 block text-[11px] ${tone(ticker.change24h)}`}>{`${ticker.change24h >= 0 ? "+" : ""}${ticker.change24h.toFixed(2)}%`}</span>}
            </span>
        </button>
    );
};

export const WatchPanel = ({ tickers, selected, onSelect, levels }: { tickers: Tickers; selected: string; onSelect: (symbol: string) => void; levels: { label: string; price: number }[] }) => {
    const [list, , store] = useWatchlist();
    return (
        <div className="cmd-panel flex min-h-0 flex-col overflow-hidden">
            <p className="cmd-label px-4 pb-2 pt-4">Watchlist</p>
            <div className="min-h-0 flex-1 overflow-y-auto">{store.ready && list.map((symbol) => <Row key={symbol} symbol={symbol} tickers={tickers} selected={symbol === selected} onSelect={() => onSelect(symbol)} />)}</div>
            <div className="border-t border-white/[0.07] px-4 py-3">
                <p className="cmd-label">Levels on {base(selected)}</p>
                {levels.length ? (
                    <ul className="mt-2 space-y-1.5 font-mono text-[12px]">
                        {levels.map((level) => (
                            <li key={level.label} className="flex justify-between gap-3">
                                <span className="text-white/60">{level.label}</span>
                                <span className="text-white">{price(level.price)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-2 text-xs leading-relaxed text-white/40">Your entry, stop loss and take profit appear here once a trade is planned.</p>
                )}
            </div>
        </div>
    );
};

export const StatePanel = ({ demo, state, detail, href, action }: { demo: boolean; state: "idle" | "planning" | "active"; detail: string; href: string; action: string }) => {
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
                    <span className={`rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${state === "active" ? "border-[#20B8A8]/50 text-[#20B8A8]" : "border-white/15 text-white/55"}`}>{words[state][0]}</span>
                </div>
                <p className="mt-2.5 text-[15px] font-medium text-white">{words[state][1]}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-white/50">{detail}</p>
                <Link href={href} className="mt-3 inline-flex items-center gap-2 rounded-md border border-[#20B8A8]/40 bg-[#20B8A8]/10 px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#20B8A8]/15">
                    {action} →
                </Link>
            </div>

            <div className="cmd-panel p-4">
                <p className="cmd-label">Risk</p>
                <div className="mt-3 flex items-center gap-5">
                    <svg viewBox="0 0 70 70" className="h-[70px] w-[70px] flex-shrink-0" role="img" aria-label="0% of the daily limit used">
                        <circle cx="35" cy="35" r="30" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeDasharray="2 3" />
                        <circle cx="35" cy="35" r="30" fill="none" stroke="#20B8A8" strokeWidth="4" strokeDasharray={`0 ${ring}`} transform="rotate(-90 35 35)" />
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

            <div className="cmd-panel p-4">
                <p className="cmd-label">Rules · before entry</p>
                <ul className="mt-3 space-y-2.5">
                    {rules.map((rule) => (
                        <li key={rule.id}>
                            <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-white/80">
                                <input type="checkbox" checked={Boolean(ticked[rule.id])} onChange={() => setTicked((all) => ({ ...all, [rule.id]: !all[rule.id] }))} className="mt-0.5 !h-4 !w-4 accent-[#20B8A8]" />
                                {rule.label}
                            </label>
                        </li>
                    ))}
                </ul>
                <p className="mt-3 rounded border border-dashed border-white/10 px-3 py-2 text-center text-[11px] text-white/40">Order entry stays on the exchange</p>
            </div>
        </div>
    );
};
