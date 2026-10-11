"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ActiveTrade, DEFAULT_CHECKLIST, TradePlan, WorkspaceSettings } from "@/utils/workspace-store";
import { Asset, ASSETS, assetFor, derivePlan, fallbackTick, num, planIssues, snap } from "@/utils/trade-plan";
import type { Market, Quotes } from "@/utils/use-market";
import TradeChart, { Level } from "./trade-chart";
import { Cells, Chip, clock, Explain, feedName, fieldClass, labelClass, money, panelClass, priceText, primaryButton, quantityText, quietButton, StateBadge } from "./ui";

const STEPS = ["Asset", "Direction", "Setup", "Levels", "Ready"] as const;

// Which of the trader's own checklist rules sit behind each readiness check.
const GROUPS: Record<"context" | "setup" | "risk", string[]> = {
    context: ["context"],
    setup: ["setup", "entry", "conditions"],
    risk: ["stop", "target", "risk"],
};
const BUILT_IN = new Set(DEFAULT_CHECKLIST.map((item) => item.id));

type Props = {
    trade: ActiveTrade;
    settings: WorkspaceSettings;
    market: Market;
    quotes: Quotes;
    patch: (changes: Partial<ActiveTrade>) => void;
    patchPlan: (changes: Partial<TradePlan>) => void;
    toggleCheck: (id: string) => void;
    onOpen: () => void;
};

const LEVEL_FIELD: Record<Level, "plannedEntry" | "stopLoss" | "takeProfit"> = { entry: "plannedEntry", stop: "stopLoss", target: "takeProfit" };

const Question = ({ step, title, children }: { step: number; title: string; children?: React.ReactNode }) => (
    <div className="px-5 md:px-7 pt-6 pb-5 border-b border-white/15">
        <p className={`${labelClass} mb-2`}>
            Step {step} of {STEPS.length}
        </p>
        <h2 className="!text-2xl md:!text-[28px] text-white">{title}</h2>
        {children && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9a9aa5]">{children}</p>}
    </div>
);

// Small drawings of what each choice means. Illustrations, not market data.
const Sketch = ({ kind }: { kind: "long" | "short" | "continuation" | "reversal" }) => {
    const paths = {
        long: "M4 46 L22 36 L34 40 L52 24 L64 28 L92 8",
        short: "M4 8 L22 20 L34 16 L52 32 L64 28 L92 48",
        continuation: "M4 46 L30 26 L44 32 L56 26 L66 31 L92 8",
        reversal: "M4 44 L24 26 L40 12 L52 10 L64 22 L92 46",
    };
    const color = kind === "long" ? "#20B8A8" : kind === "short" ? "#E955A8" : "#FFFFFF";
    return (
        <svg viewBox="0 0 96 54" className="h-14 w-24 flex-shrink-0" aria-hidden="true">
            <path d={paths[kind]} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {(kind === "continuation" || kind === "reversal") && <rect x={kind === "continuation" ? 28 : 36} y={kind === "continuation" ? 20 : 4} width={40} height={18} fill="none" stroke="#55555e" strokeDasharray="3 3" />}
        </svg>
    );
};

const Choice = ({ selected, onSelect, tone, title, line, detail, sketch }: { selected: boolean; onSelect: () => void; tone: string; title: string; line: string; detail: string; sketch: React.ReactNode }) => (
    <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className={`group flex w-full items-start gap-5 bg-black p-5 md:p-7 text-left transition-colors hover:bg-[#0c0c0c] ${selected ? "lit !bg-[#101010]" : ""}`}
        style={selected ? { boxShadow: `inset 0 0 0 1px ${tone}, 0 0 24px ${tone}22` } : undefined}
    >
        {sketch}
        <span className="min-w-0">
            <span className="flex items-center gap-3">
                <span className="text-xl md:text-2xl font-semibold tracking-tight" style={{ color: selected ? tone : "#FFFFFF" }}>
                    {title}
                </span>
                {selected && <span className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: tone }}>Selected</span>}
            </span>
            <span className="mt-1.5 block text-[15px] text-white">{line}</span>
            <span className="mt-1.5 block text-[13px] leading-relaxed text-[#9a9aa5]">{detail}</span>
        </span>
    </button>
);

const Stepper = ({ value, onChange, step, id, invalid }: { value: string; onChange: (next: string) => void; step: number; id: string; invalid: boolean }) => {
    const bump = (direction: 1 | -1) => {
        const current = num(value);
        if (current === null) return;
        onChange(String(Math.max(step, snap(current + direction * step, step))));
    };
    const button = "h-[42px] w-10 flex-shrink-0 border border-white/25 text-lg text-[#c8c8d0] hover:bg-white/10 hover:text-white transition-colors disabled:opacity-30";
    return (
        <div className="flex">
            <button type="button" aria-label="Lower" disabled={num(value) === null} onClick={() => bump(-1)} className={`${button} rounded-l-sm border-r-0`}>
                −
            </button>
            <input id={id} type="number" inputMode="decimal" step="any" min="0" value={value} aria-invalid={invalid} onChange={(event) => onChange(event.target.value)} className={`${fieldClass} !rounded-none min-w-0 flex-1 ${invalid ? "!border-[#E955A8]" : ""}`} />
            <button type="button" aria-label="Higher" disabled={num(value) === null} onClick={() => bump(1)} className={`${button} rounded-r-sm border-l-0`}>
                +
            </button>
        </div>
    );
};

const Prepare = ({ trade, settings, market, quotes, patch, patchPlan, toggleCheck, onOpen }: Props) => {
    const plan = trade.plan;
    const asset = assetFor(plan.instrument);
    // Without a chosen asset there is nothing to resume: always start at the first question.
    const step = asset ? Math.min(trade.step ?? 0, STEPS.length - 1) : 0;
    const reached = Math.max(trade.reached ?? 0, step);
    const live = market.status === "live" ? market : null;
    const rules = live?.rules ?? null;
    const derived = derivePlan(plan);
    const { issues, missing, valid } = planIssues(plan, rules);
    const [placing, setPlacing] = useState<Level | null>(null);
    // Guided placing runs until the trader chooses to type instead.
    const [guided, setGuided] = useState(true);
    const advance = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => () => void (advance.current && clearTimeout(advance.current)), []);

    const go = (next: number) => patch({ step: next, reached: Math.max(reached, next) });
    // Let the selection light up before the next question arrives.
    const choose = (changes: Partial<TradePlan>, next: number) => {
        patchPlan(changes);
        if (advance.current) clearTimeout(advance.current);
        advance.current = setTimeout(() => go(next), 260);
    };

    const tick = rules?.tickSize ?? (derived.entry ? fallbackTick(derived.entry) : undefined);
    const nudge = derived.entry && tick ? Math.max(tick, snap(derived.entry * 0.0005, tick)) : tick ?? 1;
    const hasScale = live !== null || derived.entry !== null;
    const firstMissing = (["entry", "stop", "target"] as Level[]).find((level) => missing.includes(level)) ?? null;

    // While guiding, the chart always waits for the next level that is still blank.
    useEffect(() => {
        if (step === 3 && guided && hasScale) setPlacing(firstMissing);
    }, [step, guided, hasScale, firstMissing]);

    const custom = settings.checklist.filter((item) => !BUILT_IN.has(item.id));
    const reminders = (group: keyof typeof GROUPS) => settings.checklist.filter((item) => GROUPS[group].includes(item.id)).map((item) => item.label);
    const customPending = custom.filter((item) => item.required && !trade.checks[item.id]);
    const confirmed = [Boolean(trade.checks.context), Boolean(trade.checks.setup), valid && Boolean(trade.checks.risk)];
    const tradeReady = confirmed.every(Boolean) && customPending.length === 0 && asset !== null && plan.setup !== "";
    const unit = asset?.unit ?? "units";

    const summary: Record<(typeof STEPS)[number], string> = {
        Asset: asset ? asset.name : "",
        Direction: reached > 1 ? plan.direction : "",
        Setup: plan.setup,
        Levels: valid && derived.ratio !== null ? `1 : ${derived.ratio.toFixed(2)}` : "",
        Ready: tradeReady ? "Ready" : reached === 4 ? `${confirmed.filter(Boolean).length} of 3` : "",
    };

    const feedLine =
        market.status === "live"
            ? market.simulated ? `${market.source}.` : `${market.source}. Updated ${clock(market.fetchedAt)}.`
            : market.status === "loading"
              ? "Loading price…"
              : market.status === "unavailable"
                ? "Live price unavailable right now: the price source could not be reached. You can still plan with prices from your own chart."
                : `No live price feed is connected for ${asset?.name ?? "this asset"}. Enter prices from your own chart.`;

    const levelControls: { level: Level; label: string; color: string; meaning: string; example: string }[] = [
        {
            level: "entry",
            label: "Entry price",
            color: "#FFFFFF",
            meaning: "Where your planned trade begins: the price you intend to get in at.",
            example: "Example: Bitcoin trades at $62,000 and you plan to buy if it dips to $61,800. Your entry is $61,800.",
        },
        {
            level: "stop",
            label: "Stop loss",
            color: "#E955A8",
            meaning: "Your Stop Loss is the price where your trade should be exited if the market moves against your plan. It helps define how much you could lose.",
            example: `Example: you ${plan.direction === "Long" ? "buy at $61,800 with a stop at $61,300. If price falls to $61,300" : "sell at $61,800 with a stop at $62,300. If price rises to $62,300"}, the plan says exit, and the $500 move is your loss on each unit.`,
        },
        {
            level: "target",
            label: "Take profit",
            color: "#20B8A8",
            meaning: "Your Take Profit is your planned exit price if the trade moves in your favor.",
            example: `Example: you ${plan.direction === "Long" ? "buy at $61,800 and plan to sell at $63,000" : "sell at $61,800 and plan to buy back at $60,600"}. That $1,200 move is your gain on each unit.`,
        },
    ];

    const placingHint: Record<Level, string> = {
        entry: "Tap the chart at the price where you plan to get in.",
        stop: `Now tap where you would exit if the trade goes wrong. For a ${plan.direction.toLowerCase()}, that is ${plan.direction === "Long" ? "below" : "above"} your entry.`,
        target: `Last one: tap the price where you plan to take profit, ${plan.direction === "Long" ? "above" : "below"} your entry.`,
    };

    return (
        <div>
            {/* Where you are, and what has been decided so far */}
            <div className={`${panelClass} mb-px flex flex-wrap items-center gap-x-4 gap-y-3 px-5 md:px-7 py-4 ${tradeReady ? "cockpit-ready" : ""}`}>
                <StateBadge state={tradeReady ? "TRADE READY" : "PREPARING"} />
                {asset && <span className="text-base font-semibold tracking-tight text-white">{asset.name}</span>}
                {reached > 1 && <Chip tone={plan.direction === "Long" ? "long" : "short"}>{plan.direction}</Chip>}
                {plan.setup && <Chip>{plan.setup}</Chip>}
                {live && (
                    <span className="ml-auto text-sm tabular-nums text-white">
                        {priceText(live.price, live.rules.tickSize)} <span className="text-[11px] text-[#7d7d87]">{live.simulated ? "Simulated" : `Bybit, ${clock(live.fetchedAt)}`}</span>
                    </span>
                )}
            </div>

            <ol className="mb-4 grid grid-cols-5 gap-px bg-white/15 border border-white/15 border-t-0" aria-label="Prepare steps">
                {STEPS.map((name, i) => {
                    const current = i === step;
                    const open = i <= reached;
                    return (
                        <li key={name} aria-current={current ? "step" : undefined}>
                            <button
                                type="button"
                                disabled={!open}
                                onClick={() => go(i)}
                                className={`relative flex h-full w-full flex-col items-start gap-0.5 bg-black px-2.5 md:px-5 py-3 text-left transition-colors ${open ? "hover:bg-[#0c0c0c]" : "cursor-default"}`}
                            >
                                {current && <span className="absolute inset-x-0 top-0 h-[2px] bg-accent" style={{ boxShadow: "0 0 12px rgba(227,161,247,0.7)" }} aria-hidden="true" />}
                                <span className={`text-[11px] md:text-xs font-semibold uppercase tracking-[0.08em] ${current ? "text-accent" : open ? "text-white" : "text-[#55555e]"}`}>
                                    <span className="tabular-nums">{i + 1}</span>
                                    <span className="hidden sm:inline"> {name}</span>
                                </span>
                                <span className={`w-full truncate text-[11px] md:text-xs tabular-nums ${summary[name] ? "text-[#c8c8d0]" : "text-[#55555e]"}`}>{summary[name] || <span className="sm:hidden">{name}</span>}</span>
                            </button>
                        </li>
                    );
                })}
            </ol>

            {step === 0 && (
                <div key="asset" className={`${panelClass} cockpit-rise overflow-hidden`}>
                    <Question step={1} title="What do you want to trade?">
                        Pick the asset you have been watching. Traders often call this the market or the instrument. The crypto assets are USDT perpetual futures, which can be traded long or short with leverage.
                    </Question>
                    <ul className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {ASSETS.map((option: Asset) => {
                            const selected = asset?.id === option.id;
                            const quote = option.feed && quotes.status === "live" ? quotes.quotes[option.feed] : null;
                            return (
                                <li key={option.id}>
                                    <button
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() =>
                                            choose(
                                                // Price levels belong to one asset, so a new asset starts with a clean plan.
                                                selected ? {} : { instrument: option.instrument, plannedEntry: "", actualEntry: "", stopLoss: "", takeProfit: "", quantity: "" },
                                                1
                                            )
                                        }
                                        className={`flex h-full w-full items-center gap-4 bg-black p-5 text-left transition-colors hover:bg-[#0c0c0c] lg:flex-col lg:items-start lg:gap-5 ${selected ? "lit !bg-[#101010] shadow-[inset_0_0_0_1px_#E3A1F7]" : ""}`}
                                    >
                                        <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-sm border text-xl ${selected ? "border-accent text-accent" : "border-white/25 text-white"}`} aria-hidden="true">
                                            {option.glyph}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block text-lg font-semibold tracking-tight text-white">{option.name}</span>
                                            <span className="block text-xs uppercase tracking-[0.08em] text-[#7d7d87]">{option.feed ? `${option.feed} · Futures` : option.ticker}</span>
                                        </span>
                                        <span className="text-right lg:text-left">
                                            {quote ? (
                                                <>
                                                    <span className="block text-[15px] font-medium tabular-nums text-white">{priceText(quote.price)}</span>
                                                    {quote.change24h !== null && (
                                                        <span className={`block text-xs tabular-nums ${quote.change24h >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>
                                                            {quote.change24h >= 0 ? "+" : ""}
                                                            {quote.change24h.toFixed(2)}% 24h
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="block text-xs leading-snug text-[#7d7d87]">{option.feed ? (quotes.status === "loading" ? "Loading price…" : "Price unavailable") : "No live price"}</span>
                                            )}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    <p className="px-5 md:px-7 py-4 text-xs leading-relaxed text-[#7d7d87]">
                        {quotes.status === "live"
                            ? quotes.simulated ? `${quotes.source}.` : `Prices: ${quotes.source}. Updated ${clock(quotes.fetchedAt)}. Your own broker may quote slightly differently.`
                            : quotes.status === "loading"
                              ? "Loading prices…"
                              : "Live prices are unavailable right now. You can still choose an asset and plan with prices from your own chart."}{" "}
                        No live price feed is connected for Nasdaq, so you enter its prices yourself.
                    </p>
                </div>
            )}

            {step === 1 && (
                <div key="direction" className={`${panelClass} cockpit-rise overflow-hidden`}>
                    <Question step={2} title="Which direction do you expect the market to move?">
                        You can plan a trade for a rising price or for a falling one.
                    </Question>
                    <div className="grid gap-px bg-white/15 md:grid-cols-2">
                        <Choice selected={reached > 1 && plan.direction === "Long"} onSelect={() => choose({ direction: "Long" }, 2)} tone="#20B8A8" title="LONG" line="You expect the price to rise." detail="You buy first and aim to sell higher. You gain if the price goes up from your entry, and lose if it falls." sketch={<Sketch kind="long" />} />
                        <Choice selected={reached > 1 && plan.direction === "Short"} onSelect={() => choose({ direction: "Short" }, 2)} tone="#E955A8" title="SHORT" line="You expect the price to fall." detail="You sell first and aim to buy back lower. You gain if the price goes down from your entry, and lose if it rises." sketch={<Sketch kind="short" />} />
                    </div>
                    <p className="px-5 md:px-7 py-4 text-xs text-[#7d7d87]">
                        How can you sell something first?
                        <Explain term="short selling">Brokers offer products such as perpetuals, futures and CFDs that follow the price without you owning the asset. With those you can open a trade that gains when the price falls. Not every account or product allows it.</Explain>
                    </p>
                </div>
            )}

            {step === 2 && (
                <div key="setup" className={`${panelClass} cockpit-rise overflow-hidden`}>
                    <Question step={3} title="What type of setup are you looking for?">
                        A setup is the reason for the trade: what you see on the chart that makes you want to take it.
                    </Question>
                    <div className="grid gap-px bg-white/15 md:grid-cols-2">
                        <Choice selected={plan.setup === "Continuation"} onSelect={() => choose({ setup: "Continuation" }, 3)} tone="#FFFFFF" title="CONTINUATION" line="You expect an existing move to continue." detail="The price is already trending. It pauses or pulls back, and you plan to join the move in the same direction." sketch={<Sketch kind="continuation" />} />
                        <Choice selected={plan.setup === "Reversal"} onSelect={() => choose({ setup: "Reversal" }, 3)} tone="#FFFFFF" title="REVERSAL" line="You expect the current move to change direction." detail="The price has been moving one way and shows signs of running out. You plan to trade the turn the other way." sketch={<Sketch kind="reversal" />} />
                    </div>
                    <p className="px-5 md:px-7 py-4 text-xs text-[#7d7d87]">Your choice is saved with the trade, so your journal can show how each type of setup performs for you.</p>
                </div>
            )}

            {step === 3 && (
                <div key="levels" className="cockpit-rise">
                    {/* One frame: the chart, the ticket beside it, and the result beneath both. */}
                    <div className="border border-white/15">
                        <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-5 md:px-7 py-4 border-b border-white/15 transition-colors ${placing ? "bg-accent/[0.07]" : ""}`}>
                            <h2 className="!text-xl md:!text-2xl text-white">Plan your three price levels</h2>
                            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm" aria-live="polite">
                                {placing ? (
                                    <>
                                        <span className="text-white">{placingHint[placing]}</span>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setGuided(false);
                                                setPlacing(null);
                                            }}
                                            className="text-xs text-[#9a9aa5] border-b border-[#55555e] hover:text-white hover:border-white"
                                        >
                                            Type the numbers instead
                                        </button>
                                    </>
                                ) : (
                                    <span className="text-[#9a9aa5]">{!hasScale ? "Type your entry price to start. The chart draws your levels as you add them." : missing.some((item) => item !== "size" && item !== "leverage") ? "Type the remaining prices, or use Set on chart." : "Drag any level on the chart to adjust it. The numbers follow."}</span>
                                )}
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-[minmax(0,1fr)_370px]">
                            <div className="flex min-w-0 flex-col">
                                <TradeChart
                                    className="h-[300px] sm:h-[360px] lg:h-auto lg:min-h-[440px] lg:flex-1"
                                    candles={live?.candles ?? null}
                                    levels={{ entry: derived.entry, stop: derived.stop, target: derived.target }}
                                    marker={live ? { price: live.price, label: `${feedName(live).toUpperCase()} PRICE` } : null}
                                    tick={tick}
                                    editable={["entry", "stop", "target"]}
                                    placing={placing}
                                    onChange={(level, value) => patchPlan({ [LEVEL_FIELD[level]]: String(value) })}
                                    onPlaced={() => !guided && setPlacing(null)}
                                    riskText={derived.risk !== null ? `RISK ${money(derived.risk)}` : derived.stop !== null ? "RISK" : undefined}
                                    rewardText={derived.reward !== null ? `REWARD ${money(derived.reward)}` : derived.target !== null ? "REWARD" : undefined}
                                    caption={live ? (live.simulated ? `${live.symbol} · simulated candles for the demo` : `${live.symbol} · last 24 hours · 15-minute candles`) : "Your plan levels · no price feed"}
                                    emptyText={market.status === "loading" ? "Loading price…" : "No price chart is available for this asset. Type your entry price and your levels appear here."}
                                />
                                <p className="border-t border-white/15 px-5 md:px-7 py-2.5 text-xs leading-relaxed text-[#7d7d87]">{feedLine}</p>
                            </div>

                            {/* The ticket, in the order a trade is thought through. */}
                            <div className="border-t lg:border-t-0 lg:border-l border-white/15 divide-y divide-white/10">
                                {levelControls.map(({ level, label, color, meaning, example }) => {
                                    const field = LEVEL_FIELD[level];
                                    const problem = issues[level];
                                    return (
                                        <div key={level} className="px-5 py-3.5">
                                            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                                <div className="text-sm">
                                                    <label htmlFor={`plan-${level}`} className="font-semibold text-white">
                                                        <span className="mr-2 inline-block h-2 w-2 rounded-[1px] align-middle" style={{ background: color }} aria-hidden="true" />
                                                        {label}
                                                    </label>
                                                    <Explain term={label.toLowerCase()}>
                                                        {meaning} {example}
                                                    </Explain>
                                                </div>
                                                <div className="flex gap-x-3 text-xs">
                                                    {level === "entry" && live && (
                                                        <button type="button" onClick={() => patchPlan({ plannedEntry: String(live.price) })} className="text-[#9a9aa5] border-b border-[#55555e] hover:text-white hover:border-white">
                                                            Use {live.simulated ? "simulated" : "Bybit"} price
                                                        </button>
                                                    )}
                                                    {hasScale && (
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setGuided(false);
                                                                setPlacing(placing === level ? null : level);
                                                            }}
                                                            aria-pressed={placing === level}
                                                            className={`border-b ${placing === level ? "text-accent border-accent" : "text-[#9a9aa5] border-[#55555e] hover:text-white hover:border-white"}`}
                                                        >
                                                            {placing === level ? "Tap the chart now" : "Set on chart"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <Stepper id={`plan-${level}`} value={plan[field]} onChange={(next) => patchPlan({ [field]: next })} step={nudge} invalid={problem !== ""} />
                                            {problem && (
                                                <p role="alert" className="cockpit-rise mt-2 text-xs text-[#E955A8]">
                                                    {problem}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}

                                <div className="px-5 py-3.5">
                                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                                        <div className="text-sm">
                                            <label htmlFor={plan.sizeMode === "manual" ? "plan-size" : "plan-risk"} className="font-semibold text-white">
                                                {plan.sizeMode === "manual" ? `Position size, in ${unit}` : "Amount you risk"}
                                            </label>
                                            <Explain term="position size">
                                                Position Size is the amount of the asset or contract you trade. It helps determine how much money you could gain or lose. Say how much you are prepared to lose if the stop is hit, and the size is worked out for you: the amount you risk, divided by the distance between your entry and your stop. A wider stop means a smaller size for the same risk.
                                            </Explain>
                                        </div>
                                        <button type="button" onClick={() => patchPlan({ sizeMode: plan.sizeMode === "manual" ? "risk" : "manual" })} className="text-xs text-[#9a9aa5] border-b border-[#55555e] hover:text-white hover:border-white">
                                            {plan.sizeMode === "manual" ? "Size it for me" : "I know my size"}
                                        </button>
                                    </div>
                                    {plan.sizeMode === "manual" ? (
                                        <input id="plan-size" type="number" inputMode="decimal" step="any" min="0" value={plan.quantity} aria-invalid={issues.size !== ""} onChange={(event) => patchPlan({ quantity: event.target.value })} className={`${fieldClass} ${issues.size ? "!border-[#E955A8]" : ""}`} />
                                    ) : (
                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#7d7d87]">$</span>
                                            <input id="plan-risk" type="number" inputMode="decimal" step="any" min="0" placeholder="0.00" value={plan.riskAmount ?? ""} aria-invalid={issues.size !== ""} onChange={(event) => patchPlan({ riskAmount: event.target.value })} className={`${fieldClass} !pl-7 ${issues.size ? "!border-[#E955A8]" : ""}`} />
                                        </div>
                                    )}
                                    {issues.size && (
                                        <p role="alert" className="cockpit-rise mt-2 text-xs text-[#E955A8]">
                                            {issues.size}
                                        </p>
                                    )}
                                </div>

                                <div className="px-5 py-3.5">
                                    <div className="mb-2 text-sm">
                                        <label htmlFor="plan-leverage" className="font-semibold text-white">
                                            Leverage
                                        </label>
                                        <Explain term="leverage">Leverage lets you hold a position larger than the money you put up. It does not change how much you lose at your stop, only how much margin is set aside. Example: a $10,000 position at 10x needs $1,000 of your own money, called margin. The other side of it: at 10x a move of about 10% against you uses up that margin and the exchange closes the trade (liquidation). 1x means no leverage.</Explain>
                                    </div>
                                    <div className="flex flex-wrap gap-1" role="group" aria-label="Leverage">
                                        {[1, 2, 3, 5, 10, 20, 25, 50, 75, 100]
                                            .filter((value) => !rules || value <= rules.maxLeverage)
                                            .map((value) => (
                                                <button key={value} type="button" aria-pressed={num(plan.leverage) === value} onClick={() => patchPlan({ leverage: String(value) })} className={`h-8 min-w-[38px] rounded-sm border px-1.5 text-xs font-semibold tabular-nums transition-colors ${num(plan.leverage) === value ? "border-white bg-white text-black lit" : "border-white/25 text-[#c8c8d0] hover:border-white hover:text-white"}`}>
                                                    {value}x
                                                </button>
                                            ))}
                                        <span className="relative">
                                            <input id="plan-leverage" type="number" inputMode="decimal" step="any" min="1" placeholder="Other" value={plan.leverage} aria-invalid={issues.leverage !== ""} onChange={(event) => patchPlan({ leverage: event.target.value })} className={`${fieldClass} !h-8 !w-[76px] !py-0 !pr-5 !text-xs ${issues.leverage ? "!border-[#E955A8]" : ""}`} />
                                            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-xs text-[#7d7d87]">x</span>
                                        </span>
                                    </div>
                                    {issues.leverage && (
                                        <p role="alert" className="cockpit-rise mt-2 text-xs text-[#E955A8]">
                                            {issues.leverage}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* What the plan comes to. */}
                        <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-5 border-t border-white/15 px-5 md:px-7 py-5">
                            {(
                                [
                                    ["Position size", derived.quantity !== null && derived.quantity > 0 ? `${quantityText(derived.quantity)} ${unit}` : "—", ""],
                                    ["Worth at entry", derived.notional !== null ? money(derived.notional) : "—", ""],
                                    ["Margin needed", derived.margin !== null ? money(derived.margin) : "—", ""],
                                    ["Approx. liquidation", derived.liquidation !== null ? priceText(derived.liquidation, tick) : derived.leverage === 1 ? "None at 1x" : "—", ""],
                                    ["Estimated risk", derived.risk !== null ? money(derived.risk) : "—", derived.risk !== null ? "text-[#E955A8]" : ""],
                                    ["Potential reward", derived.reward !== null ? money(derived.reward) : "—", derived.reward !== null ? "text-[#20B8A8]" : ""],
                                ] as const
                            ).map(([label, value, color]) => (
                                <div key={label} className="min-w-0">
                                    <dt className={`${labelClass} mb-1`}>{label}</dt>
                                    <dd className={`text-lg font-medium tabular-nums truncate ${color || "text-white"}`}>{value}</dd>
                                </div>
                            ))}
                        </dl>

                        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-white/15 px-5 md:px-7 py-5">
                            <div className="min-w-[240px] flex-1 max-w-md">
                                <p className={`${labelClass} flex items-center`}>
                                    Risk / reward
                                    <Explain term="risk / reward">It compares what you could lose with what you could gain. At 1 : 2 you aim to make $2 for every $1 you risk, so you can be wrong more often than right and still come out ahead.</Explain>
                                </p>
                                {derived.ratio !== null && derived.stopOnRightSide && derived.targetOnRightSide ? (
                                    <>
                                        <p className="mt-1 flex items-baseline gap-3">
                                            <span className="text-2xl font-semibold tabular-nums text-white">1 : {derived.ratio.toFixed(2)}</span>
                                            <span className="text-xs text-[#9a9aa5]">For every $1 you risk, you aim to make ${derived.ratio.toFixed(2)}.</span>
                                        </p>
                                        <div className="mt-2.5 flex h-1 overflow-hidden rounded-[1px]" aria-hidden="true">
                                            <span className="bg-[#E955A8] transition-all duration-200" style={{ width: `${100 / (1 + derived.ratio)}%` }} />
                                            <span className="flex-1 bg-[#20B8A8]" />
                                        </div>
                                    </>
                                ) : (
                                    <p className="mt-1 text-2xl font-semibold text-white/30">—</p>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                                <p className="text-xs text-[#9a9aa5]">{valid ? "Your plan is complete." : missing.length > 0 ? `Still needed: ${missing.map((item) => ({ entry: "entry price", stop: "stop loss", target: "take profit", size: plan.sizeMode === "manual" ? "position size" : "the amount you risk", leverage: "leverage" })[item]).join(", ")}.` : "Fix the value marked above to continue."}</p>
                                <button type="button" disabled={!valid} onClick={() => go(4)} className={primaryButton}>
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>

                    <details className="mt-4 text-xs text-[#9a9aa5]">
                        <summary className="cursor-pointer text-[#c8c8d0] hover:text-white">How these figures are calculated</summary>
                        <ul className="mt-3 max-w-3xl space-y-2 leading-relaxed">
                            <li>Risk and reward are the price distance from your entry, multiplied by your position size.</li>
                            <li>Trading fees, funding and slippage are not included, so your real result will differ a little.</li>
                            {rules && asset ? (
                                <li>
                                    Size is rounded down to {rules.qtyStep} {unit} (smallest size {rules.minQty}), {live?.simulated ? "the steps used in this demo" : `the steps Bybit publishes for its ${asset.feed} perpetual`}. Leverage is limited to {rules.maxLeverage}x {live?.simulated ? "in this demo" : "on this contract at Bybit"}. Your broker may differ.
                                </li>
                            ) : asset?.feed === null ? (
                                <li>Nasdaq products differ between brokers (CFDs, futures, micro futures). Here one unit gains or loses $1 for each 1-point move, and the size is not rounded. Check your broker&apos;s contract value before relying on the dollar figures.</li>
                            ) : (
                                <li>The instrument&apos;s quantity steps could not be loaded, so the size is not rounded. Check the smallest size your broker allows.</li>
                            )}
                            <li>Margin needed is the position&apos;s worth at entry divided by your leverage. Leverage does not change the risk or reward figures.</li>
                            <li>Approximate liquidation assumes isolated margin and ignores maintenance margin and fees, so a real exchange liquidates slightly earlier. Treat it as a rough guide and check the figure your exchange shows.</li>
                            <li>AltureLock does not know your account balance, so risk is shown in dollars, not as a share of your account.</li>
                        </ul>
                    </details>
                </div>
            )}

            {step === 4 && (
                <div key="ready" className="cockpit-rise grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
                    <div className={`${panelClass} overflow-hidden`}>
                        <Question step={5} title="Are you ready to take this trade?">
                            Three checks before you commit. Each is your own confirmation: AltureLock does not read the market for you.
                        </Question>
                        <ul className="divide-y divide-white/15">
                            {(
                                [
                                    { id: "context", title: "Market context reviewed", text: "You have looked at the bigger picture: the overall trend and the important price levels on a higher timeframe.", locked: "" },
                                    { id: "setup", title: "Trading setup identified", text: `You can point to the reason for this ${plan.setup ? plan.setup.toLowerCase() : "trade"} on your chart, and your entry conditions are met.`, locked: "" },
                                    {
                                        id: "risk",
                                        title: "Risk and exit plan defined",
                                        text: valid && derived.risk !== null && derived.stop !== null && derived.target !== null ? `Stop loss at ${priceText(derived.stop, tick)}, take profit at ${priceText(derived.target, tick)}. You accept losing about ${money(derived.risk)} if the stop is hit.` : "Your stop loss, take profit and position size are set.",
                                        locked: valid ? "" : "Finish your price levels first.",
                                    },
                                ] as const
                            ).map((check) => {
                                const on = Boolean(trade.checks[check.id]) && !check.locked;
                                const notes = reminders(check.id);
                                return (
                                    <li key={check.id}>
                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={on}
                                            onClick={() => (check.locked ? go(3) : toggleCheck(check.id))}
                                            className={`flex w-full items-start gap-4 px-5 md:px-7 py-5 text-left transition-colors hover:bg-[#0c0c0c] ${on ? "bg-[#20B8A8]/[0.06]" : ""}`}
                                        >
                                            <span
                                                className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm border text-sm font-bold transition-all duration-200 ${on ? "border-[#20B8A8] bg-[#20B8A8] text-black" : "border-[#55555e] text-transparent"}`}
                                                style={on ? { boxShadow: "0 0 16px rgba(32,184,168,0.55)" } : undefined}
                                                aria-hidden="true"
                                            >
                                                ✓
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                    <span className={`text-base font-semibold ${on ? "text-white" : "text-[#e4e4e8]"}`}>{check.title}</span>
                                                    <span className={`text-[11px] font-bold uppercase tracking-[0.1em] ${on ? "text-[#20B8A8]" : "text-[#7d7d87]"}`}>{on ? "Confirmed" : check.locked ? "Not ready" : "Tap to confirm"}</span>
                                                </span>
                                                <span className="mt-1 block text-[13px] leading-relaxed text-[#9a9aa5]">{check.locked || check.text}</span>
                                                {notes.length > 0 && !check.locked && <span className="mt-1.5 block text-xs text-[#7d7d87]">Your rules: {notes.join(" · ")}</span>}
                                            </span>
                                        </button>
                                    </li>
                                );
                            })}
                            {custom.map((item) => {
                                const on = Boolean(trade.checks[item.id]);
                                return (
                                    <li key={item.id}>
                                        <button type="button" role="switch" aria-checked={on} onClick={() => toggleCheck(item.id)} className={`flex w-full items-center gap-4 px-5 md:px-7 py-4 text-left transition-colors hover:bg-[#0c0c0c] ${on ? "bg-[#20B8A8]/[0.06]" : ""}`}>
                                            <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm border text-sm font-bold transition-all duration-200 ${on ? "border-[#20B8A8] bg-[#20B8A8] text-black" : "border-[#55555e] text-transparent"}`} aria-hidden="true">
                                                ✓
                                            </span>
                                            <span className="flex-1 text-[15px] text-[#e4e4e8]">{item.label}</span>
                                            <span className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">{item.required ? "Your rule" : "Optional"}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="border-t border-white/15 px-5 md:px-7 py-3.5 text-xs text-[#7d7d87]">
                            The reminders under each check come from your own rules.{" "}
                            <Link href="/alturelock/settings" className="text-[#c8c8d0] border-b border-[#55555e] hover:text-white hover:border-white">
                                Edit your rules
                            </Link>
                        </p>
                    </div>

                    <div className={`${panelClass} overflow-hidden self-start ${tradeReady ? "cockpit-ready" : ""}`}>
                        <div className="px-5 py-5 border-b border-white/15">
                            <p className={`text-2xl font-semibold tracking-tight transition-colors ${tradeReady ? "text-[#20B8A8]" : "text-[#55555e]"}`} style={tradeReady ? { textShadow: "0 0 22px rgba(32,184,168,0.55)" } : undefined} aria-live="polite">
                                {tradeReady ? "TRADE READY" : "NOT READY YET"}
                            </p>
                            <div className="mt-3 flex gap-1" aria-hidden="true">
                                {confirmed.map((done, i) => (
                                    <span key={i} className={`h-1 flex-1 transition-colors duration-300 ${done ? "bg-[#20B8A8]" : "bg-white/20"}`} />
                                ))}
                            </div>
                            <p className="mt-3 text-[13px] leading-relaxed text-[#9a9aa5]">
                                {tradeReady
                                    ? "Every check is confirmed and your plan is complete."
                                    : !valid
                                      ? "Your price levels need finishing before this trade can be ready."
                                      : `${confirmed.filter(Boolean).length} of 3 checks confirmed${customPending.length > 0 ? `, plus ${customPending.length} of your own rules to go` : ""}. Confirm the rest when you have genuinely checked them.`}
                            </p>
                        </div>
                        <Cells
                            cells={[
                                ["Asset", asset ? `${asset.name} · ${asset.ticker}` : "—"],
                                ["Direction", <span key="d" className={plan.direction === "Long" ? "text-[#20B8A8]" : "text-[#E955A8]"}>{plan.direction.toUpperCase()}</span>],
                                ["Entry", derived.entry !== null ? priceText(derived.entry, tick) : "—"],
                                ["Position size", derived.quantity !== null && derived.quantity > 0 ? `${quantityText(derived.quantity)} ${unit}` : "—"],
                                ["Stop loss", derived.stop !== null ? priceText(derived.stop, tick) : "—"],
                                ["Take profit", derived.target !== null ? priceText(derived.target, tick) : "—"],
                                ["Estimated risk", derived.risk !== null ? money(derived.risk) : "—"],
                                ["Potential reward", derived.reward !== null ? money(derived.reward) : "—"],
                                ["Leverage", derived.leverage !== null ? `${derived.leverage}x` : "—"],
                                ["Margin needed", derived.margin !== null ? money(derived.margin) : "—"],
                            ]}
                        />
                        <div className="border-t border-white/15 p-5">
                            <button type="button" disabled={!tradeReady} onClick={onOpen} className={`${primaryButton} w-full !h-12 uppercase tracking-[0.08em]`}>
                                Open trade cockpit
                            </button>
                            <p className="mt-3 text-xs leading-relaxed text-[#7d7d87]">This opens your trade-management workspace in AltureLock. It does not place an order with a broker: you place the trade yourself.</p>
                            <button type="button" onClick={() => go(3)} className={`${quietButton} mt-3 w-full !h-10 !text-xs`}>
                                Change the plan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Prepare;
