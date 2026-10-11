"use client";

import { useRef } from "react";
import { ActiveTrade, NEW_ACTIVE_TRADE, normaliseActiveTrade, TradePlan } from "@/utils/workspace-store";
import { applySizing, MarketRules } from "@/utils/trade-plan";

// Changing any of these means the risk has to be accepted again.
const RISK_FIELDS: (keyof TradePlan)[] = ["instrument", "direction", "plannedEntry", "stopLoss", "takeProfit", "quantity", "riskAmount", "sizeMode", "leverage"];

export type SetTrade = (next: ActiveTrade | null | ((current: ActiveTrade | null) => ActiveTrade | null)) => void;

// The ways a trade in progress can be changed. Every update reads the trade
// at the moment of the click, so quick successive taps never overwrite each other.
export function useTradeActions(setTrade: SetTrade, rules: MarketRules | null) {
    const rulesRef = useRef(rules);
    rulesRef.current = rules;

    const base = (value: ActiveTrade | null) => (value ? normaliseActiveTrade(value) : NEW_ACTIVE_TRADE);
    const patch = (changes: Partial<ActiveTrade>) => setTrade((value) => ({ ...base(value), ...changes }));
    const patchPlan = (changes: Partial<TradePlan>) =>
        setTrade((value) => {
            const from = base(value);
            const merged = { ...from.plan, ...changes };
            // Size follows the planned risk only while the trade is still being prepared.
            const plan = from.stage === "prepare" ? applySizing(merged, rulesRef.current) : merged;
            const riskChanged = RISK_FIELDS.some((field) => plan[field] !== from.plan[field]);
            return { ...from, plan, checks: riskChanged && from.stage === "prepare" ? { ...from.checks, risk: false } : from.checks };
        });
    const toggleCheck = (id: string) =>
        setTrade((value) => {
            const from = base(value);
            return { ...from, checks: { ...from.checks, [id]: !from.checks[id] } };
        });
    const setAnswer = (id: string, answer: boolean) =>
        setTrade((value) => {
            const from = base(value);
            return { ...from, answers: { ...from.answers, [id]: from.answers[id] === answer ? null : answer } };
        });

    return { patch, patchPlan, toggleCheck, setAnswer };
}
