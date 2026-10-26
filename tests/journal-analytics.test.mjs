import test from "node:test";
import assert from "node:assert/strict";
import { analyse } from "../src/utils/journal-analytics.ts";

const at = (iso) => Date.parse(iso);
const T = (id, iso, pnl, extra = {}) => ({ id, instrument: "BTCUSDT", direction: "Long", profitLoss: pnl, closedAt: at(iso), ...extra });

test("days, direction, assets and hold time come straight from the trades", () => {
    const trades = [
        T("a", "2026-10-05T10:00:00Z", 100, { openedAt: at("2026-10-05T09:00:00Z") }),
        T("b", "2026-10-05T15:00:00Z", -40, { direction: "Short", openedAt: at("2026-10-05T14:30:00Z") }),
        T("c", "2026-10-06T10:00:00Z", -70, { instrument: "SOLUSDT" }),
    ];
    const a = analyse(trades);
    assert.deepEqual([a.bestDay.label, a.bestDay.profitLoss, a.worstDay.label, a.worstDay.profitLoss, a.tradingDays], ["2026-10-05", 60, "2026-10-06", -70, 2]);
    assert.deepEqual(a.direction.map((d) => [d.label, d.trades, d.profitLoss]), [["Long", 2, 30], ["Short", 1, -40]]);
    assert.deepEqual(a.assets.map((g) => [g.label, g.trades]), [["BTCUSDT", 2], ["SOLUSDT", 1]]);
    // Two trades carry an opening time: one hour and half an hour.
    assert.equal(a.averageHold, 45 * 60000);
    // Hours are read from the opening time when there is one: 09:00, 14:00, and 10:00 for the trade without one.
    assert.deepEqual(a.hours.filter((h) => h.trades).map((h) => h.label), ["09:00", "10:00", "14:00"]);
    // Monday 5 October, Tuesday 6 October.
    assert.deepEqual(a.weekdays.filter((d) => d.trades).map((d) => [d.label, d.profitLoss]), [["Mon", 60], ["Tue", -70]]);
    assert.deepEqual(a.years.map((y) => [y.year, y.months[9].trades, y.months[9].profitLoss]), [[2026, 3, -10]]);
});

test("reviews group the trades by strategy, confluence, tag and rating; a trade counts under each confluence it had", () => {
    const trades = [T("a", "2026-10-05T10:00:00Z", 100), T("b", "2026-10-06T10:00:00Z", -50), T("c", "2026-10-07T10:00:00Z", 30)];
    const reviews = {
        a: { strategy: "Breakout", confluences: ["Liquidity", "Trend"], tags: ["Followed the plan"], rating: 5 },
        b: { strategy: "Breakout", confluences: ["Trend"], tags: ["FOMO"], rating: 2 },
    };
    const a = analyse(trades, reviews);
    assert.deepEqual(a.strategies.map((g) => [g.label, g.trades, g.wins, g.profitLoss]), [["Breakout", 2, 1, 50]]);
    assert.deepEqual(a.confluences.map((g) => [g.label, g.trades, g.winRate]), [["Trend", 2, 50], ["Liquidity", 1, 100]]);
    assert.deepEqual(a.tags.map((g) => [g.label, g.profitLoss]).sort(), [["FOMO", -50], ["Followed the plan", 100]]);
    assert.equal(a.averageRating, 3.5);
    assert.equal(a.reviewed, 2);
    assert.deepEqual(a.ratings.filter((r) => r.trades).map((r) => r.label), ["5", "2"]);
});

test("no trades, no figures", () => {
    const a = analyse([]);
    assert.equal(a.bestDay, null);
    assert.equal(a.averageHold, null);
    assert.equal(a.years.length, 0);
});
