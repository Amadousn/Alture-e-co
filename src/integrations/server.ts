// Server-side adapters, one per provider with a working connection.

import { BybitApiError, createBybitClient, type BybitCredentials } from "./bybit/client.ts";
import { BinanceApiError, createBinanceClient, type BinanceCredentials } from "./binance/client.ts";
import type { ConnectionSummary, ProviderId, SyncFailure } from "./types";

export class ConnectionError extends Error {
    failure: SyncFailure;
    status: number;
    constructor(failure: SyncFailure, status = 400) {
        super(failure.message);
        this.failure = failure;
        this.status = status;
    }
}

export type ServerAdapter<Stored> = {
    // Checks what the trader typed against the provider. Returns what to keep sealed, or throws.
    connect(input: unknown): Promise<{ stored: Stored; summary: ConnectionSummary }>;
    describe(stored: Stored): ConnectionSummary;
    sync(stored: Stored, since: number): Promise<unknown>;
};

type BybitStored = BybitCredentials & { summary: ConnectionSummary };

const mask = (value: string) => (value.length <= 4 ? "••••" : `••••${value.slice(-4)}`);

function fromBybit(error: unknown): ConnectionError {
    if (error instanceof BybitApiError) {
        const reconnect = error.kind === "credentials" || error.kind === "permissions" || error.kind === "expired" || error.kind === "ip";
        return new ConnectionError({ message: error.message, retryable: error.retryable, reconnect }, error.kind === "rate-limit" ? 429 : reconnect ? 401 : 502);
    }
    return new ConnectionError({ message: "Something went wrong while talking to Bybit. Try again.", retryable: true, reconnect: false }, 502);
}

const DAY = 24 * 60 * 60 * 1000;
// How far back a first import reaches, and the furthest any request may reach.
export const FIRST_IMPORT_DAYS = 90;
const MAX_IMPORT_DAYS = 180;

const bybit: ServerAdapter<BybitStored> = {
    async connect(input) {
        const body = (input ?? {}) as Record<string, unknown>;
        const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
        const apiSecret = typeof body.apiSecret === "string" ? body.apiSecret.trim() : "";
        const env = body.environment === "live" ? "live" : "demo";
        if (apiKey.length < 8 || apiSecret.length < 8 || apiKey.length > 128 || apiSecret.length > 128) {
            throw new ConnectionError({ message: "Enter both the API key and the API secret exactly as Bybit shows them.", retryable: false, reconnect: true });
        }
        try {
            const account = await createBybitClient({ env, apiKey, apiSecret }).account();
            const summary: ConnectionSummary = {
                provider: "bybit",
                environment: env === "live" ? "Live" : "Demo trading",
                keyHint: mask(apiKey),
                accountHint: account.userId ? mask(account.userId) : null,
                readOnlyVerified: account.readOnlyVerified,
                keyExpiresAt: account.expiresAt,
                connectedAt: Date.now(),
            };
            return { stored: { env, apiKey, apiSecret, summary }, summary };
        } catch (error) {
            throw fromBybit(error);
        }
    },
    describe: (stored) => stored.summary,
    async sync(stored, since) {
        const now = Date.now();
        const from = Math.max(Number.isFinite(since) && since > 0 ? since : now - FIRST_IMPORT_DAYS * DAY, now - MAX_IMPORT_DAYS * DAY);
        try {
            return await createBybitClient(stored).sync(from, now);
        } catch (error) {
            throw fromBybit(error);
        }
    },
};

type BinanceStored = BinanceCredentials & { summary: ConnectionSummary };

function fromBinance(error: unknown): ConnectionError {
    if (error instanceof BinanceApiError) {
        const reconnect = error.kind === "credentials" || error.kind === "permissions" || error.kind === "ip";
        return new ConnectionError({ message: error.message, retryable: error.retryable, reconnect }, error.kind === "rate-limit" ? 429 : reconnect ? 401 : 502);
    }
    return new ConnectionError({ message: "Something went wrong while talking to Binance. Try again.", retryable: true, reconnect: false }, 502);
}

const binance: ServerAdapter<BinanceStored> = {
    async connect(input) {
        const body = (input ?? {}) as Record<string, unknown>;
        const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";
        const apiSecret = typeof body.apiSecret === "string" ? body.apiSecret.trim() : "";
        const env = body.environment === "live" ? "live" : "demo";
        if (apiKey.length < 16 || apiSecret.length < 16 || apiKey.length > 128 || apiSecret.length > 128) {
            throw new ConnectionError({ message: "Enter both the API key and the secret key exactly as Binance shows them.", retryable: false, reconnect: true });
        }
        try {
            const account = await createBinanceClient({ env, apiKey, apiSecret }).account();
            const summary: ConnectionSummary = {
                provider: "binance",
                environment: env === "live" ? "Live · USDⓈ-M futures" : "Futures testnet",
                keyHint: mask(apiKey),
                accountHint: null,
                readOnlyVerified: account.readOnlyVerified,
                keyExpiresAt: null,
                connectedAt: Date.now(),
            };
            return { stored: { env, apiKey, apiSecret, summary }, summary };
        } catch (error) {
            throw fromBinance(error);
        }
    },
    describe: (stored) => stored.summary,
    async sync(stored, since) {
        const now = Date.now();
        // Binance keeps futures fills for six months.
        const from = Math.max(Number.isFinite(since) && since > 0 ? since : now - FIRST_IMPORT_DAYS * DAY, now - MAX_IMPORT_DAYS * DAY);
        try {
            return await createBinanceClient(stored).sync(from, now);
        } catch (error) {
            throw fromBinance(error);
        }
    },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ADAPTERS: Partial<Record<ProviderId, ServerAdapter<any>>> = { bybit, binance };
