// Read-only Bitget client used by the Bitget connection (USDT-M futures).
//
// Safety model
// - Only signed GET requests exist here. Nothing in this file can place,
//   amend or cancel an order, move funds or withdraw.
// - Not offered to traders until the read-only check is confirmed (see authenticates).
// - Credentials are passed in per call and never logged.
//
// Bitget reports whole positions (history-position): one row per position
// from open to close, with its profit, fees and funding.

import type { ImportedTrade } from "../bybit/positions.ts";

export type BitgetCredentials = { env: "live"; apiKey: string; apiSecret: string; passphrase: string };

const BASE = "https://api.bitget.com";
const MAX_ATTEMPTS = 3;
const MAX_PAGES = 30;
const PRODUCT = "USDT-FUTURES";

export type BitgetFailureKind = "credentials" | "permissions" | "ip" | "rate-limit" | "region" | "network" | "provider";

export class BitgetApiError extends Error {
    kind: BitgetFailureKind;
    retryable: boolean;
    constructor(kind: BitgetFailureKind, message: string, retryable = false) {
        super(message);
        this.kind = kind;
        this.retryable = retryable;
    }
}

function failureFor(code: string, msg: string): BitgetApiError {
    switch (code) {
        case "40006":
        case "40037":
        case "40009":
        case "40012":
            return new BitgetApiError("credentials", "Bitget did not accept this API key, secret and passphrase. Check all three were copied in full.");
        case "40018":
            return new BitgetApiError("ip", "This API key is restricted to other IP addresses, so Bitget refused the request from AltureLock.");
        case "40014":
            return new BitgetApiError("permissions", "This API key is not allowed to read futures. Allow read access to futures when creating it.");
        case "429":
        case "40010":
            return new BitgetApiError("rate-limit", "Bitget is limiting requests right now. Try again in a minute.", true);
        default:
            return new BitgetApiError("provider", `Bitget returned an error: ${msg} (code ${code}).`, true);
    }
}

type Options = { fetch?: typeof fetch; sleep?: (ms: number) => Promise<void>; now?: () => number };
export type BitgetOpenPosition = { instrument: string; direction: "Long" | "Short"; entryPrice: number; markPrice: number; quantity: number; leverage: number; positionSize: number; unrealisedPnl: number; openedAt: number };
export type BitgetSync = { trades: ImportedTrade[]; positions: BitgetOpenPosition[]; openSince: number | null; executions: number; from: number; to: number };

async function sign(secret: string, payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return Buffer.from(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))).toString("base64");
}

export function toBitgetTrade(row: Record<string, string>): ImportedTrade {
    const qty = Number(row.closeTotalPos || row.openTotalPos);
    const entry = Number(row.openAvgPrice);
    const fee = Math.abs(Number(row.openFee || 0)) + Math.abs(Number(row.closeFee || 0));
    return {
        id: `bitget-${row.positionId}`,
        instrument: row.symbol.toUpperCase(),
        direction: row.holdSide === "short" ? "Short" : "Long",
        entryPrice: entry,
        exitPrice: Number(row.closeAvgPrice),
        quantity: qty,
        leverage: Number(row.leverage) || 1,
        positionSize: Number((entry * qty).toFixed(2)),
        fee,
        // netProfit is Bitget's result after fees and funding.
        profitLoss: Number(row.netProfit ?? row.pnl),
        openedAt: Number(row.ctime),
        closedAt: Number(row.utime),
        source: "bitget",
        provider: "bitget",
        orderIds: [row.positionId],
        fills: 0,
        exits: 1,
        funding: -Number(row.totalFunding || 0),
        pnlSource: "exchange",
    };
}

export function createBitgetClient(credentials: BitgetCredentials, options: Options = {}) {
    const request = options.fetch ?? fetch;
    const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    const now = options.now ?? (() => Date.now());

    async function get<T>(path: string, params: Record<string, string> = {}): Promise<T> {
        const query = new URLSearchParams(params).toString();
        const target = `${path}${query ? `?${query}` : ""}`;
        let lastError: BitgetApiError | null = null;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            if (attempt > 0) await sleep(600 * 2 ** (attempt - 1));
            const timestamp = String(now());
            let response: Response;
            try {
                response = await request(`${BASE}${target}`, {
                    method: "GET",
                    headers: { "ACCESS-KEY": credentials.apiKey, "ACCESS-SIGN": await sign(credentials.apiSecret, `${timestamp}GET${target}`), "ACCESS-TIMESTAMP": timestamp, "ACCESS-PASSPHRASE": credentials.passphrase, locale: "en-US", "Content-Type": "application/json" },
                    cache: "no-store",
                });
            } catch {
                lastError = new BitgetApiError("network", "Bitget could not be reached. Check the connection and try again.", true);
                continue;
            }
            if (response.status === 403 || response.status === 451) throw new BitgetApiError("region", "Bitget refused the connection from this server's location.");
            let body: { code?: string; msg?: string; data?: T };
            try {
                body = await response.json();
            } catch {
                lastError = new BitgetApiError("provider", `Bitget sent a reply that could not be read (HTTP ${response.status}).`, true);
                continue;
            }
            if (body.code === "00000") return body.data as T;
            const failure = failureFor(String(body.code ?? response.status), String(body.msg ?? "unknown"));
            if (!failure.retryable) throw failure;
            lastError = failure;
        }
        throw lastError ?? new BitgetApiError("provider", "Bitget did not answer.", true);
    }

    async function positions(): Promise<BitgetOpenPosition[]> {
        const rows = await get<Record<string, string>[]>("/api/v2/mix/position/all-position", { productType: PRODUCT, marginCoin: "USDT" });
        return (rows ?? [])
            .filter((row) => Number(row.total) > 0)
            .map((row) => ({ instrument: row.symbol.toUpperCase(), direction: row.holdSide === "short" ? ("Short" as const) : ("Long" as const), entryPrice: Number(row.openPriceAvg), markPrice: Number(row.markPrice), quantity: Number(row.total), leverage: Number(row.leverage) || 1, positionSize: Number(row.total) * Number(row.markPrice), unrealisedPnl: Number(row.unrealizedPL), openedAt: Number(row.cTime) }));
    }

    return {
        // Not wired to a connection yet: how Bitget reports a key's permissions has
        // not been confirmed against a real key, and AltureLock must refuse any key
        // that can trade. Until then this only proves the key authenticates.
        async authenticates() {
            await positions();
            return true;
        },
        positions,
        async sync(from: number, to: number = now()): Promise<BitgetSync> {
            const rows: Record<string, string>[] = [];
            let cursor = "";
            for (let page = 0; page < MAX_PAGES; page++) {
                const params: Record<string, string> = { productType: PRODUCT, startTime: String(from), endTime: String(to), limit: "100" };
                if (cursor) params.idLessThan = cursor;
                const data = await get<{ list?: Record<string, string>[]; endId?: string }>("/api/v2/mix/position/history-position", params);
                const list = data?.list ?? [];
                rows.push(...list);
                if (list.length < 100 || !data?.endId) break;
                cursor = data.endId;
            }
            const trades = rows.map(toBitgetTrade).sort((a, b) => b.closedAt - a.closedAt);
            const open = await positions();
            return { trades, positions: open, openSince: open.length ? Math.min(...open.map((p) => p.openedAt)) : null, executions: rows.length, from, to };
        },
    };
}
