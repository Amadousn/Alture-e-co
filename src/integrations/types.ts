// The shared vocabulary of AltureLock's trading-platform connections.
//
// AltureLock journals trades; it never places them. Every connection is
// read-only, and each provider declares only what it can really do.

export type ProviderId = "bybit" | "binance" | "okx" | "tradovate" | "ninjatrader" | "metatrader5" | "tradingview";

export type ProviderCategory = "Crypto exchanges" | "Futures trading" | "Forex / CFD trading" | "Charting and trading";

// What a provider's adapter supports today. False means not built, whatever the provider itself offers.
export type ProviderCapabilities = {
    historicalImport: boolean;
    incrementalSync: boolean;
    openPositions: boolean;
    fees: boolean;
    funding: boolean;
    realisedPnl: boolean;
};

export type ProviderDefinition = {
    id: ProviderId;
    // The provider's exact product name.
    name: string;
    category: ProviderCategory;
    // "available": a working connection exists. "planned": evaluated, not built.
    availability: "available" | "planned";
    // How a connection would be authorised.
    access: string;
    capabilities: ProviderCapabilities;
    // What was found when the provider was evaluated, in plain words.
    summary: string;
    // Anything the trader or Alture & Co. must have before it can work.
    requirements: string[];
};

// The only states the interface may show, each tied to something that really happened.
export type ConnectionStatus = "not-connected" | "connecting" | "connected" | "syncing" | "synced" | "sync-failed";

// What the server will say about a stored connection. Never contains a secret.
export type ConnectionSummary = {
    provider: ProviderId;
    environment: string;
    // Last four characters of the API key, for recognising it.
    keyHint: string;
    // The account id reported by the provider, masked. Null when the provider did not report one.
    accountHint: string | null;
    readOnlyVerified: boolean;
    keyExpiresAt: string | null;
    connectedAt: number;
};

export type SyncFailure = { message: string; retryable: boolean; reconnect: boolean };
