"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// The four TradingView indicators. Prices match the pricing on the AltureLock page.
// Each feature can be clicked to read what it shows and how to use it.

type Data = "real" | "estimated" | "none";
type Feature = { name: string; what: string };
type Indicator = { id: string; name: string; plan: string; price: number; image: string; line: string; text: string; data: Data; features: Feature[] };

const VP: Feature = { name: "Volume Profile · POC, VAH, VAL", what: "How much volume traded at each price. The POC is the price with the most volume, where the market agreed the most. VAH and VAL frame the value area, where 70% of the volume traded. Price tends to return to value, or to move fast once it accepts outside it." };
const LVN: Feature = { name: "Low-volume nodes", what: "Prices where almost nothing traded. The market moved through them quickly, so it often does again: they act as gaps price crosses fast, and as targets on the other side." };
const VWAP: Feature = { name: "VWAP and its bands", what: "The average price paid today, weighted by volume. Above it, buyers are in control on average; below, sellers. The bands mark how far price has stretched from that average." };
const MS: Feature = { name: "Market structure · BOS and CHoCH", what: "A Break of Structure (BOS) confirms the trend continues: a new high in an uptrend, a new low in a downtrend. A Change of Character (CHoCH) is the first break against the trend, the first sign it may be turning." };
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
            VP,
            LVN,
            VWAP,
            MS,
            FVG,
            { name: "Delta bubbles", what: "Each bubble is the difference between what was bought at the ask and sold at the bid in a candle, taken from the real footprint. A large bubble at a level shows where one side pushed hard." },
            { name: "CVD divergence", what: "Cumulative volume delta adds every candle's delta. When price makes a new high but CVD does not, buyers are no longer behind the move: a warning before the reversal." },
            { name: "Absorption (A) and exhaustion (E)", what: "Absorption: heavy selling or buying hits a level and price does not move, someone large is absorbing it. Exhaustion: the push runs out of volume at the end of a move. Both are read from the real footprint." },
        ],
    },
    {
        id: "standard",
        name: "Volume Profile + VWAP",
        plan: "Every TradingView plan",
        price: 19,
        image: "/images/indicators/standard.jpg",
        line: "The same read, on any TradingView plan.",
        text: "Everything in Volume Profile + Footprint, with the order flow estimated from 1-minute candles instead of the footprint. It runs on any TradingView plan.",
        data: "estimated",
        features: [VP, LVN, VWAP, MS, FVG, { name: "Estimated order flow", what: "Buying and selling pressure worked out from the shape and volume of 1-minute candles. It follows the real flow closely most of the time, but it is an estimate: it cannot see what was actually traded at the bid and the ask." }],
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
            { name: "Bid × ask on the candles", what: "At each price inside the candle, the volume sold at the bid on the left and bought at the ask on the right. You see who was aggressive, and where." },
            { name: "Imbalances", what: "A price where one side traded several times more than the other diagonally. Stacked imbalances show a strong, one-sided push, and often become support or resistance." },
            { name: "CVD divergence", what: "When price and cumulative delta disagree, the move is not backed by aggressive volume. One of the clearest early signs of a turn." },
            { name: "Volume bubbles", what: "Bubbles sized by volume mark the prices where the largest amounts traded, so big participants stand out at a glance." },
            { name: "Numbers that adapt to the zoom", what: "Zoom out and the numbers simplify; zoom in and every price level shows. The chart stays readable at any scale." },
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
        features: [VP, LVN, MS, FVG],
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
            Estimated order flow
        </span>
    ) : null;

const Section = ({ item, index }: { item: Indicator; index: number }) => {
    const [open, setOpen] = useState(0);
    const feature = item.features[open];
    return (
        <section id={item.id} className="scroll-mt-20 bg-black !py-14 md:!py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid grid-cols-1 items-start gap-x-16 gap-y-10 lg:grid-cols-12">
                    <div className={`min-w-0 lg:col-span-6 lg:sticky lg:top-24 ${index % 2 ? "lg:order-2" : ""}`}>
                        <Image src={item.image} alt={`${item.name} on a TradingView chart`} width={1080} height={1350} className={`mx-auto w-full max-w-[480px] rounded-2xl border ${item.data === "real" ? "border-[#E3A1F7]/40 shadow-[0_0_60px_-10px_rgba(227,161,247,0.35)]" : "border-white/10"}`} />
                    </div>
                    <div className={`min-w-0 lg:col-span-6 ${index % 2 ? "lg:order-1" : ""}`}>
                        <div className="flex flex-wrap items-center gap-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{item.plan}</p>
                            <DataBadge data={item.data} />
                        </div>
                        <p className="mt-4 text-3xl md:text-[40px] md:leading-[1.1] font-medium tracking-tight text-white">{item.name}</p>
                        <p className="mt-4 font-logo text-xl font-light text-white/85">{item.line}</p>
                        <p className={`mt-5 ${body}`}>{item.text}</p>

                        <p className="mt-8 text-[11px] uppercase tracking-[0.14em] text-white/45">What it shows · click to read</p>
                        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label={`${item.name} features`}>
                            {item.features.map((f, i) => (
                                <button key={f.name} type="button" role="tab" aria-selected={open === i} onClick={() => setOpen(i)} className={`rounded-sm border px-3 py-1.5 text-[13px] transition-all ${open === i ? "border-white bg-white text-black lit" : "border-white/20 text-white/75 hover:border-white/50 hover:text-white"}`}>
                                    {f.name}
                                </button>
                            ))}
                        </div>
                        <div key={feature.name} role="tabpanel" className="cockpit-rise mt-4 min-h-[8.5rem] border-l-2 border-[#E3A1F7]/70 bg-white/[0.03] px-5 py-4">
                            <p className="text-[15px] font-medium text-white">{feature.name}</p>
                            <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{feature.what}</p>
                        </div>

                        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
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

// Real against estimated order flow: why two volume-profile indicators cost differently.
const Compare = () => (
    <section className="bg-black !py-10 md:!py-14">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <p className={label}>Real or estimated</p>
            <h2 className="max-w-[22ch] text-3xl md:text-[40px] md:leading-[1.1] font-medium tracking-tight text-white">Why one costs $39 and the other $19.</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-sm border border-[#E3A1F7]/50 bg-[#E3A1F7]/[0.04] p-6 md:p-8 shadow-[0_0_70px_-20px_rgba(227,161,247,0.45)]">
                    <DataBadge data="real" />
                    <p className="mt-5 text-xl font-medium text-white">Volume Profile + Footprint · $39</p>
                    <p className={`mt-3 ${body}`}>Reads TradingView&apos;s footprint: every trade, at every price, split between what was bought at the ask and sold at the bid. Delta, absorption and exhaustion are what really traded.</p>
                    <p className="mt-5 text-sm text-white/45">Needs TradingView Premium or Ultimate, which provide the footprint.</p>
                </div>
                <div className="rounded-sm border border-dashed border-white/20 p-6 md:p-8">
                    <DataBadge data="estimated" />
                    <p className="mt-5 text-xl font-medium text-white">Volume Profile + VWAP · $19</p>
                    <p className={`mt-3 ${body}`}>Works out buying and selling pressure from 1-minute candles. Close to the real flow most of the time, but an estimate: it cannot see the trades at the bid and the ask themselves.</p>
                    <p className="mt-5 text-sm text-white/45">Runs on every TradingView plan, including the free one.</p>
                </div>
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
