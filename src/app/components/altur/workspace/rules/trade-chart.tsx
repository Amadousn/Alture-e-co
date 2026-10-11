"use client";

import { useEffect, useRef, useState } from "react";
import type { Candle } from "@/utils/use-market";
import { decimalsOf, fallbackTick, snap } from "@/utils/trade-plan";
import { DOWN, UP } from "./ui";

export type Level = "entry" | "stop" | "target";

const LEVELS: { id: Level; label: string; color: string; dash?: string }[] = [
    { id: "target", label: "TAKE PROFIT", color: UP, dash: "5 4" },
    { id: "entry", label: "ENTRY", color: "#FFFFFF" },
    { id: "stop", label: "STOP LOSS", color: DOWN, dash: "5 4" },
];

type Props = {
    candles: Candle[] | null;
    levels: Record<Level, number | null>;
    // A real price from the feed, or one the trader typed. Never generated.
    marker?: { price: number; label: string } | null;
    tick?: number;
    editable?: Level[];
    // When set, the next click on the chart places this level.
    placing?: Level | null;
    onChange?: (level: Level, value: number) => void;
    onPlaced?: () => void;
    riskText?: string;
    rewardText?: string;
    caption: string;
    emptyText: string;
    className?: string;
};

const GUTTER = 84;
const PAD_TOP = 14;
const PAD_BOTTOM = 26;

// Price chart with the three plan levels drawn on it. Levels can be dragged,
// nudged with the arrow keys, or placed with a click.
const TradeChart = ({ candles, levels, marker, tick, editable = [], placing = null, onChange, onPlaced, riskText, rewardText, caption, emptyText, className = "" }: Props) => {
    const wrap = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [hover, setHover] = useState<number | null>(null);
    const [dragging, setDragging] = useState<Level | null>(null);
    // The price scale is held still while a level is being dragged.
    const frozen = useRef<[number, number] | null>(null);

    useEffect(() => {
        const node = wrap.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const values = [...(candles ?? []).flatMap((c) => [c.h, c.l]), ...LEVELS.flatMap((l) => (levels[l.id] !== null && levels[l.id]! > 0 ? [levels[l.id]!] : [])), ...(marker ? [marker.price] : [])];
    let domain: [number, number] | null = null;
    if (values.length > 0) {
        const lo = Math.min(...values);
        const hi = Math.max(...values);
        const span = Math.max(hi - lo, hi * 0.004);
        // With nothing but a single level, leave room either side to place the others.
        const pad = values.length === 1 ? hi * 0.03 : span * 0.12;
        domain = [Math.max(0, lo - pad), hi + pad];
    }
    if (frozen.current) domain = frozen.current;

    const { w, h } = size;
    const plotW = Math.max(0, w - GUTTER);
    const plotH = Math.max(0, h - PAD_TOP - PAD_BOTTOM);
    const step = tick ?? fallbackTick(domain ? domain[1] : 1);
    const decimals = decimalsOf(step);
    const fmt = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    const y = (price: number) => (domain ? PAD_TOP + ((domain[1] - price) / (domain[1] - domain[0])) * plotH : 0);
    const priceAt = (clientY: number) => {
        const rect = wrap.current!.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (clientY - rect.top - PAD_TOP) / plotH));
        return Math.max(step, snap(domain![1] - ratio * (domain![1] - domain![0]), step));
    };

    const ready = w > 0 && h > 0 && domain !== null;
    const entry = levels.entry;
    const zone = (other: number | null, color: string, text?: string) => {
        if (entry === null || other === null || !ready) return null;
        const top = Math.min(y(entry), y(other));
        const height = Math.abs(y(entry) - y(other));
        return (
            <g>
                <rect x={0} y={top} width={plotW} height={height} fill={color} opacity={0.11} style={{ transition: dragging ? "none" : "y 0.18s, height 0.18s" }} />
                {text && height > 44 && (
                    <>
                        <rect x={8} y={top + height / 2 - 9} width={text.length * 7 + 14} height={18} fill="#0b0b0d" opacity={0.85} />
                        <text x={14} y={top + height / 2 + 4} fontSize={11} fontWeight={600} fill={color} letterSpacing="0.06em">
                            {text}
                        </text>
                    </>
                )}
            </g>
        );
    };

    const nudge = (level: Level, event: React.KeyboardEvent) => {
        const current = levels[level];
        if (current === null || !onChange) return;
        const direction = event.key === "ArrowUp" ? 1 : event.key === "ArrowDown" ? -1 : 0;
        if (direction === 0) return;
        event.preventDefault();
        onChange(level, Math.max(step, snap(current + direction * step * (event.shiftKey ? 10 : 1), step)));
    };

    const count = candles?.length ?? 0;
    const slot = count > 0 ? plotW / count : 0;
    const body = Math.max(1, slot * 0.62);
    const ticks = domain ? [0.2, 0.5, 0.8].map((r) => domain![0] + (domain![1] - domain![0]) * r) : [];

    return (
        <div className={`relative ${className}`}>
            <div ref={wrap} className="absolute inset-0 select-none">
                {ready && (
                    <svg width={w} height={h} role="group" aria-label="Trade plan chart" className="block">
                        {/* Recent price */}
                        {(candles ?? []).map((c, i) => {
                            const x = i * slot + slot / 2;
                            const color = c.c >= c.o ? UP : DOWN;
                            return (
                                <g key={c.t} opacity={0.62}>
                                    <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={1} />
                                    <rect x={x - body / 2} y={Math.min(y(c.o), y(c.c))} width={body} height={Math.max(1, Math.abs(y(c.o) - y(c.c)))} fill={color} />
                                </g>
                            );
                        })}

                        {/* Risk and reward areas */}
                        {zone(levels.stop, DOWN, riskText)}
                        {zone(levels.target, UP, rewardText)}

                        {/* Price scale */}
                        <line x1={plotW} x2={plotW} y1={0} y2={h} stroke="#232329" />
                        {ticks.map((value) => (
                            <text key={value} x={plotW + 8} y={y(value) + 4} fontSize={11} fill="#55555e">
                                {fmt(value)}
                            </text>
                        ))}

                        {/* A real or trader-entered price */}
                        {marker && (
                            <g>
                                <line x1={0} x2={plotW} y1={y(marker.price)} y2={y(marker.price)} stroke="#9a9aa5" strokeWidth={1} strokeDasharray="2 4" />
                                {count > 0 && <circle cx={(count - 1) * slot + slot / 2} cy={y(marker.price)} r={3.5} fill="#FFFFFF" className="cockpit-pulse" />}
                                <rect x={plotW + 1} y={y(marker.price) - 10} width={GUTTER - 2} height={20} fill="#232329" />
                                <text x={plotW + 8} y={y(marker.price) + 4} fontSize={11} fontWeight={600} fill="#FFFFFF">
                                    {fmt(marker.price)}
                                </text>
                                <text x={plotW - 8} y={y(marker.price) - 6} fontSize={10} fill="#9a9aa5" textAnchor="end" letterSpacing="0.06em">
                                    {marker.label}
                                </text>
                            </g>
                        )}

                        {/* Plan levels */}
                        {LEVELS.map((level) => {
                            const value = levels[level.id];
                            if (value === null || value <= 0) return null;
                            const canEdit = editable.includes(level.id) && Boolean(onChange) && !placing;
                            const ly = y(value);
                            const dark = level.id === "entry";
                            return (
                                <g
                                    key={level.id}
                                    transform={`translate(0 ${ly})`}
                                    style={{ transition: dragging ? "none" : "transform 0.18s", cursor: canEdit ? "ns-resize" : "default", touchAction: canEdit ? "none" : undefined, outline: "none" }}
                                    tabIndex={canEdit ? 0 : undefined}
                                    role={canEdit ? "slider" : undefined}
                                    aria-label={canEdit ? `${level.label.toLowerCase()} price` : undefined}
                                    aria-orientation={canEdit ? "vertical" : undefined}
                                    aria-valuenow={canEdit ? value : undefined}
                                    aria-valuetext={canEdit ? fmt(value) : undefined}
                                    onKeyDown={canEdit ? (event) => nudge(level.id, event) : undefined}
                                    onPointerDown={
                                        canEdit
                                            ? (event) => {
                                                  event.currentTarget.setPointerCapture(event.pointerId);
                                                  frozen.current = domain;
                                                  setDragging(level.id);
                                              }
                                            : undefined
                                    }
                                    onPointerMove={canEdit && dragging === level.id ? (event) => onChange!(level.id, priceAt(event.clientY)) : undefined}
                                    onPointerUp={
                                        canEdit
                                            ? () => {
                                                  frozen.current = null;
                                                  setDragging(null);
                                              }
                                            : undefined
                                    }
                                    onPointerCancel={
                                        canEdit
                                            ? () => {
                                                  frozen.current = null;
                                                  setDragging(null);
                                              }
                                            : undefined
                                    }
                                >
                                    {/* Generous grab area */}
                                    <rect x={0} y={-13} width={w} height={26} fill="transparent" />
                                    <line x1={0} x2={plotW} y1={0} y2={0} stroke={level.color} strokeWidth={dragging === level.id ? 2 : 1.25} strokeDasharray={level.dash} />
                                    <rect x={8} y={-9} width={level.label.length * 6.6 + 12} height={18} fill="#0b0b0d" stroke={level.color} strokeWidth={1} />
                                    <text x={14} y={4} fontSize={10} fontWeight={700} fill={level.color} letterSpacing="0.08em">
                                        {level.label}
                                    </text>
                                    <rect x={plotW + 1} y={-10} width={GUTTER - 2} height={20} fill={level.color} />
                                    <text x={plotW + 8} y={4} fontSize={11} fontWeight={700} fill={dark ? "#000000" : "#000000"}>
                                        {fmt(value)}
                                    </text>
                                    {canEdit && (
                                        <path d={`M ${plotW - 14} -4 l 4 -4 l 4 4 M ${plotW - 14} 4 l 4 4 l 4 -4`} fill="none" stroke={level.color} strokeWidth={1.5} />
                                    )}
                                </g>
                            );
                        })}

                        {/* Click-to-place */}
                        {placing && onChange && (
                            <g>
                                {hover !== null && (
                                    <>
                                        <line x1={0} x2={plotW} y1={y(hover)} y2={y(hover)} stroke="#E3A1F7" strokeWidth={1} />
                                        <rect x={plotW + 1} y={y(hover) - 10} width={GUTTER - 2} height={20} fill="#E3A1F7" />
                                        <text x={plotW + 8} y={y(hover) + 4} fontSize={11} fontWeight={700} fill="#000000">
                                            {fmt(hover)}
                                        </text>
                                    </>
                                )}
                                <rect
                                    x={0}
                                    y={0}
                                    width={w}
                                    height={h}
                                    fill="transparent"
                                    style={{ cursor: "crosshair", touchAction: "none" }}
                                    onPointerMove={(event) => setHover(priceAt(event.clientY))}
                                    onPointerLeave={() => setHover(null)}
                                    onClick={(event) => {
                                        onChange(placing, priceAt(event.clientY));
                                        setHover(null);
                                        onPlaced?.();
                                    }}
                                />
                            </g>
                        )}

                        <text x={8} y={h - 8} fontSize={10} fill="#55555e" letterSpacing="0.04em">
                            {caption}
                        </text>
                    </svg>
                )}
                {!ready && <div className="absolute inset-0 flex items-center justify-center px-8 text-center text-sm leading-relaxed text-[#7d7d87]">{emptyText}</div>}
            </div>
        </div>
    );
};

export default TradeChart;
