"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MONTHS, MonthAccess } from "./programme-data";

const STATUS: Record<MonthAccess, string> = { locked: "Locked", intro: "Introduction", open: "Open" };

const Lock = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`h-3.5 w-3.5 flex-shrink-0 ${className}`} aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const Status = ({ access }: { access: MonthAccess }) => (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${access === "locked" ? "text-white/45" : "text-accent"}`}>
        {access === "locked" && <Lock />}
        {STATUS[access]}
    </span>
);

const requestAccess = "group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit";

// What a visitor may read of one month.
// "bare" leaves out the heading: on a phone the month's own row, just above, already says it.
const Detail = ({ index, bare = false }: { index: number; bare?: boolean }) => {
    const month = MONTHS[index];
    return (
        <div className="cockpit-rise">
            {!bare && (
                <>
                    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
                        Month {index + 1}
                        <Status access={month.access} />
                    </p>
                    <h2 className="mt-3 mb-5 !text-2xl md:!text-3xl text-white">{month.title}</h2>
                </>
            )}

            {month.access === "locked" && (
                <p className="max-w-md text-[15px] leading-relaxed text-white/60">This month is locked. Its content opens once you are in the programme.</p>
            )}

            {month.access === "intro" && (
                <>
                    <p className="max-w-xl text-[15px] md:text-base leading-relaxed text-white/75">{month.text}</p>
                    <p className="mt-6 flex max-w-md items-start gap-2.5 text-sm leading-relaxed text-white/50">
                        <Lock className="mt-1" />
                        This is the introduction only. The full month opens once you are in the programme.
                    </p>
                </>
            )}

            {month.access === "open" && <p className="max-w-xl text-[15px] md:text-base leading-relaxed text-white/75">{month.text}</p>}

            <Link href="/contact" className={`${requestAccess} mt-8`}>
                Request access
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
        </div>
    );
};

// The programme, month by month, with what is open to a visitor and what is not.
const EducationProgramme = () => {
    const firstReadable = Math.max(0, MONTHS.findIndex((month) => month.access !== "locked"));
    const [selected, setSelected] = useState(firstReadable);

    // The Education page links here with the month to open.
    useEffect(() => {
        const read = () => {
            const match = window.location.hash.match(/^#month-(\d+)$/);
            const index = match ? Number(match[1]) - 1 : -1;
            if (index >= 0 && index < MONTHS.length) setSelected(index);
        };
        read();
        window.addEventListener("hashchange", read);
        return () => window.removeEventListener("hashchange", read);
    }, []);

    const count = (access: MonthAccess) => MONTHS.filter((month) => month.access === access).length;
    const summary = [`${MONTHS.length} months`, count("open") > 0 ? `${count("open")} open` : "", count("intro") > 0 ? `${count("intro")} with an introduction` : "", count("locked") > 0 ? `${count("locked")} locked` : ""].filter(Boolean).join(" · ");

    return (
        <section className="bg-black min-h-[100dvh] !pt-28 md:!pt-36 !pb-20 md:!pb-28">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Link href="/education" className="text-sm text-white/55 hover:text-white transition-colors">
                    ← Education
                </Link>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                    <div>
                        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-accent">The programme</p>
                        <h1 className="!text-3xl md:!text-[40px] md:!leading-[1.1] text-white">Seven months, one step at a time.</h1>
                    </div>
                    <p className="text-sm text-white/50">{summary}</p>
                </div>

                <div className="mt-10 md:mt-14 grid gap-x-16 lg:grid-cols-12">
                    <ol className="lg:col-span-5 border-b border-white/15">
                        {MONTHS.map((month, i) => {
                            const active = i === selected;
                            return (
                                <li key={month.title} id={`month-${i + 1}`} className="scroll-mt-24 border-t border-white/15">
                                    <button type="button" aria-expanded={active} onClick={() => setSelected(i)} className={`grid w-full grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-3 py-4 text-left transition-colors ${active ? "" : "hover:bg-white/[0.03]"}`}>
                                        <span className={`text-xs ${active ? "text-accent" : "text-white/45"}`}>Month {i + 1}</span>
                                        <span className={`text-[15px] md:text-base ${active ? "text-white" : month.access === "locked" ? "text-white/55" : "text-white/80"}`}>{month.title}</span>
                                        <Status access={month.access} />
                                    </button>
                                    {/* On a phone the month opens in place. */}
                                    {active && (
                                        <div className="lg:hidden pb-8 pt-1">
                                            <Detail index={i} bare />
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>

                    <div className="hidden lg:block lg:col-span-7">
                        <div key={selected} className="sticky top-28 border-l border-white/15 pl-12 py-2 min-h-[320px]">
                            <Detail index={selected} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationProgramme;
