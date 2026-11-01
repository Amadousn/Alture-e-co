import type { ProviderCapabilities, ProviderDefinition } from "./types";

const NONE: ProviderCapabilities = { historicalImport: false, incrementalSync: false, openPositions: false, fees: false, funding: false, realisedPnl: false };

// Every provider AltureLock supports or has evaluated. Adding one means an
// entry here and a server adapter in ./server.ts; the screens read this list.
// A provider is "available" only once its adapter exists.
export const PROVIDERS: ProviderDefinition[] = [
    {
        id: "bybit",
        name: "Bybit",
        category: "Crypto exchanges",
        availability: "available",
        access: "Read-only API key",
        capabilities: { historicalImport: true, incrementalSync: true, openPositions: true, fees: true, funding: true, realisedPnl: true },
        summary: "USDT perpetual futures. Fills are read from Bybit and rebuilt into whole positions, so partial entries and exits stay one trade. Results and fees use Bybit's own closed P&L figures.",
        requirements: ["A Bybit API key created as Read-Only.", "Bybit blocks some countries and hosting regions."],
    },
    {
        id: "binance",
        name: "Binance",
        category: "Crypto exchanges",
        availability: "available",
        access: "Read-only API key",
        capabilities: { historicalImport: true, incrementalSync: true, openPositions: true, fees: true, funding: false, realisedPnl: true },
        summary: "USDⓈ-M futures. Every fill is read from Binance and rebuilt into whole positions, so partial entries and exits stay one trade. Results use Binance's own realised profit, minus the fees paid.",
        requirements: ["A Binance API key with only Enable Reading ticked.", "Binance.com is not available in every country or hosting region.", "Fees paid in BNB are not counted, since they need a BNB price."],
    },
    {
        id: "okx",
        name: "OKX",
        category: "Crypto exchanges",
        availability: "available",
        access: "Read-only API key and passphrase",
        capabilities: { historicalImport: true, incrementalSync: true, openPositions: true, fees: true, funding: true, realisedPnl: true },
        summary: "Perpetual swaps. OKX reports each position from open to close, and AltureLock imports it as one trade with OKX's own realised result, fees and funding.",
        requirements: ["An OKX API key with Read permission only, plus its passphrase.", "OKX keeps three months of position history."],
    },
    {
        id: "hyperliquid",
        name: "Hyperliquid",
        category: "Crypto exchanges",
        availability: "available",
        access: "Wallet address, no key",
        capabilities: { historicalImport: true, incrementalSync: true, openPositions: true, fees: true, funding: false, realisedPnl: true },
        summary: "Perpetuals. Hyperliquid's history is public on its chain, so only your wallet address is needed: no key, no signature, nothing that could ever trade. Fills are rebuilt into whole positions with Hyperliquid's own realised profit and fees.",
        requirements: ["The wallet address you trade with on Hyperliquid."],
    },
    {
        id: "bitget",
        name: "Bitget",
        category: "Crypto exchanges",
        availability: "planned",
        access: "Read-only API key and passphrase",
        capabilities: NONE,
        summary: "Bitget reports whole futures positions with their results. The import is written; it opens once AltureLock can confirm, with a real key, that it refuses every key able to trade.",
        requirements: ["A Bitget API key with read-only permissions, plus its passphrase."],
    },
    {
        id: "tradovate",
        name: "Tradovate",
        category: "Futures trading",
        availability: "planned",
        access: "Tradovate API access",
        capabilities: NONE,
        summary: "Tradovate has an API with fills and positions, but access is not open by default: it needs Tradovate's API access add-on and an application registered with Tradovate.",
        requirements: ["Tradovate API access on the trader's account.", "An AltureLock application registered with Tradovate."],
    },
    {
        id: "ninjatrader",
        name: "NinjaTrader",
        category: "Futures trading",
        availability: "planned",
        access: "File import from the desktop platform",
        capabilities: NONE,
        summary: "NinjaTrader is a desktop platform. There is no online account-history service a website can connect to, so the realistic route is importing the executions file it exports.",
        requirements: ["An executions export from NinjaTrader."],
    },
    {
        id: "metatrader5",
        name: "MetaTrader 5",
        category: "Forex / CFD trading",
        availability: "planned",
        access: "History report import",
        capabilities: NONE,
        summary: "MetaTrader 5's official integration only runs on a Windows computer with the terminal open and logged in. It is not an online service, so a website cannot connect to it directly. The realistic route is importing the account history report.",
        requirements: ["A history report exported from the MetaTrader 5 terminal."],
    },
    {
        id: "tradingview",
        name: "TradingView",
        category: "Charting and trading",
        availability: "planned",
        access: "Alerts, or the broker behind your TradingView trades",
        capabilities: NONE,
        summary: "TradingView does not offer a way for another product to read your orders or account history. Its webhook alerts can send a message when an alert fires, but an alert is a signal, not a confirmed fill. If you trade a supported exchange through TradingView, connect that exchange here: the real fills come from it, and each is imported once.",
        requirements: ["For alert capture: a TradingView plan with webhook alerts.", "For real fills: a connection to the broker or exchange that executes the trades."],
    },
];

export const providerFor = (id: string) => PROVIDERS.find((provider) => provider.id === id) ?? null;
