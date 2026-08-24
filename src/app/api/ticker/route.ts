import { NextResponse } from "next/server";

export const revalidate = 45;

type TickerItem = {
    symbol: string;
    value: string;
    change: string;
    up: boolean;
};

const BINANCE_SYMBOLS: { pair: string; label: string; decimals: number }[] = [
    { pair: "BTCUSDT", label: "BTC", decimals: 2 },
    { pair: "ETHUSDT", label: "ETH", decimals: 2 },
    { pair: "SOLUSDT", label: "SOL", decimals: 2 },
    { pair: "XRPUSDT", label: "XRP", decimals: 4 },
    { pair: "BNBUSDT", label: "BNB", decimals: 2 },
    { pair: "DOGEUSDT", label: "DOGE", decimals: 5 },
];

const FALLBACK: TickerItem[] = [
    { symbol: "BTC", value: "$98,432.10", change: "+2.4%", up: true },
    { symbol: "ETH", value: "$2,845.50", change: "+1.2%", up: true },
    { symbol: "SOL", value: "$324.15", change: "-0.5%", up: false },
    { symbol: "XRP", value: "$2.1500", change: "+0.9%", up: true },
    { symbol: "BNB", value: "$695.20", change: "+0.6%", up: true },
    { symbol: "DOGE", value: "$0.31500", change: "-1.1%", up: false },
];

function formatNumber(n: number, decimals: number) {
    return n.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}

async function fetchCrypto(): Promise<TickerItem[] | null> {
    try {
        const symbols = encodeURIComponent(JSON.stringify(BINANCE_SYMBOLS.map((s) => s.pair)));
        const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr?symbols=${symbols}`, {
            next: { revalidate: 45 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        if (!Array.isArray(json)) return null;

        return BINANCE_SYMBOLS.map(({ pair, label, decimals }) => {
            const entry = json.find((e: any) => e?.symbol === pair);
            const fallback = FALLBACK.find((f) => f.symbol === label)!;
            if (!entry) return fallback;

            const price = parseFloat(entry.lastPrice);
            const pct = parseFloat(entry.priceChangePercent);
            if (Number.isNaN(price) || Number.isNaN(pct)) return fallback;

            return {
                symbol: label,
                value: `$${formatNumber(price, decimals)}`,
                change: `${pct >= 0 ? "+" : ""}${pct.toFixed(2)}%`,
                up: pct >= 0,
            };
        });
    } catch {
        return null;
    }
}

export async function GET() {
    try {
        const crypto = await fetchCrypto();
        const items = crypto ?? FALLBACK;

        return NextResponse.json(
            { items, updatedAt: Date.now(), fallback: crypto == null },
            { headers: { "Cache-Control": "public, s-maxage=45, stale-while-revalidate=90" } }
        );
    } catch {
        return NextResponse.json(
            { items: FALLBACK, updatedAt: Date.now(), fallback: true },
            { headers: { "Cache-Control": "public, s-maxage=45" } }
        );
    }
}
