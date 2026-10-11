"use client";

import { useEffect, useState } from "react";
import type { NewsItem } from "@/utils/news-desk";

export type Ticker = { symbol: string; price: number; change24h: number; change1h: number | null; high24h: number; low24h: number; range24h: number | null; turnover24h: number; fundingRate: number | null; openInterest: number | null; markPrice?: number | null; indexPrice?: number | null; nextFunding?: number | null };

export type Tickers = { status: "loading" | "unavailable" } | { status: "live"; bySymbol: Record<string, Ticker>; all: Ticker[]; source: string; fetchedAt: number };

// Every USDT perpetual, refreshed every 15 seconds. A failed refresh keeps the last real reading.
export function useTickers(): Tickers {
    const [state, setState] = useState<Tickers>({ status: "loading" });
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch("/api/market/tickers", { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setState({ status: "live", all: json.tickers, bySymbol: Object.fromEntries(json.tickers.map((item: Ticker) => [item.symbol, item])), source: json.source, fetchedAt: json.fetchedAt });
            } catch {
                if (!cancelled) setState((current) => (current.status === "live" ? current : { status: "unavailable" }));
            }
        };
        load();
        const id = setInterval(load, 15000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);
    return state;
}

export type News = { status: "loading" | "unavailable" } | { status: "live"; items: NewsItem[]; sources: { name: string; ok: boolean }[]; fetchedAt: number };

export function useNews(desk: "crypto" | "macro" = "crypto", enabled = true): News {
    const [state, setState] = useState<News>({ status: "loading" });
    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch(`/api/news?desk=${desk}`, { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setState({ status: "live", items: json.items, sources: json.sources, fetchedAt: json.fetchedAt });
            } catch {
                if (!cancelled) setState((current) => (current.status === "live" ? current : { status: "unavailable" }));
            }
        };
        load();
        const id = setInterval(load, 5 * 60 * 1000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [desk, enabled]);
    return state;
}

export type BriefingStory = {
    headline: string;
    whatHappened: string;
    whyItMatters: string;
    watchNext: string;
    scope: "Crypto" | "Macro";
    lean: "Bullish" | "Bearish" | "Mixed" | "Unclear";
    assets: string[];
    sources: { title: string; url: string; source: string }[];
};

export type Briefing =
    | { status: "loading" | "unavailable" }
    // No AI service has been set up on this server.
    | { status: "not-configured" }
    | { status: "ready"; stories: BriefingStory[]; generatedAt: number; model: string; headlinesRead: number; sample?: boolean };

export function useBriefing(enabled = true): Briefing {
    const [state, setState] = useState<Briefing>({ status: "loading" });
    useEffect(() => {
        if (!enabled) return;
        let cancelled = false;
        const load = async () => {
            try {
                const res = await fetch("/api/briefing", { cache: "no-store" });
                const json = await res.json();
                if (cancelled) return;
                if (json.configured === false) setState({ status: "not-configured" });
                else if (!res.ok) setState((current) => (current.status === "ready" ? current : { status: "unavailable" }));
                else setState({ status: "ready", ...json });
            } catch {
                if (!cancelled) setState((current) => (current.status === "ready" ? current : { status: "unavailable" }));
            }
        };
        load();
        const id = setInterval(load, 10 * 60 * 1000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [enabled]);
    return state;
}
