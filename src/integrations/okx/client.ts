// Read-only OKX client used by the OKX connection (perpetual swaps).
//
// Safety model
// - Only signed GET requests exist here. Nothing in this file can place,
//   amend or cancel an order, move funds or withdraw.
// - A key is accepted only when OKX reports its permission as read_only.
// - Credentials are passed in per call and never logged.
//
// OKX already reports whole positions (positions-history): one row per
// position from open to close, with its realised profit, fees and funding.

import type { ImportedTrade } from "../bybit/positions.ts";

export type OkxEnv = "demo" | "live";
export type OkxCredentials = { env: OkxEnv; apiKey: string; apiSecret: string; passphrase: string };

const BASE = "https://www.okx.com";
const MAX_ATTEMPTS = 3;
const MAX_PAGES = 30;

export type OkxFailureKind = "credentials" | "permissions" | "ip" | "rate-limit" | "region" | "network" | "provider";

export class OkxApiError extends Error {
    kind: OkxFailureKind;
    retryable: boolean;
    constructor(kind: OkxFailureKind, message: string, retryable = false) {
        super(message);
        this.kind = kind;
        this.retryable = retryable;
    }
}

function failureFor(code: string, msg: string): OkxApiError {
    switch (code) {
        case "50111":
        case "50113":
        case "50114":
        case "50105":
        case "50119":
            return new OkxApiError("credentials", "OKX did not accept this API key, secret and passphrase. Check all three were copied in full, and that the key belongs to the environment you selected.");
        case "50110":
            return new OkxApiError("ip", "This API key is restricted to other IP addresses, so OKX refused the request from AltureLock.");
        case "50120":
        case "50121":
            return new OkxApiError("permissions", "This API key is not allowed to read that information.");
        case "50011":
        case "50061":
            return new OkxApiError("rate-limit", "OKX is limiting requests right now. Try again in a minute.", true);
        default:
            return new OkxApiError("provider", `OKX returned an error: ${msg} (code ${code}).`, true);
    }
}

type Options = { fetch?: typeof fetch; sleep?: (ms: number) => Promise<void>; now?: () => number };
export type OkxOpenPosition = { instrument: string; direction: "Long" | "Short"; entryPrice: number; markPrice: number; quantity: number; leverage: number; positionSize: number; unrealisedPnl: number; openedAt: number };
export type OkxSync = { trades: ImportedTrade[]; positions: OkxOpenPosition[]; openSince: number | null; executions: number; from: number; to: number };

// BTC-USDT-SWAP → BTCUSDT, the symbol the journal and its charts use.
export const okxSymbol = (instId: string) => instId.replace(/-SWAP$/, "").replace("-", "");

async function sign(secret: string, payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    return Buffer.from(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))).toString("base64");
}

export function toOkxTrade(row: Record<string, string>, contractSize: number): ImportedTrade {
    const qty = Number(row.closeTotalPos || row.openMaxPos) * contractSize;
    const entry = Number(row.openAvgPx);
    const direction = row.direction === "short" || row.posSide === "short" ? "Short" : "Long";
    return {
        id: `okx-${row.posId}-${row.uTime}`,
        instrument: okxSymbol(row.instId),
        direction,
        entryPrice: entry,
        exitPrice: Number(row.closeAvgPx),
        quantity: qty,
        leverage: Number(row.lever) || 1,
        positionSize: Number((entry * qty).toFixed(2)),
        fee: Math.abs(Number(row.fee || 0)),
        // OKX's realised profit already includes fees and funding.
        profitLoss: Number(row.realizedPnl),
        openedAt: Number(row.cTime),
        closedAt: Number(row.uTime),
        source: "okx",
        provider: "okx",
        orderIds: [`${row.posId}-${row.uTime}`],
        fills: 0,
        exits: 1,
        funding: -Number(row.fundingFee || 0),
        pnlSource: "exchange",
    };
}

export function createOkxClient(credentials: OkxCredentials, options: Options = {}) {
    const request = options.fetch ?? fetch;
    const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    const now = options.now ?? (() => Date.now());

    async function get<T>(path: string, params: Record<string, string> = {}, signed = true): Promise<T> {
        const query = new URLSearchParams(params).toString();
        const target = `${path}${query ? `?${query}` : ""}`;
        let lastError: OkxApiError | null = null;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            if (attempt > 0) await sleep(600 * 2 ** (attempt - 1));
            const timestamp = new Date(now()).toISOString();
            const headers: Record<string, string> = credentials.env === "demo" ? { "x-simulated-trading": "1" } : {};
            if (signed) Object.assign(headers, { "OK-ACCESS-KEY": credentials.apiKey, "OK-ACCESS-SIGN": await sign(credentials.apiSecret, `${timestamp}GET${target}`), "OK-ACCESS-TIMESTAMP": timestamp, "OK-ACCESS-PASSPHRASE": credentials.passphrase });
            let response: Response;
            try {
                response = await request(`${BASE}${target}`, { method: "GET", headers, cache: "no-store" });
            } catch {
                lastError = new OkxApiError("network", "OKX could not be reached. Check the connection and try again.", true);
                continue;
            }
            if (response.status === 403 || response.status === 451) throw new OkxApiError("region", "OKX refused the connection from this server's location. OKX is not available in every country or hosting region.");
            if (response.status === 429) {
                lastError = new OkxApiError("rate-limit", "OKX is limiting requests right now. Try again in a minute.", true);
                continue;
            }
            let body: { code?: string; msg?: string; data?: T };
            try {
                body = await response.json();
            } catch {
                lastError = new OkxApiError("provider", `OKX sent a reply that could not be read (HTTP ${response.status}).`, true);
                continue;
            }
            if (body.code === "0") return body.data as T;
            const failure = failureFor(String(body.code), String(body.msg ?? "unknown"));
            if (!failure.retryable) throw failure;
            lastError = failure;
        }
        throw lastError ?? new OkxApiError("provider", "OKX did not answer.", true);
    }

    async function positions(): Promise<OkxOpenPosition[]> {
        const rows = await get<Record<string, string>[]>("/api/v5/account/positions", { instType: "SWAP" });
        const sizes = await contractSizes();
        return rows
            .filter((row) => Number(row.pos) !== 0)
            .map((row) => {
                const qty = Math.abs(Number(row.pos)) * (sizes.get(row.instId) ?? 1);
                const short = row.posSide === "short" || (row.posSide === "net" && Number(row.pos) < 0);
                return { instrument: okxSymbol(row.instId), direction: short ? ("Short" as const) : ("Long" as const), entryPrice: Number(row.avgPx), markPrice: Number(row.markPx), quantity: qty, leverage: Number(row.lever) || 1, positionSize: Number(row.notionalUsd) || qty * Number(row.markPx), unrealisedPnl: Number(row.upl), openedAt: Number(row.cTime) };
            });
    }

    let sizesCache: Map<string, number> | null = null;
    async function contractSizes() {
        if (!sizesCache) {
            const rows = await get<{ instId: string; ctVal: string }[]>("/api/v5/public/instruments", { instType: "SWAP" }, false);
            sizesCache = new Map(rows.map((row) => [row.instId, Number(row.ctVal) || 1]));
        }
        return sizesCache;
    }

    return {
        async account() {
            const [config] = await get<{ perm?: string; uid?: string }[]>("/api/v5/account/config");
            const perms = (config?.perm ?? "").split(",").map((p) => p.trim()).filter(Boolean);
            if (perms.length === 0 || perms.some((p) => p !== "read_only")) throw new OkxApiError("permissions", "This API key can do more than read. AltureLock only accepts OKX keys with Read permission only: no Trade and no Withdraw.");
            return { readOnlyVerified: true, userId: config?.uid ?? null };
        },
        positions,
        async sync(from: number, to: number = now()): Promise<OkxSync> {
            const sizes = await contractSizes();
            const rows: Record<string, string>[] = [];
            let after = String(to);
            for (let page = 0; page < MAX_PAGES; page++) {
                const list = await get<Record<string, string>[]>("/api/v5/account/positions-history", { instType: "SWAP", after, limit: "100" });
                rows.push(...list.filter((row) => Number(row.uTime) >= from));
                if (list.length < 100 || Number(list[list.length - 1].uTime) < from) break;
                after = list[list.length - 1].uTime;
            }
            const trades = rows.map((row) => toOkxTrade(row, sizes.get(row.instId) ?? 1)).sort((a, b) => b.closedAt - a.closedAt);
            const open = await positions();
            return { trades, positions: open, openSince: open.length ? Math.min(...open.map((p) => p.openedAt)) : null, executions: rows.length, from, to };
        },
    };
}
