"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ASSETS, Asset, Reading, Scenario, SCENARIOS, suggestion } from "@/utils/education-chart-data";
import { FEE_RATE, LEVERAGES, liquidation, MARGINS, Plan, planIssue, positionValue, priceAt, ratio, rewardPerUnit, riskPerUnit, Side, simulate, sizeOf, START_BALANCE, stopTooFar } from "@/utils/education-sim";
import { JournalEntry, PracticeTrade, usePractice } from "@/utils/education-progress";
import { LESSONS, STAGES } from "./course";
import { Done, Feedback, Prompt } from "./shared";
import ShareTrade from "./share-trade";
import SimChart, { ChartLevel, ChartMark, ChartSwing, SimChartHandle } from "./sim-chart";
import type { TradeCardData } from "./trade-card";

const money = (value: number) => `${value < 0 ? "-" : value > 0 ? "+" : ""}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const plain = (value: number) => `$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (value: number) => `$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const percent = (value: number, digits = 1) => `${value > 0 ? "+" : value < 0 ? "-" : ""}${Math.abs(value * 100).toFixed(digits)}%`;
const label = "text-[11px] uppercase tracking-[0.14em] text-white/45";
const primary = "group inline-flex items-center gap-3 rounded-sm bg-white px-6 py-3 text-sm font-medium text-black hover:bg-[#e4e4e8] transition-colors lit disabled:bg-transparent disabled:text-white/35 disabled:shadow-none disabled:border disabled:border-white/15";
const quiet = "rounded-sm border border-white/30 px-4 py-2.5 text-sm text-white hover:border-white transition-colors";
const choice = (on: boolean) => `rounded-sm border px-3 py-2 text-sm tabular-nums transition-colors disabled:border-white/10 disabled:text-white/25 ${on ? "border-white text-white lit" : "border-white/25 text-white/70 hover:border-white"}`;
const span = (minutes: number) => {
    const total = Math.max(1, Math.round(minutes));
    return total >= 60 ? `${Math.floor(total / 60)} h${total % 60 ? ` ${total % 60} min` : ""}` : `${total} min`;
};
const SIDE = { long: "Long", short: "Short", out: "Stayed out" } as const;
const HEADLINE = { target: "Take profit reached", stop: "Stopped out", liquidated: "Liquidated", open: "Still open at the end", unfilled: "Order not filled", out: "You stayed out" } as const;
const scenarioOf = (id: string) => SCENARIOS.find((item) => item.id === id);
const assetOf = (trade: PracticeTrade): Asset => scenarioOf(trade.scenario)?.asset ?? ASSETS[0];
const priceText = (value: number, asset: Asset) => value.toLocaleString("en-US", { minimumFractionDigits: asset.digits, maximumFractionDigits: asset.digits });

// What the trade came to, in words, from its own numbers.
export function outcomeText(trade: PracticeTrade) {
    const asset = assetOf(trade);
    const price = (value: number) => priceText(value, asset);
    const moved = `Over the six hours that followed, ${asset.name} went from ${price(trade.after.from)} to ${price(trade.after.end)}, between a low of ${price(trade.after.low)} and a high of ${price(trade.after.high)}.`;
    if (trade.side === "out") return `You stayed out. ${moved}`;
    if (trade.result === "unfilled") return `Price never traded at your entry of ${price(trade.entry!)}, so the order was not filled and there was no trade. ${moved}`;
    const position = `${trade.size.toFixed(4)} ${asset.ticker}, a position of ${whole(trade.margin * trade.leverage)} (${whole(trade.margin)} at ${trade.leverage}x)`;
    if (trade.result === "liquidated") return `Price reached your liquidation price of ${price(trade.exit!)} after ${span(trade.minutes ?? 0)}, before your stop loss. The position, ${position}, was closed by force and the whole ${whole(trade.margin)} was lost.`;
    const sums = `Gross ${money(trade.gross)} on ${position}; fees ${plain(trade.fees)}; net ${money(trade.net)}, which is ${percent(trade.roi)} on the ${whole(trade.margin)} you put in.`;
    if (trade.result === "target") return `Your take profit at ${price(trade.exit!)} was reached after ${span(trade.minutes ?? 0)}. ${sums}`;
    if (trade.result === "stop") return `Your stop loss at ${price(trade.exit!)} was reached after ${span(trade.minutes ?? 0)}. ${sums}`;
    return `Neither level was reached in the six hours shown. Valued at the last close, ${price(trade.exit!)}, the position is ${trade.gross >= 0 ? "ahead" : "behind"}. ${sums}`;
}

// A number that runs to its new value instead of jumping there.
function useCountUp(value: number, ms = 700) {
    const [shown, setShown] = useState(value);
    const from = useRef(value);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(value);
        const start = performance.now();
        const begin = from.current;
        let frame = 0;
        const tick = (now: number) => {
            const part = Math.min(1, (now - start) / ms);
            const next = begin + (value - begin) * (1 - Math.pow(1 - part, 3));
            from.current = next;
            setShown(next);
            if (part < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [value, ms]);
    return shown;
}

// The card of a finished trade: its figures, and the price from a little before the decision to the exit.
function cardOf(trade: PracticeTrade, filledAt: number): Omit<TradeCardData, "fonts"> | null {
    const item = scenarioOf(trade.scenario);
    if (!item || trade.side === "out" || trade.entry === null || trade.exit === null || trade.minutes === null) return null;
    const before = item.seen.slice(-12).map((candle, i, list) => ({ at: (i - list.length + 1) * 15, price: candle.c }));
    const during: { at: number; price: number }[] = [];
    for (let at = 1; at < trade.minutes; at++) during.push({ at, price: item.minutes[at - 1].c });
    return { pair: item.asset.pair, side: trade.side === "long" ? "Long" : "Short", leverage: trade.leverage, margin: trade.margin, roi: trade.roi, net: trade.net, entry: trade.entry, exit: trade.exit, digits: item.asset.digits, result: HEADLINE[trade.result], held: span(trade.minutes - filledAt), when: trade.when, curve: [...before, ...during, { at: trade.minutes, price: trade.exit }], filledAt };
}

// ---------- sim: a decision on historical candles, then what came next ----------

type Phase = "observe" | "side" | "plan" | "reveal" | "result";
type LevelKey = "entry" | "stop" | "target";
const WORD = { entry: "Entry", stop: "Stop loss", target: "Take profit" } as const;
const READING = { up: "rising: an uptrend", down: "falling: a downtrend", sideways: "not stepping in one direction: sideways" } as const;
// Minutes of market replayed per second, before the learner's own speed.
const PACE = 14;
const SPEEDS = [1, 2, 4];

export const Sim = ({ onDone }: { onDone: Done }) => {
    const { practice, ready, setLast, refill } = usePractice();
    // A first visit opens on the coached chart. A learner who comes back gets the next chart, not the one they have already seen the end of.
    const [index, setIndex] = useState<number | null>(null);
    useEffect(() => {
        if (!ready || index !== null) return;
        const last = practice.last ? SCENARIOS.findIndex((item) => item.id === practice.last!.scenario) : -1;
        setIndex((last + 1) % SCENARIOS.length);
    }, [ready, index, practice.last]);

    const scenario: Scenario = SCENARIOS[index ?? 0];
    const asset = scenario.asset;
    const seen = scenario.seen;
    const lastClose = seen[seen.length - 1].c;
    const price = useCallback((value: number) => priceText(value, asset), [asset]);
    const coach = useMemo(() => suggestion(scenario), [scenario]);

    const [phase, setPhase] = useState<Phase>("observe");
    const [side, setSide] = useState<Side | "out" | null>(null);
    const [levels, setLevels] = useState<{ entry: number; stop: number | null; target: number | null }>({ entry: lastClose, stop: null, target: null });
    const [placing, setPlacing] = useState<LevelKey>("stop");
    const [margin, setMargin] = useState(500);
    const [leverage, setLeverage] = useState(5);
    // The coach is there for the first trade, and on request afterwards.
    const [hint, setHint] = useState(scenario.guided);
    const [read, setRead] = useState<Reading | null>(null);
    const [speed, setSpeed] = useState(1);
    const [live, setLive] = useState<{ at: number; price: number }>({ at: 0, price: lastClose });
    const [sharing, setSharing] = useState(false);
    const clock = useRef(0);
    const chart = useRef<SimChartHandle>(null);
    const saved = useRef(false);
    const speedRef = useRef(speed);
    speedRef.current = speed;

    const balance = practice.account.balance;
    const amount = Math.min(margin, Math.max(...MARGINS.filter((value) => value <= balance), 0));
    const plan: Plan | null = side && side !== "out" && levels.stop !== null && levels.target !== null && amount > 0 ? { side, entry: levels.entry, stop: levels.stop, target: levels.target, margin: amount, leverage } : null;
    const issue = side && side !== "out" ? planIssue({ side, entry: levels.entry, stop: levels.stop ?? NaN, target: levels.target ?? NaN }) : null;
    const outcome = useMemo(() => (plan && !issue ? simulate(plan, lastClose, scenario.minutes) : null), [plan, issue, lastClose, scenario]);
    const liq = side && side !== "out" ? liquidation({ side, entry: levels.entry, leverage }) : null;
    const forced = Boolean(plan && !issue && stopTooFar(plan));
    // The replay stops where the trade ended; a learner who stayed out, or was never filled, sees all six hours.
    const end = side === "out" || !outcome || outcome.exitAt === null ? scenario.minutes.length : outcome.exitAt;

    const restart = (next: number) => {
        const item = SCENARIOS[next];
        setIndex(next);
        setPhase("observe");
        setSide(null);
        setLevels({ entry: item.seen[item.seen.length - 1].c, stop: null, target: null });
        setPlacing("stop");
        setHint(item.guided);
        setRead(null);
        setLive({ at: 0, price: item.seen[item.seen.length - 1].c });
        clock.current = 0;
        saved.current = false;
    };
    // The entry follows the chart being shown until the learner sets their own.
    useEffect(() => {
        if (phase === "observe") setLevels({ entry: lastClose, stop: null, target: null });
    }, [lastClose, phase]);

    // The minutes that came next are replayed only after the decision, as one continuous movement.
    useEffect(() => {
        if (phase !== "reveal") return;
        const tradeSide = side === "out" ? null : side;
        const finish = () => {
            clock.current = end;
            setLive({ at: end, price: priceAt(scenario.minutes, tradeSide, end) });
            chart.current?.draw();
            setPhase("result");
        };
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return finish();
        let frame = 0;
        let before = performance.now();
        let told = 0;
        const tick = (now: number) => {
            // A tab left in the background must not jump the replay forward when it returns.
            const elapsed = Math.min(0.1, (now - before) / 1000);
            before = now;
            clock.current = Math.min(end, clock.current + elapsed * PACE * speedRef.current);
            chart.current?.draw();
            if (now - told > 80) {
                told = now;
                setLive({ at: clock.current, price: priceAt(scenario.minutes, tradeSide, clock.current) });
            }
            if (clock.current >= end) return finish();
            frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [phase, end, scenario, side]);

    const trade: PracticeTrade | null = useMemo(() => {
        if (!side) return null;
        const next = scenario.next;
        const after = { from: lastClose, end: next[next.length - 1].c, high: Math.max(...next.map((candle) => candle.h)), low: Math.min(...next.map((candle) => candle.l)) };
        const base = { id: `${scenario.id}-${side}`, at: 0, scenario: scenario.id, when: scenario.when, after };
        if (side === "out") return { ...base, side, entry: null, stop: null, target: null, result: "out", exit: null, size: 0, gross: 0, fees: 0, net: 0, r: 0, margin: 0, leverage: 1, roi: 0, minutes: null };
        if (!plan || !outcome) return null;
        return { ...base, side, entry: plan.entry, stop: plan.stop, target: plan.target, result: outcome.result, exit: outcome.exit, size: outcome.size, gross: outcome.gross, fees: outcome.fees, net: outcome.net, r: outcome.r, margin: plan.margin, leverage: plan.leverage, roi: outcome.roi, minutes: outcome.exitAt };
    }, [side, plan, outcome, scenario, lastClose]);

    useEffect(() => {
        if (phase !== "result" || !trade || saved.current) return;
        saved.current = true;
        setLast({ ...trade, id: `${trade.id}-${Date.now()}`, at: Date.now() });
        onDone(1);
    }, [phase, trade, setLast, onDone]);

    const later = phase === "reveal" || phase === "result";
    const traded = Boolean(trade && trade.side !== "out" && trade.result !== "unfilled");
    const filled = outcome?.filledAt ?? null;
    // The position's running result while the replay plays.
    const running = plan && filled !== null && live.at >= filled ? (live.price - plan.entry) * (plan.side === "long" ? 1 : -1) * sizeOf(plan) : null;
    const shownBalance = useCountUp(balance);
    const shownNet = useCountUp(phase === "result" && trade ? trade.net : 0, 900);

    const drawn: ChartLevel[] = [];
    if (side && side !== "out" && (phase === "plan" || later)) {
        drawn.push({ key: "entry", price: levels.entry, label: "Entry", tone: "entry", draggable: phase === "plan" });
        if (levels.stop !== null) drawn.push({ key: "stop", price: levels.stop, label: "Stop loss", tone: "stop", draggable: phase === "plan" });
        if (levels.target !== null) drawn.push({ key: "target", price: levels.target, label: "Take profit", tone: "target", draggable: phase === "plan" });
        if (liq !== null && leverage >= 5) drawn.push({ key: "liq", price: liq, label: "Liquidation", tone: "liq" });
    }
    const showSwings = hint && (read !== null || !scenario.guided) && !later;
    if (showSwings && coach && phase !== "observe") drawn.push({ key: "hint", price: coach.swing, label: coach.side === "long" ? "Last swing low" : "Last swing high", tone: "hint" });
    // The swing points the reading rests on: the last two highs and the last two lows.
    const swings: ChartSwing[] = showSwings ? (["high", "low"] as const).flatMap((kind) => scenario.pivots.filter((pivot) => pivot.kind === kind).slice(-2)) : [];
    const marks: ChartMark[] = [];
    if (later && plan && outcome && filled !== null) {
        marks.push({ at: filled, price: plan.entry, label: `${SIDE[plan.side]} ${plan.leverage}x`, tone: "plain" });
        if (phase === "result" && outcome.exit !== null && outcome.exitAt !== null) marks.push({ at: outcome.exitAt, price: outcome.exit, label: money(outcome.net), tone: outcome.net >= 0 ? "good" : "bad" });
    }

    const setLevel = (key: string, value: number) => {
        if (!Number.isFinite(value) || value <= 0) return;
        setLevels((current) => ({ ...current, [key]: Number(value.toFixed(asset.digits)) }));
    };
    const place = (value: number) => {
        setLevel(placing, value);
        // After the stop loss, the take profit is what is still missing.
        if (placing === "stop" && levels.target === null) setPlacing("target");
    };
    const twoForOne = levels.stop !== null && side && side !== "out" ? levels.entry + 2 * (levels.entry - levels.stop) : null;

    if (index === null) return <div className="h-[46vh] min-h-[320px]" />;
    const nextIndex = (index + 1) % SCENARIOS.length;
    const nextAsset = SCENARIOS[nextIndex].asset;
    const withTrend = scenario.reading === "up" ? "long" : scenario.reading === "down" ? "short" : "out";

    return (
        <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Market">
                    {ASSETS.map((item) => {
                        const on = item.symbol === asset.symbol;
                        return (
                            <button key={item.symbol} type="button" aria-pressed={on} disabled={phase === "reveal"} onClick={() => !on && restart(SCENARIOS.findIndex((entry) => entry.asset.symbol === item.symbol && !entry.guided))} className={choice(on)}>
                                {item.name}
                            </button>
                        );
                    })}
                    <span className="ml-2 text-xs text-white/40">
                        Chart {index + 1} of {SCENARIOS.length}
                        {scenario.guided ? " · with a coach" : ""}
                    </span>
                </div>
                <p className="text-sm text-white/55">
                    Practice account <span className="ml-1.5 text-base font-medium tabular-nums text-white">{plain(shownBalance)}</span>
                    {practice.account.trades > 0 && (
                        <span className="ml-3 text-xs text-white/40">
                            {practice.account.wins} won of {practice.account.trades}
                        </span>
                    )}
                </p>
            </div>

            <SimChart
                ref={chart}
                className="h-[46vh] min-h-[320px] border border-white/10"
                seen={seen}
                minutes={scenario.minutes}
                side={side === "out" ? null : side}
                clock={clock}
                digits={asset.digits}
                title={`${asset.pair} perpetual · Bybit · 15-minute candles · ${scenario.when}, UTC · historical`}
                brief={`${asset.pair} · 15m · historical`}
                levels={drawn}
                zone={plan && !issue && (phase === "plan" || later) ? { entry: plan.entry, stop: plan.stop, target: plan.target } : null}
                swings={swings}
                marks={marks}
                onPlace={phase === "plan" ? place : undefined}
                onDrag={phase === "plan" ? setLevel : undefined}
            />
            <p className="mt-2 text-xs leading-relaxed text-white/40">
                A simulation on real, historical candles: no order is placed and no money is used. Drag the chart to move it, scroll to zoom, drag the price scale to stretch it, double-click to fit.
                {later ? " The replay is drawn from one real candle a minute; the path inside each minute is drawn, not recorded." : ""}
            </p>

            <div className="mt-5">
                {phase === "observe" && (
                    <div className="cockpit-rise">
                        <Prompt>{scenario.guided ? `Your first trade, with a coach. This is ${asset.name} on ${scenario.when}: real candles, stopped at one moment.` : `This is ${asset.name} on ${scenario.when}: real candles, stopped at one moment. Read it before you decide.`}</Prompt>
                        {scenario.guided ? (
                            <>
                                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">Start with the structure. What are the swing highs and the swing lows doing?</p>
                                <div className="mt-4 flex flex-wrap gap-2.5">
                                    {(
                                        [
                                            ["up", "Rising: an uptrend"],
                                            ["down", "Falling: a downtrend"],
                                            ["sideways", "Neither: sideways"],
                                        ] as const
                                    ).map(([value, name]) => (
                                        <button key={value} type="button" disabled={read !== null} onClick={() => setRead(value)} className={`rounded-sm border px-4 py-2.5 text-sm transition-colors ${read === null ? "border-white/25 text-white hover:border-white" : value === scenario.reading ? "border-[#20B8A8] text-white" : read === value ? "border-[#E955A8]/60 text-white/45" : "border-white/10 text-white/35"}`}>
                                            {name}
                                        </button>
                                    ))}
                                </div>
                                {read !== null && <Feedback tone={read === scenario.reading ? "good" : "shown"}>{`${read === scenario.reading ? "Yes." : "Look at the ringed points."} The last two swing highs and the last two swing lows are ringed on the chart, and they are ${READING[scenario.reading]}.`}</Feedback>}
                            </>
                        ) : (
                            <>
                                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">Where are the swing highs and lows? Is it trending or moving sideways? Is price near an area where it has turned before? What happens next is hidden until you decide.</p>
                                {hint && <Feedback tone="plain">{`The coach's reading: the last two swing highs and swing lows, ringed on the chart, are ${READING[scenario.reading]}.`}</Feedback>}
                            </>
                        )}
                        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <button type="button" disabled={scenario.guided && read === null} onClick={() => setPhase("side")} className={primary}>
                                {scenario.guided ? "Decide" : "I have looked: decide"}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                            {!scenario.guided && !hint && (
                                <button type="button" onClick={() => setHint(true)} className="border-b border-white/25 text-sm text-white/70 hover:border-white hover:text-white">
                                    Ask the coach for a hint
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {phase === "side" && (
                    <div className="cockpit-rise">
                        <Prompt>{`What do you do at ${price(lastClose)}?`}</Prompt>
                        {hint && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/60">{scenario.reading === "sideways" ? "The coach: there is no clear structure to lean on here. Staying out is a sound decision." : `The coach: the structure is ${scenario.reading === "up" ? "rising" : "falling"}. Going ${withTrend} trades with it; going ${withTrend === "long" ? "short" : "long"} trades against it.`}</p>}
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
                                        clock.current = 0;
                                        setPhase(value === "out" ? "reveal" : "plan");
                                    }}
                                    className="rounded-sm border border-white/25 px-5 py-4 text-left transition-colors hover:border-white"
                                >
                                    <span className="flex items-baseline justify-between gap-3 text-base font-medium text-white">
                                        {name}
                                        {hint && value === withTrend && <span className="text-[11px] font-normal uppercase tracking-[0.12em] text-accent">{value === "out" ? "No structure" : "With the structure"}</span>}
                                    </span>
                                    <span className="mt-1 block text-sm leading-relaxed text-white/55">{text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {phase === "plan" && side && side !== "out" && (
                    <div className="cockpit-rise grid gap-x-12 gap-y-8 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <Prompt>{`You are going ${side} on ${asset.name}. Place your stop loss and your take profit: choose a level, then click the chart, or drag its line.`}</Prompt>
                            <div className="mt-4" role="group" aria-label="Levels">
                                {(["entry", "stop", "target"] as const).map((key) => (
                                    <div key={key} className={`grid grid-cols-[1fr_7.5rem] items-center gap-x-4 border-t sm:grid-cols-[7rem_1fr_7.5rem] border-white/15 py-2.5 transition-colors last:border-b ${placing === key ? "bg-white/[0.05]" : ""}`}>
                                        <button type="button" aria-pressed={placing === key} onClick={() => setPlacing(key)} className={`text-left text-sm font-medium ${placing === key ? "text-accent" : "text-white hover:text-accent"}`}>
                                            {WORD[key]}
                                        </button>
                                        <button type="button" tabIndex={-1} onClick={() => setPlacing(key)} className="hidden text-left text-[13px] leading-snug text-white/50 sm:block">
                                            {key === "entry" ? "Where the position opens. It starts at the current price." : key === "stop" ? "Where it is closed at a loss: the price that proves the idea wrong." : "Where it is closed at a profit."}
                                        </button>
                                        <input
                                            type="number"
                                            inputMode="decimal"
                                            aria-label={`${WORD[key]} price`}
                                            step={Math.pow(10, -asset.digits)}
                                            value={levels[key] ?? ""}
                                            placeholder="not set"
                                            onFocus={() => setPlacing(key)}
                                            onChange={(event) => (event.target.value === "" ? key !== "entry" && setLevels((current) => ({ ...current, [key]: null })) : setLevel(key, Number(event.target.value)))}
                                            className="!w-full !rounded-sm !border !border-white/20 !bg-transparent !px-2.5 !py-1.5 !text-right !text-sm !tabular-nums !text-white placeholder:!text-white/30 focus:!border-white focus:!outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
                                {levels.entry !== lastClose && (
                                    <button type="button" onClick={() => setLevels((current) => ({ ...current, entry: lastClose }))} className="border-b border-white/25 text-white/70 hover:border-white hover:text-white">
                                        Enter at the current price ({price(lastClose)})
                                    </button>
                                )}
                                {!hint && (
                                    <button type="button" onClick={() => setHint(true)} className="border-b border-white/25 text-white/70 hover:border-white hover:text-white">
                                        Ask the coach for a hint
                                    </button>
                                )}
                            </div>
                            {hint && (
                                <div className="mt-5 border-l-2 border-accent pl-4">
                                    <p className={label}>The coach</p>
                                    {coach && coach.side === side ? (
                                        <>
                                            <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/80">
                                                The last swing {side === "long" ? "low" : "high"} is at {price(coach.swing)}. If price breaks it, the {side === "long" ? "rising" : "falling"} structure you are trading is broken. A stop loss just beyond it loses only when the idea is wrong. A take profit twice as far away means one win pays for two losses.
                                            </p>
                                            <div className="mt-3 flex flex-wrap gap-2.5">
                                                <button type="button" onClick={() => setLevels((current) => ({ ...current, stop: coach.stop }))} className={quiet}>
                                                    Put my stop loss there
                                                </button>
                                                <button type="button" disabled={twoForOne === null} onClick={() => twoForOne !== null && setLevel("target", twoForOne)} className={`${quiet} disabled:border-white/10 disabled:text-white/30`}>
                                                    Take profit at 2 for 1
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-white/80">
                                            {scenario.reading === "sideways" ? "There is no clear structure on this chart, so there is no swing that clearly proves a trade wrong. If you trade it, keep the amount small." : coach ? `You are trading against the structure, which is ${scenario.reading === "up" ? "rising" : "falling"}. You can, but the last swings give you nothing to lean on. Keep the amount small.` : "The structure is clear, but the last swing against it is almost at the price: a stop loss there would be hit by an ordinary move. Give the trade more room than that."}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-5">
                            <p className={label}>Amount from your practice account</p>
                            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Amount">
                                {MARGINS.map((value) => (
                                    <button key={value} type="button" aria-pressed={amount === value} disabled={value > balance} onClick={() => setMargin(value)} className={choice(amount === value)}>
                                        {whole(value)}
                                    </button>
                                ))}
                            </div>
                            <p className={`${label} mt-4`}>Leverage</p>
                            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Leverage">
                                {LEVERAGES.map((value) => (
                                    <button key={value} type="button" aria-pressed={leverage === value} onClick={() => setLeverage(value)} className={choice(leverage === value)}>
                                        {value}x
                                    </button>
                                ))}
                            </div>
                            <p className="mt-2.5 text-[13px] leading-relaxed text-white/45">
                                {leverage === 1 ? `Without leverage, your position is the ${whole(amount)} itself.` : `Leverage multiplies the position, and so both the gain and the loss: at ${leverage}x, a 1% move in price is ${leverage}% of your ${whole(amount)}.`}
                            </p>
                            {amount === 0 ? (
                                <div className="mt-4">
                                    <p className="text-sm leading-relaxed text-white/70">Your practice account is too low to open a trade. That is what a run of losses does, and why the size of each one matters.</p>
                                    <button type="button" onClick={refill} className={`${quiet} mt-3`}>
                                        Start again with {whole(START_BALANCE)}
                                    </button>
                                </div>
                            ) : plan && !issue ? (
                                <dl className="mt-4 space-y-2 border-t border-white/15 pt-4 text-sm">
                                    {(
                                        [
                                            ["Position", `${whole(positionValue(plan))} · ${sizeOf(plan).toFixed(4)} ${asset.ticker}`, ""],
                                            ["If the stop loss is hit", forced ? `-${plain(plan.margin)} (liquidated first)` : `-${plain(riskPerUnit(plan) * sizeOf(plan))}`, "text-[#E955A8]"],
                                            ["If the take profit is hit", `+${plain(rewardPerUnit(plan) * sizeOf(plan))}`, "text-[#20B8A8]"],
                                            ["Reward-to-risk", `${ratio(plan).toFixed(2)} for each 1 risked`, ""],
                                            ["Liquidation price", liq === null ? "none without leverage" : `${price(liq)} (${((Math.abs(liq - plan.entry) / plan.entry) * 100).toFixed(1)}% away)`, ""],
                                        ] as const
                                    ).map(([term, value, tone]) => (
                                        <div key={term} className="flex items-baseline justify-between gap-4">
                                            <dt className="text-white/50">{term}</dt>
                                            <dd className={`tabular-nums ${tone || "text-white"}`}>{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            ) : (
                                <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-relaxed text-white/55">{issue}</p>
                            )}
                            {forced && liq !== null && <p className="mt-3 border-l-2 border-[#FACC15] pl-3 text-[13px] leading-relaxed text-white/75">Your stop loss is beyond the liquidation price. At {leverage}x the position would be closed by force at {price(liq)}, and the whole {whole(amount)} lost, before your stop loss is reached. Move the stop loss closer, or lower the leverage.</p>}
                            {plan && !issue && !forced && (riskPerUnit(plan) * sizeOf(plan)) / balance > 0.02 && <p className="mt-3 border-l-2 border-[#FACC15] pl-3 text-[13px] leading-relaxed text-white/75">Being stopped here would cost {(((riskPerUnit(plan) * sizeOf(plan)) / balance) * 100).toFixed(1)}% of your practice account. A common rule of thumb is to risk no more than 1 to 2% on one trade.</p>}
                            {plan && !issue && <p className="mt-3 text-[13px] leading-relaxed text-white/40">Fees of {(FEE_RATE * 100).toFixed(2)}% of the position are charged on the way in and on the way out. If your entry is not the current price, the order waits until price trades there.</p>}
                            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                                <button
                                    type="button"
                                    disabled={!plan || Boolean(issue)}
                                    onClick={() => {
                                        clock.current = 0;
                                        setPhase("reveal");
                                    }}
                                    className={primary}
                                >
                                    Open the simulated trade
                                </button>
                                <button type="button" onClick={() => setPhase("side")} className="text-sm text-white/55 hover:text-white">
                                    Change direction
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {phase === "reveal" && (
                    <div className="cockpit-rise flex flex-wrap items-end justify-between gap-x-10 gap-y-4" aria-live="off">
                        <div>
                            <p className={label}>{side === "out" ? "You stayed out · what price did next" : plan ? `${SIDE[plan.side]} ${plan.leverage}x · ${asset.pair} · simulated` : ""}</p>
                            {side === "out" ? (
                                <p className="mt-3 font-logo text-5xl font-light leading-none tabular-nums text-white">{price(live.price)}</p>
                            ) : running === null ? (
                                <p className="mt-3 text-lg text-white/70">Waiting for price to reach your entry at {price(levels.entry)}.</p>
                            ) : (
                                <p className={`mt-3 font-logo text-5xl font-light leading-none tabular-nums ${running >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>
                                    {money(running)}
                                    <span className="ml-4 text-xl text-white/55">{percent(running / amount)}</span>
                                </p>
                            )}
                            <p className="mt-2 text-sm tabular-nums text-white/45">
                                {span(live.at)} after your decision · {asset.ticker} {price(live.price)}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-xs text-white/40">Speed</span>
                            {SPEEDS.map((value) => (
                                <button key={value} type="button" aria-pressed={speed === value} onClick={() => setSpeed(value)} className={choice(speed === value)}>
                                    {value}x
                                </button>
                            ))}
                            <button type="button" onClick={() => (clock.current = end)} className={`${quiet} ml-2`}>
                                Skip to the result
                            </button>
                        </div>
                    </div>
                )}

                {phase === "result" && trade && (
                    <div className="cockpit-rise">
                        <p className={label}>{trade.side === "out" ? `${asset.pair} · no position` : `${SIDE[trade.side]} ${trade.leverage}x · ${asset.pair} · simulated`}</p>
                        <p className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">{HEADLINE[trade.result]}</p>
                        {traded && (
                            <p className={`mt-3 font-logo text-6xl font-light leading-none tabular-nums ${trade.net >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>
                                {money(Math.abs(shownNet - trade.net) < 0.005 ? trade.net : shownNet)}
                                <span className="ml-4 text-2xl text-white/55">{percent(trade.roi)}</span>
                            </p>
                        )}
                        <Feedback tone={!traded ? "plain" : trade.net >= 0 ? "good" : "bad"}>{outcomeText(trade)}</Feedback>
                        {scenario.guided && traded && (
                            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">
                                {trade.result === "target" && trade.side === withTrend
                                    ? "You read the structure, put the stop loss where the idea would have been wrong, and let the trade run. This first chart was chosen because that reading worked out. The next ones are not chosen that way: some will go against you, and that is what the stop loss is for."
                                    : "This first chart was one where trading with the structure, with the stop loss beyond the last swing, reached its take profit. You can take it again, or go on: the next charts are not chosen that way, and some will go against you."}
                            </p>
                        )}
                        {trade.result === "liquidated" && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">Leverage did this, not the market: the same move without leverage would have cost a fraction of it. A stop loss inside the liquidation price would have closed the trade first.</p>}
                        {trade.result === "stop" && <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/70">The plan held: you lost what you had decided to risk, and no more. That is a stop loss doing its work.</p>}
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                            <button type="button" onClick={() => restart(nextIndex)} className={primary}>
                                {nextAsset.symbol === asset.symbol ? `Another ${asset.name} chart` : `Now try ${nextAsset.name}`}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </button>
                            {traded && (
                                <button type="button" onClick={() => setSharing(true)} className={quiet}>
                                    Share this result
                                </button>
                            )}
                            <button type="button" onClick={() => restart(index)} className="text-sm text-white/55 hover:text-white">
                                Take this chart again
                            </button>
                        </div>
                        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/45">
                            Practice account: {plain(balance)}. Continue below to review this decision and record it in your practice journal.
                            {practice.account.trades >= 3 && (
                                <>
                                    {" "}
                                    You have taken {practice.account.trades} practice trades. The programme is where this becomes a method:{" "}
                                    <Link href="/education/programme" className="border-b border-white/30 text-white/80 hover:border-white hover:text-white">
                                        see the seven modules
                                    </Link>
                                    .
                                </>
                            )}
                        </p>
                    </div>
                )}
            </div>
            {sharing && trade && outcome && outcome.filledAt !== null && cardOf(trade, outcome.filledAt) && <ShareTrade card={cardOf(trade, outcome.filledAt)!} onClose={() => setSharing(false)} />}
        </div>
    );
};

// ---------- simreview: what the decision rested on, and the journal entry ----------

function observations(trade: PracticeTrade): string[] {
    const scenario = scenarioOf(trade.scenario);
    if (!scenario) return [];
    const seen = scenario.seen;
    const price = (value: number) => priceText(value, scenario.asset);
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
        const liq = liquidation({ side: trade.side, entry: trade.entry, leverage: trade.leverage });
        const away = liq === null ? null : (Math.abs(liq - trade.entry) / trade.entry) * 100;
        lines.push(trade.leverage === 1 ? `You used no leverage: ${whole(trade.margin)} of your account bought a ${whole(trade.margin)} position.` : `You used ${trade.leverage}x leverage: ${whole(trade.margin)} of your account controlled a ${whole(trade.margin * trade.leverage)} position, so each 1% move in price was ${trade.leverage}% of that ${whole(trade.margin)}.${away !== null ? ` The liquidation price was ${away.toFixed(1)}% away.` : ""}`);
        if (trade.result !== "unfilled" && trade.result !== "liquidated") lines.push(`Fees came to ${plain(trade.fees)}. They are charged on the whole position, not on the amount you put in, so leverage makes them weigh more.`);
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
                    {SIDE[trade.side]}
                    {trade.side !== "out" ? ` ${trade.leverage}x` : ""} · {assetOf(trade).name}, {trade.when} · simulated
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
                                    <span className="hidden text-sm text-white/45 sm:block">{assetOf(entry).ticker} · {entry.when}</span>
                                    <span className="text-[15px] text-white">
                                        {SIDE[entry.side]}
                                        {entry.side !== "out" ? ` ${entry.leverage}x` : ""}
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
                                                    ["Entry", entry.entry !== null ? priceText(entry.entry, assetOf(entry)) : "none"],
                                                    ["Stop loss", entry.stop !== null ? priceText(entry.stop, assetOf(entry)) : "none"],
                                                    ["Take profit", entry.target !== null ? priceText(entry.target, assetOf(entry)) : "none"],
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
            <p className="mt-8 max-w-2xl text-[13px] leading-relaxed text-white/40">Every chart in this Introduction was a historical chart of a real market, and every trade a simulation. Nothing here is financial advice, a recommendation to trade, or a promise of results.</p>
        </div>
    );
};
