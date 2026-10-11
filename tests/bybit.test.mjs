// Run with: node --test tests/
import test from "node:test";
import assert from "node:assert/strict";
import { buildTrades, mergeTrades } from "../src/integrations/bybit/positions.ts";
import { createBybitClient, BybitApiError } from "../src/integrations/bybit/client.ts";

let n = 0;
const exec = (o) => ({ execId: `e${++n}`, orderId: `o${n}`, symbol: "BTCUSDT", side: "Buy", execPrice: 100, execQty: 1, closedSize: 0, execFee: 0, execTime: n * 1000, execType: "Trade", positionIdx: 0, ...o });
const pnl = (o) => ({ orderId: "x", symbol: "BTCUSDT", side: "Sell", qty: 1, leverage: 10, avgEntryPrice: 100, avgExitPrice: 110, cumEntryValue: 100, closedPnl: 9.8, openFee: 0.1, closeFee: 0.1, createdTime: 1, updatedTime: 2, ...o });

test("one entry and one exit make one trade", () => {
    const e = [exec({ execFee: 0.1 }), exec({ side: "Sell", execPrice: 110, closedSize: 1, execFee: 0.1, orderId: "close1" })];
    const { trades, openSince } = buildTrades("demo", e, [pnl({ orderId: "close1" })]);
    assert.equal(trades.length, 1);
    const t = trades[0];
    assert.deepEqual([t.direction, t.entryPrice, t.exitPrice, t.quantity, t.profitLoss, t.fee, t.pnlSource, t.fills, t.exits], ["Long", 100, 110, 1, 9.8, 0.2, "exchange", 1, 1]);
    assert.equal(t.openedAt, e[0].execTime);
    assert.equal(t.closedAt, e[1].execTime);
    assert.equal(openSince, null);
});

test("partial fills and partial exits stay one trade", () => {
    const e = [
        exec({ execPrice: 100, execQty: 1 }),
        exec({ execPrice: 102, execQty: 1 }),
        exec({ side: "Sell", execPrice: 110, execQty: 0.5, closedSize: 0.5, orderId: "c1" }),
        exec({ side: "Sell", execPrice: 112, execQty: 1.5, closedSize: 1.5, orderId: "c2" }),
    ];
    const { trades } = buildTrades("demo", e, [pnl({ orderId: "c1", closedPnl: 4, qty: 0.5 }), pnl({ orderId: "c2", closedPnl: 16, qty: 1.5 })]);
    assert.equal(trades.length, 1);
    const t = trades[0];
    assert.equal(t.quantity, 2);
    assert.equal(t.entryPrice, 101);
    assert.equal(t.exitPrice, 111.5);
    assert.equal(t.profitLoss, 20);
    assert.deepEqual([t.fills, t.exits, t.orderIds], [2, 2, ["c1", "c2"]]);
    assert.deepEqual(t.executions.map((x) => [x.kind, x.price, x.quantity]), [["entry", 100, 1], ["entry", 102, 1], ["exit", 110, 0.5], ["exit", 112, 1.5]]);
});

test("without closed P&L rows the result is computed from fills and labelled", () => {
    const e = [exec({ side: "Sell", execPrice: 50, execQty: 2, execFee: 0.2 }), exec({ side: "Buy", execPrice: 45, execQty: 2, closedSize: 2, execFee: 0.2 })];
    const { trades } = buildTrades("live", e, []);
    assert.deepEqual([trades[0].direction, trades[0].profitLoss, trades[0].fee, trades[0].pnlSource], ["Short", 9.6, 0.4, "computed"]);
});

test("an order that closes one position and opens the opposite one splits correctly", () => {
    const e = [exec({ execQty: 1, execPrice: 100 }), exec({ side: "Sell", execQty: 3, closedSize: 1, execPrice: 105, execFee: 0.3, orderId: "flip" }), exec({ side: "Buy", execQty: 2, closedSize: 2, execPrice: 95, orderId: "c2" })];
    const { trades } = buildTrades("demo", e, []);
    assert.equal(trades.length, 2);
    const [short, long] = trades;
    assert.deepEqual([long.direction, long.quantity, long.profitLoss], ["Long", 1, 4.9]);
    assert.deepEqual([short.direction, short.quantity, short.entryPrice, short.profitLoss], ["Short", 2, 105, 19.8]);
});

test("a position still open is not a journal trade and reports when it opened", () => {
    const e = [exec({ execTime: 5000 }), exec({ side: "Sell", execQty: 0.4, closedSize: 0.4, execTime: 6000 })];
    const { trades, openSince } = buildTrades("demo", e, []);
    assert.equal(trades.length, 0);
    assert.equal(openSince, 5000);
});

test("an exit opened before the history starts is kept, marked incomplete", () => {
    const e = [exec({ side: "Sell", closedSize: 1, orderId: "old" })];
    const { trades } = buildTrades("demo", e, [pnl({ orderId: "old", createdTime: 7 })]);
    assert.equal(trades.length, 1);
    assert.equal(trades[0].incomplete, true);
    assert.equal(trades[0].openedAt, undefined);
    assert.equal(trades[0].profitLoss, 9.8);
});

test("the same execution received twice is counted once", () => {
    const a = exec({ execId: "dup" });
    const b = exec({ side: "Sell", closedSize: 1, execPrice: 110, execId: "dup2", orderId: "c" });
    const { trades } = buildTrades("demo", [a, a, b, b, a], []);
    assert.equal(trades.length, 1);
    assert.equal(trades[0].quantity, 1);
    assert.equal(trades[0].profitLoss, 10);
});

test("hedge-mode sides and different symbols are tracked separately", () => {
    const e = [
        exec({ positionIdx: 1 }),
        exec({ side: "Sell", positionIdx: 2, execPrice: 100 }),
        exec({ symbol: "ETHUSDT", execPrice: 10 }),
        exec({ side: "Sell", positionIdx: 1, closedSize: 1, execPrice: 104 }),
        exec({ side: "Buy", positionIdx: 2, closedSize: 1, execPrice: 97 }),
    ];
    const { trades, openSince } = buildTrades("demo", e, []);
    assert.deepEqual(trades.map((t) => [t.instrument, t.direction, t.profitLoss]).sort(), [["BTCUSDT", "Long", 4], ["BTCUSDT", "Short", 3]]);
    assert.equal(openSince, e[2].execTime);
});

test("funding is attached to the open position, not added to P&L", () => {
    const e = [exec({}), exec({ execType: "Funding", execQty: 0, execFee: 0.05 }), exec({ side: "Sell", closedSize: 1, execPrice: 110 })];
    const { trades } = buildTrades("demo", e, []);
    assert.equal(trades[0].funding, 0.05);
    assert.equal(trades[0].profitLoss, 10);
});

test("repeated and overlapping imports never duplicate, and a full rebuild replaces an incomplete exit", () => {
    const opening = exec({ execTime: 1000 });
    const closing = exec({ side: "Sell", closedSize: 1, execPrice: 110, orderId: "c9", execTime: 9000 });
    const row = pnl({ orderId: "c9" });
    // First import only saw the exit.
    const first = buildTrades("demo", [closing], [row]).trades;
    assert.equal(first[0].incomplete, true);
    let stored = mergeTrades([], first);
    stored = mergeTrades(stored, first);
    assert.equal(stored.length, 1);
    // A wider import sees the whole position.
    const second = buildTrades("demo", [opening, closing], [row]).trades;
    stored = mergeTrades(stored, second);
    stored = mergeTrades(stored, second);
    assert.equal(stored.length, 1);
    assert.equal(stored[0].incomplete, undefined);
    assert.equal(stored[0].openedAt, 1000);
    // Trades recorded elsewhere are left alone.
    stored = mergeTrades([{ id: "rules-1", closedAt: 5 }, ...stored], second);
    assert.equal(stored.length, 2);
});

// ---- client, against a scripted Bybit ----
const reply = (result, retCode = 0, retMsg = "OK") => new Response(JSON.stringify({ retCode, retMsg, result }), { status: 200 });
const creds = { env: "live", apiKey: "KEY", apiSecret: "SECRET" };
const fake = (handler) => {
    const calls = [];
    const fetch = async (url, init) => {
        calls.push({ url: new URL(url), init });
        return handler(new URL(url), calls.length);
    };
    return { fetch, calls, sleep: async () => {}, now: () => 1_700_000_000_000 };
};

test("requests are signed GETs and never carry the secret", async () => {
    const f = fake(() => reply({ readOnly: 1, permissions: { ContractTrade: [] }, userID: 42, note: "journal" }));
    const account = await createBybitClient(creds, f).account();
    assert.deepEqual(account, { readOnlyVerified: true, userId: "42", keyNote: "journal", expiresAt: null });
    const { url, init } = f.calls[0];
    assert.equal(init.method, "GET");
    assert.equal(url.pathname, "/v5/user/query-api");
    assert.equal(init.headers["X-BAPI-API-KEY"], "KEY");
    assert.match(init.headers["X-BAPI-SIGN"], /^[0-9a-f]{64}$/);
    assert.ok(!JSON.stringify(init).includes("SECRET") && !url.href.includes("SECRET"));
});

test("a key that can trade or withdraw is refused", async () => {
    for (const info of [{ readOnly: 0, permissions: {} }, { readOnly: 1, permissions: { Wallet: ["Withdraw"] } }]) {
        await assert.rejects(createBybitClient(creds, fake(() => reply(info))).account(), (e) => e instanceof BybitApiError && e.kind === "permissions");
    }
});

test("a live key whose permissions cannot be read is refused; demo falls back to an authenticated read", async () => {
    await assert.rejects(createBybitClient(creds, fake(() => reply({}, 10005, "denied"))).account(), (e) => e.kind === "permissions");
    const f = fake((url) => (url.pathname === "/v5/user/query-api" ? reply({}, 10001, "not supported") : reply({ list: [] })));
    assert.deepEqual(await createBybitClient({ ...creds, env: "demo" }, f).account(), { readOnlyVerified: false, userId: null, keyNote: null, expiresAt: null });
    assert.equal(f.calls[1].url.host, "api-demo.bybit.com");
});

test("wrong credentials, IP restriction, expiry and region blocks each give their own error", async () => {
    const kind = async (handler) => createBybitClient(creds, fake(handler)).account().catch((e) => e.kind);
    assert.equal(await kind(() => reply({}, 10003, "invalid key")), "credentials");
    assert.equal(await kind(() => reply({}, 10004, "bad sign")), "credentials");
    assert.equal(await kind(() => reply({}, 10010, "ip")), "ip");
    assert.equal(await kind(() => reply({}, 33004, "expired")), "expired");
    assert.equal(await kind(() => new Response("", { status: 403 })), "region");
    assert.equal(await kind(() => new Response("", { status: 401 })), "credentials");
});

test("rate limits and network drops are retried, then succeed", async () => {
    const f = fake((_, i) => {
        if (i === 1) return reply({}, 10006, "too many");
        if (i === 2) throw new Error("socket");
        return reply({ list: [] });
    });
    assert.deepEqual(await createBybitClient(creds, f).positions(), []);
    assert.equal(f.calls.length, 3);
    const g = fake(() => new Response("", { status: 429 }));
    await assert.rejects(createBybitClient(creds, g).positions(), (e) => e.kind === "rate-limit" && e.retryable);
    assert.equal(g.calls.length, 3);
});

test("history is read in 7-day windows, following every page, and becomes journal trades", async () => {
    const day = 86400000;
    const to = 1_700_000_000_000;
    const from = to - 10 * day;
    const f = fake((url) => {
        const p = url.searchParams;
        if (url.pathname === "/v5/position/list") return reply({ list: [{ symbol: "ETHUSDT", side: "Sell", size: "2", avgPrice: "2000", markPrice: "1990", leverage: "5", positionValue: "4000", unrealisedPnl: "20", createdTime: "1" }, { symbol: "XRPUSDT", side: "", size: "0" }] });
        const recent = Number(p.get("endTime")) === to;
        if (url.pathname === "/v5/execution/list") {
            if (!recent) return reply({ list: [{ execId: "a", orderId: "o-a", symbol: "BTCUSDT", side: "Buy", execPrice: "100", execQty: "1", closedSize: "0", execFee: "0.05", execTime: String(from + day), execType: "Trade", positionIdx: "0" }] });
            if (!p.get("cursor")) return reply({ list: [{ execId: "b", orderId: "o-b", symbol: "BTCUSDT", side: "Sell", execPrice: "110", execQty: "0.4", closedSize: "0.4", execFee: "0.02", execTime: String(to - day), execType: "Trade", positionIdx: "0" }], nextPageCursor: "page2" });
            return reply({ list: [{ execId: "c", orderId: "o-b", symbol: "BTCUSDT", side: "Sell", execPrice: "111", execQty: "0.6", closedSize: "0.6", execFee: "0.03", execTime: String(to - day + 5), execType: "Trade", positionIdx: "0" }], nextPageCursor: "" });
        }
        if (url.pathname === "/v5/position/closed-pnl") return reply({ list: recent ? [{ orderId: "o-b", symbol: "BTCUSDT", side: "Sell", qty: "1", leverage: "10", avgEntryPrice: "100", avgExitPrice: "110.6", cumEntryValue: "100", closedPnl: "10.5", openFee: "0.05", closeFee: "0.05", createdTime: String(to - day), updatedTime: String(to - day + 5) }] : [] });
        return reply({}, 10001, "unexpected");
    });
    const result = await createBybitClient(creds, f).sync(from, to);
    const windows = f.calls.filter((c) => c.url.pathname === "/v5/execution/list").map((c) => [Number(c.url.searchParams.get("endTime")) - Number(c.url.searchParams.get("startTime")), c.url.searchParams.get("cursor")]);
    assert.deepEqual(windows, [[7 * day, null], [7 * day, "page2"], [3 * day, null]]);
    assert.ok(f.calls.every((c) => c.init.method === "GET"));
    assert.equal(result.executions, 3);
    assert.equal(result.trades.length, 1);
    const t = result.trades[0];
    assert.deepEqual([t.id, t.instrument, t.direction, t.quantity, t.entryPrice, t.exitPrice, t.profitLoss, t.fee, t.leverage, t.exits, t.pnlSource], ["bybit:live:BTCUSDT:a", "BTCUSDT", "Long", 1, 100, 110.6, 10.5, 0.1, 10, 2, "exchange"]);
    assert.deepEqual(result.positions, [{ instrument: "ETHUSDT", direction: "Short", entryPrice: 2000, markPrice: 1990, quantity: 2, leverage: 5, positionSize: 4000, unrealisedPnl: 20, openedAt: 1 }]);
});
