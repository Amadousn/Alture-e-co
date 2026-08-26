import { NextResponse } from "next/server";

export const revalidate = 45;

type TickerItem = {
    symbol: string;
    value: string;
    change: string;
    up: boolean;
};

const COINGECKO_IDS: { id: string; label: string; decimals: number }[] = [
    { id: "bitcoin", label: "BTC", decimals: 2 },
    { id: "ethereum", label: "ETH", decimals: 2 },
    { id: "solana", label: "SOL", decimals: 2 },
    { id: "ripple", label: "XRP", decimals: 4 },
    { id: "binancecoin", label: "BNB", decimals: 2 },
    { id: "dogecoin", label: "DOGE", decimals: 5 },
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
        const ids = COINGECKO_IDS.map((s) => s.id).join(",");
        const res = await fetch(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
            { next: { revalidate: 45 } }
        );
        if (!res.ok) return null;
        const json = await res.json();
        if (typeof json !== "object" || json === null) return null;

        return COINGECKO_IDS.map(({ id, label, decimals }) => {
            const entry = json[id];
            const fallback = FALLBACK.find((f) => f.symbol === label)!;
            if (!entry) return fallback;

            const price = entry.usd;
            const pct = entry.usd_24h_change;
            if (typeof price !== "number" || typeof pct !== "number") return fallback;

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
