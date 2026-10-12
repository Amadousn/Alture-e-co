"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SCENES, SOURCE, Timeframe } from "@/utils/education-chart-data";
import LessonChart, { ChartZone, clock } from "./lesson-chart";
import CandleStage, { CandlePart } from "./candle-stage";
import { candlesOf, ChartStage, LESSONS, Option, Reveal, Stage, Step, timeframeName } from "./course";

const STAGE = "h-[42vh] min-h-[280px] md:h-[50vh] md:min-h-[340px]";
// How a step was finished: 1 = right the first time, 2 = right on the second try, 3 = the answer was shown.
type Done = (tries: number) => void;
type Tone = "good" | "bad" | "plain" | "shown";
// A learner gets two tries at any question; after the second miss the answer is shown and explained.
const TRIES = 2;
const reason = (text: string) => text.replace(/^Yes\.\s*/, "");
const retry = (text: string) => `Not quite. ${text} One more try.`;

// The vocabulary the Introduction teaches, marked in a quiet warm beige: each term once per passage, and never many at once.
const TERMS = ["reading the chart", "price movement", "market structure", "volume profile", "support and resistance", "higher highs", "higher lows", "lower highs", "lower lows", "swing highs", "swing high", "swing lows", "swing low", "upper wick", "lower wick", "candlesticks", "candlestick", "timeframes", "timeframe", "resistance", "support", "uptrend", "downtrend", "trend", "range", "breakout", "retest", "momentum", "indecision", "decision", "pullback", "buyers", "buyer", "sellers", "seller", "bullish", "bearish", "body", "wicks", "wick"];
const TERM = new RegExp(`\\b(${TERMS.join("|")})\\b`, "gi");
const stem = (word: string) => word.toLowerCase().replace(/s$/, "");
export const Rich = ({ text }: { text: string }) => {
    const seen = new Set<string>();
    const parts: React.ReactNode[] = [];
    let last = 0;
    for (const match of text.matchAll(TERM)) {
        const key = stem(match[0]);
        if (seen.has(key) || seen.size >= 3) continue;
        seen.add(key);
        parts.push(text.slice(last, match.index), <span key={match.index} className="edu-key">{match[0]}</span>);
        last = match.index! + match[0].length;
    }
    parts.push(text.slice(last));
    return <>{parts}</>;
};

// ---------- shared pieces ----------

type ChartExtras = { timeframe?: Timeframe; focus?: number[]; zones?: ChartZone[]; axis?: "price" | "time" | null; rings?: Record<number, "good" | "bad" | "shown" | "pin">; onCandle?: (index: number) => void; onAxis?: (axis: "price" | "time") => void; onPrice?: (price: number) => void };

// What one candle says, in plain words, from its own four prices.
function describe(candle: { t: number; o: number; h: number; l: number; c: number }) {
    const bull = candle.c >= candle.o;
    const body = Math.abs(candle.c - candle.o);
    const upper = candle.h - Math.max(candle.o, candle.c);
    const lower = Math.min(candle.o, candle.c) - candle.l;
    const range = candle.h - candle.l || 1;
    const reading = body < range * 0.25 ? "A small body: neither buyers nor sellers kept much ground." : upper > body * 1.15 && upper >= lower ? "The upper wick is longer than the body: higher prices were reached and given back." : lower > body * 1.15 ? "The lower wick is longer than the body: lower prices were reached and given back." : bull ? "Buyers kept most of what they gained." : "Sellers kept most of what they gained.";
    const usd = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    return `${clock(candle.t)} UTC · ${bull ? "Bullish" : "Bearish"}: opened ${usd(candle.o)}, high ${usd(candle.h)}, low ${usd(candle.l)}, closed ${usd(candle.c)}. Body $${usd(body)}, upper wick $${usd(upper)}, lower wick $${usd(lower)}. ${reading}`;
}

const ChartOf = ({ stage, extra = {} }: { stage: ChartStage; extra?: ChartExtras }) => {
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
                className={STAGE}
                note={`${SOURCE} · ${timeframeName(timeframe)} · ${SCENES[stage.scene].when}, UTC · historical`}
                view={{ candles: data.candles, minutes: data.minutes, shown: stage.shown, focus: extra.focus ?? stage.focus, marks: native ? stage.marks : undefined, path: native && stage.path, zones: [...(native ? stage.zones ?? [] : []), ...(extra.zones ?? [])], axis: extra.axis ?? stage.axis, rings: pinned !== null ? { ...extra.rings, [pinned]: "pin" } : extra.rings }}
                onCandle={extra.onCandle ?? (inspect ? (index) => setPin((current) => (current === index ? null : index)) : undefined)}
                onAxis={extra.onAxis}
                onPrice={extra.onPrice}
            />
            {inspect && (
                <p className="mt-2 min-h-[2.6rem] text-[13px] leading-snug text-white/55" aria-live="polite">
                    {pinned !== null ? <Rich text={describe(data.candles[pinned])} /> : <span className="text-white/35">Select any candle to inspect it.</span>}
                </p>
            )}
        </div>
    );
};

const StageOf = ({ stage }: { stage: Stage }) => (stage.kind === "chart" ? <ChartOf stage={stage} /> : <CandleStage className={STAGE} spec={{ kind: stage.candle, progress: stage.progress, ms: stage.ms, show: stage.show, focus: stage.focus }} />);

const Prompt = ({ children }: { children: string }) => (
    <p className="text-lg md:text-xl font-medium leading-snug tracking-tight text-white">
        <Rich text={children} />
    </p>
);

const BORDER: Record<Tone, string> = { good: "border-[#20B8A8] text-white", bad: "border-[#E955A8] text-white/85", plain: "border-white/25 text-white/75", shown: "border-accent text-white" };
const Feedback = ({ tone, lead, children }: { tone: Tone; lead?: string; children: string }) => (
    <p key={`${lead}${children}`} role="status" className={`cockpit-rise mt-4 max-w-2xl border-l-2 pl-4 text-[15px] leading-relaxed ${BORDER[tone]}`}>
        {lead && <span className="font-medium text-white">{lead} </span>}
        <Rich text={children} />
    </p>
);

const NextOne = ({ onClick, children = "Next one" }: { onClick: () => void; children?: string }) => (
    <button type="button" onClick={onClick} className="group mt-5 inline-flex items-center gap-2 border-b border-white/30 pb-0.5 text-sm font-medium text-white hover:border-white transition-colors">
        {children} <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </button>
);

// `closed`: the question is settled, by the learner or by showing the answer, which is then marked.
const Options = ({ options, onPick, picked, closed }: { options: Option[]; onPick: (index: number) => void; picked: Record<number, true>; closed: boolean }) => (
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

const Timeframes = ({ list, value, onChange }: { list: Timeframe[]; value: Timeframe; onChange: (next: Timeframe) => void }) => (
    <div className="mb-3 flex gap-x-4 text-xs font-medium" role="group" aria-label="Timeframe">
        {list.map((item) => (
            <button key={item} type="button" aria-pressed={value === item} onClick={() => onChange(item)} className={`nav-link pb-0.5 ${value === item ? "is-active" : ""}`}>
                {item === "1h" ? "1 hour" : item.replace("m", " minutes")}
            </button>
        ))}
    </div>
);

// ---------- film: a short explanation that plays like a video ----------

const BeatTimer = ({ ms, playing, onEnd }: { ms: number; playing: boolean; onEnd: () => void }) => {
    const bar = useRef<HTMLSpanElement>(null);
    const elapsed = useRef(0);
    const end = useRef(onEnd);
    end.current = onEnd;
    useEffect(() => {
        if (!playing) return;
        let frame = 0;
        let last = performance.now();
        const tick = (now: number) => {
            elapsed.current += now - last;
            last = now;
            if (bar.current) bar.current.style.width = `${Math.min(100, (elapsed.current / ms) * 100)}%`;
            if (elapsed.current >= ms) return end.current();
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [playing, ms]);
    return <span ref={bar} className="block h-full bg-white" style={{ width: "0%" }} />;
};

const Film = ({ step, onDone }: { step: Extract<Step, { kind: "film" }>; onDone: Done }) => {
    const last = step.beats.length - 1;
    const [beat, setBeat] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [ended, setEnded] = useState(false);
    // The film starts by itself, unless the learner prefers no motion: then they step through it.
    useEffect(() => setPlaying(!window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

    const finish = () => {
        setPlaying(false);
        setEnded(true);
        onDone(1);
    };
    const jump = (index: number) => {
        setEnded(false);
        setBeat(index);
        if (index === last && !playing) onDone(1);
    };
    const current = step.beats[beat];

    return (
        <div>
            <StageOf stage={current.stage} />
            <p key={beat} className="cockpit-rise mt-5 min-h-[3.5rem] max-w-3xl text-lg md:text-xl font-medium leading-snug tracking-tight text-white">
                <Rich text={current.caption} />
            </p>
            <div className="mt-4 flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => {
                        if (ended) {
                            setEnded(false);
                            setBeat(0);
                            setPlaying(true);
                        } else setPlaying((value) => !value);
                    }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/35 text-white hover:border-white transition-colors"
                    aria-label={ended ? "Replay" : playing ? "Pause" : "Play"}
                >
                    {ended ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 0 2.6-5.9M4 4v4.5h4.5" /></svg>
                    ) : playing ? (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><rect x="7" y="6" width="3.2" height="12" /><rect x="13.8" y="6" width="3.2" height="12" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M8.5 6v12l10-6z" /></svg>
                    )}
                </button>
                <div className="flex flex-1 gap-1.5" role="group" aria-label="Parts of this explanation">
                    {step.beats.map((item, i) => (
                        <button key={i} type="button" onClick={() => jump(i)} aria-label={`Part ${i + 1} of ${step.beats.length}`} aria-current={i === beat} className="group flex-1 py-2.5">
                            <span className="block h-[3px] overflow-hidden rounded-full bg-white/15 group-hover:bg-white/30 transition-colors">
                                {i < beat || ended ? <span className="block h-full bg-white" /> : i === beat ? <BeatTimer key={beat} ms={item.ms} playing={playing} onEnd={() => (beat === last ? finish() : setBeat(beat + 1))} /> : null}
                            </span>
                        </button>
                    ))}
                </div>
                <span className="flex-shrink-0 text-xs tabular-nums text-white/45">
                    {beat + 1} / {step.beats.length}
                </span>
            </div>
        </div>
    );
};

// ---------- explore: click things to learn what they are ----------

const Explore = ({ step, onDone }: { step: Extract<Step, { kind: "explore" }>; onDone: Done }) => {
    const [found, setFound] = useState<string[]>([]);
    const [open, setOpen] = useState<string | null>(null);
    const [candle, setCandle] = useState<number | null>(null);
    const reveal = (key: string) => {
        setOpen(key);
        if (found.includes(key)) return;
        setFound([...found, key]);
        if (found.length + 1 === step.items.length) onDone(1);
    };
    const item = step.items.find((entry) => entry.key === open);
    const stage = step.stage;

    return (
        <div>
            {stage.kind === "chart" ? (
                <ChartOf
                    stage={stage}
                    extra={{
                        axis: open === "price" || open === "time" ? open : null,
                        focus: candle !== null && (open === "candle" || open === "last") ? [candle] : undefined,
                        onAxis: reveal,
                        onCandle: (index) => {
                            setCandle(index);
                            reveal(index === candlesOf(stage.scene).candles.length - 1 ? "last" : "candle");
                        },
                    }}
                />
            ) : (
                <CandleStage className={STAGE} pick="parts" onPart={reveal} spec={{ kind: stage.candle, show: found as CandlePart[], focus: (open as CandlePart) ?? null }} />
            )}
            <div className="mt-5 grid gap-x-12 gap-y-5 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Prompt>{step.prompt}</Prompt>
                    {item ? (
                        <Feedback tone="plain" lead={`${item.label}.`}>
                            {item.text}
                        </Feedback>
                    ) : (
                        <p className="mt-4 text-sm text-white/45">Nothing is wrong to click here.</p>
                    )}
                </div>
                <ul className="lg:col-span-5 space-y-2 text-sm">
                    {step.items.map((entry) => (
                        <li key={entry.key} className={`flex items-center gap-3 ${found.includes(entry.key) ? "text-white" : "text-white/40"}`}>
                            <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${found.includes(entry.key) ? "border-[#20B8A8]" : "border-white/25"}`} aria-hidden="true">
                                {found.includes(entry.key) && <span className="h-1.5 w-1.5 rounded-full bg-[#20B8A8]" />}
                            </span>
                            {entry.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// ---------- pick: find the right candle or candles ----------

const Pick = ({ step, onDone }: { step: Extract<Step, { kind: "pick" }>; onDone: Done }) => {
    const [rings, setRings] = useState<Record<number, "good" | "bad" | "shown">>({});
    const [message, setMessage] = useState<{ tone: Tone; lead?: string; text: string } | null>(null);
    const [closed, setClosed] = useState(false);
    // Misses since the last candle found, and whether any try was ever missed.
    const strikes = useRef(0);
    const missed = useRef(false);
    const kept = (current: typeof rings) => Object.fromEntries(Object.entries(current).filter(([, value]) => value === "good"));
    const found = (current: typeof rings) => step.answers.filter((answer) => current[answer] === "good");

    const pick = (clicked: number) => {
        if (closed) return;
        // On a narrow screen the candles are a few pixels wide: a tap beside the right candle counts as that candle.
        const reach = window.innerWidth < 640 ? 1 : 0;
        const index = step.answers.includes(clicked) ? clicked : step.answers.find((answer) => Math.abs(answer - clicked) <= reach && rings[answer] !== "good") ?? clicked;
        if (rings[index] === "good") return;
        // A small turn of the kind asked for is real, just not what is meant here: it is explained, and not counted as a miss.
        if (step.minor?.at.includes(index)) return setMessage({ tone: "plain", text: step.minor.text });
        if (step.answers.includes(index)) {
            strikes.current = 0;
            const next = { ...kept(rings), [index]: "good" as const };
            const left = step.any ? 0 : step.answers.length - found(next).length;
            if (left === 0) {
                // One answer was enough: the rest of the run is shown too.
                setRings(step.any ? { ...Object.fromEntries(step.answers.map((answer) => [answer, "shown" as const])), [index]: "good" } : next);
                setMessage({ tone: "good", text: step.right });
                setClosed(true);
                return onDone(missed.current ? 2 : 1);
            }
            setRings(next);
            return setMessage({ tone: "good", text: `Yes. ${left} more to find.` });
        }
        strikes.current += 1;
        missed.current = true;
        if (strikes.current >= TRIES) {
            // Two misses: the answer is marked on the chart and explained.
            setRings({ ...kept(rings), ...Object.fromEntries(step.answers.filter((answer) => rings[answer] !== "good").map((answer) => [answer, "shown" as const])) });
            setMessage({ tone: "shown", lead: step.answers.length - found(rings).length > 1 ? "The answers are marked on the chart." : "The answer is marked on the chart.", text: reason(step.right) });
            setClosed(true);
            return onDone(3);
        }
        setRings({ ...kept(rings), [index]: "bad" });
        setMessage({ tone: "bad", text: retry(step.wrong(index)) });
    };

    return (
        <div>
            <ChartOf stage={step.stage} extra={{ rings, onCandle: pick }} />
            <div className="mt-5">
                <Prompt>{step.prompt}</Prompt>
                {message ? (
                    <Feedback tone={message.tone} lead={message.lead}>
                        {message.text}
                    </Feedback>
                ) : (
                    <p className="mt-4 text-sm text-white/45">Click a candle on the chart.{!step.any && step.answers.length > 1 ? ` There are ${step.answers.length} to find.` : ""}</p>
                )}
            </div>
        </div>
    );
};

// ---------- choice: one question, with the chart in front of you ----------

const Question = ({ stage, prompt, options, timeframes, reveal, onSettled, action }: { stage: Stage; prompt: string; options: Option[]; timeframes?: Timeframe[]; reveal?: Reveal; onSettled: (result: number) => void; action?: React.ReactNode }) => {
    const [picked, setPicked] = useState<Record<number, true>>({});
    const [lastPick, setLastPick] = useState<number | null>(null);
    const [timeframe, setTimeframe] = useState<Timeframe | undefined>(undefined);
    const answer = options.find((option) => option.correct)!;
    const chosen = lastPick !== null ? options[lastPick] : null;
    const wrongs = Object.keys(picked).filter((key) => !options[Number(key)].correct).length;
    const solved = Boolean(chosen?.correct);
    const shown = !solved && wrongs >= TRIES;
    const closed = solved || shown;
    // Once the question is settled, the chart shows what the answer rests on.
    const view = closed && reveal && stage.kind === "chart" ? { ...stage, ...reveal } : stage;
    return (
        <div>
            {timeframes && stage.kind === "chart" && <Timeframes list={timeframes} value={timeframe ?? (closed ? reveal?.timeframe : undefined) ?? stage.timeframe ?? SCENES[stage.scene].timeframe} onChange={setTimeframe} />}
            {view.kind === "chart" ? <ChartOf stage={view} extra={{ timeframe }} /> : <StageOf stage={view} />}
            <div className="mt-5">
                <Prompt>{prompt}</Prompt>
                <Options
                    options={options}
                    picked={picked}
                    closed={closed}
                    onPick={(index) => {
                        const next = { ...picked, [index]: true as const };
                        const misses = Object.keys(next).filter((key) => !options[Number(key)].correct).length;
                        setPicked(next);
                        setLastPick(index);
                        if (options[index].correct) onSettled(misses === 0 ? 1 : 2);
                        else if (misses >= TRIES) onSettled(3);
                    }}
                />
                {shown ? (
                    <Feedback tone="shown" lead={`The answer: ${answer.label}.`}>
                        {reason(answer.feedback)}
                    </Feedback>
                ) : chosen ? (
                    <Feedback tone={chosen.correct ? "good" : "bad"}>{chosen.correct ? chosen.feedback : retry(chosen.feedback)}</Feedback>
                ) : null}
                {closed && action}
            </div>
        </div>
    );
};

const Choice = ({ step, onDone }: { step: Extract<Step, { kind: "choice" }>; onDone: Done }) => <Question stage={step.stage} prompt={step.prompt} options={step.options} timeframes={step.timeframes} reveal={step.reveal} onSettled={onDone} />;

// ---------- rounds: the same kind of question, several times ----------

const Rounds = ({ step, onDone }: { step: Extract<Step, { kind: "rounds" }>; onDone: Done }) => {
    const [round, setRound] = useState(0);
    const worst = useRef(1);
    const last = round === step.rounds.length - 1;
    const item = step.rounds[round];
    return (
        <div>
            <p className="mb-3 text-xs tabular-nums text-white/45">
                {round + 1} of {step.rounds.length}
            </p>
            <Question
                key={round}
                stage={item.stage}
                prompt={item.prompt}
                options={item.options}
                reveal={item.reveal}
                onSettled={(result) => {
                    worst.current = Math.max(worst.current, result);
                    if (last) onDone(worst.current);
                }}
                action={!last && <NextOne onClick={() => setRound(round + 1)} />}
            />
        </div>
    );
};

// ---------- ohlc: select the four prices of a candle ----------

const Ohlc = ({ step, onDone }: { step: Extract<Step, { kind: "ohlc" }>; onDone: Done }) => {
    const [index, setIndex] = useState(0);
    const [named, setNamed] = useState<CandlePart[]>([]);
    const [wrong, setWrong] = useState<CandlePart | null>(null);
    // The part whose answer had to be shown, until the learner moves on.
    const [shown, setShown] = useState<CandlePart | null>(null);
    const [finished, setFinished] = useState(false);
    const strikes = useRef(0);
    const worst = useRef(1);
    const ask = step.asks[index];
    const lastAsk = index === step.asks.length - 1;

    const advance = () => {
        strikes.current = 0;
        setWrong(null);
        setShown(null);
        if (step.asks[index + 1].candle !== ask.candle) setNamed([]);
        setIndex(index + 1);
    };
    const pick = (part: CandlePart) => {
        if (finished || shown || named.includes(part)) return;
        if (part !== ask.part) {
            strikes.current += 1;
            if (strikes.current < TRIES) {
                worst.current = Math.max(worst.current, 2);
                return setWrong(part);
            }
            // Two misses: the price asked for is named on the candle.
            worst.current = 3;
            setWrong(null);
            setShown(ask.part);
            setNamed((list) => [...list, ask.part]);
            if (lastAsk) {
                setFinished(true);
                onDone(worst.current);
            }
            return;
        }
        setWrong(null);
        setNamed((list) => [...list, part]);
        if (lastAsk) {
            setFinished(true);
            return onDone(worst.current);
        }
        window.setTimeout(advance, 900);
    };

    return (
        <div>
            <CandleStage className={STAGE} pick="levels" onPart={pick} spec={{ kind: ask.candle, show: named, ms: 700 }} rings={{ ...Object.fromEntries(named.map((part) => [part, part === shown ? "shown" : "good"])), ...(wrong ? { [wrong]: "bad" } : {}) }} />
            <div className="mt-5">
                <p className="mb-2 text-xs tabular-nums text-white/45">
                    {index + 1} of {step.asks.length}
                </p>
                <Prompt>{ask.prompt}</Prompt>
                {shown ? (
                    <>
                        <Feedback tone="shown" lead={`The ${shown} is marked on the candle.`}>
                            {ask.wrong}
                        </Feedback>
                        {!lastAsk && <NextOne onClick={advance} />}
                    </>
                ) : finished ? (
                    <Feedback tone="good">Yes. Open and close are the two ends of the body; which is which depends on whether the candle rose or fell.</Feedback>
                ) : wrong ? (
                    <Feedback tone="bad">{retry(ask.wrong)}</Feedback>
                ) : (
                    <p className="mt-4 text-sm text-white/45">Click one of the four dotted price lines beside the candle.</p>
                )}
            </div>
        </div>
    );
};

// ---------- zone: mark support or resistance on the chart ----------

const ZoneStep = ({ step, onDone }: { step: Extract<Step, { kind: "zone" }>; onDone: Done }) => {
    const scene = SCENES[step.stage.scene];
    const candles = candlesOf(step.stage.scene).candles;
    const target = scene.zones.find((zone) => zone.kind === step.zone)!;
    const other = scene.zones.find((zone) => zone.kind !== step.zone);
    const [guess, setGuess] = useState<number | null>(null);
    const [state, setState] = useState<"open" | "solved" | "shown">("open");
    const [message, setMessage] = useState<string>("");
    const misses = useRef(0);
    const top = Math.max(...candles.map((candle) => candle.h));
    const bottom = Math.min(...candles.map((candle) => candle.l));
    const half = (top - bottom) * 0.035;
    const slack = (target.to - target.from) * 0.5;

    const mark = (price: number) => {
        if (state !== "open") return;
        setGuess(price);
        if (price >= target.from - slack && price <= target.to + slack) {
            setState("solved");
            setMessage(step.right);
            return onDone(misses.current === 0 ? 1 : 2);
        }
        misses.current += 1;
        if (misses.current >= TRIES) {
            // Two misses: the zone is drawn and explained.
            setState("shown");
            setMessage(reason(step.right));
            return onDone(3);
        }
        const turned = step.zone === "resistance" ? "stopped rising and turned down" : "stopped falling and turned up";
        if (other && price >= other.from - slack && price <= other.to + slack) setMessage(`Price does turn there, but ${other.kind === "support" ? "upward: that is support" : "downward: that is resistance"}. You are looking for where it ${turned}.`);
        else if (price > top) setMessage("Price never traded that high. A zone has to be somewhere price actually went, and turned.");
        else if (price < bottom) setMessage("Price never traded that low. A zone has to be somewhere price actually went, and turned.");
        else if (step.zone === "resistance" ? price < target.from : price > target.to) setMessage(`Price passed through this area without stopping. Look ${step.zone === "resistance" ? "higher" : "lower"}: where it ${turned}, more than once.`);
        else setMessage(`A little too ${step.zone === "resistance" ? "high" : "low"}: only the tip of a wick reached here. Mark where the turns cluster.`);
    };

    const zones: ChartZone[] = state !== "open" ? [{ from: target.from, to: target.to, tone: step.zone, label: step.zone }] : guess !== null ? [{ from: guess - half, to: guess + half, tone: "miss" }] : [];
    return (
        <div>
            <ChartOf stage={step.stage} extra={{ zones, onPrice: mark }} />
            <div className="mt-5">
                <Prompt>{step.prompt}</Prompt>
                {state === "shown" ? (
                    <Feedback tone="shown" lead={`The ${step.zone} is marked on the chart.`}>
                        {message}
                    </Feedback>
                ) : message ? (
                    <Feedback tone={state === "solved" ? "good" : "bad"}>{state === "solved" ? message : retry(message)}</Feedback>
                ) : (
                    <p className="mt-4 text-sm text-white/45">Click anywhere on the chart to place a zone at that price.</p>
                )}
            </div>
        </div>
    );
};

// ---------- summary: what the learner actually did in the final exercise ----------

const Summary = ({ done, onDone }: { done: Record<string, number>; onDone: Done }) => {
    useEffect(() => onDone(1), []); // eslint-disable-line react-hooks/exhaustive-deps
    const tasks = useMemo(() => LESSONS[LESSONS.length - 1].steps.filter((step) => step.kind !== "summary"), []);
    const first = tasks.filter((task) => done[task.id] === 1).length;
    return (
        <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent">Introduction complete</p>
            <p className="mt-4 font-logo text-5xl md:text-6xl font-light leading-none text-white">
                {first} <span className="text-white/40">of {tasks.length}</span>
            </p>
            <p className="mt-3 text-[15px] text-white/60">read correctly on the first try, on a chart you had not seen before.</p>
            <ul className="mt-9 border-b border-white/15">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-baseline justify-between gap-6 border-t border-white/15 py-3.5 text-[15px]">
                        <span className="text-white/85">{"prompt" in task ? task.prompt : task.title}</span>
                        <span className={`flex-shrink-0 text-sm ${done[task.id] === 1 ? "text-[#20B8A8]" : "text-white/55"}`}>{!done[task.id] ? "Not done" : done[task.id] === 1 ? "First try" : done[task.id] === 2 ? "Second try" : "Answer shown"}</span>
                    </li>
                ))}
            </ul>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/60">You can read a chart: its scales, its candles, its swings, its zones and its context. The seven modules that follow build on this, and open once you are in the programme.</p>
            <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-white/40">Every chart in this Introduction was a historical Bitcoin chart, used to practise reading. Nothing here is financial advice or a recommendation to trade Bitcoin.</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/education/dashboard" className="group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit">
                    Back to the dashboard
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/contact" className="border-b border-white/30 pb-1 text-sm font-medium text-white hover:border-white transition-colors">
                    Request access
                </Link>
            </div>
        </div>
    );
};

const StepView = ({ step, done, onDone }: { step: Step; done: Record<string, number>; onDone: Done }) => {
    switch (step.kind) {
        case "film":
            return <Film step={step} onDone={onDone} />;
        case "explore":
            return <Explore step={step} onDone={onDone} />;
        case "pick":
            return <Pick step={step} onDone={onDone} />;
        case "choice":
            return <Choice step={step} onDone={onDone} />;
        case "rounds":
            return <Rounds step={step} onDone={onDone} />;
        case "ohlc":
            return <Ohlc step={step} onDone={onDone} />;
        case "zone":
            return <ZoneStep step={step} onDone={onDone} />;
        case "summary":
            return <Summary done={done} onDone={onDone} />;
    }
};

export default StepView;
