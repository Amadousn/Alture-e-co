import { NextRequest, NextResponse } from "next/server";

// Recent candles for one USDT perpetual at one interval, from Bybit's public
// data. Used by the cockpit's own chart. Never substitutes made-up prices.
const INTERVALS = new Set(["1", "3", "5", "15", "30", "60", "240", "D"]);

// Each answer from Bybit is kept briefly and shared, so many charts asking at once make one request. If a refresh fails,
// the real candles from the last minute are kept rather than blanking a chart.
const held = new Map<string, { at: number; list?: string[][]; pending?: Promise<string[][]> }>();

async function rows(url: string, keep: number) {
    const entry = held.get(url);
    const age = entry ? Date.now() - entry.at : Infinity;
    if (entry?.list && age < keep) return entry.list;
    if (entry?.pending) return entry.pending;
    if (held.size > 500) held.clear();
    const pending = fetch(url, { cache: "no-store" })
        .then((res) => res.json().then((json) => {
            if (!res.ok || json?.retCode !== 0) throw new Error("bybit");
            return json.result.list as string[][];
        }))
        .then((list) => {
            held.set(url, { at: Date.now(), list });
            return list;
        })
        .catch((error) => {
            const last = held.get(url);
            if (last?.list && Date.now() - last.at < Math.max(keep, 60_000)) {
                held.set(url, { at: last.at, list: last.list });
                return last.list;
            }
            held.delete(url);
            throw error;
        });
    held.set(url, { at: entry?.at ?? 0, list: entry?.list, pending });
    return pending;
}

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
        const list = await rows(`https://api.bybit.com/v5/market/kline?category=linear&symbol=${symbol}&interval=${interval}&limit=${historical ? 1000 : limit}${historical ? `&start=${Math.floor(start)}&end=${Math.floor(end)}` : ""}`, historical ? 3_600_000 : 10_000);
        // Rows arrive newest first: [startTime, open, high, low, close, volume, turnover].
        const candles = list
            .map((row) => ({ t: Number(row[0]), o: Number(row[1]), h: Number(row[2]), l: Number(row[3]), c: Number(row[4]), v: Number(row[5]) || 0 }))
            .filter((c) => [c.t, c.o, c.h, c.l, c.c].every(Number.isFinite))
            .reverse();
        if (candles.length < 2) throw new Error("empty");
        return NextResponse.json({ symbol, interval, candles, source: "Bybit USDT perpetual futures, public market data", fetchedAt: Date.now() }, { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=20" } });
    } catch {
        return NextResponse.json({ unavailable: true }, { status: 503 });
    }
}
