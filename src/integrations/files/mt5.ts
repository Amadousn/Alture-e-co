// Reads a MetaTrader 5 account history report (Report → HTML, from the History tab).
//
// The report holds a "Positions" table: one row per closed position, with its
// open and close times and prices, volume in lots, commission, swap and profit.
// Columns are found by their names, so a broker that adds or moves a column
// still reads correctly. Times are the broker's server time, as MT5 prints them.

import type { ImportedTrade } from "../bybit/positions.ts";

export type FileImport = { trades: Omit<ImportedTrade, "source" | "provider">[]; skipped: number; currency: string | null };

const number = (value: string) => {
    const parsed = Number(value.replace(/\s/g, "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : NaN;
};
// "2026.10.01 09:30:15" → milliseconds, read as UTC.
const time = (value: string) => {
    const m = value.trim().match(/^(\d{4})\.(\d{2})\.(\d{2})(?:\s+(\d{2}):(\d{2})(?::(\d{2}))?)?/);
    return m ? Date.UTC(+m[1], +m[2] - 1, +m[3], +(m[4] ?? 0), +(m[5] ?? 0), +(m[6] ?? 0)) : NaN;
};

// Rows of the report as plain cell text, from the HTML (UTF-16 or UTF-8).
export function rowsFromHtml(html: string): string[][] {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return [...doc.querySelectorAll("tr")].map((tr) => [...tr.querySelectorAll("td,th")].flatMap((cell) => Array(Number(cell.getAttribute("colspan")) || 1).fill("").map((_, i) => (i === 0 ? (cell.textContent ?? "").trim() : ""))));
}

export function parseMt5(rows: string[][]): FileImport {
    const currency = rows.flat().find((cell) => /^Currency:/i.test(cell))?.split(":")[1]?.trim() || null;
    const start = rows.findIndex((row) => row.filter(Boolean).length === 1 && /^positions$/i.test(row.find(Boolean) ?? ""));
    if (start < 0) throw new Error("No Positions table was found. In MetaTrader 5, open the History tab, choose Positions, then right-click → Report → HTML.");
    const header = rows[start + 1].map((cell) => cell.toLowerCase());
    // The header repeats Time and Price for the open and the close.
    const at = (name: string, nth = 0) => header.reduce<number[]>((list, cell, i) => (cell.replace(/\s/g, "") === name ? [...list, i] : list), [])[nth] ?? -1;
    const col = { open: at("time"), id: at("position"), symbol: at("symbol"), type: at("type"), volume: at("volume"), openPrice: at("price"), close: at("time", 1), closePrice: at("price", 1), commission: at("commission"), swap: at("swap"), profit: at("profit") };
    if ([col.open, col.symbol, col.type, col.volume, col.openPrice, col.close, col.closePrice, col.profit].some((i) => i < 0)) throw new Error("The Positions table does not have the columns MetaTrader 5 normally writes. Export the report again as HTML from the History tab.");

    const trades: FileImport["trades"] = [];
    let skipped = 0;
    for (const row of rows.slice(start + 2)) {
        const filled = row.filter(Boolean);
        if (filled.length <= 1) break; // the next section ("Orders") begins
        const type = row[col.type]?.toLowerCase();
        if (type !== "buy" && type !== "sell") {
            skipped += 1;
            continue;
        }
        const openedAt = time(row[col.open]);
        const closedAt = time(row[col.close]);
        const entry = number(row[col.openPrice]);
        const exit = number(row[col.closePrice]);
        const lots = number(row[col.volume].split("/")[0]);
        const commission = col.commission >= 0 ? number(row[col.commission]) || 0 : 0;
        const swap = col.swap >= 0 ? number(row[col.swap]) || 0 : 0;
        const profit = number(row[col.profit]);
        if ([openedAt, closedAt, entry, exit, lots, profit].some((v) => !Number.isFinite(v))) {
            skipped += 1;
            continue;
        }
        const id = row[col.id] || `${row[col.symbol]}-${openedAt}`;
        trades.push({
            id: `mt5-${id}`,
            instrument: row[col.symbol].toUpperCase(),
            direction: type === "buy" ? "Long" : "Short",
            entryPrice: entry,
            exitPrice: exit,
            // MetaTrader volume is in lots; the size of a lot depends on the broker and the symbol.
            quantity: lots,
            leverage: 1,
            positionSize: 0,
            fee: Math.abs(commission),
            profitLoss: Number((profit + commission + swap).toFixed(2)),
            openedAt,
            closedAt,
            orderIds: [id],
            fills: 1,
            exits: 1,
            funding: -swap,
            pnlSource: "exchange",
        });
    }
    return { trades, skipped, currency };
}
