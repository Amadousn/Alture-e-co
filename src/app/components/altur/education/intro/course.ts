// The Introduction: "Reading the Chart". Seven lessons, each a short film
// followed by things to do, taught on real historical Bitcoin candles
// (BTCUSDT perpetual, Bybit). Every price and count in the text below is read
// from those candles, never typed in. The lessons stop at reading a chart:
// they say nothing of strategy and recommend no trade.

import { highsOf, lowsOf, lowerWick, MINUTES, MOVEMENT, SCENES, upperWick } from "../../../../../utils/education-chart-data.ts";
import type { Candle, Pivot, SceneId, Timeframe } from "../../../../../utils/education-chart-data.ts";
import type { ChartMark, ChartZone } from "./lesson-chart";
import type { CandlePart, CandleSpec } from "./candle-stage";

export type ChartStage = { kind: "chart"; scene: SceneId; timeframe?: Timeframe; shown?: number; focus?: number[]; marks?: ChartMark[]; path?: boolean; zones?: ChartZone[]; axis?: "price" | "time" };
export type CandleStageSpec = { kind: "candle"; candle: CandleSpec["kind"] } & Omit<CandleSpec, "kind">;
export type Stage = ChartStage | CandleStageSpec;
export type Beat = { caption: string; ms: number; stage: Stage };
export type Option = { label: string; correct?: boolean; feedback: string };
// What the chart shows once a question is settled: the evidence for the answer.
export type Reveal = Pick<ChartStage, "focus" | "marks" | "path" | "zones" | "timeframe">;
export type Round = { stage: Stage; prompt: string; options: Option[]; reveal?: Reveal };

export type Step =
    | { id: string; kind: "film"; title: string; beats: Beat[] }
    | { id: string; kind: "explore"; title: string; prompt: string; stage: Stage; items: { key: string; label: string; text: string }[] }
    // `any`: one of the answers is enough. `minor`: smaller turns of the same kind, which are neither right nor wrong.
    | { id: string; kind: "pick"; title: string; prompt: string; stage: ChartStage; answers: number[]; any?: boolean; minor?: { at: number[]; text: string }; wrong: (index: number) => string; right: string }
    | { id: string; kind: "choice"; title: string; prompt: string; stage: Stage; timeframes?: Timeframe[]; options: Option[]; reveal?: Reveal }
    | { id: string; kind: "rounds"; title: string; rounds: Round[] }
    | { id: string; kind: "ohlc"; title: string; asks: { candle: "bull" | "bear"; part: CandlePart; prompt: string; wrong: string }[] }
    | { id: string; kind: "zone"; title: string; prompt: string; stage: ChartStage; zone: "support" | "resistance"; right: string }
    | { id: string; kind: "summary"; title: string };

export type Lesson = { id: string; title: string; summary: string; steps: Step[] };

export const candlesOf = (scene: SceneId, timeframe?: Timeframe) => {
    const item = SCENES[scene];
    return item.views[timeframe ?? item.timeframe]!;
};
export const timeframeName = (timeframe: Timeframe) => (timeframe === "1h" ? "1-hour candles" : `${MINUTES[timeframe]}-minute candles`);

// ---------- reading the charts ----------

const usd = (value: number) => Math.round(value).toLocaleString("en-US");
const near = (value: number, step = 10) => usd(Math.round(value / step) * step);
const NUMBER = ["no", "one", "two", "three", "four", "five", "six"];
const TIMES = ["never", "once", "twice", "three times", "four times", "five times"];
const cap = (text: string) => text[0].toUpperCase() + text.slice(1);
const each = (count: number, word: "higher" | "lower") => (count === 2 ? `the second ${word} than the first` : `each one ${word} than the one before`);

const list = (scene: SceneId) => candlesOf(scene).candles;
const lastOf = (scene: SceneId) => list(scene).length - 1;
const highs = (scene: SceneId) => highsOf(SCENES[scene]);
const lows = (scene: SceneId) => lowsOf(SCENES[scene]);
const priceAt = (scene: SceneId, pivot: Pivot) => (pivot.kind === "high" ? list(scene)[pivot.i].h : list(scene)[pivot.i].l);
const body = (candle: Candle) => Math.abs(candle.c - candle.o);
const bullish = (candle: Candle) => candle.c >= candle.o;
const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;

const chart = (scene: SceneId, extra: Omit<ChartStage, "kind" | "scene"> = {}): ChartStage => ({ kind: "chart", scene, ...extra });
const marksOf = (pivots: Pivot[], label?: string): ChartMark[] => pivots.map((pivot) => ({ i: pivot.i, kind: pivot.kind, ...(label ? { label } : {}) }));
const zone = (scene: SceneId, kind: "support" | "resistance"): ChartZone => {
    const found = SCENES[scene].zones.find((item) => item.kind === kind)!;
    return { from: found.from, to: found.to, tone: kind, label: kind };
};

// Swing marks with the names traders give them: each high and low is compared with the one before.
function named(scene: SceneId): ChartMark[] {
    const last: { high?: number; low?: number } = {};
    return SCENES[scene].pivots.map((pivot) => {
        const value = priceAt(scene, pivot);
        const before = last[pivot.kind];
        last[pivot.kind] = value;
        const label = before === undefined ? (pivot.kind === "high" ? "High" : "Low") : pivot.kind === "high" ? (value > before ? "HH" : "LH") : value > before ? "HL" : "LL";
        return { i: pivot.i, kind: pivot.kind, label };
    });
}

// What to say when the learner clicks a candle that is not the swing asked for.
function notSwing(scene: SceneId, kind: "high" | "low") {
    const wanted = (kind === "high" ? highs(scene) : lows(scene)).map((pivot) => pivot.i);
    const other = (kind === "high" ? lows(scene) : highs(scene)).map((pivot) => pivot.i);
    return (index: number) => {
        if (other.includes(index)) return kind === "high" ? "That is a swing low: a trough, not a peak. Look for where price stopped rising and turned down." : "That is a swing high: a peak, not a trough. Look for where price stopped falling and turned up.";
        const close = wanted.find((i) => Math.abs(i - index) <= 2);
        if (close !== undefined) return `Close. The swing ${kind} is the one candle whose ${kind} is ${kind === "high" ? "above" : "below"} every candle around it. Look ${close > index ? "to the right" : "to the left"}.`;
        return kind === "high" ? "This candle is in the middle of a move: there are higher highs right beside it. A swing high stands above the candles on both sides." : "This candle is in the middle of a move: there are lower lows right beside it. A swing low sits below the candles on both sides.";
    };
}
// Real charts also turn in small ways. Those are not what the exercise asks for, and are not counted as mistakes.
const minorOf = (scene: SceneId, kind: "high" | "low") => ({
    at: SCENES[scene].minors.filter((pivot) => pivot.kind === kind).map((pivot) => pivot.i),
    text: kind === "high" ? "That is a small turn inside a larger move, so it is not counted as a miss. A swing high here is a peak that stands above the four candles on each side of it." : "That is a small turn inside a larger move, so it is not counted as a miss. A swing low here is a trough that sits below the four candles on each side of it.",
});

// `leg` says which way the surrounding move goes, so that a candle closing against it is pointed out.
const bullOrBear = (scene: SceneId, index: number, leg?: "rise" | "fall"): Round => {
    const bull = bullish(list(scene)[index]);
    const note = leg === "rise" && !bull ? "A bearish candle can appear while price is rising." : leg === "fall" && bull ? "A bullish candle can appear while price is falling." : "";
    return {
        stage: chart(scene, { focus: [index] }),
        prompt: "The highlighted candle: bullish or bearish?",
        options: [
            { label: "Bullish", correct: bull, feedback: bull ? `Yes. It closed above its open. ${note}`.trim() : "It closed below its open, so it is bearish. Compare the open and the close in the line above the chart." },
            { label: "Bearish", correct: !bull, feedback: bull ? "It closed above its open, so it is bullish. Compare the open and the close in the line above the chart." : `Yes. It closed below its open. ${note}`.trim() },
        ],
    };
};
const structure = (text: string, correct: "up" | "down" | "range"): Option[] => [
    { label: "Uptrend", correct: correct === "up", feedback: correct === "up" ? text : "An uptrend needs each peak and each trough to be higher than the one before. Compare the swing highs with each other, then the swing lows." },
    { label: "Downtrend", correct: correct === "down", feedback: correct === "down" ? text : "A downtrend needs each peak and each trough to be lower than the one before. Compare the swing highs with each other, then the swing lows." },
    { label: "Range", correct: correct === "range", feedback: correct === "range" ? text : "In a range the peaks stop at about the same price, and so do the troughs. Here they do not: they step in one direction." },
];

// ---------- lesson 1: the first chart ----------

const first = list("first");
const firstHighs = highs("first");
const firstTop = firstHighs[firstHighs.length - 1];
const firstLow = Math.min(...first.map((candle) => candle.l));
const firstPeak = (n: number) => `About ${near(priceAt("first", firstHighs[n]))}`;
// A candle of the first chart with a body worth looking at, closing the asked way, between two points.
const candleIn = (from: number, to: number, bull: boolean) => {
    const size = [...first.map(body)].sort((a, b) => a - b)[Math.floor(first.length / 2)] * 0.5;
    for (let i = from; i <= to; i++) if (bullish(first[i]) === bull && body(first[i]) >= size) return i;
    return null;
};
const firstLows = lows("first");
const colourRounds = (
    [
        [candleIn(firstLows[1].i + 1, firstHighs[2].i, true), "rise"],
        [candleIn(firstLows[1].i + 1, firstHighs[2].i, false), "rise"],
        [candleIn(firstHighs[1].i + 1, firstLows[1].i, false), "fall"],
        [candleIn(firstHighs[2].i + 1, firstLows[2].i, true), "fall"],
        [lastOf("first"), undefined],
    ] as [number | null, "rise" | "fall" | undefined][]
)
    .filter((round): round is [number, "rise" | "fall" | undefined] => round[0] !== null)
    .map(([index, leg]) => bullOrBear("first", index, leg));

// ---------- lesson 3: one clear example of each kind of candle ----------

const moves = list("movement");
const M = MOVEMENT;
const strong = moves[M.strongBuy];
const sold = moves[M.strongSell];
const rejected = moves[M.rejection];
const defended = moves[M.defended];

// ---------- lesson 4: structure ----------

const upHighs = highs("uptrend");
const upLows = lows("uptrend");
// The pullback asked about: from the second swing high down to the low that follows it.
const pullTop = upHighs[1];
const pullLow = upLows.find((pivot) => pivot.i > pullTop.i)!;
const lowBefore = [...upLows].reverse().find((pivot) => pivot.i < pullTop.i)!;
const between = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, k) => from + k);
const sideHighs = highs("sideways").map((pivot) => priceAt("sideways", pivot));
const sideLows = lows("sideways").map((pivot) => priceAt("sideways", pivot));

// ---------- lesson 5: zones ----------

const levelHighs = highs("levels");
const levelLows = lows("levels");
const levels = list("levels");
const resistance = SCENES.levels.zones.find((item) => item.kind === "resistance")!;
const support = SCENES.levels.zones.find((item) => item.kind === "support")!;
// A moment when price is between the two zones and rising, after each has been tested at least twice.
const middle = (() => {
    const from = Math.max(levelHighs[1].i, levelLows[1].i) + 3;
    const room = resistance.from - support.to;
    for (let i = levels.length - 1; i >= from; i--) {
        const where = (levels[i].c - support.to) / room;
        if (where > 0.3 && where < 0.7 && levels[i].c > levels[i - 3].c) return i;
    }
    return levels.length - 1;
})();
const turnedDown = levelHighs.filter((pivot) => pivot.i < middle).length;
const turnedUp = levelLows.filter((pivot) => pivot.i < middle).length;

// ---------- lesson 6: the same day on three timeframes ----------

const hours = candlesOf("context", "1h").candles;
const fiveCount = list("context").length;
const lastHours = between(hours.length - (fiveCount * 5) / 60, hours.length - 1);
const dayGain = ((hours[hours.length - 1].c - hours[0].o) / hours[0].o) * 100;

// ---------- lesson 7: the final chart ----------

const final = list("final");
const finalLast = final[lastOf("final")];
const finalLows = lows("final").map((pivot) => pivot.i);
const finalZone = SCENES.final.zones[0];
// The candles that reached the zone and gave the move back: a high inside the zone, and an upper wick at least as long as the body.
const rejections = final.map((candle, i) => i).filter((i) => final[i].h >= finalZone.from && upperWick(final[i]) >= body(final[i]));

export const LESSONS: Lesson[] = [
    {
        id: "chart",
        title: "Understanding the chart",
        summary: "What the two scales say, and what one candle is.",
        steps: [
            {
                id: "chart-film",
                kind: "film",
                title: "What a chart is",
                beats: [
                    { caption: `This is Bitcoin on ${SCENES.first.when}. A chart is a record: every price it traded at, in order.`, ms: 4800, stage: chart("first", { shown: Math.round(first.length * 0.6) }) },
                    { caption: "Up and down is price. The scale on the right says how much, in dollars.", ms: 4400, stage: chart("first", { shown: Math.round(first.length * 0.6), axis: "price" }) },
                    { caption: "Left to right is time. The newest candle is always the last one on the right.", ms: 4600, stage: chart("first", { axis: "time", focus: [lastOf("first")] }) },
                    { caption: "Each candle is one slice of time. On this chart, 15 minutes.", ms: 4200, stage: chart("first", { focus: [Math.round(first.length / 2)] }) },
                    { caption: "Change the timeframe and the same history is cut into bigger slices: four of these candles become one.", ms: 5200, stage: chart("first", { timeframe: "1h" }) },
                ],
            },
            {
                id: "chart-explore",
                kind: "explore",
                title: "Find your way around",
                prompt: "Click the price scale, the time scale, any candle, and the newest candle.",
                stage: chart("first"),
                items: [
                    { key: "price", label: "The price scale", text: "Prices rise toward the top. Any point on the chart can be read across to this scale." },
                    { key: "time", label: "The time scale", text: "Time runs from left to right. Each label is when that candle began, in UTC." },
                    { key: "candle", label: "A candle", text: "One candle is everything that happened in one period: here, 15 minutes. Its four prices are in the line above the chart." },
                    { key: "last", label: "The newest candle", text: "The last candle on the right is the most recent. On a live chart it is still moving; these candles are historical, so it is closed." },
                ],
            },
            {
                id: "chart-newest",
                kind: "pick",
                title: "The newest candle",
                prompt: "Click the most recent candle on this chart.",
                stage: chart("first"),
                answers: [lastOf("first")],
                wrong: (index) => `That candle closed ${lastOf("first") - index} ${lastOf("first") - index === 1 ? "candle" : "candles"} ago. Time runs left to right, so the newest is the last one on the right.`,
                right: "Yes. Whatever the timeframe, the newest candle is the last one on the right.",
            },
            {
                id: "chart-highest",
                kind: "choice",
                title: "Read the price scale",
                prompt: "Roughly, what is the highest price Bitcoin reached on this chart?",
                stage: chart("first"),
                reveal: { focus: [firstTop.i], marks: [{ i: firstTop.i, kind: "high", label: usd(priceAt("first", firstTop)) }] },
                options: [
                    { label: firstPeak(0), feedback: "That is the first peak. Find the highest wick on the whole chart, then read across to the scale on the right." },
                    { label: firstPeak(1), feedback: "That is the second peak. There is a higher one further right. Read it across to the scale." },
                    { label: firstPeak(2), correct: true, feedback: `Yes. The highest wick reaches ${usd(priceAt("first", firstTop))}. Select any candle to read its exact high.` },
                    { label: `About ${near(priceAt("first", firstTop) + (priceAt("first", firstTop) - firstLow) * 0.25)}`, feedback: "Price never traded there. The scale shows more room than price used. Find the highest wick and read across." },
                ],
            },
            {
                id: "chart-timeframe",
                kind: "choice",
                title: "Timeframes",
                prompt: "Switch between the two timeframes. How many 15-minute candles make one 1-hour candle?",
                stage: chart("first"),
                timeframes: ["15m", "1h"],
                options: [
                    { label: "2", feedback: "Two 15-minute candles are 30 minutes. Switch timeframes and count how many candles the chart loses." },
                    { label: "4", correct: true, feedback: "Yes. Four 15-minute candles cover the same hour as one 1-hour candle. Nothing is lost: it is the same history, drawn in bigger slices." },
                    { label: "15", feedback: "15 is the number of minutes in each small candle, not how many fit in an hour." },
                    { label: "60", feedback: "60 is the number of minutes in the hour. How many 15-minute periods is that?" },
                ],
            },
        ],
    },
    {
        id: "candles",
        title: "Understanding candlesticks",
        summary: "Open, high, low and close. Body and wicks. Bullish and bearish.",
        steps: [
            {
                id: "candles-film",
                kind: "film",
                title: "The life of one candle",
                beats: [
                    { caption: "Every candle begins at its open: the first price traded in its period.", ms: 3600, stage: { kind: "candle", candle: "bull", progress: 0, ms: 400, show: ["open"] } },
                    { caption: "Price climbs. The highest price it reaches is the high.", ms: 4000, stage: { kind: "candle", candle: "bull", progress: 0.3, ms: 2200, show: ["open", "high"] } },
                    { caption: "It falls back. The lowest price it reaches is the low.", ms: 4000, stage: { kind: "candle", candle: "bull", progress: 0.62, ms: 2200, show: ["open", "high", "low"] } },
                    { caption: "When the period ends, the last price is the close. The candle is finished and will never change.", ms: 4600, stage: { kind: "candle", candle: "bull", progress: 1, ms: 2000, show: ["open", "high", "low", "close"] } },
                    { caption: "The body runs from the open to the close: the ground price kept.", ms: 4000, stage: { kind: "candle", candle: "bull", show: ["open", "close", "body"], focus: "body" } },
                    { caption: "The wicks are prices that were reached, and then given back.", ms: 4000, stage: { kind: "candle", candle: "bull", show: ["high", "low", "upper", "lower"] } },
                    { caption: "Closed above its open: a bullish candle.", ms: 3400, stage: { kind: "candle", candle: "bull", show: ["open", "close"] } },
                    { caption: "Closed below its open: a bearish candle. The open is now at the top of the body.", ms: 4600, stage: { kind: "candle", candle: "bear", ms: 1100, show: ["open", "close"] } },
                ],
            },
            {
                id: "candles-parts",
                kind: "explore",
                title: "Body and wicks",
                prompt: "Click the body, the upper wick and the lower wick.",
                stage: { kind: "candle", candle: "bull" },
                items: [
                    { key: "body", label: "The body", text: "From the open to the close. A long body means price travelled far and stayed there." },
                    { key: "upper", label: "The upper wick", text: "From the top of the body to the high. Price went up there and came back down before the close." },
                    { key: "lower", label: "The lower wick", text: "From the bottom of the body to the low. Price went down there and came back up before the close." },
                ],
            },
            {
                id: "candles-ohlc",
                kind: "ohlc",
                title: "Open, high, low, close",
                asks: [
                    { candle: "bull", part: "high", prompt: "On this bullish candle, select the high.", wrong: "The high is the highest price reached: the very top of the upper wick." },
                    { candle: "bull", part: "low", prompt: "Select the low.", wrong: "The low is the lowest price reached: the very bottom of the lower wick." },
                    { candle: "bull", part: "open", prompt: "Select the open.", wrong: "A bullish candle rises from its open to its close, so the open is the bottom of the body." },
                    { candle: "bull", part: "close", prompt: "Select the close.", wrong: "A bullish candle closes above its open, so the close is the top of the body." },
                    { candle: "bear", part: "open", prompt: "Now a bearish candle. Select the open.", wrong: "A bearish candle falls from its open to its close, so the open is the top of the body." },
                    { candle: "bear", part: "close", prompt: "Select the close.", wrong: "A bearish candle closes below its open, so the close is the bottom of the body." },
                ],
            },
            { id: "candles-colour", kind: "rounds", title: "Bullish or bearish", rounds: colourRounds },
        ],
    },
    {
        id: "movement",
        title: "Reading price movement",
        summary: "What the size of a body and the length of a wick tell you.",
        steps: [
            {
                id: "movement-film",
                kind: "film",
                title: "What a candle says",
                beats: [
                    { caption: "The shape of a candle says what happened inside it. These are 5-minute candles.", ms: 4200, stage: chart("movement") },
                    { caption: "A long body: price travelled far in one direction and held it. Here, buyers.", ms: 4600, stage: chart("movement", { focus: [M.strongBuy] }) },
                    { caption: "A long upper wick: price was pushed up, and pushed back before the close.", ms: 4800, stage: chart("movement", { focus: [M.rejection] }) },
                    { caption: "A tiny body with wicks on both sides: neither side won. Indecision.", ms: 4600, stage: chart("movement", { focus: [M.indecision] }) },
                    { caption: "Several candles closing higher, one after another: momentum.", ms: 4400, stage: chart("movement", { focus: M.runs[0] }) },
                    { caption: "A long lower wick: sellers took price down, and buyers brought it back.", ms: 4800, stage: chart("movement", { focus: [M.defended] }) },
                ],
            },
            {
                id: "movement-strong",
                kind: "pick",
                title: "Strength",
                prompt: "Click the candle where buyers were strongest.",
                stage: chart("movement"),
                answers: [M.strongBuy],
                wrong: (index) => {
                    const candle = moves[index];
                    if (!bullish(candle)) return "That candle closed below its open: sellers finished ahead there. Look for the longest bullish body.";
                    if (upperWick(candle) > body(candle)) return "Look at its close: much of its rise was given back. Strength is a long body, not a long wick.";
                    return "Buyers won that candle, but only by a little. Look for the bullish candle with the longest body.";
                },
                right: `Yes. The longest bullish body on the chart: price rose about $${usd(body(strong))} in one candle and closed near its high.`,
            },
            {
                id: "movement-rejection",
                kind: "pick",
                title: "Rejection",
                prompt: "Click the candle where higher prices were rejected.",
                stage: chart("movement"),
                answers: [M.rejection],
                wrong: (index) => (lowerWick(moves[index]) > upperWick(moves[index]) * 2 && lowerWick(moves[index]) > body(moves[index]) ? "That wick points down: lower prices were rejected there. Look for a long wick pointing up." : index === M.strongSell ? "Sellers won that whole candle, from open to close. A rejection happens inside one candle: price goes up and is pushed back, leaving a long upper wick." : "Look for a long upper wick: a candle that went much higher than where it closed."),
                right: `Yes. Price reached ${usd(rejected.h)} and closed at ${usd(rejected.c)}. Everything above the body was tried and refused.`,
            },
            {
                id: "movement-defended",
                kind: "choice",
                title: "Read one candle",
                prompt: "What happened inside the highlighted candle?",
                stage: chart("movement", { focus: [M.defended] }),
                options: [
                    { label: "Buyers were in control from the open to the close", feedback: "The body is small and the low is far below it. Something happened on the way: read the lower wick." },
                    { label: "Sellers pushed price down, and buyers brought it back before the close", correct: true, feedback: `Yes. The low is ${usd(defended.l)} but the close is ${usd(defended.c)}, almost where it opened. The long lower wick is the fall that did not hold.` },
                    { label: "Nothing: price did not move", feedback: `The open and close are close together, but the low is about $${usd(lowerWick(defended))} below them. Price moved, then came back.` },
                ],
            },
            {
                id: "movement-indecision",
                kind: "choice",
                title: "Read one candle",
                prompt: "And this one?",
                stage: chart("movement", { focus: [M.indecision] }),
                options: [
                    { label: "Buyers in control", feedback: "It closed almost exactly where it opened. Neither side kept any ground." },
                    { label: "Sellers in control", feedback: "It closed almost exactly where it opened. Neither side kept any ground." },
                    { label: "Indecision: neither side won", correct: true, feedback: "Yes. A very small body with a wick on each side. Price went up, went down, and finished where it began." },
                ],
            },
            {
                id: "movement-pressure",
                kind: "choice",
                title: "Buyers or sellers",
                prompt: "In the highlighted candle, who showed more pressure: buyers or sellers?",
                stage: chart("movement", { focus: [M.strongSell] }),
                options: [
                    { label: "Buyers", feedback: `It opened at ${usd(sold.o)} and closed at ${usd(sold.c)}: price fell through the whole candle and stayed down.` },
                    { label: "Sellers", correct: true, feedback: `Yes. A long bearish body that closes near its low: sellers moved price down about $${usd(body(sold))}, and buyers did not bring it back.` },
                    { label: "Neither", feedback: "The body is long and goes one way. Indecision looks like a small body with a wick on each side." },
                ],
            },
            {
                id: "movement-momentum",
                kind: "pick",
                title: "Momentum",
                prompt: "Click a candle that is part of a run of buying momentum.",
                stage: chart("movement"),
                answers: M.momentum,
                any: true,
                wrong: (index) => (!bullish(moves[index]) ? "That candle closed lower. Buying momentum is several bullish candles in a row, each closing higher than the last." : index === M.rejection ? "It closed higher, but most of its rise was given back. Momentum is closes that keep their gains, one after another." : "This candle is not part of a run. Look for three or more bullish candles in a row, each closing higher than the last."),
                right: "Yes. The marked candles are runs of bullish closes, each higher than the one before: buyers kept pressing.",
            },
            {
                id: "movement-next",
                kind: "choice",
                title: "What a candle cannot say",
                prompt: "Buyers brought price back in the highlighted candle. What does that tell you about the next one?",
                stage: chart("movement", { shown: M.defended + 1, focus: [M.defended] }),
                options: [
                    { label: "It will rise", feedback: "It may, but the candle cannot tell you that. It records what happened in its own 5 minutes." },
                    { label: "It will fall", feedback: "It may, but the candle cannot tell you that. It records what happened in its own 5 minutes." },
                    { label: "Nothing certain: it shows buyers defended this price, not what comes next", correct: true, feedback: "Yes. A candle is a record, not a forecast. It shows where buyers stepped in; whether they do so again is not on the chart." },
                ],
            },
        ],
    },
    {
        id: "structure",
        title: "Recognizing market structure",
        summary: "Swing highs and lows, and the three things a market can be doing.",
        steps: [
            {
                id: "structure-film",
                kind: "film",
                title: "Swings, trends and ranges",
                beats: [
                    { caption: "Price does not move in a straight line. It moves in swings.", ms: 4000, stage: chart("uptrend", { shown: upLows[0].i + 4 }) },
                    { caption: "A swing high is a peak: a high with lower highs on both sides.", ms: 4600, stage: chart("uptrend", { shown: upLows[0].i + 4, marks: marksOf([upHighs[0]], "Swing high") }) },
                    { caption: "A swing low is a trough: a low with higher lows on both sides.", ms: 4600, stage: chart("uptrend", { shown: upLows[0].i + 4, marks: [...marksOf([upHighs[0]], "Swing high"), ...marksOf([upLows[0]], "Swing low")] }) },
                    { caption: "Each peak higher than the last, each trough higher than the last: an uptrend.", ms: 5200, stage: chart("uptrend", { marks: named("uptrend"), path: true }) },
                    { caption: "Lower highs and lower lows: a downtrend.", ms: 4800, stage: chart("downtrend", { marks: named("downtrend"), path: true }) },
                    { caption: "Highs that stop at about the same price, and lows that do too: a range.", ms: 5000, stage: chart("sideways", { marks: marksOf(SCENES.sideways.pivots), path: true }) },
                ],
            },
            {
                id: "structure-highs",
                kind: "pick",
                title: "Swing highs",
                prompt: `Click the ${NUMBER[upHighs.length]} swing highs.`,
                stage: chart("uptrend"),
                answers: upHighs.map((pivot) => pivot.i),
                minor: minorOf("uptrend", "high"),
                wrong: notSwing("uptrend", "high"),
                right: `Yes. ${cap(NUMBER[upHighs.length])} peaks, ${each(upHighs.length, "higher")}.`,
            },
            {
                id: "structure-lows",
                kind: "pick",
                title: "Swing lows",
                prompt: `Now click the ${NUMBER[upLows.length]} swing lows.`,
                stage: chart("uptrend"),
                answers: upLows.map((pivot) => pivot.i),
                minor: minorOf("uptrend", "low"),
                wrong: notSwing("uptrend", "low"),
                right: `Yes. ${cap(NUMBER[upLows.length])} troughs, ${each(upLows.length, "higher")}. Higher highs and higher lows: this is an uptrend.`,
            },
            {
                id: "structure-pullback",
                kind: "choice",
                title: "Pullback or reversal",
                prompt: "Since its last high, price has been falling: the highlighted candles. What is happening?",
                stage: chart("uptrend", { shown: pullLow.i + 1, focus: between(pullTop.i + 1, pullLow.i) }),
                reveal: { marks: named("uptrend"), path: true, focus: [] },
                options: [
                    { label: "The uptrend has ended", feedback: `The fall has not gone below the last swing low, near ${near(priceAt("uptrend", lowBefore))}, so nothing on the chart says the uptrend is over.` },
                    { label: "A pullback inside an uptrend", correct: true, feedback: "Yes. An uptrend is made of rises and pullbacks, and this fall is still above the last swing low. It stays an uptrend until price makes a lower low; whether it will is not known yet." },
                    { label: "A range", feedback: "A range needs highs and lows that stop at about the same prices. Here the last high was above the one before it, and so was the last low." },
                ],
            },
            {
                id: "structure-name",
                kind: "rounds",
                title: "Trend or range",
                rounds: [
                    { stage: chart("downtrend"), prompt: "What is this market doing?", reveal: { marks: named("downtrend"), path: true }, options: structure("Yes. Every peak is lower than the last, and every trough is lower too.", "down") },
                    { stage: chart("sideways"), prompt: "And this one?", reveal: { marks: marksOf(SCENES.sideways.pivots), path: true }, options: structure(`Yes. The peaks stop near ${near(mean(sideHighs), 50)} and the troughs near ${near(mean(sideLows), 50)}. Price is moving sideways between them.`, "range") },
                    { stage: chart("first"), prompt: "And this one?", reveal: { marks: named("first"), path: true }, options: structure("Yes. Higher highs and higher lows. The pullbacks do not change that: each one stopped above the last.", "up") },
                ],
            },
        ],
    },
    {
        id: "levels",
        title: "Understanding support and resistance",
        summary: "The areas where price has turned before.",
        steps: [
            {
                id: "levels-film",
                kind: "film",
                title: "Where price turns",
                beats: [
                    { caption: `Price rises to ${usd(priceAt("levels", levelHighs[0]))} and turns down.`, ms: 3800, stage: chart("levels", { shown: levelHighs[0].i + 5, marks: marksOf([levelHighs[0]]) }) },
                    { caption: "Later it comes back to the same area, and turns down again.", ms: 4400, stage: chart("levels", { shown: levelHighs[1].i + 5, marks: marksOf(levelHighs.slice(0, 2)) }) },
                    { caption: "An area where rising price keeps turning down is resistance.", ms: 4800, stage: chart("levels", { zones: [zone("levels", "resistance")], marks: marksOf(levelHighs) }) },
                    { caption: "An area where falling price keeps turning up is support.", ms: 4800, stage: chart("levels", { zones: [zone("levels", "resistance"), zone("levels", "support")], marks: marksOf(levelLows) }) },
                    { caption: `They are zones, not exact lines. Price turned at ${levelHighs.map((pivot) => usd(priceAt("levels", pivot))).join(", then ")}.`, ms: 5400, stage: chart("levels", { zones: [zone("levels", "resistance")], focus: levelHighs.map((pivot) => pivot.i) }) },
                    { caption: "A zone that has held is worth watching. It is not a promise: zones do break.", ms: 5000, stage: chart("levels", { zones: [zone("levels", "resistance"), zone("levels", "support")] }) },
                ],
            },
            {
                id: "levels-resistance",
                kind: "zone",
                title: "Mark resistance",
                prompt: "Click the chart where you would mark resistance.",
                stage: chart("levels"),
                zone: "resistance",
                right: `Yes. Price rose into this area ${TIMES[levelHighs.length]} and turned down each time.`,
            },
            {
                id: "levels-support",
                kind: "zone",
                title: "Mark support",
                prompt: "Now click where you would mark support.",
                stage: chart("levels", { zones: [zone("levels", "resistance")] }),
                zone: "support",
                right: `Yes. Price fell into this area ${TIMES[levelLows.length]} and turned up each time.`,
            },
            {
                id: "levels-relevant",
                kind: "choice",
                title: "Which area matters",
                prompt: `Price is at the highlighted candle, near ${near(levels[middle].c, 50)}, and rising. Which area of the chart matters most now?`,
                stage: chart("levels", { shown: middle + 1, focus: [middle] }),
                reveal: { zones: [zone("levels", "resistance")], focus: [middle, ...levelHighs.filter((pivot) => pivot.i < middle).map((pivot) => pivot.i)] },
                options: [
                    { label: `Around ${near((resistance.from + resistance.to) / 2, 50)}, where price turned down ${TIMES[turnedDown]}`, correct: true, feedback: "Yes. It is the nearest area above price where sellers have appeared before. It is where to watch, not a prediction of what happens there." },
                    { label: `Around ${near((support.from + support.to) / 2, 50)}, where price turned up ${TIMES[turnedUp]}`, feedback: "That area matters if price falls. Price is rising, so the area ahead of it is the one above." },
                    { label: `Around ${near(levels[middle].c, 50)}, where price is now`, feedback: "Price has passed through this level several times without turning. Nothing on the chart marks it as an area." },
                ],
            },
            {
                id: "levels-meaning",
                kind: "choice",
                title: "What a zone tells you",
                prompt: "Price falls back to this support zone once more. What do you know?",
                stage: chart("levels", { zones: [zone("levels", "resistance"), zone("levels", "support")] }),
                options: [
                    { label: "It will turn up again", feedback: "It has before, but that is history, not a rule. A zone can hold many times and then break." },
                    { label: "It will break this time", feedback: "Nothing on the chart says so. A zone that has been tested often is not bound to fail on the next test." },
                    { label: "It is an area to watch: price has reacted here before, and may or may not again", correct: true, feedback: "Yes. Support and resistance show where to pay attention. They do not say what will happen." },
                ],
            },
        ],
    },
    {
        id: "context",
        title: "Reading the broader context",
        summary: "Why the same market looks different on another timeframe.",
        steps: [
            {
                id: "context-film",
                kind: "film",
                title: "Zoom out",
                beats: [
                    { caption: "A 5-minute chart. Lower highs and lower lows: Bitcoin is falling.", ms: 5000, stage: chart("context", { marks: named("context"), path: true }) },
                    { caption: "The same hours on 15-minute candles, with what came before. The fall is only the last part.", ms: 5200, stage: chart("context", { timeframe: "15m" }) },
                    { caption: `On 1-hour candles the day looks different: price is up about ${dayGain.toFixed(1)}% in 24 hours.`, ms: 5000, stage: chart("context", { timeframe: "1h" }) },
                    { caption: `The whole 5-minute downtrend is inside these ${NUMBER[lastHours.length]} candles.`, ms: 4800, stage: chart("context", { timeframe: "1h", focus: lastHours }) },
                    { caption: "Neither chart is wrong. The higher timeframe is the context for the lower one, so read it first.", ms: 5400, stage: chart("context", { timeframe: "1h" }) },
                ],
            },
            {
                id: "context-hour",
                kind: "choice",
                title: "Change the timeframe",
                prompt: "Use the timeframes above the chart. Over the whole day, on the 1-hour chart, what has this market been doing?",
                stage: chart("context"),
                timeframes: ["5m", "15m", "1h"],
                reveal: { timeframe: "1h" },
                options: [
                    { label: "Rising", correct: true, feedback: `Yes. On 1-hour candles price begins near ${near(hours[0].o, 100)} and ends near ${near(hours[hours.length - 1].c, 100)}. The recent fall is small beside that.` },
                    { label: "Falling", feedback: "That is the 5-minute picture. Switch to 1 hour and compare where the chart begins with where it ends." },
                    { label: "Moving sideways", feedback: `Switch to 1 hour: price begins near ${near(hours[0].o, 100)} and ends near ${near(hours[hours.length - 1].c, 100)}. That is not sideways.` },
                ],
            },
            {
                id: "context-meaning",
                kind: "choice",
                title: "Two timeframes, one market",
                prompt: "The 5-minute chart shows a downtrend at the end of a rising day. Which statement is accurate?",
                stage: chart("context", { timeframe: "1h", focus: lastHours }),
                options: [
                    { label: "The 5-minute chart is wrong", feedback: `Both charts show the same trades. The 5-minute chart is correct about the last ${NUMBER[lastHours.length]} hours; it simply shows less of the day.` },
                    { label: "So far, the fall is a pullback within a larger rise", correct: true, feedback: "Yes. That is all the charts say. Whether the rise continues is not something either chart can tell you." },
                    { label: "The day's rise has been undone", feedback: "On 1-hour candles price is still well above where the day's last rally began. The fall may grow into more, but it has not so far." },
                ],
            },
        ],
    },
    {
        id: "final",
        title: "Final chart-reading exercise",
        summary: "One new chart, read from start to finish on your own.",
        steps: [
            {
                id: "final-candle",
                kind: "choice",
                title: "The last candle",
                prompt: "A new chart. Start with the most recent candle: is it bullish or bearish?",
                stage: chart("final", { focus: [lastOf("final")] }),
                options: [
                    { label: "Bullish", correct: bullish(finalLast), feedback: bullish(finalLast) ? "Yes. It closed above its open." : "It closed below its open. Read the open and the close in the line above the chart." },
                    { label: "Bearish", correct: !bullish(finalLast), feedback: !bullish(finalLast) ? "Yes. It closed below its open." : "It closed above its open. Read the open and the close in the line above the chart." },
                ],
            },
            {
                id: "final-low",
                kind: "pick",
                title: "Structure",
                prompt: "Click the most recent swing low.",
                stage: chart("final"),
                answers: [finalLows[finalLows.length - 1]],
                minor: minorOf("final", "low"),
                wrong: (index) => (finalLows.includes(index) ? "That is a swing low, but there is a more recent one further right." : notSwing("final", "low")(index)),
                right: "Yes. The last trough before price went back up to the highs.",
            },
            {
                id: "final-trend",
                kind: "choice",
                title: "Structure",
                prompt: "From the first candle to the last, what has this market been doing?",
                stage: chart("final", { marks: named("final"), path: true }),
                options: structure("Yes. Higher highs and higher lows, although the last two peaks stopped at almost the same price.", "up"),
            },
            {
                id: "final-resistance",
                kind: "zone",
                title: "Zones",
                prompt: "The last two peaks stopped in the same place. Mark that resistance.",
                stage: chart("final"),
                zone: "resistance",
                right: "Yes. Price reached this area twice and turned down both times.",
            },
            {
                id: "final-rejection",
                kind: "pick",
                title: "One candle",
                prompt: "Click a candle that shows higher prices being rejected at that resistance.",
                stage: chart("final", { zones: [zone("final", "resistance")] }),
                answers: rejections,
                any: true,
                wrong: () => "Look inside the zone for a candle with a long upper wick: its high is in the zone, its close well below.",
                right: `Yes. ${rejections.length === 2 ? "Both candles" : "The candles"} that reached the zone left a long upper wick: price was pushed up there and pushed back within the same candle.`,
            },
            {
                id: "final-context",
                kind: "choice",
                title: "Context",
                prompt: "This is a 15-minute chart. Where do you look to understand the bigger picture?",
                stage: chart("final", { zones: [zone("final", "resistance")] }),
                options: [
                    { label: "A lower timeframe, such as 1 minute", feedback: "A lower timeframe shows more detail of less time. Context comes from seeing more time, not less." },
                    { label: "A higher timeframe, such as 1 hour", correct: true, feedback: "Yes. The higher timeframe shows whether this rise is the whole story or a small part of something larger." },
                    { label: "Nowhere: this chart is enough", feedback: `This chart shows ${(final.length * 15) / 60} hours. What happened before them decides how much this rise and this resistance matter.` },
                ],
            },
            { id: "final-summary", kind: "summary", title: "Your reading" },
        ],
    },
];

export const ALL_STEPS = LESSONS.flatMap((lesson) => lesson.steps);
export const TOTAL_STEPS = ALL_STEPS.length;

// How far a learner is, from what they have really completed.
export function measure(done: Record<string, number>) {
    const lessons = LESSONS.map((lesson) => ({ id: lesson.id, done: lesson.steps.filter((step) => done[step.id]).length, total: lesson.steps.length }));
    const steps = lessons.reduce((sum, lesson) => sum + lesson.done, 0);
    // Where to continue: the first step not yet done.
    let next: { lesson: number; step: number } | null = null;
    LESSONS.some((lesson, l) => lesson.steps.some((step, s) => (done[step.id] ? false : ((next = { lesson: l, step: s }), true))));
    return { lessons, steps, total: TOTAL_STEPS, percent: Math.round((steps / TOTAL_STEPS) * 100), lessonsDone: lessons.filter((lesson) => lesson.done === lesson.total).length, next: next as { lesson: number; step: number } | null, complete: steps === TOTAL_STEPS };
}
