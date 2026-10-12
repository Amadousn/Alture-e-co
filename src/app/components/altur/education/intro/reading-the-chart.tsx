"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EduBar from "../edu-bar";
import StepView from "./steps";
import LiveChart from "./live-chart";
import { LESSONS, measure } from "./course";
import { useEducationProgress } from "@/utils/education-progress";

const Tick = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0 text-[#20B8A8]" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// The Introduction itself: seven lessons, taken a step at a time. What is
// recorded as done is only what the learner has actually finished.
const ReadingTheChart = () => {
    const { progress, ready, visit, complete, goTo } = useEducationProgress();
    const [at, setAt] = useState<{ lesson: number; step: number } | null>(null);
    const stats = measure(progress.done);

    // Open where the link says, or where the learner left off.
    useEffect(() => {
        if (!ready || at) return;
        visit();
        const asked = Number(new URLSearchParams(window.location.search).get("lesson"));
        if (asked >= 1 && asked <= LESSONS.length) {
            const lesson = asked - 1;
            const open = LESSONS[lesson].steps.findIndex((step) => !progress.done[step.id]);
            return setAt({ lesson, step: open === -1 ? 0 : open });
        }
        const lesson = Math.min(progress.lesson, LESSONS.length - 1);
        setAt({ lesson, step: Math.min(progress.step, LESSONS[lesson].steps.length - 1) });
    }, [ready, at, progress, visit]);

    const move = (lesson: number, step: number) => {
        setAt({ lesson, step });
        goTo(lesson, step);
        window.history.replaceState(null, "", `/education/introduction?lesson=${lesson + 1}`);
        window.scrollTo({ top: 0 });
    };

    if (!at) {
        return (
            <div className="min-h-[100dvh] bg-black">
                <EduBar percent={null} />
            </div>
        );
    }

    const lesson = LESSONS[at.lesson];
    const step = lesson.steps[at.step];
    const done = Boolean(progress.done[step.id]);
    const lastStep = at.step === lesson.steps.length - 1;
    const lastLesson = at.lesson === LESSONS.length - 1;
    const previous = at.step > 0 ? { lesson: at.lesson, step: at.step - 1 } : at.lesson > 0 ? { lesson: at.lesson - 1, step: LESSONS[at.lesson - 1].steps.length - 1 } : null;
    const next = !lastStep ? { lesson: at.lesson, step: at.step + 1 } : !lastLesson ? { lesson: at.lesson + 1, step: 0 } : null;

    return (
        <div className="min-h-[100dvh] bg-black text-white">
            <EduBar percent={stats.percent} />
            <div className="mx-auto grid max-w-7xl gap-x-12 px-4 md:px-6 pb-28 pt-6 md:pt-10 lg:grid-cols-[250px_minmax(0,1fr)]">
                {/* The lessons */}
                <aside className="hidden lg:block">
                    <div className="sticky top-24">
                        <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">Introduction</p>
                        <p className="mt-2 text-lg font-medium tracking-tight text-white">Reading the Chart</p>
                        <ol className="mt-6">
                            {LESSONS.map((item, i) => {
                                const state = stats.lessons[i];
                                const current = i === at.lesson;
                                return (
                                    <li key={item.id}>
                                        <button type="button" aria-current={current ? "step" : undefined} onClick={() => move(i, Math.max(0, item.steps.findIndex((entry) => !progress.done[entry.id])))} className={`flex w-full items-baseline justify-between gap-3 py-2.5 text-left text-sm transition-colors ${current ? "text-accent" : "text-white/60 hover:text-white"}`}>
                                            <span>{item.title}</span>
                                            {state.done === state.total ? <Tick /> : state.done > 0 ? <span className="flex-shrink-0 text-xs tabular-nums text-white/40">{state.done}/{state.total}</span> : null}
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                        <Link href="/education/dashboard" className="mt-8 inline-block text-sm text-white/55 hover:text-white transition-colors">
                            ← Dashboard
                        </Link>
                    </div>
                </aside>

                <main className="min-w-0">
                    {/* On a phone the lessons are a menu */}
                    <label className="lg:hidden mb-5 block">
                        <span className="sr-only">Lesson</span>
                        <select value={at.lesson} onChange={(event) => move(Number(event.target.value), 0)} className="!w-full !rounded-sm !border !border-white/20 !bg-black !px-3 !py-2.5 !text-sm !text-white">
                            {LESSONS.map((item, i) => (
                                <option key={item.id} value={i}>
                                    Lesson {i + 1}: {item.title}
                                    {stats.lessons[i].done === stats.lessons[i].total ? " ✓" : ""}
                                </option>
                            ))}
                        </select>
                    </label>

                    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                        <div>
                            <p className="text-xs text-white/45">
                                Lesson {at.lesson + 1} of {LESSONS.length} · {lesson.title}
                            </p>
                            <h1 className="mt-1.5 !text-2xl md:!text-3xl text-white">{step.title}</h1>
                        </div>
                        <ol className="flex items-center gap-1.5" aria-label="Steps of this lesson">
                            {lesson.steps.map((entry, i) => (
                                <li key={entry.id}>
                                    <button type="button" onClick={() => move(at.lesson, i)} aria-label={`Step ${i + 1}: ${entry.title}`} aria-current={i === at.step ? "step" : undefined} className="block py-2">
                                        <span className={`block h-[3px] w-7 rounded-full transition-colors ${i === at.step ? "bg-accent" : progress.done[entry.id] ? "bg-white/70" : "bg-white/15 hover:bg-white/30"}`} />
                                    </button>
                                </li>
                            ))}
                        </ol>
                    </div>

                    <div key={step.id} className="cockpit-rise mt-6">
                        <StepView step={step} done={progress.done} onDone={(tries) => complete(step.id, tries)} />
                    </div>

                    {step.kind !== "summary" && (
                        <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
                            {previous ? (
                                <button type="button" onClick={() => move(previous.lesson, previous.step)} className="text-sm text-white/55 hover:text-white transition-colors">
                                    ← Back
                                </button>
                            ) : (
                                <span />
                            )}
                            {next && (
                                <button type="button" disabled={!done} onClick={() => move(next.lesson, next.step)} className={`group inline-flex items-center gap-3 rounded-sm px-6 py-3 text-sm font-medium transition-colors ${done ? "bg-white text-black hover:bg-[#e4e4e8] lit" : "border border-white/15 text-white/35"}`}>
                                    {lastStep ? "Next lesson" : "Continue"}
                                    <span aria-hidden="true" className={done ? "transition-transform duration-300 group-hover:translate-x-1" : ""}>→</span>
                                </button>
                            )}
                        </div>
                    )}
                    {!done && step.kind !== "summary" && <p className="mt-3 text-right text-xs text-white/35">{step.kind === "film" ? "Watch to the end to continue." : "Finish this step to continue."}</p>}
                    <LiveChart />
                </main>
            </div>
        </div>
    );
};

export default ReadingTheChart;
