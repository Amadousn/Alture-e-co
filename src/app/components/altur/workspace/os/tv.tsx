"use client";

import { useEffect, useRef } from "react";

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
    <a href={href} target="_blank" rel="noopener noreferrer nofollow" className="text-[11px] text-white/40 hover:text-white transition-colors">
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

export const tradingViewSymbol = (symbol: string) => `BYBIT:${symbol}.P`;
export const tradingViewUrl = (symbol: string, interval?: string) => `https://www.tradingview.com/chart/?symbol=${encodeURIComponent(tradingViewSymbol(symbol))}${interval ? `&interval=${interval}` : ""}`;

export const AdvancedChart = ({ symbol, interval, timezone, className }: { symbol: string; interval: string; timezone: string; className?: string }) => (
    <Widget
        script="embed-widget-advanced-chart.js"
        className={className}
        config={{ autosize: true, symbol: tradingViewSymbol(symbol), interval, timezone, theme: "dark", style: "1", locale: "en", backgroundColor: "#000000", gridColor: "rgba(255,255,255,0.04)", allow_symbol_change: false, hide_side_toolbar: false, withdateranges: true, save_image: false, calendar: false, support_host: "https://www.tradingview.com" }}
    />
);
