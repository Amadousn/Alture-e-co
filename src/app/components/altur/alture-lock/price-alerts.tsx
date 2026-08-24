"use client";

import { useEffect, useRef, useState } from "react";

const INSTRUMENTS = ["BTC", "ETH", "SOL", "XRP", "BNB", "DOGE"];
const REFRESH_MS = 45 * 1000;

type Direction = "above" | "below";

type Alert = {
    id: string;
    instrument: string;
    targetPrice: number;
    direction: Direction;
    triggered: boolean;
};

function parsePrice(value: string): number | null {
    const cleaned = value.replace(/[^0-9.]/g, "");
    const num = parseFloat(cleaned);
    return Number.isNaN(num) ? null : num;
}

const PriceAlerts = () => {
    const [prices, setPrices] = useState<Record<string, number>>({});
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [instrument, setInstrument] = useState(INSTRUMENTS[3]);
    const [direction, setDirection] = useState<Direction>("above");
    const [targetInput, setTargetInput] = useState("");
    const [justTriggered, setJustTriggered] = useState<Alert | null>(null);
    const alertsRef = useRef<Alert[]>([]);
    alertsRef.current = alerts;

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/ticker", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (cancelled || !Array.isArray(data.items)) return;

                const nextPrices: Record<string, number> = {};
                data.items.forEach((item: { symbol: string; value: string }) => {
                    const parsed = parsePrice(item.value);
                    if (parsed != null) nextPrices[item.symbol] = parsed;
                });
                setPrices(nextPrices);

                const current = alertsRef.current;
                let triggeredNow: Alert | null = null;
                const updated = current.map((a) => {
                    if (a.triggered) return a;
                    const price = nextPrices[a.instrument];
                    if (price == null) return a;
                    const hit = a.direction === "above" ? price >= a.targetPrice : price <= a.targetPrice;
                    if (hit) {
                        triggeredNow = { ...a, triggered: true };
                        return triggeredNow;
                    }
                    return a;
                });
                if (triggeredNow) {
                    setAlerts(updated);
                    setJustTriggered(triggeredNow);
                }
            } catch {
                // keep the last known prices if the fetch fails
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    const addAlert = () => {
        const target = parsePrice(targetInput);
        if (target == null || target <= 0) return;
        const newAlert: Alert = {
            id: `${instrument}-${Date.now()}`,
            instrument,
            targetPrice: target,
            direction,
            triggered: false,
        };
        setAlerts((a) => [...a, newAlert]);
        setTargetInput("");
    };

    const removeAlert = (id: string) => {
        setAlerts((a) => a.filter((alert) => alert.id !== id));
        setJustTriggered((t) => (t && t.id === id ? null : t));
    };

    return (
        <div className="border border-white/10 bg-black/40 p-8 md:p-10 max-w-2xl mx-auto text-left">
            <p className="text-xs font-mono tracking-[0.2em] text-primary/50 mb-4 text-center">
                WATCHLIST
            </p>
            <p className="text-sm font-light text-gray-400 leading-relaxed max-w-md mx-auto text-center mb-8">
                Set a target price for an instrument and get notified when it is reached. This runs continuously in the background, independent of the checklist above.
            </p>

            {justTriggered && (
                <div className="alert-pulse border border-primary/50 text-primary text-sm font-light px-4 py-3 mb-6 text-center">
                    Alert triggered. {justTriggered.instrument} reached ${justTriggered.targetPrice}.
                </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-6">
                <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                    className="bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                >
                    {INSTRUMENTS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
                <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value as Direction)}
                    className="bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                >
                    <option value="above">Reaches at or above</option>
                    <option value="below">Reaches at or below</option>
                </select>
                <input
                    type="text"
                    inputMode="decimal"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    placeholder="Target price"
                    className="flex-1 bg-black border border-white/15 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none"
                />
                <button
                    onClick={addAlert}
                    className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
                >
                    Add Alert
                </button>
            </div>

            {alerts.length === 0 ? (
                <p className="text-sm font-light text-gray-500 text-center">
                    No price alerts set yet.
                </p>
            ) : (
                <div className="space-y-2">
                    {alerts.map((a) => {
                        const current = prices[a.instrument];
                        return (
                            <div
                                key={a.id}
                                className={`flex items-center justify-between px-4 py-3 border text-sm ${a.triggered ? "border-primary/50" : "border-white/10"}`}
                            >
                                <div>
                                    <span className="text-white font-light">
                                        {a.instrument} {a.direction === "above" ? "at or above" : "at or below"} ${a.targetPrice}
                                    </span>
                                    {current != null && (
                                        <span className="text-gray-500 font-mono text-xs ml-3">
                                            current ${current}
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-xs uppercase tracking-[0.1em] ${a.triggered ? "text-primary" : "text-gray-500"}`}>
                                        {a.triggered ? "Triggered" : "Pending"}
                                    </span>
                                    <button
                                        onClick={() => removeAlert(a.id)}
                                        className="text-xs uppercase tracking-[0.1em] text-gray-500 hover:text-white transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <style jsx>{`
                @keyframes alertPulse {
                    0% { transform: scale(1); }
                    30% { transform: scale(1.03); }
                    60% { transform: scale(0.99); }
                    100% { transform: scale(1); }
                }
                :global(.alert-pulse) {
                    animation: alertPulse 500ms ease-out;
                }
            `}</style>
        </div>
    );
};

export default PriceAlerts;
