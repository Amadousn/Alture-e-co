"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EduBar from "../edu-bar";
import StepView from "./steps";
import LiveChart from "./live-chart";
import LessonChart from "./lesson-chart";
import { candlesOf, LESSONS, lessonsOf, measure, STAGES, StageId } from "./course";
import { SCENES, SOURCE } from "@/utils/education-chart-data";
import { useEducationProgress } from "@/utils/education-progress";

const BEIGE = "#E9DCC3";
const Tick = () => (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 flex-shrink-0 text-[#20B8A8]" aria-hidden="true">
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);
const primary = "group inline-flex items-center gap-3 rounded-sm bg-white px-7 py-4 text-sm font-semibold text-black hover:bg-[#e4e4e8] transition-colors lit";

type Stats = ReturnType<typeof measure>;

// Where the learner is in the six stages: one thin bar each, filled as that stage is done.
const Rail = ({ stats, current, onStage }: { stats: Stats; current: StageId; onStage: (stage: StageId) => void }) => (
    <ol className="flex gap-1.5 sm:gap-3" aria-label="The journey">
        {STAGES.map((stage, i) => {
            const state = stats.stages[i];
            const here = stage.id === current;
            return (
                <li key={stage.id} className="min-w-0 flex-1">
                    <button type="button" onClick={() => onStage(stage.id)} aria-current={here ? "step" : undefined} className="group block w-full text-left">
                        <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                            <span className={`block h-full transition-[width] duration-700 ${here ? "bg-accent" : "bg-white/70"}`} style={{ width: `${state.total ? (state.done / state.total) * 100 : 0}%` }} />
                        </span>
                        <span className={`mt-2 hidden truncate text-xs transition-colors sm:block ${here ? "text-white" : "text-white/40 group-hover:text-white/80"}`}>{stage.word}</span>
                    </button>
                </li>
            );
        })}
    </ol>
);

// The first thing a learner sees: the market drawing itself, where the journey goes, and one way in.
const Entry = ({ stats, onBegin }: { stats: Stats; onBegin: () => void }) => {
    const days = candlesOf("horizon");
    const next = stats.next ? LESSONS[stats.next.lesson] : null;
    const started = stats.steps > 0;
    return (
        <div className="relative overflow-hidden">
            {/* Four months of real Bitcoin, printing itself behind the page. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-6 top-20 opacity-60" aria-hidden="true">
                <LessonChart fill className="h-full" view={{ candles: days.candles, minutes: days.minutes, pace: 42 }} />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" aria-hidden="true" />

            <div className="relative mx-auto grid min-h-[calc(100dvh-58px)] max-w-7xl content-center gap-x-16 gap-y-12 px-4 md:px-6 py-14 lg:grid-cols-12">
                <div className="lg:col-span-6">
                    <p className="al-rise text-[11px] uppercase tracking-[0.14em] text-white/55">The Introduction · free</p>
                    <h1 className="al-rise mt-5 !text-5xl md:!text-6xl lg:!text-7xl !leading-[1.02] text-white" style={{ animationDelay: "0.12s" }}>
                        Step into
                        <br />
                        the market.
                    </h1>
                    <p className="al-rise mt-6 max-w-md text-base md:text-lg leading-relaxed text-white/65" style={{ animationDelay: "0.24s" }}>
                        From your first question about Bitcoin to your first simulated trade on a real chart. You learn by doing: nothing here is a lecture.
                    </p>
                    <div className="al-rise mt-9" style={{ animationDelay: "0.36s" }}>
                        <button type="button" onClick={onBegin} className={primary}>
                            {stats.complete ? "Go through it again" : started && next ? `Continue: ${next.title}` : "Begin with Discover"}
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                    <p className="al-rise mt-8 max-w-md text-xs leading-relaxed text-white/35" style={{ animationDelay: "0.48s" }}>
                        Behind this page: {SOURCE}, {SCENES.horizon.when}, one candle a day. For learning to read a market; not financial advice.
                    </p>
                </div>

                <ol className="lg:col-span-5 lg:col-start-8 self-center">
                    {STAGES.map((stage, i) => {
                        const state = stats.stages[i];
                        return (
                            <li key={stage.id} className="al-rise flex items-baseline gap-5 py-3" style={{ animationDelay: `${0.3 + i * 0.09}s` }}>
                                <span className="w-24 flex-shrink-0 font-logo text-xl font-light" style={{ color: BEIGE }}>
                                    {stage.word}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[15px] text-white">{stage.topic}</span>
                                    <span className="mt-0.5 block text-[13px] leading-relaxed text-white/45">{stage.line}</span>
                                </span>
                                {state.total > 0 && state.done === state.total && <Tick />}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>
    );
};

// The Introduction itself: six stages, taken a step at a time. What is
// recorded as done is only what the learner has actually finished.
const ReadingTheChart = () => {
    const { progress, ready, visit, complete, goTo } = useEducationProgress();
    const [at, setAt] = useState<{ lesson: number; step: number } | null>(null);
    // The opening screen, and the short card shown on arriving at a new stage.
    const [entered, setEntered] = useState(false);
    const [card, setCard] = useState<StageId | null>(null);
    const stats = measure(progress.done);

    // Open where the link says, or where the learner left off.
    useEffect(() => {
        if (!ready || at) return;
        visit();
        const asked = Number(new URLSearchParams(window.location.search).get("lesson"));
        if (asked >= 1 && asked <= LESSONS.length) {
            const lesson = asked - 1;
            const open = LESSONS[lesson].steps.findIndex((step) => !progress.done[step.id]);
            setEntered(true);
            return setAt({ lesson, step: open === -1 ? 0 : open });
        }
        const lesson = Math.min(progress.lesson, LESSONS.length - 1);
        setAt({ lesson, step: Math.min(progress.step, LESSONS[lesson].steps.length - 1) });
    }, [ready, at, progress, visit]);

    const move = (lesson: number, step: number, announce = true) => {
        const from = at ? LESSONS[at.lesson].stage : null;
        const to = LESSONS[lesson].stage;
        // Arriving at a stage for the first time is marked, briefly.
        setCard(announce && to !== from && step === 0 && lessonsOf(to)[0].index === lesson ? to : null);
        setAt({ lesson, step });
        goTo(lesson, step);
        window.history.replaceState(null, "", `/education/introduction?lesson=${lesson + 1}`);
        window.scrollTo({ top: 0 });
    };
    const go = (stepId: string) => {
        const lesson = LESSONS.findIndex((item) => item.steps.some((step) => step.id === stepId));
        if (lesson !== -1) move(lesson, LESSONS[lesson].steps.findIndex((step) => step.id === stepId), false);
    };
    const toStage = (stage: StageId) => {
        const list = lessonsOf(stage);
        const open = list.find(({ lesson }) => lesson.steps.some((step) => !progress.done[step.id] && step.kind !== "recap" && step.kind !== "finish")) ?? list[0];
        move(open.index, Math.max(0, open.lesson.steps.findIndex((step) => !progress.done[step.id])), false);
    };

    if (!at) {
        return (
            <div className="min-h-[100dvh] bg-black">
                <EduBar percent={null} />
            </div>
        );
    }

    if (!entered) {
        return (
            <div className="min-h-[100dvh] bg-black text-white">
                <EduBar percent={stats.percent} />
                <Entry
                    stats={stats}
                    onBegin={() => {
                        setEntered(true);
                        if (stats.complete) return move(0, 0, false);
                        if (stats.next) move(stats.next.lesson, stats.next.step, false);
                    }}
                />
            </div>
        );
    }

    const lesson = LESSONS[at.lesson];
    const stage = STAGES.find((item) => item.id === lesson.stage)!;
    const step = lesson.steps[at.step];
    // Reading a recap or the closing page asks nothing of the learner, so they never hold up the way forward.
    const free = step.kind === "recap" || step.kind === "finish";
    const done = free || Boolean(progress.done[step.id]);
    const lastStep = at.step === lesson.steps.length - 1;
    const lastLesson = at.lesson === LESSONS.length - 1;
    const previous = at.step > 0 ? { lesson: at.lesson, step: at.step - 1 } : at.lesson > 0 ? { lesson: at.lesson - 1, step: LESSONS[at.lesson - 1].steps.length - 1 } : null;
    const next = !lastStep ? { lesson: at.lesson, step: at.step + 1 } : !lastLesson ? { lesson: at.lesson + 1, step: 0 } : null;
    const inStage = lessonsOf(lesson.stage);
    const nextStage = next && LESSONS[next.lesson].stage !== lesson.stage ? STAGES.find((item) => item.id === LESSONS[next.lesson].stage)! : null;

    return (
        <div className="min-h-[100dvh] bg-black text-white">
            <EduBar percent={stats.percent} />
            <div className="mx-auto max-w-7xl px-4 md:px-6 pb-28 pt-6 md:pt-8">
                <Rail stats={stats} current={lesson.stage} onStage={toStage} />

                {card ? (
                    // Arriving at a stage: its name, what it is about, and one way in.
                    <div key={card} className="grid min-h-[60vh] content-center py-14">
                        <p className="al-rise font-logo text-2xl font-light" style={{ color: BEIGE }}>
                            {STAGES.findIndex((item) => item.id === card) + 1} of {STAGES.length}
                        </p>
                        <h1 className="al-rise mt-3 !text-5xl md:!text-7xl !leading-[1.02] text-white" style={{ animationDelay: "0.1s" }}>
                            {stage.word}
                        </h1>
                        <p className="al-rise mt-5 text-xl md:text-2xl font-medium tracking-tight text-white" style={{ animationDelay: "0.2s" }}>
                            {stage.topic}
                        </p>
                        <p className="al-rise mt-3 max-w-xl text-base leading-relaxed text-white/60" style={{ animationDelay: "0.3s" }}>
                            {stage.line}
                        </p>
                        <div className="al-rise mt-9" style={{ animationDelay: "0.4s" }}>
                            <button type="button" onClick={() => setCard(null)} className={primary}>
                                Begin
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-8 grid gap-x-12 lg:grid-cols-[230px_minmax(0,1fr)]">
                        {/* The stage the learner is in, and its lessons */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-24">
                                <p className="font-logo text-2xl font-light" style={{ color: BEIGE }}>
                                    {stage.word}
                                </p>
                                <p className="mt-1 text-sm text-white/55">{stage.topic}</p>
                                <ol className="mt-6">
                                    {inStage.map(({ lesson: item, index }) => {
                                        const state = stats.lessons[index];
                                        const current = index === at.lesson;
                                        return (
                                            <li key={item.id}>
                                                <button type="button" aria-current={current ? "step" : undefined} onClick={() => move(index, Math.max(0, item.steps.findIndex((entry) => !progress.done[entry.id])), false)} className={`flex w-full items-baseline justify-between gap-3 py-2.5 text-left text-sm transition-colors ${current ? "text-accent" : "text-white/60 hover:text-white"}`}>
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
                                <select value={at.lesson} onChange={(event) => move(Number(event.target.value), 0, false)} className="!w-full !rounded-sm !border !border-white/20 !bg-black !px-3 !py-2.5 !text-sm !text-white">
                                    {STAGES.map((group) => (
                                        <optgroup key={group.id} label={`${group.word}: ${group.topic}`}>
                                            {lessonsOf(group.id).map(({ lesson: item, index }) => (
                                                <option key={item.id} value={index}>
                                                    {item.title}
                                                    {stats.lessons[index].done === stats.lessons[index].total ? " ✓" : ""}
                                                </option>
                                            ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </label>

                            <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
                                <div>
                                    <p className="text-xs text-white/45">
                                        {stage.word} · {lesson.title}
                                    </p>
                                    <h1 className="mt-1.5 !text-2xl md:!text-3xl text-white">{step.title}</h1>
                                </div>
                                <ol className="flex items-center gap-1.5" aria-label="Steps of this lesson">
                                    {lesson.steps.map((entry, i) => (
                                        <li key={entry.id}>
                                            <button type="button" onClick={() => move(at.lesson, i, false)} aria-label={`Step ${i + 1}: ${entry.title}`} aria-current={i === at.step ? "step" : undefined} className="block py-2">
                                                <span className={`block h-[3px] w-6 rounded-full transition-colors ${i === at.step ? "bg-accent" : progress.done[entry.id] ? "bg-white/70" : "bg-white/15 hover:bg-white/30"}`} />
                                            </button>
                                        </li>
                                    ))}
                                </ol>
                            </div>

                            <div key={step.id} className="cockpit-rise mt-6">
                                <StepView step={step} done={progress.done} onDone={(tries) => complete(step.id, tries)} go={go} />
                            </div>

                            <div className="mt-10 flex items-center justify-between gap-6 border-t border-white/10 pt-6">
                                {previous ? (
                                    <button type="button" onClick={() => move(previous.lesson, previous.step, false)} className="text-sm text-white/55 hover:text-white transition-colors">
                                        ← Back
                                    </button>
                                ) : (
                                    <span />
                                )}
                                {next && (
                                    <button type="button" disabled={!done} onClick={() => move(next.lesson, next.step)} className={`group inline-flex items-center gap-3 rounded-sm px-6 py-3 text-sm font-medium transition-colors ${done ? "bg-white text-black hover:bg-[#e4e4e8] lit" : "border border-white/15 text-white/35"}`}>
                                        {nextStage ? `Next: ${nextStage.word}` : lastStep ? "Next lesson" : "Continue"}
                                        <span aria-hidden="true" className={done ? "transition-transform duration-300 group-hover:translate-x-1" : ""}>→</span>
                                    </button>
                                )}
                            </div>
                            {!done && <p className="mt-3 text-right text-xs text-white/35">{step.kind === "film" ? "Watch to the end to continue." : "Finish this step to continue."}</p>}
                            {lesson.stage === "decide" && <LiveChart />}
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReadingTheChart;
