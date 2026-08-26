"use client";

import { useEffect, useState } from "react";

const REFRESH_MS = 45 * 1000;

function parsePrice(value: string): number | null {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return Number.isNaN(num) ? null : num;
}

type OpenPosition = {
    instrument: string;
    direction: "Long" | "Short";
    entryPrice: number;
    currentPrice: number;
    units: number;
    stopLoss: number;
    takeProfit: number;
    timeInTrade: string;
};

const OPEN_POSITION: OpenPosition = {
    instrument: "XRPUSDT",
    direction: "Long",
    entryPrice: 1.10,
    currentPrice: 1.245,
    units: 12500,
    stopLoss: 1.045,
    takeProfit: 1.32,
    timeInTrade: "4h 12m",
};

type PastTrade = {
    instrument: string;
    direction: "Long" | "Short";
    entry: number;
    exit: number;
    pnlAmount: number;
    pnlPct: number;
    result: "Win" | "Loss";
    date: string;
};

const TRADE_HISTORY: PastTrade[] = [
    { instrument: "BTCUSDT", direction: "Long", entry: 61200, exit: 63450, pnlAmount: 1012.50, pnlPct: 3.68, result: "Win", date: "Aug 18" },
    { instrument: "ETHUSDT", direction: "Short", entry: 3120, exit: 3085, pnlAmount: 420.00, pnlPct: 1.12, result: "Win", date: "Aug 15" },
    { instrument: "SOLUSDT", direction: "Long", entry: 142.50, exit: 138.90, pnlAmount: -630.00, pnlPct: -2.53, result: "Loss", date: "Aug 11" },
    { instrument: "XRPUSDT", direction: "Long", entry: 1.05, exit: 1.02, pnlAmount: -255.00, pnlPct: -2.86, result: "Loss", date: "Aug 07" },
    { instrument: "BNBUSDT", direction: "Long", entry: 580, exit: 604, pnlAmount: 960.00, pnlPct: 4.14, result: "Win", date: "Aug 03" },
];

function formatPrice(value: number): string {
    return value < 10 ? value.toFixed(4) : value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatSignedDollars(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatSignedPct(value: number): string {
    const sign = value >= 0 ? "+" : "";
    return `${sign}${value.toFixed(2)}%`;
}

const LiveTradePanel = () => {
    const [livePrice, setLivePrice] = useState(OPEN_POSITION.currentPrice);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/ticker", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (cancelled || !Array.isArray(data.items)) return;
                const xrp = data.items.find((item: { symbol: string; value: string }) => item.symbol === "XRP");
                if (!xrp) return;
                const parsed = parsePrice(xrp.value);
                if (parsed != null) setLivePrice(parsed);
            } catch {
                // keep the last known price if the fetch fails
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    const costBasis = OPEN_POSITION.entryPrice * OPEN_POSITION.units;
    const marketValue = livePrice * OPEN_POSITION.units;
    const unrealizedPnl = OPEN_POSITION.direction === "Long" ? marketValue - costBasis : costBasis - marketValue;
    const unrealizedPnlPct = (unrealizedPnl / costBasis) * 100;
    const pnlPositive = unrealizedPnl >= 0;

    const totalTrades = TRADE_HISTORY.length;
    const wins = TRADE_HISTORY.filter((t) => t.result === "Win").length;
    const winRate = (wins / totalTrades) * 100;
    const totalPnl = TRADE_HISTORY.reduce((sum, t) => sum + t.pnlAmount, 0);

    return (
        <div className="max-w-4xl mx-auto">
            <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-2 text-center">
                LIVE ACCOUNT PREVIEW
            </p>
            <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed max-w-md mx-auto mb-10 text-center">
                A preview of what your account view will look like once connected to your broker.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Current position */}
                <div className="lg:col-span-5 border border-white/10 bg-black/40 p-6 md:p-8">
                    <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                        CURRENT POSITION
                    </p>

                    <div className="flex items-baseline justify-between mb-6">
                        <div>
                            <p className="text-lg md:text-xl font-light text-white font-mono">{OPEN_POSITION.instrument}</p>
                            <p className={`text-xs font-mono tracking-[0.1em] mt-1 ${OPEN_POSITION.direction === "Long" ? "text-primary" : "text-red-400"}`}>
                                {OPEN_POSITION.direction.toUpperCase()}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className={`text-xl md:text-2xl font-mono ${pnlPositive ? "text-primary" : "text-red-400"}`}>
                                {formatSignedDollars(unrealizedPnl)}
                            </p>
                            <p className={`text-xs font-mono mt-1 ${pnlPositive ? "text-primary" : "text-red-400"}`}>
                                {formatSignedPct(unrealizedPnlPct)}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-left border-t border-white/10 pt-6">
                        <TradeStat label="Entry Price" value={`$${formatPrice(OPEN_POSITION.entryPrice)}`} />
                        <TradeStat label="Current Price" value={`$${formatPrice(livePrice)}`} />
                        <TradeStat label="Stop-Loss" value={`$${formatPrice(OPEN_POSITION.stopLoss)}`} warn />
                        <TradeStat label="Take-Profit" value={`$${formatPrice(OPEN_POSITION.takeProfit)}`} accent />
                        <TradeStat label="Time in Trade" value={OPEN_POSITION.timeInTrade} />
                    </div>
                </div>

                {/* Trade history */}
                <div className="lg:col-span-7 border border-white/10 bg-black/40 p-6 md:p-8">
                    <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-6">
                        TRADE HISTORY
                    </p>

                    <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-4 mb-4 text-left">
                        <TradeStat label="Total Trades" value={String(totalTrades)} />
                        <TradeStat label="Win Rate" value={`${winRate.toFixed(0)}%`} accent={winRate >= 50} warn={winRate < 50} />
                        <TradeStat label="Total P and L" value={formatSignedDollars(totalPnl)} accent={totalPnl >= 0} warn={totalPnl < 0} />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-light text-gray-500 uppercase tracking-[0.1em]">
                                    <th className="pb-3 pr-4 font-normal">Instrument</th>
                                    <th className="pb-3 pr-4 font-normal">Entry</th>
                                    <th className="pb-3 pr-4 font-normal">Exit</th>
                                    <th className="pb-3 pr-4 font-normal">P and L</th>
                                    <th className="pb-3 pr-4 font-normal">Result</th>
                                    <th className="pb-3 font-normal">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TRADE_HISTORY.map((trade, i) => (
                                    <tr key={i} className="border-t border-white/5">
                                        <td className="py-3 pr-4 text-sm font-mono text-white whitespace-nowrap">{trade.instrument}</td>
                                        <td className="py-3 pr-4 text-sm font-mono text-gray-400 whitespace-nowrap">${formatPrice(trade.entry)}</td>
                                        <td className="py-3 pr-4 text-sm font-mono text-gray-400 whitespace-nowrap">${formatPrice(trade.exit)}</td>
                                        <td className={`py-3 pr-4 text-sm font-mono whitespace-nowrap ${trade.pnlAmount >= 0 ? "text-primary" : "text-red-400"}`}>
                                            {formatSignedDollars(trade.pnlAmount)} ({formatSignedPct(trade.pnlPct)})
                                        </td>
                                        <td className="py-3 pr-4 text-sm font-light whitespace-nowrap">
                                            <span className={trade.result === "Win" ? "text-primary" : "text-red-400"}>{trade.result}</span>
                                        </td>
                                        <td className="py-3 text-sm font-light text-gray-500 whitespace-nowrap">{trade.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TradeStat = ({ label, value, accent, warn }: { label: string; value: string; accent?: boolean; warn?: boolean }) => (
    <div>
        <p className="text-xs font-light text-gray-500 uppercase tracking-[0.1em] mb-1">{label}</p>
        <p className={`text-sm md:text-base font-mono ${warn ? "text-red-400" : accent ? "text-primary" : "text-white"}`}>{value}</p>
    </div>
);

export default LiveTradePanel;
