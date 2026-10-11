"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import Prepare from "./rules/prepare";
import Cockpit from "./rules/cockpit";
import Review from "./rules/review";
import { Stages } from "./rules-workflow";
import { useTradeActions } from "./rules/use-trade-actions";
import { Cells, labelClass, money, panelClass, priceText, primaryButton, quietButton, signed, StateBadge } from "./rules/ui";
import type { ClosedTrade } from "@/utils/bybit";
import { ActiveTrade, DEFAULT_SETTINGS, NEW_ACTIVE_TRADE } from "@/utils/workspace-store";
import { assetFor, buildRecord, derivePlan, num, planIssues, snap } from "@/utils/trade-plan";
import { SIMULATED_QUOTES, simulatedMarket } from "@/utils/demo-market";

const TOTAL = 11;
const LESSON = "Followed the plan from entry to exit.";

// The real Rules workflow, run on simulated data and kept in memory only.
// "Next" performs each step for the visitor; every control also works by hand.
const RulesDemo = () => {
    const [trade, setTradeState] = useState<ActiveTrade | null>(NEW_ACTIVE_TRADE);
    const [moved, setMoved] = useState(false);
    const [finished, setFinished] = useState<ClosedTrade | null>(null);
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);

    const current = trade ?? NEW_ACTIVE_TRADE;
    const plan = current.plan;
    const asset = assetFor(plan.instrument);
    const derived = derivePlan(plan);
    const market = useMemo(() => simulatedMarket(asset?.feed ?? null, moved && derived.target !== null ? derived.target : null), [asset?.feed, moved, derived.target]);
    const rules = market.status === "live" ? market.rules : null;
    const { patch, patchPlan, toggleCheck, setAnswer } = useTradeActions(setTradeState, rules);
    const { valid } = planIssues(plan, rules);
    const stage = current.stage;
    const step = current.step ?? 0;
    const ready = valid && Boolean(current.checks.context) && Boolean(current.checks.setup) && Boolean(current.checks.risk);
    const opened = current.openedAt !== null;

    const restart = () => {
        setTradeState(NEW_ACTIVE_TRADE);
        setMoved(false);
        setFinished(null);
    };

    // Where the visitor is, what it means, and what "Next" will do about it.
    const guide: { n: number; text: string; run: () => void } = (() => {
        if (stage === "prepare") {
            if (!asset || step === 0) return { n: 1, text: "First, choose what to trade. Next picks Bitcoin.", run: () => { patchPlan({ instrument: "BTCUSDT", plannedEntry: "", actualEntry: "", stopLoss: "", takeProfit: "", quantity: "" }); patch({ step: 1, reached: Math.max(current.reached ?? 0, 1) }); } };
            if (step === 1) return { n: 2, text: "Which way do you expect the price to move? Next chooses LONG.", run: () => { patchPlan({ direction: "Long" }); patch({ step: 2, reached: Math.max(current.reached ?? 0, 2) }); } };
            if (step === 2) return { n: 3, text: "What kind of setup is it? Next chooses CONTINUATION.", run: () => { patchPlan({ setup: "Continuation" }); patch({ step: 3, reached: Math.max(current.reached ?? 0, 3) }); } };
            if (step === 3 && !valid)
                return {
                    n: 4,
                    text: "Now the plan: entry, stop loss, take profit, risk and leverage. Next fills in an example.",
                    run: () => {
                        if (market.status !== "live") return;
                        const tick = market.rules.tickSize;
                        const long = plan.direction === "Long" ? 1 : -1;
                        const entry = market.price;
                        patchPlan({ plannedEntry: String(entry), stopLoss: String(snap(entry * (1 - 0.01 * long), tick)), takeProfit: String(snap(entry * (1 + 0.025 * long), tick)), sizeMode: "risk", riskAmount: "150", leverage: "10" });
                    },
                };
            if (step === 3) return { n: 5, text: "The size, risk and reward are calculated. Drag a level to see them change, or press Next.", run: () => patch({ step: 4, reached: 4 }) };
            if (!valid) return { n: 4, text: "The plan needs finishing first. Next goes back to the price levels.", run: () => patch({ step: 3 }) };
            if (!ready) return { n: 6, text: "Three checks before committing. Next confirms them.", run: () => patch({ checks: { ...current.checks, context: true, setup: true, risk: true } }) };
            return { n: 7, text: "TRADE READY. Next opens the trade cockpit.", run: () => patch({ stage: "execute" }) };
        }
        if (stage === "execute" || stage === "manage") {
            if (!opened) return { n: 8, text: "You would now place the order with your broker. Next records the entry.", run: () => { patchPlan({ actualEntry: plan.plannedEntry }); patch({ openedAt: Date.now() }); } };
            if (!moved) return { n: 9, text: "The trade is active. Next moves the simulated price to your take profit.", run: () => setMoved(true) };
            return { n: 10, text: "The simulated price reached your take profit. Next closes the trade.", run: () => patch({ stage: "review" }) };
        }
        return {
            n: 11,
            text: "The review is filled in for you. Next saves it, as it would to your journal.",
            run: () => {
                const exit = derived.target ?? num(plan.takeProfit);
                if (exit === null) return;
                setFinished(buildRecord(current, { exit, fee: 0, followed: true, reflection: LESSON }));
            },
        };
    })();

    const next = () => {
        guide.run();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (finished) {
        return (
            <WorkspaceShell width="max-w-7xl" demo>
                <div className={`${panelClass} cockpit-rise max-w-3xl overflow-hidden`}>
                    <div className="p-7 md:p-10">
                        <StateBadge state="CLOSED" />
                        <p className={`${labelClass} mt-6 mb-3`}>Demo complete · simulated trade</p>
                        <p className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-2">
                            {assetFor(finished.instrument)?.name ?? finished.instrument} {finished.direction}
                        </p>
                        <p className={`text-2xl font-semibold tabular-nums ${finished.profitLoss >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{signed(finished.profitLoss)}</p>
                        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#9a9aa5]">That is the whole process: plan, confirm, trade, review. In your workspace this trade would now be in your Trading Journal. Nothing was saved here, because none of it was real.</p>
                    </div>
                    <Cells
                        columns="grid-cols-2 md:grid-cols-4"
                        cells={[
                            ["Entry", priceText(finished.entryPrice)],
                            ["Exit", priceText(finished.exitPrice)],
                            ["Size", `${finished.quantity} ${assetFor(finished.instrument)?.unit ?? ""}`],
                            ["Leverage", `${finished.leverage}x`],
                        ]}
                    />
                    <div className="flex flex-wrap gap-3 border-t border-white/15 p-7 md:px-10">
                        <Link href="/alturelock/workspace" className={`${primaryButton} inline-flex items-center`}>
                            Open your workspace
                        </Link>
                        <button type="button" onClick={restart} className={quietButton}>
                            Run the demo again
                        </button>
                    </div>
                </div>
            </WorkspaceShell>
        );
    }

    return (
        <WorkspaceShell width="max-w-7xl" demo>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pb-0">
                <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                    <h1 className="!text-2xl md:!text-3xl text-white">Demo</h1>
                    <Stages stage={stage === "manage" ? "execute" : stage} />
                </div>
                <span className="rounded-sm border border-[#FACC15]/60 px-2 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#FACC15]">Simulated data</span>
            </div>

            <div className="pb-28">
                {stage === "prepare" && <Prepare trade={current} settings={DEFAULT_SETTINGS} market={market} quotes={SIMULATED_QUOTES} patch={patch} patchPlan={patchPlan} toggleCheck={toggleCheck} onOpen={() => patch({ stage: "execute" })} />}
                {(stage === "execute" || stage === "manage") && <Cockpit trade={current} market={market} now={now} patch={patch} patchPlan={patchPlan} setAnswer={setAnswer} onEditPlan={() => patch({ stage: "prepare", step: 3 })} onClose={() => patch({ stage: "review" })} />}
                {stage === "review" && (
                    <Review trade={current} market={market} now={now} onBack={() => patch({ stage: "execute" })} onSave={setFinished} prefill={{ exit: plan.takeProfit, followed: true, reflection: LESSON }} />
                )}
            </div>

            {/* The guide: always in reach, always says what Next will do. */}
            <div className="fixed inset-x-0 bottom-[58px] lg:bottom-0 z-40 border-t border-white/25 bg-black/95 backdrop-blur" role="region" aria-label="Demo guide">
                <div className="h-px bg-accent transition-all duration-500 ease-out" style={{ width: `${(guide.n / TOTAL) * 100}%`, boxShadow: "0 0 10px rgba(227,161,247,0.7)" }} aria-hidden="true" />
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 md:px-6 py-3">
                    <span className="font-mono text-[11px] tabular-nums text-accent">
                        {String(guide.n).padStart(2, "0")} / {TOTAL}
                    </span>
                    <p key={guide.n} className="cockpit-rise min-w-0 flex-1 basis-[220px] text-sm text-white" aria-live="polite">
                        {guide.text}
                        {guide.n === 5 && derived.risk !== null && derived.reward !== null && (
                            <span className="text-[#9a9aa5]">
                                {" "}
                                Risk {money(derived.risk)}, reward {money(derived.reward)}.
                            </span>
                        )}
                    </p>
                    <div className="flex items-center gap-4">
                        <Link href="/alturelock/demo" className="text-xs text-[#7d7d87] hover:text-white transition-colors">
                            Back to the demo terminal
                        </Link>
                        <button type="button" onClick={next} className={`${primaryButton} !h-10`}>
                            Next →
                        </button>
                    </div>
                </div>
            </div>
        </WorkspaceShell>
    );
};

export default RulesDemo;
