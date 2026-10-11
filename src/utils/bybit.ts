// Server-only Bybit client for the owner's trade journal sync.
//
// Safety model:
// - Only ever issues signed GET requests. There is no code path here that
//   can place, amend or cancel an order, move funds or withdraw.
// - Defaults to Bybit's demo trading environment. Live has to be opted into
//   with BYBIT_ENV=live.
// - Before reading anything, asks Bybit what the key is allowed to do and
//   refuses to continue unless the key is read-only. On live that check is
//   mandatory; on demo (no real funds) it is best-effort, since the demo
//   environment does not expose every account endpoint.

export type BybitEnv = "demo" | "live";

const BASE_URLS: Record<BybitEnv, string> = {
    demo: "https://api-demo.bybit.com",
    live: "https://api.bybit.com",
};

const RECV_WINDOW = "5000";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_PAGES_PER_WINDOW = 5;

export class BybitError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
    }
}

export type ClosedTrade = {
    id: string;
    instrument: string;
    direction: "Long" | "Short";
    entryPrice: number;
    exitPrice: number;
    quantity: number;
    leverage: number;
    positionSize: number;
    fee: number;
    profitLoss: number;
    // Continuation or reversal, as declared in the Trading Rules checklist
    // before entry. The exchange does not know this, so it is only present on
    // trades that went through the rules system.
    setup?: "Continuation" | "Reversal";
    // When the position was opened. Bybit's closed P&L report does not carry
    // it, so it stays unset until the sync also reads execution history.
    openedAt?: number;
    closedAt: number;
    // Set on trades recorded through the Rules workflow, never by the exchange.
    source?: "rules" | "bybit";
    plannedEntry?: number;
    stopLoss?: number;
    takeProfit?: number;
    rulesFollowed?: boolean;
    reflection?: string;
    // The decisions recorded while the trade was managed in Rules.
    timeline?: { at: number; text: string }[];
    // Set on trades imported through a connection (see src/integrations).
    provider?: string;
    // Provider order ids that closed the position, kept for reconciliation.
    orderIds?: string[];
    // How many entry and exit fills made up the position.
    fills?: number;
    exits?: number;
    // Funding paid (positive) or received (negative) while the position was open.
    funding?: number;
    // "exchange": the provider's own realised figure. "computed": worked out from the fills.
    pnlSource?: "exchange" | "computed";
    // Each fill that built or reduced the position, when the source provides them.
    executions?: { kind: "entry" | "exit"; price: number; quantity: number; at: number }[];
    // The position was opened before the imported history begins, so its entry time is unknown.
    incomplete?: boolean;
};

export type OpenPosition = {
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

type BybitConfig = {
    env: BybitEnv;
    apiKey: string;
    apiSecret: string;
};

export function getBybitConfig(): BybitConfig | null {
    const apiKey = process.env.BYBIT_API_KEY;
    const apiSecret = process.env.BYBIT_API_SECRET;
    if (!apiKey || !apiSecret) return null;
    const env: BybitEnv = process.env.BYBIT_ENV === "live" ? "live" : "demo";
    return { env, apiKey, apiSecret };
}

async function sign(secret: string, payload: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
        "raw",
        enc.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

type BybitResponse<T> = { retCode: number; retMsg: string; result: T };

async function signedGet<T>(config: BybitConfig, path: string, params: Record<string, string> = {}): Promise<T> {
    const query = new URLSearchParams(params).toString();
    const timestamp = Date.now().toString();
    const signature = await sign(config.apiSecret, timestamp + config.apiKey + RECV_WINDOW + query);

    const res = await fetch(`${BASE_URLS[config.env]}${path}${query ? `?${query}` : ""}`, {
        method: "GET",
        headers: {
            "X-BAPI-API-KEY": config.apiKey,
            "X-BAPI-TIMESTAMP": timestamp,
            "X-BAPI-RECV-WINDOW": RECV_WINDOW,
            "X-BAPI-SIGN": signature,
        },
        cache: "no-store",
    });

    let json: BybitResponse<T>;
    try {
        json = await res.json();
    } catch {
        throw new BybitError(`Bybit returned an unreadable response (HTTP ${res.status}).`, 502);
    }
    if (json.retCode !== 0) {
        throw new BybitError(`Bybit rejected the request: ${json.retMsg} (code ${json.retCode}).`, 502);
    }
    return json.result;
}

type ApiKeyInfo = {
    readOnly: number;
    permissions?: Record<string, string[]>;
};

// Returns true once the key is confirmed read-only, false if Bybit would not
// tell us (demo only). Throws if the key can do more than read.
async function assertReadOnly(config: BybitConfig): Promise<boolean> {
    let info: ApiKeyInfo;
    try {
        info = await signedGet<ApiKeyInfo>(config, "/v5/user/query-api");
    } catch (err) {
        if (config.env === "live") {
            throw new BybitError(
                "Could not confirm the API key's permissions, so the live connection was refused.",
                502
            );
        }
        return false;
    }

    const canWithdraw = Object.values(info.permissions ?? {}).some((scopes) =>
        scopes.some((scope) => scope.toLowerCase().includes("withdraw"))
    );
    if (info.readOnly !== 1 || canWithdraw) {
        throw new BybitError(
            "This API key is not read-only. Create a new key with read-only access and no withdrawal, transfer or trade permissions.",
            403
        );
    }
    return true;
}

type ClosedPnlRow = {
    orderId: string;
    symbol: string;
    side: "Buy" | "Sell";
    qty: string;
    leverage: string;
    avgEntryPrice: string;
    avgExitPrice: string;
    cumEntryValue: string;
    closedPnl: string;
    openFee?: string;
    closeFee?: string;
    createdTime: string;
    updatedTime: string;
};

type ClosedPnlResult = { list: ClosedPnlRow[]; nextPageCursor?: string };

function toClosedTrade(row: ClosedPnlRow): ClosedTrade {
    return {
        id: row.orderId,
        instrument: row.symbol,
        // `side` is the side of the order that closed the position, so a
        // Sell closes a long and a Buy closes a short.
        direction: row.side === "Sell" ? "Long" : "Short",
        entryPrice: Number(row.avgEntryPrice),
        exitPrice: Number(row.avgExitPrice),
        quantity: Number(row.qty),
        leverage: Number(row.leverage),
        positionSize: Number(row.cumEntryValue),
        fee: Number(row.openFee ?? 0) + Number(row.closeFee ?? 0),
        profitLoss: Number(row.closedPnl),
        closedAt: Number(row.updatedTime),
    };
}

type PositionRow = {
    symbol: string;
    side: "Buy" | "Sell" | "";
    size: string;
    avgPrice: string;
    markPrice: string;
    leverage: string;
    positionValue: string;
    unrealisedPnl: string;
    createdTime: string;
};

async function fetchOpenPositions(config: BybitConfig): Promise<OpenPosition[]> {
    const result = await signedGet<{ list: PositionRow[] }>(config, "/v5/position/list", {
        category: "linear",
        settleCoin: "USDT",
    });
    return result.list
        .filter((row) => Number(row.size) > 0)
        .map((row) => ({
            instrument: row.symbol,
            direction: row.side === "Buy" ? "Long" : "Short",
            entryPrice: Number(row.avgPrice),
            markPrice: Number(row.markPrice),
            quantity: Number(row.size),
            leverage: Number(row.leverage),
            positionSize: Number(row.positionValue),
            unrealisedPnl: Number(row.unrealisedPnl),
            openedAt: Number(row.createdTime),
        }));
}

export async function fetchJournalSnapshot(days: number): Promise<{
    env: BybitEnv;
    readOnlyVerified: boolean;
    trades: ClosedTrade[];
    positions: OpenPosition[];
}> {
    const config = getBybitConfig();
    if (!config) {
        throw new BybitError("Bybit sync is not configured yet.", 503);
    }

    const readOnlyVerified = await assertReadOnly(config);

    // Bybit caps each closed P&L query at a 7-day range, so walk backwards
    // one week at a time.
    const now = Date.now();
    const earliest = now - days * 24 * 60 * 60 * 1000;
    const trades: ClosedTrade[] = [];

    for (let end = now; end > earliest; end -= WEEK_MS) {
        const start = Math.max(end - WEEK_MS, earliest);
        let cursor: string | undefined;
        for (let page = 0; page < MAX_PAGES_PER_WINDOW; page++) {
            const params: Record<string, string> = {
                category: "linear",
                startTime: String(start),
                endTime: String(end),
                limit: "100",
            };
            if (cursor) params.cursor = cursor;
            const result = await signedGet<ClosedPnlResult>(config, "/v5/position/closed-pnl", params);
            trades.push(...result.list.map(toClosedTrade));
            cursor = result.nextPageCursor || undefined;
            if (!cursor) break;
        }
    }

    const unique = Array.from(new Map(trades.map((t) => [t.id, t])).values());
    unique.sort((a, b) => b.closedAt - a.closedAt);
    const positions = await fetchOpenPositions(config);
    return { env: config.env, readOnlyVerified, trades: unique, positions };
}
