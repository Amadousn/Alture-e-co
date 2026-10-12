"use client";

import { useState } from "react";
import { AdvancedChart, tradingViewSymbol, tradingViewUrl } from "@/app/components/altur/workspace/os/tv";

// The market as it is now, from TradingView, kept apart from the lessons: the
// exercises use historical candles so that every learner sees the same chart.
const LiveChart = () => {
    const [open, setOpen] = useState(false);
    return (
        <section className="!py-0 mt-12 border-t border-white/10 pt-6" aria-label="Live Bitcoin chart">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)} className="group inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-sm font-medium text-white hover:border-white transition-colors">
                    {open ? "Hide the live chart" : "See the live Bitcoin chart"}
                    <span aria-hidden="true" className={`transition-transform duration-300 ${open ? "rotate-90" : "group-hover:translate-x-1"}`}>→</span>
                </button>
                <p className="text-xs text-white/40">TradingView · {tradingViewSymbol("BTCUSDT")} (Bybit) · 15-minute candles · live</p>
            </div>
            {open && (
                <div className="cockpit-rise">
                    <div className="mt-5 h-[440px] md:h-[520px]">
                        <AdvancedChart symbol="BTCUSDT" interval="15" timezone="Etc/UTC" />
                    </div>
                    <p className="mt-3 max-w-3xl text-xs leading-relaxed text-white/40">
                        This is the same market as the lessons, live, drawn by TradingView in its own colours. The lessons themselves use historical candles, so the questions always have the same answers. It is here to practise reading, not as a signal to trade.{" "}
                        <a href={tradingViewUrl("BTCUSDT", "15")} target="_blank" rel="noopener noreferrer" className="border-b border-white/25 text-white/70 hover:text-white">
                            Open on TradingView ↗
                        </a>
                    </p>
                </div>
            )}
        </section>
    );
};

export default LiveChart;
