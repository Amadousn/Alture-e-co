"use client";

import { useEffect, useRef, useState } from "react";

const UP = "#20B8A8";
const DOWN = "#E955A8";
const ACCENT = "#E3A1F7";

export type CandlePart = "body" | "upper" | "lower" | "open" | "high" | "low" | "close";
export type CandleSpec = {
    kind: "bull" | "bear";
    // How much of the candle's life has passed: 0 is the open, 1 is the close.
    progress?: number;
    // How long the candle takes to get there.
    ms?: number;
    // The parts and prices that are named on screen.
    show?: CandlePart[];
    // The part being explained.
    focus?: CandlePart | null;
};

type Props = {
    spec: CandleSpec;
    className?: string;
    // "parts": the body and the wicks can be clicked. "levels": the four prices can be clicked, unnamed.
    pick?: "parts" | "levels";
    onPart?: (part: CandlePart) => void;
    rings?: Partial<Record<CandlePart, "good" | "bad" | "shown">>;
};

const SHAPES = { bull: { o: 101, h: 103.6, l: 100.4, c: 103 }, bear: { o: 103, h: 103.6, l: 100.4, c: 101 } };
const NAMES: Record<CandlePart, string> = { body: "Body", upper: "Upper wick", lower: "Lower wick", open: "Open", high: "High", low: "Low", close: "Close" };
const W = 560;
const H = 420;
const CX = 250;
const BODY = 84;
const y = (price: number) => 40 + ((104 - price) / 4) * (H - 80);

// One candle, large enough to take apart. It can live its life in front of the
// learner (open, up to the high, down to the low, to the close), name its
// parts, and be clicked.
const CandleStage = ({ spec, className = "", pick, onPart, rings = {} }: Props) => {
    const target = SHAPES[spec.kind];
    const goal = spec.progress ?? 1;
    const [state, setState] = useState({ ...target, p: goal });
    const live = useRef(state);
    live.current = state;

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setState({ ...target, p: goal });
            return;
        }
        const start = { ...live.current };
        const began = performance.now();
        const span = Math.max(300, spec.ms ?? 900);
        let frame = 0;
        const tick = (now: number) => {
            const k = Math.min(1, (now - began) / span);
            const ease = 1 - Math.pow(1 - k, 2);
            const mix = (a: number, b: number) => a + (b - a) * ease;
            setState({ o: mix(start.o, target.o), h: mix(start.h, target.h), l: mix(start.l, target.l), c: mix(start.c, target.c), p: start.p + (goal - start.p) * k });
            if (k < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
        // The candle moves when its kind or its progress is changed.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [spec.kind, goal]);

    // Where price is, and how far it has been, at this point of the candle's life.
    const { o, h, l, c, p } = state;
    const at = (k: number) => (k <= 0.3 ? o + (h - o) * (k / 0.3) : k <= 0.62 ? h + (l - h) * ((k - 0.3) / 0.32) : l + (c - l) * ((k - 0.62) / 0.38));
    const price = at(p);
    const high = p >= 0.3 ? h : Math.max(o, price);
    const low = p >= 0.62 ? l : Math.min(o, price);
    const done = p >= 0.999;
    const color = price >= o ? UP : DOWN;
    const top = Math.max(o, price);
    const bottom = Math.min(o, price);

    const shown = new Set(spec.show ?? []);
    const dim = (part: CandlePart) => (spec.focus && spec.focus !== part ? 0.3 : 1);
    const levels: [CandlePart, number][] = [["high", h], ["open", o], ["close", c], ["low", l]];
    const ring = (part: CandlePart) => (rings[part] === "good" ? UP : rings[part] === "bad" ? DOWN : rings[part] === "shown" ? ACCENT : null);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* This one candle is drawn to be taken apart: it is not from the market. */}
            <p className="pointer-events-none absolute bottom-0 left-0 text-[11px] text-white/40">Illustration of one candle, with example prices. Not market data.</p>
            <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full max-w-[640px]" role="img" aria-label={`A ${spec.kind === "bull" ? "bullish" : "bearish"} candle`}>
                {/* The candle */}
                <g opacity={dim("upper")} style={{ transition: "opacity 300ms" }}>
                    <line x1={CX} x2={CX} y1={y(high)} y2={y(top)} stroke={color} strokeWidth={3} />
                </g>
                <g opacity={dim("lower")} style={{ transition: "opacity 300ms" }}>
                    <line x1={CX} x2={CX} y1={y(bottom)} y2={y(low)} stroke={color} strokeWidth={3} />
                </g>
                <g opacity={dim("body")} style={{ transition: "opacity 300ms" }}>
                    <rect x={CX - BODY / 2} y={y(top)} width={BODY} height={Math.max(2, y(bottom) - y(top))} fill={color} />
                </g>
                {(["upper", "lower", "body"] as const).map((part) => {
                    const stroke = ring(part) ?? (spec.focus === part ? ACCENT : null);
                    if (!stroke) return null;
                    const box = part === "body" ? [CX - BODY / 2 - 8, y(top) - 8, BODY + 16, y(bottom) - y(top) + 16] : part === "upper" ? [CX - 16, y(high) - 8, 32, y(top) - y(high) + 8] : [CX - 16, y(bottom), 32, y(low) - y(bottom) + 8];
                    return <rect key={part} className="cockpit-rise" x={box[0]} y={box[1]} width={box[2]} height={Math.max(8, box[3])} fill="none" stroke={stroke} strokeOpacity={0.9} rx={2} />;
                })}

                {/* While the candle is alive: where price is now */}
                {!done && levels.every(([part, value]) => !shown.has(part) || Math.abs(y(value) - y(price)) > 16) && (
                    <g>
                        <line x1={CX + BODY / 2 + 6} x2={CX + BODY / 2 + 86} y1={y(price)} y2={y(price)} stroke="#FFFFFF" strokeOpacity={0.6} strokeDasharray="3 4" />
                        <text x={CX + BODY / 2 + 96} y={y(price) + 6} fontSize={17} fill="#FFFFFF" className="tabular-nums">
                            {price.toFixed(2)}
                        </text>
                    </g>
                )}

                {/* The names of the parts, on the left */}
                {(["upper", "body", "lower"] as const).map((part) => {
                    if (!shown.has(part)) return null;
                    const py = part === "upper" ? (y(high) + y(top)) / 2 : part === "lower" ? (y(bottom) + y(low)) / 2 : (y(top) + y(bottom)) / 2;
                    return (
                        <g key={part} className="cockpit-rise" opacity={dim(part)}>
                            <line x1={CX - (part === "body" ? BODY / 2 + 8 : 12)} x2={112} y1={py} y2={py} stroke="#FFFFFF" strokeOpacity={0.35} />
                            <text x={104} y={py + 6} fontSize={17} fill="#FFFFFF" textAnchor="end">
                                {NAMES[part]}
                            </text>
                        </g>
                    );
                })}

                {/* The four prices, on the right */}
                {levels.map(([part, value]) => {
                        // A price is named once the candle has been there.
                        const reached = part === "open" || done || (part === "high" && p >= 0.3) || (part === "low" && p >= 0.62);
                        if (!reached) return null;
                        const named = shown.has(part);
                        const pickable = pick === "levels";
                        if (!named && !(pickable && done)) return null;
                        const stroke = ring(part) ?? (spec.focus === part ? ACCENT : "#FFFFFF");
                        return (
                            <g key={part} className="cockpit-rise" opacity={dim(part)}>
                                <line x1={CX + BODY / 2 + 6} x2={CX + BODY / 2 + 86} y1={y(value)} y2={y(value)} stroke={stroke} strokeOpacity={ring(part) || spec.focus === part ? 0.9 : 0.4} strokeDasharray="3 4" />
                                {named ? (
                                    <text x={CX + BODY / 2 + 96} y={y(value) + 6} fontSize={17} fill={ring(part) ?? "#FFFFFF"}>
                                        {NAMES[part]} <tspan fill="#8a8a94" className="tabular-nums">{value.toFixed(2)}</tspan>
                                    </text>
                                ) : (
                                    <circle cx={CX + BODY / 2 + 100} cy={y(value)} r={9} fill="#000" stroke={stroke} strokeOpacity={0.8} />
                                )}
                            </g>
                        );
                    })}

                {/* What can be clicked */}
                {pick === "parts" && onPart && (
                    <g className="cursor-pointer">
                        <rect x={CX - 30} y={y(high) - 10} width={60} height={y(top) - y(high) + 10} fill="transparent" onClick={() => onPart("upper")} />
                        <rect x={CX - 30} y={y(bottom)} width={60} height={y(low) - y(bottom) + 10} fill="transparent" onClick={() => onPart("lower")} />
                        <rect x={CX - BODY / 2 - 6} y={y(top)} width={BODY + 12} height={y(bottom) - y(top)} fill="transparent" onClick={() => onPart("body")} />
                    </g>
                )}
                {pick === "levels" && onPart && done && levels.map(([part, value]) => <rect key={part} className="cursor-pointer" x={CX + BODY / 2} y={y(value) - 14} width={W - CX - BODY / 2} height={28} fill="transparent" onClick={() => onPart(part)} />)}
            </svg>
        </div>
    );
};

export default CandleStage;
