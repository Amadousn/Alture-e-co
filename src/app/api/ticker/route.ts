import { NextResponse } from "next/server";

export const revalidate = 300;

type TickerItem = {
    symbol: string;
    value: string;
    change: string;
    up: boolean;
};

const SYMBOLS: { yahoo: string; label: string; prefix?: string; decimals?: number }[] = [
    { yahoo: "BTC-USD", label: "BTC", prefix: "$", decimals: 2 },
    { yahoo: "ETH-USD", label: "ETH", prefix: "$", decimals: 2 },
    { yahoo: "SOL-USD", label: "SOL", prefix: "$", decimals: 2 },
    { yahoo: "GC=F", label: "GOLD", prefix: "$", decimals: 2 },
    { yahoo: "^GSPC", label: "S&P 500", decimals: 2 },
    { yahoo: "EURUSD=X", label: "EUR/USD", decimals: 4 },
    { yahoo: "^IXIC", label: "NASDAQ", decimals: 2 },
    { yahoo: "CL=F", label: "OIL (WTI)", prefix: "$", decimals: 2 },
];

const FALLBACK: TickerItem[] = [
    { symbol: "BTC", value: "$98,432.10", change: "+2.4%", up: true },
    { symbol: "ETH", value: "$2,845.50", change: "+1.2%", up: true },
    { symbol: "SOL", value: "$324.15", change: "-0.5%", up: false },
    { symbol: "GOLD", value: "$2,750.80", change: "+0.3%", up: true },
    { symbol: "S&P 500", value: "5,890.20", change: "+0.8%", up: true },
    { symbol: "EUR/USD", value: "1.0845", change: "-0.1%", up: false },
    { symbol: "NASDAQ", value: "18,430.50", change: "+1.1%", up: true },
    { symbol: "OIL (WTI)", value: "$76.40", change: "+0.4%", up: true },
];

const UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

function formatNumber(n: number, decimals: number) {
    return n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

async function fetchOne(yahooSymbol: string): Promise<{ price: number; previousClose: number } | null> {
    try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
            yahooSymbol
        )}?interval=1d&range=5d`;
        const res = await fetch(url, {
            headers: { "User-Agent": UA, Accept: "application/json" },
            next: { revalidate: 300 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        const meta = json?.chart?.result?.[0]?.meta;
        if (!meta) return null;
        const price: number | undefined = meta.regularMarketPrice;
        const previousClose: number | undefined =
            meta.chartPreviousClose ?? meta.previousClose;
        if (price == null || previousClose == null) return null;
        return { price, previousClose };
    } catch {
        return null;
    }
}

export async function GET() {
    try {
        const results = await Promise.all(SYMBOLS.map((s) => fetchOne(s.yahoo)));

        let anySuccess = false;
        const items: TickerItem[] = SYMBOLS.map((s, i) => {
            const data = results[i];
            const fallback = FALLBACK.find((f) => f.symbol === s.label)!;
            if (!data) return fallback;
            anySuccess = true;
            const pct = ((data.price - data.previousClose) / data.previousClose) * 100;
            const up = pct >= 0;
            return {
                symbol: s.label,
                value: `${s.prefix ?? ""}${formatNumber(data.price, s.decimals ?? 2)}`,
                change: `${up ? "+" : ""}${pct.toFixed(2)}%`,
                up,
            };
        });

        if (!anySuccess) {
            return NextResponse.json(
                { items: FALLBACK, updatedAt: Date.now(), fallback: true },
                { headers: { "Cache-Control": "public, s-maxage=60" } }
            );
        }

        return NextResponse.json(
            { items, updatedAt: Date.now() },
            { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
        );
    } catch {
        return NextResponse.json(
            { items: FALLBACK, updatedAt: Date.now(), fallback: true },
            { headers: { "Cache-Control": "public, s-maxage=60" } }
        );
    }
}
