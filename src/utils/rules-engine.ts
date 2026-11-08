// The terminal's rules engine. Three separate modules that talk to each other:
//   pre-trade rules  validate the setup before entry,
//   live rules       watch the open position (they are alarm rules, see alarms.ts),
//   alerts           tell the trader about confirmed events (check / exit / critical).
// A rule is only "confirmed" when its condition really holds: by the trader's own
// confirmation, by the trade plan, or by closed candles of real market data.

import { conditionNow, type AlarmCandle, type AlarmRule, type AlarmTimeframe, type ConditionSource } from "./alarms.ts";

export type RuleState = "confirmed" | "pending" | "not" | "failed" | "waiting" | "unavailable";
export const STATE_NAME: Record<RuleState, string> = { confirmed: "Confirmed", pending: "Pending", not: "Not satisfied", failed: "Failed", waiting: "Waiting for data", unavailable: "Unavailable" };

export type PreCheck = "manual" | "stop" | "target" | "rr" | "condition";
export type PreCondition = { source: ConditionSource; period?: number; side: "above" | "below"; level: number; timeframe: AlarmTimeframe; closes: number };
export type PreRule = {
    id: string;
    title: string;
    description: string;
    check: PreCheck;
    mandatory: boolean;
    priority: "high" | "normal";
    enabled: boolean;
    rr?: number;
    condition?: PreCondition;
};

// A live rule in a template: an alarm whose level can follow the trade (entry, stop, target).
export type LiveRule = Omit<AlarmRule, "symbol" | "level"> & { level: number; anchor?: "entry" | "stop" | "target" };

export type RuleTemplate = { id: string; name: string; pre: PreRule[]; live: LiveRule[] };
export type RuleBook = { active: string; templates: RuleTemplate[] };

// Per trade: what the trader confirmed, when, and their note.
export type Confirmations = Record<string, Record<string, { at: number; note?: string }>>;
export type RuleEvent = { at: number; trade: string; rule: string; what: string };

export type PlanContext = { direction: "Long" | "Short"; entry: number | null; stop: number | null; target: number | null } | null;

export type Evaluation = { state: RuleState; detail: string; at: number | null };

const uid = () => Math.random().toString(36).slice(2, 9);

export function evaluatePre(rule: PreRule, ctx: { plan: PlanContext; open: boolean; confirmed?: { at: number }; candles: AlarmCandle[] | null | "error"; now: number }): Evaluation {
    const { plan, open, confirmed, now } = ctx;
    // A mandatory rule that is not met while a trade is open was broken at entry.
    const unmet = (detail: string): Evaluation => ({ state: open && rule.mandatory ? "failed" : "not", detail, at: now });
    switch (rule.check) {
        case "manual":
            if (confirmed) return { state: "confirmed", detail: "Confirmed by you.", at: confirmed.at };
            return open && rule.mandatory ? { state: "failed", detail: "Not confirmed before entry.", at: now } : { state: "pending", detail: "Waiting for your confirmation.", at: null };
        case "stop":
            if (!plan) return { state: "pending", detail: "Plan a trade to check it.", at: null };
            return plan.stop !== null ? { state: "confirmed", detail: `Stop loss at ${plan.stop.toLocaleString("en-US")}.`, at: now } : unmet("No stop loss in the plan.");
        case "target":
            if (!plan) return { state: "pending", detail: "Plan a trade to check it.", at: null };
            return plan.target !== null ? { state: "confirmed", detail: `Take profit at ${plan.target.toLocaleString("en-US")}.`, at: now } : unmet("No take profit in the plan.");
        case "rr": {
            const min = rule.rr ?? 2;
            if (!plan) return { state: "pending", detail: "Plan a trade to check it.", at: null };
            if (plan.entry === null || plan.stop === null || plan.target === null) return unmet("Entry, stop and target are needed for the ratio.");
            const risk = Math.abs(plan.entry - plan.stop);
            const ratio = risk ? Math.abs(plan.target - plan.entry) / risk : 0;
            const text = `1 : ${ratio.toFixed(2)}, minimum 1 : ${min}.`;
            return ratio >= min ? { state: "confirmed", detail: text, at: now } : unmet(text);
        }
        case "condition": {
            if (!rule.condition) return { state: "unavailable", detail: "No condition set.", at: null };
            if (ctx.candles === "error") return { state: "unavailable", detail: "Market data could not be reached.", at: null };
            const cond = mirror(rule.condition, plan?.direction ?? "Long", rule.condition.source === "price");
            const result = conditionNow(cond, ctx.candles, now);
            if (result.state === "waiting") return { state: "waiting", detail: ctx.candles ? "Not enough closed candles yet." : "Loading market data.", at: null };
            const ref = result.ref !== null && rule.condition.source !== "price" ? ` (${rule.condition.source === "rsi" ? "RSI" : rule.condition.source.toUpperCase()} ${result.ref.toLocaleString("en-US", { maximumFractionDigits: 2 })})` : "";
            return result.state === "confirmed" ? { state: "confirmed", detail: `Met on the last closed candle${ref}.`, at: result.at } : unmet(`Not met on the last closed candle${ref}.`);
        }
    }
}

export function readiness(evaluations: { rule: PreRule; result: Evaluation }[]) {
    const on = evaluations.filter((e) => e.rule.enabled);
    return {
        total: on.length,
        confirmed: on.filter((e) => e.result.state === "confirmed").length,
        pending: on.filter((e) => e.result.state === "pending" || e.result.state === "waiting").length,
        failed: on.filter((e) => e.result.state === "failed").length,
        // Ready when every mandatory rule is confirmed.
        ready: on.filter((e) => e.rule.mandatory).every((e) => e.result.state === "confirmed"),
    };
}

// Turns a template's live rules into alarms on a trade's instrument and levels.
export function liveAlarms(live: LiveRule[], trade: { instrument: string; direction: "Long" | "Short"; entry: number | null; stop: number | null; target: number | null }): AlarmRule[] {
    return live.flatMap((rule) => {
        const level = rule.anchor ? trade[rule.anchor] : rule.level;
        if (level === null || level === undefined) return [];
        const { anchor: _anchor, ...rest } = rule;
        const fixed = !rule.anchor && (rule.source ?? "price") === "price";
        return [mirror({ ...rest, id: `${rule.id}@${trade.instrument}`, symbol: trade.instrument, level }, trade.direction, fixed)];
    });
}

const pre = (title: string, description: string, check: PreCheck, extra: Partial<PreRule> = {}): PreRule => ({ id: uid(), title, description, check, mandatory: true, priority: "normal", enabled: true, ...extra });
const live = (label: string, extra: Partial<LiveRule>): LiveRule => ({ id: uid(), kind: "close", side: "below", level: 0, timeframe: "15", closes: 1, label, on: true, ...extra });

// Directional live rules are written for a long; a short trade mirrors them (see mirror()).
function base(name: string, tf: AlarmTimeframe, rr: number, exitTf: AlarmTimeframe): RuleTemplate {
    return {
        id: uid(),
        name,
        pre: [
            pre("Higher-timeframe context", "The trend and key levels on a higher timeframe agree with the trade.", "manual", { priority: "high" }),
            pre("Setup identified", "You can point to the setup on the chart.", "manual"),
            pre("Entry conditions met", "Your trigger for this setup has happened.", "manual"),
            pre(`Price above VWAP (${tf === "5" ? "5m" : tf === "15" ? "15m" : "1h"})`, "For a long, the last closed candle is above the session VWAP.", "condition", { mandatory: false, condition: { source: "vwap", side: "above", level: 0, timeframe: tf, closes: 1 } }),
            pre("Stop loss defined", "The plan has a stop loss.", "stop", { priority: "high" }),
            pre("Take profit defined", "The plan has a take profit.", "target"),
            pre(`Risk/reward at least 1 : ${rr}`, "Reward compared with risk, from your plan.", "rr", { rr }),
        ],
        live: [
            live("Back through the entry", { anchor: "entry", timeframe: tf, closes: 1 }),
            live("Stop loss reached", { anchor: "stop", kind: "price", urgent: true }),
            live("Take profit reached", { anchor: "target", kind: "price", side: "above" }),
            live(`Two ${exitTf === "15" ? "15m" : exitTf === "60" ? "1h" : "4h"} closes below VWAP`, { source: "vwap", timeframe: exitTf, closes: 2 }),
        ],
    };
}

export function defaultRuleBook(): RuleBook {
    const templates = [base("Scalping", "5", 1.5, "15"), base("Intraday", "15", 2, "15"), base("Swing", "60", 2.5, "240")];
    templates.push({ id: uid(), name: "Custom strategy", pre: [pre("Stop loss defined", "The plan has a stop loss.", "stop")], live: [live("Stop loss reached", { anchor: "stop", kind: "price", urgent: true })] });
    return { active: templates[1].id, templates };
}

// For a short, rules written for a long flip their side (except fixed price levels set by hand).
export function mirror<T extends { side: "above" | "below" }>(rule: T, direction: "Long" | "Short", fixed = false): T {
    if (direction === "Long" || fixed) return rule;
    return { ...rule, side: rule.side === "above" ? "below" : "above" };
}

export const newPreRule = (): PreRule => pre("New rule", "", "manual", { mandatory: false });
export const newLiveRule = (): LiveRule => live("", {});
export const copyTemplate = (t: RuleTemplate, name: string): RuleTemplate => ({ id: uid(), name, pre: t.pre.map((r) => ({ ...r, id: uid() })), live: t.live.map((r) => ({ ...r, id: uid() })) });
