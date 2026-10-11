"use client";

import { useEffect, useRef } from "react";
import { volumeProfile } from "@/utils/volume-profile";
import { SAMPLE_CANDLES, SAMPLE_LOOKBACK, SAMPLE_SOURCE } from "./indicator-example-data";

// The indicator's own default colours.
const UP = "#c850f0";
const DOWN = "#f2f2f2";
const POC = "#f5d90a";
const VA = "#ffffff";
const HVN = "#c08a4a";
const LVN = "#9e9e9e";
const HIST_UP = "#e6e6e6";
const HIST_DOWN = "#b57cc4";

const W = 840;
const H = 600;
const TOP = 44;
const BOTTOM = 34;
const CHART_R = 548; // right edge of the candles
const HIST_L = 566; // the histogram grows leftward from HIST_R
const HIST_R = 742;
const AXIS = 750;

const NOTES: [string, string, string][] = [
    ["Histogram", HIST_UP, "Volume traded at each price over the last 70 candles. Longer rows: more volume. Light: up candles. Purple: down candles."],
    ["POC", POC, "Point of Control: the price with the most volume."],
    ["VAH / VAL", VA, "Value Area High and Low: the edges of the area that holds 80% of the volume."],
    ["HVN", HVN, "High volume node: a price where a lot traded."],
    ["LVN", LVN, "Low volume node: an area price moved through with little traded."],
];

const money = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// The Volume Profile as ALTURE & CO All-in-One draws it: the histogram beside
// price, with the Point of Control, the value area and the volume nodes. It is
// computed here with the indicator's method and default settings, from a fixed
// sample of real candles. It is an illustration, not a TradingView screenshot.
const IndicatorFigure = () => {
    // On a narrow screen the figure scrolls sideways: it opens on its right side, where the histogram is.
    const scroller = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const node = scroller.current;
        if (node) node.scrollLeft = node.scrollWidth;
    }, []);
    const candles = SAMPLE_CANDLES.map(([t, o, h, l, c, v]) => ({ t, o, h, l, c, v }));
    const start = candles.length - SAMPLE_LOOKBACK;
    const profile = volumeProfile(candles.slice(start));

    const hi = Math.max(...candles.map((candle) => candle.h));
    const lo = Math.min(...candles.map((candle) => candle.l));
    const pad = (hi - lo) * 0.06;
    const y = (price: number) => TOP + ((hi + pad - price) / (hi - lo + pad * 2)) * (H - TOP - BOTTOM);
    const slot = (CHART_R - 14) / candles.length;
    const x = (i: number) => 14 + (i + 0.5) * slot;
    const body = Math.max(2, slot * 0.62);
    const biggest = Math.max(...profile.rows);
    const rowH = Math.max(1, Math.abs(y(profile.lo) - y(profile.lo + profile.step)) * 0.72);

    // Overlapping low-volume areas are drawn as one band.
    const bands = profile.lvn.reduce<{ from: number; to: number }[]>((list, zone) => {
        const last = list[list.length - 1];
        if (last && zone.from <= last.to) last.to = Math.max(last.to, zone.to);
        else list.push({ ...zone });
        return list;
    }, []);
    const tags: [string, number, string][] = [
        ["VAH", profile.vah, VA],
        ["POC", profile.poc, POC],
        ["VAL", profile.val, VA],
    ];
    const clock = (time: number) => `${String(new Date(time).getUTCHours()).padStart(2, "0")}:00`;

    return (
        <figure>
            <div ref={scroller} className="overflow-x-auto rounded-sm border border-white/15">
                <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[640px] lg:min-w-0" role="img" aria-label="A candlestick chart with the Volume Profile histogram beside it, showing the Point of Control, the Value Area High and Low, two high volume nodes and a low volume node">
                    <rect width={W} height={H} fill="#050506" />
                    <text x={16} y={26} fontSize={13} fill="#ffffff" fillOpacity={0.85} fontWeight={600}>
                        ALTURE &amp; CO | All-in-One
                    </text>
                    <text x={196} y={26} fontSize={12} fill="#ffffff" fillOpacity={0.45}>
                        Volume Profile · BTCUSDT · 15m
                    </text>

                    {/* The candles the profile is read from */}
                    <line x1={x(start) - slot / 2} x2={x(start) - slot / 2} y1={TOP} y2={H - BOTTOM} stroke="#ffffff" strokeOpacity={0.18} strokeDasharray="2 5" />
                    <text x={x(start) - slot / 2 + 6} y={H - BOTTOM - 8} fontSize={11} fill="#ffffff" fillOpacity={0.4}>
                        Profile of the last {SAMPLE_LOOKBACK} candles
                    </text>

                    {/* Low volume nodes: areas */}
                    {bands.map((zone) => (
                        <g key={zone.from}>
                            <rect x={x(start) - slot / 2} y={y(zone.to)} width={HIST_R - x(start) + slot / 2} height={y(zone.from) - y(zone.to)} fill={LVN} fillOpacity={0.13} stroke={LVN} strokeOpacity={0.3} />
                        </g>
                    ))}

                    {/* High volume nodes: levels */}
                    {profile.hvn.map((price) => (
                        <g key={price}>
                            <line x1={x(start) - slot / 2} x2={HIST_R} y1={y(price)} y2={y(price)} stroke={HVN} strokeOpacity={0.6} />
                        </g>
                    ))}

                    {/* Value area */}
                    <line x1={x(start) - slot / 2} x2={AXIS - 2} y1={y(profile.vah)} y2={y(profile.vah)} stroke={VA} strokeOpacity={0.8} />
                    <line x1={x(start) - slot / 2} x2={AXIS - 2} y1={y(profile.val)} y2={y(profile.val)} stroke={VA} strokeOpacity={0.8} />

                    {/* Candles */}
                    {candles.map((candle, i) => {
                        const color = candle.c >= candle.o ? UP : DOWN;
                        return (
                            <g key={candle.t} opacity={i < start ? 0.45 : 1}>
                                <line x1={x(i)} x2={x(i)} y1={y(candle.h)} y2={y(candle.l)} stroke={color} strokeWidth={1} />
                                <rect x={x(i) - body / 2} y={Math.min(y(candle.o), y(candle.c))} width={body} height={Math.max(1, Math.abs(y(candle.o) - y(candle.c)))} fill={color} />
                            </g>
                        );
                    })}

                    {/* The node names sit over the candles, so they are never hidden by them */}
                    {bands.map((zone) => (
                        <text key={zone.from} x={x(start) - slot / 2 + 6} y={(y(zone.from) + y(zone.to)) / 2 + 4} fontSize={11} fontWeight={700} fill="#c9c9cf" stroke="#050506" strokeWidth={4} paintOrder="stroke">
                            LVN
                        </text>
                    ))}
                    {profile.hvn.map((price) => (
                        <text key={price} x={x(start) - slot / 2 + 6} y={y(price) - 5} fontSize={11} fontWeight={700} fill={HVN} stroke="#050506" strokeWidth={4} paintOrder="stroke">
                            HVN
                        </text>
                    ))}

                    {/* The histogram: one thin row per price, up volume against the edge, then down volume. Brighter inside the value area. */}
                    {profile.rows.map((volume, j) => {
                        if (volume <= 0) return null;
                        const price = profile.lo + (j + 0.5) * profile.step;
                        const width = ((HIST_R - HIST_L) * volume) / biggest;
                        const upWidth = (width * profile.up[j]) / volume;
                        const inside = price <= profile.vah && price >= profile.val;
                        return (
                            <g key={j} opacity={inside ? 0.92 : 0.38}>
                                <rect x={HIST_R - upWidth} y={y(price) - rowH / 2} width={upWidth} height={rowH} fill={HIST_UP} />
                                <rect x={HIST_R - width} y={y(price) - rowH / 2} width={width - upWidth} height={rowH} fill={HIST_DOWN} />
                            </g>
                        );
                    })}
                    <line x1={HIST_R} x2={HIST_R} y1={y(profile.hi)} y2={y(profile.lo)} stroke="#ffffff" strokeOpacity={0.25} />

                    {/* Point of control: a short stub at the latest candles */}
                    <line x1={x(candles.length - 9)} x2={AXIS - 2} y1={y(profile.poc)} y2={y(profile.poc)} stroke={POC} strokeWidth={1.4} />

                    {/* The three levels, named on the scale */}
                    {tags.map(([name, price, color]) => (
                        <g key={name}>
                            <rect x={AXIS} y={y(price) - 10} width={W - AXIS - 4} height={20} fill="#050506" stroke={color} strokeOpacity={0.75} />
                            <text x={AXIS + 6} y={y(price) + 4} fontSize={11} fontWeight={700} fill={color}>
                                {name}
                            </text>
                            <text x={W - 10} y={y(price) + 4} fontSize={10.5} fill={color} textAnchor="end">
                                {money(price)}
                            </text>
                        </g>
                    ))}

                    {/* Time */}
                    {candles.map((candle, i) =>
                        new Date(candle.t).getUTCMinutes() === 0 && new Date(candle.t).getUTCHours() % 4 === 0 ? (
                            <text key={candle.t} x={x(i)} y={H - 10} fontSize={11} fill="#8a8a94" textAnchor="middle">
                                {clock(candle.t)}
                            </text>
                        ) : null
                    )}
                    <text x={(HIST_L + HIST_R) / 2} y={H - 10} fontSize={11} fill="#8a8a94" textAnchor="middle">
                        Volume at each price
                    </text>
                </svg>
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-white/40">
                The Volume Profile as the indicator draws it, reproduced with its default settings from real candles ({SAMPLE_SOURCE}). An illustration, not a TradingView screenshot.
                <span className="lg:hidden"> Swipe sideways to see the earlier candles.</span>
            </figcaption>
            <dl className="mt-5 grid gap-x-8 gap-y-2.5 text-[13px] leading-snug sm:grid-cols-2">
                {NOTES.map(([term, color, text]) => (
                    <div key={term} className="flex gap-2.5">
                        <span className="mt-[6px] h-2 w-2 flex-shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
                        <span className="text-white/55">
                            <dt className="inline font-medium text-white">{term}.</dt> <dd className="inline">{text}</dd>
                        </span>
                    </div>
                ))}
            </dl>
        </figure>
    );
};

export default IndicatorFigure;
