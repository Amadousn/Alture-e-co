import { NextRequest, NextResponse } from "next/server";

// Recent candles for one USDT perpetual at one interval, from Bybit's public
// data. Used by the cockpit's own chart. Never substitutes made-up prices.
const INTERVALS = new Set(["1", "3", "5", "15", "30", "60", "240", "D"]);

export async function GET(request: NextRequest) {
    const symbol = (request.nextUrl.searchParams.get("symbol") ?? "").toUpperCase();
    const interval = request.nextUrl.searchParams.get("interval") ?? "15";
    if (!/^[A-Z0-9]{2,20}USDT$/.test(symbol) || !INTERVALS.has(interval)) return NextResponse.json({ unavailable: true }, { status: 400 });
    // With start and end (milliseconds) the route returns that stretch of history instead of the latest candles.
    const start = Number(request.nextUrl.searchParams.get("start"));
    const end = Number(request.nextUrl.searchParams.get("end"));
    const historical = Number.isFinite(start) && Number.isFinite(end) && start > 0 && end > start;
    // How many of the latest candles to return when no stretch of history is asked for.
    const asked = Math.floor(Number(request.nextUrl.searchParams.get("limit")));
    const limit = Number.isFinite(asked) && asked >= 2 ? Math.min(asked, 1000) : 160;
    try {
        const res = await fetch(`https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol}&interval=${interval}&limit=${historical ? 300 : limit}${historical ? `&start=${Math.floor(start)}&end=${Math.floor(end)}` : ""}`, { next: { revalidate: historical ? 3600 : 10 } });
        const json = await res.json();
        if (!res.ok || json?.retCode !== 0) throw new Error("bybit");
        // Rows arrive newest first: [startTime, open, high, low, close, volume, turnover].
        const candles = (json.result.list as string[][])
            .map((row) => ({ t: Number(row[0]), o: Number(row[1]), h: Number(row[2]), l: Number(row[3]), c: Number(row[4]), v: Number(row[5]) || 0 }))
            .filter((c) => [c.t, c.o, c.h, c.l, c.c].every(Number.isFinite))
            .reverse();
        if (candles.length < 2) throw new Error("empty");
        return NextResponse.json({ symbol, interval, candles, source: "Bybit USDT perpetual futures, public market data", fetchedAt: Date.now() }, { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=20" } });
    } catch {
        return NextResponse.json({ unavailable: true }, { status: 503 });
    }
}
