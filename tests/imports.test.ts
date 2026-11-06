import { test } from "node:test";
import assert from "node:assert/strict";
import { buildTrades, mergeTrades, type BybitExecution, type BybitClosedPnl } from "../src/integrations/bybit/positions.ts";
import { parseIbkr } from "../src/integrations/files/ibkr.ts";
import { parseMt5 } from "../src/integrations/files/mt5.ts";

const exec = (id: string, orderId: string, side: "Buy" | "Sell", price: number, qty: number, closed: number, fee: number, t: number): BybitExecution => ({
    execId: id, orderId, symbol: "BTCUSDT", side, execPrice: price, execQty: qty, closedSize: closed, execFee: fee, execTime: t, execType: "Trade", positionIdx: 0,
});

test("Bybit: a long opened and closed becomes one trade with the exchange's P&L", () => {
    const executions = [exec("e1", "o1", "Buy", 100, 1, 0, 0.1, 1000), exec("e2", "o2", "Sell", 110, 1, 1, 0.11, 2000)];
    const pnl: BybitClosedPnl[] = [{ orderId: "o2", symbol: "BTCUSDT", side: "Sell", qty: 1, leverage: 10, avgEntryPrice: 100, avgExitPrice: 110, cumEntryValue: 100, closedPnl: 9.79, openFee: 0.1, closeFee: 0.11, createdTime: 2000, updatedTime: 2000 }];
    const { trades } = buildTrades("main", executions, pnl);
    assert.equal(trades.length, 1);
    const t = trades[0];
    assert.equal(t.direction, "Long");
    assert.equal(t.entryPrice, 100);
    assert.equal(t.exitPrice, 110);
    assert.equal(t.quantity, 1);
    assert.equal(t.leverage, 10);
    assert.equal(t.profitLoss, 9.79);
    assert.equal(t.pnlSource, "exchange");
});

test("Bybit: a short scaled in twice averages the entry", () => {
    const executions = [exec("e1", "o1", "Sell", 100, 1, 0, 0, 1000), exec("e2", "o2", "Sell", 110, 1, 0, 0, 1500), exec("e3", "o3", "Buy", 90, 2, 2, 0, 2000)];
    const { trades } = buildTrades("main", executions, []);
    assert.equal(trades.length, 1);
    assert.equal(trades[0].direction, "Short");
    assert.equal(trades[0].entryPrice, 105);
    assert.equal(trades[0].quantity, 2);
    assert.equal(trades[0].profitLoss, 30); // (105 − 90) × 2, no fees
});

test("importing the same trades twice never doubles them", () => {
    const one = { id: "x", closedAt: 1, orderIds: ["o"] };
    assert.equal(mergeTrades([one], [one]).length, 1);
});

test("IBKR statement: a stock bought and sold keeps IBKR's realised P/L", () => {
    const csv = [
        "Trades,Header,DataDiscriminator,Asset Category,Currency,Symbol,Date/Time,Quantity,T. Price,Comm/Fee,Realized P/L",
        'Trades,Data,Order,Stocks,USD,AAPL,"2026-10-01, 09:30:00",10,100,-1,0',
        'Trades,Data,Order,Stocks,USD,AAPL,"2026-10-02, 15:00:00",-10,110,-1,98',
        'Trades,Data,Order,Equity and Index Options,USD,AAPL 1,"2026-10-02, 15:00:00",1,2,-1,0',
    ].join("\n");
    const r = parseIbkr(csv);
    assert.equal(r.trades.length, 1);
    assert.equal(r.trades[0].direction, "Long");
    assert.equal(r.trades[0].profitLoss, 98);
    assert.equal(r.skipped, 1);
    assert.equal(r.currency, "USD");
});

test("MT5 report: profit includes commission and swap", () => {
    const rows = [
        ["Currency: USD"],
        ["Positions"],
        ["Time", "Position", "Symbol", "Type", "Volume", "Price", "S / L", "T / P", "Time", "Price", "Commission", "Swap", "Profit"],
        ["2026.10.01 09:30:00", "1", "eurusd", "buy", "1", "1.1000", "", "", "2026.10.01 12:00:00", "1.1050", "-7", "-1", "500"],
        ["Orders"],
    ];
    const r = parseMt5(rows);
    assert.equal(r.trades.length, 1);
    assert.equal(r.trades[0].instrument, "EURUSD");
    assert.equal(r.trades[0].profitLoss, 492);
    assert.equal(r.trades[0].closedAt, Date.UTC(2026, 9, 1, 12));
    assert.equal(r.currency, "USD");
});
