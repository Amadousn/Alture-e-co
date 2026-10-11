// Turns Bybit's raw history into journal trades. Pure functions, no network.
//
// Bybit reports two things: executions (every individual fill) and closed P&L
// (one row per closing order). Neither is a "trade" as a trader thinks of
// one. A position can be built from several fills and taken off in several
// exits, so the journal trade is the whole life of a position: from the fill
// that opens it to the fill that brings it back to zero.
//
// Method
// 1. Executions are de-duplicated by execId and replayed in time order,
//    separately for each symbol and position side.
// 2. Bybit marks how much of each fill reduced an existing position
//    (`closedSize`). That part is an exit; the remainder is an entry.
// 3. A trade is complete when the position size returns to zero. Its entry
//    and exit prices are the size-weighted averages of its fills.
// 4. Profit and fees use Bybit's own closed P&L rows when every closing order
//    has one ("exchange"); otherwise they are computed from the fills
//    ("computed") and labelled as such.
// 5. Exits whose opening fills are older than the imported history cannot be
//    rebuilt. Their closed P&L rows are kept as stand-alone trades marked
//    `incomplete`, and are replaced if a later import covers the full position.

export type BybitExecution = {
    execId: string;
    orderId: string;
    symbol: string;
    side: "Buy" | "Sell";
    execPrice: number;
    execQty: number;
    closedSize: number;
    execFee: number;
    execTime: number;
    execType: string;
    positionIdx: number;
};

export type BybitClosedPnl = {
    orderId: string;
    symbol: string;
    side: "Buy" | "Sell";
    qty: number;
    leverage: number;
    avgEntryPrice: number;
    avgExitPrice: number;
    cumEntryValue: number;
    closedPnl: number;
    openFee: number;
    closeFee: number;
    createdTime: number;
    updatedTime: number;
};

export type ImportedTrade = {
    id: string;
    instrument: string;
    direction: "Long" | "Short";
    entryPrice: number;
    exitPrice: number;
    quantity: number;
    leverage: number;
    positionSize: number;
    fee: number;
    profitLoss: number;
    openedAt?: number;
    closedAt: number;
    source: "bybit";
    provider: "bybit";
    orderIds: string[];
    fills: number;
    exits: number;
    funding?: number;
    pnlSource: "exchange" | "computed";
    executions?: { kind: "entry" | "exit"; price: number; quantity: number; at: number }[];
    incomplete?: boolean;
};

const EPSILON = 1e-9;
const round = (value: number, places = 8) => Number(value.toFixed(places));

type Life = {
    symbol: string;
    direction: 1 | -1;
    size: number;
    entryQty: number;
    entryValue: number;
    exitQty: number;
    exitValue: number;
    fees: number;
    funding: number;
    firstExecId: string;
    openedAt: number;
    closedAt: number;
    closeOrders: Set<string>;
    fills: number;
    exits: number;
    executions: { kind: "entry" | "exit"; price: number; quantity: number; at: number }[];
};

export function buildTrades(env: string, executions: BybitExecution[], closedPnl: BybitClosedPnl[]): { trades: ImportedTrade[]; openSince: number | null } {
    const unique = Array.from(new Map(executions.map((item) => [item.execId, item])).values()).sort((a, b) => a.execTime - b.execTime || a.execId.localeCompare(b.execId));

    // Closed P&L can carry more than one row for an order; total them per order.
    const pnlByOrder = new Map<string, { pnl: number; fee: number; leverage: number }>();
    const seenRows = new Set<string>();
    const rows = closedPnl.filter((row) => {
        const key = `${row.orderId}|${row.createdTime}|${row.updatedTime}|${row.qty}|${row.closedPnl}`;
        if (seenRows.has(key)) return false;
        seenRows.add(key);
        return true;
    });
    for (const row of rows) {
        const current = pnlByOrder.get(row.orderId) ?? { pnl: 0, fee: 0, leverage: row.leverage };
        pnlByOrder.set(row.orderId, { pnl: current.pnl + row.closedPnl, fee: current.fee + row.openFee + row.closeFee, leverage: row.leverage || current.leverage });
    }

    const open = new Map<string, Life>();
    const trades: ImportedTrade[] = [];
    const rebuiltOrders = new Set<string>();

    const finish = (life: Life) => {
        const entryPrice = life.entryValue / life.entryQty;
        const exitPrice = life.exitValue / life.exitQty;
        const orderIds = Array.from(life.closeOrders);
        const matched = orderIds.map((id) => pnlByOrder.get(id));
        const fromExchange = matched.length > 0 && matched.every(Boolean);
        const gross = (exitPrice - entryPrice) * life.exitQty * life.direction;
        orderIds.forEach((id) => rebuiltOrders.add(id));
        trades.push({
            id: `bybit:${env}:${life.symbol}:${life.firstExecId}`,
            instrument: life.symbol,
            direction: life.direction === 1 ? "Long" : "Short",
            entryPrice: round(entryPrice),
            exitPrice: round(exitPrice),
            quantity: round(life.entryQty),
            leverage: matched.find(Boolean)?.leverage || 1,
            positionSize: round(life.entryValue, 2),
            fee: round(fromExchange ? matched.reduce((sum, item) => sum + item!.fee, 0) : life.fees),
            profitLoss: round(fromExchange ? matched.reduce((sum, item) => sum + item!.pnl, 0) : gross - life.fees),
            openedAt: life.openedAt,
            closedAt: life.closedAt,
            source: "bybit",
            provider: "bybit",
            orderIds,
            fills: life.fills,
            exits: life.exits,
            funding: Math.abs(life.funding) > EPSILON ? round(life.funding) : undefined,
            pnlSource: fromExchange ? "exchange" : "computed",
            executions: life.executions,
        });
    };

    for (const exec of unique) {
        const key = `${exec.symbol}|${exec.positionIdx}`;
        const life = open.get(key);

        if (exec.execType === "Funding") {
            if (life) life.funding += exec.execFee;
            continue;
        }
        if (!(exec.execQty > EPSILON)) continue;

        const side: 1 | -1 = exec.side === "Buy" ? 1 : -1;
        const closing = Math.min(Math.max(exec.closedSize, 0), exec.execQty);
        const opening = exec.execQty - closing;
        const closingFee = exec.execFee * (closing / exec.execQty);
        let current = life;

        if (closing > EPSILON && current && current.direction === -side) {
            current.exitQty += closing;
            current.exitValue += closing * exec.execPrice;
            current.size -= closing;
            current.fees += closingFee;
            current.exits += 1;
            current.executions.push({ kind: "exit", price: exec.execPrice, quantity: round(closing), at: exec.execTime });
            current.closedAt = exec.execTime;
            current.closeOrders.add(exec.orderId);
            if (current.size <= EPSILON) {
                finish(current);
                open.delete(key);
                current = undefined;
            }
        }
        // A closing fill with no position on record belongs to a trade opened
        // before this history starts; its closed P&L row is handled below.

        if (opening > EPSILON) {
            if (!current) {
                current = { symbol: exec.symbol, direction: side, size: 0, entryQty: 0, entryValue: 0, exitQty: 0, exitValue: 0, fees: 0, funding: 0, firstExecId: exec.execId, openedAt: exec.execTime, closedAt: exec.execTime, closeOrders: new Set(), fills: 0, exits: 0, executions: [] };
                open.set(key, current);
            }
            if (current.direction === side) {
                current.size += opening;
                current.entryQty += opening;
                current.entryValue += opening * exec.execPrice;
                current.fees += exec.execFee - closingFee;
                current.fills += 1;
                current.executions.push({ kind: "entry", price: exec.execPrice, quantity: round(opening), at: exec.execTime });
            }
        }
    }

    // Exits that could not be tied to a rebuilt position.
    for (const row of rows) {
        if (rebuiltOrders.has(row.orderId)) continue;
        trades.push({
            id: `bybit:${env}:pnl:${row.orderId}:${row.createdTime}`,
            instrument: row.symbol,
            // `side` is the side of the order that closed the position.
            direction: row.side === "Sell" ? "Long" : "Short",
            entryPrice: row.avgEntryPrice,
            exitPrice: row.avgExitPrice,
            quantity: row.qty,
            leverage: row.leverage || 1,
            positionSize: row.cumEntryValue,
            fee: round(row.openFee + row.closeFee),
            profitLoss: row.closedPnl,
            closedAt: row.updatedTime,
            source: "bybit",
            provider: "bybit",
            orderIds: [row.orderId],
            fills: 0,
            exits: 1,
            pnlSource: "exchange",
            incomplete: true,
        });
    }

    trades.sort((a, b) => b.closedAt - a.closedAt);
    const stillOpen = Array.from(open.values()).map((life) => life.openedAt);
    return { trades, openSince: stillOpen.length > 0 ? Math.min(...stillOpen) : null };
}

// Adds a fresh import to what is already stored. Safe to repeat: a trade seen
// again replaces itself, and a stand-alone exit is dropped once the full
// position that contains it has been rebuilt.
export function mergeTrades<T extends { id: string; orderIds?: string[]; incomplete?: boolean; closedAt: number }>(existing: T[], incoming: T[]): T[] {
    const byId = new Map<string, T>();
    for (const trade of existing) byId.set(trade.id, trade);
    for (const trade of incoming) byId.set(trade.id, trade);
    const covered = new Set<string>();
    for (const trade of byId.values()) if (!trade.incomplete) (trade.orderIds ?? []).forEach((id) => covered.add(id));
    return Array.from(byId.values())
        .filter((trade) => !(trade.incomplete && (trade.orderIds ?? []).some((id) => covered.has(id))))
        .sort((a, b) => b.closedAt - a.closedAt);
}
