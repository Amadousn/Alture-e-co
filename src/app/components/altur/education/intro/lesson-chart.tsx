"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Candle } from "@/utils/education-chart-data";

const UP = "#20B8A8";
const DOWN = "#E955A8";
const ACCENT = "#E3A1F7";
const AXIS_W = 62;
const AXIS_H = 26;
const TOP = 30;

export type ChartMark = { i: number; kind: "high" | "low"; label?: string; tone?: "accent" | "good" | "bad" };
export type ChartZone = { from: number; to: number; tone: "support" | "resistance" | "guess" | "miss"; label?: string };
export type ChartView = {
    candles: Candle[];
    minutes: number;
    // How many candles are drawn. Changes are animated, as if the chart were being printed.
    shown?: number;
    // Candles to bring forward; the others step back.
    focus?: number[];
    marks?: ChartMark[];
    // Joins the marks in order, to show the path price took from swing to swing.
    path?: boolean;
    zones?: ChartZone[];
    // An axis to light up.
    axis?: "price" | "time" | null;
    // A ring around candles the learner has picked.
    rings?: Record<number, "good" | "bad" | "shown" | "pin">;
};

type Props = {
    view: ChartView;
    className?: string;
    onCandle?: (index: number) => void;
    onAxis?: (axis: "price" | "time") => void;
    onPrice?: (price: number) => void;
    // A short note in the corner, e.g. the timeframe.
    note?: string;
};

function niceStep(range: number, target: number) {
    const raw = range / target;
    const power = Math.pow(10, Math.floor(Math.log10(raw)));
    const unit = raw / power;
    return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * power;
}

const two = (value: number) => String(value).padStart(2, "0");
// Times are written in UTC so that every learner, and the server, read the same labels.
export const clock = (time: number) => `${two(new Date(time).getUTCHours())}:${two(new Date(time).getUTCMinutes())}`;

// The chart every lesson is taught on: candles with a price scale and a time
// scale, which can print itself, light up what is being explained, and answer
// when the learner clicks a candle, an axis or a price.
const LessonChart = ({ view, className = "", onCandle, onAxis, onPrice, note }: Props) => {
    const wrap = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [hover, setHover] = useState<{ x: number; y: number } | null>(null);
    const { candles } = view;
    const target = Math.min(view.shown ?? candles.length, candles.length);
    const [drawn, setDrawn] = useState(0);
    const from = useRef(0);

    useEffect(() => {
        const node = wrap.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // A new set of candles is printed from the start; a change in how many are shown continues from where it was.
    useEffect(() => {
        from.current = 0;
        setDrawn(0);
    }, [candles]);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            from.current = target;
            setDrawn(target);
            return;
        }
        const start = from.current;
        if (start === target) return;
        const began = performance.now();
        const span = Math.min(1400, Math.max(260, Math.abs(target - start) * 28));
        let frame = 0;
        const tick = (now: number) => {
            const k = Math.min(1, (now - began) / span);
            const value = start + (target - start) * (1 - Math.pow(1 - k, 3));
            from.current = value;
            setDrawn(value);
            if (k < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [target, candles]);

    const scale = useMemo(() => {
        const lo = Math.min(...candles.map((candle) => candle.l), ...(view.zones ?? []).map((zone) => zone.from));
        const hi = Math.max(...candles.map((candle) => candle.h), ...(view.zones ?? []).map((zone) => zone.to));
        const pad = (hi - lo) * 0.09;
        return { min: lo - pad, max: hi + pad };
    }, [candles, view.zones]);

    const { w, h } = size;
    const plotW = Math.max(0, w - AXIS_W);
    const plotH = Math.max(0, h - TOP - AXIS_H);
    const slot = plotW / Math.max(1, candles.length + 1);
    const body = Math.max(2, Math.min(26, slot * 0.64));
    const x = (i: number) => (i + 0.75) * slot;
    const y = (price: number) => TOP + ((scale.max - price) / (scale.max - scale.min)) * plotH;
    const priceAt = (py: number) => scale.max - ((py - TOP) / plotH) * (scale.max - scale.min);

    const step = niceStep(scale.max - scale.min, 6);
    const ticks: number[] = [];
    for (let value = Math.ceil(scale.min / step) * step; value < scale.max; value += step) ticks.push(value);
    // Dollar prices: whole dollars on the scale unless the steps are smaller than that; one decimal when reading a candle.
    const decimals = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
    const fmt = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const exact = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: Math.max(1, decimals) });
    const every = Math.max(1, Math.round(candles.length / Math.max(2, Math.floor(plotW / 84))));

    const count = Math.ceil(drawn);
    const hoverIndex = hover && hover.x <= plotW ? Math.max(0, Math.min(count - 1, Math.round(hover.x / slot - 0.75))) : null;
    const read = hoverIndex !== null && count > 0 ? candles[hoverIndex] : count > 0 ? candles[count - 1] : null;
    const focused = view.focus && view.focus.length > 0 ? new Set(view.focus) : null;
    const marks = (view.marks ?? []).filter((mark) => mark.i < count);
    const tone = (name?: string) => (name === "good" ? UP : name === "bad" ? DOWN : ACCENT);
    const zoneColor = { support: UP, resistance: DOWN, guess: "#FFFFFF", miss: "#8a8a94" };
    const clickable = Boolean(onCandle || onPrice);

    return (
        <div>
        <div
            ref={wrap}
            className={`relative select-none ${clickable ? "cursor-pointer" : "cursor-crosshair"} ${className}`}
            onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                const px = event.clientX - rect.left;
                const py = event.clientY - rect.top;
                setHover(px >= 0 && px <= plotW && py >= TOP && py <= TOP + plotH ? { x: px, y: py } : null);
            }}
            onPointerLeave={() => setHover(null)}
        >
            {w > 0 && h > 0 && (
                <svg width={w} height={h} className="block" role="img" aria-label="Candlestick chart">
                    {/* Scales */}
                    {ticks.map((value) => (
                        <g key={value}>
                            <line x1={0} x2={plotW} y1={y(value)} y2={y(value)} stroke="#FFFFFF" strokeOpacity={0.05} />
                            <text x={plotW + 10} y={y(value) + 4} fontSize={11} fill={view.axis === "price" ? "#FFFFFF" : "#8a8a94"} className="tabular-nums" style={{ transition: "fill 300ms" }}>
                                {fmt(value)}
                            </text>
                        </g>
                    ))}
                    {candles.map((candle, i) =>
                        i % every === Math.floor(every / 2) ? (
                            <text key={candle.t} x={x(i)} y={h - 8} fontSize={11} fill={view.axis === "time" ? "#FFFFFF" : "#8a8a94"} textAnchor="middle" className="tabular-nums" style={{ transition: "fill 300ms" }}>
                                {clock(candle.t)}
                            </text>
                        ) : null
                    )}
                    <rect x={plotW} y={TOP - 8} width={AXIS_W} height={plotH + 16} fill={ACCENT} opacity={view.axis === "price" ? 0.1 : 0} style={{ transition: "opacity 300ms" }} />
                    <rect x={0} y={h - AXIS_H} width={plotW} height={AXIS_H} fill={ACCENT} opacity={view.axis === "time" ? 0.1 : 0} style={{ transition: "opacity 300ms" }} />

                    {/* Zones sit behind the candles */}
                    {(view.zones ?? []).map((zone) => (
                        <g key={`${zone.tone}-${zone.from}`} className="cockpit-rise">
                            <rect x={0} y={y(zone.to)} width={plotW} height={Math.max(2, y(zone.from) - y(zone.to))} fill={zoneColor[zone.tone]} opacity={zone.tone === "miss" ? 0.1 : 0.14} />
                            <line x1={0} x2={plotW} y1={y(zone.to)} y2={y(zone.to)} stroke={zoneColor[zone.tone]} strokeOpacity={0.55} strokeDasharray={zone.tone === "guess" || zone.tone === "miss" ? "4 4" : undefined} />
                            <line x1={0} x2={plotW} y1={y(zone.from)} y2={y(zone.from)} stroke={zoneColor[zone.tone]} strokeOpacity={0.55} strokeDasharray={zone.tone === "guess" || zone.tone === "miss" ? "4 4" : undefined} />
                            {zone.label && (
                                <text x={8} y={y(zone.to) - 6} fontSize={10} fontWeight={600} letterSpacing="0.08em" fill={zoneColor[zone.tone]}>
                                    {zone.label.toUpperCase()}
                                </text>
                            )}
                        </g>
                    ))}

                    {/* The path from swing to swing */}
                    {view.path && marks.length > 1 && <polyline className="cockpit-rise" fill="none" stroke="#FFFFFF" strokeOpacity={0.45} strokeWidth={1.2} strokeDasharray="5 4" points={marks.map((mark) => `${x(mark.i)},${y(mark.kind === "high" ? candles[mark.i].h : candles[mark.i].l)}`).join(" ")} />}

                    {/* Candles */}
                    {candles.slice(0, count).map((candle, i) => {
                        const color = candle.c >= candle.o ? UP : DOWN;
                        const fresh = i === count - 1 ? Math.min(1, drawn - (count - 1) + 0.25) : 1;
                        const ring = view.rings?.[i];
                        return (
                            <g key={candle.t} opacity={(focused && !focused.has(i) ? 0.22 : 1) * fresh} style={{ transition: "opacity 350ms" }}>
                                <line x1={x(i)} x2={x(i)} y1={y(candle.h)} y2={y(candle.l)} stroke={color} strokeWidth={1.2} />
                                <rect x={x(i) - body / 2} y={Math.min(y(candle.o), y(candle.c))} width={body} height={Math.max(1.5, Math.abs(y(candle.o) - y(candle.c)))} fill={color} />
                                {ring && <rect x={x(i) - body / 2 - 5} y={y(candle.h) - 6} width={body + 10} height={y(candle.l) - y(candle.h) + 12} fill="none" stroke={ring === "good" ? UP : ring === "bad" ? DOWN : ring === "shown" ? ACCENT : "#FFFFFF"} strokeOpacity={ring === "pin" ? 0.55 : 0.9} strokeDasharray={ring === "shown" ? "4 3" : undefined} rx={2} />}
                            </g>
                        );
                    })}

                    {/* Swing marks */}
                    {marks.map((mark) => {
                        const high = mark.kind === "high";
                        const py = high ? y(candles[mark.i].h) - 10 : y(candles[mark.i].l) + 10;
                        return (
                            <g key={`${mark.i}-${mark.kind}`} className="cockpit-rise">
                                <circle cx={x(mark.i)} cy={py} r={3.5} fill={tone(mark.tone)} />
                                {mark.label && (
                                    <text x={x(mark.i)} y={high ? py - 9 : py + 17} fontSize={10} fontWeight={600} letterSpacing="0.06em" fill={tone(mark.tone)} textAnchor="middle">
                                        {mark.label.toUpperCase()}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                    {/* Crosshair */}
                    {hover && hoverIndex !== null && (
                        <g pointerEvents="none">
                            <line x1={x(hoverIndex)} x2={x(hoverIndex)} y1={TOP} y2={TOP + plotH} stroke="#FFFFFF" strokeOpacity={0.2} />
                            <line x1={0} x2={plotW} y1={hover.y} y2={hover.y} stroke="#FFFFFF" strokeOpacity={0.2} />
                            <rect x={plotW + 1} y={hover.y - 10} width={AXIS_W - 2} height={20} fill="#1c1c20" />
                            <text x={plotW + 10} y={hover.y + 4} fontSize={11} fill="#FFFFFF" className="tabular-nums">
                                {exact(priceAt(hover.y))}
                            </text>
                        </g>
                    )}

                    {/* What can be clicked */}
                    {onPrice && <rect x={0} y={TOP} width={plotW} height={plotH} fill="transparent" onClick={(event) => onPrice(priceAt(event.clientY - event.currentTarget.getBoundingClientRect().top + TOP))} />}
                    {onCandle && candles.slice(0, count).map((candle, i) => <rect key={candle.t} x={x(i) - slot / 2} y={TOP} width={slot} height={plotH} fill="transparent" onClick={() => onCandle(i)} />)}
                    {onAxis && (
                        <>
                            <rect x={plotW} y={TOP} width={AXIS_W} height={plotH} fill="transparent" className="cursor-pointer" onClick={() => onAxis("price")} />
                            <rect x={0} y={h - AXIS_H - 6} width={plotW} height={AXIS_H + 6} fill="transparent" className="cursor-pointer" onClick={() => onAxis("time")} />
                        </>
                    )}
                </svg>
            )}

            {/* The candle being read */}
            {read && (
                <p className="pointer-events-none absolute left-0 top-0 flex flex-wrap gap-x-3 sm:gap-x-4 text-xs tabular-nums text-white/45">
                    {(
                        [
                            ["Open", read.o],
                            ["High", read.h],
                            ["Low", read.l],
                            ["Close", read.c],
                        ] as const
                    ).map(([name, value]) => (
                        <span key={name}>
                            {/* A narrow screen has room for the initial only. */}
                            <span className="sm:hidden">{name[0]}</span>
                            <span className="hidden sm:inline">{name}</span> <span className="text-white/85">{exact(value)}</span>
                        </span>
                    ))}
                </p>
            )}
        </div>
            {/* What this chart is: the market, the exchange, the timeframe and when. */}
            {note && <p className="mt-1.5 text-[11px] leading-snug text-white/40">{note}</p>}
        </div>
    );
};

export default LessonChart;
