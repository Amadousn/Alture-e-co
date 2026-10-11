"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { INTERVAL_MS } from "@/utils/order-flow";

type Candle = { t: number; o: number; h: number; l: number; c: number; v: number };
export type ChartLevel = { label: string; price: number; color: string };

const UP = "#20B8A8";
const DOWN = "#E955A8";
const ACCENT = "#E3A1F7";
const AXIS_W = 74;
const AXIS_H = 24;
const TOP = 30;
const GAP = 5;
const DEFAULT_COUNT = 110;

// A "nice" step for the price scale: 1, 2 or 5 times a power of ten.
function niceStep(range: number, target: number) {
    const raw = range / target;
    const power = Math.pow(10, Math.floor(Math.log10(raw)));
    const unit = raw / power;
    return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * power;
}

type PlotProps = { candles: Candle[]; size: { w: number; h: number }; count: number; offset: number; setCount: (next: number) => void; setOffset: (next: number) => void; symbol: string; interval: string; levels: ChartLevel[]; trades: ClosedTrade[] };

const Plot = ({ candles, size, count, offset, setCount, setOffset, symbol, interval, levels, trades }: PlotProps) => {
    const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
    const drag = useRef<{ x: number; offset: number } | null>(null);

    const total = candles.length;
    const shownCount = Math.min(count, total);
    const maxOffset = Math.max(0, total - shownCount);
    const shift = Math.min(offset, maxOffset);
    const rows = useMemo(() => candles.slice(total - shift - shownCount, total - shift), [candles, total, shift, shownCount]);

    const { w, h } = size;
    const plotW = Math.max(0, w - AXIS_W);
    const plotH = Math.max(0, h - TOP - AXIS_H);
    const volH = plotH * 0.14;
    const priceH = plotH - volH - 6;
    const slot = plotW / (rows.length + (shift === 0 ? GAP : 0));
    const step = INTERVAL_MS[interval] ?? 900000;

    const lo = Math.min(...rows.map((c) => c.l));
    const hi = Math.max(...rows.map((c) => c.h));
    const span = hi - lo || hi * 0.001;
    // Levels are drawn when they sit near the price in view; a far level would flatten the candles.
    const near = levels.filter((level) => level.price > lo - span * 0.8 && level.price < hi + span * 0.8);
    // The others are named at the edge they lie beyond, so the plan is never out of sight.
    const above = levels.filter((level) => level.price >= hi + span * 0.8).sort((a, b) => a.price - b.price);
    const below = levels.filter((level) => level.price <= lo - span * 0.8).sort((a, b) => b.price - a.price);
    const min = Math.min(lo, ...near.map((level) => level.price)) - span * 0.06;
    const max = Math.max(hi, ...near.map((level) => level.price)) + span * 0.06;
    const y = (price: number) => TOP + ((max - price) / (max - min)) * priceH;
    const priceAt = (py: number) => max - ((py - TOP) / priceH) * (max - min);
    const x = (i: number) => (i + 0.5) * slot;
    const xAt = (time: number) => ((time - rows[0].t) / step + 0.5) * slot;
    const maxVol = Math.max(...rows.map((c) => c.v), 1);
    const body = Math.max(1, Math.min(14, slot * 0.66));

    const tickStep = niceStep(max - min, 6);
    const decimals = Math.max(0, Math.min(6, -Math.floor(Math.log10(tickStep)) + (tickStep < 1 ? 0 : 0)));
    const fmt = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: Math.max(decimals, value >= 100 ? 1 : value >= 1 ? 2 : 4), maximumFractionDigits: Math.max(decimals, value >= 100 ? 1 : value >= 1 ? 3 : 5) });
    const ticks: number[] = [];
    for (let value = Math.ceil(min / tickStep) * tickStep; value < max; value += tickStep) ticks.push(value);

    // A scale label gives way to a price tag drawn over the same spot.
    const tagged = [...near.map((level) => y(level.price)), ...(shift === 0 ? [y(rows[rows.length - 1].c)] : [])];
    const clear = (value: number) => tagged.every((py) => Math.abs(py - y(value)) > 18);
    // Edge notes step away from a level line drawn at the same height.
    const edge = (start: number, dir: 1 | -1, list: ChartLevel[]) => {
        let py = start;
        return list.map((level) => {
            while (near.some((item) => y(item.price) > py - 22 && y(item.price) < py + 9)) py += dir * 16;
            const at = py;
            py += dir * 16;
            return { level, py: at, arrow: dir === 1 ? "↑" : "↓" };
        });
    };

    const daily = interval === "D";
    const timeLabel = (time: number, withDate: boolean) =>
        daily || withDate ? new Date(time).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
    const every = Math.max(1, Math.round(rows.length / Math.max(2, Math.floor(plotW / 110))));
    const timeTicks = rows.map((candle, i) => ({ candle, i })).filter(({ i }) => i % every === Math.floor(every / 2));

    const last = rows[rows.length - 1];
    const rising = last.c >= last.o;
    const hoverIndex = hover ? Math.max(0, Math.min(rows.length - 1, Math.floor(hover.x / slot))) : null;
    const read = hoverIndex !== null ? rows[hoverIndex] : last;
    const readChange = ((read.c - read.o) / read.o) * 100;

    // The trader's own entries and exits on this instrument, where they fall inside the view.
    const from = rows[0].t;
    const to = last.t + step;
    const marks = trades
        .filter((trade) => trade.instrument === symbol && trade.entryPrice > 0 && trade.exitPrice > 0)
        .flatMap((trade) => {
            const fills = trade.executions?.length ? trade.executions : [...(trade.openedAt ? [{ kind: "entry" as const, price: trade.entryPrice, at: trade.openedAt }] : []), { kind: "exit" as const, price: trade.exitPrice, at: trade.closedAt }];
            return fills.filter((fill) => fill.at >= from && fill.at <= to && fill.price > min && fill.price < max).map((fill) => ({ ...fill, long: trade.direction === "Long", id: `${trade.id}-${fill.kind}-${fill.at}` }));
        });

    const move = (event: React.PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        if (drag.current) {
            const moved = Math.round((px - drag.current.x) / Math.max(slot, 1));
            setOffset(Math.max(0, Math.min(maxOffset, drag.current.offset + moved)));
        }
        setHover(px >= 0 && px <= plotW && py >= TOP && py <= TOP + plotH ? { x: px, y: py } : null);
    };

    return (
        <div
            className="relative h-full select-none cursor-crosshair"
            style={{ touchAction: "pan-y" }}
            onPointerMove={move}
            onPointerDown={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                drag.current = { x: event.clientX - rect.left, offset: shift };
                event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={() => (drag.current = null)}
            onPointerCancel={() => (drag.current = null)}
            onPointerLeave={() => {
                drag.current = null;
                setHover(null);
            }}
            onDoubleClick={() => {
                setOffset(0);
                setCount(DEFAULT_COUNT);
            }}
        >
            <svg width={w} height={h} className="block" role="img" aria-label={`${symbol} candle chart`}>
                {/* Scale */}
                {ticks.map((value) => (
                    <g key={value}>
                        <line x1={0} x2={plotW} y1={y(value)} y2={y(value)} stroke="#FFFFFF" strokeOpacity={0.045} />
                        {clear(value) && (
                            <text x={plotW + 10} y={y(value) + 4} fontSize={11} fill="#8a8a94" className="tabular-nums">
                                {fmt(value)}
                            </text>
                        )}
                    </g>
                ))}
                {timeTicks.map(({ candle, i }, n) => (
                    <text key={candle.t} x={x(i)} y={h - 7} fontSize={11} fill="#8a8a94" textAnchor="middle" className="tabular-nums">
                        {timeLabel(candle.t, n > 0 && new Date(candle.t).getDate() !== new Date(timeTicks[n - 1].candle.t).getDate())}
                    </text>
                ))}

                {/* Volume, then candles */}
                {rows.map((candle, i) => {
                    const color = candle.c >= candle.o ? UP : DOWN;
                    const vh = (candle.v / maxVol) * volH;
                    return <rect key={`v${candle.t}`} x={x(i) - body / 2} y={TOP + plotH - vh} width={body} height={vh} fill={color} opacity={0.32} />;
                })}
                {rows.map((candle, i) => {
                    const color = candle.c >= candle.o ? UP : DOWN;
                    return (
                        <g key={candle.t}>
                            <line x1={x(i)} x2={x(i)} y1={y(candle.h)} y2={y(candle.l)} stroke={color} strokeWidth={1} />
                            <rect x={x(i) - body / 2} y={Math.min(y(candle.o), y(candle.c))} width={body} height={Math.max(1, Math.abs(y(candle.o) - y(candle.c)))} fill={color} />
                        </g>
                    );
                })}

                {/* The trade in progress */}
                {near.map((level) => (
                    <g key={level.label}>
                        <line x1={0} x2={plotW} y1={y(level.price)} y2={y(level.price)} stroke={level.color} strokeOpacity={0.85} strokeDasharray="5 5" />
                        <rect x={6} y={y(level.price) - 9} width={level.label.length * 6.4 + 12} height={18} fill="#000000" />
                        <text x={12} y={y(level.price) + 4} fontSize={10} fontWeight={600} fill={level.color} letterSpacing="0.08em">
                            {level.label.toUpperCase()}
                        </text>
                        <rect x={plotW + 1} y={y(level.price) - 9} width={AXIS_W - 2} height={18} fill="#000000" stroke={level.color} strokeOpacity={0.7} />
                        <text x={plotW + 10} y={y(level.price) + 4} fontSize={11} fill={level.color} className="tabular-nums">
                            {fmt(level.price)}
                        </text>
                    </g>
                ))}

                {[...edge(TOP + 12, 1, above), ...edge(TOP + priceH - 6, -1, below)].map(({ level, py, arrow }) => (
                    <text key={level.label} x={plotW - 8} y={py} fontSize={10} fontWeight={600} fill={level.color} textAnchor="end" letterSpacing="0.06em" className="tabular-nums">
                        {level.label.toUpperCase()} {fmt(level.price)} {arrow}
                    </text>
                ))}

                {/* Past entries and exits from the journal */}
                {marks.map((mark) => {
                    const entry = mark.kind === "entry";
                    const below = entry ? mark.long : !mark.long;
                    const mx = xAt(mark.at);
                    const my = y(mark.price);
                    return <path key={mark.id} d={below ? `M ${mx} ${my + 4} l -6 10 h 12 Z` : `M ${mx} ${my - 4} l -6 -10 h 12 Z`} fill={entry ? "#FFFFFF" : ACCENT} stroke="#000" strokeWidth={1} />;
                })}

                {/* Last price */}
                {shift === 0 && (
                    <g>
                        <line x1={0} x2={plotW} y1={y(last.c)} y2={y(last.c)} stroke={rising ? UP : DOWN} strokeOpacity={0.5} strokeDasharray="2 4" />
                        <rect x={plotW + 1} y={y(last.c) - 10} width={AXIS_W - 2} height={20} fill={rising ? UP : DOWN} />
                        <text x={plotW + 10} y={y(last.c) + 4} fontSize={11} fontWeight={600} fill="#000000" className="tabular-nums">
                            {fmt(last.c)}
                        </text>
                    </g>
                )}

                {/* Crosshair */}
                {hover && hoverIndex !== null && !drag.current && (
                    <g>
                        <line x1={x(hoverIndex)} x2={x(hoverIndex)} y1={TOP} y2={TOP + plotH} stroke="#FFFFFF" strokeOpacity={0.22} />
                        {hover.y <= TOP + priceH && (
                            <>
                                <line x1={0} x2={plotW} y1={hover.y} y2={hover.y} stroke="#FFFFFF" strokeOpacity={0.22} />
                                <rect x={plotW + 1} y={hover.y - 10} width={AXIS_W - 2} height={20} fill="#1c1c20" />
                                <text x={plotW + 10} y={hover.y + 4} fontSize={11} fill="#FFFFFF" className="tabular-nums">
                                    {fmt(priceAt(hover.y))}
                                </text>
                            </>
                        )}
                        <rect x={Math.max(0, Math.min(plotW - 96, x(hoverIndex) - 48))} y={h - AXIS_H + 2} width={96} height={AXIS_H - 4} fill="#1c1c20" />
                        <text x={Math.max(48, Math.min(plotW - 48, x(hoverIndex)))} y={h - 7} fontSize={11} fill="#FFFFFF" textAnchor="middle" className="tabular-nums">
                            {new Date(read.t).toLocaleString(undefined, daily ? { day: "numeric", month: "short", year: "numeric" } : { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </text>
                    </g>
                )}
            </svg>

            {/* The candle being read */}
            <p className="pointer-events-none absolute left-0 top-0 flex flex-wrap gap-x-4 text-xs tabular-nums text-white/45">
                {(
                    [
                        ["O", read.o],
                        ["H", read.h],
                        ["L", read.l],
                        ["C", read.c],
                    ] as const
                ).map(([name, value]) => (
                    <span key={name}>
                        {name} <span className="text-white/85">{fmt(value)}</span>
                    </span>
                ))}
                <span className={readChange >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}>
                    {readChange >= 0 ? "+" : ""}
                    {readChange.toFixed(2)}%
                </span>
                {marks.length > 0 && <span className="text-white/35">▲ your entries and exits</span>}
            </p>

            {(shift > 0 || shownCount !== Math.min(DEFAULT_COUNT, total)) && (
                <button
                    type="button"
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={() => {
                        setOffset(0);
                        setCount(DEFAULT_COUNT);
                    }}
                    className="absolute bottom-8 rounded-sm bg-[#1c1c20] px-2.5 py-1 text-[11px] text-white hover:bg-[#2a2a30]"
                    style={{ right: AXIS_W + 8 }}
                >
                    Latest →
                </button>
            )}
        </div>
    );
};

// The terminal's own chart: real candles and volume, a readable scale, a
// crosshair, the levels of the trade in progress and the trader's past entries
// and exits on this instrument. Scroll to zoom, drag to move through history.
const TerminalChart = ({ symbol, interval, levels = [], trades = [] }: { symbol: string; interval: string; levels?: ChartLevel[]; trades?: ClosedTrade[] }) => {
    const wrap = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [data, setData] = useState<{ key: string; candles: Candle[] } | null>(null);
    const [failed, setFailed] = useState(false);
    const [count, setCount] = useState(DEFAULT_COUNT);
    const [offset, setOffset] = useState(0);
    const key = `${symbol}|${interval}`;

    useEffect(() => {
        const node = wrap.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
        observer.observe(node);
        // Zooming with the wheel has to be able to stop the page from scrolling.
        const onWheel = (event: WheelEvent) => {
            if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
            event.preventDefault();
            setCount((current) => Math.max(30, Math.min(500, Math.round(current * (event.deltaY > 0 ? 1.12 : 0.89)))));
        };
        node.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            observer.disconnect();
            node.removeEventListener("wheel", onWheel);
        };
    }, []);

    useEffect(() => {
        let cancelled = false;
        setFailed(false);
        setOffset(0);
        setCount(DEFAULT_COUNT);
        const load = async () => {
            try {
                const res = await fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}&limit=500`, { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setData({ key: `${symbol}|${interval}`, candles: json.candles });
            } catch {
                if (!cancelled) setFailed(true);
            }
        };
        load();
        const id = setInterval(load, 15000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [symbol, interval]);

    const candles = data?.key === key ? data.candles : null;

    return (
        <div ref={wrap} className="h-full">
            {candles && candles.length >= 2 && size.w > 0 && size.h > 0 ? (
                <Plot candles={candles} size={size} count={count} offset={offset} setCount={setCount} setOffset={setOffset} symbol={symbol} interval={interval} levels={levels} trades={trades} />
            ) : (
                <div className="flex h-full items-center justify-center text-sm text-white/40">{failed && !candles ? "The chart is unavailable right now: the market data source could not be reached." : "Loading the chart…"}</div>
            )}
        </div>
    );
};

export default TerminalChart;
