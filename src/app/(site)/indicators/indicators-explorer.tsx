"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// The four TradingView indicators. Prices match the pricing on the AltureLock page.
// Each feature can be clicked to read what it shows and how to use it.

type Data = "real" | "estimated" | "none";
// spots: boxes on the indicator's image, in % of its width and height [x, y, w, h].
type Feature = { name: string; what: string; spots?: number[][] };
type Indicator = { id: string; name: string; plan: string; price: number; image: string; line: string; text: string; data: Data; features: Feature[] };

const at = (feature: Feature, ...spots: number[][]): Feature => ({ ...feature, spots });
const LVN_BANDS = [[2.3, 44.6, 84, 3.2], [2.3, 50.7, 84, 2], [2.3, 70.4, 84, 3.9], [2.3, 79, 84, 1.6]];

const VP: Feature = { name: "Volume Profile · POC, VAH, VAL", what: "How much volume traded at each price. The POC is the price with the most volume, where the market agreed the most. VAH and VAL frame the value area, where 70% of the volume traded. Price tends to return to value, or to move fast once it accepts outside it." };
const LVN: Feature = { name: "Low-volume nodes", what: "Prices where almost nothing traded. The market moved through them quickly, so it often does again: they act as gaps price crosses fast, and as targets on the other side." };
const VWAP: Feature = { name: "VWAP and its bands", what: "The average price paid today, weighted by volume. Above it, buyers are in control on average; below, sellers. The bands mark how far price has stretched from that average." };
const MS: Feature = { name: "Market structure · BOS and CHoCH", what: "A Break of Structure (BOS) confirms the trend continues: a new high in an uptrend, a new low in a downtrend. A Change of Character (CHoCH) is the first break against the trend, the first sign it may be turning." };
const EMA: Feature = { name: "EMA cloud · 9 and 21", what: "Two exponential moving averages, 9 and 21 by default, with the space between them filled. Purple when the fast one is above, a bullish short-term trend; white when below. The lines can be shown alone, without the cloud. Off by default, one click in the settings." };
// The Break of Structure lines on the VP charts (standard and free).
const BOS_LINES = [[11, 55.3, 12.5, 2], [26, 52, 10, 2], [39.6, 61.4, 10.2, 2], [42, 50.6, 6, 2], [56, 63.6, 6, 2]];
const FVG: Feature = { name: "Fair Value Gaps", what: "Three candles where the middle one moved so fast that the first and third do not overlap. That empty zone is an imbalance: price often comes back to fill it before moving on." };

const INDICATORS: Indicator[] = [
    {
        id: "all-in-one",
        name: "Volume Profile + Footprint",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/allinone.jpg",
        line: "The whole read on one chart, from real order flow.",
        text: "Market context, structure and entry timing together. The order flow comes from TradingView's footprint data: the real volume bought and sold at each price.",
        data: "real",
        features: [
            at(VP, [55.5, 33, 28.5, 57.5]),
            VWAP,
            EMA,
            at(LVN, [0, 36.5, 84, 4.6], [0, 75.4, 84, 5.7]),
            at(MS, [0, 30.5, 5.5, 3.5], [36.8, 66, 4.6, 3]),
            at(FVG, [44.2, 57.5, 8.6, 12.4]),
            { spots: [[43.5, 46.8, 5.2, 5.4], [12, 60.3, 4.2, 4.2], [44.5, 72.3, 4.6, 4.6], [48.2, 77.6, 4, 4]], name: "Delta bubbles", what: "Each bubble is the difference between what was bought at the ask and sold at the bid in a candle, taken from the real footprint. A large bubble at a level shows where one side pushed hard." },
            { spots: [[12.5, 60.5, 27, 7.2]], name: "CVD divergence", what: "Cumulative volume delta adds every candle's delta. When price makes a new high but CVD does not, buyers are no longer behind the move: a warning before the reversal." },
            { spots: [[40.8, 53, 6.4, 7.2]], name: "Absorption (A) and exhaustion (E)", what: "Absorption: heavy selling or buying hits a level and price does not move, someone large is absorbing it. Exhaustion: the push runs out of volume at the end of a move. Both are read from the real footprint." },
        ],
    },
    {
        id: "standard",
        name: "Volume Profile + VWAP",
        plan: "Every TradingView plan",
        price: 19,
        image: "/images/indicators/standard.jpg",
        line: "The same read, on any TradingView plan.",
        text: "Everything in Volume Profile + Footprint, with the order flow built from 1-minute data, the closest read to the footprint on any TradingView plan.",
        data: "estimated",
        features: [at(VP, [68, 42, 19, 41.5]), at(LVN, ...LVN_BANDS), at(VWAP, [21.5, 46.5, 44.5, 14.5]), at(MS, ...BOS_LINES), at(FVG, [60.3, 58.3, 5.6, 8.8]), EMA, { spots: [[2.5, 42, 63, 42]], name: "1-minute order flow", what: "Buying and selling pressure rebuilt from the 1-minute data inside each candle: the closest read to the footprint without a Premium plan. It tracks the footprint closely, without the trade-by-trade split at the bid and the ask." }],
    },
    {
        id: "order-flow",
        name: "Order Flow CVD",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/orderflow.jpg",
        line: "Inside every candle.",
        text: "What was sold at the bid and bought at the ask, at every price, from TradingView's real footprint data. Made for traders who read the tape, not the structure.",
        data: "real",
        features: [
            { spots: [[46.3, 25.2, 51.9, 58.5]], name: "Bid × ask on the candles", what: "At each price inside the candle, the volume sold at the bid on the left and bought at the ask on the right. You see who was aggressive, and where." },
            { spots: [[47, 34.6, 33.5, 2.9], [47, 79.1, 33.5, 2.9]], name: "Imbalances", what: "A price where one side traded several times more than the other diagonally. Stacked imbalances show a strong, one-sided push, and often become support or resistance." },
            { spots: [[24.8, 36, 5.6, 9.2], [26.8, 72, 5.6, 5.6]], name: "CVD divergence", what: "When price and cumulative delta disagree, the move is not backed by aggressive volume. One of the clearest early signs of a turn." },
            { spots: [[25.4, 36.4, 4.6, 4.6], [26.8, 71.6, 4.6, 4.6], [32, 79, 4.6, 4.6]], name: "Volume bubbles", what: "Bubbles sized by volume mark the prices where the largest amounts traded, so big participants stand out at a glance." },
            { spots: [[64, 30.5, 17.5, 52]], name: "Numbers that adapt to the zoom", what: "Zoom out and the numbers simplify; zoom in and every price level shows. The chart stays readable at any scale." },
        ],
    },
    {
        id: "volume-profile",
        name: "Volume Profile + FVG + MS",
        plan: "Every TradingView plan",
        price: 0,
        image: "/images/indicators/vpms.jpg",
        line: "Where volume traded, and where it did not.",
        text: "The base of the Alture read: the volume profile, the low-volume nodes price moves through quickly, the structure of the market and its Fair Value Gaps.",
        data: "none",
        features: [at(VP, [68, 42, 19, 41.5]), at(LVN, ...LVN_BANDS), at(MS, ...BOS_LINES), FVG],
    },
];

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

// The badge that tells the two order-flow sources apart at a glance.
const DataBadge = ({ data }: { data: Data }) =>
    data === "real" ? (
        <span className="inline-flex items-center gap-2 rounded-sm border border-[#E3A1F7]/60 bg-[#E3A1F7]/[0.08] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E3A1F7] shadow-[0_0_22px_rgba(227,161,247,0.28)]">
            <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E3A1F7] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#E3A1F7]" />
            </span>
            Real footprint data
        </span>
    ) : data === "estimated" ? (
        <span className="inline-flex items-center gap-2 rounded-sm border border-dashed border-white/30 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full border border-white/50" />
            1-minute order flow
        </span>
    ) : null;

// The indicator's image with the chosen feature lit: the rest of the chart dims,
// the feature's zones are outlined. Features not drawn on this chart leave it whole.
const Spotlight = ({ item, feature, index }: { item: Indicator; feature: Feature; index: number }) => {
    const spots = feature.spots ?? [];
    return (
        <div className={`relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border ${item.data === "real" ? "border-[#E3A1F7]/40 shadow-[0_0_60px_-10px_rgba(227,161,247,0.35)]" : "border-white/10"}`}>
            <Image src={item.image} alt={`${item.name} on a TradingView chart`} width={1080} height={1350} className="block w-full" />
            <svg viewBox="0 0 100 125" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
                <defs>
                    <mask id={`m-${item.id}`}>
                        <rect width="100" height="125" fill="white" />
                        {spots.map(([x, y, w, h], i) => (
                            <rect key={i} x={x} y={y * 1.25} width={w} height={h * 1.25} rx="0.8" fill="black" />
                        ))}
                    </mask>
                </defs>
                <rect width="100" height="125" fill="black" mask={`url(#m-${item.id})`} className="transition-opacity duration-500" opacity={spots.length ? 0.62 : 0} />
                {spots.map(([x, y, w, h], i) => (
                    <rect key={`${feature.name}-${i}`} x={x} y={y * 1.25} width={w} height={h * 1.25} rx="0.8" fill="none" stroke="#E3A1F7" strokeWidth="0.35" className="spot-in" style={{ filter: "drop-shadow(0 0 1.2px rgba(227,161,247,0.9))" }} />
                ))}
            </svg>
            {spots.length > 0 && (
                <span key={feature.name} className="spot-in absolute bottom-3 left-3 rounded-sm bg-black/80 px-2 py-1 font-mono text-[11px] text-[#E3A1F7] backdrop-blur">
                    {String(index + 1).padStart(2, "0")} · {feature.name}
                </span>
            )}
        </div>
    );
};

const Section = ({ item, index }: { item: Indicator; index: number }) => {
    const [open, setOpen] = useState(0);
    const feature = item.features[open];
    return (
        <section id={item.id} className="scroll-mt-20 bg-black !py-14 md:!py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 lg:grid-cols-12">
                    <div className={`min-w-0 lg:col-span-6 lg:sticky lg:top-24 ${index % 2 ? "lg:order-2" : ""}`}>
                        <Spotlight item={item} feature={feature} index={open} />
                    </div>
                    <div className={`min-w-0 lg:col-span-6 ${index % 2 ? "lg:order-1" : ""}`}>
                        <div className="flex flex-wrap items-center gap-3">
                            <DataBadge data={item.data} />
                            <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">{item.plan}</p>
                        </div>
                        <p className="mt-5 text-3xl md:text-[40px] md:leading-[1.1] font-medium tracking-tight text-white">{item.name}</p>
                        <p className="mt-3 font-logo text-xl font-light text-white/70">{item.line}</p>

                        <ol className="mt-9 border-t border-white/10" aria-label={`${item.name} features`}>
                            {item.features.map((f, i) => {
                                const active = open === i;
                                return (
                                    <li key={f.name} className="border-b border-white/10">
                                        <button type="button" aria-expanded={active} onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)} className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-baseline gap-3 py-3.5 text-left">
                                            <span className={`font-mono text-[12px] tabular-nums transition-colors ${active ? "text-[#E3A1F7]" : "text-white/30"}`}>{String(i + 1).padStart(2, "0")}</span>
                                            <span className={`text-[15px] transition-colors ${active ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>{f.name}</span>
                                            <span className={`text-[12px] transition-all ${active ? "text-[#E3A1F7]" : "text-white/0 group-hover:text-white/40"}`}>{f.spots ? "●" : "→"}</span>
                                        </button>
                                        <div className={`grid transition-[grid-template-rows] duration-300 ${active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                            <p className="overflow-hidden pl-[3rem] pr-4 text-[14px] leading-relaxed text-white/55">
                                                <span className="block pb-4">{f.what}</span>
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>

                        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
                            <p className="flex items-baseline gap-2">
                                <span className="font-logo text-4xl font-light tabular-nums text-white">{item.price ? `$${item.price}` : "Free"}</span>
                                {item.price > 0 && <span className="text-sm text-white/45">/ month</span>}
                            </p>
                            <Link href="/#contact" className="group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8] lit">
                                {item.price ? "Request access" : "Get it free"}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footprint against 1-minute order flow: two sentences and the price.
const COMPARE = [
    { name: "Volume Profile + Footprint", price: 39, line: "Every trade.", note: "TradingView footprint · Premium or Ultimate", real: true },
    { name: "Volume Profile + VWAP", price: 19, line: "Every minute.", note: "1-minute data · Every TradingView plan", real: false },
];
const Compare = () => (
    <section className="bg-black !py-10 md:!py-16">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="divide-y divide-white/10 border-y border-white/10">
                {COMPARE.map((c) => (
                    <a key={c.name} href={c.real ? "#all-in-one" : "#standard"} className="group grid grid-cols-[1fr_auto] items-end gap-6 py-8 md:py-10">
                        <div>
                            <p className={`text-[11px] uppercase tracking-[0.14em] ${c.real ? "text-[#E3A1F7]" : "text-white/40"}`}>{c.name}</p>
                            <p className={`mt-3 font-logo text-[44px] md:text-[72px] font-extralight leading-none tracking-tight ${c.real ? "text-white [text-shadow:0_0_40px_rgba(227,161,247,0.35)]" : "text-white/70"}`}>{c.line}</p>
                            <p className="mt-4 text-[13px] md:text-[14px] text-white/40">{c.note}</p>
                        </div>
                        <p className="flex items-baseline gap-1.5">
                            <span className="font-logo text-[36px] md:text-[48px] font-extralight leading-none text-white">${c.price}</span>
                            <span className="text-[12px] text-white/35">/ month</span>
                        </p>
                    </a>
                ))}
            </div>
        </div>
    </section>
);

const IndicatorsExplorer = () => (
    <>
        <Compare />
        {INDICATORS.map((item, index) => (
            <Section key={item.id} item={item} index={index} />
        ))}
    </>
);

export default IndicatorsExplorer;
