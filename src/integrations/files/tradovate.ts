// Reads a Tradovate Performance report saved as CSV (Reports → Performance → Download).
//
// Each row is one round trip already paired by Tradovate: the symbol, the
// quantity, the buy and sell prices, their timestamps and the P&L Tradovate
// computed. Whichever side came first is the entry: bought first is a long,
// sold first is a short. Columns are found by their names in the header row.
// Not yet checked against a real export: the column names follow Tradovate's
// documented report and are matched loosely.

import type { FileImport } from "./mt5.ts";
import { csvLine } from "./ibkr.ts";

const number = (value: string | undefined) => {
    const raw = (value ?? "").trim();
    // "$(25.00)" and "-$25.00" are both a loss of 25.
    const negative = /^\(.*\)$|^\$\(.*\)$|^-/.test(raw.replace(/\s/g, ""));
    const parsed = Number(raw.replace(/[$,()\s-]/g, ""));
    return Number.isFinite(parsed) && raw !== "" ? (negative ? -parsed : parsed) : NaN;
};
// "10/15/2026 09:31:05" (month first, as Tradovate prints it) or ISO → milliseconds, read as UTC.
const time = (value: string | undefined) => {
    const v = (value ?? "").trim();
    const us = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})[ T,]+(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (us) return Date.UTC(+us[3], +us[1] - 1, +us[2], +us[4], +us[5], +(us[6] ?? 0));
    const iso = Date.parse(v.endsWith("Z") ? v : `${v.replace(" ", "T")}Z`);
    return Number.isFinite(iso) ? iso : NaN;
};

export function parseTradovate(text: string): FileImport {
    const lines = text.split(/\r?\n/).filter((l) => l.trim()).map(csvLine);
    const header = (lines.shift() ?? []).map((h) => h.toLowerCase().replace(/[^a-z]/g, ""));
    const col = (...names: string[]) => names.map((n) => header.indexOf(n)).find((i) => i >= 0) ?? -1;
    const c = {
        symbol: col("symbol", "contract", "product"),
        qty: col("qty", "quantity"),
        buyPrice: col("buyprice"),
        sellPrice: col("sellprice"),
        pnl: col("pnl", "profitloss", "realizedpnl"),
        bought: col("boughttimestamp", "buytime"),
        sold: col("soldtimestamp", "selltime"),
        buyId: col("buyfillid"),
        sellId: col("sellfillid"),
    };
    if ([c.symbol, c.qty, c.buyPrice, c.sellPrice, c.pnl, c.bought, c.sold].some((i) => i < 0)) return { trades: [], skipped: lines.length, currency: null };

    const trades: FileImport["trades"] = [];
    let skipped = 0;
    for (const row of lines) {
        const qty = Math.abs(number(row[c.qty]));
        const buy = number(row[c.buyPrice]);
        const sell = number(row[c.sellPrice]);
        const pnl = number(row[c.pnl]);
        const bought = time(row[c.bought]);
        const sold = time(row[c.sold]);
        if ([qty, buy, sell, pnl, bought, sold].some((v) => !Number.isFinite(v)) || !row[c.symbol]) {
            skipped += 1;
            continue;
        }
        const long = bought <= sold;
        const id = `${row[c.buyId] ?? ""}-${row[c.sellId] ?? ""}` !== "-" ? `${row[c.buyId]}-${row[c.sellId]}` : `${row[c.symbol]}-${bought}-${sold}`;
        trades.push({
            id: `tradovate-${id}`,
            instrument: row[c.symbol].toUpperCase(),
            direction: long ? "Long" : "Short",
            entryPrice: long ? buy : sell,
            exitPrice: long ? sell : buy,
            // Contracts. The dollar value of a point depends on the contract (NQ, ES, MNQ…), so the P&L is Tradovate's own.
            quantity: qty,
            leverage: 1,
            positionSize: 0,
            fee: 0,
            profitLoss: Number(pnl.toFixed(2)),
            openedAt: long ? bought : sold,
            closedAt: long ? sold : bought,
            orderIds: [id],
            fills: 1,
            exits: 1,
            pnlSource: "exchange",
        });
    }
    return { trades, skipped, currency: trades.length ? "USD" : null };
}
