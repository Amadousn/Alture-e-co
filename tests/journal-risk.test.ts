import { test } from "node:test";
import assert from "node:assert/strict";
import { analyseRisk, riskOf } from "../src/utils/journal-risk.ts";

const at = (d: number, h = 10) => Date.UTC(2026, 9, d, h); // October 2026; the 5th is a Monday
const t = (profitLoss: number, closedAt: number, extra: Record<string, unknown> = {}) => ({ profitLoss, closedAt, entryPrice: 100, quantity: 1, ...extra });

test("worst day and worst week add up the right trades", () => {
    const r = analyseRisk([t(-50, at(5)), t(-70, at(5, 14)), t(30, at(6)), t(-200, at(12)), t(150, at(13))]);
    assert.deepEqual(r.worstDay, { date: "2026-10-12", pnl: -200, trades: 1 });
    // Week of 5 Oct: −90. Week of 12 Oct: −50. The worst is the first.
    assert.deepEqual(r.worstWeek, { date: "2026-10-05", pnl: -90, trades: 3 });
});

test("a profitable period has no worst day", () => {
    assert.equal(analyseRisk([t(10, at(5))]).worstDay, null);
});

test("streaks and the trades taken after two losses", () => {
    const r = analyseRisk([t(-1, at(1)), t(-1, at(2)), t(-1, at(3)), t(5, at(4)), t(-1, at(5)), t(-1, at(6)), t(-3, at(7)), t(2, at(8)), t(2, at(9))]);
    assert.equal(r.longestLosses, 3);
    assert.equal(r.longestWins, 2);
    // After two losses in a row: the 3rd (−1), the 4th (+5), the 7th (−3), the 8th (+2).
    assert.deepEqual(r.afterLosses, { trades: 4, average: 0.75, winRate: 50 });
});

test("busy days are compared with the other days", () => {
    const busyDay = [1, 2, 3, 4, 5].map((h) => t(-20, at(1, h + 8)));
    const r = analyseRisk([...busyDay, t(30, at(2)), t(10, at(3)), t(20, at(4))]);
    assert.deepEqual(r.busyDays, { days: 1, threshold: 4, average: -100, otherDays: 20 });
});

test("risk uses the stop only when there is one", () => {
    assert.equal(riskOf(t(0, 0)), null);
    assert.equal(riskOf(t(0, 0, { stopLoss: 95, quantity: 2 })), 10);
    const r = analyseRisk([t(20, at(1), { stopLoss: 90 }), t(-10, at(2), { stopLoss: 90 }), t(50, at(3))]);
    assert.equal(r.withStop, 2);
    assert.equal(r.averageRisk, 10);
    assert.equal(r.averageR, 0.5); // +2R and −1R
    assert.equal(r.riskSpread, 1);
});

test("rules followed are counted only on trades that recorded it", () => {
    const r = analyseRisk([t(1, at(1), { rulesFollowed: true }), t(1, at(2), { rulesFollowed: false }), t(1, at(3))]);
    assert.deepEqual(r.rules, { trades: 2, followed: 1 });
    assert.equal(analyseRisk([t(1, at(1))]).rules, null);
});
