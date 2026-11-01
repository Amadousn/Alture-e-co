// Turns Binance USDⓈ-M futures fills into journal trades. Pure functions, no network.
//
// Binance reports every fill (`userTrades`) with the profit it realised and the
// commission paid. A journal trade is the whole life of a position: from the
// fill that opens it to the fill that brings it back to zero.
//
// Method
// 1. Fills are de-duplicated by id and replayed in time order, separately for
//    each symbol and position side (BOTH in one-way mode, LONG/SHORT in hedge mode).
// 2. A BUY adds to a long or reduces a short; a SELL the opposite. The part of a
//    fill that reduces the position is an exit; any remainder opens a new one.
// 3. Profit is Binance's own realisedPnl summed over the exits, minus the
//    commissions paid in the settlement asset. Commissions paid in BNB cannot be
//    priced without a quote, so they are left out and the trade says so.
// 4. Fills that reduce a position opened before the imported history are kept
//    as a trade marked `incomplete`: its entry is unknown.

import type { ImportedTrade } from "../bybit/positions.ts";

export type BinanceFill = {
    id: number;
    orderId: number;
    symbol: string;
    side: "BUY" | "SELL";
    positionSide: "BOTH" | "LONG" | "SHORT";
    price: number;
    qty: number;
    realizedPnl: number;
    commission: number;
    commissionAsset: string;
    time: number;
    // The position size before this fill, signed, when the source reports it (Hyperliquid).
    startPosition?: number;
    // Count the commission as a fee whatever its asset (sources that report it in the account currency).
    feeInQuote?: boolean;
};

const EPSILON = 1e-9;
const round = (value: number, places = 8) => Number(value.toFixed(places));
const settles = (symbol: string, asset: string) => symbol.endsWith(asset);

type Life = {
    symbol: string;
    direction: 1 | -1;
    size: number;
    entryQty: number;
    entryValue: number;
    exitQty: number;
    exitValue: number;
    pnl: number;
    fees: number;
    unpricedFees: boolean;
    openedAt: number | null;
    closedAt: number;
    firstId: number;
    orders: Set<string>;
    fills: number;
    exits: number;
    executions: { kind: "entry" | "exit"; price: number; quantity: number; at: number }[];
};

const finish = (life: Life, leverage: (symbol: string) => number): ImportedTrade => {
    const entryPrice = life.entryQty ? life.entryValue / life.entryQty : life.exitValue / Math.max(life.exitQty, EPSILON);
    const exitPrice = life.exitValue / Math.max(life.exitQty, EPSILON);
    return {
        id: `binance-${life.symbol}-${life.firstId}`,
        instrument: life.symbol,
        direction: life.direction === 1 ? "Long" : "Short",
        entryPrice: round(entryPrice),
        exitPrice: round(exitPrice),
        quantity: round(life.exitQty),
        leverage: leverage(life.symbol),
        positionSize: round(entryPrice * life.exitQty, 2),
        fee: round(life.fees, 4),
        profitLoss: round(life.pnl - life.fees, 4),
        ...(life.openedAt !== null ? { openedAt: life.openedAt } : {}),
        closedAt: life.closedAt,
        source: "binance",
        provider: "binance",
        orderIds: [...life.orders],
        fills: life.fills,
        exits: life.exits,
        pnlSource: "exchange",
        executions: life.executions,
        ...(life.openedAt === null ? { incomplete: true } : {}),
    };
};

export function buildBinanceTrades(fills: BinanceFill[], leverage: (symbol: string) => number = () => 1): { trades: ImportedTrade[]; openSince: number | null } {
    const unique = [...new Map(fills.map((fill) => [`${fill.symbol}-${fill.id}`, fill])).values()].sort((a, b) => a.time - b.time || a.id - b.id);
    const lives = new Map<string, Life>();
    const trades: ImportedTrade[] = [];

    for (const fill of unique) {
        const key = `${fill.symbol}|${fill.positionSide}`;
        const sign: 1 | -1 = fill.side === "BUY" ? 1 : -1;
        const counted = fill.feeInQuote || settles(fill.symbol, fill.commissionAsset);
        const fee = counted ? fill.commission : 0;
        const unpriced = fill.commission > 0 && !counted;
        let remaining = fill.qty;
        let life = lives.get(key);

        // A position already open before the imported history: its entry is unknown.
        if (!life && fill.startPosition !== undefined && Math.abs(fill.startPosition) > EPSILON) {
            life = { symbol: fill.symbol, direction: fill.startPosition > 0 ? 1 : -1, size: Math.abs(fill.startPosition), entryQty: 0, entryValue: 0, exitQty: 0, exitValue: 0, pnl: 0, fees: 0, unpricedFees: false, openedAt: null, closedAt: fill.time, firstId: fill.id, orders: new Set(), fills: 0, exits: 0, executions: [] };
            lives.set(key, life);
        }
        // A reduce on a side with no known position: it closes something opened before the history.
        if (!life && fill.realizedPnl !== 0) {
            const direction: 1 | -1 = fill.positionSide === "LONG" ? 1 : fill.positionSide === "SHORT" ? -1 : sign === 1 ? -1 : 1;
            life = { symbol: fill.symbol, direction, size: fill.qty, entryQty: 0, entryValue: 0, exitQty: 0, exitValue: 0, pnl: 0, fees: 0, unpricedFees: false, openedAt: null, closedAt: fill.time, firstId: fill.id, orders: new Set(), fills: 0, exits: 0, executions: [] };
            lives.set(key, life);
        }

        while (remaining > EPSILON) {
            if (!life) {
                life = { symbol: fill.symbol, direction: sign, size: 0, entryQty: 0, entryValue: 0, exitQty: 0, exitValue: 0, pnl: 0, fees: 0, unpricedFees: false, openedAt: fill.time, closedAt: fill.time, firstId: fill.id, orders: new Set(), fills: 0, exits: 0, executions: [] };
                lives.set(key, life);
            }
            const share = remaining / fill.qty;
            life.fills += 1;
            life.unpricedFees ||= unpriced;
            if (life.direction === sign) {
                life.size += remaining;
                life.entryQty += remaining;
                life.entryValue += remaining * fill.price;
                life.fees += fee * share;
                life.executions.push({ kind: "entry", price: fill.price, quantity: round(remaining), at: fill.time });
                remaining = 0;
            } else {
                const closing = Math.min(remaining, life.size);
                const part = closing / fill.qty;
                life.size -= closing;
                life.exitQty += closing;
                life.exitValue += closing * fill.price;
                // Binance books the whole realised profit of a fill on its closing part.
                life.pnl += fill.realizedPnl;
                life.fees += fee * part;
                life.exits += 1;
                life.closedAt = fill.time;
                life.orders.add(String(fill.orderId));
                life.executions.push({ kind: "exit", price: fill.price, quantity: round(closing), at: fill.time });
                remaining -= closing;
                if (life.size <= EPSILON) {
                    trades.push(finish(life, leverage));
                    lives.delete(key);
                    life = undefined;
                }
            }
        }
    }

    const open = [...lives.values()].map((life) => life.openedAt ?? life.closedAt);
    return { trades: trades.sort((a, b) => b.closedAt - a.closedAt), openSince: open.length ? Math.min(...open) : null };
}
