"use client";

import { useEffect, useRef, useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { getScreenshot, removeScreenshot, saveScreenshot } from "@/utils/screenshot-store";

type Candle = { t: number; o: number; h: number; l: number; c: number };

const UP = "#20B8A8";
const DOWN = "#E955A8";
const ACCENT = "#E3A1F7";
const MINUTE = 60000;
// Bybit's candle sizes, in minutes, with the code each one is requested by.
const SIZES: [number, string, string][] = [[1, "1", "1 minute"], [3, "3", "3 minute"], [5, "5", "5 minute"], [15, "15", "15 minute"], [30, "30", "30 minute"], [60, "60", "1 hour"], [240, "240", "4 hour"], [1440, "D", "daily"]];

const W = 720;
const H = 260;
const TOP = 18;
const BOTTOM = 22;
const RIGHT = 6;

const price = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: value >= 100 ? 2 : value >= 1 ? 4 : 6 })}`;
const when = (time: number) => new Date(time).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

// The stretch of history to show, and the candle size that fits it in about a hundred candles.
function windowFor(trade: ClosedTrade) {
    const from = trade.openedAt ?? trade.closedAt;
    const held = Math.max(trade.closedAt - from, 0);
    // Without an entry time there is no duration to fit, so 15-minute candles give the exit some context.
    const [minutes, code, name] = trade.openedAt ? (SIZES.find(([size]) => (held * 1.8) / (size * MINUTE) <= 110) ?? SIZES[SIZES.length - 1]) : SIZES[3];
    const pad = Math.max(held * 0.4, minutes * MINUTE * (trade.openedAt ? 14 : 45));
    return { start: from - pad, end: Math.min(trade.closedAt + pad, Date.now()), minutes, code, name };
}

// What happened, drawn: the real candles of the trade's instrument, with the
// entry, the exit and the plan's levels marked where they actually were.
const TradeRecap = ({ trade, sample = false, bare = false }: { trade: ClosedTrade; sample?: boolean; bare?: boolean }) => {
    const [state, setState] = useState<{ id: string; candles: Candle[] | null } | null>(null);
    const [shot, setShot] = useState<string | null>(null);
    const [viewing, setViewing] = useState(false);
    const [shotError, setShotError] = useState("");
    const picker = useRef<HTMLInputElement>(null);
    const view = windowFor(trade);
    const hasFeed = /^[A-Z0-9]{2,20}USDT$/.test(trade.instrument);

    useEffect(() => {
        let cancelled = false;
        if (!hasFeed) {
            setState({ id: trade.id, candles: null });
            return;
        }
        setState(null);
        fetch(`/api/market/klines?symbol=${trade.instrument}&interval=${view.code}&start=${Math.floor(view.start)}&end=${Math.floor(view.end)}`)
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((json) => !cancelled && setState({ id: trade.id, candles: json.candles }))
            .catch(() => !cancelled && setState({ id: trade.id, candles: null }));
        return () => {
            cancelled = true;
        };
        // The window is derived from the trade, so the trade's id is the whole dependency.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trade.id]);

    // The attached screenshot, if this trade has one.
    useEffect(() => {
        let url: string | null = null;
        let cancelled = false;
        setShot(null);
        setViewing(false);
        setShotError("");
        if (sample || bare) return;
        getScreenshot(trade.id)
            .then((blob) => {
                if (cancelled || !blob) return;
                url = URL.createObjectURL(blob);
                setShot(url);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
            if (url) URL.revokeObjectURL(url);
        };
    }, [trade.id, sample, bare]);

    const attach = async (file: File | undefined) => {
        if (!file) return;
        setShotError("");
        try {
            const blob = await saveScreenshot(trade.id, file);
            setShot(URL.createObjectURL(blob));
        } catch {
            setShotError("That image could not be saved. Try a PNG or JPEG.");
        }
    };

    const loading = state === null || state.id !== trade.id;
    const candles = !loading ? state.candles : null;
    const long = trade.direction === "Long";
    const won = trade.profitLoss >= 0;
    // Individual fills when the source recorded them, otherwise the one entry and one exit the trade carries.
    const marks = trade.executions?.length
        ? trade.executions
        : [...(trade.openedAt ? [{ kind: "entry" as const, price: trade.entryPrice, quantity: trade.quantity, at: trade.openedAt }] : []), { kind: "exit" as const, price: trade.exitPrice, quantity: trade.quantity, at: trade.closedAt }];
    const levels = [
        ...(trade.takeProfit ? [{ label: "TP", value: trade.takeProfit, color: UP }] : []),
        ...(trade.stopLoss ? [{ label: "SL", value: trade.stopLoss, color: DOWN }] : []),
    ];

    let chart: React.ReactNode = null;
    if (candles && candles.length >= 2) {
        const values = [...candles.flatMap((c) => [c.h, c.l]), ...marks.map((m) => m.price), trade.entryPrice, ...levels.map((l) => l.value)];
        const lo = Math.min(...values);
        const hi = Math.max(...values);
        const pad = (hi - lo) * 0.08 || hi * 0.002;
        const min = lo - pad;
        const max = hi + pad;
        const t0 = candles[0].t;
        const t1 = candles[candles.length - 1].t + view.minutes * MINUTE;
        const x = (time: number) => Math.min(W - RIGHT, Math.max(0, ((time - t0) / (t1 - t0)) * (W - RIGHT)));
        const y = (value: number) => TOP + ((max - value) / (max - min)) * (H - TOP - BOTTOM);
        const slot = (W - RIGHT) / candles.length;
        const body = Math.max(1, slot * 0.6);
        const first = marks.find((m) => m.kind === "entry");
        const lastExit = [...marks].reverse().find((m) => m.kind === "exit");
        chart = (
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={`${trade.instrument} ${view.name} candles around the trade, with entry and exit marked`}>
                {/* While the trade was open */}
                {first && lastExit && <rect x={x(first.at)} y={TOP} width={Math.max(1, x(lastExit.at) - x(first.at))} height={H - TOP - BOTTOM} fill={won ? UP : DOWN} opacity={0.06} />}
                {candles.map((c) => {
                    const cx = x(c.t) + slot / 2;
                    const color = c.c >= c.o ? UP : DOWN;
                    return (
                        <g key={c.t} opacity={0.75}>
                            <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                            <rect x={cx - body / 2} y={Math.min(y(c.o), y(c.c))} width={body} height={Math.max(1, Math.abs(y(c.o) - y(c.c)))} fill={color} />
                        </g>
                    );
                })}
                {levels.map((level) => (
                    <g key={level.label}>
                        <line x1={0} x2={W - RIGHT} y1={y(level.value)} y2={y(level.value)} stroke={level.color} strokeWidth={1} strokeDasharray="4 5" opacity={0.8} />
                        <text x={W - RIGHT - 4} y={y(level.value) - 4} textAnchor="end" fontSize={10} fontWeight={700} fill={level.color} letterSpacing="0.06em">
                            {level.label} {price(level.value)}
                        </text>
                    </g>
                ))}
                {/* From the first entry to the last exit */}
                {first && lastExit && <line x1={x(first.at)} y1={y(first.price)} x2={x(lastExit.at)} y2={y(lastExit.price)} stroke={won ? UP : DOWN} strokeWidth={1.25} strokeDasharray="2 4" />}
                {marks.map((mark, i) => {
                    const entry = mark.kind === "entry";
                    // A long is bought from below and sold from above; a short is the reverse.
                    const below = entry ? long : !long;
                    const mx = x(mark.at);
                    const my = y(mark.price);
                    const color = entry ? "#FFFFFF" : ACCENT;
                    return (
                        <g key={`${mark.kind}-${mark.at}-${i}`}>
                            <line x1={mx} x2={mx} y1={TOP} y2={H - BOTTOM} stroke={color} strokeWidth={1} opacity={0.25} />
                            <path d={below ? `M ${mx} ${my + 3} l -6 10 h 12 Z` : `M ${mx} ${my - 3} l -6 -10 h 12 Z`} fill={color} stroke="#000" strokeWidth={1} />
                            <circle cx={mx} cy={my} r={2.5} fill={color} stroke="#000" strokeWidth={1} />
                        </g>
                    );
                })}
                <text x={0} y={H - 6} fontSize={10} fill="#7d7d87">
                    {when(t0)}
                </text>
                <text x={W - RIGHT} y={H - 6} fontSize={10} fill="#7d7d87" textAnchor="end">
                    {when(t1)}
                </text>
            </svg>
        );
    }

    // Bare: only the drawing, for places that frame it themselves.
    if (bare) return <div>{loading ? <p className="py-10 text-sm text-white/40">Loading the price history…</p> : chart ?? <p className="py-6 text-sm text-white/45">No price history is available for this trade.</p>}</div>;

    const linkClass = "text-xs text-[#c8c8d0] border-b border-[#55555e] hover:text-white hover:border-white";

    return (
        <div className="border-t border-white/15">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 pt-4 pb-2">
                <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Trade recap</p>
                {chart && (
                    <p className="text-[11px] text-[#7d7d87]">
                        {trade.instrument} · {view.name} candles · Bybit
                    </p>
                )}
            </div>

            {loading && <p className="px-5 py-10 text-center text-sm text-[#7d7d87]">Loading the price history…</p>}
            {chart && <div className="px-2">{chart}</div>}
            {!loading && !chart && (
                <p className="px-5 py-6 text-sm leading-relaxed text-[#9a9aa5]">
                    {hasFeed ? "The price history for this trade could not be loaded just now, so no chart is drawn." : `There is no price history source for ${trade.instrument} here, so no chart can be drawn.`} {sample ? "" : "You can attach your own chart screenshot below."}
                </p>
            )}

            {chart && (
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5 px-5 pt-1 pb-3 text-xs tabular-nums text-[#c8c8d0]">
                    {marks.map((mark, i) => (
                        <li key={`${mark.kind}-${mark.at}-${i}`} className="flex items-baseline gap-1.5">
                            <span className="h-2 w-2 self-center rounded-[1px]" style={{ background: mark.kind === "entry" ? "#FFFFFF" : ACCENT }} aria-hidden="true" />
                            <span className="font-semibold uppercase tracking-[0.06em] text-white">{mark.kind === "entry" ? "Entry" : "Exit"}</span>
                            {price(mark.price)}
                            {marks.length > 2 && <span className="text-[#7d7d87]">× {mark.quantity}</span>}
                            <span className="text-[#7d7d87]">{when(mark.at)}</span>
                        </li>
                    ))}
                    {!trade.openedAt && !trade.executions?.length && <li className="text-[#7d7d87]">Entry time was not recorded, so only the exit is marked. Entry price: {price(trade.entryPrice)}.</li>}
                </ul>
            )}
            {chart && sample && <p className="px-5 pb-3 text-[11px] text-[#7d7d87]">Sample trade on real candles: its prices sit inside that day&apos;s range, but its times are illustrative.</p>}

            {!sample && (
                <div className="border-t border-white/15 px-5 py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Chart screenshot</p>
                        <div className="flex gap-4">
                            <button type="button" onClick={() => picker.current?.click()} className={linkClass}>
                                {shot ? "Replace" : "Attach a TradingView screenshot"}
                            </button>
                            {shot && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        removeScreenshot(trade.id).catch(() => {});
                                        setShot(null);
                                        setViewing(false);
                                    }}
                                    className="text-xs text-[#E955A8] border-b border-[#E955A8]/50 hover:border-[#E955A8]"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <input
                            ref={picker}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={(event) => {
                                attach(event.target.files?.[0]);
                                event.target.value = "";
                            }}
                        />
                    </div>
                    {shot && (
                        <button type="button" onClick={() => setViewing((value) => !value)} aria-expanded={viewing} className="mt-3 block w-full overflow-hidden border border-white/15" aria-label={viewing ? "Shrink the screenshot" : "Enlarge the screenshot"}>
                            {/* A local image the trader attached; nothing to optimise. */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={shot} alt="Chart screenshot attached to this trade" className={`w-full ${viewing ? "" : "max-h-40 object-cover object-top"}`} />
                        </button>
                    )}
                    {shotError && (
                        <p role="alert" className="mt-2 text-xs text-[#E955A8]">
                            {shotError}
                        </p>
                    )}
                    {!shot && !shotError && <p className="mt-2 text-xs text-[#7d7d87]">Kept in this browser with the rest of your journal.</p>}
                </div>
            )}
        </div>
    );
};

export default TradeRecap;
