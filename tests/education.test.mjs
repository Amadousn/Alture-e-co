// The Introduction is taught on real, historical Bitcoin candles. Every exercise depends on
// what those candles actually show, so each claim the lessons make is checked here.
import test from "node:test";
import assert from "node:assert/strict";
import { SCENES, SCENARIOS, STYLE_VIEWS, MOVEMENT, MAJOR, swings, aggregate, highsOf, lowsOf, upperWick, lowerWick, buyingRuns, readStructure, suggestion } from "../src/utils/education-chart-data.ts";
import { planIssue, simulate, priceAt, liquidation, stopTooFar, LEVERAGES, compareCapital } from "../src/utils/education-sim.ts";
import * as RAW from "../src/utils/education-btc-candles.ts";
import { LESSONS, STAGES, candlesOf, measure } from "../src/app/components/altur/education/intro/course.ts";

const list = (id) => SCENES[id].views[SCENES[id].timeframe].candles;
const H = (id) => highsOf(SCENES[id]).map((p) => list(id)[p.i].h);
const L = (id) => lowsOf(SCENES[id]).map((p) => list(id)[p.i].l);
const rising = (v) => v.every((x, i) => i === 0 || x > v[i - 1]);
const falling = (v) => v.every((x, i) => i === 0 || x < v[i - 1]);
const span = (c) => Math.max(...c.map((x) => x.h)) - Math.min(...c.map((x) => x.l));
const body = (c) => c.c - c.o;

test("the raw data is real-shaped: well-formed candles, evenly spaced, at Bitcoin prices", () => {
    const minutes = { FIRST: 15, MOVEMENT: 5, UPTREND: 15, DOWNTREND: 15, SIDEWAYS: 30, LEVELS: 15, CONTEXTHOUR: 60, CONTEXTQUARTER: 15, CONTEXTFIVE: 5, FINAL: 15, DAILY: 1440, DAILYRECENT: 15 };
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

// The four-month daily chart is shown, not used for swing exercises, so it is not held to this.
for (const id of Object.keys(SCENES).filter((id) => id !== "horizon")) {
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

test("the journey: six stages, every step has a unique id, and every exercise has an answer", () => {
    assert.deepEqual(STAGES.map((s) => s.id), ["discover", "explore", "understand", "decide", "practice", "review"]);
    assert.deepEqual([...new Set(LESSONS.map((l) => l.stage))], STAGES.map((s) => s.id), "lessons follow the order of the stages");
    assert.equal(LESSONS.filter((l) => l.stage === "decide").length, 7);
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
        if (step.kind === "sort") step.items.forEach((item) => assert.ok(step.categories.includes(item.answer), `${step.id}: ${item.text}`));
        if (step.kind === "compare") step.rounds.forEach((r) => assert.ok(r.answer === 0 || r.answer === 1));
    }
    // Every topic ends with what was learned and its key terms, and no term is defined twice in one recap.
    for (const lesson of LESSONS.filter((l) => !["final", "review"].includes(l.id))) {
        const recap = lesson.steps.at(-1);
        assert.equal(recap.kind, "recap", lesson.id);
        assert.ok(recap.learned.length >= 3 && recap.terms.length >= 3, lesson.id);
        assert.equal(new Set(recap.terms.map((t) => t[0])).size, recap.terms.length, lesson.id);
    }
    // Nothing in the text was left as a broken number.
    assert.ok(!/NaN|undefined|Infinity/.test(JSON.stringify(LESSONS, (k, v) => (typeof v === "function" ? v(0) : v))));
});

test("progress counts what the learner does, not what they read", () => {
    const all = LESSONS.flatMap((l) => l.steps);
    const reading = all.filter((s) => s.kind === "recap" || s.kind === "finish");
    const doing = all.filter((s) => s.kind !== "recap" && s.kind !== "finish");
    assert.ok(reading.length >= 9);
    assert.equal(measure({}).total, doing.length);
    // Opening every recap and the closing page moves nothing.
    const read = measure(Object.fromEntries(reading.map((s) => [s.id, 1])));
    assert.equal(read.steps, 0);
    assert.equal(read.percent, 0);
    assert.deepEqual(read.next, { lesson: 0, step: 0 });
    // Doing everything completes it, whether or not a single recap was opened.
    const did = measure(Object.fromEntries(doing.map((s) => [s.id, 1])));
    assert.ok(did.complete && did.percent === 100 && did.stagesDone === 6 && did.next === null);
});

test("the daily chart is four months of real Bitcoin, built from the 15-minute candles", () => {
    const days = SCENES.horizon.views["1d"].candles, recent = SCENES.horizon.views["15m"].candles;
    assert.ok(days.length >= 100);
    days.forEach((d, i) => { assert.equal(d.t % 86400000, 0); if (i > 0) assert.equal(d.t - days[i - 1].t, 86400000); });
    assert.equal(recent.length, 48);
    assert.equal(recent.at(-1).t + 900000, days.at(-1).t + 86400000, "the 15-minute chart ends where the daily chart ends");
    assert.equal(recent.at(-1).c, days.at(-1).c);
});

// ---------- the simulated trade ----------

const C = (o, h, l, c) => ({ t: 0, o, h, l, c });

test("a plan must have its stop loss and take profit on the right sides of the entry", () => {
    assert.equal(planIssue({ side: "long", entry: 100, stop: 95, target: 110 }), null);
    assert.equal(planIssue({ side: "short", entry: 100, stop: 105, target: 90 }), null);
    assert.match(planIssue({ side: "long", entry: 100, stop: 105, target: 110 }), /stop loss goes below/);
    assert.match(planIssue({ side: "long", entry: 100, stop: 95, target: 99 }), /take profit goes above/);
    assert.match(planIssue({ side: "short", entry: 100, stop: 95, target: 90 }), /stop loss goes above/);
    assert.match(planIssue({ side: "short", entry: 100, stop: 105, target: 101 }), /take profit goes below/);
    assert.match(planIssue({ side: "long", entry: 100, stop: NaN, target: 110 }), /Set an entry/);
});

const P = (plan) => ({ margin: 500, leverage: 1, ...plan });

test("the simulated trade: position, profit, loss and fees follow from the amount, the leverage and the prices", () => {
    // $500 at 4x is a $2,000 position: 20 units at 100. Up 10 is +$200 gross; fees are 0.1% of the value in and out.
    const win = simulate(P({ side: "long", entry: 100, stop: 95, target: 110, leverage: 4 }), 100, [C(100, 104, 99, 103), C(103, 111, 102, 110)], 0.001);
    assert.equal(win.result, "target");
    assert.equal(win.size, 20);
    assert.equal(win.gross, 200);
    assert.ok(Math.abs(win.fees - (100 + 110) * 20 * 0.001) < 1e-9);
    assert.ok(Math.abs(win.net - (200 - 4.2)) < 1e-9);
    assert.ok(Math.abs(win.roi - (200 - 4.2) / 500) < 1e-9);
    assert.equal(win.r, 2);
    assert.equal(win.filledAt, 0);
    assert.ok(win.exitAt > 1 && win.exitAt < 2, "the take profit is met during the second minute");
    assert.equal(win.exit, 110);
    // The same plan, stopped: 20 units down 5 is -$100, plus fees.
    const loss = simulate(P({ side: "long", entry: 100, stop: 95, target: 110, leverage: 4 }), 100, [C(100, 101, 94, 96)], 0.001);
    assert.deepEqual([loss.result, loss.gross, loss.r, loss.exit], ["stop", -100, -1, 95]);
    assert.ok(loss.net < -100);
    // A short profits when price falls.
    const short = simulate(P({ side: "short", entry: 100, stop: 104, target: 92, leverage: 2 }), 100, [C(100, 101, 91, 93)], 0);
    assert.deepEqual([short.result, short.size, short.gross, short.r, short.roi], ["target", 10, 80, 2, 0.16]);
    // The size, and so the result, scales with the leverage; the prices do not.
    const [one, ten] = [1, 10].map((leverage) => simulate(P({ side: "long", entry: 100, stop: 99, target: 102, leverage }), 100, [C(100, 103, 99.5, 102)], 0));
    assert.deepEqual([one.gross, ten.gross, one.exit, ten.exit], [10, 100, 102, 102]);
});

test("the rules of the replay: stop first when a minute reaches both, limit orders wait, an unfinished trade is valued at the last close", () => {
    const both = simulate(P({ side: "long", entry: 100, stop: 95, target: 110 }), 100, [C(100, 112, 94, 105)], 0);
    assert.equal(both.result, "stop");
    const bothShort = simulate(P({ side: "short", entry: 100, stop: 105, target: 90 }), 100, [C(100, 106, 89, 95)], 0);
    assert.equal(bothShort.result, "stop");
    // An entry below the current price is not filled until price trades there.
    const wait = simulate(P({ side: "long", entry: 98, stop: 95, target: 104 }), 100, [C(100, 103, 99, 102), C(102, 102, 97, 99), C(99, 105, 98.5, 104)], 0);
    assert.equal(wait.result, "target");
    assert.ok(wait.filledAt > 1 && wait.filledAt < 2 && wait.exitAt > 2 && wait.exitAt < 3);
    // A minute that fills the order and then falls through the stop loss ends the trade there.
    const fillAndStop = simulate(P({ side: "long", entry: 98, stop: 95, target: 104 }), 100, [C(100, 105, 94, 96)], 0);
    assert.equal(fillAndStop.result, "stop");
    const never = simulate(P({ side: "long", entry: 90, stop: 85, target: 100 }), 100, [C(100, 103, 99, 102)], 0);
    assert.deepEqual([never.result, never.net, never.exit], ["unfilled", 0, null]);
    const open = simulate(P({ side: "long", entry: 100, stop: 95, target: 110, leverage: 4 }), 100, [C(100, 103, 99, 102), C(102, 104, 101, 103)], 0);
    assert.deepEqual([open.result, open.exit, open.gross, open.r, open.exitAt], ["open", 103, 60, 0.6, 2]);
});

test("leverage: the liquidation price, and a stop loss beyond it protects nothing", () => {
    assert.equal(liquidation({ side: "long", entry: 100, leverage: 1 }), null);
    assert.equal(liquidation({ side: "long", entry: 100, leverage: 10 }), 90);
    assert.equal(liquidation({ side: "short", entry: 100, leverage: 20 }), 105);
    assert.equal(liquidation({ side: "short", entry: 100, leverage: 1 }), 200);
    assert.equal(stopTooFar({ side: "long", entry: 100, stop: 92, leverage: 10 }), false);
    assert.equal(stopTooFar({ side: "long", entry: 100, stop: 88, leverage: 10 }), true);
    // At 20x a 5% fall takes the whole margin, before a stop loss set 8% away is reached.
    const gone = simulate(P({ side: "long", entry: 100, stop: 92, target: 120, leverage: 20 }), 100, [C(100, 101, 93, 94)], 0.001);
    assert.deepEqual([gone.result, gone.exit, gone.net, gone.roi, gone.fees], ["liquidated", 95, -500, -1, 0]);
    // The same prices at 5x: liquidation is 20% away, so the stop loss does its work.
    const held = simulate(P({ side: "long", entry: 100, stop: 92, target: 120, leverage: 5 }), 100, [C(100, 101, 91, 94)], 0);
    assert.deepEqual([held.result, held.exit, held.gross], ["stop", 92, -200]);
});

test("the replayed price stays inside each real candle and ends on its close", () => {
    const m = [C(100, 104, 98, 103), C(103, 105, 101, 102)];
    for (const side of ["long", "short", null]) {
        for (let at = 0; at <= 2; at += 0.01) {
            const candle = m[Math.min(1, Math.floor(at))];
            const value = priceAt(m, side, at);
            assert.ok(value >= candle.l - 1e-9 && value <= candle.h + 1e-9, `${side} ${at}`);
        }
        assert.equal(priceAt(m, side, 0), 100);
        assert.equal(priceAt(m, side, 2), 102);
    }
    // A long sees the low before the high; a short the high before the low.
    assert.deepEqual([priceAt(m, "long", 1 / 3), priceAt(m, "long", 2 / 3), priceAt(m, "short", 1 / 3), priceAt(m, "short", 2 / 3)].map((v) => Math.round(v * 1e6) / 1e6), [98, 104, 104, 98]);
});

test("the practice charts are real, hide what came next, and do not all reward the same decision", () => {
    assert.equal(SCENARIOS.length, 8);
    assert.deepEqual([...new Set(SCENARIOS.map((s) => s.asset.ticker))].sort(), ["BTC", "ETH", "SOL"]);
    assert.equal(SCENARIOS[0].id, "guide");
    assert.deepEqual(SCENARIOS.filter((s) => s.guided).map((s) => s.id), ["guide"]);
    const results = [];
    for (const s of SCENARIOS) {
        assert.equal(s.minutes.length, 360, `${s.id}: six hours, one candle a minute`);
        assert.equal(s.minutes[0].t, s.seen.at(-1).t + 900000, `${s.id}: what came next starts right after what was seen`);
        s.minutes.forEach((m, i) => {
            assert.ok(m.h >= Math.max(m.o, m.c) && m.l <= Math.min(m.o, m.c) && m.l > 0, `${s.id} minute ${i}`);
            if (i > 0) assert.equal(m.t - s.minutes[i - 1].t, 60000);
        });
        s.seen.forEach((c, i) => i > 0 && assert.equal(c.t - s.seen[i - 1].t, 900000, `${s.id} seen ${i}`));
        // The first minute opens where the last visible candle closed: an entry at the current price is a real price.
        assert.ok(Math.abs(s.minutes[0].o - s.seen.at(-1).c) / s.seen.at(-1).c < 0.0005, `${s.id}: no gap at the decision`);
        // The 15-minute candles of what came next are the minutes added together.
        assert.equal(s.next.length, 24);
        s.next.forEach((c, k) => {
            const g = s.minutes.slice(k * 15, k * 15 + 15);
            assert.deepEqual([c.o, c.h, c.l, c.c], [g[0].o, Math.max(...g.map((x) => x.h)), Math.min(...g.map((x) => x.l)), g[14].c]);
        });
        assert.ok(["up", "down", "sideways"].includes(s.reading));
        assert.equal(s.reading, readStructure(s.seen));
        const last = s.seen.at(-1).c, sp = Math.max(...s.seen.map((x) => x.h)) - Math.min(...s.seen.map((x) => x.l));
        const long = simulate(P({ side: "long", entry: last, stop: last - sp * 0.2, target: last + sp * 0.4, leverage: 5 }), last, s.minutes);
        const short = simulate(P({ side: "short", entry: last, stop: last + sp * 0.2, target: last - sp * 0.4, leverage: 5 }), last, s.minutes);
        results.push([long.net > 0, short.net > 0]);
    }
    assert.ok(results.some(([l, s]) => l || s), "a trade can win");
    assert.ok(results.some(([l, s]) => !l && !s), "on at least one chart, staying out beats both a long and a short of this kind");
    assert.ok(SCENARIOS.some((s) => s.reading === "sideways"), "one chart has no clear trend");
});

test("the coach: on the first chart the suggested plan reaches its take profit; on others it can lose", () => {
    const outcome = (s) => {
        const plan = suggestion(s);
        return plan ? simulate(P({ side: plan.side, entry: plan.entry, stop: plan.stop, target: plan.target, leverage: 5 }), plan.entry, s.minutes) : null;
    };
    const guide = SCENARIOS[0], plan = suggestion(guide);
    assert.equal(guide.reading, "up");
    assert.equal(plan.side, "long");
    // The stop loss is just beyond the last swing low, and the take profit twice as far away.
    assert.ok(plan.stop < plan.swing && plan.swing - plan.stop < plan.entry * 0.001);
    assert.equal(plan.swing, guide.seen[plan.swingAt].l);
    assert.ok(Math.abs((plan.target - plan.entry) / (plan.entry - plan.stop) - 2) < 0.01);
    const first = outcome(guide);
    assert.equal(first.result, "target");
    assert.ok(first.net > 0 && first.exitAt > 30, "it takes a while, so the replay has something to show");
    // Any leverage the learner can choose leaves the liquidation price beyond that stop loss.
    for (const leverage of LEVERAGES) assert.equal(stopTooFar({ side: plan.side, entry: plan.entry, stop: plan.stop, leverage }), false, `${leverage}x`);
    // The coach is not always right: with the same kind of plan, at least one other chart is stopped out.
    const others = SCENARIOS.slice(1).map(outcome);
    assert.ok(others.some((o) => o && o.result === "stop"), "a suggested plan can lose");
    assert.ok(others.some((o) => o && o.result === "target"), "and can win");
    // A sideways chart has no suggested plan at all.
    SCENARIOS.filter((s) => s.reading === "sideways").forEach((s) => assert.equal(suggestion(s), null));
    // A suggested stop loss always leaves the trade room: at least a quarter of a percent.
    SCENARIOS.map(suggestion).filter(Boolean).forEach((p) => assert.ok(Math.abs(p.entry - p.stop) / p.entry > 0.0025));
});

test("your capital beside a funded account: the split, the fee, and the limits", () => {
    const base = { own: 2000, account: 50000, fee: 300, splitPct: 80, drawdownPct: 10, dailyPct: 5 };
    const win = compareCapital({ ...base, resultPct: 4 });
    assert.deepEqual([win.ownResult, win.ownEnd, win.accountResult, win.share, win.net, win.breached], [80, 2080, 2000, 1600, 1300, false]);
    assert.deepEqual([win.limit, win.daily], [5000, 2500]);
    const loss = compareCapital({ ...base, resultPct: -4 });
    assert.deepEqual([loss.ownResult, loss.share, loss.net, loss.breached, loss.cushion], [-80, 0, -300, false, 3000]);
    const breach = compareCapital({ ...base, resultPct: -10 });
    assert.deepEqual([breach.breached, breach.net, breach.cushion, breach.ownResult], [true, -300, 0, -200]);
    // The lesson's three days: a profit, a loss within the limits, and a day beyond the daily loss limit.
    const days = [2, -2, -6].map((resultPct) => compareCapital({ ...base, resultPct }));
    assert.deepEqual(days.map((d) => [d.ownResult, d.ownEnd, d.accountResult, d.share, d.cushion, d.closedInADay]), [[40, 2040, 1000, 800, 5000, false], [-40, 1960, -1000, 0, 4000, false], [-120, 1880, -3000, 0, 2000, true]]);
});
