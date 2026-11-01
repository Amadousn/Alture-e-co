// Reads an Interactive Brokers Activity Statement saved as CSV
// (Performance & Reports → Statements → Activity → Download CSV).
//
// The statement's "Trades" section lists every execution with its signed
// quantity, price, commission and IBKR's own realised P/L. Executions are
// rebuilt into whole positions with the same replay as the exchanges.
// Columns are found by their names in the section's header row.

import { buildBinanceTrades, type BinanceFill } from "../binance/positions.ts";
import type { FileImport } from "./mt5.ts";

// Splits one CSV line, honouring quoted fields ("2026-10-01, 09:30:00").
export function csvLine(line: string): string[] {
    const cells: string[] = [];
    let cell = "";
    let quoted = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (quoted) {
            if (c === '"' && line[i + 1] === '"') (cell += '"'), i++;
            else if (c === '"') quoted = false;
            else cell += c;
        } else if (c === '"') quoted = true;
        else if (c === ",") cells.push(cell), (cell = "");
        else cell += c;
    }
    cells.push(cell);
    return cells.map((value) => value.trim());
}

const number = (value: string | undefined) => {
    const parsed = Number((value ?? "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : NaN;
};
// "2026-10-01, 09:30:00" or "20261001;093000" → milliseconds, read as UTC.
const time = (value: string) => {
    const m = value.match(/(\d{4})-?(\d{2})-?(\d{2})[,; ]+(\d{2}):?(\d{2}):?(\d{2})?/);
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] ?? 0)) : NaN;
};

export function parseIbkr(text: string): FileImport {
    const lines = text.split(/\r?\n/).filter(Boolean).map(csvLine);
    const fills: BinanceFill[] = [];
    let header: string[] | null = null;
    let skipped = 0;
    let id = 0;
    const currencies = new Set<string>();

    for (const cells of lines) {
        if (cells[0] !== "Trades") continue;
        if (cells[1] === "Header") {
            header = cells.map((cell) => cell.toLowerCase());
            continue;
        }
        if (cells[1] !== "Data" || !header) continue;
        const get = (name: string) => cells[header!.indexOf(name)];
        if ((get("datadiscriminator") ?? "Order") !== "Order") continue;
        const category = get("asset category") ?? "";
        const quantity = number(get("quantity"));
        const price = number(get("t. price"));
        const at = time(get("date/time") ?? "");
        // Options and futures need a multiplier the statement does not repeat per row.
        if (!/stocks|etf|forex|crypto/i.test(category) || !Number.isFinite(quantity) || quantity === 0 || !Number.isFinite(price) || !Number.isFinite(at)) {
            skipped += 1;
            continue;
        }
        const commission = Math.abs(number(get("comm/fee")) || number(get("comm in usd")) || 0);
        const realised = number(get("realized p/l")) || 0;
        const currency = get("currency") ?? "USD";
        currencies.add(currency);
        fills.push({
            id: ++id,
            orderId: id,
            symbol: (get("symbol") ?? "").toUpperCase(),
            side: quantity > 0 ? "BUY" : "SELL",
            positionSide: "BOTH",
            price,
            qty: Math.abs(quantity),
            realizedPnl: realised,
            commission,
            commissionAsset: currency,
            feeInQuote: true,
            time: at,
        });
    }
    if (!header) throw new Error("No Trades section was found. Download the Activity Statement from Interactive Brokers as CSV, not PDF.");

    const built = buildBinanceTrades(fills);
    // IBKR's realised P/L already has both commissions taken off (the opening one sits in the cost basis),
    // so the builder's own fee deduction is undone: the result is IBKR's figure, the fee is shown alongside.
    const trades = built.trades.map(({ source: _source, provider: _provider, ...trade }) => ({ ...trade, id: trade.id.replace(/^binance-/, "ibkr-"), profitLoss: Number((trade.profitLoss + trade.fee).toFixed(2)) }));
    return { trades, skipped, currency: currencies.size === 1 ? [...currencies][0] : null };
}
