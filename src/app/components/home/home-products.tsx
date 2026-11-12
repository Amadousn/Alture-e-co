"use client";

// The homepage's product showcase: AltureLock, the Trading Journal and Alture
// Education, each with a real preview of the product, then a compact price
// overview and what the firm stands for. Every figure and claim matches what
// the products do today.

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import JournalDemo from "@/app/components/altur/journal/journal-demo";
import CandleExercise from "@/app/components/altur/education/candle-exercise";
import { MODULES } from "@/app/components/altur/education/programme-data";
import { PLANS } from "@/app/components/altur/alture-lock/product-page";

const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const title = "font-logo !text-[44px] md:!text-[72px] !font-extralight !leading-[0.98] !tracking-[-0.02em] text-white";
const lead = "text-[15px] md:text-[17px] leading-relaxed text-white/65";

const Cta = ({ href, children, solid = true }: { href: string; children: React.ReactNode; solid?: boolean }) => (
    <Link href={href} className={`group inline-flex items-center gap-3 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors ${solid ? "bg-white text-black hover:bg-[#e4e4e8]" : "border border-white/25 text-white hover:border-white"}`}>
        {children}
        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
);

const Features = ({ items }: { items: string[] }) => (
    <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2">
        {items.map((x) => (
            <li key={x} className="flex items-center gap-3 bg-black px-4 py-3.5 text-[14px] text-white/80">
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#4DD0E1]" />
                {x}
            </li>
        ))}
    </ul>
);

const Index = ({ n, name }: { n: string; name: string }) => (
    <div className="flex items-baseline gap-4 border-t border-white/15 pt-5">
        <span className="font-sans font-medium text-[12px] tabular-nums text-[#4DD0E1]">{n}</span>
        <span className={label}>{name}</span>
    </div>
);

// ---------- 01 AltureLock: the terminal, two real views ----------

const VIEWS = [
    { id: "terminal", name: "Terminal", src: "/images/alturelock/cockpit.jpg", caption: "The terminal: chart, rules, alarms and the market in one screen." },
    { id: "exit", name: "Exit signal", src: "/images/alturelock/alarm-exit.jpg", caption: "An exit alarm on a clear break of structure, on real Bitcoin candles." },
    { id: "plan", name: "Pre-trade plan", src: "/images/alturelock/planner.jpg", caption: "The checklist and position size, before the entry." },
] as const;

const AltureLock = () => {
    const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("terminal");
    const v = VIEWS.find((x) => x.id === view)!;
    return (
        <section className="bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Index n="01" name="AltureLock" />
                <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <h2 className={title}>
                            Alture<span className="font-normal">Lock</span>
                        </h2>
                        <p className={`mt-6 ${lead}`}>A structured trading workflow to prepare, execute, manage and review your trades.</p>
                        <Features items={["Trading terminal", "Rules and pre-trade checklists", "Trade monitoring and alerts", "Trading journal", "Performance analytics", "Premium indicators"]} />
                        <p className="mt-5 text-[13px] leading-relaxed text-white/45">Read-only. AltureLock never places a trade, moves funds or withdraws. It reads, checks and alerts.</p>
                        <div className="mt-8">
                            <Cta href="/alturelock">Explore AltureLock</Cta>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <div role="tablist" aria-label="AltureLock views" className="mb-3 flex gap-1 text-[12.5px]">
                            {VIEWS.map((x) => (
                                <button key={x.id} type="button" role="tab" aria-selected={x.id === view} onClick={() => setView(x.id)} className={`rounded-full px-3.5 py-1.5 transition-colors ${x.id === view ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>
                                    {x.name}
                                </button>
                            ))}
                        </div>
                        <figure>
                            <div className="overflow-hidden rounded-[10px] border border-white/15">
                                <Image key={v.id} src={v.src} alt={v.caption} width={2000} height={1250} sizes="(min-width: 1024px) 720px, 100vw" className="block h-auto w-full" style={{ animation: "hp-in .4s both" }} />
                            </div>
                            <figcaption className="mt-3 text-xs text-white/40">{v.caption}</figcaption>
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ---------- 02 Trading Journal: the real journal, sample trades ----------

const Journal = () => (
    <section className="bg-black !py-16 md:!py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <Index n="02" name="Trading Journal" />
            <div className="mt-10 grid gap-x-14 gap-y-6 lg:grid-cols-12 lg:items-end">
                <h2 className={`lg:col-span-6 ${title}`}>Trading Journal</h2>
                <div className="lg:col-span-6">
                    <p className={lead}>Record your trades, understand your performance and review your trading decisions.</p>
                    <p className="mt-3 text-[13.5px] text-white/45">P&amp;L calendar · weekly and monthly totals · the day opened · Alture Score · analytics by strategy and session</p>
                </div>
            </div>
            <div className="relative mt-10">
                <p className="mb-3 border-l-2 border-[#FACC15] pl-4 text-[13px] text-white/65">The real journal with demonstration data. Click a day.</p>
                <div className="relative max-h-[640px] overflow-hidden">
                    <JournalDemo framed />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
                </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Cta href="/journal">Explore the Journal</Cta>
                <span className="text-[13px] text-white/45">Free to start. The full journal is ${PLANS.find((p) => p.name === "Journal")!.monthly} a month.</span>
            </div>
        </div>
    </section>
);

// ---------- 03 Education: a real exercise from the Introduction ----------

const Education = () => {
    return (
        <section className="bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Index n="03" name="Alture Education" />
                <div className="mt-10 grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <h2 className={title}>Education</h2>
                        <p className={`mt-6 ${lead}`}>Structured trading education focused on market analysis, strategy development, execution and risk management.</p>
                        <ol className="mt-8 border-t border-white/10">
                            {MODULES.map((m, i) => (
                                <li key={m.title} className="flex items-baseline gap-4 border-b border-white/10 py-2.5 text-[14px] text-white/70">
                                    <span className="font-sans font-medium text-[12px] tabular-nums text-white/35">{String(i + 1).padStart(2, "0")}</span>
                                    {m.title}
                                </li>
                            ))}
                        </ol>
                        <div className="mt-8">
                            <Cta href="/education">Explore Education</Cta>
                        </div>
                    </div>
                    <div className="lg:col-span-7">
                        <CandleExercise />
                    </div>
                </div>
            </div>
        </section>
    );
};

// ---------- Prices, in one compact list ----------

const Prices = () => {
    const by = (n: string) => PLANS.find((p) => p.name === n)!;
    const rows: { group: string; name: string; price: string; per: string; text: string; href: string }[] = [
        { group: "Software", name: "Free Journal", price: "$0", per: "/month", text: by("Free").text, href: "/journal#pricing" },
        { group: "Software", name: "Trading Journal", price: `$${by("Journal").monthly}`, per: "/month", text: by("Journal").text, href: "/journal#pricing" },
        { group: "Software", name: "Terminal", price: `$${by("Terminal").monthly}`, per: "/month", text: by("Terminal").text, href: "/alturelock#pricing" },
        { group: "Software", name: "AltureLock", price: `$${by("AltureLock").monthly}`, per: "/month", text: by("AltureLock").text, href: "/alturelock#pricing" },
        { group: "Education", name: "Alture Education", price: "$1,249", per: "one-time", text: "Seven modules, two trade sessions a month, the private community and events.", href: "/education" },
    ];
    return (
        <section className="bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Index n="04" name="Prices" />
                <h2 className="mt-10 font-logo !text-[36px] md:!text-[52px] !font-extralight !leading-[1.05] text-white">Prices, at a glance.</h2>
                <ul className="mt-10 border-t border-white/15">
                    {rows.map((r, i) => (
                        <li key={r.name}>
                            {(i === 0 || rows[i - 1].group !== r.group) && <p className={`${i ? "mt-10" : "mt-6"} mb-1 text-[11px] uppercase tracking-[0.14em] text-white/40 md:px-2`}>{r.group === "Software" ? "Software · monthly" : "Education · one-time"}</p>}
                            <Link href={r.href} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-white/15 py-6 transition-colors hover:bg-white/[0.025] md:grid-cols-[14rem_10rem_1fr_auto] md:px-2">
                                <span className="text-[18px] text-white">{r.name}</span>
                                <span className="text-right md:text-left">
                                    <span className="font-logo text-[26px] font-extralight tabular-nums text-white">{r.price}</span>
                                    <span className="ml-1.5 text-[12px] text-white/40">{r.per}</span>
                                </span>
                                <span className="col-span-2 text-[14px] text-white/50 md:col-span-1">{r.text}</span>
                                <span className="hidden text-sm text-white/70 transition-colors group-hover:text-white md:inline">
                                    See <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className="mt-5 text-xs text-white/40">Prices in US dollars. AltureLock includes the Journal, the Terminal and two premium indicators. Subscriptions can be cancelled at any time and run to the end of the paid period. <Link href="/alturelock#pricing" className="border-b border-white/30 text-white/60 hover:text-white">Compare every plan</Link>.</p>
            </div>
        </section>
    );
};

// ---------- What we stand for ----------

const BELIEFS = [
    ["Structure over impulse", "A plan is written before the entry, not found after it."],
    ["Rules you can see", "Checklists and alarms keep the plan in front of every trade."],
    ["Built from real trading", "Every tool comes from the way we trade our own capital."],
    ["Know your numbers", "Performance explained in words, not only in P&L."],
    ["Learn by doing", "Lessons you click, answer and practise on real charts."],
];

const Beliefs = () => (
    <section className="bg-black !py-16 md:!py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <Index n="05" name="How we work" />
            <div className="mt-10 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 md:grid-cols-5">
                {BELIEFS.map(([h, t]) => (
                    <div key={h} className="bg-black p-6">
                        <p className="text-[15px] text-white">{h}</p>
                        <p className="mt-2 text-[13.5px] leading-relaxed text-white/50">{t}</p>
                    </div>
                ))}
            </div>
            <p className="mt-8 text-[14px] text-white/50">
                Also from Alture &amp; Co.: our <Link href="/indicators" className="border-b border-white/30 text-white/80 hover:border-white hover:text-white">TradingView indicators</Link>.
            </p>
        </div>
    </section>
);

const HomeProducts = () => (
    <div id="what-we-offer">
        <style>{`@keyframes hp-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*=hp-in]{animation:none!important}}`}</style>
        <AltureLock />
        <Journal />
        <Education />
        <Prices />
        <Beliefs />
    </div>
);

export default HomeProducts;
