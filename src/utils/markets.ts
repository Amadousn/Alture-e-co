// The markets the terminal offers, each with where its prices come from and
// what the trader can do with it. Every symbol here was checked on Bybit's public
// instruments list (category linear, status Trading) on 2026-11-06.
//
// Market data and execution are kept apart: all of these are read from Bybit's
// public data, and AltureLock never places orders, so every market is view-only
// here whatever account the trader connects.

export type MarketGroup = "Crypto" | "Indices" | "Commodities" | "Crypto stocks";

export type Market = {
    symbol: string; // Bybit symbol, e.g. CLUSDT
    name: string; // what a trader calls it
    tracks?: string; // what the contract follows, when it is not the asset itself
    group: MarketGroup;
};

export const MARKET_SOURCE = { data: "Bybit public market data", contract: "USDT perpetual", execution: "View only" } as const;

export const MARKETS: Market[] = [
    { symbol: "BTCUSDT", name: "Bitcoin", group: "Crypto" },
    { symbol: "ETHUSDT", name: "Ethereum", group: "Crypto" },
    { symbol: "SOLUSDT", name: "Solana", group: "Crypto" },
    { symbol: "XRPUSDT", name: "XRP", group: "Crypto" },
    { symbol: "HYPEUSDT", name: "Hyperliquid", group: "Crypto" },
    // ETF trackers: QQQ follows the Nasdaq 100, SPY the S&P 500. SPXUSDT on Bybit is the SPX6900 token, not the index.
    { symbol: "QQQUSDT", name: "Nasdaq 100", tracks: "QQQ ETF", group: "Indices" },
    { symbol: "SPYUSDT", name: "S&P 500", tracks: "SPY ETF", group: "Indices" },
    { symbol: "CLUSDT", name: "WTI Crude Oil", tracks: "CL", group: "Commodities" },
    { symbol: "BZUSDT", name: "Brent Crude Oil", tracks: "BZ", group: "Commodities" },
    { symbol: "XAUUSDT", name: "Gold", tracks: "XAU", group: "Commodities" },
    { symbol: "XAGUSDT", name: "Silver", tracks: "XAG", group: "Commodities" },
    { symbol: "MSTRUSDT", name: "Strategy", tracks: "MSTR", group: "Crypto stocks" },
    { symbol: "COINUSDT", name: "Coinbase", tracks: "COIN", group: "Crypto stocks" },
    { symbol: "CRCLUSDT", name: "Circle", tracks: "CRCL", group: "Crypto stocks" },
    { symbol: "HOODUSDT", name: "Robinhood", tracks: "HOOD", group: "Crypto stocks" },
    { symbol: "IBITUSDT", name: "iShares Bitcoin Trust", tracks: "IBIT ETF", group: "Crypto stocks" },
];

export const MARKET_GROUPS: MarketGroup[] = ["Crypto", "Indices", "Commodities", "Crypto stocks"];

export const marketFor = (symbol: string): Market | null => MARKETS.find((market) => market.symbol === symbol.toUpperCase()) ?? null;

// The name to show: the catalogue's, otherwise the coin itself (any other Bybit USDT perpetual is a crypto).
export const marketName = (symbol: string) => marketFor(symbol)?.name ?? symbol.toUpperCase().replace(/USDT$/, "");

// Search over the catalogue first, then over every live Bybit symbol.
export function searchMarkets(query: string, liveSymbols: string[]): string[] {
    const text = query.trim().toUpperCase();
    if (!text) return [];
    const named = MARKETS.filter((m) => m.name.toUpperCase().split(/[^A-Z0-9&]+/).some((word) => word.startsWith(text)) || m.symbol.startsWith(text) || (m.tracks ?? "").toUpperCase().startsWith(text)).map((m) => m.symbol);
    const others = liveSymbols.filter((s) => s.replace(/USDT$/, "").startsWith(text) && !named.includes(s));
    return [...named, ...others];
}
