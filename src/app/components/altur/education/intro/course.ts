// The Introduction: one journey in six stages (Discover, Explore, Understand,
// Decide, Practice, Review). Its chart lessons are short films followed by
// things to do, taught on real historical Bitcoin candles
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
    // `stage: null`: a question that needs no chart in front of it.
    | { id: string; kind: "choice"; title: string; prompt: string; stage: Stage | null; timeframes?: Timeframe[]; options: Option[]; reveal?: Reveal }
    | { id: string; kind: "rounds"; title: string; rounds: Round[] }
    | { id: string; kind: "ohlc"; title: string; asks: { candle: "bull" | "bear"; part: CandlePart; prompt: string; wrong: string }[] }
    | { id: string; kind: "zone"; title: string; prompt: string; stage: ChartStage; zone: "support" | "resistance"; right: string }
    | { id: string; kind: "summary"; title: string }
    // Discover, Explore, Understand: concepts met by doing something with them.
    | { id: string; kind: "blocks"; title: string }
    | { id: string; kind: "sort"; title: string; categories: string[]; items: { text: string; answer: string; why: string; hint: string }[] }
    // `hours`: when the market is open in a week: every hour, around the clock on business days, or in exchange sessions on business days.
    | { id: string; kind: "browse"; title: string; prompt: string; note: string; items: { key: string; label: string; example: string; hours: "always" | "weekdays" | "sessions"; facts: [string, string][] }[] }
    | { id: string; kind: "styles"; title: string }
    | { id: string; kind: "calculator"; title: string }
    | { id: string; kind: "compare"; title: string; rounds: { prompt: string; stages: [ChartStage, ChartStage]; answer: 0 | 1; right: string; wrong: string }[] }
    // Practice and Review: a simulated trade on historical candles, its review, and the practice journal.
    | { id: string; kind: "sim"; title: string }
    | { id: string; kind: "simreview"; title: string }
    | { id: string; kind: "journal"; title: string }
    // What a topic covered and the words it introduced. Reading it is not counted as progress.
    | { id: string; kind: "recap"; title: string; learned: string[]; terms: [string, string][] }
    | { id: string; kind: "finish"; title: string };

// The Introduction is one journey in six stages.
export type StageId = "discover" | "explore" | "understand" | "decide" | "practice" | "review";
export const STAGES: { id: StageId; word: string; topic: string; line: string }[] = [
    { id: "discover", word: "Discover", topic: "What is cryptocurrency?", line: "Bitcoin, the blockchain, exchanges and wallets, and what separates investing from active trading." },
    { id: "explore", word: "Explore", topic: "The markets", line: "Cryptocurrency, stocks, forex, indices and options: what each one is, when it trades and what it risks." },
    { id: "understand", word: "Understand", topic: "Your capital, or a firm's", line: "Trading your own money compared with a prop firm's account: what you risk, what you keep, and why rules come first." },
    { id: "decide", word: "Decide", topic: "Read a real chart", line: "Candles, swings, trends, ranges, support and resistance, on real Bitcoin charts." },
    { id: "practice", word: "Practice", topic: "Take a simulated trade", line: "A first trade with a coach, then Bitcoin, Solana and Ethereum on your own: direction, stop loss, take profit and leverage, replayed on real charts." },
    { id: "review", word: "Review", topic: "Understand your decisions", line: "Your practice journal, what you have learned, and where the programme goes from here." },
];

export type Lesson = { id: string; stage: StageId; title: string; summary: string; steps: Step[] };

export const candlesOf = (scene: SceneId, timeframe?: Timeframe) => {
    const item = SCENES[scene];
    return item.views[timeframe ?? item.timeframe]!;
};
export const timeframeName = (timeframe: Timeframe) => (timeframe === "1d" ? "daily candles" : timeframe === "1h" ? "1-hour candles" : `${MINUTES[timeframe]}-minute candles`);

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

const CHART_LESSONS: Omit<Lesson, "stage">[] = [
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
                    { key: "time", label: "The time scale", text: "Time runs from left to right. Each label is when that candle began, in UTC: Coordinated Universal Time, the world's reference clock." },
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
            {
                id: "chart-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["A chart records every price a market traded at, in order.", "Price is read on the vertical scale, time on the horizontal one; the newest candle is the last on the right.", "A timeframe is the length of time each candle covers. Changing it redraws the same history in bigger or smaller slices."],
                terms: [["Chart", "A drawing of a market's price over time."], ["Candle", "Everything price did during one period, drawn as one shape."], ["Timeframe", "How much time one candle covers: 15 minutes, 1 hour, 1 day."], ["UTC", "Coordinated Universal Time, the world's reference clock. Chart times here are given in it."], ["BTC/USDT", "The price of one bitcoin (BTC) in USDT, a token designed to follow the US dollar."], ["Perpetual", "A futures contract with no expiry date, the most traded kind on crypto exchanges."]],
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
            {
                id: "candles-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["Every candle has four prices: the open, the high, the low and the close.", "The body runs from open to close; the wicks are prices that were reached and given back.", "A candle that closes above its open is bullish; one that closes below it is bearish."],
                terms: [["Open", "The first price traded in the candle's period."], ["High", "The highest price reached in the period."], ["Low", "The lowest price reached in the period."], ["Close", "The last price traded in the period."], ["Body", "The part of the candle between the open and the close."], ["Wick", "The thin line above or below the body: prices reached, then given back."], ["Bullish candle", "A candle that closed above its open."], ["Bearish candle", "A candle that closed below its open."]],
            },
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
            {
                id: "movement-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["A long body means one side moved price and kept it.", "A long wick means a price was tried and refused.", "A small body with wicks on both sides means neither side won.", "A candle records what happened. It does not say what happens next."],
                terms: [["Buyers", "Those whose buying pushes price up."], ["Sellers", "Those whose selling pushes price down."], ["Rejection", "A long wick: price went there and was pushed back within the same candle."], ["Momentum", "Several candles closing the same way, one after another."], ["Indecision", "A candle that closes almost where it opened, with wicks on both sides."]],
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
                    { caption: "A peak above the one before is a Higher High (HH); a trough above the one before is a Higher Low (HL). A sequence of them is an uptrend.", ms: 6400, stage: chart("uptrend", { marks: named("uptrend"), path: true }) },
                    { caption: "A downtrend commonly develops the other way: a sequence of Lower Highs (LH) and Lower Lows (LL).", ms: 6000, stage: chart("downtrend", { marks: named("downtrend"), path: true }) },
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
            {
                id: "structure-compare",
                kind: "compare",
                title: "Compare two markets",
                rounds: [
                    { prompt: "Two real Bitcoin charts. Which one is trending?", stages: [chart("sideways"), chart("uptrend")], answer: 1, right: "Yes. Its peaks and troughs step upward; the other chart's peaks and troughs stop at about the same prices.", wrong: "This one moves sideways: its peaks stop at about the same price, and so do its troughs. A trend steps in one direction." },
                    { prompt: "And which of these two is in a range?", stages: [chart("levels"), chart("downtrend")], answer: 0, right: "Yes. It turns down from about the same price and up from about the same price, again and again.", wrong: "This one makes lower highs and lower lows: a downtrend. A range keeps returning to the same two areas." },
                ],
            },
            {
                id: "structure-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["Price moves in swings: peaks called swing highs and troughs called swing lows.", "An uptrend commonly develops through a sequence of higher highs and higher lows.", "A downtrend commonly develops through a sequence of lower highs and lower lows.", "A range is a market whose highs and lows stop at about the same prices.", "A pullback is a move against the trend that has not broken it."],
                terms: [["Swing high", "A peak: a high with lower highs on both sides."], ["Swing low", "A trough: a low with higher lows on both sides."], ["Higher High (HH)", "A swing high above the one before it."], ["Higher Low (HL)", "A swing low above the one before it."], ["Lower High (LH)", "A swing high below the one before it."], ["Lower Low (LL)", "A swing low below the one before it."], ["Uptrend", "A sequence of higher highs and higher lows."], ["Downtrend", "A sequence of lower highs and lower lows."], ["Range", "Price moving sideways between about the same high and low."], ["Pullback", "A move against the trend that stays within it."], ["Market structure", "The pattern that a market's swings make."]],
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
                id: "levels-touches",
                kind: "pick",
                title: "How price reacts",
                prompt: `Click the ${NUMBER[levelHighs.length]} candles where price reached resistance and turned down.`,
                stage: chart("levels", { zones: [zone("levels", "resistance")] }),
                answers: levelHighs.map((pivot) => pivot.i),
                minor: minorOf("levels", "high"),
                wrong: (index) => (levels[index].h < resistance.from ? "That candle did not reach the resistance zone. Look for candles whose high is inside the shaded area." : "That candle is in the zone, but it is not where price turned: the swing high is the highest candle of each visit."),
                right: `Yes. ${cap(TIMES[levelHighs.length])} price rose into the zone, and each time the next candles went lower.`,
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
            {
                id: "levels-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["Support is an area where falling price has turned up before; resistance is one where rising price has turned down.", "They are zones, not exact lines.", "A zone shows where to pay attention. It does not say what will happen there."],
                terms: [["Support", "An area where falling price has repeatedly turned up."], ["Resistance", "An area where rising price has repeatedly turned down."], ["Zone", "A band of prices, not one exact price."], ["Break", "Price moving through a zone that used to hold."]],
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
                    { caption: "A 5-minute chart. Lower Highs (LH) and Lower Lows (LL): Bitcoin is falling.", ms: 5200, stage: chart("context", { marks: named("context"), path: true }) },
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
            {
                id: "context-recap",
                kind: "recap",
                title: "What you've learned",
                learned: ["The same market can be falling on one timeframe and rising on another.", "The higher timeframe is the context for the lower one, so it is read first.", "A chart describes what has happened. It cannot say whether a move will continue."],
                terms: [["Higher timeframe", "A chart with longer candles, showing more history at once."], ["Lower timeframe", "A chart with shorter candles, showing more detail of less time."], ["Context", "What the larger picture was doing when the smaller one happened."]],
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

// ---------- Discover ----------

const days = candlesOf("horizon").candles;
const dayLow = Math.min(...days.map((candle) => candle.l));
const dayHigh = Math.max(...days.map((candle) => candle.h));

const CRYPTO: Lesson = {
    id: "crypto",
    stage: "discover",
    title: "What is cryptocurrency?",
    summary: "Bitcoin, the blockchain, exchanges and wallets, investing and trading.",
    steps: [
        {
            id: "crypto-film",
            kind: "film",
            title: "Bitcoin",
            beats: [
                { caption: "A cryptocurrency is digital money that no bank or government issues. Bitcoin was the first.", ms: 5200, stage: chart("horizon", { shown: Math.round(days.length * 0.35) }) },
                { caption: "It has a price because people buy and sell it, every hour of every day. On markets it is written BTC.", ms: 5600, stage: chart("horizon", { shown: Math.round(days.length * 0.7) }) },
                { caption: `This is real: Bitcoin from ${SCENES.horizon.when}. Each candle is one day of trading.`, ms: 5400, stage: chart("horizon") },
                { caption: `In those four months it traded as low as about ${near(dayLow, 100)} dollars and as high as about ${near(dayHigh, 100)}. Prices move a lot.`, ms: 6000, stage: chart("horizon", { axis: "price" }) },
                { caption: "BTC/USDT is the price of one bitcoin in USDT, a token designed to follow the US dollar. It is the market used throughout this Introduction.", ms: 6600, stage: chart("horizon", { focus: [days.length - 1] }) },
            ],
        },
        { id: "crypto-blocks", kind: "blocks", title: "The blockchain" },
        {
            id: "crypto-custody",
            kind: "sort",
            title: "Exchange or wallet",
            categories: ["Exchange", "Wallet"],
            items: [
                { text: "A marketplace where people buy and sell cryptocurrency with each other.", answer: "Exchange", why: "An exchange matches buyers with sellers and shows the price they agree on.", hint: "Think of where a price comes from: buyers meeting sellers." },
                { text: "It holds the private keys: the secret that lets you spend your coins.", answer: "Wallet", why: "A wallet does not hold coins; it holds the keys that control them on the blockchain.", hint: "Coins stay on the blockchain. What you keep is the secret that controls them." },
                { text: "The company keeps your coins for you, as a bank keeps deposits.", answer: "Exchange", why: "Coins left on an exchange are held by the exchange. If it fails or is hacked, they can be lost.", hint: "Who holds the keys here: you, or a company?" },
                { text: "Lose its recovery phrase, and nobody can restore your access.", answer: "Wallet", why: "With your own wallet there is no company to ask. Control and responsibility are both yours.", hint: "There is no support desk in this case." },
                { text: "It shows a live price and a list of orders waiting to trade.", answer: "Exchange", why: "The list of waiting buy and sell orders is the order book, and it lives on an exchange.", hint: "Orders waiting to trade belong to a marketplace." },
            ],
        },
        {
            id: "crypto-horizon",
            kind: "choice",
            title: "Two ways to look at Bitcoin",
            prompt: "Switch between the two charts of the same Bitcoin. Which one does an active trader work from, to decide what to do in the next few hours?",
            stage: chart("horizon"),
            timeframes: ["1d", "15m"],
            reveal: { timeframe: "15m" },
            options: [
                { label: "The daily chart: four months, one candle a day", feedback: "On the daily chart each candle is already a whole day. It is the view of an investor, who holds for months or years and has little use for the detail of one afternoon." },
                { label: "The 15-minute chart: twelve hours, one candle every 15 minutes", correct: true, feedback: "Yes. Active trading means opening and closing positions over hours or days, so it is read on short candles. An investor, holding for months or years, reads the daily chart instead." },
            ],
        },
        {
            id: "crypto-style",
            kind: "sort",
            title: "Investing or active trading",
            categories: ["Investing", "Active trading"],
            items: [
                { text: "Buys and holds for months or years.", answer: "Investing", why: "Investing is about where the price will be far in the future, so the holding period is long.", hint: "Look at the length of time." },
                { text: "Opens and closes positions within hours or days.", answer: "Active trading", why: "Active trading looks for shorter moves, and does not need the price to rise over years.", hint: "Look at the length of time." },
                { text: "Decides in advance the price at which the idea is wrong, and exits there.", answer: "Active trading", why: "A trade is planned with its exit. That exit is called a stop loss, and you will place one later in this Introduction.", hint: "This describes a planned exit from a short-term position." },
                { text: "Is little concerned by what price does this afternoon.", answer: "Investing", why: "Over years, one afternoon is noise. Over hours, it is everything.", hint: "For whom is one afternoon unimportant?" },
            ],
        },
        { id: "crypto-traders", kind: "styles", title: "Five ways to hold Bitcoin" },
        {
            id: "crypto-recap",
            kind: "recap",
            title: "What you've learned",
            learned: ["A cryptocurrency is digital money issued by no bank or government; Bitcoin was the first.", "A blockchain is a shared record of transactions in which each block is tied to the one before, so the past cannot be quietly rewritten.", "An exchange is where cryptocurrency is bought and sold; a wallet holds the keys that control it.", "Investing means buying to hold for many months or for years. Active trading means opening and closing positions, and the styles differ by how long they hold: a scalper for seconds to a couple of hours, a day trader for hours, a swing trader for days or weeks, a position trader for weeks or months.", "No style is better than the others. Each asks for a different amount of time and a different kind of patience."],
            terms: [["Cryptocurrency", "Digital money recorded on a blockchain, issued by no bank or government."], ["Bitcoin (BTC)", "The first and largest cryptocurrency."], ["Blockchain", "A shared record of transactions, kept as a chain of blocks."], ["Block", "A group of transactions added to the record together."], ["Exchange", "A marketplace where buyers and sellers trade."], ["Wallet", "What holds the private keys that control your coins."], ["Private key", "The secret that proves coins are yours to spend."], ["USDT", "A token designed to follow the US dollar, used to price other cryptocurrencies."], ["Investing", "Buying to hold for many months or for years."], ["Active trading", "Opening and closing positions to profit from shorter moves."], ["Scalper", "A trader who captures short-term moves, holding for seconds or minutes and sometimes up to about two hours."], ["Day trader", "A trader who opens and closes within the day."], ["Swing trader", "A trader who holds for days to weeks."], ["Position trader", "A trader who holds for weeks to months."]],
        },
    ],
};

// ---------- Explore ----------

const MARKETS: Lesson = {
    id: "markets",
    stage: "explore",
    title: "The markets",
    summary: "Cryptocurrency, stocks, forex, indices and options, side by side.",
    steps: [
        {
            id: "markets-browse",
            kind: "browse",
            title: "Five markets",
            prompt: "Five markets, one week. See when each one is open, then open each to compare what you hold and what can go wrong.",
            note: "A summary for comparing markets, not a full description. Hours, products and rules vary by exchange, broker and country.",
            items: [
                { key: "crypto", label: "Cryptocurrency", example: "BTC/USDT: the price of one bitcoin in USDT.", hours: "always", facts: [["What it is", "Digital assets such as Bitcoin, recorded on a blockchain."], ["How it is traded", "On crypto exchanges, either directly or through contracts such as perpetual futures."], ["When it trades", "Every hour of every day, weekends included."], ["Main risks", "Large and fast price moves. An exchange can fail or be hacked. Leverage, where it is used, multiplies losses."]] },
                { key: "stocks", label: "Stocks", example: "AAPL: one share of Apple.", hours: "sessions", facts: [["What it is", "Shares: small parts of the ownership of a company."], ["How it is traded", "On stock exchanges, through a broker."], ["When it trades", "In exchange hours on business days. The main US session runs from 9:30 to 16:00, New York time."], ["Main risks", "A company can do badly or fail. Prices can jump between one day's close and the next day's open."]] },
                { key: "forex", label: "Forex", example: "EUR/USD: the price of one euro in US dollars.", hours: "weekdays", facts: [["What it is", "Currencies, always traded in pairs: one currency priced in another."], ["How it is traded", "Through banks and brokers. There is no single central exchange."], ["When it trades", "Around the clock from Monday to Friday. Closed at weekends."], ["Main risks", "It is usually traded with high leverage, so small moves cause large gains and losses. Central bank decisions can move prices sharply."]] },
                { key: "indices", label: "Indices", example: "The S&P 500: about 500 large US companies in one number.", hours: "weekdays", facts: [["What it is", "A number that tracks a group of stocks."], ["How it is traded", "An index cannot be bought itself. It is traded through products built on it: funds, futures and other derivatives. Trading an index derivative does not mean owning the underlying stocks."], ["When it trades", "It depends on the product. Index futures trade nearly around the clock on business days; the stocks themselves only in exchange hours."], ["Main risks", "The whole market can fall together. Derivatives on an index add leverage, and some can lose more than the amount put in."]] },
                { key: "options", label: "Options", example: "The right to buy a share at $100 until Friday.", hours: "sessions", facts: [["What it is", "A contract, not an asset. An option gives the right, but not the obligation, to buy or sell something at a set price until a set date. Options are derivatives: their value is derived from another asset."], ["How it is traded", "On options exchanges, through a broker that has approved the account for options."], ["When it trades", "In the hours of its exchange. Every option has an expiry date."], ["Main risks", "An option that was bought can expire worthless, losing everything paid for it. Selling options can lose far more than was received. Their price depends on time and volatility, not only on direction."]] },
            ],
        },
        {
            id: "markets-which",
            kind: "sort",
            title: "Which market?",
            categories: ["Cryptocurrency", "Stocks", "Forex", "Indices", "Options"],
            items: [
                { text: "EUR/USD", answer: "Forex", why: "A currency pair: the price of one euro in US dollars.", hint: "Two currencies, one priced in the other." },
                { text: "A share of a company, such as Apple (AAPL)", answer: "Stocks", why: "A share is a small part of the ownership of one company.", hint: "This is ownership of one company." },
                { text: "BTC/USDT", answer: "Cryptocurrency", why: "The price of one bitcoin in USDT.", hint: "BTC is Bitcoin's ticker." },
                { text: "The S&P 500", answer: "Indices", why: "A number that tracks about 500 large US companies.", hint: "It is not one company, and it cannot be bought itself." },
                { text: "The right to buy a share at $100 until Friday", answer: "Options", why: "A right with a set price and an expiry date is an option.", hint: "A right, a set price and a date: this is a contract." },
                { text: "A market that is open at 3 a.m. on a Sunday", answer: "Cryptocurrency", why: "Crypto trades every hour of every day. Stock exchanges and forex are closed at weekends.", hint: "Which of the five never closes?" },
            ],
        },
        {
            id: "markets-index",
            kind: "choice",
            title: "What you own",
            prompt: "You buy a derivative on the S&P 500 index. What do you own?",
            stage: null,
            options: [
                { label: "A small part of each of the 500 companies", feedback: "That would be owning the shares themselves. A derivative on the index is a contract about the index's value." },
                { label: "A contract whose value follows the index, not the companies' shares", correct: true, feedback: "Yes. A derivative's value is derived from something else. You hold a contract; you are not a shareholder of any of the companies." },
                { label: "The index itself", feedback: "An index is a number, a calculation. It cannot be owned; only products built on it can be traded." },
            ],
        },
        {
            id: "markets-option",
            kind: "choice",
            title: "A risk particular to options",
            prompt: "You buy an option. Its expiry date arrives and the price is on the wrong side of it. What happens?",
            stage: null,
            options: [
                { label: "You get your money back", feedback: "The price paid for an option is not refunded. It bought a right for a limited time, and that time has run out." },
                { label: "It expires worthless: you lose what you paid for it", correct: true, feedback: "Yes. An option has an expiry date, which a share or a bitcoin does not. Being right too late is the same as being wrong." },
                { label: "It turns into shares that you can keep", feedback: "An option on the wrong side at expiry is not exercised. Nothing is delivered; the contract simply ends." },
            ],
        },
        {
            id: "markets-recap",
            kind: "recap",
            title: "What you've learned",
            learned: ["Stocks are parts of a company; forex is one currency priced in another; an index is a number tracking a group of stocks; options are contracts with an expiry date.", "Crypto trades every hour of every day; most other markets close at night or at weekends.", "Each market has its own risks. Derivatives and leverage add risks that the underlying asset does not have.", "Trading a derivative on something is not the same as owning it."],
            terms: [["Stock (share)", "A small part of the ownership of a company."], ["Forex", "The market where currencies are traded against each other."], ["Currency pair", "One currency priced in another, such as EUR/USD."], ["Index", "A number that tracks a group of stocks."], ["Derivative", "A contract whose value is derived from another asset."], ["Option", "The right, but not the obligation, to buy or sell at a set price until a set date."], ["Expiry", "The date on which a contract ends."], ["Leverage", "Trading a position larger than the money put in, which multiplies gains and losses."], ["Broker", "A firm through which you access a market."]],
        },
    ],
};

// ---------- Understand ----------

const CAPITAL: Lesson = {
    id: "capital",
    stage: "understand",
    title: "Your capital, or a firm's",
    summary: "Personal trading capital compared with a funded-trader programme.",
    steps: [
        { id: "capital-calculator", kind: "calculator", title: "Two ways to trade" },
        {
            id: "capital-sides",
            kind: "sort",
            title: "A prop firm: for and against",
            categories: ["Advantage", "Disadvantage"],
            items: [
                { text: "A losing trade is a loss on the firm's account, not on your savings.", answer: "Advantage", why: "Your own trading capital is not on the line. The most you can lose is the fee you paid.", hint: "Ask whose money is lost when a trade goes wrong." },
                { text: "You pay a fee before you trade, and it is gone if you fail.", answer: "Disadvantage", why: "The evaluation is paid for first. Fail it, or break a rule later, and the fee is lost.", hint: "Here money leaves your pocket before any trade is taken." },
                { text: "You can trade a larger account than your own savings would allow.", answer: "Advantage", why: "The size is the firm's money. It is an allowance to trade, never money you own.", hint: "Compare $2,000 of your own with a $50,000 account." },
                { text: "The rules are strict: one day beyond the daily loss limit, and the account is closed.", answer: "Disadvantage", why: "The rules apply at once and to everyone. One emotional mistake can end the account.", hint: "Ask what a single bad decision costs here." },
                { text: "You keep only a share of the profit.", answer: "Disadvantage", why: "The firm keeps the rest. With your own capital, all of the profit is yours.", hint: "Compare it with keeping everything." },
            ],
        },
        {
            id: "capital-split",
            kind: "choice",
            title: "The profit split",
            prompt: "Hypothetical example: a funded account of $50,000 makes a profit of $2,000, with an 80% profit split. What does the trader receive?",
            stage: null,
            options: [
                { label: "$2,000", feedback: "That is the whole profit. The firm keeps its part: here, 20%." },
                { label: "$1,600", correct: true, feedback: "Yes. 80% of $2,000 is $1,600, and the firm keeps $400. Any fee paid to enter the programme has to be earned back out of that." },
                { label: "$40,000", feedback: "That is 80% of the account size. The split applies to the profit, not to the account." },
            ],
        },
        {
            id: "capital-size",
            kind: "choice",
            title: "The advertised account",
            prompt: "A programme advertises a $50,000 funded account. How much of that $50,000 belongs to the trader?",
            stage: null,
            options: [
                { label: "All of it", feedback: "The account is the firm's. The figure is the size the trader is allowed to trade, not money they own." },
                { label: "Half of it", feedback: "No part of the account is the trader's. Only a share of the profits can ever reach them." },
                { label: "None of it: it is the firm's account. The trader can receive only their share of profits, if the rules are kept", correct: true, feedback: "Yes. The advertised size is trading allowance, not ownership. What a trader can withdraw is their share of profits, under the programme's rules." },
            ],
        },
        {
            id: "capital-daily",
            kind: "choice",
            title: "Two loss limits",
            prompt: "Hypothetical example: the rules set a daily loss limit of 5% and a maximum drawdown of 10%. In one day the account loses 6%. What happens?",
            stage: null,
            options: [
                { label: "Nothing: the 10% maximum has not been reached", feedback: "The two limits apply separately. Breaking either one is enough." },
                { label: "The daily limit is broken, so the account is closed", correct: true, feedback: "Yes. The daily loss limit is a rule of its own. In this example the account ends there, even though the total loss is still under the maximum drawdown." },
                { label: "The trader must repay the 6%", feedback: "In this example the loss is on the firm's account. What the trader loses is the account itself, and the fee paid to obtain it." },
            ],
        },
        {
            id: "capital-own",
            kind: "choice",
            title: "Your own capital",
            prompt: "With $2,000 of your own money, you lose 10%. What has it cost you?",
            stage: null,
            options: [
                { label: "Nothing: losses are absorbed", feedback: "That is how a funded account treats losses. With your own capital, every loss is yours." },
                { label: "$200 of your own money", correct: true, feedback: "Yes. 10% of $2,000 is $200. Nobody shares your profit, and nobody shares your loss." },
                { label: "$2,000", feedback: "A 10% loss takes a tenth of the account: $200. The remaining $1,800 is still yours." },
            ],
        },
        {
            id: "capital-recap",
            kind: "recap",
            title: "What you've learned",
            learned: ["With personal capital, all of the profit is yours and so is all of the loss.", "In a funded-trader programme the account belongs to the firm: the trader usually pays a fee, must pass an evaluation, and receives only a share of profits.", "Such programmes have rules, such as a daily loss limit and a maximum drawdown. Breaking one ends the account.", "The advertised account size is what a trader may trade, not money they own or can withdraw.", "With either one, a single emotional mistake can undo a great deal. Clear rules, set before the trade, are what protect a trader. AltureLock is built to help you keep to them.", "Nothing here is a promise of funding or of profit. Programmes differ, and their rules decide the result."],
            terms: [["Trading capital", "The money a trader trades with."], ["Prop firm", "A proprietary trading firm: a firm that lets traders trade its accounts under its rules."], ["Funded account", "An account provided by a firm for a trader to trade."], ["Evaluation (challenge)", "A test, usually paid for, that a trader must pass under the firm's rules to obtain a funded account."], ["Profit split", "The share of profits the trader receives; the firm keeps the rest."], ["Drawdown", "A fall in an account's value from an earlier level."], ["Maximum drawdown", "The largest total loss the rules allow before the account is closed."], ["Daily loss limit", "The largest loss the rules allow in one day."]],
        },
    ],
};

// ---------- Practice and Review ----------

const PRACTICE: Lesson = {
    id: "practice",
    stage: "practice",
    title: "Take a simulated trade",
    summary: "A decision on a real historical chart, and what price did next.",
    steps: [
        { id: "practice-sim", kind: "sim", title: "Your decision" },
        { id: "practice-review", kind: "simreview", title: "Review your decision" },
        {
            id: "practice-recap",
            kind: "recap",
            title: "What you've learned",
            learned: ["A trade is planned before it is taken: a direction, an entry, a stop loss and a take profit.", "The stop loss decides where a trade is wrong; with the position size, it decides how much can be lost.", "Leverage multiplies the position, and so both the gain and the loss. Too much of it, and a small move takes the whole amount: that is liquidation.", "Fees are charged on the whole position, on the way in and on the way out, and they count.", "Staying out is a decision too, and sometimes the best one.", "One trade proves little: a sound decision can lose, and a poor one can win."],
            terms: [["Long", "A position that profits when price rises."], ["Short", "A position that profits when price falls."], ["Entry", "The price at which a position is opened."], ["Stop loss", "The price at which a position is closed at a loss, decided in advance."], ["Take profit", "The price at which a position is closed at a profit, decided in advance."], ["Position size", "How much is bought or sold."], ["Margin", "The part of the account put into a trade."], ["Leverage", "A multiple applied to the margin: at 10x, $500 controls a $5,000 position."], ["Liquidation", "The forced closing of a leveraged position when its loss has used up the margin."], ["Reward-to-risk", "How much a trade aims to make for each dollar it risks."], ["Fee", "What the exchange charges for each trade."]],
        },
    ],
};

const REVIEW: Lesson = {
    id: "review",
    stage: "review",
    title: "Understand your decisions",
    summary: "Your practice journal, and what the Introduction covered.",
    steps: [
        { id: "review-journal", kind: "journal", title: "Your practice journal" },
        { id: "review-finish", kind: "finish", title: "What you've learned" },
    ],
};

export const LESSONS: Lesson[] = [CRYPTO, MARKETS, CAPITAL, ...CHART_LESSONS.map((lesson) => ({ ...lesson, stage: "decide" as const })), PRACTICE, REVIEW];
export const lessonsOf = (stage: StageId) => LESSONS.map((lesson, index) => ({ lesson, index })).filter((item) => item.lesson.stage === stage);

// Reading a recap or the closing page is not progress: only doing something is.
const counts = (step: Step) => step.kind !== "recap" && step.kind !== "finish";
export const ALL_STEPS = LESSONS.flatMap((lesson) => lesson.steps);
export const TOTAL_STEPS = ALL_STEPS.filter(counts).length;

// How far a learner is, from what they have really completed.
export function measure(done: Record<string, number>) {
    const lessons = LESSONS.map((lesson) => ({ id: lesson.id, stage: lesson.stage, done: lesson.steps.filter((step) => counts(step) && done[step.id]).length, total: lesson.steps.filter(counts).length }));
    const stages = STAGES.map((stage) => ({ id: stage.id, done: lessons.filter((lesson) => lesson.stage === stage.id).reduce((sum, lesson) => sum + lesson.done, 0), total: lessons.filter((lesson) => lesson.stage === stage.id).reduce((sum, lesson) => sum + lesson.total, 0) }));
    const steps = lessons.reduce((sum, lesson) => sum + lesson.done, 0);
    // Where to continue: the first thing to do that is not yet done.
    let next: { lesson: number; step: number } | null = null;
    LESSONS.some((lesson, l) => lesson.steps.some((step, s) => (!counts(step) || done[step.id] ? false : ((next = { lesson: l, step: s }), true))));
    return { lessons, stages, steps, total: TOTAL_STEPS, percent: Math.round((steps / TOTAL_STEPS) * 100), lessonsDone: lessons.filter((lesson) => lesson.done === lesson.total).length, stagesDone: stages.filter((stage) => stage.done === stage.total).length, next: next as { lesson: number; step: number } | null, complete: steps === TOTAL_STEPS };
}

// Where "Try a trade" leads: straight to the simulated trade, whatever has been done before.
export const TRADE_LINK = `/education/introduction?lesson=${LESSONS.findIndex((lesson) => lesson.id === "practice") + 1}&step=1`;
