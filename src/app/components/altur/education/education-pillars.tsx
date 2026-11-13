"use client";

import Link from "next/link";
import { BRAND_MARKS } from "../brand/brand-marks";
import { useState } from "react";
import CandleExercise from "./candle-exercise";

// What the Education programme includes: the interactive course at the centre,
// then the trade sessions, the community and the in-person events around it.
// Platform, dates and frequency of events are announced to members: nothing here
// promises a date, a place in a room, a signal or a result.

const PILLARS = [
    {
        n: "01",
        name: "Interactive Education",
        line: "Seven structured modules you click, answer and practise.",
        points: ["Interactive lessons", "Real historical Bitcoin charts", "Guided chart-reading exercises", "Simulated trading practice", "Progress you can follow"],
        note: "Start with the free Introduction. Try it on the left.",
    },
    {
        n: "02",
        name: "Two Trade Sessions Every Month",
        line: "At least two live sessions a month, to see how a trading decision is made in real market conditions.",
        points: ["Market analysis and context", "Trade setup and reasoning", "Entry and exit considerations", "Risk management", "Trade review and lessons learned"],
        note: "Educational sessions. Not signals, and no promise of results.",
    },
    {
        n: "03",
        name: "Private Trader Community",
        line: "A private space for Alture Education members.",
        points: ["Discuss market conditions", "Share ideas and what you learn", "Ask questions", "Talk through setups and reviews", "Learn alongside other traders"],
        note: "The platform is announced to members when they join.",
    },
    {
        n: "04",
        name: "In-Person Events · Dubai, Paris & Nashville",
        line: "Selected community events and meetups, to meet the members and the Alture team in person.",
        points: ["Dubai, United Arab Emirates", "Paris, France", "Nashville, TN, USA"],
        note: "Planned community events. Dates and details are announced to members.",
    },
] as const;

// One-to-one mentors, by market. No price is shown; requests go by email.
const MENTORS = [
    { market: "Crypto", name: "Céline", focus: "Bitcoin and the crypto markets: structure, order flow and your rules.", email: "celine@altureandco.com", instagram: "celinealture" },
    { market: "Stocks · Nasdaq", name: "Astra", focus: "US stocks and the Nasdaq: reading the session, planning and review.", email: "astra@altureandco.com", instagram: "astraalture" },
];

const EducationPillars = () => {
    const [pick, setPick] = useState(0);
    const p = PILLARS[pick];
    return (
        <>
        <section className="border-t border-white/10 bg-black !py-16 md:!py-24">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <p className="mb-5 text-[11px] uppercase tracking-[0.14em] text-white/45">What the programme includes</p>
                <h2 className="font-logo !text-[40px] md:!text-[64px] !font-extralight !leading-[1.02] !tracking-[-0.02em] text-white">
                    More than education.
                    <span className="block text-white/45">A trading community.</span>
                </h2>

                <div className="mt-12 grid gap-x-14 gap-y-10 lg:grid-cols-12">
                    {/* The course itself stays the centrepiece */}
                    <div className="lg:col-span-7">
                        <CandleExercise />
                    </div>

                    <div className="lg:col-span-5">
                        <div role="tablist" aria-label="Programme" className="border-t border-white/15">
                            {PILLARS.map((x, i) => (
                                <button key={x.n} type="button" role="tab" aria-selected={i === pick} onClick={() => setPick(i)} className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-b border-white/15 py-4 text-left">
                                    <span className={`font-sans font-medium text-[12px] tabular-nums ${i === pick ? "text-[#4DD0E1]" : "text-white/35"}`}>{x.n}</span>
                                    <span className={`text-[16px] transition-colors ${i === pick ? "text-white" : "text-white/55 group-hover:text-white"}`}>{x.name}</span>
                                    <span aria-hidden="true" className={`text-white/30 transition-transform duration-300 ${i === pick ? "rotate-90 text-white" : ""}`}>›</span>
                                </button>
                            ))}
                        </div>
                        <div key={p.n} className="pt-6" style={{ animation: "ep-in .35s both" }}>
                            <p className="text-[15px] leading-relaxed text-white/75">{p.line}</p>
                            <ul className="mt-5 space-y-2.5">
                                {p.points.map((x) => (
                                    <li key={x} className="flex items-center gap-3 text-[14px] text-white/70">
                                        <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#4DD0E1]" />
                                        {x}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-5 text-[12.5px] text-white/40">{p.note}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-14 grid gap-px overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                    {PILLARS.map((x, i) => (
                        <button key={x.n} type="button" onClick={() => setPick(i)} className={`bg-black p-6 text-left transition-colors hover:bg-white/[0.03] ${i === pick ? "bg-white/[0.04]" : ""}`}>
                            <span className="font-sans font-medium text-[13px] tabular-nums text-white/35">{x.n}</span>
                            <span className="mt-3 block text-[15px] text-white">{x.name}</span>
                            <span className="mt-2 block text-[13px] leading-relaxed text-white/50">{x.line}</span>
                        </button>
                    ))}
                </div>
                {/* What is free, what the programme adds */}
                <div className="mt-14 overflow-x-auto rounded-[10px] border border-white/10">
                    <table className="w-full text-left text-[13.5px] md:text-[14.5px]">
                        <thead className="text-[11px] uppercase tracking-[0.12em] text-white/40">
                            <tr className="border-b border-white/10">
                                <th className="px-4 py-4 font-normal md:px-5"><span className="sr-only">Included</span></th>
                                <th className="px-4 py-4 font-normal md:px-5">Free Introduction</th>
                                <th className="px-4 py-4 font-normal text-white md:px-5">Programme · $1,249</th>
                            </tr>
                        </thead>
                        <tbody>
                            {([
                                ["Interactive lessons on real Bitcoin charts", "The Introduction", "Introduction + 7 modules"],
                                ["Chart exercises and a simulated trade", true, true],
                                ["Two trade sessions every month", false, true],
                                ["Private trader community", false, true],
                                ["Events and meetups in Dubai, Paris and Nashville", false, true],
                            ] as [string, string | boolean, string | boolean][]).map(([name, free, paid]) => (
                                <tr key={name} className="border-b border-white/[0.06] last:border-0">
                                    <td className="px-4 py-3.5 text-white/80 md:px-5">{name}</td>
                                    {[free, paid].map((v, i) => (
                                        <td key={i} className="px-4 py-3.5 md:px-5">{typeof v === "string" ? <span className="text-white/70">{v}</span> : v ? <span className="text-[#4DD0E1]">✓</span> : <span className="text-white/25">—</span>}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-xs text-white/40">Education teaches a method. It does not promise trading results, and the trade sessions are not signals.</p>

                <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 border-t border-white/15 pt-8">
                    <p className="text-white">
                        <span className="font-logo text-[40px] font-extralight tabular-nums">$1,249</span>
                        <span className="ml-3 text-[14px] text-white/50">one-time · all four included</span>
                    </p>
                    <Link href="/education/programme" className="group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">
                        Explore the programme
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>
                <style>{`@keyframes ep-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*=ep-in]{animation:none!important}}`}</style>
            </div>
        </section>

        {/* One-to-one: no price, requests by email. */}
        <section id="one-to-one" className="bg-black !pt-4 !pb-20 md:!pb-28">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="grid gap-x-14 gap-y-10 border-t border-white/15 pt-14 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                        <p className="mb-5 text-[11px] uppercase tracking-[0.14em] text-accent">One-to-one</p>
                        <h2 className="font-logo !text-[34px] md:!text-[48px] !font-extralight !leading-[1.05] !tracking-[-0.02em] text-white">One trader. One mentor.</h2>
                        <p className="mt-6 text-[15px] leading-relaxed text-white/60">Private sessions built around your own trading: your charts, your journal, your rules. You choose the market; the sessions follow your pace.</p>
                        <p className="mt-4 text-[13px] text-white/40">Availability is limited. Sessions are arranged by email.</p>
                    </div>
                    <div className="grid gap-px self-start overflow-hidden rounded-[10px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:col-span-7">
                        {MENTORS.map((m) => (
                            <div key={m.market} className="flex flex-col bg-black p-6 md:p-7">
                                <p className="text-[11px] uppercase tracking-[0.14em] text-white/40">{m.market}</p>
                                <p className="mt-3 text-[20px] text-white">{m.name}</p>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/50">{m.focus}</p>
                                <a href={`mailto:${m.email}?subject=${encodeURIComponent(`One-to-one request · ${m.market}`)}`} className="group mt-7 inline-flex w-fit items-center gap-3 rounded-sm bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#e4e4e8]">
                                    Request access
                                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </a>
                                <p className="mt-3 font-mono text-[12.5px] text-white/45">{m.email}</p>
                                <a href={`https://www.instagram.com/${m.instagram}/`} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on Instagram`} className="mt-4 inline-flex w-fit items-center gap-2 text-[12.5px] text-white/55 transition-colors hover:text-white">
                                    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true" dangerouslySetInnerHTML={{ __html: BRAND_MARKS.instagram.body }} />
                                    @{m.instagram}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

export default EducationPillars;
