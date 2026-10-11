"use client";

import { useEffect, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import JournalDashboard from "./journal-dashboard";

// Invented trades for the public demo. Each row is
// [months ago, day of month, instrument, direction, entry, exit, quantity, setup].
// Weekdays only, and deliberately uneven: some weeks have two trades, some five.
// Entries and exits sit inside each instrument's real Bybit range for that
// day (taken 2026-10-10), on its real tick and lot size.
const SAMPLE: [number, number, string, "Long" | "Short", number, number, number, "Continuation" | "Reversal"][] = [
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

// Bybit's taker fee on perpetuals, charged on the way in and on the way out.
const TAKER_FEE = 0.00055;
const LEVERAGE = 20;

const cents = (value: number) => Math.round(value * 100) / 100;

function buildSample(): { trades: ClosedTrade[]; positions: OpenPosition[] } {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const trades = SAMPLE.map(([monthsAgo, day, instrument, direction, entryPrice, exitPrice, quantity, setup], i) => {
        // Fees and P&L are worked out from the prices and the quantity, never
        // the other way round, so every figure on a trade agrees with the rest.
        const fee = cents((entryPrice + exitPrice) * quantity * TAKER_FEE);
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
        // The current month only shows days that have already happened.
        .filter((trade) => trade.closedAt <= now.getTime())
        .sort((a, b) => b.closedAt - a.closedAt);
    const positions: OpenPosition[] = [
        { instrument: "BTCUSDT", direction: "Long", entryPrice: 82560, markPrice: 82790, quantity: 3.028, leverage: LEVERAGE, positionSize: cents(82560 * 3.028), unrealisedPnl: cents((82790 - 82560) * 3.028), openedAt: now.getTime() - 3 * 60 * 60 * 1000 },
    ];
    return { trades, positions };
}

// Built after mount: the dates depend on the visitor's clock, so rendering
// them on the server would not match what the browser draws.
const JournalDemo = () => {
    const [data, setData] = useState<{ trades: ClosedTrade[]; positions: OpenPosition[] } | null>(null);

    useEffect(() => {
        setData(buildSample());
    }, []);

    if (!data) return <div className="max-w-6xl mx-auto h-[640px]" />;

    return <JournalDashboard sample env="demo" readOnlyVerified={false} days={90} trades={data.trades} positions={data.positions} />;
};

export default JournalDemo;
