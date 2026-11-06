import { test } from "node:test";
import assert from "node:assert/strict";
import { MARKETS, marketFor, marketName, searchMarkets } from "../src/utils/markets.ts";

test("every market is a Bybit USDT symbol, listed once", () => {
    for (const m of MARKETS) assert.match(m.symbol, /^[A-Z0-9]{2,20}USDT$/);
    assert.equal(new Set(MARKETS.map((m) => m.symbol)).size, MARKETS.length);
});

test("SPXUSDT is never presented as the S&P 500", () => {
    assert.equal(marketFor("SPXUSDT"), null);
    assert.equal(marketName("SPXUSDT"), "SPX");
    assert.equal(marketFor("SPYUSDT")?.name, "S&P 500");
});

test("oil search finds WTI and Brent, by name or contract code", () => {
    assert.deepEqual(searchMarkets("oil", []), ["CLUSDT", "BZUSDT"]);
    assert.deepEqual(searchMarkets("cl", ["CLUSDT", "CLANKERUSDT"]), ["CLUSDT", "CLANKERUSDT"]);
    assert.ok(searchMarkets("brent", []).includes("BZUSDT"));
});

test("an unknown live coin is found by its ticker", () => {
    assert.deepEqual(searchMarkets("pepe", ["1000PEPEUSDT", "PEPEUSDT"]), ["PEPEUSDT"]);
});
