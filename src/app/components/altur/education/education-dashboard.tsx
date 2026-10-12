"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EduBar from "./edu-bar";
import { Lock } from "./education-programme";
import { INTRODUCTION, MODULES } from "./programme-data";
import LessonChart from "./intro/lesson-chart";
import { candlesOf, LESSONS, lessonsOf, measure, STAGES, timeframeName, TRADE_LINK } from "./intro/course";
import { SCENES, SOURCE } from "@/utils/education-chart-data";
import { useEducationProgress } from "@/utils/education-progress";

const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const Tick = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0 text-[#20B8A8]" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// The learner's own page. Every figure on it is counted from what this browser
// has recorded; nothing is shown as done that was not done.
const EducationDashboard = () => {
    const { progress, ready, returning, visit, reset } = useEducationProgress();
    const [confirming, setConfirming] = useState(false);
    useEffect(() => {
        if (ready) visit();
    }, [ready, visit]);

    const stats = measure(progress.done);
    const started = stats.steps > 0;
    const next = stats.next;
    const preview = candlesOf("first");
    const state = stats.complete ? "Completed" : started ? "In progress" : "Available";
    const last = progress.lastAt && started ? new Date(progress.lastAt).toLocaleDateString(undefined, { day: "numeric", month: "long" }) : null;

    return (
        <div className="min-h-[100dvh] bg-black text-white">
            <EduBar percent={ready ? stats.percent : null} />
            <div className={`mx-auto max-w-7xl px-4 md:px-6 pb-28 pt-10 md:pt-16 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
                {/* Greeting */}
                <h1 className="!text-3xl md:!text-[40px] md:!leading-[1.1] text-white">{returning ? "Welcome back." : "Welcome."}</h1>
                <p className="mt-3 max-w-xl text-[15px] md:text-base leading-relaxed text-white/60">
                    {stats.complete ? "You have completed the Introduction. The seven modules open once you are in the programme." : started && next ? `You are in ${STAGES.find((stage) => stage.id === LESSONS[next.lesson].stage)!.word}: ${LESSONS[next.lesson].title}.` : "Your programme begins with the Introduction, and the Introduction begins with one question: what is Bitcoin?"}
                </p>

                <div className="mt-10 md:mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-12">
                    {/* The Introduction */}
                    <section className="!py-0 lg:col-span-7" aria-label="Introduction">
                        <p className={`${label} flex items-center gap-4`}>
                            {INTRODUCTION.title}
                            <span className="font-semibold tracking-[0.1em] text-accent">{state}</span>
                        </p>
                        <h2 className="mt-3 !text-2xl md:!text-3xl text-white">{INTRODUCTION.name}</h2>
                        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/60">{INTRODUCTION.text}</p>
                        <Link href={started && next ? `/education/introduction?lesson=${next.lesson + 1}` : "/education/introduction"} className="group mt-7 inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit">
                            {stats.complete ? "Review the Introduction" : started && next ? `Continue: ${LESSONS[next.lesson].title}` : "Start the Introduction"}
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                        <a href={TRADE_LINK} className="ml-0 mt-3 inline-flex items-center rounded-sm border border-white/30 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-white sm:ml-3 sm:mt-7">
                            Just try a trade
                        </a>
                        <Link href={started && next ? `/education/introduction?lesson=${next.lesson + 1}` : "/education/introduction"} aria-label="Open the Introduction" className="mt-9 block">
                            {ready && <LessonChart className="h-[240px] md:h-[300px]" note={`${SOURCE} · ${timeframeName(SCENES.first.timeframe)} · ${SCENES.first.when}, UTC · historical`} view={{ candles: preview.candles, minutes: preview.minutes }} />}
                        </Link>
                    </section>

                    {/* Progress */}
                    <section className="!py-0 lg:col-span-5" aria-label="Your progress">
                        <p className={label}>Your progress</p>
                        <p className="mt-3 font-logo text-6xl md:text-7xl font-light leading-none tabular-nums text-white">
                            {stats.percent}
                            <span className="text-3xl text-white/40">%</span>
                        </p>
                        <div className="mt-5 h-[3px] overflow-hidden rounded-full bg-white/15" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={stats.percent} aria-label="Introduction completed">
                            <div className="h-full bg-accent transition-[width] duration-700" style={{ width: `${stats.percent}%` }} />
                        </div>
                        <p className="mt-4 text-sm tabular-nums text-white/55">
                            {stats.stagesDone} of {STAGES.length} stages · {stats.steps} of {stats.total} activities
                            {last && <span> · last studied {last}</span>}
                        </p>

                        <ol className="mt-7 border-b border-white/15">
                            {STAGES.map((stage, i) => {
                                const item = stats.stages[i];
                                const current = !stats.complete && next !== null && LESSONS[next.lesson].stage === stage.id;
                                const open = lessonsOf(stage.id).find(({ index }) => stats.lessons[index].done < stats.lessons[index].total) ?? lessonsOf(stage.id)[0];
                                return (
                                    <li key={stage.id} className="border-t border-white/15">
                                        <Link href={`/education/introduction?lesson=${open.index + 1}`} className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-3.5 transition-colors hover:bg-white/[0.03]">
                                            <span>
                                                <span className={`block text-[15px] ${current ? "text-white" : item.done === item.total ? "text-white/70" : "text-white/85"}`}>
                                                    {stage.word} <span className="text-white/45">· {stage.topic}</span>
                                                </span>
                                                <span className="mt-0.5 block text-[13px] leading-snug text-white/45">{stage.line}</span>
                                            </span>
                                            <span className="flex items-center gap-2 text-xs tabular-nums text-white/45">
                                                {item.done === item.total ? <Tick /> : item.done > 0 ? `${item.done} of ${item.total}` : current ? <span className="text-accent">Next</span> : ""}
                                            </span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ol>
                    </section>
                </div>

                {/* The path */}
                <section className="!py-0 mt-16 md:mt-24" aria-label="Your learning path">
                    <p className={label}>Your learning path</p>
                    <ol className="mt-5 grid gap-x-10 border-b border-white/15 sm:grid-cols-2 lg:grid-cols-4">
                        <li className="border-t border-accent">
                            <Link href="/education/introduction" className="block py-5 transition-colors hover:bg-white/[0.03]">
                                <span className="block text-xs text-accent">{INTRODUCTION.title}</span>
                                <span className="mt-1.5 block text-[15px] text-white">{INTRODUCTION.name}</span>
                                <span className="mt-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">{state}</span>
                            </Link>
                        </li>
                        {MODULES.map((item, i) => (
                            <li key={item.title} className="border-t border-white/15 py-5" aria-disabled="true">
                                <span className="block text-xs text-white/40">Module {i + 1}</span>
                                <span className="mt-1.5 block text-[15px] text-white/55">{item.title}</span>
                                <span className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                                    <Lock /> Locked
                                </span>
                            </li>
                        ))}
                    </ol>
                    <p className="mt-6 text-sm text-white/50">
                        The seven modules open once you are in the programme.{" "}
                        <Link href="/contact" className="border-b border-white/30 text-white hover:border-white">
                            Request access
                        </Link>
                    </p>
                </section>

                {/* Kept in this browser */}
                <p className="mt-14 text-xs leading-relaxed text-white/35">
                    The lessons use real, historical Bitcoin charts to teach chart reading. They are not financial advice or a recommendation to trade Bitcoin. Your progress is kept in this browser only.{" "}
                    {started &&
                        (confirming ? (
                            <>
                                Erase it and start again?{" "}
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setConfirming(false);
                                    }}
                                    className="text-[#E955A8] border-b border-[#E955A8]/50"
                                >
                                    Erase
                                </button>{" "}
                                <button type="button" onClick={() => setConfirming(false)} className="ml-2 text-white/60 hover:text-white">
                                    Keep it
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={() => setConfirming(true)} className="border-b border-white/20 text-white/50 hover:text-white">
                                Reset my progress
                            </button>
                        ))}
                </p>
            </div>
        </div>
    );
};

export default EducationDashboard;
