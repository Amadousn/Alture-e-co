"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import Prepare from "./rules/prepare";
import Cockpit from "./rules/cockpit";
import Review from "./rules/review";
import { labelClass, panelClass, primaryButton, quietButton, signed, StateBadge } from "./rules/ui";
import type { ClosedTrade } from "@/utils/bybit";
import { NEW_ACTIVE_TRADE, normaliseActiveTrade, useActiveTrade, useRecordedTrades, useWorkspaceSettings } from "@/utils/workspace-store";
import { applySizing, assetFor, MarketRules } from "@/utils/trade-plan";
import { useTradeActions } from "./rules/use-trade-actions";
import { useMarket, useQuotes } from "@/utils/use-market";

const STAGES = [
    { id: "prepare", label: "Prepare" },
    { id: "execute", label: "Execute" },
    { id: "review", label: "Review" },
] as const;

export const Stages = ({ stage }: { stage: string }) => {
    const current = STAGES.findIndex((item) => item.id === stage);
    return (
        <ol className="flex items-center gap-2 md:gap-3" aria-label="Workflow stage">
            {STAGES.map((item, i) => (
                <li key={item.id} className="flex items-center gap-2 md:gap-3" aria-current={i === current ? "step" : undefined}>
                    {i > 0 && <span className={`h-px w-4 md:w-8 ${i <= current ? "bg-white" : "bg-white/20"}`} aria-hidden="true" />}
                    <span className={`text-[11px] md:text-xs font-semibold uppercase tracking-[0.1em] ${i === current ? "text-accent accent-light" : i < current ? "text-white/70" : "text-[#55555e]"}`}>{item.label}</span>
                </li>
            ))}
        </ol>
    );
};

const RulesWorkflow = () => {
    const [settings, , settingsStore] = useWorkspaceSettings();
    const [stored, setTrade, tradeStore] = useActiveTrade();
    const [, setRecorded] = useRecordedTrades();
    const [now, setNow] = useState(() => Date.now());
    const [confirmDiscard, setConfirmDiscard] = useState(false);
    const [saved, setSaved] = useState<ClosedTrade | null>(null);
    // True when the page opened onto a plan left unfinished on an earlier visit.
    const [resumed, setResumed] = useState(false);
    const checkedResume = useRef(false);

    const trade = stored ? normaliseActiveTrade(stored) : null;
    const current = trade ?? NEW_ACTIVE_TRADE;
    const asset = assetFor(current.plan.instrument);
    const market = useMarket(asset?.feed ?? null);
    const quotes = useQuotes(current.stage === "prepare");
    const rules: MarketRules | null = market.status === "live" ? market.rules : null;
    const { patch, patchPlan, toggleCheck, setAnswer } = useTradeActions(setTrade, rules);

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    // The instrument's quantity steps arrive with the price feed; re-round the size when they do.
    const stage = current.stage;
    const hasTrade = trade !== null;
    useEffect(() => {
        if (!hasTrade || stage !== "prepare" || !rules) return;
        setTrade((value) => {
            if (!value) return value;
            const from = normaliseActiveTrade(value);
            const plan = applySizing(from.plan, rules);
            return plan === from.plan ? value : { ...from, plan, checks: { ...from.checks, risk: false } };
        });
    }, [hasTrade, stage, rules?.qtyStep, rules?.minQty]); // eslint-disable-line react-hooks/exhaustive-deps

    const discard = () => {
        setTrade(null);
        setConfirmDiscard(false);
        setResumed(false);
    };

    useEffect(() => {
        if (!tradeStore.ready || checkedResume.current) return;
        checkedResume.current = true;
        if (stored && assetFor(stored.plan.instrument)) setResumed(true);
    }, [tradeStore.ready, stored]);

    if (!settingsStore.ready || !tradeStore.ready) {
        return (
            <WorkspaceShell width="max-w-7xl">
                <p className="text-sm text-[#7d7d87]">Loading your rules…</p>
            </WorkspaceShell>
        );
    }

    // Just saved: confirm it, and offer the two obvious next steps.
    if (saved && !trade) {
        return (
            <WorkspaceShell width="max-w-7xl">
                <div className={`${panelClass} cockpit-rise max-w-3xl p-7 md:p-10`}>
                    <StateBadge state="CLOSED" />
                    <p className={`${labelClass} mt-6 mb-3`}>Saved to your Trading Journal</p>
                    <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                        {assetFor(saved.instrument)?.name ?? saved.instrument} {saved.direction}
                    </p>
                    <p className={`text-2xl font-semibold tabular-nums mb-8 ${saved.profitLoss >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{signed(saved.profitLoss)}</p>
                    <div className="flex flex-wrap gap-3">
                        <Link href="/alturelock/journal" className={`${primaryButton} inline-flex items-center`}>
                            Open Trading Journal
                        </Link>
                        <button
                            type="button"
                            onClick={() => {
                                setSaved(null);
                                setTrade(NEW_ACTIVE_TRADE);
                            }}
                            className={quietButton}
                        >
                            Prepare another trade
                        </button>
                    </div>
                </div>
            </WorkspaceShell>
        );
    }

    return (
        <WorkspaceShell width="max-w-7xl">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <h1 className="!text-2xl md:!text-3xl text-white">Rules</h1>
                    <Stages stage={stage === "manage" ? "execute" : stage} />
                </div>
                {trade &&
                    (confirmDiscard ? (
                        <div className="flex items-center gap-4 text-xs">
                            <span className="text-[#9a9aa5]">Discard this trade? Nothing is saved to the journal.</span>
                            <button type="button" onClick={discard} className="text-[#E955A8] border-b border-[#E955A8]/50 hover:border-[#E955A8]">
                                Discard
                            </button>
                            <button type="button" onClick={() => setConfirmDiscard(false)} className="text-[#7d7d87] hover:text-white">
                                Keep it
                            </button>
                        </div>
                    ) : (
                        <button type="button" onClick={() => setConfirmDiscard(true)} className="text-xs text-[#7d7d87] hover:text-white transition-colors">
                            {stage === "prepare" ? "Start over" : "Discard this trade"}
                        </button>
                    ))}
            </div>

            {resumed && trade && (
                <div className={`${panelClass} cockpit-rise mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 md:px-7 py-3.5`} role="status">
                    <p className="text-sm text-[#c8c8d0]">
                        <span className="text-white font-semibold">Welcome back.</span> This is the {asset?.name ?? ""} {stage === "prepare" ? "plan" : "trade"} you left unfinished, saved in this browser.
                    </p>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setResumed(false)} className={`${primaryButton} !h-9 !px-4 !text-xs`}>
                            Continue
                        </button>
                        <button type="button" onClick={discard} className={`${quietButton} !h-9 !px-4 !text-xs`}>
                            Start a new trade
                        </button>
                    </div>
                </div>
            )}

            {stage === "prepare" && <Prepare trade={current} settings={settings} market={market} quotes={quotes} patch={patch} patchPlan={patchPlan} toggleCheck={toggleCheck} onOpen={() => patch({ stage: "execute", events: [...(current.events ?? []), { at: Date.now(), text: "Plan confirmed, cockpit opened" }] })} />}

            {stage === "execute" && <Cockpit trade={current} market={market} now={now} patch={patch} patchPlan={patchPlan} setAnswer={setAnswer} onEditPlan={() => patch({ stage: "prepare", step: 3 })} onClose={() => patch({ stage: "review" })} />}

            {stage === "review" && (
                <Review
                    trade={current}
                    market={market}
                    now={now}
                    onBack={() => patch({ stage: "execute" })}
                    onSave={(record) => {
                        setRecorded((list) => [record, ...list]);
                        setSaved(record);
                        discard();
                    }}
                />
            )}
        </WorkspaceShell>
    );
};

export default RulesWorkflow;
