"use client";

import { useClientPreview } from "@/utils/client-preview";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/utils/use-plan";
import type { ClosedTrade } from "@/utils/bybit";

type Candle = { t: number; o: number; h: number; l: number; c: number };

const UP = "#4DD0E1";
const DOWN = "#F48FB1";
const ACCENT = "#FFFFFF";
const MINUTE = 60000;
// Bybit's candle sizes, in minutes, with the code each one is requested by.
const SIZES: [number, string, string][] = [[1, "1", "1 minute"], [3, "3", "3 minute"], [5, "5", "5 minute"], [15, "15", "15 minute"], [30, "30", "30 minute"], [60, "60", "1 hour"], [240, "240", "4 hour"], [1440, "D", "daily"]];

const W = 720;
const H = 260;
const TOP = 18;
const BOTTOM = 22;
const RIGHT = 74;

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
const Recap = ({ trade, sample = false, bare = false }: { trade: ClosedTrade; sample?: boolean; bare?: boolean }) => {
    const asClient = useClientPreview();
    const [state, setState] = useState<{ id: string; candles: Candle[] | null } | null>(null);
    const view = windowFor(trade);
    // The replay: how many candles have been revealed, or null when the whole trade is shown.
    const [cursor, setCursor] = useState<number | null>(null);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
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

    const loading = state === null || state.id !== trade.id;
    const candles = !loading ? state.candles : null;
    const long = trade.direction === "Long";
    const won = trade.profitLoss >= 0;
    // Individual fills when the source recorded them, otherwise the one entry and one exit the trade carries.
    const marks = trade.executions?.length
        ? trade.executions
        : [...(trade.openedAt ? [{ kind: "entry" as const, price: trade.entryPrice, quantity: trade.quantity, at: trade.openedAt }] : []), { kind: "exit" as const, price: trade.exitPrice, quantity: trade.quantity, at: trade.closedAt }];
    const total = candles?.length ?? 0;
    useEffect(() => {
        setCursor(null);
        setPlaying(false);
    }, [trade.id]);
    useEffect(() => {
        if (!playing || cursor === null) return;
        if (cursor >= total) return setPlaying(false);
        const id = setTimeout(() => setCursor(cursor + 1), 450 / speed);
        return () => clearTimeout(id);
    }, [playing, cursor, total, speed]);
    // Revealed up to the end of the last candle shown. Everything later stays hidden, as it was at the time.
    const replaying = cursor !== null && !!candles;
    const shownCandles = replaying ? candles.slice(0, cursor) : candles;
    const revealedTo = replaying && shownCandles?.length ? shownCandles[shownCandles.length - 1].t + view.minutes * MINUTE : Infinity;
    const shownMarks = marks.filter((mark) => mark.at < revealedTo);
    const startReplay = () => {
        if (!candles) return;
        const firstMark = Math.min(...marks.map((mark) => mark.at));
        const before = candles.findIndex((candle) => candle.t + view.minutes * MINUTE > firstMark);
        setCursor(Math.max(2, (before < 0 ? 0 : before) - 10));
        setPlaying(true);
    };
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
        const first = shownMarks.find((m) => m.kind === "entry");
        const lastExit = [...shownMarks].reverse().find((m) => m.kind === "exit");
        // The same drawing as the terminal: Alture candles, the plan as a risk and reward
        // structure from entry to exit, level names on chips, prices on the scale.
        const plotW = W - RIGHT;
        const exitMark = lastExit;
        const x0 = first ? x(first.at) : plotW * 0.4;
        const x1 = exitMark ? Math.max(x0 + 2, x(exitMark.at)) : plotW;
        const entryPrice = first?.price ?? trade.entryPrice;
        const zone = (from: number, to: number, color: string, id: string) => (
            <>
                <defs>
                    <linearGradient id={`rc-${trade.id}-${id}`} x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor={color} stopOpacity={0.04} />
                        <stop offset="1" stopColor={color} stopOpacity={0.18} />
                    </linearGradient>
                </defs>
                <rect x={x0} width={x1 - x0} y={Math.min(y(from), y(to))} height={Math.abs(y(from) - y(to))} fill={`url(#rc-${trade.id}-${id})`} />
            </>
        );
        const tag = (value: number, color: string, key: string) => (
            <g key={`tag-${key}`}>
                <rect x={plotW + 1} y={y(value) - 9} width={RIGHT - 2} height={18} rx={3} fill="#07080a" />
                <rect x={plotW + 1} y={y(value) - 9} width={2} height={18} fill={color} />
                <text x={W - 6} y={y(value) + 4} fontSize={10.5} fill="#e9e9ec" textAnchor="end" className="tabular-nums">
                    {price(value).replace("$", "")}
                </text>
            </g>
        );
        const chip = (value: number, text: string, color: string, place: "above" | "below" | "left" | "right") => {
            const width = text.length * 6.2 + 14;
            const cx = place === "left" ? Math.max(4, x0 - 12 - width) : place === "right" ? Math.min(x1 + 10, plotW - width - 4) : Math.min(x0 + 8, plotW - width - 4);
            const cy = place === "above" ? y(value) - 21 : place === "below" ? y(value) + 4 : y(value) - 8.5;
            return (
                <g key={`chip-${text}`}>
                    <rect x={cx} y={cy} width={width} height={17} rx={3} fill="#07080a" fillOpacity={0.88} stroke={color} strokeOpacity={0.35} />
                    <text x={cx + 7} y={cy + 11.8} fontSize={9.5} fontWeight={600} fill={color} letterSpacing="0.09em">
                        {text}
                    </text>
                </g>
            );
        };
        const tp = trade.takeProfit ?? null;
        const sl = trade.stopLoss ?? null;
        const risk = sl !== null ? Math.abs(entryPrice - sl) : 0;
        const reward = tp !== null ? Math.abs(tp - entryPrice) : 0;
        chart = (
            <svg viewBox={`0 0 ${W} ${H}`} className="block w-full" role="img" aria-label={`${trade.instrument} ${view.name} candles around the trade, with entry and exit marked`}>
                <line x1={plotW} x2={plotW} y1={0} y2={H - BOTTOM} stroke="#232329" />
                {first && sl !== null && zone(entryPrice, sl, DOWN, "risk")}
                {first && tp !== null && zone(entryPrice, tp, UP, "reward")}
                {shownCandles!.map((c) => {
                    const cx = x(c.t) + slot / 2;
                    const rising = c.c >= c.o;
                    return (
                        <g key={c.t}>
                            <line x1={cx} x2={cx} y1={y(c.h)} y2={y(c.l)} stroke="#FFFFFF" strokeOpacity={0.75} strokeWidth={1} />
                            <rect x={cx - body / 2} y={Math.min(y(c.o), y(c.c))} width={body} height={Math.max(1, Math.abs(y(c.o) - y(c.c)))} fill={rising ? "#9C9C9C" : "#FFFFFF"} stroke={rising ? UP : DOWN} strokeOpacity={rising ? 1 : 0.7} strokeWidth={body > 3 ? 1 : 0.6} />
                        </g>
                    );
                })}
                {sl !== null && <line x1={first ? x0 : 0} x2={first ? x1 : plotW} y1={y(sl)} y2={y(sl)} stroke={DOWN} strokeOpacity={0.6} strokeDasharray="1 3" />}
                {tp !== null && <line x1={first ? x0 : 0} x2={first ? x1 : plotW} y1={y(tp)} y2={y(tp)} stroke={UP} strokeOpacity={0.75} />}
                {first && (
                    <>
                        <line x1={x0} x2={x1} y1={y(entryPrice)} y2={y(entryPrice)} stroke="#FFFFFF" strokeOpacity={0.75} />
                        {(sl !== null || tp !== null) && <line x1={x0} x2={x0} y1={y(tp ?? entryPrice)} y2={y(sl ?? entryPrice)} stroke="#FFFFFF" strokeOpacity={0.35} />}
                    </>
                )}
                {/* From the first entry to the last exit */}
                {first && lastExit && <line x1={x(first.at)} y1={y(first.price)} x2={x(lastExit.at)} y2={y(lastExit.price)} stroke={won ? UP : DOWN} strokeWidth={1.25} strokeDasharray="2 4" />}
                {shownMarks.map((mark, i) => {
                    const mx = x(mark.at);
                    const my = y(mark.price);
                    const entry = mark.kind === "entry";
                    const color = entry ? "#FFFFFF" : won ? UP : DOWN;
                    return <path key={`${mark.kind}-${mark.at}-${i}`} d={`M ${mx} ${my - 6} l 6 6 l -6 6 l -6 -6 Z`} fill={entry ? "#07080a" : color} stroke={color} strokeWidth={1.4} />;
                })}
                {risk > 0 && reward > 0 && first && (
                    <text x={x1 - 40} y={y(tp!) + (y(entryPrice) > y(tp!) ? 16 : -8)} textAnchor="end" fontSize={11} fill={UP} letterSpacing="0.04em" className="tabular-nums">
                        {(reward / risk).toFixed(1)}R
                    </text>
                )}
                {sl !== null && chip(sl, "STOP LOSS", DOWN, (tp ?? Infinity) > sl ? "below" : "above")}
                {tp !== null && chip(tp, "TAKE PROFIT", UP, (sl ?? -Infinity) < tp ? "above" : "below")}
                {first && chip(entryPrice, "ENTRY", "#FFFFFF", "left")}
                {lastExit && chip(lastExit.price, "EXIT", won ? UP : DOWN, "right")}
                {sl !== null && tag(sl, DOWN, "sl")}
                {tp !== null && tag(tp, UP, "tp")}
                {first && tag(entryPrice, "#FFFFFF", "entry")}
                {lastExit && lastExit.price !== tp && lastExit.price !== sl && tag(lastExit.price, won ? UP : DOWN, "exit")}
                <text x={0} y={H - 6} fontSize={10} fill="#7d7d87">
                    {when(t0)}
                </text>
                <text x={plotW} y={H - 6} fontSize={10} fill="#7d7d87" textAnchor="end">
                    {when(t1)}
                </text>
            </svg>
        );
    }

    // Bare: only the drawing, for places that frame it themselves.
    if (bare) return <div>{loading ? <p className="py-10 text-sm text-white/40">Loading the price history…</p> : chart ?? <p className="py-6 text-sm text-white/45">No price history is available for this trade.</p>}</div>;

    // While the trade is open in the replay: its result at the last close, before fees. Scaled exits have no single figure.
    const lastClose = shownCandles?.[shownCandles.length - 1]?.c;
    const entered = shownMarks.some((mark) => mark.kind === "entry");
    const exited = shownMarks.some((mark) => mark.kind === "exit");
    const replayResult = !replaying || !entered || marks.length > 2 || lastClose === undefined
        ? null
        : exited
          ? `Closed ${trade.profitLoss >= 0 ? "+" : "-"}$${Math.abs(trade.profitLoss).toLocaleString("en-US", { maximumFractionDigits: 2 })}`
          : `Open ${(lastClose - trade.entryPrice) * trade.quantity * (long ? 1 : -1) >= 0 ? "+" : "-"}$${Math.abs((lastClose - trade.entryPrice) * trade.quantity).toLocaleString("en-US", { maximumFractionDigits: 2 })} before fees`;

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
            {chart && !sample && (
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2 text-xs text-[#c8c8d0]">
                    {cursor === null ? (
                        <button type="button" onClick={startReplay} className={linkClass}>
                            Replay this trade
                        </button>
                    ) : (
                        <>
                            <button type="button" onClick={() => (cursor >= total ? startReplay() : setPlaying((value) => !value))} className="w-14 text-left text-white">
                                {cursor >= total ? "Again" : playing ? "Pause" : "Play"}
                            </button>
                            <input
                                type="range"
                                min={2}
                                max={total}
                                value={cursor}
                                aria-label="Replay position"
                                onChange={(event) => {
                                    setPlaying(false);
                                    setCursor(Number(event.target.value));
                                }}
                                className="min-w-[120px] flex-1"
                            />
                            <span className="flex gap-2" role="group" aria-label="Replay speed">
                                {[1, 4, 16].map((value) => (
                                    <button key={value} type="button" aria-pressed={speed === value} onClick={() => setSpeed(value)} className={speed === value ? "text-white" : "text-[#7d7d87] hover:text-white"}>
                                        {value}x
                                    </button>
                                ))}
                            </span>
                            {replayResult && <span className="tabular-nums">{replayResult}</span>}
                            <button type="button" onClick={() => { setCursor(null); setPlaying(false); }} className="text-[#7d7d87] hover:text-white">
                                Close
                            </button>
                        </>
                    )}
                </div>
            )}
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
            {chart && sample && !asClient && <p className="px-5 pb-3 text-[11px] text-[#7d7d87]">Sample trade on real candles: its prices sit inside that day&apos;s range, but its times are illustrative.</p>}
        </div>
    );
};

// The replay comes with the Journal and AltureLock plans. Visitors, the demo's samples and the owner are not limited.
const TradeRecap = (props: Parameters<typeof Recap>[0]) => {
    const { ready, enforced, plan } = usePlan(props.sample);
    if (!ready) return null;
    if (enforced && plan !== "journal" && plan !== "alturelock")
        return (
            <p className="text-sm text-white/60">
                The trade replay comes with the Journal and AltureLock plans.{" "}
                <Link href="/alturelock#pricing" className="border-b border-white/30 text-white hover:border-white">See the plans</Link>
            </p>
        );
    return <Recap {...props} />;
};

export default TradeRecap;
