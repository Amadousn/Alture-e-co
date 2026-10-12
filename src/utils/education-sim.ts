// The arithmetic of the simulated trade. Nothing here places an order: it
// replays what historical candles did after a decision, and works out the
// result from the entry, the exit, the position size and the fees.

import type { Candle } from "./education-chart-data.ts";

export type Side = "long" | "short";
// `margin` is the part of the practice account put into the trade; `leverage` multiplies it into the position.
export type Plan = { side: Side; entry: number; stop: number; target: number; margin: number; leverage: number };
export type Result = "target" | "stop" | "liquidated" | "open" | "unfilled";
export type Outcome = {
    result: Result;
    // When the order was filled and when the trade ended, in minutes after the decision. 0 = filled at once, at the last visible close.
    filledAt: number | null;
    exitAt: number | null;
    exit: number | null;
    // Size in units of the asset; results in dollars, before and after fees; as a multiple of the amount at risk; and as a share of the margin.
    size: number;
    gross: number;
    fees: number;
    net: number;
    r: number;
    roi: number;
};

// A practice account of virtual dollars, the amounts and leverage a learner can choose, and a typical taker fee charged on the way in and on the way out.
export const START_BALANCE = 10000;
export const MARGINS = [250, 500, 1000, 2500];
export const LEVERAGES = [1, 2, 5, 10, 20];
export const FEE_RATE = 0.0006;

// Why a plan cannot be confirmed, or null when it can.
export function planIssue(plan: Pick<Plan, "side" | "entry" | "stop" | "target">): string | null {
    const { side, entry, stop, target } = plan;
    if (![entry, stop, target].every((value) => Number.isFinite(value) && value > 0)) return "Set an entry, a stop loss and a take profit.";
    if (side === "long" && !(stop < entry)) return "On a long, the stop loss goes below the entry: it is where a falling price proves the idea wrong.";
    if (side === "long" && !(target > entry)) return "On a long, the take profit goes above the entry: you profit when price rises.";
    if (side === "short" && !(stop > entry)) return "On a short, the stop loss goes above the entry: it is where a rising price proves the idea wrong.";
    if (side === "short" && !(target < entry)) return "On a short, the take profit goes below the entry: you profit when price falls.";
    return null;
}

type Levels = Pick<Plan, "entry" | "stop" | "target">;
export const riskPerUnit = (plan: Levels) => Math.abs(plan.entry - plan.stop);
export const rewardPerUnit = (plan: Levels) => Math.abs(plan.target - plan.entry);
export const ratio = (plan: Levels) => rewardPerUnit(plan) / riskPerUnit(plan);
export const positionValue = (plan: Pick<Plan, "margin" | "leverage">) => plan.margin * plan.leverage;
export const sizeOf = (plan: Pick<Plan, "margin" | "leverage" | "entry">) => positionValue(plan) / plan.entry;

// The price at which the loss equals the whole margin and the position is closed by force.
// Simplified: a real exchange liquidates a little earlier, to keep a maintenance margin. Without leverage, a long has none.
export function liquidation(plan: Pick<Plan, "side" | "entry" | "leverage">): number | null {
    if (plan.side === "long") return plan.leverage > 1 ? plan.entry * (1 - 1 / plan.leverage) : null;
    return plan.entry * (1 + 1 / plan.leverage);
}
// True when price would reach the liquidation price before the stop loss: the stop loss then protects nothing.
export function stopTooFar(plan: Pick<Plan, "side" | "entry" | "stop" | "leverage">) {
    const liq = liquidation(plan);
    return liq !== null && (plan.side === "long" ? plan.stop <= liq : plan.stop >= liq);
}

// A candle records its open, high, low and close, but not the order of the high and the low.
// The replay walks open, one extreme, the other, close, a third of the candle each. For an open
// trade it visits the unfavourable extreme first, so a candle that reaches both the stop loss
// and the take profit counts as stopped. With no trade, a rising candle dips first and a falling one rises first.
export function corners(candle: Candle, side: Side | null): [number, number, number, number] {
    const lowFirst = side === "long" || (side === null && candle.c >= candle.o);
    return lowFirst ? [candle.o, candle.l, candle.h, candle.c] : [candle.o, candle.h, candle.l, candle.c];
}
// The replayed price `at` minutes after the decision.
export function priceAt(minutes: Candle[], side: Side | null, at: number): number {
    if (at <= 0) return minutes[0].o;
    if (at >= minutes.length) return minutes[minutes.length - 1].c;
    const i = Math.floor(at);
    const points = corners(minutes[i], side);
    const part = (at - i) * 3;
    const k = Math.min(2, Math.floor(part));
    return points[k] + (points[k + 1] - points[k]) * (part - k);
}

// Replays the minutes that came next. Rules, stated to the learner:
// - An entry at the last visible close is filled at once. Any other entry is filled when price first trades through it.
// - After the fill, the trade ends when price trades through the stop loss or the take profit, whichever it meets first.
// - With leverage, the liquidation price ends it too, and takes the whole margin.
// - If nothing is reached, the trade is still open at the last candle and is valued at its close.
export function simulate(plan: Plan, lastClose: number, minutes: Candle[], feeRate = FEE_RATE): Outcome {
    const dir = plan.side === "long" ? 1 : -1;
    const size = sizeOf(plan);
    const liq = liquidation(plan);
    const forced = liq !== null && stopTooFar(plan);
    // The adverse price that ends the trade: the stop loss, or the liquidation price when that comes first.
    const adverse = forced ? liq : plan.stop;
    const done = (result: Result, filledAt: number | null, exitAt: number | null, exit: number | null): Outcome => {
        if (exit === null) return { result, filledAt, exitAt, exit, size, gross: 0, fees: 0, net: 0, r: 0, roi: 0 };
        const risk = riskPerUnit(plan) * size;
        // Liquidation takes the margin, no more and no less.
        if (result === "liquidated") return { result, filledAt, exitAt, exit, size, gross: -plan.margin, fees: 0, net: -plan.margin, r: -plan.margin / risk, roi: -1 };
        const gross = (exit - plan.entry) * dir * size;
        const fees = (plan.entry + exit) * size * feeRate;
        return { result, filledAt, exitAt, exit, size, gross, fees, net: gross - fees, r: gross / risk, roi: (gross - fees) / plan.margin };
    };
    const between = (value: number, a: number, b: number) => value >= Math.min(a, b) && value <= Math.max(a, b);
    const when = (value: number, a: number, b: number, from: number, to: number) => (a === b ? from : from + ((value - a) / (b - a)) * (to - from));

    let filledAt: number | null = Math.abs(plan.entry - lastClose) < 1e-9 ? 0 : null;
    for (let i = 0; i < minutes.length; i++) {
        const points = corners(minutes[i], plan.side);
        for (let k = 0; k < 3; k++) {
            let [a, from] = [points[k], i + k / 3];
            const [b, to] = [points[k + 1], i + (k + 1) / 3];
            if (filledAt === null) {
                if (!between(plan.entry, a, b)) continue;
                filledAt = when(plan.entry, a, b, from, to);
                [a, from] = [plan.entry, filledAt];
            }
            if (dir === 1 ? b <= adverse : b >= adverse) return done(forced ? "liquidated" : "stop", filledAt, when(adverse, a, b, from, to), adverse);
            if (dir === 1 ? b >= plan.target : b <= plan.target) return done("target", filledAt, when(plan.target, a, b, from, to), plan.target);
        }
    }
    if (filledAt === null) return done("unfilled", null, null, null);
    return done("open", filledAt, minutes.length, minutes[minutes.length - 1].c);
}

// ---- Trading your own capital, or a firm's: the arithmetic of the comparison. Every figure is hypothetical.
export type CapitalInput = { own: number; resultPct: number; account: number; fee: number; splitPct: number; drawdownPct: number; dailyPct: number };
export function compareCapital(input: CapitalInput) {
    const { own, resultPct, account, fee, splitPct, drawdownPct, dailyPct } = input;
    const ownResult = (own * resultPct) / 100;
    const accountResult = (account * resultPct) / 100;
    const limit = (account * drawdownPct) / 100;
    const daily = (account * dailyPct) / 100;
    const breached = accountResult <= -limit;
    return {
        ownResult,
        ownEnd: own + ownResult,
        accountResult,
        // The most the account may lose in total, and in one day, before the rules close it.
        limit,
        daily,
        breached,
        // The same result made in a single day: the daily loss limit closes the account as well.
        closedInADay: accountResult <= -Math.min(limit, daily),
        // What reaches the trader: a share of the profit, nothing of a loss, and the fee is paid either way.
        share: accountResult > 0 ? (accountResult * splitPct) / 100 : 0,
        net: (accountResult > 0 ? (accountResult * splitPct) / 100 : 0) - fee,
        cushion: breached ? 0 : limit + Math.min(0, accountResult),
    };
}
