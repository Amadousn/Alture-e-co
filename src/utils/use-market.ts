"use client";

import { useEffect, useState } from "react";
import type { MarketRules } from "@/utils/trade-plan";

export type Candle = { t: number; o: number; h: number; l: number; c: number };

export type Market =
    // No feed is connected for this asset at all.
    | { status: "none" }
    | { status: "loading" }
    // A feed exists but could not be reached just now.
    | { status: "unavailable" }
    // `simulated` marks made-up data used only by the guided demo.
    | { status: "live"; symbol: string; price: number; change24h: number | null; candles: Candle[]; rules: MarketRules; source: string; fetchedAt: number; simulated?: boolean };

const REFRESH_MS = 10000;

// Public price, recent candles and quantity rules for one feed symbol.
export function useMarket(feed: string | null): Market {
    const [market, setMarket] = useState<Market>(feed ? { status: "loading" } : { status: "none" });

    useEffect(() => {
        if (!feed) {
            setMarket({ status: "none" });
            return;
        }
        let cancelled = false;
        setMarket({ status: "loading" });
        const load = async () => {
            try {
                const res = await fetch(`/api/market?symbol=${feed}`, { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setMarket({ status: "live", ...json });
            } catch {
                // Keep the last real reading rather than blanking the chart on one failed poll.
                if (!cancelled) setMarket((current) => (current.status === "live" && current.symbol === feed ? current : { status: "unavailable" }));
            }
        };
        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [feed]);

    return market;
}

export type Quotes = { status: "loading" | "unavailable" } | { status: "live"; quotes: Record<string, { price: number; change24h: number | null }>; source: string; fetchedAt: number; simulated?: boolean };

// One quote per asset with a feed, for the asset picker.
export function useQuotes(enabled: boolean): Quotes {
    const [quotes, setQuotes] = useState<Quotes>({ status: "loading" });

    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch("/api/market", { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                const map: Record<string, { price: number; change24h: number | null }> = {};
                for (const item of json.quotes) map[item.symbol] = { price: item.price, change24h: item.change24h };
                if (!cancelled) setQuotes({ status: "live", quotes: map, source: json.source, fetchedAt: json.fetchedAt });
            } catch {
                if (!cancelled) setQuotes((current) => (current.status === "live" ? current : { status: "unavailable" }));
            }
        };
        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [enabled]);

    return quotes;
}
