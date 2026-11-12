import { Metadata } from "next";
import Link from "next/link";
import TiltScreen from "./tilt-screen";
import IndicatorsExplorer from "./indicators-explorer";

export const metadata: Metadata = {
    title: "Indicators | Alture & Co.",
    description: "The Alture & Co. TradingView indicators: Volume Profile + Footprint, Volume Profile + VWAP, Order Flow CVD, Volume Profile + FVG + MS, Trend Lines and Range.",
};

// Anchors for the six indicators, in page order (the sections live in IndicatorsExplorer).
const LINKS = [
    { id: "all-in-one", name: "Volume Profile + Footprint" },
    { id: "standard", name: "Volume Profile + VWAP" },
    { id: "order-flow", name: "Order Flow CVD" },
    { id: "volume-profile", name: "Volume Profile + FVG + MS" },
    { id: "trend-lines", name: "Trend Lines" },
    { id: "range", name: "Range" },
];

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

const IndicatorsPage = () => (
    <div className="bg-black">
        <section className="bg-black !pt-32 md:!pt-40 !pb-12 md:!pb-20">
            <div className="container mx-auto grid max-w-7xl gap-12 px-4 md:px-6 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-5">
                <p className={label}>TradingView indicators</p>
                <h1 className="font-logo !font-extralight !tracking-[-0.02em] !text-5xl sm:!text-6xl lg:!text-[80px] !leading-[0.95] text-white">
                    Alture <span className="font-normal">Indicators</span>
                </h1>
                <p className={`mt-7 max-w-xl ${body}`}>Six indicators for TradingView, built on volume, order flow and the structure of price. They run directly on your own charts.</p>
                <nav className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm" aria-label="Indicators">
                    {LINKS.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="border-b border-white/25 pb-0.5 text-white/75 transition-colors hover:border-white hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>
                </div>
                <figure className="lg:col-span-7">
                    <TiltScreen src="/images/alturelock/indicator-footprint.jpg" alt="Volume Profile + Footprint by Alture & Co on a TradingView chart: Alture candles, volume profile, footprint bubbles and absorption marks" width={1600} height={900} />
                    <figcaption className="mt-3 text-xs text-white/40">Volume Profile + Footprint · Alture & Co, on TradingView.</figcaption>
                </figure>
            </div>
        </section>

        <IndicatorsExplorer />

        {/* How the six fit together: one base, then what to add */}
        <section className="bg-black !py-14 md:!py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <p className={label}>How they fit together</p>
                <h2 className="font-logo !text-[36px] md:!text-[52px] !font-extralight !leading-[1.05] !tracking-[-0.02em] text-white">One base. Then what you need.</h2>
                <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 lg:grid-cols-3">
                    <div className="bg-black p-6 md:p-7">
                        <p className="font-sans font-medium text-[12px] text-[#4DD0E1]">1 · Choose one base</p>
                        <ul className="mt-5 space-y-4 text-[14px]">
                            <li><a href="#volume-profile" className="text-white hover:underline">Volume Profile + FVG + MS</a><span className="block text-white/50">Free. Profile, low-volume nodes, structure, FVG.</span></li>
                            <li><a href="#standard" className="text-white hover:underline">Volume Profile + VWAP</a><span className="block text-white/50">$19. Everything in the free one, plus VWAP, EMA cloud and 1-minute order flow.</span></li>
                            <li><a href="#all-in-one" className="text-white hover:underline">Volume Profile + Footprint</a><span className="block text-white/50">$39. The same read with the real footprint. TradingView Premium or Ultimate.</span></li>
                        </ul>
                        <p className="mt-5 text-[12.5px] text-white/40">Each base contains the one above it, so you only need one.</p>
                    </div>
                    <div className="bg-black p-6 md:p-7">
                        <p className="font-sans font-medium text-[12px] text-[#4DD0E1]">2 · Add the tape</p>
                        <ul className="mt-5 space-y-4 text-[14px]">
                            <li><a href="#order-flow" className="text-white hover:underline">Order Flow CVD</a><span className="block text-white/50">$39. Bid × ask inside each candle, imbalances, CVD. TradingView Premium or Ultimate. No profile or structure, so it sits beside any base.</span></li>
                        </ul>
                        <p className="mt-5 text-[12.5px] text-white/40">Volume Profile + Footprint and Order Flow CVD are the pair included in AltureLock.</p>
                    </div>
                    <div className="bg-black p-6 md:p-7">
                        <p className="font-sans font-medium text-[12px] text-[#4DD0E1]">3 · Add the lines</p>
                        <ul className="mt-5 space-y-4 text-[14px]">
                            <li><a href="#trend-lines" className="text-white hover:underline">Trend Lines</a><span className="block text-white/50">Free. Lines from the swings, on several timeframes.</span></li>
                            <li><a href="#range" className="text-white hover:underline">Range</a><span className="block text-white/50">Free. The range, its break, retest or failure, with alerts.</span></li>
                        </ul>
                        <p className="mt-5 text-[12.5px] text-white/40">Both work on every TradingView plan, with or without a base.</p>
                    </div>
                </div>
                <p className="mt-5 text-xs text-white/40">TradingView limits how many indicators fit on one chart depending on your TradingView plan.</p>
            </div>
        </section>

        {/* How access works */}
        <section className="bg-black !py-14 md:!py-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <p className={label}>How access works</p>
                <ol className="grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 md:grid-cols-3">
                    {[
                        ["Request access", "Choose an indicator and send us your TradingView username."],
                        ["Accept the invitation", "We add your username to the indicator. It appears in your TradingView account, under Invite-only scripts."],
                        ["Add it to your chart", "Open any chart, add the indicator and set it once. It stays on your own TradingView."],
                    ].map(([h, t], i) => (
                        <li key={h} className="bg-black p-6 md:p-7">
                            <span className="font-sans font-medium text-[13px] tabular-nums text-white/35">{i + 1}</span>
                            <p className="mt-3 text-[16px] text-white">{h}</p>
                            <p className="mt-2 text-[14px] leading-relaxed text-white/50">{t}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>

        <section className="bg-black !pt-14 md:!pt-20 !pb-24 md:!pb-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-white/10 pt-12">
                    <div>
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-white">Both premium indicators are included in AltureLock.</p>
                        <p className="mt-2 text-sm text-white/55">With the Terminal and the Journal.</p>
                    </div>
                    <Link href="/alturelock#pricing" className="group inline-flex items-center gap-3 rounded-sm border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-white">
                        See AltureLock
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>
                <p className="mt-10 text-xs leading-relaxed text-white/40">Prices in US dollars. The indicators run on TradingView and are delivered by invitation to your TradingView username. They are analysis tools, not trading advice. Charts shown are historical.</p>
            </div>
        </section>
    </div>
);

export default IndicatorsPage;
