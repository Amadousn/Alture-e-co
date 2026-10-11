"use client";

import { useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { ActiveTrade } from "@/utils/workspace-store";
import { assetFor, buildRecord, derivePlan, fallbackTick, num } from "@/utils/trade-plan";
import type { Market } from "@/utils/use-market";
import { Cells, Chip, clock, duration, Explain, feedName, fieldClass, labelClass, money, panelClass, priceText, primaryButton, quantityText, signed, StateBadge } from "./ui";

export type ReviewPrefill = { exit: string; followed: boolean; reflection: string };

type Props = { trade: ActiveTrade; market: Market; now: number; onBack: () => void; onSave: (record: ClosedTrade) => void; prefill?: ReviewPrefill };

// Everything already known is carried over; only the exit and two questions are asked.
const Review = ({ trade, market, now, onBack, onSave, prefill }: Props) => {
    const plan = trade.plan;
    const asset = assetFor(plan.instrument);
    const live = market.status === "live" ? market : null;
    const derived = derivePlan(plan);
    const tick = live?.rules.tickSize ?? (derived.entry ? fallbackTick(derived.entry) : undefined);
    const [exitPrice, setExitPrice] = useState(prefill?.exit ?? trade.manualPrice);
    const [fees, setFees] = useState("");
    const [followed, setFollowed] = useState<boolean | null>(prefill?.followed ?? null);
    const [reflection, setReflection] = useState(prefill?.reflection ?? "");

    const exit = num(exitPrice);
    const fee = num(fees) ?? 0;
    const gross = exit !== null && exit > 0 && derived.entry !== null && derived.quantity !== null ? (exit - derived.entry) * derived.quantity * derived.direction : null;
    const result = gross === null ? null : gross - fee;
    const ready = gross !== null && fee >= 0 && followed !== null;
    const multiple = result !== null && derived.risk ? result / derived.risk : null;
    const planned = num(plan.plannedEntry);

    const save = () => {
        if (!ready || exit === null || followed === null) return;
        const record = buildRecord(trade, { exit, fee, followed, reflection });
        if (record) onSave(record);
    };

    return (
        <div className="cockpit-rise">
            <div className={`${panelClass} mb-4 flex flex-wrap items-center gap-x-4 gap-y-3 px-5 md:px-6 py-4`}>
                <StateBadge state="CLOSED" />
                <span className="text-lg font-semibold tracking-tight text-white">{asset ? asset.name : plan.instrument}</span>
                <Chip tone={plan.direction === "Long" ? "long" : "short"}>{plan.direction}</Chip>
                {plan.setup && <Chip>{plan.setup}</Chip>}
                <span className="min-w-[200px] flex-1 text-sm text-[#c8c8d0]">Record how it ended. Everything else is already filled in.</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_400px]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        save();
                    }}
                    className={`${panelClass} overflow-hidden`}
                >
                    <div className="grid gap-x-5 gap-y-5 p-5 md:p-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="review-exit" className="mb-1 block text-sm font-semibold text-white">
                                What price did you get out at?
                            </label>
                            <p className="mb-3 text-[13px] text-[#9a9aa5]">The price your broker closed the trade at.</p>
                            <input id="review-exit" type="number" inputMode="decimal" step="any" min="0" value={exitPrice} onChange={(event) => setExitPrice(event.target.value)} className={fieldClass} />
                            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                                {derived.target !== null && (
                                    <button type="button" onClick={() => setExitPrice(String(derived.target))} className="text-[#c8c8d0] border-b border-[#55555e] hover:text-white hover:border-white">
                                        Hit take profit
                                    </button>
                                )}
                                {derived.stop !== null && (
                                    <button type="button" onClick={() => setExitPrice(String(derived.stop))} className="text-[#c8c8d0] border-b border-[#55555e] hover:text-white hover:border-white">
                                        Hit stop loss
                                    </button>
                                )}
                                {live && (
                                    <button type="button" onClick={() => setExitPrice(String(live.price))} className="text-[#c8c8d0] border-b border-[#55555e] hover:text-white hover:border-white">
                                        {feedName(live)} price now, {priceText(live.price, tick)}
                                    </button>
                                )}
                            </div>
                            {exit !== null && exit <= 0 && (
                                <p role="alert" className="mt-2 text-xs text-[#E955A8]">
                                    The exit price must be above zero.
                                </p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="review-fees" className="mb-1 flex items-center text-sm font-semibold text-white">
                                Fees, optional
                                <Explain term="fees">What your broker charged for the trade, in US dollars: commissions and any funding. AltureLock cannot see them, so leave this blank if you do not know and the result is shown before fees.</Explain>
                            </label>
                            <p className="mb-3 text-[13px] text-[#9a9aa5]">Total charged by your broker, in US dollars.</p>
                            <input id="review-fees" type="number" inputMode="decimal" step="any" min="0" placeholder="0.00" value={fees} onChange={(event) => setFees(event.target.value)} className={fieldClass} />
                            {fee < 0 && (
                                <p role="alert" className="mt-2 text-xs text-[#E955A8]">
                                    Fees cannot be negative.
                                </p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <span className="mb-2 block text-sm font-semibold text-white">Did you follow your rules?</span>
                            <div className="grid max-w-sm grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/15 bg-white/15">
                                {[true, false].map((value) => (
                                    <button key={String(value)} type="button" aria-pressed={followed === value} onClick={() => setFollowed(value)} className={`h-11 text-sm font-semibold transition-colors ${followed === value ? "bg-white text-black lit" : "bg-black text-[#c8c8d0] hover:bg-[#131313] hover:text-white"}`}>
                                        {value ? "Yes, I did" : "No, I did not"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="review-lesson" className="mb-2 block text-sm font-semibold text-white">
                                What did you learn? <span className="font-normal text-[#7d7d87]">Optional</span>
                            </label>
                            <textarea id="review-lesson" rows={3} value={reflection} onChange={(event) => setReflection(event.target.value)} className={`${fieldClass} resize-y`} />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 bg-[#080808] px-5 md:px-6 py-5">
                        <div>
                            <p className={`${labelClass} mb-1`}>Trade result</p>
                            <p className={`text-3xl font-semibold tabular-nums ${result === null ? "text-[#55555e]" : result >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{result === null ? "—" : signed(result)}</p>
                            <p className="mt-1 text-xs tabular-nums text-[#7d7d87]">
                                {gross === null ? "Enter your exit price to see the result." : fee > 0 ? `${signed(gross)} before ${money(fee)} in fees` : "Before fees"}
                                {multiple !== null && ` · ${multiple >= 0 ? "+" : ""}${multiple.toFixed(2)} times your planned risk`}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <button type="button" onClick={onBack} className="text-xs text-[#7d7d87] hover:text-white transition-colors">
                                ← Trade is still open
                            </button>
                            <button type="submit" disabled={!ready} className={primaryButton}>
                                Save to journal
                            </button>
                        </div>
                    </div>
                    {!ready && gross !== null && followed === null && <p className="border-t border-white/15 px-5 md:px-6 py-3 text-xs text-[#9a9aa5]">One answer left: did you follow your rules?</p>}
                </form>

                <div className={`${panelClass} overflow-hidden self-start`}>
                    <p className={`${labelClass} border-b border-white/15 px-4 py-3`}>Carried over from your plan</p>
                    <Cells
                        cells={[
                            ["Asset", asset ? `${asset.name} · ${asset.ticker}` : plan.instrument],
                            ["Direction", plan.direction],
                            ["Planned entry", planned !== null ? priceText(planned, tick) : "—"],
                            ["Your entry", derived.entry !== null ? priceText(derived.entry, tick) : "—"],
                            ["Stop loss", derived.stop !== null ? priceText(derived.stop, tick) : "—"],
                            ["Take profit", derived.target !== null ? priceText(derived.target, tick) : "—"],
                            ["Position size", derived.quantity !== null ? `${quantityText(derived.quantity)} ${asset?.unit ?? "units"}` : "—"],
                            ["Risk / reward", derived.ratio !== null ? `1 : ${derived.ratio.toFixed(2)}` : "—"],
                            ["Leverage", derived.leverage !== null ? `${derived.leverage}x` : "—"],
                            ["Margin", derived.margin !== null ? money(derived.margin) : "—"],
                            ["Planned risk", derived.risk !== null ? money(derived.risk) : "—"],
                            ["Potential reward", derived.reward !== null ? money(derived.reward) : "—"],
                            ["Opened", trade.openedAt !== null ? clock(trade.openedAt) : "—"],
                            ["Time in trade", trade.openedAt !== null ? duration(now - trade.openedAt) : "—"],
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Review;
