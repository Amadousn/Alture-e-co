// The arithmetic of the simulated trade. Nothing here places an order: it
// replays what historical candles did after a decision, and works out the
// result from the entry, the exit, the position size and the fees.

import type { Candle } from "./education-chart-data.ts";

export type Side = "long" | "short";
export type Plan = { side: Side; entry: number; stop: number; target: number };
export type Result = "target" | "stop" | "open" | "unfilled";
export type Outcome = {
    result: Result;
    // Index, among the candles that came next, where the order was filled and where the trade ended. -1 = filled at once, at the last visible close.
    filledAt: number | null;
    exitAt: number | null;
    exit: number | null;
    // Size in BTC, for the amount risked; results in dollars, before and after fees; the result as a multiple of the amount risked.
    size: number;
    gross: number;
    fees: number;
    net: number;
    r: number;
};

// A fixed virtual amount risked on each trade, and a typical taker fee charged on the way in and on the way out.
export const VIRTUAL_RISK = 100;
export const FEE_RATE = 0.0006;

// Why a plan cannot be confirmed, or null when it can.
export function planIssue(plan: Plan): string | null {
    const { side, entry, stop, target } = plan;
    if (![entry, stop, target].every((value) => Number.isFinite(value) && value > 0)) return "Set an entry, a stop loss and a take profit.";
    if (side === "long" && !(stop < entry)) return "On a long, the stop loss goes below the entry: it is where a falling price proves the idea wrong.";
    if (side === "long" && !(target > entry)) return "On a long, the take profit goes above the entry: you profit when price rises.";
    if (side === "short" && !(stop > entry)) return "On a short, the stop loss goes above the entry: it is where a rising price proves the idea wrong.";
    if (side === "short" && !(target < entry)) return "On a short, the take profit goes below the entry: you profit when price falls.";
    return null;
}

export const riskPerUnit = (plan: Plan) => Math.abs(plan.entry - plan.stop);
export const rewardPerUnit = (plan: Plan) => Math.abs(plan.target - plan.entry);
export const ratio = (plan: Plan) => rewardPerUnit(plan) / riskPerUnit(plan);

// Replays the candles that came next. Rules, stated to the learner:
// - An entry at the last visible close is filled at once. Any other entry is filled by the first later candle that trades through it.
// - After the fill, the stop loss or the take profit ends the trade when a candle trades through it.
// - If one candle trades through both, the stop loss is assumed to have come first. A candle cannot say which did.
// - In the candle that fills the order, only the stop loss is checked, for the same reason.
// - If neither is reached, the trade is still open at the last candle and is valued at its close.
export function resolve(plan: Plan, lastClose: number, next: Candle[], risk = VIRTUAL_RISK, feeRate = FEE_RATE): Outcome {
    const dir = plan.side === "long" ? 1 : -1;
    const size = risk / riskPerUnit(plan);
    const done = (result: Result, filledAt: number | null, exitAt: number | null, exit: number | null): Outcome => {
        if (exit === null) return { result, filledAt, exitAt, exit, size, gross: 0, fees: 0, net: 0, r: 0 };
        const gross = (exit - plan.entry) * dir * size;
        const fees = (plan.entry + exit) * size * feeRate;
        return { result, filledAt, exitAt, exit, size, gross, fees, net: gross - fees, r: gross / risk };
    };
    const stopHit = (candle: Candle) => (dir === 1 ? candle.l <= plan.stop : candle.h >= plan.stop);
    const targetHit = (candle: Candle) => (dir === 1 ? candle.h >= plan.target : candle.l <= plan.target);

    let filledAt: number | null = Math.abs(plan.entry - lastClose) < 1e-9 ? -1 : null;
    for (let i = 0; i < next.length; i++) {
        const candle = next[i];
        if (filledAt === null) {
            if (candle.l <= plan.entry && candle.h >= plan.entry) {
                filledAt = i;
                if (stopHit(candle)) return done("stop", filledAt, i, plan.stop);
            }
            continue;
        }
        if (stopHit(candle)) return done("stop", filledAt, i, plan.stop);
        if (targetHit(candle)) return done("target", filledAt, i, plan.target);
    }
    if (filledAt === null) return done("unfilled", null, null, null);
    return done("open", filledAt, next.length - 1, next[next.length - 1].c);
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
        // What reaches the trader: a share of the profit, nothing of a loss, and the fee is paid either way.
        share: accountResult > 0 ? (accountResult * splitPct) / 100 : 0,
        net: (accountResult > 0 ? (accountResult * splitPct) / 100 : 0) - fee,
        cushion: breached ? 0 : limit + Math.min(0, accountResult),
    };
}
