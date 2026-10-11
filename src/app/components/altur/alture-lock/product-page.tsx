"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductScreen from "./product-screen";
import IndicatorFigure from "./indicator-figure";
import JournalDemo from "@/app/components/altur/journal/journal-demo";
import { useLanguage } from "@/app/i18n/language-context";
import { useSession } from "@/utils/use-session";
import { ENTER_KEY } from "@/utils/enter-flag";
import { DEMO_OPEN } from "@/utils/launch";

const STEPS = [
    { title: "You define the rules", text: "Risk per trade, stop distance, sessions, loss limits, entry confirmations." },
    { title: "AltureLock locks them", text: "Every order passes the checklist first." },
    { title: "You execute. It monitors.", text: "Open trades are watched against your rules, and every result is recorded." },
];

const FEATURES = [
    { title: "Pre-trade checklist", text: "A sequential checklist before every entry. No step skipped, no shortcuts." },
    { title: "Live monitoring", text: "Open trades are watched against the exit rules you set beforehand." },
    { title: "Account-level limits", text: "Risk limits are enforced on the account itself, not left on paper." },
    { title: "Automatic position sizing", text: "Size is calculated from your risk percent and your stop distance." },
    { title: "A journal that tells the truth", text: "See whether a loss came from the strategy, or from not following it." },
    { title: "Results in R", text: "Performance is measured in R multiples, not only in dollars won or lost." },
];

// What the ALTURE & CO All-in-One indicator draws.
const INDICATOR = ["Volume Profile: a histogram beside the chart showing where volume is concentrated at each price, with the Point of Control (POC), the Value Area High and Low (VAH, VAL), and high and low volume nodes (HVN, LVN)", "VWAP with its bands", "EMA Cloud", "Market Structure, including BOS and CHoCH, with higher-timeframe context", "Fair Value Gaps", "An on-chart checklist from direction to entry"];

const TOOLS = [
    ["Watchlist", "Your instruments with live prices, in your own order."],
    ["Chart", "Candles, live order flow, and TradingView's drawing tools when you need them."],
    ["News and briefing", "Crypto and macro headlines from their publishers, with an AI briefing of what matters."],
    ["Economic calendar", "High-importance events, and the Asia, London, Paris and New York sessions."],
    ["Your own limits", "Set how many trades or losses end your day, and be told when you are there."],
];

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const heading = "!text-3xl md:!text-[40px] md:!leading-[1.1] text-white";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

// A real capture of the product. On a phone a wide desktop capture is not
// shrunk to nothing: it keeps a readable size and scrolls sideways.
const Shot = ({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: string }) => (
    <figure>
        <div className="overflow-x-auto rounded-sm border border-white/15">
            <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 640px, 680px" className="block h-auto w-full min-w-[620px] lg:min-w-0" />
        </div>
        <figcaption className="mt-3 text-xs text-white/40">
            {caption}
            <span className="lg:hidden"> Desktop view: swipe sideways to see all of it.</span>
        </figcaption>
    </figure>
);

const ProductPage = () => {
    const { t } = useLanguage();
    const session = useSession();
    const copy = t.entry;

    const router = useRouter();
    const [leaving, setLeaving] = useState(false);

    // Entering the product: this page gives way, and the terminal opens with its short arrival.
    const enter = (event: React.MouseEvent) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        try {
            window.sessionStorage.setItem(ENTER_KEY, "1");
        } catch {
            // Without storage the terminal simply opens directly.
        }
        event.preventDefault();
        setLeaving(true);
        window.setTimeout(() => router.push("/alturelock/demo"), 420);
    };

    const primary = "group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8] lit";
    // While the demo is closed nothing here leads into it: the first button reads on, the last one asks for access.
    const explore = (place: "top" | "bottom", extra = "") =>
        session.signedIn === true ? (
            <Link href="/alturelock/workspace" className={`group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8] lit ${extra}`}>
                {copy.enter}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        ) : DEMO_OPEN ? (
            <Link
                href="/alturelock/demo"
                onClick={enter}
                className={`group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8] lit ${extra}`}
            >
                {copy.explore}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        ) : place === "top" ? (
            <a
                href="#how-it-works"
                onClick={(event) => {
                    event.preventDefault();
                    document.getElementById("how-it-works")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                }}
                className={`${primary} ${extra}`}
            >
                {copy.explore}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </a>
        ) : (
            <Link href="/#contact" className={`${primary} ${extra}`}>
                Request access
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        );

    return (
        <div className={`transition-opacity duration-[420ms] ease-out ${leaving ? "opacity-0" : ""}`}>
            {/* What it is */}
            <section className="bg-black !pt-32 md:!pt-40 !pb-16 md:!pb-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid items-center gap-x-10 gap-y-14 lg:grid-cols-12">
                        <div className="lg:col-span-6">
                            <h1 className="font-logo !font-extralight !tracking-[-0.02em] !text-6xl sm:!text-7xl lg:!text-[96px] !leading-[0.95] text-white">
                                Alture<span className="font-normal">Lock</span>
                            </h1>
                            <p className="mt-7 text-2xl md:text-3xl font-medium tracking-tight text-white">{copy.headline}</p>
                            <p className="mt-3 font-logo text-lg md:text-xl font-light text-white/80">{copy.pillars}</p>
                            <p className={`mt-5 max-w-md ${body}`}>{copy.text}</p>
                            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                                {explore("top")}
                                {session.signedIn === false && (
                                    <Link href="/alturelock/login" className="border-b border-white/25 pb-0.5 text-sm text-white/70 transition-colors hover:border-white hover:text-white">
                                        {t.mobile.logIn}
                                    </Link>
                                )}
                            </div>
                            {DEMO_OPEN && session.signedIn === false && <p className="mt-5 text-xs text-white/40">{copy.note}</p>}
                        </div>
                        <div className="lg:col-span-6 lg:-mr-16 xl:-mr-40">
                            <ProductScreen caption={copy.previewCaption} leaving={leaving} />
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="scroll-mt-16 bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <p className={label}>How it works</p>
                    <h2 className={`${heading} max-w-[16ch]`}>Your trading. Your rules. One system.</h2>
                    <p className={`mt-6 max-w-xl ${body}`}>Experience does not stop a broken rule. AltureLock does: you set your rules once, and it enforces them on every trade.</p>
                    <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-3">
                        {STEPS.map((step) => (
                            <div key={step.title}>
                                <p className="text-xl md:text-2xl font-medium tracking-tight text-white">{step.title}</p>
                                <p className={`mt-3 ${body}`}>{step.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The trading system */}
            <section className="bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid grid-cols-1 items-center gap-x-14 gap-y-10 lg:grid-cols-12">
                        <div className="min-w-0 lg:col-span-5">
                            <p className={label}>The trading system</p>
                            <h2 className={heading}>Plan the trade before you take it.</h2>
                            <p className={`mt-6 ${body}`}>Choose the market and the direction, then place your entry, stop loss and take profit on the chart. Your position size is worked out from the amount you are prepared to lose, and the trade is ready only when your own checks are confirmed.</p>
                            <p className={`mt-4 ${body}`}>Once you are in, the cockpit keeps the plan in front of you until the trade is closed and reviewed.</p>
                        </div>
                        <div className="min-w-0 lg:col-span-7">
                            <Shot src="/images/alturelock/planner.jpg" alt="The AltureLock trade planner: a candle chart with entry, stop loss and take profit levels, and the order ticket beside it" width={1232} height={800} caption="The planner, from the guided demo. Simulated prices." />
                        </div>
                    </div>
                </div>
            </section>

            {/* The indicator */}
            <section className="bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid grid-cols-1 items-start gap-x-14 gap-y-10 lg:grid-cols-12">
                        <div className="min-w-0 lg:col-span-7 lg:order-1 order-2">
                            <IndicatorFigure />
                        </div>
                        <div className="min-w-0 lg:col-span-5 lg:order-2 order-1">
                            <p className={`${label} !mb-2`}>The Alture Indicator</p>
                            <p className="mb-5 text-sm text-white/55">Alture &amp; Co. has three published indicators on TradingView.</p>
                            <h2 className={heading}>One indicator for the whole read.</h2>
                            <p className={`mt-6 ${body}`}>ALTURE &amp; CO All-in-One is our TradingView indicator. It puts the context, the setup and the entry timing on a single chart:</p>
                            <ul className="mt-5 space-y-2.5 text-[15px] text-white/75">
                                {INDICATOR.map((item) => (
                                    <li key={item} className="flex gap-3">
                                        <span className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm leading-relaxed text-white/45">The indicator runs inside TradingView. Separately, in the AltureLock terminal, the order flow view shows aggressive volume from live exchange trades.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The journal */}
            <section id="journal" className="scroll-mt-16 bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="mb-10 md:mb-14 grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-6">
                            <p className={label}>The Trading Journal</p>
                            <h2 className={heading}>A journal that tells the truth.</h2>
                        </div>
                        <p className={`lg:col-span-6 ${body}`}>Every closed trade is recorded with its result, its setup and whether you followed your rules. Open one and you see it on the candles of that day, with your entry and exit marked. Try it below: click a day, hover the curve, open a trade.</p>
                    </div>
                    <p className="mb-6 border-l-2 border-[#FACC15] pl-4 text-sm text-white/70">Sample trades, not a real account.</p>
                    <JournalDemo />
                </div>
            </section>

            {/* Integrated tools */}
            <section className="bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <p className={label}>Integrated tools</p>
                    <h2 className={`${heading} max-w-[18ch]`}>Everything you read before a trade, in one terminal.</h2>
                    <dl className="mt-12 grid gap-x-12 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                        {TOOLS.map(([title, text]) => (
                            <div key={title}>
                                <dt className="text-lg font-medium tracking-tight text-white">{title}</dt>
                                <dd className={`mt-2 ${body}`}>{text}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </section>

            {/* What it does */}
            <section className="bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <p className={label}>What it does</p>
                            <h2 className={`${heading} max-w-[12ch]`}>Discipline, built into the trade.</h2>
                        </div>
                        <dl className="lg:col-span-7 grid gap-x-12 gap-y-8 sm:grid-cols-2">
                            {FEATURES.map((feature) => (
                                <div key={feature.title}>
                                    <dt className="text-lg font-medium tracking-tight text-white">{feature.title}</dt>
                                    <dd className={`mt-2 ${body}`}>{feature.text}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

            {/* Who it is for */}
            <section className="bg-black !pt-16 md:!pt-24 !pb-24 md:!pb-32">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <p className={label}>Who it is for</p>
                    <h2 className={`${heading} max-w-[18ch]`}>Built for traders who already know how to trade.</h2>
                    <div className="mt-10 grid gap-x-14 gap-y-8 lg:grid-cols-12">
                        <div className={`lg:col-span-7 grid gap-x-10 gap-y-5 sm:grid-cols-2 ${body}`}>
                            <p>Experienced, profitable traders rarely lose to a bad strategy. They lose to a broken rule: a trade that should have been closed and wasn&apos;t.</p>
                            <p>On leverage, a short delay in cutting a trade becomes a large loss. Not because you don&apos;t know better, but because under pressure everyone is human.</p>
                        </div>
                        <p className="lg:col-span-5 font-logo text-2xl md:text-[28px] font-light leading-snug text-white">AltureLock closes that gap. Once a setup is invalidated, there is no negotiating with it.</p>
                    </div>

                    <div className="mt-16 md:mt-24 flex flex-wrap items-center justify-between gap-x-10 gap-y-6">
                        <div>
                            <p className="text-2xl md:text-3xl font-medium tracking-tight text-white">Trade with your rules locked in.</p>
                            <p className="mt-2 text-sm text-white/55">
                                AltureLock is offered by request.
                                {DEMO_OPEN && (
                                    <>
                                        {" "}
                                        <Link href="/#contact" className="border-b border-white/30 text-white hover:border-white">
                                            Request access
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>
                        {explore("bottom")}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductPage;
