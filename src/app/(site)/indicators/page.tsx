import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Indicators | Alture & Co.",
    description: "The Alture & Co. TradingView indicators: Volume Profile + Footprint, Volume Profile + VWAP, Order Flow CVD, and Volume Profile + FVG + MS.",
};

// The four TradingView indicators. Prices match the pricing on the AltureLock page.
const INDICATORS = [
    {
        id: "all-in-one",
        name: "Volume Profile + Footprint",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/allinone.jpg",
        line: "The whole read on one chart, from real order flow.",
        text: "Market context, structure and entry timing together, with order flow taken from TradingView's real footprint data rather than estimated.",
        items: ["Volume Profile with POC, VAH and VAL", "Low-volume nodes", "VWAP and its bands", "Break of Structure and Change of Character", "Fair Value Gaps", "Delta bubbles, CVD divergence, absorption (A) and exhaustion (E)"],
    },
    {
        id: "standard",
        name: "Volume Profile + VWAP",
        plan: "Every TradingView plan",
        price: 19,
        image: "/images/indicators/standard.jpg",
        line: "The same read, on any TradingView plan.",
        text: "Everything in Volume Profile + Footprint, with order flow estimated from 1-minute candles instead of the footprint, so it runs without a Premium plan.",
        items: ["Volume Profile with POC, VAH and VAL", "Low-volume nodes", "VWAP and its bands", "Market structure", "Fair Value Gaps", "Order flow estimated from 1-minute candles"],
    },
    {
        id: "order-flow",
        name: "Order Flow CVD",
        plan: "TradingView Premium or Ultimate",
        price: 39,
        image: "/images/indicators/orderflow.jpg",
        line: "Inside every candle.",
        text: "What was sold at the bid and bought at the ask, at every price. Made for traders who read the tape, not the structure.",
        items: ["Bid × ask on the candles", "Imbalances", "CVD divergence", "Volume bubbles", "Numbers that adapt to the zoom"],
    },
    {
        id: "volume-profile",
        name: "Volume Profile + FVG + MS",
        plan: "Every TradingView plan",
        price: 0,
        image: "/images/indicators/vpms.jpg",
        line: "Where volume traded, and where it did not.",
        text: "The base of the Alture read: the volume profile, the low-volume nodes price moves through quickly, the structure of the market and its Fair Value Gaps.",
        items: ["Volume Profile with POC, VAH and VAL", "Low-volume nodes", "Market structure", "Fair Value Gaps"],
    },
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
                    {INDICATORS.map((item) => (
                        <a key={item.id} href={`#${item.id}`} className="border-b border-white/25 pb-0.5 text-white/75 transition-colors hover:border-white hover:text-white">
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>
        </section>

        {INDICATORS.map((item, index) => (
            <section key={item.id} id={item.id} className="scroll-mt-20 bg-black !py-14 md:!py-20">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-12">
                        <div className={`min-w-0 lg:col-span-6 ${index % 2 ? "lg:order-2" : ""}`}>
                            <Image src={item.image} alt={`${item.name} on a TradingView chart`} width={1080} height={1350} className="mx-auto w-full max-w-[480px] rounded-2xl border border-white/10" />
                        </div>
                        <div className={`min-w-0 lg:col-span-6 ${index % 2 ? "lg:order-1" : ""}`}>
                            <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">{item.plan}</p>
                            <p className="mt-4 text-3xl md:text-[40px] md:leading-[1.1] font-medium tracking-tight text-white">{item.name}</p>
                            <p className="mt-4 font-logo text-xl font-light text-white/85">{item.line}</p>
                            <p className={`mt-5 ${body}`}>{item.text}</p>
                            <ul className="mt-7 space-y-2.5 text-[15px] text-white/75">
                                {item.items.map((point) => (
                                    <li key={point} className="flex gap-3">
                                        <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
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
        ))}

        <section className="bg-black !pt-14 md:!pt-20 !pb-24 md:!pb-32">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-6 border-t border-white/10 pt-12">
                    <div>
                        <p className="text-2xl md:text-3xl font-medium tracking-tight text-white">Both premium indicators are included in AltureLock.</p>
                        <p className="mt-2 text-sm text-white/55">With the Terminal and the Journal, from $79 / month for the first 50 members.</p>
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
