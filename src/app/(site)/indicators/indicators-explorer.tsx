"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// The six TradingView indicators. Prices match the pricing on the AltureLock page.
// Each feature can be clicked to read what it shows and how to use it.

type Data = "real" | "estimated" | "none";
// spots: boxes on the indicator's image, in % of its width and height [x, y, w, h].
type Feature = { name: string; what: string; spots?: number[][]; draw?: "ema" | "vwap" | "fvg" };
type Indicator = { id: string; name: string; edition?: string; plan: string; price: number; image: string; line: string; problem: string; text: string; data: Data; features: Feature[] };

const at = (feature: Feature, ...spots: number[][]): Feature => ({ ...feature, spots });
const LVN_BANDS = [[2.3, 44.6, 84, 3.2], [2.3, 50.7, 84, 2], [2.3, 70.4, 84, 3.9], [2.3, 79, 84, 1.6]];

const VP: Feature = { name: "Volume Profile · POC, VAH, VAL", what: "How much volume traded at each price. The POC is the price with the most volume, where the market agreed the most. VAH and VAL frame the value area, where 70% of the volume traded. Price tends to return to value, or to move fast once it accepts outside it." };
const LVN: Feature = { name: "Low-volume nodes", what: "Prices where almost nothing traded. The market moved through them quickly, so it often does again: they act as gaps price crosses fast, and as targets on the other side." };
const VWAP: Feature = { draw: "vwap", name: "VWAP and its bands", what: "The average price paid today, weighted by volume. Above it, buyers are in control on average; below, sellers. The bands mark how far price has stretched from that average." };
const MS: Feature = { name: "Market structure · BOS and CHoCH", what: "A Break of Structure (BOS) confirms the trend continues: a new high in an uptrend, a new low in a downtrend. A Change of Character (CHoCH) is the first break against the trend, the first sign it may be turning." };
const EMA: Feature = { draw: "ema", name: "EMA cloud · 9 and 21", what: "Two exponential moving averages, 9 and 21 by default, with the space between them filled. Purple when the fast one is above, a bullish short-term trend; white when below. The lines can be shown alone, without the cloud. Off by default, one click in the settings." };
// The Break of Structure lines on the VP charts (standard and free).
const BOS_LINES = [[11, 55.3, 12.5, 2], [26, 52, 10, 2], [39.6, 61.4, 10.2, 2], [42, 50.6, 6, 2], [56, 63.6, 6, 2]];
const FVG: Feature = { draw: "fvg", name: "Fair Value Gaps", what: "Three candles where the middle one moved so fast that the first and third do not overlap. That empty zone is an imbalance: price often comes back to fill it before moving on." };

const INDICATORS: Indicator[] = [
    {
        id: "all-in-one",
        name: "Volume Profile + Footprint",
        edition: "All-in-One",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/allinone.jpg",
        line: "The whole read on one chart, from real order flow.",
        problem: "One chart instead of five. Context, structure, value and the real order flow behind each move, so you stop switching tools to decide where to enter.",
        text: "Market context, structure and entry timing together. The order flow comes from TradingView's footprint data: the real volume bought and sold at each price.",
        data: "real",
        features: [
            at(VP, [51.8, 33, 28.5, 57.5]),
            VWAP,
            EMA,
            at(LVN, [0, 36.5, 84, 4.6], [0, 75.4, 84, 5.7]),
            at(MS, [0, 30.5, 5.5, 3.5], [33.1, 66, 4.6, 3]),
            at(FVG, [40.5, 57.5, 8.6, 12.4]),
            { spots: [[39.8, 46.8, 5.2, 5.4], [8.3, 60.3, 4.2, 4.2], [40.8, 72.3, 4.6, 4.6], [44.5, 77.6, 4, 4]], name: "Delta bubbles", what: "Each bubble is the difference between what was bought at the ask and sold at the bid in a candle, taken from the real footprint. A large bubble at a level shows where one side pushed hard." },
            { spots: [[8.8, 60.5, 27, 7.2]], name: "CVD divergence", what: "Cumulative volume delta adds every candle's delta. When price makes a new high but CVD does not, buyers are no longer behind the move: a warning before the reversal." },
            { spots: [[37.1, 53, 6.4, 7.2]], name: "Absorption (A) and exhaustion (E)", what: "Absorption: heavy selling or buying hits a level and price does not move, someone large is absorbing it. Exhaustion: the push runs out of volume at the end of a move. Both are read from the real footprint." },
        ],
    },
    {
        id: "standard",
        name: "Volume Profile + VWAP",
        edition: "All-in-One",
        plan: "Every TradingView plan",
        price: 19,
        image: "/images/indicators/standard.jpg",
        line: "The same read, on any TradingView plan.",
        problem: "The full read without paying for TradingView Premium. For traders on any plan who want profile, structure, VWAP and an estimate of the order flow.",
        text: "Everything in Volume Profile + Footprint, with the order flow built from 1-minute data, the closest read to the footprint on any TradingView plan.",
        data: "estimated",
        features: [at(VP, [68, 42, 19, 41.5]), at(LVN, ...LVN_BANDS), at(VWAP, [21.5, 46.5, 44.5, 14.5]), at(MS, ...BOS_LINES), at(FVG, [60.3, 58.3, 5.6, 8.8]), at(EMA, [24.5, 44.5, 41.5, 17.5]), { spots: [[2.5, 42, 63, 42]], name: "1-minute order flow", what: "Buying and selling pressure rebuilt from the 1-minute data inside each candle: the closest read to the footprint without a Premium plan. It tracks the footprint closely, without the trade-by-trade split at the bid and the ask." }],
    },
    {
        id: "order-flow",
        name: "Order Flow CVD",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/orderflow.jpg",
        line: "Inside every candle.",
        problem: "Candles hide who pushed. This shows who was aggressive at each price, so you can tell a real move from one nobody is backing.",
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
        problem: "Where is the market fair, and where will it move fast? A free start to reading price through volume and structure.",
        text: "The base of the Alture read: the volume profile, the low-volume nodes price moves through quickly, the structure of the market and its Fair Value Gaps.",
        data: "none",
        features: [at(VP, [68, 42, 19, 41.5]), at(LVN, ...LVN_BANDS), at(MS, ...BOS_LINES), FVG],
    },
    {
        id: "trend-lines",
        name: "Trend Lines",
        plan: "Every TradingView plan",
        price: 0,
        image: "/images/indicators/trend.jpg",
        line: "The trend lines, drawn for you.",
        problem: "Hand-drawn lines are late, subjective and moved to fit the story. These are drawn the same way every time, on several timeframes.",
        text: "Lines drawn automatically from the swings of the market, on 5 minutes, 15 minutes, 1 hour, 4 hours and daily, each with its own colour and tag.",
        data: "none",
        features: [
            { spots: [[47.4, 44, 19.5, 10]], name: "Lines drawn from the swings", what: "Each line joins two swing highs that fall, or two swing lows that rise. No hand drawing, and no line moved to fit the story afterwards." },
            { spots: [[33, 41.8, 36, 5.4]], name: "Higher timeframes on the same chart", what: "5 minutes, 15 minutes, 1 hour, 4 hours and daily, each switched on or off. Only the chart's timeframe and the ones above it are drawn, so a 15-minute chart shows 15 minutes, 1 hour, 4 hours and daily." },
            { spots: [[65, 45.5, 5, 2.6], [65, 52.5, 5, 2.6]], name: "A tag on every line", what: "The timeframe is written at the end of each line, so you know at a glance whether you are looking at a 15-minute line or a 4-hour one." },
            { name: "Fewer, stronger lines", what: "One setting decides how big a swing must be. Raise it and only the major lines stay; lower it and the smaller ones appear." },
        ],
    },
    {
        id: "range",
        name: "Range",
        plan: "Every TradingView plan",
        price: 0,
        image: "/images/indicators/range.jpg",
        line: "Where the market is ranging, and when it breaks.",
        problem: "Most breakouts from a range fail. This frames the range and tells you whether a break held, was retested or failed.",
        text: "Finds the range from the swings, frames its high, middle and low, and follows what happens at the edges: the approach, the break, the retest or the failed break.",
        data: "none",
        features: [
            { spots: [[11.5, 41.8, 54.5, 20.8]], name: "The range, found from the swings", what: "A range is confirmed only when price has touched its top and its bottom enough times and held them for a few candles. While it is still forming, it is shown apart." },
            { spots: [[11.5, 41.8, 72, 3.4], [11.5, 50.8, 68, 2], [11.5, 61.2, 72, 3.4]], name: "High, middle and low", what: "The three levels of the range, each with its price. The top and bottom zones mark where the range has turned before." },
            { spots: [[34, 64.5, 13, 3.2]], name: "Breakout, retest, failed break", what: "A break counts only when candles close past a margin, not on a wick. After it, the indicator watches for the retest of the edge, or for price coming back inside: a failed break." },
            { name: "Several timeframes, or your own range", what: "Ranges of the chart's timeframe, and of 5 minutes, 15 minutes, 1 hour or 4 hours, read on closed candles. You can also enter a range by hand." },
            { name: "Alarms", what: "One TradingView alert covers it all: price approaching the high or the low, a break, a retest, a failed break. Each one can be switched off." },
        ],
    },
];

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

// The badge that tells the two order-flow sources apart at a glance.
// The data source, set in type alone: white for the real footprint, quieter for the 1-minute read.
const DataBadge = ({ data }: { data: Data }) =>
    data === "real" ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Real footprint data</span>
    ) : data === "estimated" ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">1-minute order flow</span>
    ) : null;

// The indicator's image with the chosen feature lit: the rest of the chart dims,
// the feature's zones are outlined. Features not drawn on this chart leave it whole.
const Spotlight = ({ item, feature, index }: { item: Indicator; feature: Feature; index: number }) => {
    const spots = feature.spots ?? [];
    return (
        <div className={`relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border ${item.data === "real" ? "border-white/40 shadow-[0_0_60px_-10px_rgba(255, 255, 255,0.35)]" : "border-white/10"}`}>
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
                    <rect key={`${feature.name}-${i}`} x={x} y={y * 1.25} width={w} height={h * 1.25} rx="0.8" fill="none" stroke="#FFFFFF" strokeWidth="0.35" className="spot-in" style={{ filter: "drop-shadow(0 0 1.2px rgba(255, 255, 255,0.9))" }} />
                ))}
            </svg>
            {spots.length > 0 && (
                <span key={feature.name} className="spot-in absolute right-3 top-3 max-w-[70%] truncate rounded-sm bg-black/80 px-2 py-1 text-[12px] text-white backdrop-blur">
                    {feature.name}
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
                        {item.edition && <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/45">{item.edition}</p>}
                        <p className={`${item.edition ? "mt-1.5" : "mt-5"} text-3xl md:text-[40px] md:leading-[1.1] font-medium tracking-tight text-white`}>{item.name}</p>
                        <p className="mt-3 font-logo text-xl font-light text-white/70">{item.line}</p>
                        <dl className="mt-7 grid gap-5 text-[14px] leading-relaxed sm:grid-cols-2">
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.14em] text-white/40">The problem</dt>
                                <dd className="mt-1.5 text-white/70">{item.problem}</dd>
                            </div>
                            <div>
                                <dt className="text-[10.5px] uppercase tracking-[0.14em] text-white/40">What it does</dt>
                                <dd className="mt-1.5 text-white/70">{item.text}</dd>
                            </div>
                        </dl>

                        <ol className="mt-9 border-t border-white/10" aria-label={`${item.name} features`}>
                            {item.features.map((f, i) => {
                                const active = open === i;
                                return (
                                    <li key={f.name} className="border-b border-white/10">
                                        <button type="button" aria-expanded={active} onClick={() => setOpen(i)} onMouseEnter={() => setOpen(i)} className="group grid w-full grid-cols-[2.25rem_1fr] items-baseline gap-3 py-3.5 text-left">
                                            <span className={`w-4 text-[13px] tabular-nums transition-colors ${active ? "text-white" : "text-white/30"}`}>{i + 1}</span>
                                            <span className={`text-[15px] transition-colors ${active ? "text-white" : "text-white/60 group-hover:text-white/90"}`}>{f.name}</span>
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
                            <p className="flex items-baseline">
                                <span className="font-logo text-4xl font-light tabular-nums text-white">{item.price ? `$${item.price}` : "Free"}</span>
                                {item.price > 0 && <span className="text-[15px] text-white/50">/month</span>}
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

// The two resolutions of the same read, side by side, with a switch that draws the difference.
const PRECISION = [
    { id: "minute", label: "1-Minute", price: 19, name: "Volume Profile + VWAP", text: "Minute-by-minute aggregated buying and selling pressure.", plan: "Available on every TradingView plan." },
    { id: "tick", label: "Tick-Level", price: 39, name: "Volume Profile + Footprint", text: "Individual trades at bid and ask, with trade-by-trade detail.", plan: "Requires TradingView Premium or Ultimate." },
] as const;

// A fixed, made-up half hour of trades, so the drawing is the same on every visit. It illustrates the two resolutions; it is not market data.
const TRADES = (() => {
    let seed = 11;
    const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const raw: { t: number; p: number; q: number; buy: boolean }[] = [];
    let price = 0, trend = 0;
    for (let i = 0; i < 420; i++) {
        if (i % 35 === 0) trend = (rand() - 0.45) * 0.5;
        const step = trend + (rand() - 0.5) * 1.4;
        price += step;
        raw.push({ t: (i / 420) * 30 + rand() * 0.06, p: price, q: 0.7 + Math.pow(rand(), 4) * 4.5, buy: step > 0 });
    }
    const lo = Math.min(...raw.map((x) => x.p)), hi = Math.max(...raw.map((x) => x.p));
    return raw.map((x) => ({ ...x, p: 12 + ((x.p - lo) / (hi - lo)) * 76 }));
})();
const MINUTES = Array.from({ length: 30 }, (_, m) => {
    const inside = TRADES.filter((x) => x.t >= m && x.t < m + 1);
    const net = inside.reduce((sum, x) => sum + (x.buy ? x.q : -x.q), 0);
    const close = inside.length ? inside[inside.length - 1].p : 50;
    return { m, net, close };
});

const PrecisionDemo = ({ mode }: { mode: "minute" | "tick" }) => {
    const W = 1000, H = 200, x = (t: number) => 12 + (t / 30) * (W - 24), y = (p: number) => H - 22 - (p / 100) * (H - 44);
    const maxNet = Math.max(...MINUTES.map((m) => Math.abs(m.net)));
    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={mode === "tick" ? "Each trade drawn on its own, at the bid or the ask" : "The same trades grouped into one bar per minute"}>
            <line x1="12" x2={W - 12} y1={H / 2} y2={H / 2} stroke="rgba(255,255,255,0.08)" />
            {mode === "minute"
                ? MINUTES.map((m) => {
                      const h = (Math.abs(m.net) / maxNet) * (H / 2 - 26);
                      const w = (W - 24) / 30 - 4;
                      return <rect key={m.m} x={x(m.m) + 2} width={w} y={m.net >= 0 ? H / 2 - h : H / 2} height={Math.max(1, h)} rx="1.5" fill={m.net >= 0 ? "#4DD0E1" : "#E955A8"} opacity="0.85" />;
                  })
                : TRADES.map((tr, i) => <circle key={i} cx={x(tr.t)} cy={y(tr.p)} r={1.5 + tr.q * 2.4} fill={tr.buy ? "#4DD0E1" : "#E955A8"} opacity="0.55" />)}
        </svg>
    );
};

const Compare = () => {
    const [mode, setMode] = useState<"minute" | "tick">("tick");
    return (
        <section className="bg-black !py-10 md:!py-16">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <p className={label}>Data resolution</p>
                <h2 className="text-[26px] md:text-[32px] md:leading-[1.1] font-medium tracking-tight text-white">Choose Your Level of Precision.</h2>
                <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
                    {PRECISION.map((o) => {
                        const on = mode === o.id;
                        return (
                            <button key={o.id} type="button" onClick={() => setMode(o.id)} aria-pressed={on} className={`flex flex-col bg-black px-6 py-5 text-left transition-colors md:px-8 md:py-6 ${on ? "bg-[#0b0c0e]" : "hover:bg-[#08090a]"}`}>
                                <span className="flex items-baseline justify-between gap-4">
                                    <span className={`text-[11px] uppercase tracking-[0.16em] transition-colors ${on ? "text-white" : "text-white/45"}`}>{o.label}</span>
                                    <span className="whitespace-nowrap">
                                        <span className="font-logo text-2xl font-light tabular-nums text-white">${o.price}</span>
                                        <span className="text-[13px] text-white/40">/month</span>
                                    </span>
                                </span>
                                <span className="mt-4 text-lg font-medium tracking-tight text-white md:text-xl">{o.name}</span>
                                <span className="mt-1.5 text-[14.5px] leading-relaxed text-white/65">{o.text}</span>
                                <span className="mt-2 text-[13px] text-white/40">{o.plan}</span>
                                <span aria-hidden="true" className={`mt-5 h-px w-full origin-left transition-transform duration-500 ${on ? "scale-x-100 bg-white/70" : "scale-x-0 bg-white/70"}`} />
                            </button>
                        );
                    })}
                </div>
                <div className="mt-5 rounded-2xl border border-white/10 bg-[#060708] p-5 md:px-8 md:py-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex rounded-full border border-white/15 p-1" role="tablist" aria-label="Data resolution">
                            {PRECISION.map((o) => (
                                <button key={o.id} type="button" role="tab" aria-selected={mode === o.id} onClick={() => setMode(o.id)} className={`rounded-full px-5 py-2 text-[13px] transition-colors ${mode === o.id ? "bg-white font-medium text-black" : "text-white/60 hover:text-white"}`}>
                                    {o.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-[13px] text-white/45">{mode === "tick" ? "Every trade on its own: buys at the ask, sells at the bid." : "The same trades, grouped into one bar of net pressure per minute."}</p>
                    </div>
                    <div className="mt-4"><PrecisionDemo mode={mode} /></div>
                    <p className="mt-3 flex gap-5 text-[12px] text-white/40">
                        <span><span className="text-[#4DD0E1]">Cyan</span> buying</span>
                        <span><span className="text-[#E955A8]">Pink</span> selling</span>
                    </p>
                </div>
            </div>
        </section>
    );
};

const IndicatorsExplorer = () => (
    <>
        <Compare />
        {INDICATORS.map((item, index) => (
            <Section key={item.id} item={item} index={index} />
        ))}
    </>
);

export default IndicatorsExplorer;
