import { NextResponse } from "next/server";

export const revalidate = 300;

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

export async function GET() {
    try {
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

        return NextResponse.json(
            { points: sampled, fallback: false },
            { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
        );
    } catch {
        return NextResponse.json(
            { points: generateFallback(), fallback: true },
            { headers: { "Cache-Control": "public, s-maxage=300" } }
        );
    }
}
