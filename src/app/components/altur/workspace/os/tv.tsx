"use client";

import { useEffect, useRef, useState } from "react";

// TradingView's official embeddable widgets. Each is an iframe served by
// TradingView: AltureLock cannot read what is inside it, and it gives no
// access to a TradingView account, its indicators, alerts or orders.
const Widget = ({ script, config, className = "" }: { script: string; config: Record<string, unknown>; className?: string }) => {
    const host = useRef<HTMLDivElement>(null);
    const key = JSON.stringify(config);

    useEffect(() => {
        const node = host.current;
        if (!node) return;
        node.innerHTML = '<div class="tradingview-widget-container__widget" style="height:100%;width:100%"></div>';
        const tag = document.createElement("script");
        tag.src = `https://s3.tradingview.com/external-embedding/${script}`;
        tag.async = true;
        tag.innerHTML = key;
        node.appendChild(tag);
        return () => {
            node.innerHTML = "";
        };
    }, [script, key]);

    // The site declares a dark colour scheme, and a transparent TradingView frame is painted white unless its holder says "light".
    return <div ref={host} className={`tradingview-widget-container ${className}`} style={{ height: "100%", width: "100%", colorScheme: "light" }} />;
};

export const Attribution = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="whitespace-nowrap text-[11px] text-white/40 hover:text-white transition-colors">
        {children}
    </a>
);

// TradingView's own country codes for the calendar.
export const CALENDAR_COUNTRIES = "us,eu,gb,jp,cn,fr,de";

export const EconomicCalendar = ({ highOnly, className }: { highOnly: boolean; className?: string }) => (
    <Widget
        script="embed-widget-events.js"
        className={className}
        config={{ colorTheme: "dark", isTransparent: true, width: "100%", height: "100%", locale: "en", importanceFilter: highOnly ? "1" : "-1,0,1", countryFilter: CALENDAR_COUNTRIES }}
    />
);

// The intervals the embedded chart accepts. TradingView's 2 and 4 minute
// charts are custom intervals of its own app and are not offered by the widget.
export const CHART_INTERVALS = [
    { id: "1", label: "1m" },
    { id: "3", label: "3m" },
    { id: "5", label: "5m" },
    { id: "15", label: "15m" },
    { id: "30", label: "30m" },
    { id: "60", label: "1h" },
    { id: "240", label: "4h" },
    { id: "D", label: "1D" },
] as const;

// TradingView's own name for the market: a Bybit contract, Nasdaq's index, or a stock or forex pair as typed.
export const tradingViewSymbol = (symbol: string) => (symbol === "NASDAQ" ? "OANDA:NAS100USD" : symbol.endsWith("USDT") ? `BYBIT:${symbol}.P` : symbol);

// The candles of the Alture indicators. Only TradingView's tv.js embed accepts them.
const INDICATOR_CANDLES = {
    "paneProperties.background": "#000000",
    "paneProperties.backgroundType": "solid",
    "mainSeriesProperties.candleStyle.upColor": "#9C9C9C",
    "mainSeriesProperties.candleStyle.borderUpColor": "#4DD0E1",
    "mainSeriesProperties.candleStyle.wickUpColor": "#FFFFFF",
    "mainSeriesProperties.candleStyle.downColor": "#FFFFFF",
    "mainSeriesProperties.candleStyle.borderDownColor": "#E955A8",
    "mainSeriesProperties.candleStyle.wickDownColor": "#FFFFFF",
};
export const tradingViewUrl = (symbol: string, interval?: string) => `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tradingViewSymbol(symbol))}${interval ? `&interval=${interval}` : ""}`;

export const AdvancedChart = ({ symbol, interval, timezone, className }: { symbol: string; interval: string; timezone: string; className?: string }) => (
    <Widget
        script="embed-widget-advanced-chart.js"
        className={className}
        config={{ autosize: true, symbol: tradingViewSymbol(symbol), interval, timezone, theme: "dark", style: "1", locale: "en", backgroundColor: "#000000", gridColor: "rgba(255,255,255,0.04)", allow_symbol_change: false, hide_side_toolbar: false, withdateranges: true, save_image: false, calendar: false, support_host: "https://www.tradingview.com" }}
    />
);

let tvScript: Promise<void> | null = null;
const loadTv = () =>
    (tvScript ??= new Promise<void>((resolve, reject) => {
        const tag = document.createElement("script");
        tag.src = "https://s3.tradingview.com/tv.js";
        tag.onload = () => resolve();
        tag.onerror = () => {
            tvScript = null;
            reject(new Error("TradingView unavailable"));
        };
        document.head.appendChild(tag);
    }));

// TradingView's chart with the candles of our indicators.
export const IndicatorCandlesChart = ({ symbol, interval, timezone }: { symbol: string; interval: string; timezone: string }) => {
    const host = useRef<HTMLDivElement>(null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        let live = true;
        const node = host.current;
        if (!node) return;
        const id = `tv-${crypto.randomUUID()}`;
        node.innerHTML = `<div id="${id}" style="height:100%;width:100%"></div>`;
        setFailed(false);
        loadTv()
            .then(() => {
                if (!live) return;
                const { TradingView } = window as unknown as { TradingView: { widget: new (config: Record<string, unknown>) => unknown } };
                new TradingView.widget({ autosize: true, symbol: tradingViewSymbol(symbol), interval, timezone, theme: "dark", style: "1", locale: "en", container_id: id, allow_symbol_change: false, save_image: false, overrides: INDICATOR_CANDLES, support_host: "https://www.tradingview.com" });
            })
            .catch(() => live && setFailed(true));
        return () => {
            live = false;
            node.innerHTML = "";
        };
    }, [symbol, interval, timezone]);

    if (failed) return <p className="flex h-full items-center justify-center px-6 text-center text-sm text-[#9a9aa5]">TradingView could not be reached. Your levels and numbers still work.</p>;
    return (
        <div className="relative h-full w-full">
            <p className="absolute inset-0 flex items-center justify-center text-sm text-[#7d7d87]">Loading TradingView…</p>
            <div ref={host} className="relative" style={{ height: "100%", width: "100%", colorScheme: "light" }} />
        </div>
    );
};
