"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Plot, type Candle, type ChartLevel } from "./os/terminal-chart";
import { fmtPrice } from "./os/watchlist";
import { INTERVAL_MS } from "@/utils/order-flow";
import { BacktestSession, BacktestTrade, useBacktests, useStrategies, useTradeReviews } from "@/utils/workspace-store";

// Backtesting on real Bybit history. The chart only ever shows candles up to
// the replay cursor: what comes next stays hidden until the trader steps forward.
// Fills are simple and stated: entry at the close of the current candle, exits
// at the stop or the target; when one candle reaches both, the stop is counted.

const SYMBOLS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "HYPEUSDT"];
const INTERVALS: [string, string][] = [
    ["5", "5m"],
    ["15", "15m"],
    ["60", "1h"],
    ["240", "4h"],
];
const CONTEXT = 120; // candles shown before the starting point
const CHUNK = 1000;
const FEE = 0.00055; // Bybit taker fee, each side
const SIZE_KEY = "alturelock:risk-calc";

type Position = { direction: "Long" | "Short"; entry: number; stop: number; target: number; quantity: number; risk: number; openedAt: number; strategy: string };

const usd = (value: number) => `${value < 0 ? "−" : value > 0 ? "+" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (value: string) => {
    const parsed = parseFloat(value.replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
};
const dayInput = (ms: number) => new Date(ms).toISOString().slice(0, 10);
const qty = (value: number) => (value >= 100 ? value.toFixed(1) : value >= 1 ? value.toFixed(3) : value.toPrecision(3));

async function fetchRange(symbol: string, interval: string, start: number, end: number): Promise<Candle[]> {
    const res = await fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}&start=${start}&end=${end}`);
    if (!res.ok) throw new Error("unavailable");
    const json = await res.json();
    return json.candles as Candle[];
}

const panel = "cmd-panel rounded-2xl border border-white/10 bg-white/[0.02] p-5";
const field = "w-full rounded-md border border-white/12 bg-white/[0.03] px-2.5 py-1.5 text-[13px] tabular-nums text-white outline-none focus:border-white/40";
const small = "text-[11px] text-white/40";

const BacktestStudio = ({ demo = false }: { demo?: boolean }) => {
    const [sessions, setSessions] = useBacktests();
    const [strategies] = useStrategies();
    const [, setReviews] = useTradeReviews();
    const [strategy, setStrategy] = useState("");
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [interval, setIntervalId] = useState("15");
    const [day, setDay] = useState(() => dayInput(Date.now() - 30 * 86400000));

    const [candles, setCandles] = useState<Candle[]>([]);
    const [cursor, setCursor] = useState(0);
    const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error" | "end">("idle");
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);

    const [account, setAccount] = useState("10000");
    const [percent, setPercent] = useState("1");
    const [stop, setStop] = useState("");
    const [target, setTarget] = useState("");
    const [position, setPosition] = useState<Position | null>(null);

    const wrap = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [count, setCount] = useState(110);
    const loadingMore = useRef(false);

    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(SIZE_KEY) ?? "{}");
            if (typeof saved.account === "string" && saved.account) setAccount(saved.account);
            if (typeof saved.percent === "string" && saved.percent) setPercent(saved.percent);
        } catch {}
    }, []);

    useEffect(() => {
        const node = wrap.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
        observer.observe(node);
        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
            event.preventDefault();
            setCount((current) => Math.max(30, Math.min(400, Math.round(current * (event.deltaY > 0 ? 1.12 : 0.89)))));
        };
        node.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            observer.disconnect();
            node.removeEventListener("wheel", onWheel);
        };
    }, [status]);

    const session = sessions.find((item) => item.id === sessionId) ?? null;
    const step = INTERVAL_MS[interval] ?? 900000;
    const shown = useMemo(() => candles.slice(0, cursor + 1), [candles, cursor]);
    const current = candles[cursor];

    const start = async () => {
        const from = new Date(`${day}T00:00:00Z`).getTime();
        if (!Number.isFinite(from) || from > Date.now() - step * 10) return;
        setStatus("loading");
        setPlaying(false);
        setPosition(null);
        try {
            const begin = from - CONTEXT * step;
            const rows = await fetchRange(symbol, interval, begin, Math.min(Date.now(), begin + CHUNK * step));
            if (rows.length < CONTEXT + 2) throw new Error("short");
            setCandles(rows);
            setCursor(Math.max(0, rows.findIndex((candle) => candle.t >= from)));
            const id = `bt-${Date.now()}`;
            setSessions((list) => [{ id, symbol, interval, from, createdAt: Date.now(), trades: [] }, ...list]);
            setSessionId(id);
            setStatus("ready");
        } catch {
            setStatus("error");
        }
    };

    // More history is fetched before the replay reaches the end of what is loaded.
    useEffect(() => {
        if (status !== "ready" || loadingMore.current || candles.length === 0 || cursor < candles.length - 50) return;
        const last = candles[candles.length - 1].t;
        if (last + step * 2 > Date.now()) return;
        loadingMore.current = true;
        fetchRange(symbol, interval, last + step, Math.min(Date.now(), last + CHUNK * step))
            .then((rows) => setCandles((list) => [...list, ...rows.filter((row) => row.t > list[list.length - 1].t)]))
            .catch(() => {})
            .finally(() => (loadingMore.current = false));
    }, [cursor, candles, status, symbol, interval, step]);

    const record = useCallback(
        (pos: Position, exitPrice: number, closedAt: number, exit: BacktestTrade["exit"]) => {
            if (!sessionId) return;
            const sign = pos.direction === "Long" ? 1 : -1;
            const gross = (exitPrice - pos.entry) * pos.quantity * sign;
            const fee = (pos.entry + exitPrice) * pos.quantity * FEE;
            const profitLoss = gross - fee;
            const trade: BacktestTrade = {
                id: `${sessionId}-${pos.openedAt}`,
                session: sessionId,
                instrument: symbol,
                direction: pos.direction,
                entryPrice: pos.entry,
                exitPrice,
                quantity: pos.quantity,
                leverage: 1,
                positionSize: pos.entry * pos.quantity,
                fee,
                profitLoss,
                openedAt: pos.openedAt,
                closedAt,
                stopLoss: pos.stop,
                takeProfit: pos.target,
                risk: pos.risk,
                r: profitLoss / pos.risk,
                exit,
            };
            setSessions((list) => list.map((item) => (item.id === sessionId ? { ...item, trades: [...item.trades, trade] } : item)));
            // The strategy goes where the journal reads it: the trade's review.
            if (pos.strategy) setReviews((current) => ({ ...current, [trade.id]: { ...current[trade.id], strategy: pos.strategy } }));
        },
        [sessionId, symbol, setSessions, setReviews]
    );

    // One step forward: the next candle appears, and an open position is checked against it.
    // Refs hold the latest state so the step runs once, outside any state updater.
    const cursorRef = useRef(cursor);
    cursorRef.current = cursor;
    const positionRef = useRef(position);
    positionRef.current = position;
    const forward = useCallback(() => {
        const next = cursorRef.current + 1;
        if (next >= candles.length) {
            if (!loadingMore.current) setStatus("end");
            setPlaying(false);
            return;
        }
        cursorRef.current = next;
        setCursor(next);
        const pos = positionRef.current;
        if (!pos) return;
        const candle = candles[next];
        const long = pos.direction === "Long";
        const hitStop = long ? candle.l <= pos.stop : candle.h >= pos.stop;
        const hitTarget = long ? candle.h >= pos.target : candle.l <= pos.target;
        if (hitStop || hitTarget) {
            positionRef.current = null;
            setPosition(null);
            record(pos, hitStop ? pos.stop : pos.target, candle.t + step, hitStop ? "stop" : "target");
        }
    }, [candles, record, step]);

    useEffect(() => {
        if (!playing) return;
        const id = window.setInterval(forward, 900 / speed);
        return () => window.clearInterval(id);
    }, [playing, speed, forward]);

    useEffect(() => {
        if (status !== "ready") return;
        const onKey = (event: KeyboardEvent) => {
            if ((event.target as HTMLElement)?.tagName === "INPUT" || (event.target as HTMLElement)?.tagName === "SELECT") return;
            if (event.key === "ArrowRight") {
                event.preventDefault();
                forward();
            } else if (event.key === " ") {
                event.preventDefault();
                setPlaying((value) => !value);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [status, forward]);

    // A starting stop at the last 10 candles' extreme, and a target at 2R, until the trader types their own.
    const swing = useMemo(() => {
        const rows = shown.slice(-10);
        return rows.length ? { low: Math.min(...rows.map((c) => c.l)), high: Math.max(...rows.map((c) => c.h)) } : null;
    }, [shown]);

    const a = num(account);
    const p = num(percent);
    const plan = (direction: "Long" | "Short") => {
        if (!current || !a || !p) return null;
        const entry = current.c;
        const sign = direction === "Long" ? 1 : -1;
        const s = num(stop) ?? (swing ? (direction === "Long" ? swing.low : swing.high) : NaN);
        const t = num(target) ?? entry + sign * 2 * Math.abs(entry - s);
        if (!Number.isFinite(s) || (entry - s) * sign <= 0 || (t - entry) * sign <= 0) return null;
        const risk = (a * p) / 100;
        return { direction, entry, stop: s, target: t, quantity: risk / Math.abs(entry - s), risk, openedAt: current.t + step, strategy };
    };

    const open = (direction: "Long" | "Short") => {
        const next = plan(direction);
        if (!next) return;
        setPosition(next);
        setStop("");
        setTarget("");
    };

    const closeNow = () => {
        if (!position || !current) return;
        positionRef.current = null;
        setPosition(null);
        record(position, current.c, current.t + step, "manual");
    };

    const levels: ChartLevel[] = position
        ? [
              { label: "Take profit", price: position.target, color: "#20B8A8" },
              { label: "Entry", price: position.entry, color: "#FFFFFF" },
              { label: "Stop loss", price: position.stop, color: "#E5484D" },
          ]
        : [];

    const trades = session?.trades ?? [];
    const net = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);
    const totalR = trades.reduce((sum, trade) => sum + trade.r, 0);
    const wins = trades.filter((trade) => trade.profitLoss > 0).length;
    const unreal = position && current ? ((current.c - position.entry) * position.quantity * (position.direction === "Long" ? 1 : -1)) / position.risk : null;
    const longPlan = status === "ready" ? plan("Long") : null;
    const shortPlan = status === "ready" ? plan("Short") : null;

    const allTrades = sessions.flatMap((item) => item.trades);
    const allR = allTrades.reduce((sum, trade) => sum + trade.r, 0);

    return (
        <div className="space-y-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Backtesting</p>
                    <p className="mt-2 text-2xl font-medium tracking-tight text-white">Replay the market, candle by candle.</p>
                    <p className="mt-1 text-[13px] text-white/50">Real Bybit history. What comes next stays hidden until you step forward.</p>
                </div>
                <div className="flex flex-wrap items-end gap-3">
                    <label className="block">
                        <span className={small}>Market</span>
                        <select value={symbol} onChange={(event) => setSymbol(event.target.value)} className={`${field} block w-32`}>
                            {SYMBOLS.map((item) => (
                                <option key={item} value={item} className="bg-black">
                                    {item.replace(/USDT$/, "")}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className={small}>Timeframe</span>
                        <select value={interval} onChange={(event) => setIntervalId(event.target.value)} className={`${field} block w-24`}>
                            {INTERVALS.map(([id, text]) => (
                                <option key={id} value={id} className="bg-black">
                                    {text}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className="block">
                        <span className={small}>Start on</span>
                        <input type="date" value={day} max={dayInput(Date.now() - 86400000)} onChange={(event) => setDay(event.target.value)} className={`${field} block w-40 [color-scheme:dark]`} />
                    </label>
                    <button type="button" onClick={start} className="rounded-md bg-white px-5 py-2 text-[13px] font-semibold text-black hover:bg-[#e4e4e8]">
                        {status === "ready" || status === "end" ? "New session" : "Start"}
                    </button>
                </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
                <div className={`${panel} flex min-h-[520px] flex-col`}>
                    <div ref={wrap} className="min-h-0 flex-1" style={{ height: 480 }}>
                        {status === "idle" && <p className="flex h-full items-center justify-center text-sm text-white/40">Choose a market, a timeframe and a day, then press Start.</p>}
                        {status === "loading" && <p className="flex h-full items-center justify-center text-sm text-white/40">Loading the history…</p>}
                        {status === "error" && <p className="flex h-full items-center justify-center text-sm text-white/40">The history could not be loaded for that day. Try another day or market.</p>}
                        {(status === "ready" || status === "end") && shown.length >= 2 && size.w > 0 && (
                            <Plot candles={shown} size={size} count={count} offset={0} setCount={setCount} setOffset={() => {}} symbol={symbol} interval={interval} levels={levels} trades={trades} />
                        )}
                    </div>
                    {(status === "ready" || status === "end") && (
                        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-4 text-[13px]">
                            <button type="button" onClick={() => setPlaying((value) => !value)} disabled={status === "end"} className="rounded-md border border-white/20 px-4 py-1.5 text-white hover:border-white disabled:opacity-40">
                                {playing ? "Pause" : "Play"}
                            </button>
                            <button type="button" onClick={forward} disabled={status === "end"} className="rounded-md border border-white/20 px-4 py-1.5 text-white hover:border-white disabled:opacity-40">
                                Next candle →
                            </button>
                            <span className="flex items-center gap-2 text-white/45">
                                Speed
                                {[1, 3, 10].map((value) => (
                                    <button key={value} type="button" onClick={() => setSpeed(value)} className={`border-b pb-0.5 ${speed === value ? "border-white text-white" : "border-transparent hover:text-white"}`}>
                                        {value}×
                                    </button>
                                ))}
                            </span>
                            <span className="ml-auto tabular-nums text-white/45">
                                {current && new Date(current.t).toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" })} UTC
                            </span>
                            <span className="w-full text-[11px] text-white/35">→ next candle · Space play / pause · scroll to zoom</span>
                        </div>
                    )}
                </div>

                <div className="space-y-5">
                    <div className={panel}>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Order</p>
                        {position ? (
                            <div className="mt-3">
                                <p className="text-lg font-medium text-white">
                                    {symbol.replace(/USDT$/, "")} <span className={position.direction === "Long" ? "text-[#20B8A8]" : "text-[#E5484D]"}>{position.direction.toLowerCase()}</span>
                                </p>
                                <dl className="mt-3 grid grid-cols-3 gap-3 text-[13px] tabular-nums">
                                    <div>
                                        <dt className={small}>Entry</dt>
                                        <dd className="text-white">{fmtPrice(position.entry)}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Stop</dt>
                                        <dd className="text-[#E5484D]">{fmtPrice(position.stop)}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Target</dt>
                                        <dd className="text-[#20B8A8]">{fmtPrice(position.target)}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Size</dt>
                                        <dd className="text-white">{qty(position.quantity)}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Risk</dt>
                                        <dd className="text-white">${position.risk.toFixed(2)}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Now</dt>
                                        <dd className={unreal !== null && unreal >= 0 ? "text-[#20B8A8]" : "text-[#E5484D]"}>{unreal !== null ? `${unreal >= 0 ? "+" : ""}${unreal.toFixed(2)} R` : "—"}</dd>
                                    </div>
                                </dl>
                                <button type="button" onClick={closeNow} className="mt-4 w-full rounded-md border border-white/20 py-2 text-[13px] text-white hover:border-white">
                                    Close at {current ? fmtPrice(current.c) : "—"}
                                </button>
                            </div>
                        ) : (
                            <div className="mt-3 space-y-3">
                                <div className="grid grid-cols-2 gap-3">
                                    <label className="block">
                                        <span className={small}>Account ($)</span>
                                        <input className={field} inputMode="decimal" value={account} onChange={(event) => setAccount(event.target.value)} />
                                    </label>
                                    <label className="block">
                                        <span className={small}>Risk (%)</span>
                                        <input className={field} inputMode="decimal" value={percent} onChange={(event) => setPercent(event.target.value)} />
                                    </label>
                                    <label className="block">
                                        <span className={small}>Stop loss</span>
                                        <input className={field} inputMode="decimal" value={stop} onChange={(event) => setStop(event.target.value)} placeholder="Auto" />
                                    </label>
                                    <label className="block">
                                        <span className={small}>Take profit</span>
                                        <input className={field} inputMode="decimal" value={target} onChange={(event) => setTarget(event.target.value)} placeholder="Auto: 2R" />
                                    </label>
                                </div>
                                <label className="block">
                                    <span className={small}>Strategy</span>
                                    <select value={strategy} onChange={(event) => setStrategy(event.target.value)} className={`${field} block`}>
                                        <option value="" className="bg-black">
                                            {strategies.length ? "No strategy" : "No strategy yet (add them in the Journal)"}
                                        </option>
                                        {strategies.map((item) => (
                                            <option key={item.id} value={item.name} className="bg-black">
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                                <p className="text-[11px] leading-relaxed text-white/35">Left empty, the stop goes at the low (long) or high (short) of the last 10 candles, and the target at 2R. Entry is the close of the current candle.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <button type="button" disabled={!longPlan} onClick={() => open("Long")} className="rounded-md bg-[#20B8A8] py-2.5 text-[13px] font-semibold text-black disabled:opacity-30">
                                        Long
                                    </button>
                                    <button type="button" disabled={!shortPlan} onClick={() => open("Short")} className="rounded-md bg-[#E5484D] py-2.5 text-[13px] font-semibold text-black disabled:opacity-30">
                                        Short
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={panel}>
                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">This session</p>
                        {trades.length > 0 ? (
                            <>
                                <dl className="mt-3 grid grid-cols-3 gap-3 text-[13px] tabular-nums">
                                    <div>
                                        <dt className={small}>Trades</dt>
                                        <dd className="text-white">{trades.length}</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Won</dt>
                                        <dd className="text-white">{Math.round((wins / trades.length) * 100)}%</dd>
                                    </div>
                                    <div>
                                        <dt className={small}>Result</dt>
                                        <dd className={totalR >= 0 ? "text-[#20B8A8]" : "text-[#E5484D]"}>
                                            {totalR >= 0 ? "+" : ""}
                                            {totalR.toFixed(2)} R
                                        </dd>
                                    </div>
                                </dl>
                                <p className={`mt-2 text-[13px] tabular-nums ${net >= 0 ? "text-[#20B8A8]" : "text-[#E5484D]"}`}>{usd(net)} after fees</p>
                                <ul className="mt-4 max-h-56 space-y-1.5 overflow-y-auto text-[12px] tabular-nums">
                                    {[...trades].reverse().map((trade) => (
                                        <li key={trade.id} className="flex justify-between gap-2 text-white/70">
                                            <span>
                                                <span className={trade.direction === "Long" ? "text-[#20B8A8]" : "text-[#E5484D]"}>{trade.direction}</span> · {trade.exit === "manual" ? "closed" : trade.exit}
                                            </span>
                                            <span className={trade.r >= 0 ? "text-[#20B8A8]" : "text-[#E5484D]"}>
                                                {trade.r >= 0 ? "+" : ""}
                                                {trade.r.toFixed(2)} R
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p className="mt-3 text-[13px] text-white/45">No trade yet in this session.</p>
                        )}
                    </div>

                    {allTrades.length > 0 && (
                        <div className={panel}>
                            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">All backtests</p>
                            <p className="mt-3 text-[13px] tabular-nums text-white/70">
                                {sessions.filter((item) => item.trades.length > 0).length} sessions · {allTrades.length} trades · {Math.round((allTrades.filter((trade) => trade.profitLoss > 0).length / allTrades.length) * 100)}% won ·{" "}
                                <span className={allR >= 0 ? "text-[#20B8A8]" : "text-[#E5484D]"}>
                                    {allR >= 0 ? "+" : ""}
                                    {allR.toFixed(2)} R
                                </span>
                            </p>
                            <p className="mt-2 text-[11px] text-white/35">
                                Kept apart from your real journal.{" "}
                                <a href={`${demo ? "/alturelock/demo/journal" : "/alturelock/journal"}?account=backtest`} className="border-b border-white/30 text-white/70 hover:text-white">
                                    Open in the Journal
                                </a>
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <p className="text-[11px] leading-relaxed text-white/35">Simulation on past Bybit candles. Fees at 0.055% per side; when one candle reaches both the stop and the target, the stop is counted. Past results do not predict future ones.</p>
        </div>
    );
};

export type { BacktestSession };
export default BacktestStudio;
