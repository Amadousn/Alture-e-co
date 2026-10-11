import { NextRequest, NextResponse } from "next/server";
import { FEED_SYMBOLS } from "@/utils/trade-plan";

// Public market data for the Rules planner, from Bybit's public endpoints
// (no API key). If Bybit cannot be reached the route says so: it never
// substitutes a made-up price.

const BASE = "https://api.bybit.com/v5/market";
const SOURCE = "Bybit USDT perpetual futures, public market data";

async function bybit(path: string, revalidate: number) {
    const res = await fetch(`${BASE}/${path}`, { next: { revalidate } });
    if (!res.ok) throw new Error("bad response");
    const json = await res.json();
    if (json?.retCode !== 0) throw new Error("bybit error");
    return json.result;
}

async function quote(symbol: string) {
    const result = await bybit(`tickers?category=linear&symbol=${symbol}`, 5);
    const row = result?.list?.[0];
    const price = Number(row?.lastPrice);
    const change = Number(row?.price24hPcnt);
    if (!Number.isFinite(price) || price <= 0) throw new Error("no price");
    return { symbol, price, change24h: Number.isFinite(change) ? change * 100 : null };
}

export async function GET(request: NextRequest) {
    const symbol = request.nextUrl.searchParams.get("symbol");
    const headers = { "Cache-Control": "public, s-maxage=5, stale-while-revalidate=10" };

    // No symbol: a quote for every asset that has a feed.
    if (!symbol) {
        const settled = await Promise.allSettled(FEED_SYMBOLS.map(quote));
        const quotes = settled.flatMap((item) => (item.status === "fulfilled" ? [item.value] : []));
        if (quotes.length === 0) return NextResponse.json({ unavailable: true }, { status: 503 });
        return NextResponse.json({ quotes, source: SOURCE, fetchedAt: Date.now() }, { headers });
    }

    if (!FEED_SYMBOLS.includes(symbol)) return NextResponse.json({ unavailable: true }, { status: 404 });

    try {
        const [ticker, kline, info] = await Promise.all([
            quote(symbol),
            bybit(`kline?category=linear&symbol=${symbol}&interval=15&limit=96`, 15),
            bybit(`instruments-info?category=linear&symbol=${symbol}`, 3600),
        ]);
        // Rows arrive newest first: [startTime, open, high, low, close, ...].
        const candles = (kline?.list as string[][])
            .map((row) => ({ t: Number(row[0]), o: Number(row[1]), h: Number(row[2]), l: Number(row[3]), c: Number(row[4]) }))
            .filter((c) => [c.t, c.o, c.h, c.l, c.c].every(Number.isFinite))
            .reverse();
        const spec = info?.list?.[0];
        const rules = { tickSize: Number(spec?.priceFilter?.tickSize), qtyStep: Number(spec?.lotSizeFilter?.qtyStep), minQty: Number(spec?.lotSizeFilter?.minOrderQty), maxLeverage: Number(spec?.leverageFilter?.maxLeverage) };
        if (candles.length < 2 || !Object.values(rules).every((value) => Number.isFinite(value) && value > 0)) throw new Error("incomplete");
        return NextResponse.json({ ...ticker, candles, rules, source: SOURCE, fetchedAt: Date.now() }, { headers });
    } catch {
        return NextResponse.json({ unavailable: true }, { status: 503 });
    }
}
