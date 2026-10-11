// Pure trade-planning maths for the Rules workflow. Nothing here fetches or
// invents a price: every figure comes from what the trader entered, plus the
// quantity rules published for the instrument when a feed is connected.

import type { ClosedTrade } from "@/utils/bybit";
import type { ActiveTrade, TradePlan } from "@/utils/workspace-store";

export type AssetId = "BTC" | "ETH" | "SOL" | "XRP" | "HYPE" | "NASDAQ";

export type Asset = {
    id: AssetId;
    name: string;
    ticker: string;
    glyph: string;
    // The name saved on the journal record.
    instrument: string;
    // Bybit USDT perpetual used for public price data, or null when no feed is connected.
    feed: string | null;
    // What one unit of position size is.
    unit: string;
};

export const ASSETS: Asset[] = [
    { id: "BTC", name: "Bitcoin", ticker: "BTC", glyph: "₿", instrument: "BTCUSDT", feed: "BTCUSDT", unit: "BTC" },
    { id: "ETH", name: "Ethereum", ticker: "ETH", glyph: "Ξ", instrument: "ETHUSDT", feed: "ETHUSDT", unit: "ETH" },
    { id: "SOL", name: "Solana", ticker: "SOL", glyph: "◎", instrument: "SOLUSDT", feed: "SOLUSDT", unit: "SOL" },
    { id: "XRP", name: "XRP", ticker: "XRP", glyph: "✕", instrument: "XRPUSDT", feed: "XRPUSDT", unit: "XRP" },
    { id: "HYPE", name: "Hyperliquid", ticker: "HYPE", glyph: "H", instrument: "HYPEUSDT", feed: "HYPEUSDT", unit: "HYPE" },
    { id: "NASDAQ", name: "Nasdaq", ticker: "NASDAQ", glyph: "N", instrument: "NASDAQ", feed: null, unit: "units" },
];

export const FEED_SYMBOLS = ASSETS.flatMap((asset) => (asset.feed ? [asset.feed] : []));

export const assetFor = (instrument: string): Asset | null => ASSETS.find((asset) => asset.instrument === instrument.trim().toUpperCase()) ?? null;

// Published for the instrument by the exchange whose feed is used.
export type MarketRules = { tickSize: number; qtyStep: number; minQty: number; maxLeverage: number };

export const num = (value: string | undefined) => {
    if (value === undefined) return null;
    const parsed = Number(value);
    return value.trim() !== "" && Number.isFinite(parsed) ? parsed : null;
};

export function decimalsOf(step: number): number {
    for (let d = 0; d <= 10; d++) {
        const scaled = step * 10 ** d;
        if (Math.abs(scaled - Math.round(scaled)) < 1e-9) return d;
    }
    return 10;
}

export function snap(value: number, step: number, mode: "round" | "floor" = "round"): number {
    if (!(step > 0)) return value;
    const steps = mode === "floor" ? Math.floor(value / step + 1e-9) : Math.round(value / step);
    return Number((steps * step).toFixed(decimalsOf(step)));
}

// A sensible nudge size when the instrument has no published tick.
export const fallbackTick = (price: number) => (price > 0 ? 10 ** (Math.floor(Math.log10(price)) - 4) : 0.01);

export type Sizing = { quantity: number | null; raw: number | null; belowMin: boolean };

// Size so that a move from entry to stop loses exactly the planned risk,
// rounded down to the instrument's quantity step so the loss never exceeds it.
export function sizeFromRisk(risk: number | null, entry: number | null, stop: number | null, rules: MarketRules | null): Sizing {
    if (risk === null || entry === null || stop === null || risk <= 0 || entry <= 0 || stop <= 0 || entry === stop) return { quantity: null, raw: null, belowMin: false };
    const raw = risk / Math.abs(entry - stop);
    if (!rules) return { quantity: Number(raw.toPrecision(6)), raw, belowMin: false };
    const quantity = snap(raw, rules.qtyStep, "floor");
    if (quantity < rules.minQty) return { quantity: null, raw, belowMin: true };
    return { quantity, raw, belowMin: false };
}

// Keeps `quantity` in step with the planned risk while size is automatic.
export function applySizing(plan: TradePlan, rules: MarketRules | null): TradePlan {
    if (plan.sizeMode === "manual") return plan;
    const { quantity } = sizeFromRisk(num(plan.riskAmount), num(plan.plannedEntry), num(plan.stopLoss), rules);
    const next = quantity === null ? "" : String(quantity);
    return next === plan.quantity ? plan : { ...plan, quantity: next };
}

// Everything that can be worked out from the plan as it stands.
export function derivePlan(plan: TradePlan) {
    const entry = num(plan.actualEntry) ?? num(plan.plannedEntry);
    const stop = num(plan.stopLoss);
    const target = num(plan.takeProfit);
    const quantity = num(plan.quantity);
    const direction = plan.direction === "Long" ? 1 : -1;
    const sized = quantity !== null && quantity > 0;
    const risk = entry !== null && stop !== null && sized ? Math.abs(entry - stop) * quantity : null;
    const reward = entry !== null && target !== null && sized ? Math.abs(target - entry) * quantity : null;
    // The ratio depends only on the three prices, so it shows before a size exists.
    const ratio = entry !== null && stop !== null && target !== null && entry !== stop ? Math.abs(target - entry) / Math.abs(entry - stop) : null;
    const notional = entry !== null && sized ? entry * quantity : null;
    // Leverage changes the margin set aside, never the dollar risk at the stop.
    const leverage = num(plan.leverage);
    const leveraged = leverage !== null && leverage >= 1;
    const margin = notional !== null && leveraged ? notional / leverage : null;
    // Rough point where an isolated-margin position runs out of margin. It ignores
    // maintenance margin and fees, so a real exchange liquidates slightly earlier.
    const liquidation = entry !== null && leveraged && leverage > 1 ? entry * (1 - direction / leverage) : null;
    const stopBeyondLiquidation = liquidation !== null && stop !== null && (stop - liquidation) * direction <= 0;
    const stopOnRightSide = entry === null || stop === null || (stop - entry) * direction < 0;
    const targetOnRightSide = entry === null || target === null || (target - entry) * direction > 0;
    return { entry, stop, target, quantity, direction, risk, reward, ratio, notional, leverage: leveraged ? leverage : null, margin, liquidation, stopBeyondLiquidation, stopOnRightSide, targetOnRightSide };
}

export type PlanIssues = { entry: string; stop: string; target: string; size: string; leverage: string };

// Empty strings mean the value is acceptable. `missing` tells a blank field
// (neutral guidance) from a wrong one (a real warning).
export function planIssues(plan: TradePlan, rules: MarketRules | null): { issues: PlanIssues; missing: (keyof PlanIssues)[]; valid: boolean } {
    const d = derivePlan(plan);
    const long = plan.direction === "Long";
    const missing: (keyof PlanIssues)[] = [];
    const issues: PlanIssues = { entry: "", stop: "", target: "", size: "", leverage: "" };

    if (d.entry === null) missing.push("entry");
    else if (d.entry <= 0) issues.entry = "The entry price must be above zero.";

    if (d.stop === null) missing.push("stop");
    else if (d.stop <= 0) issues.stop = "The stop loss must be above zero.";
    else if (!d.stopOnRightSide) issues.stop = `For a ${long ? "long" : "short"}, the stop loss belongs ${long ? "below" : "above"} your entry.`;

    if (d.target === null) missing.push("target");
    else if (d.target <= 0) issues.target = "The take profit must be above zero.";
    else if (!d.targetOnRightSide) issues.target = `For a ${long ? "long" : "short"}, the take profit belongs ${long ? "above" : "below"} your entry.`;

    if (plan.sizeMode === "manual") {
        if (d.quantity === null) missing.push("size");
        else if (d.quantity <= 0) issues.size = "The position size must be above zero.";
        else if (rules && d.quantity < rules.minQty) issues.size = `The smallest size for this instrument is ${rules.minQty}.`;
    } else {
        const risk = num(plan.riskAmount);
        if (risk === null) missing.push("size");
        else if (risk <= 0) issues.size = "The amount you risk must be above zero.";
        else if (d.entry !== null && d.stop !== null && sizeFromRisk(risk, d.entry, d.stop, rules).belowMin) issues.size = `That risk is too small for this stop distance: the smallest size is ${rules?.minQty}. Risk more, or move the stop closer.`;
    }

    const leverage = num(plan.leverage);
    if (leverage === null) missing.push("leverage");
    else if (leverage < 1) issues.leverage = "Leverage starts at 1x, which means no leverage.";
    else if (rules && leverage > rules.maxLeverage) issues.leverage = `The limit on this contract is ${rules.maxLeverage}x.`;
    else if (d.stopBeyondLiquidation && d.stopOnRightSide) issues.leverage = `At ${leverage}x the position would be liquidated before price reaches your stop loss. Lower the leverage or move the stop closer.`;

    const valid = missing.length === 0 && Object.values(issues).every((message) => message === "") && d.quantity !== null && d.quantity > 0;
    return { issues, missing, valid };
}

export type ReviewAnswers = { exit: number; fee: number; followed: boolean; reflection: string };

// The journal record for a finished trade, or null if the plan cannot produce one.
export function buildRecord(trade: ActiveTrade, answers: ReviewAnswers): ClosedTrade | null {
    const plan = trade.plan;
    const d = derivePlan(plan);
    if (d.entry === null || d.quantity === null || !(answers.exit > 0)) return null;
    const result = (answers.exit - d.entry) * d.quantity * d.direction - answers.fee;
    return {
        id: `rules-${Date.now()}`,
        instrument: plan.instrument.trim().toUpperCase(),
        direction: plan.direction,
        entryPrice: d.entry,
        exitPrice: answers.exit,
        quantity: d.quantity,
        // Without a leverage figure the journal treats the whole position as margin.
        leverage: d.leverage ?? 1,
        positionSize: Math.round(d.entry * d.quantity * 100) / 100,
        fee: answers.fee,
        profitLoss: Math.round(result * 100) / 100,
        openedAt: trade.openedAt ?? undefined,
        closedAt: Date.now(),
        setup: plan.setup || undefined,
        source: "rules",
        plannedEntry: num(plan.plannedEntry) ?? undefined,
        stopLoss: d.stop ?? undefined,
        takeProfit: d.target ?? undefined,
        rulesFollowed: answers.followed,
        reflection: answers.reflection.trim() || undefined,
        timeline: trade.events && trade.events.length > 0 ? [...trade.events, { at: Date.now(), text: `Closed at ${answers.exit}` }] : undefined,
    };
}
