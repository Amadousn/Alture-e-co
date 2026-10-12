// The charts the Introduction is taught on: real, historical Bitcoin candles
// (BTCUSDT perpetual, Bybit), frozen so that every learner sees the same chart
// and every exercise has a known answer. Everything a lesson says about a
// chart (its swings, its zones, which candle is the strongest) is worked out
// here from the candles themselves, and held to account by tests/education.test.mjs.

import { CONTEXTFIVE, CONTEXTHOUR, CONTEXTQUARTER, DAILY, DAILYRECENT, DOWNTREND, FINAL, FIRST, LEVELS, MOVEMENT as MOVES, SIDEWAYS, SIMANEXT, SIMASEEN, SIMBNEXT, SIMBSEEN, SIMCNEXT, SIMCSEEN, UPTREND } from "./education-btc-candles.ts";
import type { Row } from "./education-btc-candles.ts";

export type Candle = { t: number; o: number; h: number; l: number; c: number };
export type Pivot = { i: number; kind: "high" | "low" };
export type Zone = { kind: "support" | "resistance"; from: number; to: number };
export type Timeframe = "5m" | "15m" | "30m" | "1h" | "1d";
export type SceneView = { candles: Candle[]; minutes: number };
export type Scene = {
    id: string;
    // The timeframe the scene opens on, and every timeframe it can be read on.
    timeframe: Timeframe;
    views: Partial<Record<Timeframe, SceneView>>;
    // The swing points that matter, on the opening timeframe: peaks and troughs that stand clear of four candles on each side.
    pivots: Pivot[];
    // Smaller turns inside the moves (two candles each side). Real, but not what the exercises ask for.
    minors: Pivot[];
    zones: Zone[];
    // When these candles traded, e.g. "18 Sep 2026".
    when: string;
};

export const SOURCE = "BTCUSDT perpetual · Bybit";
export const MINUTES: Record<Timeframe, number> = { "5m": 5, "15m": 15, "30m": 30, "1h": 60, "1d": 1440 };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const candles = (rows: Row[]): Candle[] => rows.map(([t, o, h, l, c]) => ({ t, o, h, l, c }));

// The same history cut into bigger slices: `factor` candles become one.
export function aggregate(list: Candle[], factor: number): Candle[] {
    const out: Candle[] = [];
    for (let i = 0; i + factor <= list.length; i += factor) {
        const group = list.slice(i, i + factor);
        out.push({ t: group[0].t, o: group[0].o, c: group[group.length - 1].c, h: Math.max(...group.map((candle) => candle.h)), l: Math.min(...group.map((candle) => candle.l)) });
    }
    return out;
}

// Every swing point of a series: a high (or low) that nothing within `span` candles either side reaches.
export function swings(list: Candle[], span: number): Pivot[] {
    const found: Pivot[] = [];
    for (let i = span; i < list.length - span; i++) {
        const around = list.slice(i - span, i + span + 1).filter((_, k) => k !== span);
        if (around.every((candle) => candle.h < list[i].h)) found.push({ i, kind: "high" });
        if (around.every((candle) => candle.l > list[i].l)) found.push({ i, kind: "low" });
    }
    return found;
}

export const MAJOR = 4;
const MINOR = 2;

function when(list: Candle[], minutes: number) {
    const first = new Date(list[0].t);
    const last = new Date(list[list.length - 1].t + minutes * 60000 - 1);
    const day = (date: Date) => `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
    return first.getUTCDate() === last.getUTCDate() ? `${day(first)} ${first.getUTCFullYear()}` : `${day(first)} to ${day(last)} ${last.getUTCFullYear()}`;
}

function scene(id: string, timeframe: Timeframe, rows: Row[]): Scene {
    const list = candles(rows);
    const pivots = swings(list, MAJOR);
    const major = new Set(pivots.map((pivot) => `${pivot.i}${pivot.kind}`));
    return { id, timeframe, views: { [timeframe]: { candles: list, minutes: MINUTES[timeframe] } }, pivots, minors: swings(list, MINOR).filter((pivot) => !major.has(`${pivot.i}${pivot.kind}`)), zones: [], when: when(list, MINUTES[timeframe]) };
}

export const highsOf = (item: Scene) => item.pivots.filter((pivot) => pivot.kind === "high");
export const lowsOf = (item: Scene) => item.pivots.filter((pivot) => pivot.kind === "low");
const listOf = (item: Scene) => item.views[item.timeframe]!.candles;
const spanOf = (list: Candle[]) => Math.max(...list.map((candle) => candle.h)) - Math.min(...list.map((candle) => candle.l));

// A zone around a group of turns: from the lowest to the highest of them, with a little room.
function zoneAround(item: Scene, kind: "support" | "resistance", points: Pivot[]): Zone {
    const list = listOf(item);
    const values = points.map((pivot) => (kind === "resistance" ? list[pivot.i].h : list[pivot.i].l));
    const room = spanOf(list) * 0.025;
    return { kind, from: Math.round(Math.min(...values) - room), to: Math.round(Math.max(...values) + room) };
}

// ---- Lesson 1: a first chart. Nine hours of 15-minute candles, readable as nine 1-hour candles.
const first = scene("first", "15m", FIRST);
first.views["1h"] = { candles: aggregate(listOf(first), 4), minutes: 60 };

// ---- Lesson 3: under two hours of 5-minute candles in which each kind of candle has one clear example.
const movement = scene("movement", "5m", MOVES);

// ---- Lesson 4: the three things a market can be doing.
const uptrend = scene("uptrend", "15m", UPTREND);
const downtrend = scene("downtrend", "15m", DOWNTREND);
const sideways = scene("sideways", "30m", SIDEWAYS);

// ---- Lesson 5: a market held between a ceiling and a floor.
const levels = scene("levels", "15m", LEVELS);
levels.zones = [zoneAround(levels, "resistance", highsOf(levels)), zoneAround(levels, "support", lowsOf(levels))];

// ---- Lesson 6: one day, read on three timeframes. Falling on 5 minutes, rising on 1 hour.
const context = scene("context", "5m", CONTEXTFIVE);
context.views["15m"] = { candles: candles(CONTEXTQUARTER), minutes: 15 };
context.views["1h"] = { candles: candles(CONTEXTHOUR), minutes: 60 };
context.when = when(candles(CONTEXTHOUR), 60);

// ---- Lesson 7: the chart for the final exercise. It rises in swings, then meets a ceiling twice.
const final = scene("final", "15m", FINAL);
final.zones = [zoneAround(final, "resistance", highsOf(final).slice(-2))];

// ---- Discover: four months of Bitcoin, one candle a day, and the last twelve hours of them on 15 minutes.
const horizon = scene("horizon", "1d", DAILY);
horizon.views["15m"] = { candles: candles(DAILYRECENT), minutes: 15 };

export const SCENES = { first, movement, uptrend, downtrend, sideways, levels, context, final, horizon };
export type SceneId = keyof typeof SCENES;

// ---- What each candle of the movement chart is an example of, found by measuring every candle.
const body = (candle: Candle) => candle.c - candle.o;
export const upperWick = (candle: Candle) => candle.h - Math.max(candle.o, candle.c);
export const lowerWick = (candle: Candle) => Math.min(candle.o, candle.c) - candle.l;
const most = (list: Candle[], measure: (candle: Candle) => number) => list.reduce((best, candle, i) => (measure(candle) > measure(list[best]) ? i : best), 0);

// Runs of buying: three or more bullish candles in a row, each closing higher than the one before.
export function buyingRuns(list: Candle[]): number[][] {
    const runs: number[][] = [];
    let run: number[] = [];
    const end = () => {
        if (run.length >= 3) runs.push(run);
    };
    list.forEach((candle, i) => {
        if (body(candle) > 0 && (run.length === 0 || candle.c > list[run[run.length - 1]].c)) return run.push(i);
        end();
        run = body(candle) > 0 ? [i] : [];
    });
    end();
    return runs;
}

const moves = listOf(movement);
const strongBuy = most(moves, body);
const strongSell = most(moves, (candle) => -body(candle));
const rejection = most(moves, upperWick);
const defended = most(moves, lowerWick);
const runs = buyingRuns(moves);
// A candle already used as an example, or part of a buying run, is not also the example of indecision.
const named = new Set([strongBuy, strongSell, rejection, defended, ...runs.flat()]);
// Indecision: the candle whose body is the smallest part of its range, with a wick on each side.
const indecision = most(moves, (candle) => (named.has(moves.indexOf(candle)) || upperWick(candle) < (candle.h - candle.l) * 0.25 || lowerWick(candle) < (candle.h - candle.l) * 0.25 ? -1 : 1 - Math.abs(body(candle)) / (candle.h - candle.l)));
// The candles of the buying runs, apart from the one that gave back most of its rise.
const momentum = runs.flat().filter((i) => i !== rejection);
export const MOVEMENT = { strongBuy, strongSell, rejection, defended, indecision, runs, momentum };

// ---- Practice: three moments in Bitcoin's history. The learner sees `seen`, decides, and only then is shown `next`.
// What the visible candles were doing, read from their last two swing highs and lows.
export type Reading = "up" | "down" | "sideways";
export function readStructure(list: Candle[]): Reading {
    const pivots = swings(list, MAJOR);
    const last = (kind: "high" | "low") => pivots.filter((pivot) => pivot.kind === kind).slice(-2).map((pivot) => (kind === "high" ? list[pivot.i].h : list[pivot.i].l));
    const [h, l] = [last("high"), last("low")];
    if (h.length < 2 || l.length < 2) return "sideways";
    return h[1] > h[0] && l[1] > l[0] ? "up" : h[1] < h[0] && l[1] < l[0] ? "down" : "sideways";
}
export type Scenario = { id: string; seen: Candle[]; next: Candle[]; when: string; reading: Reading; pivots: Pivot[] };
const scenario = (id: string, seen: Row[], next: Row[]): Scenario => {
    const list = candles(seen);
    return { id, seen: list, next: candles(next), when: when(list, 15), reading: readStructure(list), pivots: swings(list, MAJOR) };
};
export const SCENARIOS: Scenario[] = [scenario("a", SIMASEEN, SIMANEXT), scenario("b", SIMBSEEN, SIMBNEXT), scenario("c", SIMCSEEN, SIMCNEXT)];

