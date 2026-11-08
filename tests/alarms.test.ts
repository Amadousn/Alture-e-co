import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateRule, rulesForTrade, type AlarmRule } from "../src/utils/alarms.ts";

const M15 = 900_000;
const rule = (over: Partial<AlarmRule> = {}): AlarmRule => ({ id: "r", symbol: "BTCUSDT", kind: "close", side: "below", level: 100, timeframe: "15", closes: 1, label: "", on: true, ...over });
const series = (closes: number[]) => closes.map((c, i) => ({ t: i * M15, c }));
const after = (n: number) => n * M15; // the moment candle n-1 has closed

test("one close beyond the level is a check, once", () => {
    const candles = series([101, 102, 99]);
    const hit = evaluateRule(rule(), candles, 99, after(3));
    assert.equal(hit?.level, "check");
    // The next candle also closes below: no new alarm for the same move.
    assert.equal(evaluateRule(rule(), series([101, 102, 99, 98]), 98, after(4)), null);
});

test("the forming candle never counts, so a wick or open candle is ignored", () => {
    assert.equal(evaluateRule(rule(), series([101, 102, 99]), 99, after(3) - 1), null);
});

test("two closes in a row is an exit signal", () => {
    const r = rule({ closes: 2 });
    assert.equal(evaluateRule(r, series([101, 99, 102]), 102, after(3)), null);
    assert.equal(evaluateRule(r, series([101, 99, 98]), 98, after(3))?.level, "exit");
    assert.equal(evaluateRule(r, series([101, 99, 98, 97]), 97, after(4)), null);
});

test("a price rule on the stop is urgent; a switched-off rule is silent", () => {
    const [entry, stop, target] = rulesForTrade({ instrument: "BTCUSDT", direction: "Long", entry: 100, stop: 95, target: 110 });
    assert.equal(entry.side, "below");
    assert.equal(evaluateRule(stop, [], 94.9, 0)?.level, "exit");
    assert.equal(evaluateRule(stop, [], 96, 0), null);
    assert.equal(evaluateRule(target, [], 110, 0)?.level, "check");
    assert.equal(evaluateRule({ ...stop, on: false }, [], 90, 0), null);
});

test("a short trade watches the other side", () => {
    const [entry, stop] = rulesForTrade({ instrument: "BTCUSDT", direction: "Short", entry: 100, stop: 105, target: 90 });
    assert.equal(entry.side, "above");
    assert.equal(evaluateRule(stop, [], 105.5, 0)?.level, "exit");
});
