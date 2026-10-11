// Made-up market data for the guided AltureLock demo. Nothing here is a real
// price: every screen that shows it is labelled as simulated.

import { FEED_SYMBOLS, MarketRules, snap } from "@/utils/trade-plan";
import type { Candle, Market, Quotes } from "@/utils/use-market";

const SOURCE = "Simulated data for this demo, not real prices";

const SPEC: Record<string, { price: number; rules: MarketRules }> = {
    BTCUSDT: { price: 60000, rules: { tickSize: 0.1, qtyStep: 0.001, minQty: 0.001, maxLeverage: 50 } },
    ETHUSDT: { price: 2500, rules: { tickSize: 0.01, qtyStep: 0.01, minQty: 0.01, maxLeverage: 50 } },
    SOLUSDT: { price: 100, rules: { tickSize: 0.01, qtyStep: 0.1, minQty: 0.1, maxLeverage: 50 } },
    XRPUSDT: { price: 1.5, rules: { tickSize: 0.0001, qtyStep: 1, minQty: 1, maxLeverage: 50 } },
    HYPEUSDT: { price: 80, rules: { tickSize: 0.01, qtyStep: 0.01, minQty: 0.01, maxLeverage: 50 } },
};

// Small deterministic generator, so the demo chart looks the same every time.
function walk(seed: number) {
    return () => {
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const START = Date.UTC(2026, 0, 1);

function candlesFor(symbol: string): Candle[] {
    const { price, rules } = SPEC[symbol];
    const random = walk(symbol.length * 7919);
    const moves: number[] = [];
    let level = 0;
    for (let i = 0; i < 88; i++) {
        level += (random() - 0.47) * 0.0022;
        moves.push(level);
    }
    // Shift the whole path so it finishes exactly on the demo price.
    const last = moves[moves.length - 1];
    let previous = price * (1 - last);
    return moves.map((move, i) => {
        const close = snap(price * (1 + move - last), rules.tickSize);
        const open = previous;
        const high = snap(Math.max(open, close) * (1 + random() * 0.0009), rules.tickSize);
        const low = snap(Math.min(open, close) * (1 - random() * 0.0009), rules.tickSize);
        previous = close;
        return { t: START + i * 900000, o: open, h: high, l: low, c: close };
    });
}

// The demo's market for one symbol. With `moveTo`, a few extra candles carry
// the price to that level, to show what the cockpit does when a target is reached.
export function simulatedMarket(symbol: string | null, moveTo: number | null): Market {
    if (!symbol || !SPEC[symbol]) return { status: "none" };
    const { price, rules } = SPEC[symbol];
    const candles = candlesFor(symbol);
    let current = price;
    if (moveTo !== null) {
        const steps = 8;
        let previous = price;
        for (let i = 1; i <= steps; i++) {
            const close = snap(price + ((moveTo - price) * i) / steps, rules.tickSize);
            candles.push({ t: START + (87 + i) * 900000, o: previous, h: Math.max(previous, close), l: Math.min(previous, close), c: close });
            previous = close;
        }
        current = moveTo;
    }
    return { status: "live", symbol, price: current, change24h: null, candles, rules, source: SOURCE, fetchedAt: START, simulated: true };
}

export const SIMULATED_QUOTES: Quotes = {
    status: "live",
    quotes: Object.fromEntries(FEED_SYMBOLS.filter((symbol) => SPEC[symbol]).map((symbol) => [symbol, { price: SPEC[symbol].price, change24h: null }])),
    source: SOURCE,
    fetchedAt: START,
    simulated: true,
};
