// Run with: node --test tests/
import test from "node:test";
import assert from "node:assert/strict";
import { createFlowEngine, DEFAULT_FLOW_SETTINGS, binFor } from "../src/utils/order-flow.ts";

const MIN = 60000;
let n = 0;
const trade = (t, p, q, side) => ({ id: `t${++n}`, t, p, q, side });
// `count` trades spread evenly through one minute starting at `start`.
const fill = (start, count, price, qty, side) => Array.from({ length: count }, (_, i) => trade(start + Math.floor((i * MIN) / count), typeof price === "function" ? price(i / count) : price, qty, side));
const settings = (over) => ({ ...DEFAULT_FLOW_SETTINGS, ...over });

test("price bins are round steps near 0.01% of price", () => {
    assert.equal(binFor(83000), 10);
    assert.equal(binFor(85), 0.01);
});

test("no trades means no candles, bubbles or signals", () => {
    const snap = createFlowEngine(MIN).snapshot();
    assert.deepEqual([snap.candles.length, snap.bubbles.length, snap.signals.length, snap.since, snap.bubbleThreshold], [0, 0, 0, null, null]);
});

test("candles split aggressive buy and sell volume, and duplicates are ignored", () => {
    const engine = createFlowEngine(MIN);
    const a = trade(10 * MIN + 1000, 100, 2, "Buy");
    engine.ingest([a, trade(10 * MIN + 2000, 101, 1, "Sell"), a]);
    const [candle] = engine.snapshot().candles;
    assert.deepEqual([candle.buy, candle.sell, candle.trades, candle.h, candle.l, candle.c], [200, 101, 2, 101, 100, 101]);
});

test("the candle the stream joined part-way through is not counted as covered", () => {
    const engine = createFlowEngine(MIN);
    engine.ingest([trade(10 * MIN + 30000, 100, 1, "Buy"), trade(11 * MIN + 1000, 100, 1, "Buy"), trade(12 * MIN + 1000, 100, 1, "Buy")]);
    const snap = engine.snapshot();
    assert.deepEqual(snap.candles.map((c) => c.covered), [false, true, true]);
    // Only the closed, fully covered candle is in the CVD run.
    assert.equal(snap.coveredCandles, 1);
});

test("a manual bubble threshold shows only clusters at or above it", () => {
    const engine = createFlowEngine(MIN, settings({ bubbleMinUsd: 5000 }));
    engine.ingest([trade(10 * MIN + 1000, 100, 60, "Buy"), trade(10 * MIN + 2000, 100, 1, "Sell"), trade(10 * MIN + 3000, 105, 10, "Sell")]);
    const { bubbles } = engine.snapshot();
    assert.equal(bubbles.length, 1);
    assert.deepEqual([bubbles[0].side, bubbles[0].notional, bubbles[0].trades], ["Buy", 6000, 1]);
});

test("heavy selling that does not move price is flagged as potential absorption, then confirmed", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 50000, absMinTrades: 25 }));
    engine.ingest(fill(10 * MIN, 30, 100, 1, "Buy"));
    // A minute of one-sided selling at an unchanged price.
    engine.ingest(fill(11 * MIN, 60, 100, 20, "Sell"));
    let [signal] = engine.snapshot().signals;
    assert.equal(signal.kind, "absorption");
    assert.equal(signal.side, "Sell");
    assert.equal(signal.status, "provisional");
    engine.ingest([trade(12 * MIN + 1000, 100.5, 1, "Buy")]);
    [signal] = engine.snapshot().signals;
    assert.equal(signal.status, "confirmed");
});

test("heavy selling that does move price is not absorption", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 50000 }));
    engine.ingest(fill(10 * MIN, 30, 100, 1, "Buy"));
    engine.ingest(fill(11 * MIN, 60, (f) => 100 - f, 20, "Sell"));
    assert.equal(engine.snapshot().signals.length, 0);
});

test("a large candle alone is not absorption without a threshold baseline", () => {
    // Automatic threshold, but the stream is younger than three windows.
    const engine = createFlowEngine(MIN);
    engine.ingest(fill(10 * MIN, 60, 100, 500, "Sell"));
    engine.ingest(fill(11 * MIN, 60, 100, 500, "Sell"));
    assert.equal(engine.snapshot().signals.length, 0);
});

// One covered minute: `buy` and `sell` notional at price 100-ish, with a set high and low.
const minute = (i, { hi, lo, buy, sell, close }) => [
    trade(i * MIN + 1000, lo, 0.0001, "Sell"),
    trade(i * MIN + 2000, hi, 0.0001, "Buy"),
    ...Array.from({ length: 20 }, (_, k) => trade(i * MIN + 3000 + k * 1000, close, buy / close / 20, "Buy")),
    ...Array.from({ length: 20 }, (_, k) => trade(i * MIN + 30000 + k * 1000, close, sell / close / 20, "Sell")),
];

test("a new high on collapsing net buying is flagged as potential buying exhaustion", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 1e12 }));
    engine.ingest([trade(9 * MIN + 30000, 100, 1, "Buy")]);
    engine.ingest(minute(10, { lo: 100, hi: 101, buy: 50000, sell: 10000, close: 100.8 }));
    engine.ingest(minute(11, { lo: 100.6, hi: 102, buy: 60000, sell: 10000, close: 101.8 }));
    engine.ingest(minute(12, { lo: 101.6, hi: 102.2, buy: 20000, sell: 15000, close: 102 }));
    // The signal is raised when the candle closes, that is when the next one starts.
    engine.ingest(minute(13, { lo: 101.2, hi: 102.1, buy: 5000, sell: 30000, close: 101.4 }));
    engine.ingest([trade(14 * MIN + 1000, 101.4, 0.01, "Sell")]);
    const exhaustion = engine.snapshot().signals.filter((s) => s.kind === "exhaustion");
    assert.equal(exhaustion.length, 1);
    assert.deepEqual([exhaustion[0].side, exhaustion[0].t, exhaustion[0].price, exhaustion[0].status], ["Buy", 12 * MIN, 102.2, "confirmed"]);
});

test("a new high on steady net buying is not exhaustion", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 1e12 }));
    engine.ingest([trade(9 * MIN + 30000, 100, 1, "Buy")]);
    engine.ingest(minute(10, { lo: 100, hi: 101, buy: 50000, sell: 10000, close: 100.8 }));
    engine.ingest(minute(11, { lo: 100.6, hi: 102, buy: 60000, sell: 10000, close: 101.8 }));
    engine.ingest(minute(12, { lo: 101.6, hi: 103, buy: 70000, sell: 10000, close: 102.8 }));
    engine.ingest([trade(13 * MIN + 1000, 102.8, 0.01, "Buy")]);
    assert.equal(engine.snapshot().signals.filter((s) => s.kind === "exhaustion").length, 0);
});

// Flat candles around two swing highs; `d` is each candle's net delta.
const swingRun = (deltas, highs) => highs.flatMap((hi, k) => minute(10 + k, { lo: hi - 1, hi, buy: 20000 + Math.max(0, deltas[k]), sell: 20000 + Math.max(0, -deltas[k]), close: hi - 0.5 }));

test("higher price high with lower CVD high is a bearish divergence, drawn from the earlier swing", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 1e12, exhDecline: -1 }));
    engine.ingest([trade(9 * MIN + 30000, 100, 1, "Buy")]);
    //            swing 1 at index 2            swing 2 at index 7 (higher price, CVD lower)
    const highs = [100, 101, 103, 101, 100, 100, 102, 104, 102, 101, 101];
    const deltas = [5000, 5000, 5000, -8000, -8000, -8000, 1000, 1000, -1000, -1000, 0];
    engine.ingest(swingRun(deltas, highs));
    const found = engine.snapshot().signals.filter((s) => s.kind === "divergence" && s.side === "Buy");
    assert.equal(found.length, 1);
    assert.deepEqual([found[0].t, found[0].price, found[0].from.t, found[0].from.price], [17 * MIN, 104, 12 * MIN, 103]);
});

test("higher price high with higher CVD high is confluence, not a divergence", () => {
    const engine = createFlowEngine(MIN, settings({ absMinUsd: 1e12, exhDecline: -1 }));
    engine.ingest([trade(9 * MIN + 30000, 100, 1, "Buy")]);
    const highs = [100, 101, 103, 101, 100, 100, 102, 104, 102, 101, 101];
    const deltas = [5000, 5000, 5000, -1000, -1000, -1000, 9000, 9000, -1000, -1000, 0];
    engine.ingest(swingRun(deltas, highs));
    assert.equal(engine.snapshot().signals.filter((s) => s.kind === "divergence" && s.side === "Buy").length, 0);
});

test("a disconnect breaks coverage: nothing is carried across the gap", () => {
    const engine = createFlowEngine(MIN);
    engine.ingest([trade(9 * MIN + 30000, 100, 1, "Buy"), trade(10 * MIN + 1000, 100, 1, "Buy"), trade(11 * MIN + 1000, 100, 1, "Buy")]);
    assert.equal(engine.snapshot().coveredCandles, 1);
    engine.gap();
    engine.ingest([trade(11 * MIN + 40000, 100, 1, "Buy"), trade(12 * MIN + 1000, 100, 1, "Buy")]);
    const snap = engine.snapshot();
    assert.equal(snap.coveredCandles, 0);
    assert.equal(snap.candles.find((c) => c.t === 11 * MIN).covered, false);
    assert.equal(snap.since, 11 * MIN + 40000);
});
