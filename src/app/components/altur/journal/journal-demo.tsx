"use client";

import { useEffect, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import JournalStudio from "./journal-studio";

// Invented trades for the public demo. Each row is
// [months ago, day of month, instrument, direction, entry, exit, quantity, setup].
// Weekdays only, and deliberately uneven: some weeks have two trades, some five.
// Entries and exits sit inside each instrument's real Bybit range for that
// day (taken 2026-10-10), on its real tick and lot size.
const SAMPLE: [number, number, string, "Long" | "Short", number, number, number, "Continuation" | "Reversal"][] = [
    [0, 13, "BTCUSDT", "Short", 83596.0, 83328.7, 3.0, "Continuation"],
    [0, 14, "ETHUSDT", "Short", 2506.45, 2451.01, 100.0, "Continuation"],
    [0, 15, "SOLUSDT", "Short", 101.51, 105.55, 300.0, "Reversal"],
    [0, 16, "BTCUSDT", "Long", 82207.4, 82597.7, 3.0, "Continuation"],
    [0, 20, "BTCUSDT", "Short", 83232.0, 82784.5, 3.0, "Continuation"],
    [0, 21, "ETHUSDT", "Short", 2455.56, 2467.94, 100.0, "Reversal"],
    [0, 22, "SOLUSDT", "Long", 104.4, 104.67, 2300.0, "Continuation"],
    [0, 23, "BTCUSDT", "Short", 81961.7, 81688.4, 3.0, "Continuation"],
    [0, 27, "ETHUSDT", "Long", 2312.58, 2314.92, 100.0, "Reversal"],
    [0, 27, "BTCUSDT", "Short", 80338.8, 80537.2, 3.0, "Reversal"],
    [0, 1, "BTCUSDT", "Short", 83971, 83333.3, 2.977, "Continuation"],
    [0, 2, "ETHUSDT", "Short", 2722.08, 2708.4, 91.84, "Continuation"],
    [0, 2, "HYPEUSDT", "Long", 88.215, 88.13, 2833.99, "Reversal"],
    [0, 6, "XRPUSDT", "Long", 1.4997, 1.4985, 166700, "Continuation"],
    [0, 7, "BTCUSDT", "Long", 84066.4, 84745.4, 2.974, "Continuation"],
    [0, 7, "SOLUSDT", "Short", 118.24, 117.57, 2114.3, "Continuation"],
    [0, 9, "BTCUSDT", "Long", 82024.3, 82722.6, 3.048, "Reversal"],
    [1, 1, "BTCUSDT", "Long", 76913.1, 77461.1, 3.25, "Continuation"],
    [1, 2, "ETHUSDT", "Short", 2404.24, 2392.88, 103.98, "Continuation"],
    [1, 2, "HYPEUSDT", "Long", 81.923, 81.87, 3051.65, "Continuation"],
    [1, 4, "BTCUSDT", "Short", 80070.8, 79319.1, 3.122, "Reversal"],
    [1, 8, "SOLUSDT", "Long", 102.4, 102.3, 2441.4, "Continuation"],
    [1, 10, "BTCUSDT", "Long", 77285.4, 77917.3, 3.235, "Continuation"],
    [1, 14, "XRPUSDT", "Short", 1.4106, 1.4021, 177230, "Continuation"],
    [1, 15, "BTCUSDT", "Short", 75976.7, 76079.9, 3.29, "Reversal"],
    [1, 15, "ETHUSDT", "Long", 2385.01, 2402.78, 104.82, "Continuation"],
    [1, 15, "SOLUSDT", "Long", 99.54, 99.9, 2511.6, "Continuation"],
    [1, 17, "HYPEUSDT", "Long", 80.846, 81.681, 3092.3, "Continuation"],
    [1, 18, "BTCUSDT", "Long", 77626.3, 78309.8, 3.221, "Reversal"],
    [1, 22, "SOLUSDT", "Short", 116.19, 116.25, 2151.6, "Continuation"],
    [1, 24, "BTCUSDT", "Long", 83475.3, 84377, 2.995, "Continuation"],
    [1, 24, "ETHUSDT", "Short", 2658.49, 2661.79, 94.04, "Continuation"],
    [1, 24, "XRPUSDT", "Long", 1.4801, 1.4785, 168908, "Reversal"],
    [1, 24, "HYPEUSDT", "Short", 90.64, 90.576, 2758.16, "Continuation"],
    [1, 29, "BTCUSDT", "Short", 83993.4, 83356.4, 2.976, "Continuation"],
    [1, 30, "HYPEUSDT", "Long", 87.219, 87.881, 2866.35, "Continuation"],
    [2, 4, "BTCUSDT", "Long", 63468.8, 64006.8, 3.939, "Reversal"],
    [2, 6, "ETHUSDT", "Short", 1908.51, 1910.91, 130.99, "Continuation"],
    [2, 11, "BTCUSDT", "Short", 64096.5, 63588.8, 3.9, "Continuation"],
    [2, 13, "HYPEUSDT", "Long", 56.797, 57.167, 4401.64, "Continuation"],
    [2, 18, "BTCUSDT", "Long", 64349.4, 64238.4, 3.885, "Reversal"],
    [2, 20, "ETHUSDT", "Long", 2296.05, 2312.51, 108.88, "Continuation"],
    [2, 25, "BTCUSDT", "Short", 79849.3, 79155.4, 3.131, "Continuation"],
    [2, 27, "XRPUSDT", "Long", 1.4217, 1.4206, 175846, "Continuation"],
    [2, 28, "BTCUSDT", "Long", 77734.9, 78451.5, 3.216, "Reversal"],
];

// Bybit's base perpetual fees: the demo trader enters with a limit order (maker)
// and exits at market (taker), as most planned trades do.
const MAKER_FEE = 0.0002;
const TAKER_FEE = 0.00055;
const LEVERAGE = 20;

const cents = (value: number) => Math.round(value * 100) / 100;
// Quantities rounded to each instrument's lot size on Bybit.
const LOT: Record<string, number> = { BTCUSDT: 0.001, ETHUSDT: 0.01, SOLUSDT: 0.1, XRPUSDT: 1, HYPEUSDT: 0.01 };
const sized = (instrument: string, quantity: number) => {
    const lot = LOT[instrument] ?? 0.001;
    return Number((Math.round(quantity / lot) * lot).toFixed(6));
};

// The demo trader has two accounts on the same exchange; every third trade is on the second one.
export const SAMPLE_ACCOUNTS = [
    { id: "main", name: "Bybit · Main" },
    { id: "sub", name: "Bybit · Sub-account" },
    { id: "prop", name: "Prop firm · 50K · Tradovate" },
] as const;
export type SampleAccount = (typeof SAMPLE_ACCOUNTS)[number]["id"];
const accountOf = (i: number): SampleAccount => (i % 3 === 2 ? "sub" : "main");

// A funded futures account, as it arrives from a Tradovate Performance file.
// Invented trades: [months ago, day, contract, direction, entry, stop, target, exit, contracts, setup].
// Micro E-mini Nasdaq-100 is $2 a point, Micro E-mini S&P 500 $5 a point; fees are a flat round-trip per contract.
const POINT: Record<string, number> = { MNQ: 2, MES: 5 };
const PROP_FEE = 1.5;
const PROP: [number, number, "MNQ" | "MES", "Long" | "Short", number, number, number, number, number, "Continuation" | "Reversal"][] = [
    [0, 3, "MNQ", "Long", 21012.25, 20987.25, 21062.25, 21062.25, 4, "Continuation"],
    [0, 4, "MES", "Short", 6031.5, 6039.5, 6015.5, 6039.5, 3, "Reversal"],
    [0, 6, "MNQ", "Short", 21140.5, 21165.5, 21090.5, 21101.75, 4, "Continuation"],
    [0, 10, "MNQ", "Long", 20955.0, 20930.0, 21005.0, 20930.0, 4, "Reversal"],
    [0, 11, "MES", "Long", 6002.25, 5994.25, 6018.25, 6018.25, 3, "Continuation"],
    [0, 12, "MNQ", "Long", 21030.75, 21005.75, 21080.75, 21071.0, 4, "Continuation"],
    [1, 6, "MNQ", "Short", 20880.5, 20905.5, 20830.5, 20830.5, 4, "Continuation"],
    [1, 8, "MES", "Long", 5961.0, 5953.0, 5977.0, 5953.0, 3, "Reversal"],
    [1, 13, "MNQ", "Long", 20790.25, 20765.25, 20840.25, 20840.25, 4, "Continuation"],
    [1, 15, "MNQ", "Short", 20912.0, 20937.0, 20862.0, 20937.0, 4, "Reversal"],
    [1, 20, "MES", "Short", 5988.75, 5996.75, 5972.75, 5972.75, 3, "Continuation"],
    [1, 22, "MNQ", "Long", 20844.5, 20819.5, 20894.5, 20879.25, 4, "Continuation"],
    [1, 27, "MNQ", "Long", 20968.0, 20943.0, 21018.0, 21018.0, 4, "Continuation"],
    [2, 9, "MES", "Long", 5902.5, 5894.5, 5918.5, 5918.5, 3, "Continuation"],
    [2, 14, "MNQ", "Short", 20610.75, 20635.75, 20560.75, 20635.75, 4, "Reversal"],
    [2, 21, "MNQ", "Long", 20705.0, 20680.0, 20755.0, 20755.0, 4, "Continuation"],
];
const buildProp = (now: Date): ClosedTrade[] =>
    PROP.map(([monthsAgo, day, contract, direction, entryPrice, stopLoss, takeProfit, exitPrice, quantity, setup], i) => {
        const dir = direction === "Long" ? 1 : -1;
        const fee = cents(PROP_FEE * quantity);
        // US session, 15:30 to 20:00 UTC.
        const openedAt = Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - monthsAgo, day, 15, 35 + ((i * 11) % 50));
        return {
            id: `prop-${i}`,
            instrument: contract,
            direction,
            setup,
            entryPrice,
            exitPrice,
            stopLoss,
            takeProfit,
            quantity,
            leverage: 1,
            positionSize: cents(entryPrice * POINT[contract] * quantity),
            fee,
            profitLoss: cents((exitPrice - entryPrice) * dir * POINT[contract] * quantity - fee),
            openedAt,
            closedAt: openedAt + (20 + ((i * 37) % 140)) * 60 * 1000,
        } as ClosedTrade;
    });

export function buildSample(only?: SampleAccount): { trades: ClosedTrade[]; positions: OpenPosition[] } {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const trades = SAMPLE.map(([monthsAgo, day, instrument, direction, entryPrice, exitPrice, written, setup], i) => {
        const quantity = sized(instrument, written);
        // Fees and P&L are worked out from the prices and the quantity, never
        // the other way round, so every figure on a trade agrees with the rest.
        const fee = cents(entryPrice * quantity * MAKER_FEE + exitPrice * quantity * TAKER_FEE);
        const gross = (exitPrice - entryPrice) * quantity * (direction === "Long" ? 1 : -1);
        // Spread across the trading day so same-day trades stay in order.
        const closedAt = Date.UTC(year, month - monthsAgo, day, 8 + (i % 6) * 2, 15 + ((i * 7) % 40), (i * 13) % 60);
        // Held anywhere from about half an hour to nine hours.
        const heldMinutes = 35 + ((i * 97) % 510);
        return {
            id: `sample-${i}`,
            instrument,
            direction,
            setup,
            entryPrice,
            exitPrice,
            quantity,
            leverage: LEVERAGE,
            positionSize: cents(entryPrice * quantity),
            fee,
            profitLoss: cents(gross - fee),
            openedAt: closedAt - heldMinutes * 60 * 1000,
            closedAt,
        };
    })
        .filter((trade) => only !== "prop" && (!only || accountOf(Number(trade.id.slice(7))) === only) as boolean)
        .map((trade) => trade as ClosedTrade)
        .concat(!only || only === "prop" ? buildProp(now) : [])
        // The current month only shows days that have already happened.
        .filter((trade) => trade.closedAt <= now.getTime())
        .sort((a, b) => b.closedAt - a.closedAt);
    const positions: OpenPosition[] = [
        { instrument: "BTCUSDT", direction: "Long", entryPrice: 82560, markPrice: 82790, quantity: sized("BTCUSDT", 3.028), leverage: LEVERAGE, positionSize: cents(82560 * sized("BTCUSDT", 3.028)), unrealisedPnl: cents((82790 - 82560) * sized("BTCUSDT", 3.028)), openedAt: now.getTime() - 3 * 60 * 60 * 1000 },
    ];
    return { trades, positions: only === "sub" || only === "prop" ? [] : positions };
}

// The sample trades are dated relative to today, so their written prices would not
// match the market on those days. Each trade is moved onto the real Bybit price at
// its entry time; its move in percent and its position size in dollars are kept,
// so every result, fee and statistic stays the same while the chart agrees with it.
type Row = { t: number; o: number; h: number; l: number; c: number };
const history = new Map<string, Promise<Row[]>>();
const candles = (symbol: string, interval: string) => {
    const key = `${symbol}|${interval}`;
    if (!history.has(key)) history.set(key, fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}&limit=1000`).then((r) => (r.ok ? r.json() : { candles: [] })).then((j) => j.candles ?? []).catch(() => []));
    return history.get(key)!;
};
export async function anchorSample(data: { trades: ClosedTrade[]; positions: OpenPosition[] }) {
    const symbols = [...new Set([...data.trades.filter((t) => !t.id.startsWith("prop-")).map((t) => t.instrument), ...data.positions.map((p) => p.instrument)])];
    const series = Object.fromEntries(await Promise.all(symbols.map(async (s) => [s, { h1: await candles(s, "60"), h4: await candles(s, "240") }] as const)));
    const round = (value: number, like: number) => Number(value.toPrecision(like >= 1000 ? 7 : like >= 1 ? 6 : 5));
    // On the trade's day, the entry hour whose real move over the same holding time
    // best matches the trade's direction and size. Entry is that candle's open, exit
    // the close of the candle where the hold ends: both are real prices.
    const trades = data.trades.map((t) => {
        if (t.id.startsWith("prop-")) return t;
        const opened = t.openedAt ?? t.closedAt;
        const recent = Date.now() - opened < 40 * 86_400_000;
        const rows = recent ? series[t.instrument].h1 : series[t.instrument].h4;
        const size = recent ? 3_600_000 : 14_400_000;
        const steps = Math.max(1, Math.round((t.closedAt - opened) / size));
        const day = Math.floor(opened / 86_400_000) * 86_400_000;
        const dir = t.direction === "Long" ? 1 : -1;
        const want = ((t.exitPrice - t.entryPrice) / t.entryPrice) * dir;
        let best: { i: number; score: number } | null = null;
        rows.forEach((row, i) => {
            if (row.t < day || row.t >= day + 86_400_000) return;
            const end = rows[i + steps - 1];
            if (!end || end.t + size > Date.now()) return;
            const move = ((end.c - row.o) / row.o) * dir;
            const score = (Math.sign(move) === Math.sign(want) ? 0 : 1) * 10 + Math.abs(move - want) / Math.max(Math.abs(want), 0.0005);
            if (!best || score < best.score) best = { i, score };
        });
        if (!best) return t;
        const start = rows[(best as { i: number }).i];
        const end = rows[(best as { i: number }).i + steps - 1];
        const entryPrice = start.o;
        const exitPrice = end.c;
        const quantity = Number((t.positionSize / entryPrice).toPrecision(4));
        const fee = cents(entryPrice * quantity * MAKER_FEE + exitPrice * quantity * TAKER_FEE);
        const gross = (exitPrice - entryPrice) * quantity * dir;
        const openedAt = start.t + 60_000;
        // The plan the trade was taken with: a winner reached its target at 2R; a loser was stopped out.
        const move = Math.abs(exitPrice - entryPrice);
        const won = (exitPrice - entryPrice) * dir > 0;
        const takeProfit = won ? exitPrice : entryPrice + dir * move * 2;
        const stopLoss = won ? entryPrice - (dir * move) / 2 : exitPrice;
        const tick = entryPrice >= 1000 ? 10 : entryPrice >= 1 ? 1000 : 10000;
        return { ...t, entryPrice, exitPrice, quantity, positionSize: cents(entryPrice * quantity), fee, profitLoss: cents(gross - fee), openedAt, closedAt: end.t + size - 60_000, takeProfit: Math.round(takeProfit * tick) / tick, stopLoss: Math.round(stopLoss * tick) / tick };
    });
    const now = Date.now();
    const positions = data.positions.map((p) => {
        const rows = series[p.instrument].h1;
        const mark = rows.length ? rows[rows.length - 1].c : null;
        if (!mark) return p;
        const f = mark / p.markPrice;
        const quantity = Number((p.quantity / f).toPrecision(4));
        return { ...p, entryPrice: round(p.entryPrice * f, mark), markPrice: mark, quantity, positionSize: cents(p.entryPrice * f * quantity), unrealisedPnl: p.unrealisedPnl, openedAt: p.openedAt ?? now };
    });
    return { trades: trades.sort((a, b) => b.closedAt - a.closedAt), positions };
}

export function useSample(account?: SampleAccount) {
    const [data, setData] = useState<{ trades: ClosedTrade[]; positions: OpenPosition[] } | null>(null);
    useEffect(() => {
        let cancelled = false;
        const base = buildSample(account);
        // Market prices make the sample match real candles. If they take longer than
        // 2.5 seconds, the sample shows as built, so the page is never left empty.
        let settled = false;
        const settle = (value: typeof base) => {
            if (cancelled || settled) return;
            settled = true;
            setData(value);
        };
        const timer = setTimeout(() => settle(base), 2500);
        anchorSample(base).then(settle).catch(() => settle(base));
        return () => {
            cancelled = true;
            clearTimeout(timer);
        };
    }, [account]);
    return data;
}

// Built after mount: the dates depend on the visitor's clock, so rendering
// them on the server would not match what the browser draws.
const JournalDemo = ({ look, account, framed }: { look?: Record<string, string>; account?: SampleAccount; framed?: boolean }) => {
    const data = useSample(account);

    if (!data)
        return (
            <div className="mx-auto max-w-6xl" role="status" aria-label="Loading the sample journal">
                <div className="grid h-[86px] grid-cols-4 gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.06]">
                    {Array.from({ length: 4 }, (_, i) => (
                        <span key={i} className="animate-pulse bg-[#0b090e]" />
                    ))}
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-[2.1fr_1fr]">
                    <span className="h-[480px] animate-pulse rounded-[10px] border border-white/10 bg-[#0b090e]" />
                    <span className="h-[480px] animate-pulse rounded-[10px] border border-white/10 bg-[#0b090e]" />
                </div>
            </div>
        );

    return <JournalStudio sample trades={data.trades} positions={data.positions} look={look} framed={framed} />;
};

export default JournalDemo;
