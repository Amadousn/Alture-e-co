// The Volume Profile shown on the product page is computed with the indicator's method.
// These tests hold that calculation to its definitions.
import test from "node:test";
import assert from "node:assert/strict";
import { volumeProfile, PROFILE_DEFAULTS } from "../src/utils/volume-profile.ts";
import { SAMPLE_CANDLES, SAMPLE_LOOKBACK } from "./fixtures/btc-sample.ts";

const candles = SAMPLE_CANDLES.map(([t, o, h, l, c, v]) => ({ t, o, h, l, c, v }));
const window = candles.slice(-SAMPLE_LOOKBACK);
const profile = volumeProfile(window);
const sum = (list) => list.reduce((a, b) => a + b, 0);
const rowOf = (price) => Math.min(PROFILE_DEFAULTS.rows - 1, Math.floor((price - profile.lo) / profile.step));

test("the sample is 90 real candles in order, 15 minutes apart, and well formed", () => {
    assert.equal(candles.length, 90);
    candles.forEach((c, i) => {
        assert.ok(c.h >= Math.max(c.o, c.c) && c.l <= Math.min(c.o, c.c) && c.v > 0);
        if (i > 0) assert.equal(c.t - candles[i - 1].t, 15 * 60 * 1000);
    });
});

test("every unit of volume lands in the histogram, and up volume never exceeds the row", () => {
    assert.ok(Math.abs(sum(profile.rows) - sum(window.map((c) => c.v))) < 1e-6);
    profile.rows.forEach((v, j) => assert.ok(profile.up[j] <= v + 1e-9));
    assert.equal(profile.rows.length, 200);
    assert.equal(profile.hi, Math.max(...window.map((c) => c.h)));
    assert.equal(profile.lo, Math.min(...window.map((c) => c.l)));
});

test("the POC is the row with the most volume and lies inside the value area", () => {
    const peak = profile.rows.indexOf(Math.max(...profile.rows));
    assert.equal(rowOf(profile.poc), peak);
    assert.ok(profile.val < profile.poc && profile.poc < profile.vah);
});

test("the value area holds at least 80% of the volume, and would not without its last row", () => {
    const from = Math.round((profile.val - profile.lo) / profile.step);
    const to = Math.round((profile.vah - profile.lo) / profile.step) - 1;
    const inside = sum(profile.rows.slice(from, to + 1));
    const total = sum(profile.rows);
    assert.ok(inside >= total * 0.8);
    assert.ok(inside - Math.min(profile.rows[from], profile.rows[to]) < total * 0.8);
});

test("high volume nodes are local peaks away from the POC; low volume nodes are valleys between peaks", () => {
    assert.ok(profile.hvn.length >= 1 && profile.hvn.length <= 3 && profile.lvn.length >= 1);
    const biggest = Math.max(...profile.rows);
    profile.hvn.forEach((price) => {
        assert.ok(Math.abs(price - profile.poc) > 10 * profile.step);
        assert.ok(profile.rows[rowOf(price)] > biggest * 0.4);
    });
    profile.lvn.forEach((zone) => {
        assert.ok(zone.to > zone.from && zone.from > profile.lo && zone.to < profile.hi);
        const mid = profile.rows[rowOf((zone.from + zone.to) / 2)];
        assert.ok(mid < biggest * 0.5);
    });
});

test("a single flat candle puts all its volume in one row", () => {
    const flat = volumeProfile([{ t: 0, o: 10, h: 10, l: 10, c: 10, v: 5 }, { t: 1, o: 9, h: 11, l: 9, c: 11, v: 0 }]);
    assert.equal(Math.max(...flat.rows), 5);
});
