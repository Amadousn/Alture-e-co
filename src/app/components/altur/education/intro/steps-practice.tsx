"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SCENARIOS, SOURCE } from "@/utils/education-chart-data";
import { FEE_RATE, Plan, planIssue, ratio, resolve, rewardPerUnit, riskPerUnit, Side, VIRTUAL_RISK } from "@/utils/education-sim";
import { JournalEntry, PracticeTrade, usePractice } from "@/utils/education-progress";
import LessonChart from "./lesson-chart";
import { LESSONS, STAGES } from "./course";
import { Done, Feedback, Prompt, STAGE } from "./shared";

const price = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const money = (value: number) => `${value < 0 ? "-" : value > 0 ? "+" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const plain = (value: number) => `$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const primary = "group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit disabled:bg-transparent disabled:text-white/35 disabled:shadow-none disabled:border disabled:border-white/15";
const quiet = "rounded-sm border border-white/30 px-4 py-2.5 text-sm text-white hover:border-white transition-colors";
const span = (candles: number) => (candles * 15 >= 60 ? `${Math.floor((candles * 15) / 60)} h${(candles * 15) % 60 ? ` ${(candles * 15) % 60} min` : ""}` : `${candles * 15} min`);
const SIDE = { long: "Long", short: "Short", out: "Stayed out" } as const;

// What the trade came to, in words, from its own numbers.
export function outcomeText(trade: PracticeTrade) {
    const moved = `Over the ${span(SCENARIOS.find((item) => item.id === trade.scenario)?.next.length ?? 24)} that followed, price went from ${price(trade.after.from)} to ${price(trade.after.end)}, between a low of ${price(trade.after.low)} and a high of ${price(trade.after.high)}.`;
    if (trade.side === "out") return `You stayed out. ${moved}`;
    if (trade.result === "unfilled") return `Price never traded at your entry of ${price(trade.entry!)}, so the order was not filled and there was no trade. ${moved}`;
    const sums = `Gross ${money(trade.gross)} on ${trade.size.toFixed(4)} BTC, which is ${Math.abs(trade.r).toFixed(2)} times the ${plain(VIRTUAL_RISK)} risked; fees ${plain(trade.fees)}; net ${money(trade.net)}.`;
    if (trade.result === "target") return `Your take profit at ${price(trade.exit!)} was reached after ${span((trade.bars ?? 0) + 1)}. ${sums}`;
    if (trade.result === "stop") return `Your stop loss at ${price(trade.exit!)} was reached after ${span((trade.bars ?? 0) + 1)}. ${sums}`;
    return `Neither level was reached in the time shown. Valued at the last close, ${price(trade.exit!)}, the position is ${trade.gross >= 0 ? "ahead" : "behind"}. ${sums}`;
}

// ---------- sim: a decision on historical candles, then what came next ----------

type Phase = "observe" | "side" | "plan" | "reveal" | "result";
const WORD = { entry: "Entry", stop: "Stop loss", target: "Take profit" } as const;

export const Sim = ({ onDone }: { onDone: Done }) => {
    const { practice, ready, setLast } = usePractice();
    const [pick, setPick] = useState<number | null>(null);
    // A learner who comes back gets the next chart, not the one they have already seen the end of.
    const index = pick ?? (ready ? practice.journal.length % SCENARIOS.length : 0);
    const scenario = SCENARIOS[index];
    const seen = scenario.seen;
    const lastClose = seen[seen.length - 1].c;
    const [phase, setPhase] = useState<Phase>("observe");
    const [side, setSide] = useState<Side | "out" | null>(null);
    const [levels, setLevels] = useState<{ entry: number; stop: number | null; target: number | null }>({ entry: lastClose, stop: null, target: null });
    const [placing, setPlacing] = useState<"entry" | "stop" | "target">("stop");
    const [revealed, setRevealed] = useState(0);
    const saved = useRef(false);

    const plan: Plan | null = side && side !== "out" && levels.stop !== null && levels.target !== null ? { side, entry: levels.entry, stop: levels.stop, target: levels.target } : null;
    const issue = side && side !== "out" ? planIssue({ side, entry: levels.entry, stop: levels.stop ?? NaN, target: levels.target ?? NaN }) : null;
    const outcome = useMemo(() => (plan && !issue ? resolve(plan, lastClose, scenario.next) : null), [plan, issue, lastClose, scenario]);
    // The candles shown stop where the trade ended, with two more for context; a learner who stayed out sees them all.
    const stopAt = side === "out" || !outcome || outcome.exitAt === null || outcome.result === "open" ? scenario.next.length : Math.min(scenario.next.length, outcome.exitAt + 3);

    const restart = (next: number) => {
        setPick(next);
        setPhase("observe");
        setSide(null);
        setLevels({ entry: SCENARIOS[next].seen[SCENARIOS[next].seen.length - 1].c, stop: null, target: null });
        setPlacing("stop");
        setRevealed(0);
        saved.current = false;
    };
    // The entry follows the chart being shown until the learner sets their own.
    useEffect(() => {
        if (phase === "observe") setLevels({ entry: lastClose, stop: null, target: null });
    }, [lastClose, phase]);

    // The candles that came next are shown one at a time, and only after the decision.
    useEffect(() => {
        if (phase !== "reveal") return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setRevealed(stopAt);
        if (revealed >= stopAt) return setPhase("result");
        const id = window.setTimeout(() => setRevealed((count) => count + 1), 420);
        return () => window.clearTimeout(id);
    }, [phase, revealed, stopAt]);
    useEffect(() => {
        if (phase === "reveal" && revealed >= stopAt) setPhase("result");
    }, [phase, revealed, stopAt]);

    const trade: PracticeTrade | null = useMemo(() => {
        if (!side) return null;
        const next = scenario.next;
        const after = { from: lastClose, end: next[next.length - 1].c, high: Math.max(...next.map((candle) => candle.h)), low: Math.min(...next.map((candle) => candle.l)) };
        const base = { id: `${scenario.id}-${side}`, at: 0, scenario: scenario.id, when: scenario.when, after };
        if (side === "out") return { ...base, side, entry: null, stop: null, target: null, result: "out", exit: null, size: 0, gross: 0, fees: 0, net: 0, r: 0, bars: null };
        if (!plan || !outcome) return null;
        return { ...base, side, entry: plan.entry, stop: plan.stop, target: plan.target, result: outcome.result, exit: outcome.exit, size: outcome.size, gross: outcome.gross, fees: outcome.fees, net: outcome.net, r: outcome.r, bars: outcome.exitAt };
    }, [side, plan, outcome, scenario, lastClose]);

    useEffect(() => {
        if (phase !== "result" || !trade || saved.current) return;
        saved.current = true;
        setLast({ ...trade, id: `${trade.id}-${Date.now()}`, at: Date.now() });
        onDone(1);
    }, [phase, trade, setLast, onDone]);

    const later = phase === "reveal" || phase === "result";
    const candles = later ? [...seen, ...scenario.next] : seen;
    const drawn = [
        ...(side && side !== "out" && (phase === "plan" || later) ? [{ price: levels.entry, label: "Entry", tone: "entry" as const }] : []),
        ...(levels.stop !== null && side !== "out" ? [{ price: levels.stop, label: "Stop loss", tone: "stop" as const }] : []),
        ...(levels.target !== null && side !== "out" ? [{ price: levels.target, label: "Take profit", tone: "target" as const }] : []),
    ];

    return (
        <div>
            <LessonChart
                className={STAGE}
                note={`${SOURCE} · 15-minute candles · ${scenario.when}, UTC · historical. A simulation: no order is placed.`}
                view={{ candles, minutes: 15, shown: later ? seen.length + revealed : undefined, start: later ? seen.length : undefined, levels: drawn }}
                onPrice={phase === "plan" ? (value) => setLevels((current) => ({ ...current, [placing]: Math.round(value * 10) / 10 })) : undefined}
            />

            <div className="mt-5">
                {phase === "observe" && (
                    <div className="cockpit-rise">
                        <Prompt>{`This is Bitcoin on ${scenario.when}: real candles, stopped at one moment. Look at it as you have learned to.`}</Prompt>
                        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">Where are the swing highs and lows? Is it trending or moving sideways? Is price near an area where it has turned before? What happens next is hidden until you decide.</p>
                        <button type="button" onClick={() => setPhase("side")} className={`${primary} mt-6`}>
                            I have looked: decide
                            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </button>
                    </div>
                )}

                {phase === "side" && (
                    <div className="cockpit-rise">
                        <Prompt>What do you do at this price?</Prompt>
                        <div className="mt-5 grid gap-3 sm:grid-cols-3">
                            {(
                                [
                                    ["long", "Go long", "You profit if price rises, and lose if it falls."],
                                    ["short", "Go short", "You profit if price falls, and lose if it rises."],
                                    ["out", "Stay out", "No position. Not trading is a decision too."],
                                ] as const
                            ).map(([value, name, text]) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        setSide(value);
                                        if (value === "out") {
                                            setRevealed(0);
                                            setPhase("reveal");
                                        } else setPhase("plan");
                                    }}
                                    className="rounded-sm border border-white/25 px-5 py-4 text-left transition-colors hover:border-white"
                                >
                                    <span className="block text-base font-medium text-white">{name}</span>
                                    <span className="mt-1 block text-sm leading-relaxed text-white/55">{text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {phase === "plan" && side && side !== "out" && (
                    <div className="cockpit-rise grid gap-x-12 gap-y-6 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <Prompt>{`You are going ${side}. Choose a level below, then click the chart to place it.`}</Prompt>
                            <div className="mt-4" role="group" aria-label="Levels">
                                {(["entry", "stop", "target"] as const).map((key) => (
                                    <button key={key} type="button" aria-pressed={placing === key} onClick={() => setPlacing(key)} className={`grid w-full grid-cols-[7.5rem_1fr_auto] items-baseline gap-x-4 border-t border-white/15 py-3 text-left transition-colors last:border-b ${placing === key ? "bg-white/[0.05]" : "hover:bg-white/[0.03]"}`}>
                                        <span className={`text-sm font-medium ${placing === key ? "text-accent" : "text-white"}`}>{WORD[key]}</span>
                                        <span className="text-[13px] leading-snug text-white/50">{key === "entry" ? "Where the position opens. It starts at the current price." : key === "stop" ? "Where the position is closed at a loss: the price that proves the idea wrong." : "Where the position is closed at a profit."}</span>
                                        <span className="text-sm tabular-nums text-white">{levels[key] !== null ? price(levels[key]!) : "not set"}</span>
                                    </button>
                                ))}
                            </div>
                            {levels.entry !== lastClose && (
                                <button type="button" onClick={() => setLevels((current) => ({ ...current, entry: lastClose }))} className="mt-3 border-b border-white/25 text-[13px] text-white/70 hover:border-white hover:text-white">
                                    Enter at the current price instead ({price(lastClose)})
                                </button>
                            )}
                        </div>
                        <div className="lg:col-span-5">
                            {plan && !issue ? (
                                <dl className="space-y-2.5 text-sm">
                                    {(
                                        [
                                            ["Risk per bitcoin", plain(riskPerUnit(plan))],
                                            ["Reward per bitcoin", plain(rewardPerUnit(plan))],
                                            ["Reward-to-risk", `${ratio(plan).toFixed(2)} for each 1 risked`],
                                            ["Virtual amount risked", plain(VIRTUAL_RISK)],
                                            ["Position size", `${(VIRTUAL_RISK / riskPerUnit(plan)).toFixed(4)} BTC`],
                                        ] as const
                                    ).map(([term, value]) => (
                                        <div key={term} className="flex items-baseline justify-between gap-4">
                                            <dt className="text-white/50">{term}</dt>
                                            <dd className="tabular-nums text-white">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            ) : (
                                <p className="text-sm leading-relaxed text-white/55">{issue}</p>
                            )}
                            {plan && !issue && <p className="mt-3 text-[13px] leading-relaxed text-white/40">The size is worked out so that being stopped loses {plain(VIRTUAL_RISK)}, before fees of {(FEE_RATE * 100).toFixed(2)}% on the way in and on the way out. If your entry is not the current price, the order waits until price trades there.</p>}
                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <button
                                    type="button"
                                    disabled={!plan || Boolean(issue)}
                                    onClick={() => {
                                        setRevealed(0);
                                        setPhase("reveal");
                                    }}
                                    className={primary}
                                >
                                    Confirm the virtual trade
                                </button>
                                <button type="button" onClick={() => setPhase("side")} className="text-sm text-white/55 hover:text-white">
                                    Change direction
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {phase === "reveal" && (
                    <div className="cockpit-rise flex flex-wrap items-center justify-between gap-4">
                        <Prompt>{`What price did next: candle ${Math.min(revealed + 1, stopAt)} of ${stopAt}.`}</Prompt>
                        <button type="button" onClick={() => setRevealed(stopAt)} className={quiet}>
                            Show the result now
                        </button>
                    </div>
                )}

                {phase === "result" && trade && (
                    <div className="cockpit-rise">
                        <p className={label}>{trade.side === "out" ? "You stayed out" : `${SIDE[trade.side]} · simulated`}</p>
                        {trade.side !== "out" && trade.result !== "unfilled" && <p className={`mt-3 font-logo text-5xl font-light leading-none tabular-nums ${trade.net >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{money(trade.net)}</p>}
                        <Feedback tone={trade.side === "out" || trade.result === "unfilled" ? "plain" : trade.net >= 0 ? "good" : "bad"}>{outcomeText(trade)}</Feedback>
                        {trade.result === "stop" && <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-white/40">If a single candle reaches both the stop loss and the take profit, the stop loss is counted first: a candle cannot say which came first.</p>}
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <p className="text-sm text-white/55">Continue to review this decision, or</p>
                            <button type="button" onClick={() => restart((index + 1) % SCENARIOS.length)} className={quiet}>
                                Try another chart
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// ---------- simreview: what the decision rested on, and the journal entry ----------

function observations(trade: PracticeTrade): string[] {
    const scenario = SCENARIOS.find((item) => item.id === trade.scenario);
    if (!scenario) return [];
    const seen = scenario.seen;
    const lines: string[] = [];
    const reading = scenario.reading;
    lines.push(reading === "up" ? "Before you decided, the last swing highs and swing lows on the chart were each higher than the one before: an uptrend." : reading === "down" ? "Before you decided, the last swing highs and swing lows on the chart were each lower than the one before: a downtrend." : "Before you decided, the chart's swing highs and swing lows were not stepping in one direction: it was moving sideways, without a clear trend.");
    if (trade.side === "out") {
        lines.push(reading === "sideways" ? "You stayed out. With no clear structure to lean on, that is a sound decision, whatever price did afterwards." : `You stayed out. That costs nothing, although the structure was leaning ${reading}.`);
        return lines;
    }
    const withIt = (trade.side === "long" && reading === "up") || (trade.side === "short" && reading === "down");
    lines.push(reading === "sideways" ? `You went ${trade.side} without a trend to lean on. Staying out would also have been a sound decision here.` : withIt ? `You went ${trade.side}, in the direction of that structure.` : `You went ${trade.side}, against that structure.`);
    const kind = trade.side === "long" ? "low" : "high";
    const swing = [...scenario.pivots].reverse().find((pivot) => pivot.kind === kind);
    if (swing && trade.stop !== null) {
        const level = kind === "low" ? seen[swing.i].l : seen[swing.i].h;
        const beyond = kind === "low" ? trade.stop < level : trade.stop > level;
        lines.push(beyond ? `Your stop loss was beyond the last swing ${kind} (${price(level)}): price had to break that swing to stop you.` : `Your stop loss was inside the last swing ${kind} (${price(level)}): an ordinary move back to that swing would have stopped you before the structure had changed.`);
    }
    if (trade.entry !== null && trade.stop !== null && trade.target !== null) {
        const rr = Math.abs(trade.target - trade.entry) / Math.abs(trade.entry - trade.stop);
        lines.push(`You aimed to make ${rr.toFixed(2)} for each 1 you risked.${rr < 1 ? " That is less than you risked: such a trade has to win more often than it loses just to break even." : ""}`);
        if (trade.result !== "unfilled") lines.push(`Fees came to ${plain(trade.fees)} on a position of ${trade.size.toFixed(4)} BTC. The closer the stop loss, the larger the position for the same risk, and the more the fees weigh.`);
    }
    return lines;
}

const REASONS = { trade: ["The trend", "A support or resistance area", "The last few candles", "A feeling"], out: ["No clear structure", "Price was too close to an area", "I was not sure", "A feeling"] };

export const SimReview = ({ onDone, onBack }: { onDone: Done; onBack: () => void }) => {
    const { practice, ready, record } = usePractice();
    const [reason, setReason] = useState("");
    const [again, setAgain] = useState("");
    const [note, setNote] = useState("");
    const trade = practice.last;
    const recorded = Boolean(trade && practice.journal.some((entry) => entry.id === trade.id));

    if (!ready) return null;
    if (!trade)
        return (
            <div className="max-w-2xl">
                <Prompt>There is no decision to review yet.</Prompt>
                <button type="button" onClick={onBack} className={`${quiet} mt-5`}>
                    Take the simulated trade first
                </button>
            </div>
        );

    return (
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
                <p className={label}>
                    {SIDE[trade.side]} · Bitcoin, {trade.when} · simulated
                </p>
                <p className="mt-3 text-[15px] md:text-base leading-relaxed text-white">{outcomeText(trade)}</p>
                <p className={`${label} mt-8`}>What your decision rested on</p>
                <ul className="mt-4 space-y-3.5">
                    {observations(trade).map((line) => (
                        <li key={line} className="flex gap-3.5 text-[15px] leading-relaxed text-white/80">
                            <span className="mt-[10px] h-1 w-1 flex-shrink-0 rounded-full bg-accent" aria-hidden="true" />
                            {line}
                        </li>
                    ))}
                </ul>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/45">One trade proves little either way. A sound decision can lose and a poor one can win; what can be judged is the reasoning, and that is what a journal is for.</p>
            </div>

            <div className="lg:col-span-5">
                <p className={label}>Record it in your practice journal</p>
                {recorded ? (
                    <div className="cockpit-rise">
                        <Feedback tone="good">Recorded. You will find it in your practice journal, in the Review stage.</Feedback>
                        <button type="button" onClick={onBack} className={`${quiet} mt-5`}>
                            Take another chart
                        </button>
                    </div>
                ) : (
                    <form
                        className="mt-4 space-y-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (!reason || !again) return;
                            record({ ...trade, reason, again, note: note.trim() } as JournalEntry);
                            onDone(1);
                        }}
                    >
                        <fieldset>
                            <legend className="text-sm text-white">What was your main reason?</legend>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                {(trade.side === "out" ? REASONS.out : REASONS.trade).map((choice) => (
                                    <button key={choice} type="button" aria-pressed={reason === choice} onClick={() => setReason(choice)} className={`rounded-sm border px-3.5 py-2 text-sm transition-colors ${reason === choice ? "border-white text-white lit" : "border-white/25 text-white/70 hover:border-white"}`}>
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm text-white">Knowing only what you knew then, would you decide the same way again?</legend>
                            <div className="mt-2.5 flex flex-wrap gap-2">
                                {["Yes", "No", "Not sure"].map((choice) => (
                                    <button key={choice} type="button" aria-pressed={again === choice} onClick={() => setAgain(choice)} className={`rounded-sm border px-3.5 py-2 text-sm transition-colors ${again === choice ? "border-white text-white lit" : "border-white/25 text-white/70 hover:border-white"}`}>
                                        {choice}
                                    </button>
                                ))}
                            </div>
                        </fieldset>
                        <label className="block">
                            <span className="text-sm text-white">A note to yourself (optional)</span>
                            <textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} maxLength={280} className="mt-2 block !w-full !rounded-sm !border !border-white/25 !bg-transparent !px-3 !py-2 !text-sm !text-white placeholder:!text-white/30 focus:!border-white focus:!outline-none" placeholder="What would you look at more carefully next time?" />
                        </label>
                        <button type="submit" disabled={!reason || !again} className={primary}>
                            Record in my practice journal
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

// ---------- journal: the learner's own practice entries ----------

export const Journal = ({ onDone, onPractice }: { onDone: Done; onPractice: () => void }) => {
    const { practice, ready } = usePractice();
    const [open, setOpen] = useState<string | null>(null);
    if (!ready) return null;
    const entries = practice.journal;
    return (
        <div className="max-w-4xl">
            <Prompt>{entries.length === 0 ? "Your practice journal is empty." : "Open an entry to read it again."}</Prompt>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">A demonstration journal for the simulated trades of this Introduction, kept in this browser. Nothing in it is a real trade.</p>
            {entries.length === 0 ? (
                <button type="button" onClick={onPractice} className={`${quiet} mt-6`}>
                    Take a simulated trade
                </button>
            ) : (
                <ul className="mt-7 border-b border-white/15">
                    {entries.map((entry) => {
                        const active = open === entry.id;
                        return (
                            <li key={entry.id} className="border-t border-white/15">
                                <button
                                    type="button"
                                    aria-expanded={active}
                                    onClick={() => {
                                        setOpen(active ? null : entry.id);
                                        onDone(1);
                                    }}
                                    className="grid w-full grid-cols-[1fr_auto] items-baseline gap-x-6 py-3.5 text-left transition-colors hover:bg-white/[0.03] sm:grid-cols-[9rem_1fr_auto]"
                                >
                                    <span className="hidden text-sm text-white/45 sm:block">Chart of {entry.when}</span>
                                    <span className="text-[15px] text-white">
                                        {SIDE[entry.side]}
                                        <span className="ml-3 text-sm text-white/45">{entry.reason}</span>
                                    </span>
                                    <span className={`text-sm tabular-nums ${entry.side === "out" || entry.result === "unfilled" ? "text-white/45" : entry.net >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{entry.side === "out" ? "No trade" : entry.result === "unfilled" ? "Not filled" : money(entry.net)}</span>
                                </button>
                                {active && (
                                    <div className="cockpit-rise pb-6 pt-1">
                                        <p className="max-w-2xl text-[15px] leading-relaxed text-white/80">{outcomeText(entry)}</p>
                                        <dl className="mt-4 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-3">
                                            {(
                                                [
                                                    ["Entry", entry.entry !== null ? price(entry.entry) : "none"],
                                                    ["Stop loss", entry.stop !== null ? price(entry.stop) : "none"],
                                                    ["Take profit", entry.target !== null ? price(entry.target) : "none"],
                                                    ["Reason", entry.reason],
                                                    ["Same decision again", entry.again],
                                                    ["Recorded", new Date(entry.at).toLocaleDateString(undefined, { day: "numeric", month: "short" })],
                                                ] as const
                                            ).map(([term, value]) => (
                                                <div key={term}>
                                                    <dt className="text-white/45">{term}</dt>
                                                    <dd className="tabular-nums text-white">{value}</dd>
                                                </div>
                                            ))}
                                        </dl>
                                        {entry.note && <p className="mt-4 max-w-2xl border-l-2 border-white/25 pl-4 text-sm leading-relaxed text-white/75">{entry.note}</p>}
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
            {entries.length > 0 && (
                <button type="button" onClick={onPractice} className={`${quiet} mt-6`}>
                    Take another simulated trade
                </button>
            )}
        </div>
    );
};

// ---------- finish: what the Introduction covered, and where it leads ----------

export const Finish = ({ done }: { done: Record<string, number> }) => {
    const { practice } = usePractice();
    const recaps = LESSONS.flatMap((lesson) => lesson.steps.filter((step) => step.kind === "recap").map((step) => ({ lesson, step: step as Extract<(typeof lesson.steps)[number], { kind: "recap" }> })));
    const exercises = LESSONS.flatMap((lesson) => lesson.steps).filter((step) => ["pick", "choice", "rounds", "ohlc", "zone", "sort", "compare"].includes(step.kind));
    const answered = exercises.filter((step) => done[step.id]);
    const first = answered.filter((step) => done[step.id] === 1).length;
    return (
        <div>
            <p className="max-w-2xl text-[15px] md:text-base leading-relaxed text-white/70">
                You began with what a bitcoin is and ended by planning a trade on a real chart and reviewing your own decision.
                {answered.length > 0 && ` Of the ${answered.length} exercises you did, you answered ${first} correctly at the first attempt.`}
                {practice.journal.length > 0 && ` Your practice journal holds ${practice.journal.length} ${practice.journal.length === 1 ? "entry" : "entries"}.`}
            </p>

            <div className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <p className={label}>The journey</p>
                    <ul className="mt-4 space-y-4">
                        {STAGES.map((stage) => (
                            <li key={stage.id}>
                                <span className="block text-[15px] font-medium text-white">
                                    {stage.word} <span className="font-normal text-white/45">· {stage.topic}</span>
                                </span>
                                <span className="mt-0.5 block text-sm leading-relaxed text-white/60">{stage.line}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-7">
                    <p className={label}>Key terms, by topic</p>
                    <div className="mt-3 border-b border-white/15">
                        {recaps.map(({ lesson, step }) => (
                            <details key={step.id} className="group border-t border-white/15">
                                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 py-3 text-[15px] text-white hover:text-white">
                                    {lesson.title}
                                    <span className="text-xs text-white/40 group-open:hidden">{step.terms.length} terms</span>
                                </summary>
                                <dl className="grid gap-x-10 gap-y-3 pb-5 sm:grid-cols-2">
                                    {step.terms.map(([term, text]) => (
                                        <div key={term}>
                                            <dt className="text-sm font-medium" style={{ color: "#E9DCC3" }}>
                                                {term}
                                            </dt>
                                            <dd className="mt-0.5 text-[13px] leading-relaxed text-white/60">{text}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </details>
                        ))}
                    </div>
                </div>
            </div>

            <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-white/70">The seven modules of the programme build on this, from setting up to trading for real. They open once you are in the programme.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4">
                <Link href="/contact" className="group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3.5 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit">
                    Request access
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/education/programme" className="border-b border-white/30 pb-1 text-sm font-medium text-white hover:border-white transition-colors">
                    See the seven modules
                </Link>
                <Link href="/education/dashboard" className="border-b border-white/30 pb-1 text-sm font-medium text-white hover:border-white transition-colors">
                    Back to the dashboard
                </Link>
            </div>
            <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-white/40">Every chart in this Introduction was a historical Bitcoin chart, and every trade a simulation. Nothing here is financial advice, a recommendation to trade, or a promise of results.</p>
        </div>
    );
};
