import { NextRequest, NextResponse } from "next/server";

// The most recent public trades for one USDT perpetual, from Bybit. Each trade
// carries the taker side as stated by the exchange. Bybit only serves the last
// 1,000 trades here, so this seeds the order flow view; it is not history.
export async function GET(request: NextRequest) {
    const symbol = (request.nextUrl.searchParams.get("symbol") ?? "").toUpperCase();
    if (!/^[A-Z0-9]{2,20}USDT$/.test(symbol)) return NextResponse.json({ unavailable: true }, { status: 400 });
    try {
        const res = await fetch(`https://api.bybit.com/v5/market/recent-trade?category=linear&symbol=${symbol}&limit=1000`, { cache: "no-store" });
        const json = await res.json();
        if (!res.ok || json?.retCode !== 0) throw new Error("bybit");
        // Rows arrive newest first.
        const trades = (json.result.list as { execId: string; price: string; size: string; side: string; time: string }[])
            .map((row) => ({ id: row.execId, t: Number(row.time), p: Number(row.price), q: Number(row.size), side: row.side }))
            .filter((trade) => trade.id && (trade.side === "Buy" || trade.side === "Sell") && [trade.t, trade.p, trade.q].every(Number.isFinite))
            .reverse();
        return NextResponse.json({ symbol, trades, source: "Bybit USDT perpetual futures, public trades" }, { headers: { "Cache-Control": "no-store" } });
    } catch {
        return NextResponse.json({ unavailable: true }, { status: 503 });
    }
}
