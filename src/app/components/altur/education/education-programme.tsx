"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { INTRODUCTION, MODULES } from "./programme-data";
import { measure } from "./intro/course";
import { useEducationProgress } from "@/utils/education-progress";

export const Lock = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={`h-3.5 w-3.5 flex-shrink-0 ${className}`} aria-hidden="true">
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const Status = ({ open }: { open: boolean }) => (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${open ? "text-accent" : "text-white/45"}`}>
        {!open && <Lock />}
        {open ? "Available" : "Locked"}
    </span>
);

const primary = "group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit";

// The programme: the Introduction, which is open, then the seven modules, which are not.
// Row 0 is the Introduction; rows 1 to 7 are the modules.
const EducationProgramme = () => {
    const [selected, setSelected] = useState(0);
    const { progress, ready } = useEducationProgress();
    const stats = measure(progress.done);
    const started = ready && stats.steps > 0;

    // The Education page links here with the module to show.
    useEffect(() => {
        const read = () => {
            const match = window.location.hash.match(/^#module-(\d+)$/);
            const picked = match ? Number(match[1]) : 0;
            if (picked >= 1 && picked <= MODULES.length) setSelected(picked);
        };
        read();
        window.addEventListener("hashchange", read);
        return () => window.removeEventListener("hashchange", read);
    }, []);

    // What a visitor may read of the selected row. "bare" leaves out the heading, which the row above already gives on a phone.
    const detail = (index: number, bare = false) =>
        index === 0 ? (
            <div className="cockpit-rise">
                {!bare && (
                    <>
                        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
                            Introduction
                            <Status open />
                        </p>
                        <h2 className="mt-3 mb-5 !text-2xl md:!text-3xl text-white">{INTRODUCTION.name}</h2>
                    </>
                )}
                <p className="max-w-xl text-[15px] md:text-base leading-relaxed text-white/75">{INTRODUCTION.text}</p>
                {started && (
                    <p className="mt-4 text-sm tabular-nums text-white/50">
                        {stats.complete ? "Completed in this browser." : `${stats.percent}% done in this browser · ${stats.lessonsDone} of ${stats.lessons.length} lessons`}
                    </p>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Link href="/education/introduction" className={primary}>
                        {stats.complete ? "Review the Introduction" : started ? "Continue the Introduction" : "Start the Introduction"}
                        <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                    <Link href="/education/dashboard" className="border-b border-white/30 pb-1 text-sm font-medium text-white hover:border-white transition-colors">
                        Open the dashboard
                    </Link>
                </div>
            </div>
        ) : (
            <div className="cockpit-rise">
                {!bare && (
                    <>
                        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.14em] text-white/45">
                            Module {index}
                            <Status open={false} />
                        </p>
                        <h2 className="mt-3 mb-5 !text-2xl md:!text-3xl text-white">{MODULES[index - 1].title}</h2>
                    </>
                )}
                <p className="max-w-md text-[15px] leading-relaxed text-white/60">This module is locked. Its content opens once you are in the programme.</p>
                <Link href="/contact" className={`${primary} mt-8`}>
                    Request access
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
            </div>
        );

    const rows = [{ label: "Start here", title: INTRODUCTION.title, open: true }, ...MODULES.map((item, i) => ({ label: `Module ${i + 1}`, title: item.title, open: false }))];

    return (
        <section className="bg-black min-h-[100dvh] !pt-28 md:!pt-36 !pb-20 md:!pb-28">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Link href="/education" className="text-sm text-white/55 hover:text-white transition-colors">
                    ← Education
                </Link>

                <div className="mt-8 flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
                    <div>
                        <p className="mb-4 text-[11px] uppercase tracking-[0.14em] text-accent">The programme</p>
                        <h1 className="!text-3xl md:!text-[40px] md:!leading-[1.1] text-white">Seven modules, one step at a time.</h1>
                    </div>
                    <p className="text-sm text-white/50">Introduction available · {MODULES.length} modules locked</p>
                </div>

                <div className="mt-10 md:mt-14 grid gap-x-16 lg:grid-cols-12">
                    <ol className="lg:col-span-5 border-b border-white/15">
                        {rows.map((row, i) => {
                            const active = i === selected;
                            return (
                                <li key={row.label} id={i === 0 ? "introduction" : `module-${i}`} className="scroll-mt-24 border-t border-white/15">
                                    <button type="button" aria-expanded={active} onClick={() => setSelected(i)} className={`grid w-full grid-cols-[4.5rem_1fr_auto] items-baseline gap-x-3 py-4 text-left transition-colors ${active ? "" : "hover:bg-white/[0.03]"}`}>
                                        <span className={`text-xs ${active ? "text-accent" : "text-white/45"}`}>{row.label}</span>
                                        <span className={`text-[15px] md:text-base ${active ? "text-white" : row.open ? "text-white/85" : "text-white/55"}`}>{row.title}</span>
                                        <Status open={row.open} />
                                    </button>
                                    {/* On a phone the row opens in place. */}
                                    {active && <div className="lg:hidden pb-8 pt-1">{detail(i, true)}</div>}
                                </li>
                            );
                        })}
                    </ol>

                    <div className="hidden lg:block lg:col-span-7">
                        <div key={selected} className="sticky top-28 border-l border-white/15 pl-12 py-2 min-h-[320px]">
                            {detail(selected)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EducationProgramme;
