import { test } from "node:test";
import assert from "node:assert/strict";
import { computeJournalStats } from "../src/utils/journal-stats.ts";
import { analyse } from "../src/utils/journal-analytics.ts";

const day = (d: number, h = 10) => Date.UTC(2026, 9, d, h);
const trades = [
    { profitLoss: 300, fee: 5, closedAt: day(1) },
    { profitLoss: -100, fee: 5, closedAt: day(1, 15) },
    { profitLoss: -200, fee: 5, closedAt: day(2) },
    { profitLoss: 500, fee: 5, closedAt: day(3) },
    { profitLoss: 0, fee: 5, closedAt: day(4) },
];

test("totals, win rate and averages", () => {
    const s = computeJournalStats(trades);
    assert.equal(s.totalTrades, 5);
    assert.equal(s.wins, 2);
    assert.equal(s.losses, 2);
    assert.equal(s.winRate, 40); // a break-even trade is neither a win nor a loss but counts in the total
    assert.equal(s.totalPnl, 500);
    assert.equal(s.totalFees, 25);
    assert.equal(s.averageWin, 400);
    assert.equal(s.averageLoss, -150);
    assert.equal(s.profitFactor, 800 / 300);
    assert.equal(s.payoffRatio, 400 / 150);
    assert.equal(s.bestTrade, 500);
    assert.equal(s.worstTrade, -200);
    assert.equal(s.expectancy, 100);
});

test("max drawdown is the largest fall from a running peak", () => {
    // Running P&L: 300, 200, 0, 500, 500 → peak 300 then down to 0.
    assert.equal(computeJournalStats(trades).maxDrawdown, 300);
    // Losing from the very start counts from zero.
    assert.equal(computeJournalStats([{ profitLoss: -50, fee: 0, closedAt: day(1) }]).maxDrawdown, 50);
});

test("days are grouped in UTC with a running total", () => {
    const s = computeJournalStats(trades);
    assert.deepEqual(s.daily.map((d) => [d.date, d.trades, d.profitLoss, d.cumulative]), [
        ["2026-10-01", 2, 200, 200],
        ["2026-10-02", 1, -200, 0],
        ["2026-10-03", 1, 500, 500],
        ["2026-10-04", 1, 0, 500],
    ]);
    // 23:30 UTC stays on its own UTC day.
    assert.equal(computeJournalStats([{ profitLoss: 1, fee: 0, closedAt: Date.UTC(2026, 9, 5, 23, 30) }]).daily[0].date, "2026-10-05");
});

test("no trades gives zeros, never NaN", () => {
    const s = computeJournalStats([]);
    assert.equal(s.winRate, 0);
    assert.equal(s.profitFactor, null);
    assert.equal(s.payoffRatio, null);
    assert.equal(s.maxDrawdown, 0);
    assert.equal(s.expectancy, 0);
});

test("analysis splits by side, asset and weekday and agrees with the total", () => {
    const list = [
        { id: "a", instrument: "BTCUSDT", direction: "Long" as const, profitLoss: 300, closedAt: day(1) },
        { id: "b", instrument: "ETHUSDT", direction: "Short" as const, profitLoss: -100, closedAt: day(1, 15) },
        { id: "c", instrument: "BTCUSDT", direction: "Short" as const, profitLoss: -200, closedAt: day(2) },
    ];
    const a = analyse(list, { a: { strategy: "Reversal" }, c: { strategy: "Reversal" } });
    assert.deepEqual(a.direction.map((g) => [g.label, g.trades, g.profitLoss]), [["Long", 1, 300], ["Short", 2, -300]]);
    assert.deepEqual(a.assets.find((g) => g.label === "BTCUSDT")?.profitLoss, 100);
    assert.equal(a.strategies[0].label, "Reversal");
    assert.equal(a.strategies[0].trades, 2);
    // 1 Oct 2026 is a Thursday.
    assert.equal(a.weekdays.find((g) => g.label === "Thu")?.trades, 2);
    assert.equal(a.bestDay?.profitLoss, 200);
    assert.equal(a.worstDay?.profitLoss, -200);
    assert.equal(a.weekdays.reduce((s, g) => s + g.profitLoss, 0), 0);
});
