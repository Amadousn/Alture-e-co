"use client";

import { useState } from "react";
import Link from "next/link";
import { ActiveTrade, TradePlan } from "@/utils/workspace-store";
import { assetFor, derivePlan, fallbackTick, num } from "@/utils/trade-plan";
import type { Market } from "@/utils/use-market";
import TradeChart from "./trade-chart";
import { Cells, Chip, clock, duration, Explain, feedName, fieldClass, labelClass, money, panelClass, priceText, primaryButton, quantityText, quietButton, signed, StateBadge } from "./ui";

// The trader's own observations. `concern` is the answer that goes against the plan.
export const QUESTIONS: { id: string; text: string; concern: boolean }[] = [
    { id: "expected", text: "Is price behaving as you expected?", concern: false },
    { id: "valid", text: "Is your reason for the trade still valid?", concern: false },
    { id: "stalling", text: "Is the trade stalling or taking too long?", concern: true },
    { id: "structure", text: "Has the chart changed in a way that needs a rethink?", concern: true },
    { id: "invalidated", text: "Has your original idea been proven wrong?", concern: true },
];

type Props = {
    trade: ActiveTrade;
    market: Market;
    now: number;
    patch: (changes: Partial<ActiveTrade>) => void;
    patchPlan: (changes: Partial<TradePlan>) => void;
    setAnswer: (id: string, value: boolean) => void;
    onEditPlan: () => void;
    onClose: () => void;
};

const Cockpit = ({ trade, market, now, patch, patchPlan, setAnswer, onEditPlan, onClose }: Props) => {
    const plan = trade.plan;
    const asset = assetFor(plan.instrument);
    const live = market.status === "live" ? market : null;
    const active = trade.openedAt !== null;
    const [panel, setPanel] = useState<"none" | "review" | "update">("none");
    const [fill, setFill] = useState(plan.plannedEntry);
    const [draft, setDraft] = useState({ stopLoss: plan.stopLoss, takeProfit: plan.takeProfit });
    const [priceDraft, setPriceDraft] = useState("");

    // While updating, the chart and figures follow the draft, not the saved plan.
    const shown = panel === "update" ? { ...plan, ...draft } : plan;
    const derived = derivePlan(shown);
    const tick = live?.rules.tickSize ?? (derived.entry ? fallbackTick(derived.entry) : undefined);
    const unit = asset?.unit ?? "units";
    const long = plan.direction === "Long";
    // Every decision is added to the trade's record.
    const record = (text: string, changes: Partial<ActiveTrade> = {}) => patch({ ...changes, events: [...(trade.events ?? []), { at: Date.now(), text }] });

    // A reference price: the public feed when there is one, otherwise what the trader typed.
    const manual = num(trade.manualPrice);
    const reference = live ? { price: live.price, label: `${feedName(live).toUpperCase()} PRICE`, note: live.simulated ? "Simulated price for this demo, not a real market" : `Bybit public price, updated ${clock(live.fetchedAt)}` } : manual !== null && trade.manualPriceAt !== null ? { price: manual, label: "YOUR PRICE", note: `Entered by you at ${clock(trade.manualPriceAt)}. Not live data` } : null;
    const estimate = active && reference && derived.entry !== null && derived.quantity !== null ? (reference.price - derived.entry) * derived.quantity * derived.direction : null;

    const concerns = QUESTIONS.filter((question) => trade.answers[question.id] === question.concern);
    const atStop = active && reference !== null && derived.stop !== null && (long ? reference.price <= derived.stop : reference.price >= derived.stop);
    const atTarget = active && reference !== null && derived.target !== null && (long ? reference.price >= derived.target : reference.price <= derived.target);
    const state = !active ? "READY" : concerns.length > 0 || atStop || atTarget ? "REVIEW REQUIRED" : "ACTIVE";

    const fillValue = num(fill);
    const draftIssue =
        num(draft.stopLoss) === null || num(draft.takeProfit) === null
            ? "Both levels need a price."
            : !derived.stopOnRightSide
              ? `For a ${long ? "long" : "short"}, the stop loss belongs ${long ? "below" : "above"} your entry.`
              : !derived.targetOnRightSide
                ? `For a ${long ? "long" : "short"}, the take profit belongs ${long ? "above" : "below"} your entry.`
                : "";

    const message = !active
        ? "Your plan is ready. Place the order with your own broker, then record the price you got."
        : atStop
          ? `The ${live ? (live.simulated ? "simulated" : "Bybit") : "entered"} price is at or beyond your stop loss. Check your position with your broker.`
          : atTarget
            ? `The ${live ? (live.simulated ? "simulated" : "Bybit") : "entered"} price has reached your take profit. Check your position with your broker.`
            : concerns.length > 0
              ? "You flagged something that goes against your plan. Review the setup before doing anything else."
              : "Trade in progress. Your stop loss stays the priority.";

    return (
        <div className="cockpit-rise">
            <div className={`${panelClass} mb-4 flex flex-wrap items-center gap-x-4 gap-y-3 px-5 md:px-6 py-4`}>
                <StateBadge state={state} />
                <span className="text-lg font-semibold tracking-tight text-white">{asset ? asset.name : plan.instrument}</span>
                <Chip tone={long ? "long" : "short"}>{plan.direction}</Chip>
                {plan.setup && <Chip>{plan.setup}</Chip>}
                <span className="min-w-[200px] flex-1 text-sm text-[#c8c8d0]">{message}</span>
                {active && <span className="text-xs tabular-nums text-[#9a9aa5]">Open for {duration(now - trade.openedAt!)}</span>}
                {asset?.feed && !live?.simulated && (
                    <Link href={`/alturelock/workspace?symbol=${asset.feed}`} className="text-xs font-medium text-white border-b border-white/30 hover:border-white">
                        Full chart →
                    </Link>
                )}
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
                <div className={`${panelClass} overflow-hidden lg:self-start`}>
                    <TradeChart
                        className="h-[320px] md:h-[clamp(340px,calc(100vh-470px),600px)]"
                        candles={live?.candles ?? null}
                        levels={{ entry: derived.entry, stop: derived.stop, target: derived.target }}
                        marker={reference ? { price: reference.price, label: reference.label } : null}
                        tick={tick}
                        editable={panel === "update" ? ["stop", "target"] : []}
                        onChange={(level, value) => level !== "entry" && setDraft((current) => ({ ...current, [level === "stop" ? "stopLoss" : "takeProfit"]: String(value) }))}
                        riskText={derived.risk !== null ? `RISK ${money(derived.risk)}` : undefined}
                        rewardText={derived.reward !== null ? `REWARD ${money(derived.reward)}` : undefined}
                        caption={live ? (live.simulated ? `${live.symbol} · simulated candles for the demo` : `${live.symbol} · last 24 hours · 15-minute candles`) : "Your plan levels · no price feed"}
                        emptyText="No chart to show."
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-white/15 px-5 md:px-6 py-4">
                        {reference ? (
                            <>
                                <div>
                                    <p className={`${labelClass} mb-1`}>{live ? (live.simulated ? "Simulated price" : "Market price") : "Price entered by you"}</p>
                                    <p className="text-xl font-semibold tabular-nums text-white">{priceText(reference.price, tick)}</p>
                                </div>
                                {estimate !== null && (
                                    <div>
                                        <p className={`${labelClass} mb-1 flex items-center`}>
                                            Estimated result at this price
                                            <Explain term="this estimate">Your position size multiplied by the move from your recorded entry to this price, before fees. It is not read from your broker account, so your broker&apos;s figure is the real one.</Explain>
                                        </p>
                                        <p className={`text-xl font-semibold tabular-nums ${estimate >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{signed(estimate)}</p>
                                    </div>
                                )}
                                <p className="w-full text-xs text-[#7d7d87]">{reference.note}. AltureLock is not connected to your broker and does not watch the trade when this page is closed.</p>
                            </>
                        ) : (
                            <p className="text-xs leading-relaxed text-[#7d7d87]">{market.status === "loading" ? "Loading price…" : `There is no live price feed for ${asset?.name ?? "this asset"} here. The chart shows your planned levels only.`}</p>
                        )}
                        {!live && market.status !== "loading" && active && (
                            <form
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    if (num(priceDraft) !== null && num(priceDraft)! > 0) {
                                        patch({ manualPrice: priceDraft, manualPriceAt: Date.now() });
                                        setPriceDraft("");
                                    }
                                }}
                                className="flex w-full flex-wrap items-center gap-3"
                            >
                                <label htmlFor="cockpit-price" className="text-xs text-[#9a9aa5]">
                                    Type the price from your own chart:
                                </label>
                                <input id="cockpit-price" type="number" inputMode="decimal" step="any" min="0" value={priceDraft} onChange={(event) => setPriceDraft(event.target.value)} className={`${fieldClass} !w-36 !py-2`} />
                                <button type="submit" disabled={num(priceDraft) === null || num(priceDraft)! <= 0} className={`${quietButton} !h-9 !px-4 !text-xs`}>
                                    Update
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {!active && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (fillValue === null || fillValue <= 0) return;
                                patchPlan({ actualEntry: fill });
                                record(`Entry recorded at ${priceText(fillValue, tick)}`, { openedAt: Date.now() });
                            }}
                            className={`${panelClass} cockpit-ready p-5`}
                        >
                            <label htmlFor="cockpit-fill" className="mb-1 block text-sm font-semibold text-white">
                                What price did you get in at?
                            </label>
                            <p className="mb-3 text-[13px] leading-relaxed text-[#9a9aa5]">
                                Once your order is filled at your broker, record the price here. It can differ a little from your planned entry.
                                <Explain term="a fill">A fill is the price your broker actually gave you. Markets move while an order is placed, so the fill is often slightly off the plan. Recording it keeps your journal honest.</Explain>
                            </p>
                            <input id="cockpit-fill" type="number" inputMode="decimal" step="any" min="0" value={fill} onChange={(event) => setFill(event.target.value)} className={fieldClass} />
                            <button type="submit" disabled={fillValue === null || fillValue <= 0} className={`${primaryButton} mt-3 w-full`}>
                                I am in the trade
                            </button>
                            <p className="mt-3 text-xs text-[#7d7d87]">This only starts tracking in AltureLock. No order is sent anywhere.</p>
                        </form>
                    )}

                    <div className={`${panelClass} overflow-hidden`}>
                        <Cells
                            cells={[
                                [active ? "Your entry" : "Planned entry", derived.entry !== null ? priceText(derived.entry, tick) : "—"],
                                ["Position size", derived.quantity !== null ? `${quantityText(derived.quantity)} ${unit}` : "—"],
                                ["Stop loss", <span key="s" className="text-[#E955A8]">{derived.stop !== null ? priceText(derived.stop, tick) : "—"}</span>],
                                ["Take profit", <span key="t" className="text-[#20B8A8]">{derived.target !== null ? priceText(derived.target, tick) : "—"}</span>],
                                ["Planned risk", derived.risk !== null ? money(derived.risk) : "—"],
                                ["Potential reward", derived.reward !== null ? money(derived.reward) : "—"],
                                ["Leverage", derived.leverage !== null ? `${derived.leverage}x` : "—"],
                                ["Margin", derived.margin !== null ? money(derived.margin) : "—"],
                                ["Risk / reward", derived.ratio !== null ? `1 : ${derived.ratio.toFixed(2)}` : "—"],
                                ["Your checks", concerns.length > 0 ? <span key="c" className="text-[#FACC15]">{concerns.length} flagged</span> : QUESTIONS.some((q) => typeof trade.answers[q.id] === "boolean") ? "Nothing flagged" : "Not reviewed yet"],
                            ]}
                        />
                        {active && num(plan.plannedEntry) !== null && num(plan.plannedEntry) !== derived.entry && <p className="border-t border-white/15 px-4 py-2.5 text-xs text-[#7d7d87]">Planned entry was {priceText(num(plan.plannedEntry)!, tick)}. Figures use the price you actually got.</p>}
                    </div>

                    <div className="grid grid-cols-3 gap-px bg-white/15 border border-white/15 rounded-sm overflow-hidden">
                        {active ? (
                            <>
                                <button type="button" aria-pressed={panel === "review"} onClick={() => setPanel(panel === "review" ? "none" : "review")} className={`h-12 text-xs font-semibold uppercase tracking-[0.06em] transition-colors ${panel === "review" ? "bg-white text-black" : "bg-black text-white hover:bg-[#131313]"}`}>
                                    Review setup
                                </button>
                                <button
                                    type="button"
                                    aria-pressed={panel === "update"}
                                    onClick={() => {
                                        setDraft({ stopLoss: plan.stopLoss, takeProfit: plan.takeProfit });
                                        setPanel(panel === "update" ? "none" : "update");
                                    }}
                                    className={`h-12 text-xs font-semibold uppercase tracking-[0.06em] transition-colors ${panel === "update" ? "bg-white text-black" : "bg-black text-white hover:bg-[#131313]"}`}
                                >
                                    Update plan
                                </button>
                                <button type="button" onClick={() => { record("Closed with the broker, moved to review"); onClose(); }} className="h-12 bg-black text-xs font-semibold uppercase tracking-[0.06em] text-[#E955A8] transition-colors hover:bg-[#E955A8] hover:text-black">
                                    Close trade
                                </button>
                            </>
                        ) : (
                            <button type="button" onClick={onEditPlan} className="col-span-3 h-12 bg-black text-xs font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#131313]">
                                Update plan
                            </button>
                        )}
                    </div>

                    {(trade.events ?? []).length > 0 && (
                        <div>
                            <p className={`${labelClass} mb-2`}>Trade record</p>
                            <ol className="border-l border-white/20 pl-4 space-y-2.5">
                                {[...(trade.events ?? [])].reverse().map((event, i) => (
                                    <li key={`${event.at}-${i}`} className="relative text-sm text-[#e4e4e8]">
                                        <span className="absolute -left-[19px] top-[7px] h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                                        {event.text}
                                        <span className="ml-2 text-xs tabular-nums text-[#7d7d87]">{clock(event.at)}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {panel === "review" && (
                        <div className={`${panelClass} cockpit-rise overflow-hidden`}>
                            <p className="border-b border-white/15 px-5 py-3.5 text-[13px] leading-relaxed text-[#9a9aa5]">Answer from what you see on your own chart. A flagged answer changes the status to REVIEW REQUIRED. Nothing is closed for you.</p>
                            <ul className="divide-y divide-white/15">
                                {QUESTIONS.map((question) => {
                                    const answer = trade.answers[question.id];
                                    const flagged = answer === question.concern;
                                    return (
                                        <li key={question.id} className="flex items-center justify-between gap-3 px-5 py-3">
                                            <span className={`text-sm ${flagged ? "text-[#FACC15]" : "text-[#e4e4e8]"}`}>{question.text}</span>
                                            <span className="grid w-[108px] flex-shrink-0 grid-cols-2 gap-1 rounded-sm border border-white/25 p-1">
                                                {[true, false].map((value) => (
                                                    <button key={String(value)} type="button" aria-pressed={answer === value} aria-label={`${question.text} ${value ? "Yes" : "No"}`} onClick={() => { setAnswer(question.id, value); if (answer !== value && value === question.concern) record(`Flagged: ${question.text} ${value ? "Yes" : "No"}`); }} className={`rounded-sm py-1 text-xs font-semibold transition-colors ${answer === value ? "bg-white text-black" : "text-[#9a9aa5] hover:text-white"}`}>
                                                        {value ? "Yes" : "No"}
                                                    </button>
                                                ))}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}

                    {panel === "update" && (
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                if (draftIssue) return;
                                const moved = [draft.stopLoss !== plan.stopLoss ? `Stop loss moved from ${plan.stopLoss} to ${draft.stopLoss}` : "", draft.takeProfit !== plan.takeProfit ? `Take profit moved from ${plan.takeProfit} to ${draft.takeProfit}` : ""].filter(Boolean);
                                patchPlan(draft);
                                if (moved.length > 0) record(moved.join(". "));
                                setPanel("none");
                            }}
                            className={`${panelClass} cockpit-rise p-5`}
                        >
                            <p className="mb-4 text-[13px] leading-relaxed text-[#9a9aa5]">Drag the stop loss or take profit on the chart, or type new prices. Your entry and size are fixed once you are in. Remember to change the orders at your broker too.</p>
                            <div className="grid grid-cols-2 gap-3">
                                {(
                                    [
                                        ["stopLoss", "Stop loss"],
                                        ["takeProfit", "Take profit"],
                                    ] as const
                                ).map(([field, label]) => (
                                    <div key={field}>
                                        <label htmlFor={`update-${field}`} className={`${labelClass} mb-1.5 block`}>
                                            {label}
                                        </label>
                                        <input id={`update-${field}`} type="number" inputMode="decimal" step="any" min="0" value={draft[field]} onChange={(event) => setDraft((current) => ({ ...current, [field]: event.target.value }))} className={fieldClass} />
                                    </div>
                                ))}
                            </div>
                            {draftIssue && (
                                <p role="alert" className="mt-3 text-xs text-[#E955A8]">
                                    {draftIssue}
                                </p>
                            )}
                            <div className="mt-4 flex gap-3">
                                <button type="submit" disabled={draftIssue !== ""} className={`${primaryButton} flex-1 !h-10`}>
                                    Save changes
                                </button>
                                <button type="button" onClick={() => setPanel("none")} className={`${quietButton} !h-10`}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Cockpit;
