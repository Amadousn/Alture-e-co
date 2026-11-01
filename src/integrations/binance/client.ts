// Read-only Binance USDⓈ-M futures client used by the Binance connection.
//
// Safety model
// - Only signed GET requests exist here. Nothing in this file can place,
//   amend or cancel an order, move funds or withdraw.
// - A live key is accepted only after Binance confirms it can read and can
//   neither trade, transfer nor withdraw.
// - Credentials are passed in per call and never logged.

import type { ImportedTrade } from "../bybit/positions.ts";
import { buildBinanceTrades, type BinanceFill } from "./positions.ts";

export type BinanceEnv = "demo" | "live";
export type BinanceCredentials = { env: BinanceEnv; apiKey: string; apiSecret: string };

const FUTURES: Record<BinanceEnv, string> = { demo: "https://testnet.binancefuture.com", live: "https://fapi.binance.com" };
const SPOT_LIVE = "https://api.binance.com";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 3;
const MAX_PAGES = 20;

export type BinanceFailureKind = "credentials" | "permissions" | "ip" | "rate-limit" | "region" | "clock" | "network" | "provider";

export class BinanceApiError extends Error {
    kind: BinanceFailureKind;
    retryable: boolean;
    constructor(kind: BinanceFailureKind, message: string, retryable = false) {
        super(message);
        this.kind = kind;
        this.retryable = retryable;
    }
}

function failureFor(code: number, msg: string): BinanceApiError {
    switch (code) {
        case -2014:
        case -2015:
            return new BinanceApiError("credentials", "Binance did not accept this API key. Check that the key and secret were copied in full, that futures reading is allowed, and that the key is not limited to other IP addresses.");
        case -1022:
            return new BinanceApiError("credentials", "Binance did not accept the signature. Check that the secret was copied in full.");
        case -1021:
            return new BinanceApiError("clock", "Binance refused the request because the clocks differ. Try again in a moment.", true);
        case -1003:
        case -1015:
            return new BinanceApiError("rate-limit", "Binance is limiting requests right now. Try again in a minute.", true);
        default:
            return new BinanceApiError("provider", `Binance returned an error: ${msg} (code ${code}).`, true);
    }
}

type Options = { fetch?: typeof fetch; sleep?: (ms: number) => Promise<void>; now?: () => number };

export type BinanceAccount = { readOnlyVerified: boolean };
export type BinanceOpenPosition = { instrument: string; direction: "Long" | "Short"; entryPrice: number; markPrice: number; quantity: number; leverage: number; positionSize: number; unrealisedPnl: number; openedAt: number };
export type BinanceSync = { trades: ImportedTrade[]; positions: BinanceOpenPosition[]; openSince: number | null; executions: number; from: number; to: number };

async function hmac(secret: string, payload: string): Promise<string> {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return Array.from(new Uint8Array(signature)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function createBinanceClient(credentials: BinanceCredentials, options: Options = {}) {
    const request = options.fetch ?? fetch;
    const sleep = options.sleep ?? ((ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms)));
    const now = options.now ?? (() => Date.now());

    async function get<T>(base: string, path: string, params: Record<string, string> = {}): Promise<T> {
        let lastError: BinanceApiError | null = null;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            if (attempt > 0) await sleep(600 * 2 ** (attempt - 1));
            const query = new URLSearchParams({ ...params, recvWindow: "10000", timestamp: String(now()) }).toString();
            const signature = await hmac(credentials.apiSecret, query);
            let response: Response;
            try {
                response = await request(`${base}${path}?${query}&signature=${signature}`, { method: "GET", headers: { "X-MBX-APIKEY": credentials.apiKey }, cache: "no-store" });
            } catch {
                lastError = new BinanceApiError("network", "Binance could not be reached. Check the connection and try again.", true);
                continue;
            }
            if (response.status === 451 || response.status === 403) throw new BinanceApiError("region", "Binance refused the connection from this server's location. Binance.com is not available in every country or hosting region.");
            if (response.status === 429 || response.status === 418) {
                lastError = new BinanceApiError("rate-limit", "Binance is limiting requests right now. Try again in a minute.", true);
                continue;
            }
            let body: unknown;
            try {
                body = await response.json();
            } catch {
                lastError = new BinanceApiError("provider", `Binance sent a reply that could not be read (HTTP ${response.status}).`, true);
                continue;
            }
            if (response.ok) return body as T;
            const { code, msg } = (body ?? {}) as { code?: number; msg?: string };
            const failure = failureFor(Number(code), String(msg ?? "unknown"));
            if (!failure.retryable) throw failure;
            lastError = failure;
        }
        throw lastError ?? new BinanceApiError("provider", "Binance did not answer.", true);
    }

    const futures = <T>(path: string, params?: Record<string, string>) => get<T>(FUTURES[credentials.env], path, params);

    // positionRisk lists every symbol with its leverage setting, open or not.
    const risk = () => futures<Record<string, string>[]>("/fapi/v2/positionRisk");
    const openFrom = (rows: Record<string, string>[]): BinanceOpenPosition[] =>
        rows
            .filter((row) => Number(row.positionAmt) !== 0)
            .map((row) => ({
                instrument: row.symbol,
                direction: Number(row.positionAmt) > 0 ? ("Long" as const) : ("Short" as const),
                entryPrice: Number(row.entryPrice),
                markPrice: Number(row.markPrice),
                quantity: Math.abs(Number(row.positionAmt)),
                leverage: Number(row.leverage) || 1,
                positionSize: Math.abs(Number(row.notional)),
                unrealisedPnl: Number(row.unRealizedProfit),
                openedAt: Number(row.updateTime),
            }));
    const positions = async () => openFrom(await risk());

    // Walks a time range in 7-day windows, paging by time inside each.
    async function windows<Row extends { time: number }>(path: string, from: number, to: number, params: Record<string, string>): Promise<Row[]> {
        const rows: Row[] = [];
        for (let start = from; start < to; start += WEEK_MS) {
            let cursor = start;
            const end = Math.min(start + WEEK_MS - 1, to);
            for (let page = 0; page < MAX_PAGES; page++) {
                const list = await futures<Row[]>(path, { ...params, startTime: String(cursor), endTime: String(end), limit: "1000" });
                rows.push(...list);
                if (list.length < 1000) break;
                cursor = Math.max(...list.map((row) => row.time)) + 1;
            }
        }
        return rows;
    }

    return {
        async account(): Promise<BinanceAccount> {
            if (credentials.env === "live") {
                const r = await get<Record<string, boolean>>(SPOT_LIVE, "/sapi/v1/account/apiRestrictions");
                const powers = ["enableWithdrawals", "enableInternalTransfer", "permitsUniversalTransfer", "enableFutures", "enableSpotAndMarginTrading", "enableMargin", "enableVanillaOptions", "enablePortfolioMarginTrading", "enableFixApiTrade"];
                if (!r.enableReading || powers.some((power) => r[power] === true)) throw new BinanceApiError("permissions", "This API key can do more than read. AltureLock only accepts keys with Enable Reading ticked and every trading, transfer and withdrawal option off.");
                await positions();
                return { readOnlyVerified: true };
            }
            // The futures testnet has no permissions endpoint: confirm the key at least authenticates.
            await positions();
            return { readOnlyVerified: false };
        },

        positions,

        async sync(from: number, to: number = now()): Promise<BinanceSync> {
            const rows = await risk();
            const open = openFrom(rows);
            // userTrades needs a symbol: take every symbol with realised profit in the range, and every open one.
            const income = await windows<{ symbol: string; time: number }>("/fapi/v1/income", from, to, { incomeType: "REALIZED_PNL" });
            const symbols = [...new Set([...income.map((row) => row.symbol), ...open.map((p) => p.instrument)].filter(Boolean))];
            const fills: BinanceFill[] = [];
            for (const symbol of symbols) {
                const rows = await windows<Record<string, string> & { time: number }>("/fapi/v1/userTrades", from, to, { symbol });
                fills.push(
                    ...rows.map((row) => ({
                        id: Number(row.id),
                        orderId: Number(row.orderId),
                        symbol: row.symbol,
                        side: row.side as "BUY" | "SELL",
                        positionSide: (row.positionSide || "BOTH") as BinanceFill["positionSide"],
                        price: Number(row.price),
                        qty: Number(row.qty),
                        realizedPnl: Number(row.realizedPnl),
                        commission: Number(row.commission),
                        commissionAsset: row.commissionAsset,
                        time: Number(row.time),
                    })),
                );
            }
            const leverage = new Map(rows.map((row) => [row.symbol, Number(row.leverage) || 1]));
            const built = buildBinanceTrades(fills, (symbol) => leverage.get(symbol) ?? 1);
            return { ...built, positions: open, executions: new Set(fills.map((fill) => `${fill.symbol}-${fill.id}`)).size, from, to };
        },
    };
}
