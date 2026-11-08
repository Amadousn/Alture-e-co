"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { describeCondition, severity, SOURCE_NAME, TIMEFRAME_NAME, type AlarmCandle, type AlarmHit, type AlarmTimeframe, type ConditionSource } from "@/utils/alarms";
import {
    copyTemplate,
    defaultRuleBook,
    draftPlan,
    draftSignature,
    evaluateDraft,
    evaluatePre,
    newDraft,
    liveAlarms,
    newLiveRule,
    newPreRule,
    readiness,
    STATE_NAME,
    type Confirmations,
    type Draft,
    type DraftPlan,
    type Evaluation,
    type LiveRule,
    type PlanContext,
    type PreRule,
    type RuleBook,
    type RuleEvent,
    type RuleState,
    type RuleTemplate,
} from "@/utils/rules-engine";
import { useConfirmations, useRuleBook, useRuleLog } from "@/utils/workspace-store";

// The interactive Rules workspace of the terminal: pre-trade rules, live rules and
// alerts, kept as three modules. The compact readiness bar opens it.

const POLL_MS = 30_000;
const TIMEFRAMES: AlarmTimeframe[] = ["5", "15", "60", "240"];
const SOURCES: ConditionSource[] = ["price", "vwap", "ema", "sma", "rsi"];

type Trade = { key: string; instrument: string; plan: PlanContext; open: boolean };
const NEXT = "next";

export function useRulesEngine({ demo, trade, symbol, price }: { demo: boolean; trade: Trade; symbol: string; price: number | null }) {
    const [storedBook, setStoredBook, bookStore] = useRuleBook();
    const [storedConf, setStoredConf] = useConfirmations();
    const [storedLog, setStoredLog] = useRuleLog();
    const [memBook, setMemBook] = useState<RuleBook | null>(null);
    const [memConf, setMemConf] = useState<Confirmations>({});
    const [memLog, setMemLog] = useState<RuleEvent[]>([]);
    const [fallback] = useState(defaultRuleBook);

    const book = demo ? (memBook ?? fallback) : (storedBook ?? fallback);
    const setBook = useCallback((fn: (b: RuleBook) => RuleBook) => (demo ? setMemBook((b) => fn(b ?? fallback)) : setStoredBook((b) => fn(b ?? fallback))), [demo, fallback, setStoredBook]);
    const confirmations = demo ? memConf : storedConf;
    const setConfirmations = demo ? setMemConf : setStoredConf;
    const log = demo ? memLog : storedLog;
    const addLog = useCallback((event: RuleEvent) => (demo ? setMemLog : setStoredLog)((current: RuleEvent[]) => [event, ...current].slice(0, 200)), [demo, setStoredLog]);
    const template = book.templates.find((t) => t.id === book.active) ?? book.templates[0];

    // The next trade, prepared here. Its entry starts at the market price; the demo account holds $10,000.
    const [draft, setDraftState] = useState<Draft | null>(null);
    useEffect(() => {
        if (!draft && price) setDraftState(newDraft(Number(price.toPrecision(6)), demo ? 10_000 : null));
    }, [draft, price, demo]);
    const instrument = symbol;
    const setDraft = (patch: Partial<Draft>) => setDraftState((d) => (d ? { ...d, ...patch } : d));
    const plan2: DraftPlan | null = draft ? draftPlan(draft) : null;

    // Closed candles for each timeframe a pre-trade condition needs, on the chart's instrument.
    const market = instrument;
    const frames = useMemo(() => [...new Set(template.pre.filter((r) => r.enabled && r.check === "condition" && r.condition).map((r) => r.condition!.timeframe))].sort().join(","), [template]);
    const [candles, setCandles] = useState<Record<string, AlarmCandle[] | "error">>({});
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setNow(Date.now());
            if (!frames) return;
            const next: Record<string, AlarmCandle[] | "error"> = {};
            await Promise.all(
                frames.split(",").map(async (tf) => {
                    try {
                        const res = await fetch(`/api/market/klines?symbol=${market}&interval=${tf}&limit=300`, { cache: "no-store" });
                        if (!res.ok) throw new Error();
                        next[`${market}|${tf}`] = (await res.json()).candles ?? [];
                    } catch {
                        next[`${market}|${tf}`] = "error";
                    }
                }),
            );
            if (!cancelled) setCandles((c) => ({ ...c, ...next }));
        };
        load();
        const id = setInterval(load, POLL_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [frames, market]);

    const mine = confirmations[NEXT] ?? {};
    const ctxPlan: PlanContext = draft && plan2 ? { direction: draft.direction, entry: plan2.entry, stop: plan2.stop, target: plan2.target } : null;
    const evaluations = template.pre.map((rule) => {
        if (!rule.enabled) return { rule, result: { state: "pending", detail: "Switched off.", at: null } as Evaluation };
        const confirmed = mine[rule.id]?.at ? mine[rule.id] : undefined;
        const fromDraft = draft && plan2 ? evaluateDraft(rule, draft, plan2, confirmed) : null;
        if (fromDraft) return { rule, result: fromDraft };
        const data = rule.condition ? candles[`${market}|${rule.condition.timeframe}`] : undefined;
        return { rule, result: evaluatePre(rule, { plan: ctxPlan, open: false, confirmed, candles: data === undefined ? null : data, now }) };
    });
    const status = readiness(evaluations);

    const confirm = (rule: PreRule, on: boolean) => {
        const sig = draft ? draftSignature(draft, rule.check) : "";
        setConfirmations((all: Confirmations) => ({ ...all, [NEXT]: { ...(all[NEXT] ?? {}), [rule.id]: { ...(all[NEXT]?.[rule.id] ?? {}), at: on ? Date.now() : 0, sig } } }));
        addLog({ at: Date.now(), trade: NEXT, rule: rule.title, what: on ? "Confirmed" : "Back to pending" });
    };
    const note = (rule: PreRule, text: string) => setConfirmations((all: Confirmations) => ({ ...all, [NEXT]: { ...(all[NEXT] ?? {}), [rule.id]: { ...(all[NEXT]?.[rule.id] ?? { at: 0 }), note: text } } }));
    const editTemplate = (fn: (t: RuleTemplate) => RuleTemplate) => setBook((b) => ({ ...b, templates: b.templates.map((t) => (t.id === template.id ? fn(t) : t)) }));
    // After a start, the next trade begins again from the market price, every rule pending.
    const reset = () => {
        setConfirmations((all: Confirmations) => ({ ...all, [NEXT]: {} }));
        setDraftState(price ? newDraft(Number(price.toPrecision(6)), draft?.capital ?? (demo ? 10_000 : null)) : null);
    };

    const plan = trade.plan;
    const alarmRules = useMemo(
        () => (trade.open && plan ? liveAlarms(template.live, { instrument: trade.instrument, direction: plan.direction, entry: plan.entry, stop: plan.stop, target: plan.target }) : []),
        [trade.open, trade.instrument, plan, template.live],
    );

    return { book, setBook, template, editTemplate, evaluations, status, notes: mine, confirm, note, log, addLog, alarmRules, ready: demo || bookStore.ready, market, instrument, draft, setDraft, draftPlan: plan2, price, reset, openTrade: trade.open };
}

export type RulesEngine = ReturnType<typeof useRulesEngine>;

const DOT: Record<RuleState, string> = { confirmed: "bg-[#4DD0E1]", pending: "border border-[var(--j-mu)]", not: "bg-[#E955A8]/60", failed: "bg-[#E955A8]", waiting: "border border-dashed border-[var(--j-mu)]", unavailable: "bg-[var(--j-line)]" };
const TEXT: Record<RuleState, string> = { confirmed: "text-[#4DD0E1]", pending: "text-[var(--j-mu)]", not: "text-[#E955A8]", failed: "text-[#E955A8]", waiting: "text-[var(--j-mu)]", unavailable: "text-[var(--j-mu)]" };
const clock = (at: number | null) => (at ? new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "—");
const field = "rounded-md border border-[var(--j-line)] bg-[var(--j-s2)] px-2 py-1.5 text-[12.5px] text-[var(--j-ink)] outline-none focus:border-[var(--j-mu)]";
const chip = (on: boolean) => `rounded-md px-2.5 py-1 text-[12px] transition-colors ${on ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`;

// The compact indicator kept in the terminal.
export function ReadinessBar({ engine, critical, live, onOpen }: { engine: RulesEngine; critical: number; live: number; onOpen: () => void }) {
    const { status, evaluations, template } = engine;
    return (
        <button type="button" onClick={onOpen} className="cmd-panel group block w-full p-4 text-left">
            <span className="flex items-center justify-between">
                <span className="cmd-label">Rules · {template.name}</span>
                <span className="text-[11.5px] text-[var(--j-mu)] transition-colors group-hover:text-[var(--j-ink)]">Open →</span>
            </span>
            <span className="mt-3 flex items-baseline gap-2">
                <span className="text-[26px] font-light tabular-nums leading-none text-[var(--j-ink)]">
                    {status.confirmed}/{status.total}
                </span>
                <span className="text-[13px] text-[var(--j-mu)]">confirmed</span>
                <span className={`ml-auto rounded border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${status.failed || critical ? "border-[#E955A8]/60 text-[#E955A8]" : status.ready ? "border-[#4DD0E1]/50 text-[#4DD0E1]" : "border-[var(--j-line)] text-[var(--j-mu)]"}`}>
                    {status.failed || critical ? "Violation" : status.ready ? "Ready" : "Not ready"}
                </span>
            </span>
            <span className="mt-3 flex gap-1" aria-hidden="true">
                {evaluations
                    .filter((e) => e.rule.enabled)
                    .map((e) => (
                        <span key={e.rule.id} className={`h-1.5 flex-1 rounded-full ${e.result.state === "confirmed" ? "bg-[#4DD0E1]" : e.result.state === "failed" || e.result.state === "not" ? "bg-[#E955A8]" : "bg-[var(--j-line)]"}`} />
                    ))}
            </span>
            <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[var(--j-mu)]">
                <span>{status.pending} pending</span>
                <span className={status.failed + critical ? "text-[#E955A8]" : ""}>
                    {status.failed + critical} critical {status.failed + critical === 1 ? "violation" : "violations"}
                </span>
                <span>{live ? `${live} live rules watching` : "No open position to watch"}</span>
            </span>
        </button>
    );
}

// --- Workspace ---------------------------------------------------------------

type Tab = "pre" | "live" | "alerts" | "templates";

export function RulesWorkspace({
    engine,
    open,
    onClose,
    history,
    sound,
    setSound,
    onTest,
    onTestCritical,
    simulated,
    onLaunch,
    blocked,
}: {
    engine: RulesEngine;
    open: boolean;
    onClose: () => void;
    history: AlarmHit[];
    sound: boolean;
    setSound: (on: boolean) => void;
    onTest: () => void;
    onTestCritical: () => void;
    simulated: boolean;
    onLaunch: (d: Draft, p: DraftPlan) => void;
    // Why a trade cannot be started now, if it cannot.
    blocked: string | null;
}) {
    const [tab, setTab] = useState<Tab>("pre");
    useEffect(() => {
        if (!open) return;
        const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", esc);
        return () => window.removeEventListener("keydown", esc);
    }, [open, onClose]);
    if (!open) return null;
    const { book, setBook, template } = engine;
    return (
        <div className="fixed inset-0 z-[85] flex justify-end bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
            <aside role="dialog" aria-label="Rules" onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-[620px] flex-col border-l border-[var(--j-line)] bg-[var(--j-bg)] text-[var(--j-ink)] shadow-[-30px_0_80px_-20px_rgba(0,0,0,0.8)]">
                <header className="flex-shrink-0 border-b border-[var(--j-line)] px-6 pb-0 pt-5">
                    <div className="flex items-center gap-3">
                        <p className="text-[17px] font-medium">Rules</p>
                        <select value={book.active} onChange={(e) => setBook((b) => ({ ...b, active: e.target.value }))} className={field} aria-label="Template">
                            {book.templates.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={onClose} aria-label="Close" className="ml-auto text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                            ✕
                        </button>
                    </div>
                    <p className="mt-2 text-[12px] text-[var(--j-mu)]">
                        Market data: Bybit public, live · {simulated ? "Trade: simulated" : "Trade: yours"} · AltureLock never places or closes an order.
                    </p>
                    <nav className="mt-4 grid grid-cols-4 gap-1 rounded-xl border border-[var(--j-line)] bg-[var(--j-s1)] p-1" role="tablist">
                        {(
                            [
                                ["pre", "Pre-trade", `${engine.status.confirmed}/${engine.status.total}`, engine.status.ready],
                                ["live", "Live", String(engine.alarmRules.filter((r) => r.on).length || template.live.filter((r) => r.on).length), engine.alarmRules.length > 0],
                                ["alerts", "Alerts", String(history.length), false],
                                ["templates", "Templates", String(book.templates.length), false],
                            ] as [Tab, string, string, boolean][]
                        ).map(([id, name, count, lit]) => (
                            <button key={id} role="tab" aria-selected={tab === id} type="button" onClick={() => setTab(id)} className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-[12px] font-medium transition-all duration-200 ${tab === id ? "bg-[var(--j-active)] text-[var(--j-activeink)] shadow-[0_4px_14px_-6px_rgba(0,0,0,0.6)]" : "text-[var(--j-mu)] hover:bg-[var(--j-s2)] hover:text-[var(--j-ink)]"}`}>
                                {name}
                                <span className={`rounded-full px-1.5 text-[10.5px] tabular-nums ${tab === id ? "bg-black/15" : lit ? "bg-[#4DD0E1]/15 text-[#4DD0E1]" : "bg-[var(--j-s2)]"}`}>{count}</span>
                            </button>
                        ))}
                    </nav>
                    <div className="h-4" />
                </header>
                <div key={tab} className="rk-in min-h-0 flex-1 overflow-y-auto px-6 py-5">
                    {tab === "pre" && <PreTab engine={engine} />}
                    {tab === "live" && <LiveTab engine={engine} />}
                    {tab === "alerts" && <AlertsTab engine={engine} history={history} sound={sound} setSound={setSound} onTest={onTest} onTestCritical={onTestCritical} />}
                    {tab === "templates" && <TemplatesTab engine={engine} />}
                </div>
                {tab === "pre" && <LaunchBar engine={engine} onLaunch={onLaunch} blocked={blocked} simulated={simulated} onDone={() => setTab("live")} />}
                <style>{RK_CSS}</style>
            </aside>
        </div>
    );
}

const RK_CSS = `
@keyframes rk-draw { from { stroke-dashoffset: 16 } to { stroke-dashoffset: 0 } }
@keyframes rk-pulse { 0% { box-shadow: 0 0 0 0 rgba(77,208,225,.6) } 100% { box-shadow: 0 0 0 12px rgba(77,208,225,0) } }
@keyframes rk-sweep { from { transform: translateX(-100%) } to { transform: translateX(100%) } }
@keyframes rk-in { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@keyframes rk-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(77,208,225,.0) } 50% { box-shadow: 0 0 28px -4px rgba(77,208,225,.55) } }
.rk-draw { stroke-dasharray: 16; animation: rk-draw 320ms cubic-bezier(.2,.8,.2,1) both }
.rk-pulse { animation: rk-pulse 600ms ease-out 1 }
.rk-sweep { animation: rk-sweep 900ms cubic-bezier(.2,.8,.2,1) 1 both }
.rk-in { animation: rk-in 240ms ease-out both }
.rk-glow { animation: rk-glow 2.4s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) { .rk-draw, .rk-pulse, .rk-sweep, .rk-in, .rk-glow { animation: none } }
`;

// Starting the trade records it and hands it to the live rules. The order itself is placed by the trader on the exchange.
function LaunchBar({ engine, onLaunch, blocked, simulated, onDone }: { engine: RulesEngine; onLaunch: (d: Draft, p: DraftPlan) => void; blocked: string | null; simulated: boolean; onDone: () => void }) {
    const { status, draft, draftPlan: p, reset, addLog, instrument } = engine;
    const can = status.ready && !!draft && !!p && !blocked;
    const missing = status.total - status.confirmed;
    return (
        <footer className="flex-shrink-0 border-t border-[var(--j-line)] bg-[var(--j-bg)] px-6 py-4">
            <button
                type="button"
                disabled={!can}
                onClick={() => {
                    if (!draft || !p) return;
                    onLaunch(draft, p);
                    addLog({ at: Date.now(), trade: instrument, rule: `${draft.direction} ${instrument}`, what: "Trade started" });
                    reset();
                    onDone();
                }}
                className={`w-full rounded-xl py-3.5 text-[14px] font-semibold tracking-wide transition-all duration-300 ${can ? "rk-glow bg-[#4DD0E1] text-[#06181b] hover:brightness-110" : "cursor-not-allowed bg-[var(--j-s2)] text-[var(--j-mu)]"}`}
            >
                {can ? `Start the ${draft!.direction.toLowerCase()} on ${instrument.replace(/USDT$/, "")}` : blocked ? "A trade is already in progress" : `Start the trade · ${missing} pending`}
            </button>
            <p className="mt-2 text-center text-[11.5px] text-[var(--j-mu)]">
                {blocked ?? (simulated ? "Demo: the trade is simulated. Nothing is sent to an exchange." : "You place the order on your exchange. AltureLock records the trade and starts the live rules.")}
            </p>
        </footer>
    );
}

function move<T>(list: T[], i: number, by: number) {
    const j = i + by;
    if (j < 0 || j >= list.length) return list;
    const next = [...list];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
}

const money = (n: number | null) => (n === null ? "—" : `$${n.toLocaleString("en-US", { maximumFractionDigits: 2 })}`);
const num = (n: number | null, digits = 2) => (n === null ? "—" : n.toLocaleString("en-US", { maximumFractionDigits: n < 10 ? 4 : digits }));
const parse = (v: string) => {
    const n = Number(v.replace(/,/g, ""));
    return v.trim() === "" || !Number.isFinite(n) ? null : n;
};

// A checkbox drawn for the moment it is ticked: the ring fills, the tick draws itself, a pulse goes out.
function CheckMark({ state, onClick, label, disabled }: { state: RuleState; onClick?: () => void; label: string; disabled?: boolean }) {
    const on = state === "confirmed";
    const bad = state === "not" || state === "failed";
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={on}
            aria-label={label}
            disabled={disabled || !onClick}
            onClick={(e) => {
                e.stopPropagation();
                onClick?.();
            }}
            className={`relative grid h-6 w-6 flex-shrink-0 place-items-center rounded-full border transition-all duration-300 ${on ? "rk-pulse border-[#4DD0E1] bg-[#4DD0E1]" : bad ? "border-[#E955A8] bg-[#E955A8]/10" : "border-[var(--j-mu)] hover:border-[var(--j-ink)] hover:bg-[var(--j-s2)]"} ${onClick ? "cursor-pointer" : "cursor-default"}`}
        >
            {on ? (
                <svg key="on" viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="#06181b" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="rk-draw" />
                </svg>
            ) : bad ? (
                <span className="text-[12px] font-semibold leading-none text-[#E955A8]">!</span>
            ) : state === "waiting" ? (
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--j-mu)]" />
            ) : null}
        </button>
    );
}

function Seg<T extends string>({ value, options, onChange }: { value: T; options: [T, string][]; onChange: (v: T) => void }) {
    return (
        <div className="inline-flex rounded-lg border border-[var(--j-line)] bg-[var(--j-s2)] p-0.5">
            {options.map(([id, name]) => (
                <button key={id} type="button" aria-pressed={value === id} onClick={() => onChange(id)} className={`rounded-md px-3 py-1.5 text-[12px] transition-all ${value === id ? "bg-[var(--j-active)] font-medium text-[var(--j-activeink)] shadow-sm" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                    {name}
                </button>
            ))}
        </div>
    );
}

function NumField({ label, value, onChange, suffix, placeholder }: { label: string; value: number | null; onChange: (v: number | null) => void; suffix?: string; placeholder?: string }) {
    const [text, setText] = useState(value === null ? "" : String(value));
    useEffect(() => {
        if (parse(text) !== value) setText(value === null ? "" : String(value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (
        <label className="block">
            <span className="mb-1 block text-[10.5px] uppercase tracking-[0.1em] text-[var(--j-mu)]">{label}</span>
            <span className="flex items-center rounded-md border border-[var(--j-line)] bg-[var(--j-s2)] focus-within:border-[var(--j-mu)]">
                <input inputMode="decimal" value={text} placeholder={placeholder} onChange={(e) => { setText(e.target.value); onChange(parse(e.target.value)); }} className="w-full min-w-0 bg-transparent px-2.5 py-1.5 text-[13px] tabular-nums text-[var(--j-ink)] outline-none" />
                {suffix && <span className="pr-2.5 text-[12px] text-[var(--j-mu)]">{suffix}</span>}
            </span>
        </label>
    );
}

function Readout({ items }: { items: [string, string, string?][] }) {
    return (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[var(--j-line)] bg-[var(--j-line)] sm:grid-cols-3">
            {items.map(([term, value, tone]) => (
                <div key={term} className="bg-[var(--j-s1)] px-3 py-2.5">
                    <dt className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--j-mu)]">{term}</dt>
                    <dd className={`mt-1 text-[14px] tabular-nums ${tone ?? "text-[var(--j-ink)]"}`}>{value}</dd>
                </div>
            ))}
        </dl>
    );
}

// The next trade: what every automatic rule reads.
function TradeCard({ engine }: { engine: RulesEngine }) {
    const { draft, setDraft, draftPlan: p, price, instrument } = engine;
    if (!draft || !p) return <p className="mb-5 rounded-xl border border-[var(--j-line)] p-4 text-[13px] text-[var(--j-mu)]">Waiting for the market price…</p>;
    return (
        <div className="mb-5 rounded-xl border border-[var(--j-line)] bg-[var(--j-s1)] p-4">
            <div className="flex flex-wrap items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--j-mu)]">Next trade</p>
                <span className="text-[13px] font-medium">{instrument.replace(/USDT$/, "")}/USDT</span>
                <span className="ml-auto">
                    <Seg value={draft.direction} options={[["Long", "Long"], ["Short", "Short"]]} onChange={(direction) => setDraft({ direction })} />
                </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
                <div>
                    <NumField label="Entry" value={draft.entry} onChange={(entry) => setDraft({ entry })} />
                    {price !== null && <button type="button" onClick={() => setDraft({ entry: Number(price.toPrecision(6)) })} className="mt-1 text-[11px] text-[var(--j-mu)] hover:text-[var(--j-ink)]">Use market {num(price)}</button>}
                </div>
                <NumField label="Capital" value={draft.capital} onChange={(capital) => setDraft({ capital })} suffix="$" placeholder="Your account" />
                <NumField label="Risk" value={draft.riskPct} onChange={(riskPct) => setDraft({ riskPct: riskPct ?? 0 })} suffix="%" />
            </div>
        </div>
    );
}

function Decide({ ok, confirmed, onConfirm, onPending, error }: { ok: boolean; confirmed: boolean; onConfirm: () => void; onPending: () => void; error: string | null }) {
    return (
        <div className="mt-3 flex flex-wrap items-center gap-2">
            {error ? (
                <p className="text-[12.5px] text-[#E955A8]">{error}</p>
            ) : (
                <p className={`text-[12.5px] ${confirmed ? "text-[#4DD0E1]" : "text-[var(--j-mu)]"}`}>{confirmed ? "Confirmed. Change a number and it goes back to pending." : ok ? "Valid. Confirm when you are sure." : "Not complete yet."}</p>
            )}
            <span className="ml-auto flex gap-2">
                <button type="button" onClick={onPending} disabled={!confirmed} className="rounded-lg border border-[var(--j-line)] px-3 py-1.5 text-[12.5px] text-[var(--j-mu)] enabled:hover:text-[var(--j-ink)] disabled:opacity-40">Pending</button>
                <button type="button" onClick={onConfirm} disabled={!ok || confirmed} className="rounded-lg bg-[#4DD0E1] px-3.5 py-1.5 text-[12.5px] font-medium text-[#06181b] transition-opacity disabled:opacity-30">Confirm</button>
            </span>
        </div>
    );
}

function StopPanel({ engine, rule, state }: { engine: RulesEngine; rule: PreRule; state: RuleState }) {
    const { draft: d, setDraft, draftPlan: p, confirm } = engine;
    if (!d || !p) return null;
    const pct = p.riskAmount !== null && d.capital ? (p.riskAmount / d.capital) * 100 : null;
    const valid = !!p.entry && !p.riskError && (d.stopType === "later" || (p.stop !== null && !p.stopError));
    return (
        <div className="rk-in space-y-3 rounded-xl border border-[var(--j-line)] bg-[var(--j-s1)] p-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--j-mu)]">Type</span>
                <Seg value={d.stopType} options={[["price", "Price"], ["percent", "Distance %"], ["later", "After entry"]]} onChange={(stopType) => setDraft({ stopType, stopValue: stopType === "price" ? (p.stop ? Number(p.stop.toPrecision(6)) : null) : stopType === "percent" ? (p.distancePct ? Number(p.distancePct.toFixed(2)) : 0.5) : d.stopValue })} />
            </div>
            {d.stopType === "later" ? (
                <p className="text-[12.5px] leading-relaxed text-[var(--j-mu)]">No stop needed to prepare. You set it on the exchange right after entry; the risk below is what you accept to lose. The position size is known once the stop is.</p>
            ) : (
                <div className="grid grid-cols-3 gap-2">
                    <NumField label={d.stopType === "price" ? "Stop price" : "Distance"} value={d.stopValue} onChange={(stopValue) => setDraft({ stopValue })} suffix={d.stopType === "percent" ? "%" : undefined} />
                    <NumField label="Risk per trade" value={d.riskPct} onChange={(riskPct) => setDraft({ riskPct: riskPct ?? 0 })} suffix="%" />
                    <NumField label="Your maximum" value={d.maxRisk} onChange={(maxRisk) => setDraft({ maxRisk: maxRisk ?? 0 })} suffix="%" />
                </div>
            )}
            <Readout
                items={[
                    ["Stop", d.stopType === "later" ? "After entry" : num(p.stop), p.stopError ? "text-[#E955A8]" : undefined],
                    ["Distance", p.distance !== null ? `${num(p.distance)} · ${p.distancePct!.toFixed(2)}%` : "—"],
                    ["Risk amount", money(p.riskAmount)],
                    ["Risk of capital", pct !== null ? `${pct.toFixed(2)}%` : "—", p.riskError ? "text-[#E955A8]" : undefined],
                    ["Capital", money(d.capital)],
                    ["Position size", p.quantity !== null ? num(p.quantity, 4) : "—"],
                ]}
            />
            <Decide ok={valid} confirmed={state === "confirmed"} error={p.stopError ?? p.riskError} onConfirm={() => confirm(rule, true)} onPending={() => confirm(rule, false)} />
        </div>
    );
}

function TargetPanel({ engine, rule, state }: { engine: RulesEngine; rule: PreRule; state: RuleState }) {
    const { draft: d, setDraft, draftPlan: p, confirm } = engine;
    if (!d || !p) return null;
    const pct = p.target !== null && p.entry ? (Math.abs(p.target - p.entry) / p.entry) * 100 : null;
    return (
        <div className="rk-in space-y-3 rounded-xl border border-[var(--j-line)] bg-[var(--j-s1)] p-4">
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10.5px] uppercase tracking-[0.1em] text-[var(--j-mu)]">Type</span>
                <Seg value={d.targetType} options={[["price", "Price"], ["r", "R multiple"], ["percent", "Distance %"]]} onChange={(targetType) => setDraft({ targetType, targetValue: targetType === "price" ? (p.target ? Number(p.target.toPrecision(6)) : null) : targetType === "r" ? (p.rr ? Number(p.rr.toFixed(2)) : 2) : pct ? Number(pct.toFixed(2)) : 1 })} />
            </div>
            <div className="grid grid-cols-3 gap-2">
                <NumField label={d.targetType === "price" ? "Target price" : d.targetType === "r" ? "Reward" : "Distance"} value={d.targetValue} onChange={(targetValue) => setDraft({ targetValue })} suffix={d.targetType === "r" ? "R" : d.targetType === "percent" ? "%" : undefined} />
            </div>
            <Readout
                items={[
                    ["Take profit", num(p.target), p.targetError ? "text-[#E955A8]" : undefined],
                    ["Distance", p.target !== null && p.entry ? `${num(Math.abs(p.target - p.entry))} · ${pct!.toFixed(2)}%` : "—"],
                    ["Reward amount", money(p.reward), p.reward !== null ? "text-[#4DD0E1]" : undefined],
                ]}
            />
            <Decide ok={p.target !== null && !p.targetError} confirmed={state === "confirmed"} error={p.targetError} onConfirm={() => confirm(rule, true)} onPending={() => confirm(rule, false)} />
        </div>
    );
}

function RRPanel({ engine, rule, state }: { engine: RulesEngine; rule: PreRule; state: RuleState }) {
    const { draft: d, draftPlan: p, confirm } = engine;
    if (!d || !p) return null;
    const min = rule.rr ?? 2;
    const later = d.stopType === "later";
    const rr = p.rr;
    const scale = Math.max(min * 1.5, (rr ?? 0) * 1.1, 3);
    const below = rr !== null && rr < min;
    return (
        <div className="rk-in space-y-3 rounded-xl border border-[var(--j-line)] bg-[var(--j-s1)] p-4">
            <div className="relative h-9">
                <div className="absolute inset-x-0 top-3 h-2 overflow-hidden rounded-full bg-[var(--j-s2)]">
                    {rr !== null && <div className={`h-full rounded-full transition-all duration-500 ${below ? "bg-[#E955A8]" : "bg-[#4DD0E1]"}`} style={{ width: `${Math.min(100, (rr / scale) * 100)}%` }} />}
                </div>
                <span className="absolute top-1 h-6 w-px bg-[var(--j-ink)]" style={{ left: `${(min / scale) * 100}%` }} />
                <span className="absolute -bottom-1 -translate-x-1/2 text-[10.5px] text-[var(--j-mu)]" style={{ left: `${(min / scale) * 100}%` }}>min 1 : {min}</span>
            </div>
            <Readout
                items={[
                    ["Ratio", later ? "After entry" : rr !== null ? `1 : ${rr.toFixed(2)}` : "—", below ? "text-[#E955A8]" : rr !== null ? "text-[#4DD0E1]" : undefined],
                    ["Risk", money(p.riskAmount)],
                    ["Reward", money(p.reward)],
                ]}
            />
            <Decide ok={later || (rr !== null && rr >= min)} confirmed={state === "confirmed"} error={below ? `Below your minimum 1 : ${min}. Move the target or the stop.` : null} onConfirm={() => confirm(rule, true)} onPending={() => confirm(rule, false)} />
        </div>
    );
}

// The readiness of the next trade, as a ring.
function Ring({ done, total, ready }: { done: number; total: number; ready: boolean }) {
    const r = 20;
    const c = 2 * Math.PI * r;
    return (
        <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90" aria-hidden="true">
            <circle cx={24} cy={24} r={r} fill="none" stroke="var(--j-line)" strokeWidth={4} />
            <circle cx={24} cy={24} r={r} fill="none" stroke={ready ? "#4DD0E1" : "var(--j-ink)"} strokeWidth={4} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - (total ? done / total : 0))} style={{ transition: "stroke-dashoffset 600ms cubic-bezier(.2,.8,.2,1), stroke 300ms" }} />
        </svg>
    );
}

function PreTab({ engine }: { engine: RulesEngine }) {
    const { evaluations, editTemplate, notes, confirm, note, status } = engine;
    const [openId, setOpenId] = useState<string | null>(null);
    const [editing, setEditing] = useState<string | null>(null);
    const save = (rule: PreRule) => editTemplate((t) => ({ ...t, pre: t.pre.map((r) => (r.id === rule.id ? rule : r)) }));
    return (
        <div>
            <div className="mb-5 flex items-center gap-4">
                <div className="relative">
                    <Ring done={status.confirmed} total={status.total} ready={status.ready} />
                    <span className="absolute inset-0 grid place-items-center text-[13px] font-medium tabular-nums">
                        {status.confirmed}/{status.total}
                    </span>
                </div>
                <div>
                    <p className={`text-[15px] font-medium ${status.ready ? "text-[#4DD0E1]" : ""}`}>{status.ready ? "Every mandatory rule is confirmed." : `${status.total - status.confirmed} to go before this trade is ready.`}</p>
                    <p className="mt-0.5 text-[12.5px] text-[var(--j-mu)]">Tick what you checked yourself. Open stop, target and ratio to set and confirm them.</p>
                </div>
            </div>
            <TradeCard engine={engine} />
            <ul className="space-y-1.5">
                {evaluations.map(({ rule, result }, i) => {
                    const expanded = openId === rule.id;
                    const confirmed = result.state === "confirmed";
                    const manual = rule.check === "manual";
                    return (
                        <li key={rule.id} className={`relative overflow-hidden rounded-xl border transition-colors duration-300 ${confirmed ? "border-[#4DD0E1]/35 bg-[#4DD0E1]/[0.04]" : expanded ? "border-[var(--j-mu)]/50 bg-[var(--j-s1)]" : "border-[var(--j-line)]"} ${rule.enabled ? "" : "opacity-50"}`}>
                            {confirmed && <span key={`${rule.id}-${result.at}`} aria-hidden="true" className="rk-sweep pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[#4DD0E1]/15 to-transparent" />}
                            <div className="relative flex items-center gap-3 px-3 py-2.5">
                                <CheckMark state={result.state} label={rule.title} onClick={manual && rule.enabled ? () => confirm(rule, !confirmed) : rule.enabled ? () => setOpenId(expanded ? null : rule.id) : undefined} />
                                <button type="button" onClick={() => setOpenId(expanded ? null : rule.id)} aria-expanded={expanded} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                                    <span className="min-w-0 flex-1">
                                        <span className={`block truncate text-[14px] transition-colors ${confirmed ? "text-[var(--j-ink)]" : ""}`}>{rule.title}</span>
                                        <span className="mt-0.5 block truncate text-[11.5px] text-[var(--j-mu)]">
                                            <span className={TEXT[result.state]}>{STATE_NAME[result.state]}</span>
                                            {!manual && result.detail ? ` · ${result.detail}` : ` · ${rule.mandatory ? "Mandatory" : "Optional"}`}
                                        </span>
                                    </span>
                                    {!manual && rule.check !== "condition" && <span className="rounded-md border border-[var(--j-line)] px-2 py-0.5 text-[11px] text-[var(--j-mu)]">{expanded ? "Close" : "Set"}</span>}
                                    <span className="text-[11px] tabular-nums text-[var(--j-mu)]">{clock(result.at)}</span>
                                    <span className={`text-[var(--j-mu)] transition-transform duration-200 ${expanded ? "rotate-90" : ""}`} aria-hidden="true">›</span>
                                </button>
                            </div>
                            {expanded && (
                                <div className="relative px-3 pb-3">
                                    {editing === rule.id ? (
                                        <PreEditor rule={rule} onSave={(r) => { save(r); setEditing(null); }} onCancel={() => setEditing(null)} />
                                    ) : (
                                        <>
                                            {rule.check === "stop" && <StopPanel engine={engine} rule={rule} state={result.state} />}
                                            {rule.check === "target" && <TargetPanel engine={engine} rule={rule} state={result.state} />}
                                            {rule.check === "rr" && <RRPanel engine={engine} rule={rule} state={result.state} />}
                                            {(manual || rule.check === "condition") && (
                                                <div className="rk-in pl-9">
                                                    {rule.description && <p className="text-[13px] leading-relaxed text-[var(--j-mu)]">{rule.description}</p>}
                                                    <p className={`mt-1.5 text-[13px] ${TEXT[result.state]}`}>{result.detail}</p>
                                                    {rule.check === "condition" && rule.condition && <p className="mt-1 text-[12px] text-[var(--j-mu)]">Condition: {describeCondition(rule.condition)} · {TIMEFRAME_NAME[rule.condition.timeframe]} candles, closed only. Checked automatically.</p>}
                                                </div>
                                            )}
                                            <div className="pl-9">
                                                <textarea defaultValue={notes[rule.id]?.note ?? ""} onBlur={(e) => e.target.value !== (notes[rule.id]?.note ?? "") && note(rule, e.target.value)} placeholder="Note for this trade (optional)" rows={1} className={`${field} mt-3 block w-full resize-none`} />
                                                <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[var(--j-mu)]">
                                                    <span>{rule.mandatory ? "Mandatory" : "Optional"}{rule.priority === "high" ? " · High priority" : ""}</span>
                                                    <button type="button" onClick={() => setEditing(rule.id)} className="hover:text-[var(--j-ink)]">Edit</button>
                                                    <button type="button" onClick={() => save({ ...rule, enabled: !rule.enabled })} className="hover:text-[var(--j-ink)]">{rule.enabled ? "Switch off" : "Switch on"}</button>
                                                    <button type="button" onClick={() => editTemplate((t) => ({ ...t, pre: move(t.pre, i, -1) }))} className="hover:text-[var(--j-ink)]">Move up</button>
                                                    <button type="button" onClick={() => editTemplate((t) => ({ ...t, pre: move(t.pre, i, 1) }))} className="hover:text-[var(--j-ink)]">Move down</button>
                                                    <button type="button" onClick={() => editTemplate((t) => ({ ...t, pre: t.pre.filter((r) => r.id !== rule.id) }))} className="hover:text-[#E955A8]">Delete</button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <button
                type="button"
                onClick={() => {
                    const r = newPreRule();
                    editTemplate((t) => ({ ...t, pre: [...t.pre, r] }));
                    setOpenId(r.id);
                    setEditing(r.id);
                }}
                className="mt-4 border-b border-current text-[13px]"
            >
                + Add a pre-trade rule
            </button>
        </div>
    );
}

function ConditionFields<T extends { source?: ConditionSource; period?: number; side: "above" | "below"; level: number; timeframe: AlarmTimeframe; closes: number }>({ value, onChange }: { value: T; onChange: (v: T) => void }) {
    const source = value.source ?? "price";
    return (
        <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
                <select className={field} value={value.timeframe} onChange={(e) => onChange({ ...value, timeframe: e.target.value as AlarmTimeframe })} aria-label="Timeframe">
                    {TIMEFRAMES.map((tf) => <option key={tf} value={tf}>{TIMEFRAME_NAME[tf]} close</option>)}
                </select>
                <select className={field} value={value.side} onChange={(e) => onChange({ ...value, side: e.target.value as "above" | "below" })} aria-label="Side">
                    <option value="above">above</option>
                    <option value="below">below</option>
                </select>
                <select className={field} value={source} onChange={(e) => onChange({ ...value, source: e.target.value as ConditionSource })} aria-label="Compared with">
                    {SOURCES.map((s) => <option key={s} value={s}>{SOURCE_NAME[s]}</option>)}
                </select>
                {(source === "ema" || source === "sma" || source === "rsi") && <input className={`${field} w-16`} inputMode="numeric" value={value.period ?? (source === "rsi" ? 14 : 20)} onChange={(e) => onChange({ ...value, period: Number(e.target.value) || undefined })} aria-label="Period" />}
                {(source === "price" || source === "rsi") && <input className={`${field} w-28 tabular-nums`} inputMode="decimal" placeholder={source === "rsi" ? "e.g. 70" : "Price"} value={value.level || ""} onChange={(e) => onChange({ ...value, level: Number(e.target.value.replace(/,/g, "")) || 0 })} aria-label={source === "rsi" ? "RSI level" : "Price level"} />}
            </div>
            <div className="flex items-center gap-2 text-[12.5px]">
                <span className="text-[var(--j-mu)]">Closes in a row</span>
                {[1, 2, 3].map((n) => <button key={n} type="button" aria-pressed={value.closes === n} onClick={() => onChange({ ...value, closes: n })} className={chip(value.closes === n)}>{n}</button>)}
            </div>
            <p className="text-[11.5px] text-[var(--j-mu)]">Checked on closed candles only. VWAP resets at 00:00 UTC. Volume, CVD, structure and FVG conditions are not available here yet.</p>
        </div>
    );
}

function PreEditor({ rule, onSave, onCancel }: { rule: PreRule; onSave: (r: PreRule) => void; onCancel: () => void }) {
    const [r, setR] = useState(rule);
    const condition = r.condition ?? { source: "vwap" as ConditionSource, side: "above" as const, level: 0, timeframe: "15" as AlarmTimeframe, closes: 1 };
    return (
        <div className="space-y-3 rounded-lg bg-[var(--j-s1)] p-4">
            <input className={`${field} w-full`} value={r.title} onChange={(e) => setR({ ...r, title: e.target.value })} aria-label="Rule title" placeholder="Rule title" />
            <textarea className={`${field} block w-full resize-none`} rows={2} value={r.description} onChange={(e) => setR({ ...r, description: e.target.value })} placeholder="Description" aria-label="Description" />
            <div className="flex flex-wrap items-center gap-1">
                {(
                    [
                        ["manual", "You confirm"],
                        ["stop", "Stop loss set"],
                        ["target", "Take profit set"],
                        ["rr", "Risk/reward"],
                        ["condition", "Technical condition"],
                    ] as [PreRule["check"], string][]
                ).map(([id, name]) => <button key={id} type="button" aria-pressed={r.check === id} onClick={() => setR({ ...r, check: id, condition: id === "condition" ? condition : r.condition })} className={chip(r.check === id)}>{name}</button>)}
            </div>
            {r.check === "rr" && (
                <label className="flex items-center gap-2 text-[12.5px] text-[var(--j-mu)]">
                    Minimum 1 :
                    <input className={`${field} w-16`} inputMode="decimal" value={r.rr ?? 2} onChange={(e) => setR({ ...r, rr: Number(e.target.value) || 0 })} />
                </label>
            )}
            {r.check === "condition" && <ConditionFields value={condition} onChange={(c) => setR({ ...r, condition: c })} />}
            <div className="flex flex-wrap gap-1">
                <button type="button" aria-pressed={r.mandatory} onClick={() => setR({ ...r, mandatory: !r.mandatory })} className={chip(r.mandatory)}>{r.mandatory ? "Mandatory" : "Optional"}</button>
                <button type="button" aria-pressed={r.priority === "high"} onClick={() => setR({ ...r, priority: r.priority === "high" ? "normal" : "high" })} className={chip(r.priority === "high")}>High priority</button>
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={() => onSave({ ...r, title: r.title.trim() || "Untitled rule" })} className="rounded-md bg-[var(--j-active)] px-3 py-1.5 text-[12.5px] text-[var(--j-activeink)]">Save</button>
                <button type="button" onClick={onCancel} className="px-3 py-1.5 text-[12.5px] text-[var(--j-mu)]">Cancel</button>
            </div>
        </div>
    );
}

const ANCHOR_NAME = { entry: "Entry", stop: "Stop loss", target: "Take profit" } as const;
const liveText = (r: LiveRule) =>
    r.anchor
        ? r.kind === "price"
            ? `Price reaches the ${ANCHOR_NAME[r.anchor].toLowerCase()}`
            : `${r.closes > 1 ? `${r.closes} ${TIMEFRAME_NAME[r.timeframe]} closes` : `A ${TIMEFRAME_NAME[r.timeframe]} close`} back through the ${ANCHOR_NAME[r.anchor].toLowerCase()}`
        : r.kind === "price"
          ? `Price ${r.side} ${r.level.toLocaleString("en-US")}`
          : describeCondition(r);

function LiveTab({ engine }: { engine: RulesEngine }) {
    const { template, editTemplate, alarmRules } = engine;
    const [editing, setEditing] = useState<string | null>(null);
    const save = (rule: LiveRule) => editTemplate((t) => ({ ...t, live: t.live.map((r) => (r.id === rule.id ? rule : r)) }));
    return (
        <div>
            <p className="mb-4 text-[13px] leading-relaxed text-[var(--j-mu)]">
                Watched while a position is open. Levels can follow your trade (entry, stop, target); rules are written for a long and mirror for a short. {alarmRules.length ? `${alarmRules.length} watching your open trade now.` : "No open trade: nothing is being watched."}
            </p>
            <ul className="border-t border-[var(--j-line)]">
                {template.live.map((rule, i) => {
                    const level = severity(rule);
                    return (
                        <li key={rule.id} className="border-b border-[var(--j-line)] py-3">
                            <div className="flex items-center gap-3">
                                <button type="button" role="switch" aria-checked={rule.on} aria-label={rule.on ? "Switch off" : "Switch on"} onClick={() => save({ ...rule, on: !rule.on })} className={`relative h-4 w-7 flex-shrink-0 rounded-full transition-colors ${rule.on ? "bg-[var(--j-active)]" : "bg-[var(--j-s2)]"}`}>
                                    <span className={`absolute top-0.5 h-3 w-3 rounded-full transition-all ${rule.on ? "left-3.5 bg-[var(--j-activeink)]" : "left-0.5 bg-[var(--j-mu)]"}`} />
                                </button>
                                <button type="button" onClick={() => setEditing(editing === rule.id ? null : rule.id)} className={`min-w-0 flex-1 text-left ${rule.on ? "" : "opacity-50"}`}>
                                    <span className="block truncate text-[14px]">{rule.label || liveText(rule)}</span>
                                    <span className="block truncate text-[11.5px] text-[var(--j-mu)]">
                                        {rule.label ? `${liveText(rule)} · ` : ""}
                                        <span className={level === "check" ? "text-[#4DD0E1]" : "text-[#E955A8]"}>{level === "critical" ? "Critical (V2)" : level === "exit" ? "Exit signal (V1)" : "Check (V1)"}</span>
                                    </span>
                                </button>
                            </div>
                            {editing === rule.id && (
                                <div className="mt-3 space-y-3 rounded-lg bg-[var(--j-s1)] p-4 pl-4">
                                    <input className={`${field} w-full`} value={rule.label} placeholder="Name (optional)" onChange={(e) => save({ ...rule, label: e.target.value })} aria-label="Name" />
                                    <div className="flex flex-wrap gap-1">
                                        <button type="button" onClick={() => save({ ...rule, kind: "close" })} className={chip(rule.kind === "close")}>Candle close</button>
                                        <button type="button" onClick={() => save({ ...rule, kind: "price", source: "price" })} className={chip(rule.kind === "price")}>Price touch</button>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1 text-[12.5px]">
                                        <span className="mr-1 text-[var(--j-mu)]">Level</span>
                                        {(["entry", "stop", "target"] as const).map((a) => (
                                            <button key={a} type="button" onClick={() => save({ ...rule, anchor: a, source: "price", side: a === "target" ? "above" : "below" })} className={chip(rule.anchor === a)}>
                                                {ANCHOR_NAME[a]}
                                            </button>
                                        ))}
                                        <button type="button" onClick={() => save({ ...rule, anchor: undefined })} className={chip(!rule.anchor)}>Other</button>
                                    </div>
                                    {!rule.anchor && (rule.kind === "close" ? <ConditionFields value={rule} onChange={save} /> : (
                                        <div className="flex gap-2">
                                            <select className={field} value={rule.side} onChange={(e) => save({ ...rule, side: e.target.value as "above" | "below" })} aria-label="Side"><option value="above">at or above</option><option value="below">at or below</option></select>
                                            <input className={`${field} w-28`} inputMode="decimal" value={rule.level || ""} placeholder="Price" onChange={(e) => save({ ...rule, level: Number(e.target.value.replace(/,/g, "")) || 0 })} aria-label="Price level" />
                                        </div>
                                    ))}
                                    {rule.anchor && rule.kind === "close" && (
                                        <div className="flex items-center gap-2 text-[12.5px]">
                                            <select className={field} value={rule.timeframe} onChange={(e) => save({ ...rule, timeframe: e.target.value as AlarmTimeframe })} aria-label="Timeframe">{TIMEFRAMES.map((tf) => <option key={tf} value={tf}>{TIMEFRAME_NAME[tf]}</option>)}</select>
                                            <span className="text-[var(--j-mu)]">closes in a row</span>
                                            {[1, 2, 3].map((n) => <button key={n} type="button" onClick={() => save({ ...rule, closes: n })} className={chip(rule.closes === n)}>{n}</button>)}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-1 text-[12.5px]">
                                        <span className="mr-1 text-[var(--j-mu)]">Alert</span>
                                        <button type="button" onClick={() => save({ ...rule, urgent: false, closes: rule.kind === "close" ? 1 : rule.closes })} className={chip(level === "check")}>Check</button>
                                        {rule.kind === "close" && <button type="button" onClick={() => save({ ...rule, urgent: false, closes: Math.max(2, rule.closes) })} className={chip(level === "exit")}>Exit signal</button>}
                                        <button type="button" onClick={() => save({ ...rule, urgent: true })} className={chip(level === "critical")}>Critical</button>
                                    </div>
                                    <div className="flex gap-4 text-[12px] text-[var(--j-mu)]">
                                        <button type="button" onClick={() => editTemplate((t) => ({ ...t, live: move(t.live, i, -1) }))} className="hover:text-[var(--j-ink)]">Move up</button>
                                        <button type="button" onClick={() => editTemplate((t) => ({ ...t, live: move(t.live, i, 1) }))} className="hover:text-[var(--j-ink)]">Move down</button>
                                        <button type="button" onClick={() => editTemplate((t) => ({ ...t, live: t.live.filter((r) => r.id !== rule.id) }))} className="hover:text-[#E955A8]">Delete</button>
                                        <button type="button" onClick={() => setEditing(null)} className="ml-auto text-[var(--j-ink)]">Done</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
            <button
                type="button"
                onClick={() => {
                    const r = newLiveRule();
                    editTemplate((t) => ({ ...t, live: [...t.live, r] }));
                    setEditing(r.id);
                }}
                className="mt-4 border-b border-current text-[13px]"
            >
                + Add a live rule
            </button>
            <p className="mt-6 text-[12px] leading-relaxed text-[var(--j-mu)]">Also watched without a rule: price close to your stop, daily limit reached, a position open past it, a lost exchange connection, and several rules broken within 15 minutes. These are critical.</p>
        </div>
    );
}

function AlertsTab({ engine, history, sound, setSound, onTest, onTestCritical }: { engine: RulesEngine; history: AlarmHit[]; sound: boolean; setSound: (on: boolean) => void; onTest: () => void; onTestCritical: () => void }) {
    const [permission, setPermission] = useState("default");
    useEffect(() => {
        if (typeof Notification !== "undefined") setPermission(Notification.permission);
    }, []);
    const levels = [
        ["Check", "V1", "A condition worth a look. Banner and short sound.", "text-[#4DD0E1]"],
        ["Exit signal", "V1", "An obvious break your rule calls an exit. Banner and lower sound.", "text-[#E955A8]"],
        ["Critical", "V2", "Risk event. Covers the screen, deeper sound, stays until you confirm.", "text-[#E955A8]"],
    ];
    const events = [...history.map((h) => ({ at: h.at, text: `${h.title}`, tone: h.level })), ...engine.log.map((e) => ({ at: e.at, text: `${e.what}: ${e.rule}`, tone: "log" as const }))].sort((a, b) => b.at - a.at).slice(0, 40);
    return (
        <div className="space-y-6">
            <dl className="divide-y divide-[var(--j-line)] border-y border-[var(--j-line)]">
                {levels.map(([name, v, text, tone]) => (
                    <div key={name} className="flex gap-4 py-3">
                        <dt className={`w-28 flex-shrink-0 text-[13px] font-medium ${tone}`}>
                            {name} <span className="text-[11px] font-normal text-[var(--j-mu)]">{v}</span>
                        </dt>
                        <dd className="text-[13px] text-[var(--j-mu)]">{text}</dd>
                    </div>
                ))}
            </dl>
            <div className="flex flex-wrap gap-2 text-[12.5px]">
                <button type="button" onClick={() => setSound(!sound)} className={chip(sound)}>Sound {sound ? "on" : "off"}</button>
                {permission === "default" && <button type="button" onClick={() => Notification.requestPermission().then(setPermission)} className={chip(false)}>Notify me in other tabs</button>}
                {permission === "granted" && <span className="px-2.5 py-1 text-[var(--j-mu)]">Notifications on</span>}
                <button type="button" onClick={onTest} className={chip(false)}>Test check</button>
                <button type="button" onClick={onTestCritical} className={chip(false)}>Test critical</button>
            </div>
            <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--j-mu)]">History</p>
                {events.length === 0 ? (
                    <p className="text-[13px] text-[var(--j-mu)]">Nothing yet. Alerts and confirmations are recorded here.</p>
                ) : (
                    <ul className="space-y-1.5 text-[12.5px]">
                        {events.map((e, i) => (
                            <li key={i} className="flex gap-3">
                                <span className="w-12 flex-shrink-0 tabular-nums text-[var(--j-mu)]">{clock(e.at)}</span>
                                <span className={e.tone === "check" ? "text-[#4DD0E1]" : e.tone === "log" ? "text-[var(--j-mu)]" : "text-[#E955A8]"}>{e.tone === "critical" ? "◆" : e.tone === "log" ? "·" : "●"}</span>
                                <span className="min-w-0 truncate">{e.text}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <p className="text-[11.5px] text-[var(--j-mu)]">Alerts work while the terminal is open, in this tab or another. They never place or close an order.</p>
        </div>
    );
}

function TemplatesTab({ engine }: { engine: RulesEngine }) {
    const { book, setBook } = engine;
    const [renaming, setRenaming] = useState<string | null>(null);
    return (
        <div>
            <p className="mb-4 text-[13px] text-[var(--j-mu)]">A template holds your pre-trade and live rules. Every template can be edited.</p>
            <ul className="border-t border-[var(--j-line)]">
                {book.templates.map((t) => (
                    <li key={t.id} className="flex items-center gap-3 border-b border-[var(--j-line)] py-3">
                        <button type="button" onClick={() => setBook((b) => ({ ...b, active: t.id }))} aria-pressed={book.active === t.id} className={`h-3 w-3 flex-shrink-0 rounded-full border ${book.active === t.id ? "border-[#4DD0E1] bg-[#4DD0E1]" : "border-[var(--j-mu)]"}`} aria-label={`Use ${t.name}`} />
                        {renaming === t.id ? (
                            <input autoFocus defaultValue={t.name} onBlur={(e) => { const name = e.target.value.trim(); if (name) setBook((b) => ({ ...b, templates: b.templates.map((x) => (x.id === t.id ? { ...x, name } : x)) })); setRenaming(null); }} onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()} className={`${field} flex-1`} aria-label="Template name" />
                        ) : (
                            <span className="min-w-0 flex-1">
                                <span className="block text-[14px]">{t.name}</span>
                                <span className="text-[11.5px] text-[var(--j-mu)]">{t.pre.length} pre-trade · {t.live.length} live</span>
                            </span>
                        )}
                        <span className="flex gap-3 text-[12px] text-[var(--j-mu)]">
                            <button type="button" onClick={() => setRenaming(t.id)} className="hover:text-[var(--j-ink)]">Rename</button>
                            <button type="button" onClick={() => setBook((b) => { const c = copyTemplate(t, `${t.name} copy`); return { active: c.id, templates: [...b.templates, c] }; })} className="hover:text-[var(--j-ink)]">Duplicate</button>
                            {book.templates.length > 1 && <button type="button" onClick={() => setBook((b) => { const templates = b.templates.filter((x) => x.id !== t.id); return { active: b.active === t.id ? templates[0].id : b.active, templates }; })} className="hover:text-[#E955A8]">Delete</button>}
                        </span>
                    </li>
                ))}
            </ul>
            <button type="button" onClick={() => setBook((b) => { const c = copyTemplate({ id: "", name: "", pre: [], live: [] }, "New template"); return { active: c.id, templates: [...b.templates, c] }; })} className="mt-4 border-b border-current text-[13px]">
                + New empty template
            </button>
        </div>
    );
}
