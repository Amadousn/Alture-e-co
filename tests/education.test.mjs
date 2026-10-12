// The Introduction is taught on real, historical Bitcoin candles. Every exercise depends on
// what those candles actually show, so each claim the lessons make is checked here.
import test from "node:test";
import assert from "node:assert/strict";
import { SCENES, MOVEMENT, MAJOR, swings, aggregate, highsOf, lowsOf, upperWick, lowerWick, buyingRuns } from "../src/utils/education-chart-data.ts";
import * as RAW from "../src/utils/education-btc-candles.ts";
import { LESSONS, candlesOf } from "../src/app/components/altur/education/intro/course.ts";

const list = (id) => SCENES[id].views[SCENES[id].timeframe].candles;
const H = (id) => highsOf(SCENES[id]).map((p) => list(id)[p.i].h);
const L = (id) => lowsOf(SCENES[id]).map((p) => list(id)[p.i].l);
const rising = (v) => v.every((x, i) => i === 0 || x > v[i - 1]);
const falling = (v) => v.every((x, i) => i === 0 || x < v[i - 1]);
const span = (c) => Math.max(...c.map((x) => x.h)) - Math.min(...c.map((x) => x.l));
const body = (c) => c.c - c.o;

test("the raw data is real-shaped: well-formed candles, evenly spaced, at Bitcoin prices", () => {
    const minutes = { FIRST: 15, MOVEMENT: 5, UPTREND: 15, DOWNTREND: 15, SIDEWAYS: 30, LEVELS: 15, CONTEXTHOUR: 60, CONTEXTQUARTER: 15, CONTEXTFIVE: 5, FINAL: 15 };
    for (const [name, step] of Object.entries(minutes)) {
        const rows = RAW[name];
        assert.ok(rows.length >= 22, name);
        rows.forEach(([t, o, h, l, c], i) => {
            assert.ok(h >= Math.max(o, c) && l <= Math.min(o, c) && l > 10000 && h < 500000, `${name} ${i}`);
            assert.equal(t % (step * 60000), 0, `${name} ${i} starts on its timeframe`);
            if (i > 0) assert.equal(t - rows[i - 1][0], step * 60000, `${name} ${i} follows the one before`);
        });
    }
});

for (const id of Object.keys(SCENES)) {
    test(`${id}: its swing points alternate, and each is the extreme of the four candles on either side`, () => {
        const c = list(id);
        const p = SCENES[id].pivots;
        assert.deepEqual(p, swings(c, MAJOR));
        p.forEach((x, k) => k > 0 && assert.notEqual(x.kind, p[k - 1].kind, `${id} pivots ${k - 1} and ${k}`));
        // The smaller turns are kept apart: none of them is also a swing point.
        SCENES[id].minors.forEach((m) => assert.ok(!p.some((x) => x.i === m.i && x.kind === m.kind)));
    });
}

test("every swing point the learner is asked to click stands visibly clear of the candles beside it", () => {
    for (const id of ["uptrend", "final"]) {
        const c = list(id);
        for (const p of SCENES[id].pivots) {
            const around = [1, 2, 3].flatMap((k) => [c[p.i - k], c[p.i + k]]).filter(Boolean);
            const gap = p.kind === "high" ? c[p.i].h - Math.max(...around.map((x) => x.h)) : Math.min(...around.map((x) => x.l)) - c[p.i].l;
            assert.ok(gap >= span(c) * 0.01, `${id} ${p.kind} at ${p.i}: ${(gap / span(c)).toFixed(3)} of the chart`);
        }
    }
});

test("the first chart: three rising peaks, rising troughs, and its highest price is the last peak", () => {
    const c = list("first");
    assert.equal(H("first").length, 3);
    assert.ok(rising(H("first")) && rising(L("first")));
    assert.equal(Math.max(...c.map((x) => x.h)), H("first")[2]);
    // One hour is four 15-minute candles, and it is the same history.
    const hour = SCENES.first.views["1h"].candles;
    assert.equal(hour.length * 4, c.length);
    assert.deepEqual(aggregate(c, 4), hour);
    assert.equal(c[0].t % 3600000, 0);
});

test("the uptrend rises in swings, the downtrend falls in swings", () => {
    assert.ok(H("uptrend").length >= 3 && L("uptrend").length >= 2 && rising(H("uptrend")) && rising(L("uptrend")));
    assert.ok(H("downtrend").length >= 2 && L("downtrend").length >= 2 && falling(H("downtrend")) && falling(L("downtrend")));
    assert.ok(list("downtrend").at(-1).c < list("downtrend")[0].o);
    // The pullback question: the fall after the second peak stays above the swing low before it.
    const c = list("uptrend"), highs = highsOf(SCENES.uptrend), lows = lowsOf(SCENES.uptrend);
    const after = lows.find((p) => p.i > highs[1].i), before = [...lows].reverse().find((p) => p.i < highs[1].i);
    assert.ok(after && before && c[after.i].l > c[before.i].l && c[highs[1].i].h > c[highs[0].i].h);
});

test("the ranges turn at about the same prices, inside their zones", () => {
    for (const id of ["sideways", "levels"]) {
        const s = span(list(id));
        assert.ok(H(id).length >= 2 && L(id).length >= 2);
        assert.ok(Math.max(...H(id)) - Math.min(...H(id)) < s * 0.2 && Math.max(...L(id)) - Math.min(...L(id)) < s * 0.2, id);
        assert.ok(Math.min(...H(id)) > Math.max(...L(id)) + s * 0.4, `${id}: the peaks are well above the troughs`);
    }
    const [res, sup] = SCENES.levels.zones;
    assert.equal(H("levels").length, 3);
    assert.equal(L("levels").length, 3);
    H("levels").forEach((h) => assert.ok(h >= res.from && h <= res.to));
    L("levels").forEach((l) => assert.ok(l >= sup.from && l <= sup.to));
    assert.ok(res.from - sup.to > (res.to - res.from) * 2, "the zones are narrow beside the room between them");
});

test("each kind of candle in the movement chart is the clearest example of its kind", () => {
    const c = list("movement");
    const { strongBuy, strongSell, rejection, defended, indecision, runs, momentum } = MOVEMENT;
    assert.equal(new Set([strongBuy, strongSell, rejection, defended, indecision]).size, 5);
    c.forEach((x, i) => {
        if (i !== strongBuy) assert.ok(body(x) < body(c[strongBuy]) * 0.65, `strongest buying vs ${i}`);
        if (i !== strongSell) assert.ok(-body(x) < -body(c[strongSell]) * 0.7, `strongest selling vs ${i}`);
        if (i !== rejection) assert.ok(upperWick(x) < upperWick(c[rejection]) * 0.7, `rejection vs ${i}`);
        if (i !== defended) assert.ok(lowerWick(x) < lowerWick(c[defended]) * 0.7, `defended vs ${i}`);
    });
    // What the feedback says about them.
    assert.ok(upperWick(c[strongBuy]) < body(c[strongBuy]) * 0.2, "the strong candle closes near its high");
    assert.ok(lowerWick(c[strongSell]) < -body(c[strongSell]) * 0.25, "the selling candle closes near its low");
    assert.ok(upperWick(c[rejection]) > Math.abs(body(c[rejection])) * 1.5 && lowerWick(c[defended]) > Math.abs(body(c[defended])) * 1.5);
    assert.ok(Math.abs(body(c[defended])) < lowerWick(c[defended]) * 0.3, "it closed almost where it opened");
    const doji = c[indecision];
    assert.ok(Math.abs(body(doji)) < (doji.h - doji.l) * 0.15 && upperWick(doji) > (doji.h - doji.l) * 0.25 && lowerWick(doji) > (doji.h - doji.l) * 0.25);
    assert.deepEqual(runs, buyingRuns(c));
    assert.ok(runs.length >= 1 && momentum.length >= 3 && !momentum.includes(rejection));
    runs.forEach((run) => run.forEach((i, k) => assert.ok(body(c[i]) > 0 && (k === 0 || c[i].c > c[run[k - 1]].c))));
});

test("one day on three timeframes: falling on 5 minutes at the end of a day that rose on 1 hour", () => {
    const five = list("context"), quarter = SCENES.context.views["15m"].candles, hour = SCENES.context.views["1h"].candles;
    assert.ok(H("context").length >= 2 && L("context").length >= 2 && falling(H("context")) && falling(L("context")) && five.at(-1).c < five[0].o);
    // All three end at the same moment, and the 5-minute chart is the last hours of the day.
    const end = hour.at(-1).t + 3600000;
    assert.equal(five.at(-1).t + 300000, end);
    assert.equal(quarter.at(-1).t + 900000, end);
    assert.equal(hour.length, 24);
    assert.equal(five[0].t, hour[hour.length - (five.length * 5) / 60].t);
    assert.deepEqual(aggregate(quarter, 4), hour.slice(12));
    // The day rose, and has kept more than half of its rise.
    const low = Math.min(...hour.map((x) => x.l)), high = Math.max(...hour.map((x) => x.h));
    assert.ok(hour.at(-1).c > hour[0].o * 1.02 && (hour.at(-1).c - low) / (high - low) > 0.5);
    // "Price is still well above where the day's last rally began."
    assert.ok(Math.min(...hour.slice(-3).map((x) => x.l)) > Math.min(...hour.slice(8, 20).map((x) => x.l)) * 1.005);
});

test("the final chart: an uptrend whose last two peaks stop in the same zone, both rejected", () => {
    const c = list("final"), zone = SCENES.final.zones[0];
    const highs = highsOf(SCENES.final), lows = lowsOf(SCENES.final);
    assert.ok(rising(L("final")) && rising(H("final").slice(0, -1)) && H("final").length >= 3);
    const [a, b] = highs.slice(-2).map((p) => c[p.i].h);
    assert.ok(a >= zone.from && a <= zone.to && b >= zone.from && b <= zone.to && Math.abs(a - b) < span(c) * 0.03);
    assert.ok(H("final")[0] < zone.from, "the first peak is below the zone");
    // Only the two peaks reach the zone, and each leaves an upper wick at least as long as its body.
    const touching = c.map((x, i) => i).filter((i) => c[i].h >= zone.from);
    assert.deepEqual(touching, highs.slice(-2).map((p) => p.i));
    touching.forEach((i) => assert.ok(upperWick(c[i]) >= Math.abs(body(c[i])) && upperWick(c[i]) > span(c) * 0.08));
    // The most recent swing low is still intact at the end of the chart.
    assert.ok(Math.min(...c.slice(lows.at(-1).i + 1).map((x) => x.l)) > c[lows.at(-1).i].l);
});

test("the lessons: seven of them, every step has a unique id, and every exercise has an answer on its chart", () => {
    assert.equal(LESSONS.length, 7);
    const steps = LESSONS.flatMap((l) => l.steps);
    assert.equal(new Set(steps.map((s) => s.id)).size, steps.length);
    for (const step of steps) {
        if (step.kind === "pick") {
            const n = candlesOf(step.stage.scene).candles.length;
            assert.ok(step.answers.length >= 1 && step.answers.every((i) => i >= 0 && i < (step.stage.shown ?? n)), step.id);
            (step.minor?.at ?? []).forEach((i) => assert.ok(!step.answers.includes(i), step.id));
        }
        const questions = step.kind === "choice" ? [step] : step.kind === "rounds" ? step.rounds : [];
        assert.ok(step.kind !== "rounds" || step.rounds.length >= 3, step.id);
        for (const q of questions) {
            assert.equal(q.options.filter((o) => o.correct).length, 1, `${step.id}: exactly one right answer`);
            assert.equal(new Set(q.options.map((o) => o.label)).size, q.options.length, `${step.id}: distinct options`);
        }
        if (step.kind === "zone") assert.ok(SCENES[step.stage.scene].zones.some((z) => z.kind === step.zone), step.id);
    }
    // Nothing in the text was left as a broken number.
    assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(LESSONS, (k, v) => (typeof v === "function" ? v(0) : v))));
});
