// Read-only Bybit v5 client used by the Bybit connection.
//
// Safety model
// - Only signed GET requests exist here. Nothing in this file can place,
//   amend or cancel an order, move funds or withdraw.
// - A live key is accepted only after Bybit confirms it is read-only.
// - Credentials are passed in per call and never logged.

import { buildTrades, type BybitClosedPnl, type BybitExecution, type ImportedTrade } from "./positions.ts";

export type BybitEnv = "demo" | "live";
export type BybitCredentials = { env: BybitEnv; apiKey: string; apiSecret: string };

const BASE_URLS: Record<BybitEnv, string> = { demo: "https://api-demo.bybit.com", live: "https://api.bybit.com" };
const RECV_WINDOW = "5000";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_PAGES = 40;
const MAX_ATTEMPTS = 3;

export type BybitFailureKind = "credentials" | "permissions" | "ip" | "expired" | "rate-limit" | "region" | "network" | "provider";

export class BybitApiError extends Error {
    kind: BybitFailureKind;
    // Whether trying again later, with the same credentials, can succeed.
    retryable: boolean;
    constructor(kind: BybitFailureKind, message: string, retryable = false) {
        super(message);
        this.kind = kind;
        this.retryable = retryable;
    }
}

// Bybit's own error codes, turned into something a trader can act on.
function failureFor(retCode: number, retMsg: string): BybitApiError {
    switch (retCode) {
        case 10003:
        case 10004:
            return new BybitApiError("credentials", "Bybit did not accept this API key and secret. Check that both were copied in full and that the key belongs to the environment you selected.");
        case 10005:
            return new BybitApiError("permissions", "This API key is not allowed to read that information. Create a read-only key with access to positions and trade history.");
        case 10010:
            return new BybitApiError("ip", "This API key is restricted to other IP addresses, so Bybit refused the request from AltureLock.");
        case 33004:
            return new BybitApiError("expired", "This API key has expired. Create a new read-only key at Bybit and connect again.");
        case 10006:
        case 10018:
            return new BybitApiError("rate-limit", "Bybit is limiting requests right now. Try again in a minute.", true);
        default:
            return new BybitApiError("provider", `Bybit returned an error: ${retMsg} (code ${retCode}).`, true);
    }
}

type Options = { fetch?: typeof fetch; baseUrl?: string; sleep?: (ms: number) => Promise<void>; now?: () => number };

export type BybitAccount = {
    // Null when Bybit would not report the key's permissions (demo environment only).
    readOnlyVerified: boolean;
    userId: string | null;
    keyNote: string | null;
    expiresAt: string | null;
};

export type BybitOpenPosition = {
    instrument: string;
    direction: "Long" | "Short";
    entryPrice: number;
    markPrice: number;
    quantity: number;
    leverage: number;
    positionSize: number;
    unrealisedPnl: number;
    openedAt: number;
};

export type BybitSync = { trades: ImportedTrade[]; positions: BybitOpenPosition[]; openSince: number | null; executions: number; from: number; to: number };

async function hmac(secret: string, payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function createBybitClient(credentials: BybitCredentials, options: Options = {}) {
    const request = options.fetch ?? fetch;
    const baseUrl = options.baseUrl ?? BASE_URLS[credentials.env];
    const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    const now = options.now ?? (() => Date.now());

    async function get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
        const query = new URLSearchParams(params).toString();
        let lastError: BybitApiError | null = null;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            if (attempt > 0) await sleep(600 * 2 ** (attempt - 1));
            const timestamp = String(now());
            const signature = await hmac(credentials.apiSecret, timestamp + credentials.apiKey + RECV_WINDOW + query);
            let response: Response;
            try {
                response = await request(`${baseUrl}${path}${query ? `?${query}` : ""}`, {
                    method: "GET",
                    headers: { "X-BAPI-API-KEY": credentials.apiKey, "X-BAPI-TIMESTAMP": timestamp, "X-BAPI-RECV-WINDOW": RECV_WINDOW, "X-BAPI-SIGN": signature },
                    cache: "no-store",
                });
            } catch {
                lastError = new BybitApiError("network", "Bybit could not be reached. Check the connection and try again.", true);
                continue;
            }
            if (response.status === 403) throw new BybitApiError("region", "Bybit refused the connection from this server's location. Bybit blocks some countries and hosting regions.");
            // Bybit answers some endpoints with a bare 401 when the key or signature is wrong.
            if (response.status === 401) throw failureFor(10003, "unauthorised");
            if (response.status === 429) {
                lastError = new BybitApiError("rate-limit", "Bybit is limiting requests right now. Try again in a minute.", true);
                continue;
            }
            let body: { retCode?: number; retMsg?: string; result?: T };
            try {
                body = await response.json();
            } catch {
                lastError = new BybitApiError("provider", `Bybit sent a reply that could not be read (HTTP ${response.status}).`, true);
                continue;
            }
            if (body.retCode === 0) return body.result as T;
            const failure = failureFor(Number(body.retCode), String(body.retMsg ?? "unknown"));
            if (failure.kind !== "rate-limit") throw failure;
            lastError = failure;
        }
        throw lastError ?? new BybitApiError("provider", "Bybit did not answer.", true);
    }

    // Walks a time range in the 7-day windows Bybit allows, following the page cursor in each.
    async function history<Row>(path: string, from: number, to: number): Promise<Row[]> {
        const rows: Row[] = [];
        for (let end = to; end > from; end -= WEEK_MS) {
            const start = Math.max(end - WEEK_MS, from);
            let cursor = "";
            for (let page = 0; page < MAX_PAGES; page++) {
                const params: Record<string, string> = { category: "linear", startTime: String(start), endTime: String(end), limit: "100" };
                if (cursor) params.cursor = cursor;
                const result = await get<{ list?: Row[]; nextPageCursor?: string }>(path, params);
                rows.push(...(result.list ?? []));
                cursor = result.nextPageCursor ?? "";
                if (!cursor || (result.list ?? []).length === 0) break;
            }
        }
        return rows;
    }

    async function positions(): Promise<BybitOpenPosition[]> {
        const result = await get<{ list?: Record<string, string>[] }>("/v5/position/list", { category: "linear", settleCoin: "USDT" });
        return (result.list ?? [])
            .filter((row) => Number(row.size) > 0)
            .map((row) => ({
                instrument: row.symbol,
                direction: row.side === "Buy" ? ("Long" as const) : ("Short" as const),
                entryPrice: Number(row.avgPrice),
                markPrice: Number(row.markPrice),
                quantity: Number(row.size),
                leverage: Number(row.leverage),
                positionSize: Number(row.positionValue),
                unrealisedPnl: Number(row.unrealisedPnl),
                openedAt: Number(row.createdTime),
            }));
    }

    return {
        // Proves the key works and, on live, that it cannot do more than read.
        async account(): Promise<BybitAccount> {
            let info: { readOnly?: number; permissions?: Record<string, string[]>; userID?: number | string; note?: string; expiredAt?: string } | null = null;
            try {
                info = await get("/v5/user/query-api");
            } catch (error) {
                // The demo environment does not serve this endpoint; a live key must pass it.
                if (credentials.env === "live" || (error instanceof BybitApiError && (error.kind === "credentials" || error.kind === "ip" || error.kind === "region"))) throw error;
            }
            if (info) {
                const canMoveFunds = Object.values(info.permissions ?? {}).some((scopes) => (scopes ?? []).some((scope) => /withdraw|transfer/i.test(scope)));
                if (info.readOnly !== 1 || canMoveFunds) throw new BybitApiError("permissions", "This API key can do more than read. AltureLock only accepts read-only keys: create a new key at Bybit with Read-Only selected, and no trading, transfer or withdrawal permissions.");
                return { readOnlyVerified: true, userId: info.userID !== undefined ? String(info.userID) : null, keyNote: info.note || null, expiresAt: info.expiredAt || null };
            }
            // Demo: confirm the key at least authenticates.
            await positions();
            return { readOnlyVerified: false, userId: null, keyNote: null, expiresAt: null };
        },

        positions,

        async sync(from: number, to: number = now()): Promise<BybitSync> {
            const rawExecutions = await history<Record<string, string>>("/v5/execution/list", from, to);
            const rawClosed = await history<Record<string, string>>("/v5/position/closed-pnl", from, to);
            const executions: BybitExecution[] = rawExecutions.map((row) => ({
                execId: row.execId,
                orderId: row.orderId,
                symbol: row.symbol,
                side: row.side as "Buy" | "Sell",
                execPrice: Number(row.execPrice),
                execQty: Number(row.execQty),
                closedSize: Number(row.closedSize || 0),
                execFee: Number(row.execFee || 0),
                execTime: Number(row.execTime),
                execType: row.execType,
                positionIdx: Number(row.positionIdx || 0),
            }));
            const closed: BybitClosedPnl[] = rawClosed.map((row) => ({
                orderId: row.orderId,
                symbol: row.symbol,
                side: row.side as "Buy" | "Sell",
                qty: Number(row.qty),
                leverage: Number(row.leverage),
                avgEntryPrice: Number(row.avgEntryPrice),
                avgExitPrice: Number(row.avgExitPrice),
                cumEntryValue: Number(row.cumEntryValue),
                closedPnl: Number(row.closedPnl),
                openFee: Number(row.openFee || 0),
                closeFee: Number(row.closeFee || 0),
                createdTime: Number(row.createdTime),
                updatedTime: Number(row.updatedTime),
            }));
            const built = buildTrades(credentials.env, executions, closed);
            return { ...built, positions: await positions(), executions: new Set(executions.map((item) => item.execId)).size, from, to };
        },
    };
}
