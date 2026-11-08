import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultRuleBook, evaluatePre, liveAlarms, readiness, type PreRule } from "../src/utils/rules-engine.ts";

const rule = (over: Partial<PreRule>): PreRule => ({ id: "x", title: "", description: "", check: "manual", mandatory: true, priority: "normal", enabled: true, ...over });
const plan = { direction: "Long" as const, entry: 100, stop: 95, target: 110 };

test("a manual rule is pending until confirmed, and failed if a trade opened without it", () => {
    assert.equal(evaluatePre(rule({}), { plan: null, open: false, candles: null, now: 0 }).state, "pending");
    assert.equal(evaluatePre(rule({}), { plan, open: true, candles: null, now: 0 }).state, "failed");
    assert.equal(evaluatePre(rule({}), { plan, open: true, confirmed: { at: 5 }, candles: null, now: 0 }).state, "confirmed");
    assert.equal(evaluatePre(rule({ mandatory: false }), { plan, open: true, candles: null, now: 0 }).state, "pending");
});

test("risk/reward comes from the plan", () => {
    assert.equal(evaluatePre(rule({ check: "rr", rr: 2 }), { plan, open: false, candles: null, now: 0 }).state, "confirmed");
    assert.equal(evaluatePre(rule({ check: "rr", rr: 3 }), { plan, open: false, candles: null, now: 0 }).state, "not");
});

test("a technical condition is never confirmed without data", () => {
    const r = rule({ check: "condition", condition: { source: "vwap", side: "above", level: 0, timeframe: "15", closes: 1 } });
    assert.equal(evaluatePre(r, { plan, open: false, candles: null, now: 0 }).state, "waiting");
    assert.equal(evaluatePre(r, { plan, open: false, candles: "error", now: 0 }).state, "unavailable");
});

test("readiness needs every mandatory rule confirmed", () => {
    const r = readiness([
        { rule: rule({}), result: { state: "confirmed", detail: "", at: 0 } },
        { rule: rule({ mandatory: false }), result: { state: "pending", detail: "", at: null } },
    ]);
    assert.deepEqual([r.confirmed, r.pending, r.failed, r.ready], [1, 1, 0, true]);
});

test("template live rules follow the trade and mirror for a short", () => {
    const book = defaultRuleBook();
    const t = book.templates.find((x) => x.id === book.active)!;
    const long = liveAlarms(t.live, { instrument: "BTCUSDT", direction: "Long", entry: 100, stop: 95, target: 110 });
    const short = liveAlarms(t.live, { instrument: "BTCUSDT", direction: "Short", entry: 100, stop: 105, target: 90 });
    const stopL = long.find((a) => a.label === "Stop loss reached")!;
    const stopS = short.find((a) => a.label === "Stop loss reached")!;
    assert.deepEqual([stopL.level, stopL.side], [95, "below"]);
    assert.deepEqual([stopS.level, stopS.side], [105, "above"]);
});
