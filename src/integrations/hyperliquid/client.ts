// Hyperliquid client used by the Hyperliquid connection (perpetuals).
//
// Hyperliquid's history is public on its chain: reading it needs only the
// wallet address, never a key. Nothing here can sign, trade or move funds.
//
// Fills are rebuilt into whole positions with the same replay as Binance:
// Hyperliquid reports each fill's realised profit (closedPnl) and fee.

import type { ImportedTrade } from "../bybit/positions.ts";
import { buildBinanceTrades, type BinanceFill } from "../binance/positions.ts";

const INFO = "https://api.hyperliquid.xyz/info";
const MAX_PAGES = 10;

export class HyperliquidApiError extends Error {
    kind: "address" | "rate-limit" | "network" | "provider";
    retryable: boolean;
    constructor(kind: HyperliquidApiError["kind"], message: string, retryable = false) {
        super(message);
        this.kind = kind;
        this.retryable = retryable;
    }
}

export const isAddress = (value: string) => /^0x[0-9a-fA-F]{40}$/.test(value);

type Options = { fetch?: typeof fetch; now?: () => number };
export type HyperliquidOpenPosition = { instrument: string; direction: "Long" | "Short"; entryPrice: number; markPrice: number; quantity: number; leverage: number; positionSize: number; unrealisedPnl: number; openedAt: number };
export type HyperliquidSync = { trades: ImportedTrade[]; positions: HyperliquidOpenPosition[]; openSince: number | null; executions: number; from: number; to: number };

type Fill = { coin: string; px: string; sz: string; side: "A" | "B"; time: number; closedPnl: string; fee: string; oid: number; tid: number; feeToken?: string; startPosition?: string };

export function createHyperliquidClient(address: string, options: Options = {}) {
    const request = options.fetch ?? fetch;
    const now = options.now ?? (() => Date.now());

    async function info<T>(body: Record<string, unknown>): Promise<T> {
        let response: Response;
        try {
            response = await request(INFO, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), cache: "no-store" });
        } catch {
            throw new HyperliquidApiError("network", "Hyperliquid could not be reached. Try again.", true);
        }
        if (response.status === 429) throw new HyperliquidApiError("rate-limit", "Hyperliquid is limiting requests right now. Try again in a minute.", true);
        if (!response.ok) throw new HyperliquidApiError("provider", `Hyperliquid returned an error (HTTP ${response.status}).`, true);
        return (await response.json()) as T;
    }

    async function positions(): Promise<HyperliquidOpenPosition[]> {
        const state = await info<{ assetPositions?: { position: Record<string, unknown> & { leverage?: { value?: number } } }[] }>({ type: "clearinghouseState", user: address });
        return (state.assetPositions ?? [])
            .map(({ position: p }) => {
                const size = Number(p.szi);
                const value = Math.abs(Number(p.positionValue));
                return { instrument: `${p.coin}USDC`, direction: size < 0 ? ("Short" as const) : ("Long" as const), entryPrice: Number(p.entryPx), markPrice: size ? value / Math.abs(size) : 0, quantity: Math.abs(size), leverage: Number(p.leverage?.value) || 1, positionSize: value, unrealisedPnl: Number(p.unrealizedPnl), openedAt: now() };
            })
            .filter((p) => p.quantity > 0);
    }

    return {
        async account() {
            if (!isAddress(address)) throw new HyperliquidApiError("address", "Enter the wallet address you trade with on Hyperliquid: 0x followed by 40 characters.");
            await positions();
            return { readOnlyVerified: true };
        },
        positions,
        async sync(from: number, to: number = now()): Promise<HyperliquidSync> {
            const fills: Fill[] = [];
            let start = from;
            for (let page = 0; page < MAX_PAGES; page++) {
                const list = await info<Fill[]>({ type: "userFillsByTime", user: address, startTime: start, endTime: to, aggregateByTime: false });
                fills.push(...list);
                if (list.length < 2000) break;
                start = Math.max(...list.map((fill) => fill.time)) + 1;
            }
            // Spot fills are named "@<index>" or "PURR/USDC"; only perpetuals are journalled.
            const perps = fills.filter((fill) => !fill.coin.startsWith("@") && !fill.coin.includes("/"));
            const mapped: BinanceFill[] = perps.map((fill) => ({ id: fill.tid, orderId: fill.oid, symbol: `${fill.coin}USDC`, side: fill.side === "B" ? "BUY" : "SELL", positionSide: "BOTH", price: Number(fill.px), qty: Number(fill.sz), realizedPnl: Number(fill.closedPnl), commission: Number(fill.fee), commissionAsset: fill.feeToken ?? "USDC", time: fill.time, startPosition: fill.startPosition !== undefined ? Number(fill.startPosition) : undefined }));
            const open = await positions();
            const leverage = new Map(open.map((p) => [p.instrument, p.leverage]));
            const built = buildBinanceTrades(mapped, (symbol) => leverage.get(symbol) ?? 1);
            const trades = built.trades.map((trade) => ({ ...trade, id: trade.id.replace(/^binance-/, "hyperliquid-"), source: "hyperliquid" as const, provider: "hyperliquid" as const }));
            return { trades, positions: open, openSince: built.openSince, executions: perps.length, from, to };
        },
    };
}
