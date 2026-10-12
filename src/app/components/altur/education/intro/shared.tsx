"use client";

import { useEffect, useState } from "react";
import { SCENES, SOURCE, Timeframe } from "@/utils/education-chart-data";
import LessonChart, { ChartZone, stamp } from "./lesson-chart";
import CandleStage from "./candle-stage";
import { candlesOf, ChartStage, Option, Stage, timeframeName } from "./course";

export const STAGE = "h-[42vh] min-h-[280px] md:h-[50vh] md:min-h-[340px]";
// How a step was finished: 1 = right the first time, 2 = right on the second try, 3 = the answer was shown.
export type Done = (tries: number) => void;
export type Tone = "good" | "bad" | "plain" | "shown";
// A learner gets two tries at any question; after the second miss the answer is shown and explained.
export const TRIES = 2;
export const reason = (text: string) => text.replace(/^Yes\.\s*/, "");
export const retry = (text: string) => `Not quite. ${text} One more try.`;

// Lesson text is shown as written. (Key terms are gathered in the recap at the end of each topic instead of being marked inline.)
export const Rich = ({ text }: { text: string }) => <>{text}</>;

export type ChartExtras = { timeframe?: Timeframe; focus?: number[]; zones?: ChartZone[]; axis?: "price" | "time" | null; rings?: Record<number, "good" | "bad" | "shown" | "pin">; onCandle?: (index: number) => void; onAxis?: (axis: "price" | "time") => void; onPrice?: (price: number) => void };

// What one candle says, in plain words, from its own four prices.
export function describe(candle: { t: number; o: number; h: number; l: number; c: number }, minutes = 15) {
    const bull = candle.c >= candle.o;
    const body = Math.abs(candle.c - candle.o);
    const upper = candle.h - Math.max(candle.o, candle.c);
    const lower = Math.min(candle.o, candle.c) - candle.l;
    const range = candle.h - candle.l || 1;
    const reading = body < range * 0.25 ? "A small body: neither buyers nor sellers kept much ground." : upper > body * 1.15 && upper >= lower ? "The upper wick is longer than the body: higher prices were reached and given back." : lower > body * 1.15 ? "The lower wick is longer than the body: lower prices were reached and given back." : bull ? "Buyers kept most of what they gained." : "Sellers kept most of what they gained.";
    const usd = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `${stamp(candle.t, minutes)} · ${bull ? "Bullish" : "Bearish"}: opened ${usd(candle.o)}, high ${usd(candle.h)}, low ${usd(candle.l)}, closed ${usd(candle.c)}. Body $${usd(body)}, upper wick $${usd(upper)}, lower wick $${usd(lower)}. ${reading}`;
}

export const ChartOf = ({ stage, extra = {}, className = STAGE }: { stage: ChartStage; extra?: ChartExtras; className?: string }) => {
    const timeframe = extra.timeframe ?? stage.timeframe ?? SCENES[stage.scene].timeframe;
    const data = candlesOf(stage.scene, timeframe);
    // Marks and zones belong to the timeframe the scene was drawn on.
    const native = timeframe === SCENES[stage.scene].timeframe;
    // Where a click is not an answer, it inspects the candle.
    const inspect = !extra.onCandle && !extra.onPrice;
    const [pin, setPin] = useState<number | null>(null);
    useEffect(() => setPin(null), [data.candles]);
    const pinned = inspect && pin !== null && pin < (stage.shown ?? data.candles.length) ? pin : null;
    return (
        <div>
            <LessonChart
                className={className}
                note={`${SOURCE} · ${timeframeName(timeframe)} · ${SCENES[stage.scene].when}, UTC · historical`}
                view={{ candles: data.candles, minutes: data.minutes, shown: stage.shown, focus: extra.focus ?? stage.focus, marks: native ? stage.marks : undefined, path: native && stage.path, zones: [...(native ? stage.zones ?? [] : []), ...(extra.zones ?? [])], axis: extra.axis ?? stage.axis, rings: pinned !== null ? { ...extra.rings, [pinned]: "pin" } : extra.rings }}
                onCandle={extra.onCandle ?? (inspect ? (index) => setPin((current) => (current === index ? null : index)) : undefined)}
                onAxis={extra.onAxis}
                onPrice={extra.onPrice}
            />
            {inspect && (
                <p className="mt-2 min-h-[2.6rem] text-[13px] leading-snug text-white/55" aria-live="polite">
                    {pinned !== null ? <Rich text={describe(data.candles[pinned], data.minutes)} /> : <span className="text-white/35">Select any candle to inspect it.</span>}
                </p>
            )}
        </div>
    );
};

export const StageOf = ({ stage }: { stage: Stage }) => (stage.kind === "chart" ? <ChartOf stage={stage} /> : <CandleStage className={STAGE} spec={{ kind: stage.candle, progress: stage.progress, ms: stage.ms, show: stage.show, focus: stage.focus }} />);

export const Prompt = ({ children }: { children: string }) => (
    <p className="text-lg md:text-xl font-medium leading-snug tracking-tight text-white">
        <Rich text={children} />
    </p>
);

const BORDER: Record<Tone, string> = { good: "border-[#20B8A8] text-white", bad: "border-[#E955A8] text-white/85", plain: "border-white/25 text-white/75", shown: "border-accent text-white" };
export const Feedback = ({ tone, lead, children }: { tone: Tone; lead?: string; children: string }) => (
    <p key={`${lead}${children}`} role="status" className={`cockpit-rise mt-4 max-w-2xl border-l-2 pl-4 text-[15px] leading-relaxed ${BORDER[tone]}`}>
        {lead && <span className="font-medium text-white">{lead} </span>}
        <Rich text={children} />
    </p>
);

export const NextOne = ({ onClick, children = "Next one" }: { onClick: () => void; children?: string }) => (
    <button type="button" onClick={onClick} className="group mt-5 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-sm font-medium text-white hover:border-white transition-colors">
        {children} <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
);

// `closed`: the question is settled, by the learner or by showing the answer, which is then marked.
export const Options = ({ options, onPick, picked, closed }: { options: Option[]; onPick: (index: number) => void; picked: Record<number, true>; closed: boolean }) => (
    <div className="mt-5 flex flex-wrap gap-2.5">
        {options.map((option, i) => {
            const chosen = picked[i];
            const state = option.correct && closed ? (chosen ? "border-[#20B8A8] text-white" : "border-accent text-white") : chosen ? "border-[#E955A8]/60 text-white/45" : closed ? "border-white/10 text-white/35" : "border-white/25 text-white hover:border-white";
            return (
                <button key={option.label} type="button" disabled={closed || chosen} onClick={() => onPick(i)} className={`rounded-sm border px-4 py-2.5 text-left text-sm transition-colors ${state}`}>
                    {option.label}
                </button>
            );
        })}
    </div>
);

export const Timeframes = ({ list, value, onChange }: { list: Timeframe[]; value: Timeframe; onChange: (next: Timeframe) => void }) => (
    <div className="mb-3 flex gap-x-4 text-xs font-medium" role="group" aria-label="Timeframe">
        {list.map((item) => (
            <button key={item} type="button" aria-pressed={value === item} onClick={() => onChange(item)} className={`nav-link pb-0.5 ${value === item ? "is-active" : ""}`}>
                {item === "1d" ? "1 day" : item === "1h" ? "1 hour" : item.replace("m", " minutes")}
            </button>
        ))}
    </div>
);

