import { Metadata } from "next";
import Link from "next/link";
import IndicatorsExplorer from "./indicators-explorer";

export const metadata: Metadata = {
    title: "Indicators | Alture & Co.",
    description: "The Alture & Co. TradingView indicators: Volume Profile + Footprint, Volume Profile + VWAP, Order Flow CVD, and Volume Profile + FVG + MS.",
};

// Anchors for the four indicators, in page order (the sections live in IndicatorsExplorer).
const LINKS = [
    { id: "all-in-one", name: "Volume Profile + Footprint" },
    { id: "standard", name: "Volume Profile + VWAP" },
    { id: "order-flow", name: "Order Flow CVD" },
    { id: "volume-profile", name: "Volume Profile + FVG + MS" },
];

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

const IndicatorsPage = () => (
    <div className="bg-black">
        <section className="bg-black !pt-32 md:!pt-40 !pb-12 md:!pb-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <p className={label}>TradingView indicators</p>
                <h1 className="font-logo !font-extralight !tracking-[-0.02em] !text-5xl sm:!text-6xl lg:!text-[80px] !leading-[0.95] text-white">
                    Alture <span className="font-normal">Indicators</span>
                </h1>
                <p className={`mt-7 max-w-xl ${body}`}>Four indicators for TradingView, built on volume and order flow. They run directly on your own charts.</p>
                <nav className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm" aria-label="Indicators">
                    {LINKS.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="border-b border-white/25 pb-0.5 text-white/75 transition-colors hover:border-white hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </section>

        <IndicatorsExplorer />

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
