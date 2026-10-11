import { NextResponse } from "next/server";

// Every USDT perpetual on Bybit in one public request (no API key). If Bybit
// cannot be reached the route says so; it never substitutes made-up prices.
export const revalidate = 10;

type Row = Record<string, string>;

export async function GET() {
    try {
        const res = await fetch("https://api.bybit.com/v5/market/tickers?category=linear", { next: { revalidate: 10 } });
        const json = await res.json();
        if (!res.ok || json?.retCode !== 0) throw new Error("bybit");
        const tickers = (json.result.list as Row[])
            .filter((row) => row.symbol.endsWith("USDT") && Number(row.lastPrice) > 0)
            .map((row) => {
                const price = Number(row.lastPrice);
                const hourAgo = Number(row.prevPrice1h);
                const high = Number(row.highPrice24h);
                const low = Number(row.lowPrice24h);
                return {
                    symbol: row.symbol,
                    price,
                    change24h: Number(row.price24hPcnt) * 100,
                    change1h: hourAgo > 0 ? ((price - hourAgo) / hourAgo) * 100 : null,
                    high24h: high,
                    low24h: low,
                    // How far price travelled in 24 hours, as a share of the low.
                    range24h: low > 0 ? ((high - low) / low) * 100 : null,
                    turnover24h: Number(row.turnover24h),
                    fundingRate: row.fundingRate ? Number(row.fundingRate) * 100 : null,
                    openInterest: row.openInterestValue ? Number(row.openInterestValue) : null,
                    markPrice: Number(row.markPrice) > 0 ? Number(row.markPrice) : null,
                    indexPrice: Number(row.indexPrice) > 0 ? Number(row.indexPrice) : null,
                    nextFunding: Number(row.nextFundingTime) > 0 ? Number(row.nextFundingTime) : null,
                };
            });
        return NextResponse.json({ tickers, source: "Bybit USDT perpetual futures, public market data", fetchedAt: Date.now() }, { headers: { "Cache-Control": "public, s-maxage=10, stale-while-revalidate=20" } });
    } catch {
        return NextResponse.json({ unavailable: true }, { status: 503 });
    }
}
