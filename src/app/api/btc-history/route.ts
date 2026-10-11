import { NextResponse } from "next/server";

export const revalidate = 60;

const TARGET_POINTS = 80;

type PricePoint = { t: number; price: number };

function generateFallback(): PricePoint[] {
    let seed = 7;
    const rand = () => {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    let price = 78000;
    const points: PricePoint[] = [];
    const now = Date.now();
    for (let i = 0; i < TARGET_POINTS; i++) {
        price += (rand() - 0.5) * 260;
        price = Math.max(1000, price);
        points.push({ t: now - (TARGET_POINTS - i) * 60000, price });
    }
    return points;
}

// Bybit's public market data needs no API key. 96 fifteen-minute candles
// cover the last 24 hours.
async function fetchFromBybit(): Promise<PricePoint[]> {
    const res = await fetch(
        "https://api.bybit.com/v5/market/kline?category=linear&symbol=BTCUSDT&interval=15&limit=96",
        { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("bad response");
    const json = await res.json();
    const rows: string[][] = json?.result?.list;
    if (json?.retCode !== 0 || !Array.isArray(rows) || rows.length < 2) throw new Error("no data");
    // Rows arrive newest first: [startTime, open, high, low, close, ...].
    return rows
        .map((row) => ({ t: Number(row[0]), price: Number(row[4]) }))
        .filter((p) => Number.isFinite(p.t) && Number.isFinite(p.price))
        .reverse();
}

async function fetchFromCoinGecko(): Promise<PricePoint[]> {
    const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1",
        { next: { revalidate: 300 } }
    );
    if (!res.ok) throw new Error("bad response");
    const json = await res.json();
    const prices: [number, number][] = json.prices;
    if (!Array.isArray(prices) || prices.length === 0) throw new Error("no data");

    const stride = Math.max(1, Math.floor(prices.length / TARGET_POINTS));
    const sampled: PricePoint[] = [];
    for (let i = 0; i < prices.length; i += stride) {
        sampled.push({ t: prices[i][0], price: prices[i][1] });
    }
    const last = prices[prices.length - 1];
    if (sampled.length === 0 || sampled[sampled.length - 1].t !== last[0]) {
        sampled.push({ t: last[0], price: last[1] });
    }
    return sampled;
}

export async function GET() {
    for (const source of [fetchFromBybit, fetchFromCoinGecko]) {
        try {
            const points = await source();
            return NextResponse.json(
                { points, fallback: false },
                { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" } }
            );
        } catch {
            // try the next source
        }
    }
    // Short cache so a brief outage does not pin simulated data for minutes.
    return NextResponse.json(
        { points: generateFallback(), fallback: true },
        { headers: { "Cache-Control": "public, s-maxage=30" } }
    );
}
