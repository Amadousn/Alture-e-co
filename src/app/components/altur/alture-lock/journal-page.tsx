"use client";

import Link from "next/link";
import JournalDemo, { SAMPLE_ACCOUNTS, SampleAccount } from "@/app/components/altur/journal/journal-demo";
import { FeatureExplorer } from "@/app/components/altur/journal/journal-showcase";
import { useState } from "react";
import { PLANS } from "./product-page";
import PlanButton from "./plan-button";
import { LOGIN_OPEN } from "@/utils/launch";
import { BrandMark } from "@/app/components/altur/brand/brand-marks";

const label = "mb-5 text-[11px] uppercase tracking-[0.14em] text-accent";
const heading = "!text-3xl md:!text-[40px] md:!leading-[1.1] text-white";
const body = "text-[15px] md:text-base leading-relaxed text-white/60";

// What comes in the Journal plan, against the Free plan.
const ROWS: [string, boolean][] = [
    ["P&L calendar with weekly totals", true],
    ["Equity, drawdown and daily P&L charts", true],
    ["Automatic import from your exchange", false],
    ["Unlimited strategies", false],
    ["Trade review on the real candles", false],
    ["Analysis by setup, day and session", false],
    ["Backtesting on real market history", false],
    ["A score that explains itself in words", false],
];

// Exchanges with a live, read-only connection today. Files and hand entry cover the rest.
const EXCHANGES: { id: string; name: string; logo: "mark" | "png"; how: string }[] = [
    { id: "bybit", name: "Bybit", logo: "mark", how: "Create a read-only API key in Bybit and paste it here." },
    { id: "binance", name: "Binance", logo: "mark", how: "Create a key with only Enable Reading ticked, then paste it here." },
    { id: "okx", name: "OKX", logo: "mark", how: "Create a Read only key, then paste the key, secret and passphrase." },
    { id: "bitget", name: "Bitget", logo: "png", how: "Create a read-only API key in Bitget and paste it here." },
    { id: "hyperliquid", name: "Hyperliquid", logo: "png", how: "Paste the wallet address you trade with. No key, nothing to sign." },
];

const Logo = ({ x, size = "h-7 w-7" }: { x: (typeof EXCHANGES)[number]; size?: string }) =>
    x.logo === "mark" ? <BrandMark name={x.id} className={size} /> : <img src={`/images/brokers/${x.id}.png`} alt="" className={`${size} rounded-sm object-contain`} />;

// Pick an exchange, see the three steps. Nothing is connected from this page.
const Connect = () => {
    const [pick, setPick] = useState(0);
    const x = EXCHANGES[pick];
    const steps = [
        ["Connect", x.how],
        ["Import", "Your closed trades arrive on their own, with fees, sizes and times. Nothing to type."],
        ["Read", "The calendar, the charts and the Alture Score fill in. New trades keep arriving."],
    ];
    return (
        <section className="bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className={label}>Connect your exchange</p>
                        <h2 className={heading}>Automatic. In two minutes.</h2>
                        <p className={`mt-6 ${body}`}>Connect once with a read-only key and every trade is journaled for you. A read-only key cannot place an order, move funds or withdraw.</p>
                        <p className="mt-4 text-sm text-white/40">MetaTrader 5 and Interactive Brokers: import the history file. Anything else: enter trades by hand.</p>
                    </div>
                    <div className="lg:col-span-7">
                        <div role="tablist" aria-label="Exchanges" className="grid grid-cols-5 gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10">
                            {EXCHANGES.map((e, i) => (
                                <button key={e.id} role="tab" aria-selected={i === pick} type="button" onClick={() => setPick(i)} className={`flex flex-col items-center gap-2 px-2 py-5 text-[12px] transition-colors ${i === pick ? "bg-white/[0.07] text-white" : "bg-black text-white/45 hover:text-white"}`}>
                                    <Logo x={e} />
                                    <span className="truncate">{e.name}</span>
                                </button>
                            ))}
                        </div>
                        <ol key={x.id} className="mt-6 space-y-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10">
                            {steps.map(([t, d], i) => (
                                <li key={t} className="flex gap-5 bg-black p-5 md:p-6" style={{ animation: `jp-in .5s ${i * 0.12}s both` }}>
                                    <span className="font-sans font-medium text-sm tabular-nums text-[#4DD0E1]">{i + 1}</span>
                                    <span>
                                        <span className="block text-[15px] text-white">{t}</span>
                                        <span className="mt-1 block text-[13.5px] leading-relaxed text-white/50">{d}</span>
                                    </span>
                                </li>
                            ))}
                        </ol>
                        <style>{`@keyframes jp-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*=jp-in]{animation:none!important}}`}</style>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Named journals, from their own pricing pages only.
// Checked 12 November 2026. Only what their pages state is written here.
const RIVALS: { name: string; price: string; more: string }[] = [
    { name: "TradeZella", price: "$35 · $59 · $99", more: "Trade replay from Pro ($59). Unlimited accounts only on Ultra ($99)." },
    { name: "Tradervue", price: "$29.95 · $49.95", more: "Exit analysis and fees support only on Gold ($49.95)." },
    { name: "Tradespad", price: "$0 · $19 · $29", more: "Auto-sync only on paid plans. Unlimited accounts and strategies only on Pro ($29)." },
    { name: "Edgewonk", price: "$35", more: "One plan, every feature included." },
];

const Mark = ({ on }: { on: boolean }) => (on ? <span className="text-[#4DD0E1]">✓</span> : <span className="text-white/25">—</span>);

const JournalPage = () => {
    const free = PLANS.find((p) => p.name === "Free")!;
    const journal = PLANS.find((p) => p.name === "Journal")!;
    const full = PLANS.find((p) => p.name === "AltureLock")!;
    const [account, setAccount] = useState<"all" | SampleAccount>("all");
    return (
        <div className="bg-black">
            {/* Hero: the headline, then the real journal straight away */}
            <section className="bg-black !pt-28 md:!pt-36 !pb-6">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-7">
                            <p className={label}>AltureLock · Trading Journal</p>
                            <h1 className="font-logo !text-[40px] md:!text-[64px] !font-extralight !leading-[1.04] !tracking-[-0.02em] text-white">
                                A journal that shows you more than your P&amp;L.
                            </h1>
                            <p className="mt-4 font-logo text-xl font-light text-white/55 md:text-2xl">Understand every trade. Improve every decision.</p>
                        </div>
                        <div className="lg:col-span-5">
                            <p className={body}>Track your trading performance, review your decisions and discover what works, with a journal that turns your trading history into meaningful insights.</p>
                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                                <a href="#try" className="group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">
                                    Try the sample journal
                                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                                </a>
                                <a href="#features" className="border-b border-white/25 pb-0.5 text-sm text-white/70 transition-colors hover:border-white hover:text-white">
                                    Explore the journal
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The live journal: calendar, day panel, figures, charts, score */}
            <section id="try" className="scroll-mt-16 bg-black !pt-6 !pb-14 md:!pb-20">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="border-l-2 border-[#FACC15] pl-4 text-sm text-white/70">Demonstration data, not a real account. Change the month, click a day, open a trade.</p>
                        <div role="tablist" aria-label="Sample account" className="flex gap-1 text-[12.5px]">
                            {([["all", "All accounts"], ...SAMPLE_ACCOUNTS.map((x) => [x.id, x.name])] as [string, string][]).map(([id, name]) => (
                                <button key={id} type="button" role="tab" aria-selected={account === id} onClick={() => setAccount(id as typeof account)} className={`rounded-full px-3.5 py-1.5 transition-colors ${account === id ? "bg-white text-black" : "text-white/55 hover:text-white"}`}>{name}</button>
                            ))}
                        </div>
                    </div>
                    <JournalDemo framed account={account === "all" ? undefined : account} />
                </div>
            </section>

            {/* Every feature, explored one at a time */}
            <section id="features" className="scroll-mt-16 bg-black !py-14 md:!py-20">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="mb-10 grid gap-x-12 gap-y-4 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-6">
                            <p className={label}>Explore the journal</p>
                            <h2 className={heading}>Six things it does for you.</h2>
                        </div>
                        <p className={`lg:col-span-6 ${body}`}>Pick one. Each opens on the same sample trades, so you can try it as you would in your own journal.</p>
                    </div>
                    <FeatureExplorer />
                </div>
            </section>

            <Connect />

            {/* The loop: rules before, alarms during, journal after */}
            <section className="bg-black !py-14 md:!py-20">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="max-w-3xl">
                        <p className={label}>Only in AltureLock</p>
                        <h2 className={heading}>The journal knows your rules.</h2>
                        <p className={`mt-6 ${body}`}>Before the trade, your checklist. During it, your alarms. After it, the journal records whether you followed both. So a loss tells you something: was it the strategy, or was it you?</p>
                        <p className="mt-4 text-sm text-white/40">AltureLock places no orders. It reads, checks and alerts.</p>
                    </div>
                </div>
            </section>

            {/* What is included */}
            <section id="pricing" className="scroll-mt-16 bg-black !py-16 md:!py-24">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <p className={label}>What is included</p>
                    <h2 className={heading}>The complete journal. No upgrade required.</h2>
                    <p className={`mt-6 max-w-2xl ${body}`}>Every Journal feature is included in one plan, at ${journal.monthly} a month. No artificial limits, no Pro upgrade to unlock the tools you need.</p>
                    <div className="mt-12 overflow-x-auto rounded-[10px] border border-white/10">
                        <table className="w-full text-left text-[13px] md:text-[14px]">
                            <thead className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                                <tr className="border-b border-white/10">
                                    <th className="px-3 md:px-5 py-4 font-normal">Feature</th>
                                    <th className="px-3 md:px-5 py-4 font-normal">Free</th>
                                    <th className="px-3 md:px-5 py-4 font-normal text-white">Journal<span className="block md:inline"> · ${journal.monthly}/mo</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {ROWS.map(([name, inFree]) => (
                                    <tr key={name} className="border-b border-white/[0.06] last:border-0">
                                        <td className="px-3 md:px-5 py-3.5 text-white/80">{name}</td>
                                        <td className="px-3 md:px-5 py-3.5"><Mark on={inFree} /></td>
                                        <td className="px-3 md:px-5 py-3.5"><Mark on /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3 className="!mt-16 !text-2xl !font-light text-white">Compared, by name.</h3>
                    <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-white/55">Monthly prices and tiers as their own pricing pages show them.</p>
                    <div className="mt-6 overflow-hidden rounded-[10px] border border-white/10">
                        <div className="grid gap-1 border-b border-white/10 bg-white/[0.04] px-5 py-4 md:grid-cols-[180px_200px_1fr] md:gap-6">
                            <span className="text-[15px] text-white">AltureLock</span>
                            <span className="font-logo tabular-nums text-[#4DD0E1]">$0 · ${journal.monthly} · ${full.monthly}</span>
                            <span className="text-[13.5px] text-white/70">The full journal at ${journal.monthly}. At ${full.monthly}: the terminal, your rules and alarms, and two premium indicators.</span>
                        </div>
                        {RIVALS.map((r) => (
                            <div key={r.name} className="grid gap-1 border-b border-white/[0.06] px-5 py-4 last:border-0 md:grid-cols-[180px_200px_1fr] md:gap-6">
                                <span className="text-[15px] text-white/80">{r.name}</span>
                                <span className="font-logo tabular-nums text-white/60">{r.price}</span>
                                <span className="text-[13.5px] text-white/45">{r.more}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {[free, journal, full].map((p) => (
                            <div key={p.name} className={`flex flex-col rounded-[10px] border p-7 ${p.name === "Journal" ? "border-white/40" : "border-white/10"}`}>
                                <p className="text-sm text-white/60">{p.name}</p>
                                <p className="mt-3 font-logo text-4xl font-light tabular-nums text-white">
                                    ${p.monthly}
                                    <span className="ml-1 text-sm text-white/40">/month</span>
                                </p>
                                <p className="mt-3 mb-7 text-[13.5px] leading-relaxed text-white/50">{p.text}</p>
                                {LOGIN_OPEN && p.monthly > 0 ? (
                                    <PlanButton plan={p.name.toLowerCase()} yearly={false} className={`group mt-auto inline-flex items-center justify-center gap-3 rounded-sm px-6 py-3.5 text-sm font-semibold transition-colors ${p.name === "Journal" ? "bg-white text-black hover:bg-[#e4e4e8]" : "border border-white/25 text-white hover:border-white"}`}>
                                        Choose {p.name}
                                    </PlanButton>
                                ) : (
                                    <Link href={LOGIN_OPEN ? "/alturelock/login" : "/#contact"} className="group mt-auto inline-flex items-center justify-center gap-3 rounded-sm border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white">
                                        {LOGIN_OPEN ? (p.monthly > 0 ? `Choose ${p.name}` : "Start free") : "Request access"}
                                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                        <Link href="/alturelock#pricing" className="group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">
                            See all plans
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                        <Link href="/alturelock" className="border-b border-white/25 pb-0.5 text-sm text-white/70 transition-colors hover:border-white hover:text-white">
                            Discover the terminal
                        </Link>
                    </div>
                    <p className="mt-6 text-xs text-white/40">Prices in US dollars. Other journals: monthly list prices from their pricing pages, checked 12 November 2026; they may change. Names belong to their owners. AltureLock places no orders and gives no trading advice.</p>
                </div>
            </section>
            {/* Final call */}
            <section className="border-t border-white/10 bg-black !py-20 md:!py-28">
                <div className="container mx-auto max-w-7xl px-4 text-center md:px-6">
                    <h2 className="font-logo !text-[36px] md:!text-[56px] !font-extralight !leading-[1.05] !tracking-[-0.02em] text-white">Your trading history has more to tell you.</h2>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <a href="#try" className="inline-flex items-center gap-3 rounded-sm border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-white">Try the sample journal</a>
                        {LOGIN_OPEN ? (
                            <PlanButton plan="journal" yearly={false} className="inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">Get the Journal · ${journal.monthly}/month</PlanButton>
                        ) : (
                            <Link href="/#contact" className="inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">Get the Journal · ${journal.monthly}/month</Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default JournalPage;
