"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { combined, evaluateRule, severity, TIMEFRAME_NAME, type AlarmCandle, type AlarmHit, type AlarmRule, type AlarmTimeframe } from "@/utils/alarms";

// The terminal's rule alarms. Rules watch the market and, when one is broken,
// the screen says so, a sound plays and (if allowed) the browser notifies.
// Nothing here touches the exchange: the trader decides what to do.

const POLL_MS = 30_000;
const SEEN_KEY = "alturelock:alarm-seen";
const SOUND_KEY = "alturelock:alarm-sound";
const LOG_KEY = "alturelock:alarm-log";

// A situation the terminal itself watches (near the stop, day limit, lost connection).
export type AlarmCondition = { key: string; symbol: string; title: string; detail: string };

const readSeen = (): Set<string> => {
    try {
        return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]"));
    } catch {
        return new Set();
    }
};
const writeSeen = (seen: Set<string>) => {
    try {
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen].slice(-200)));
    } catch {}
};

// Two short tones for a check, three lower ones for an exit signal.
function chime(level: AlarmHit["level"]) {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const notes = level === "critical" ? [220, 165, 220, 165] : level === "exit" ? [660, 520, 660] : [880, 1100];
        notes.forEach((hz, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = hz;
            osc.type = level === "critical" ? "triangle" : "sine";
            const t = ctx.currentTime + i * (level === "critical" ? 0.32 : 0.22);
            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + (level === "critical" ? 0.28 : 0.18));
            osc.connect(gain).connect(ctx.destination);
            osc.start(t);
            osc.stop(t + (level === "critical" ? 0.3 : 0.2));
        });
        setTimeout(() => ctx.close(), 1800);
    } catch {}
}

export function useRuleAlarms(rules: AlarmRule[], priceOf: (symbol: string) => number | null, conditions: AlarmCondition[] = []) {
    const [candles, setCandles] = useState<Record<string, AlarmCandle[]>>({});
    const [shown, setShown] = useState<AlarmHit[]>([]);
    const [history, setHistory] = useState<AlarmHit[]>([]);
    const [critical, setCritical] = useState<AlarmHit[]>([]);
    const [sound, setSoundState] = useState(true);
    const seen = useRef<Set<string> | null>(null);

    useEffect(() => {
        seen.current = readSeen();
        try {
            setHistory(JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]"));
        } catch {}
        try {
            setSoundState(localStorage.getItem(SOUND_KEY) !== "off");
        } catch {}
    }, []);
    const setSound = (on: boolean) => {
        setSoundState(on);
        try {
            localStorage.setItem(SOUND_KEY, on ? "on" : "off");
        } catch {}
    };

    // Closed candles for every symbol and timeframe a close rule needs.
    const feeds = useMemo(() => [...new Set(rules.filter((r) => r.on && r.kind === "close").map((r) => `${r.symbol}|${r.timeframe}`))].sort().join(","), [rules]);
    useEffect(() => {
        if (!feeds) return;
        let cancelled = false;
        const load = async () => {
            const next: Record<string, AlarmCandle[]> = {};
            await Promise.all(
                feeds.split(",").map(async (feed) => {
                    const [symbol, tf] = feed.split("|");
                    try {
                        const res = await fetch(`/api/market/klines?symbol=${symbol}&interval=${tf}&limit=12`, { cache: "no-store" });
                        if (!res.ok) return;
                        const json = await res.json();
                        next[feed] = (json.candles ?? []).map((c: { t: number; c: number }) => ({ t: c.t, c: c.c }));
                    } catch {}
                }),
            );
            if (!cancelled) setCandles((current) => ({ ...current, ...next }));
        };
        load();
        const id = setInterval(load, POLL_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [feeds]);

    const fire = useCallback(
        (hit: AlarmHit) => {
            if (hit.level === "critical") setCritical((current) => [...current.filter((h) => h.key !== hit.key), hit]);
            else setShown((current) => [hit, ...current.filter((h) => h.ruleId !== hit.ruleId)].slice(0, 3));
            // Every alarm is logged, so the trader can see afterwards what fired and when.
            setHistory((current) => {
                const next = [hit, ...current].slice(0, 50);
                try {
                    localStorage.setItem(LOG_KEY, JSON.stringify(next));
                } catch {}
                return next;
            });
            if (sound) chime(hit.level);
            try {
                if (typeof Notification !== "undefined" && Notification.permission === "granted" && document.visibilityState !== "visible") {
                    new Notification(`${hit.level === "critical" ? "Critical" : hit.level === "exit" ? "Exit signal" : "Check"} · ${hit.symbol.replace(/USDT$/, "")}`, { body: `${hit.title}. ${hit.detail}`, tag: hit.key });
                }
            } catch {}
        },
        [sound],
    );

    // Every price or candle update re-checks the rules; a hit already shown is never shown again.
    const prices = rules.map((r) => priceOf(r.symbol)).join(",");
    const conditionKeys = conditions.map((c) => c.key).join(",");
    const fresh = useRef<AlarmHit[]>([]);
    useEffect(() => {
        const memory = seen.current;
        if (!memory) return;
        const now = Date.now();
        let changed = false;
        for (const rule of rules) {
            const price = priceOf(rule.symbol);
            const hit = evaluateRule(rule, candles[`${rule.symbol}|${rule.timeframe}`] ?? [], price, now, rule.level < 10 ? 4 : rule.level < 1000 ? 2 : 1);
            if (!hit) {
                // A price rule re-arms once the price is back on the other side.
                if (rule.kind === "price" && price !== null && memory.delete(`${rule.id}:p`)) changed = true;
                continue;
            }
            if (memory.has(hit.key)) continue;
            memory.add(hit.key);
            changed = true;
            fresh.current = [...fresh.current.slice(-10), hit];
            fire(hit);
        }
        // Several rules broken together, and the situations the terminal watches itself.
        const together = combined(fresh.current, now);
        const extra = [...(together ? [together] : []), ...conditions.map((c) => ({ ...c, ruleId: c.key, level: "critical" as const, at: now }))];
        for (const hit of extra) {
            if (memory.has(hit.key)) continue;
            memory.add(hit.key);
            changed = true;
            fire(hit);
        }
        if (changed) writeSeen(memory);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rules, candles, prices, fire, conditionKeys]);

    const dismiss = (key: string) => setShown((current) => current.filter((h) => h.key !== key));
    const test = () => fire({ key: `test:${Date.now()}`, ruleId: "test", symbol: "BTCUSDT", level: "check", title: "Test alarm", detail: "This is how a broken rule looks and sounds.", at: Date.now() });
    const confirm = (key: string) => setCritical((current) => current.filter((h) => h.key !== key));
    const testCritical = () => fire({ key: `test-critical:${Date.now()}`, ruleId: "test", symbol: "BTCUSDT", level: "critical", title: "Test critical alert", detail: "Price is close to your stop loss. This is how a critical alert looks and sounds.", at: Date.now() });
    return { shown, history, critical, dismiss, confirm, test, testCritical, sound, setSound };
}

const ago = (ms: number) => (ms < 60_000 ? "just now" : ms < 3_600_000 ? `${Math.floor(ms / 60_000)} min ago` : `${Math.floor(ms / 3_600_000)} h ago`);

// The alert itself: top of the screen, until the trader dismisses it.
export function AlarmBanner({ hits, onDismiss, onOpen }: { hits: AlarmHit[]; onDismiss: (key: string) => void; onOpen?: (symbol: string) => void }) {
    if (!hits.length) return null;
    return (
        <div className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex flex-col items-center gap-2 px-4" role="alert" aria-live="assertive">
            {hits.map((hit) => {
                const exit = hit.level === "exit";
                return (
                    <div key={hit.key} className={`al-alarm pointer-events-auto flex w-full max-w-xl items-start gap-4 rounded-[var(--j-radius,12px)] border bg-[var(--j-s1)] px-5 py-4 text-[var(--j-ink)] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.7)] ${exit ? "border-[#E955A8]" : "border-[#4DD0E1]"}`}>
                        <span className={`mt-1 h-2.5 w-2.5 flex-shrink-0 animate-pulse rounded-full ${exit ? "bg-[#E955A8]" : "bg-[#4DD0E1]"}`} aria-hidden="true" />
                        <div className="min-w-0 flex-1">
                            <p className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${exit ? "text-[#E955A8]" : "text-[#4DD0E1]"}`}>
                                {exit ? "Exit signal" : "Check"} · {hit.symbol.replace(/USDT$/, "")}
                            </p>
                            <p className="mt-1 text-[15px] font-medium">{hit.title}</p>
                            <p className="mt-0.5 text-[13px] text-[var(--j-mu)]">
                                {hit.detail} {exit ? "Your rule says this is an exit." : "Look at the chart before you act."}
                            </p>
                            {onOpen && hit.ruleId !== "test" && (
                                <button type="button" onClick={() => onOpen(hit.symbol)} className="mt-2 border-b border-current text-[12.5px] text-[var(--j-ink)]">
                                    Show the chart
                                </button>
                            )}
                        </div>
                        <button type="button" onClick={() => onDismiss(hit.key)} aria-label="Dismiss" className="text-[var(--j-mu)] transition-colors hover:text-[var(--j-ink)]">
                            ✕
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

const TIMEFRAMES: AlarmTimeframe[] = ["5", "15", "60", "240"];
const field = "rounded-md border border-[var(--j-line)] bg-[var(--j-s2)] px-2 py-1.5 text-[12.5px] text-[var(--j-ink)] outline-none focus:border-[var(--j-mu)]";

// The rules list in the Trade tab: what is watched, switch on/off, add, remove.
export function AlarmRules({
    rules,
    setRules,
    symbol,
    price,
    tradeRules,
    history,
    sound,
    setSound,
    onTest,
    onTestCritical,
}: {
    rules: AlarmRule[];
    setRules: (next: AlarmRule[]) => void;
    symbol: string;
    price: number | null;
    tradeRules: (() => AlarmRule[]) | null;
    history: AlarmHit[];
    sound: boolean;
    setSound: (on: boolean) => void;
    onTest: () => void;
    onTestCritical: () => void;
}) {
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState({ kind: "close" as AlarmRule["kind"], side: "below" as AlarmRule["side"], level: "", timeframe: "15" as AlarmTimeframe, closes: 1 });
    const [permission, setPermission] = useState<string>("default");
    useEffect(() => {
        if (typeof Notification !== "undefined") setPermission(Notification.permission);
    }, []);

    const add = () => {
        const level = Number(draft.level.replace(/,/g, ""));
        if (!Number.isFinite(level) || level <= 0) return;
        setRules([...rules, { id: Math.random().toString(36).slice(2, 9), symbol, kind: draft.kind, side: draft.side, level, timeframe: draft.timeframe, closes: draft.kind === "close" ? draft.closes : 1, label: "", on: true }]);
        setAdding(false);
        setDraft((d) => ({ ...d, level: "" }));
    };
    const describe = (r: AlarmRule) =>
        r.kind === "price"
            ? `Price ${r.side === "above" ? "at or above" : "at or below"} ${r.level.toLocaleString("en-US")}`
            : `${r.closes > 1 ? `${r.closes} ${TIMEFRAME_NAME[r.timeframe]} closes` : `A ${TIMEFRAME_NAME[r.timeframe]} close`} ${r.side} ${r.level.toLocaleString("en-US")}`;
    const fromTrade = tradeRules && !rules.some((r) => r.label === "Stop loss reached");

    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--j-mu)]">Alarms · your rules</p>
                <button type="button" onClick={() => setSound(!sound)} aria-pressed={sound} className="text-[12px] text-[var(--j-mu)] transition-colors hover:text-[var(--j-ink)]">
                    Sound {sound ? "on" : "off"}
                </button>
            </div>
            {rules.length === 0 && <p className="text-[13px] leading-relaxed text-[var(--j-mu)]">No alarm yet. Add a rule and the terminal tells you the moment it is broken.</p>}
            <ul className="divide-y divide-[var(--j-line)]">
                {rules.map((r) => {
                    const exit = severity(r) !== "check";
                    return (
                        <li key={r.id} className="flex items-center gap-3 py-2.5 text-[13px]">
                            <button type="button" role="switch" aria-checked={r.on} aria-label={r.on ? "Switch off" : "Switch on"} onClick={() => setRules(rules.map((x) => (x.id === r.id ? { ...x, on: !x.on } : x)))} className={`relative h-4 w-7 flex-shrink-0 rounded-full transition-colors ${r.on ? "bg-[var(--j-active)]" : "bg-[var(--j-s2)]"}`}>
                                <span className={`absolute top-0.5 h-3 w-3 rounded-full transition-all ${r.on ? "left-3.5 bg-[var(--j-activeink)]" : "left-0.5 bg-[var(--j-mu)]"}`} />
                            </button>
                            <span className={`min-w-0 flex-1 ${r.on ? "" : "opacity-45"}`}>
                                <span className="block truncate">{r.label || describe(r)}</span>
                                <span className="block truncate text-[11.5px] text-[var(--j-mu)]">
                                    {r.symbol.replace(/USDT$/, "")} · {r.label ? `${describe(r)} · ` : ""}
                                    <span className={exit ? "text-[#E955A8]" : "text-[#4DD0E1]"}>{severity(r) === "critical" ? "critical" : exit ? "exit signal" : "check"}</span>
                                </span>
                            </span>
                            <button type="button" onClick={() => setRules(rules.filter((x) => x.id !== r.id))} aria-label="Remove this alarm" className="text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                                ✕
                            </button>
                        </li>
                    );
                })}
            </ul>

            {adding ? (
                <div className="mt-3 space-y-2 rounded-lg bg-[var(--j-s2)] p-3 text-[12.5px]">
                    <div className="flex flex-wrap items-center gap-2">
                        <select className={field} value={draft.kind} onChange={(e) => setDraft({ ...draft, kind: e.target.value as AlarmRule["kind"] })} aria-label="Type">
                            <option value="close">Candle close</option>
                            <option value="price">Price touch</option>
                        </select>
                        {draft.kind === "close" && (
                            <select className={field} value={draft.timeframe} onChange={(e) => setDraft({ ...draft, timeframe: e.target.value as AlarmTimeframe })} aria-label="Timeframe">
                                {TIMEFRAMES.map((tf) => (
                                    <option key={tf} value={tf}>
                                        {TIMEFRAME_NAME[tf]}
                                    </option>
                                ))}
                            </select>
                        )}
                        <select className={field} value={draft.side} onChange={(e) => setDraft({ ...draft, side: e.target.value as AlarmRule["side"] })} aria-label="Side">
                            <option value="below">below</option>
                            <option value="above">above</option>
                        </select>
                        <input className={`${field} w-28 tabular-nums`} inputMode="decimal" placeholder={price ? String(price) : "Price"} value={draft.level} onChange={(e) => setDraft({ ...draft, level: e.target.value })} aria-label="Price level" />
                    </div>
                    {draft.kind === "close" && (
                        <div className="flex items-center gap-2">
                            <span className="text-[var(--j-mu)]">Closes in a row</span>
                            {[1, 2, 3].map((n) => (
                                <button key={n} type="button" aria-pressed={draft.closes === n} onClick={() => setDraft({ ...draft, closes: n })} className={`h-7 w-7 rounded-md ${draft.closes === n ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                                    {n}
                                </button>
                            ))}
                            <span className="text-[11.5px] text-[var(--j-mu)]">{draft.closes > 1 ? "exit signal" : "check"}</span>
                        </div>
                    )}
                    <p className="text-[11.5px] leading-relaxed text-[var(--j-mu)]">On {symbol.replace(/USDT$/, "")}. Only closed candles count: a wick never sets it off.</p>
                    <div className="flex gap-2">
                        <button type="button" onClick={add} className="rounded-md bg-[var(--j-active)] px-3 py-1.5 text-[var(--j-activeink)]">
                            Add alarm
                        </button>
                        <button type="button" onClick={() => setAdding(false)} className="px-3 py-1.5 text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[12.5px]">
                    <button type="button" onClick={() => setAdding(true)} className="border-b border-current text-[var(--j-ink)]">
                        + Add a rule
                    </button>
                    {fromTrade && (
                        <button type="button" onClick={() => setRules([...rules, ...tradeRules!()])} className="border-b border-current text-[var(--j-ink)]">
                            Use my trade levels
                        </button>
                    )}
                    <button type="button" onClick={onTest} className="text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                        Test alarm
                    </button>
                    <button type="button" onClick={onTestCritical} className="text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                        Test critical
                    </button>
                    {permission === "default" && (
                        <button type="button" onClick={() => Notification.requestPermission().then(setPermission)} className="text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                            Notify me in other tabs
                        </button>
                    )}
                </div>
            )}

            {history.length > 0 && (
                <div className="mt-4">
                    <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-[var(--j-mu)]">Alarm log</p>
                    <ul className="space-y-1 text-[12px]">
                        {history.slice(0, 5).map((h) => (
                            <li key={h.key} className="flex justify-between gap-3">
                                <span className="truncate">
                                    <span className={h.level === "check" ? "text-[#4DD0E1]" : "text-[#E955A8]"}>{h.level === "critical" ? "◆" : "●"}</span> {h.title}
                                </span>
                                <span className="flex-shrink-0 text-[var(--j-mu)]">{ago(Date.now() - h.at)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <p className="mt-3 text-[11.5px] leading-relaxed text-[var(--j-mu)]">Alarms work while the terminal is open. They never place or close an order.</p>
        </div>
    );
}

// A critical alert: covers the screen and stays until the trader confirms it.
export function CriticalAlarm({ hits, onConfirm, onOpen, tradeHref }: { hits: AlarmHit[]; onConfirm: (key: string) => void; onOpen?: (symbol: string) => void; tradeHref?: string }) {
    const hit = hits[0];
    if (!hit) return null;
    return (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm" role="alertdialog" aria-modal="true" aria-labelledby="critical-title">
            <div className="al-critical w-full max-w-lg rounded-[var(--j-radius,12px)] border-2 border-[#E955A8] bg-[var(--j-s1)] p-7 text-[var(--j-ink)] shadow-[0_0_80px_-10px_rgba(233,85,168,0.55)]">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#E955A8]">
                    <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#E955A8]" aria-hidden="true" />
                    Critical · {hit.symbol.replace(/USDT$/, "")}
                    {hits.length > 1 && <span className="ml-auto normal-case tracking-normal text-[var(--j-mu)]">1 of {hits.length}</span>}
                </p>
                <p id="critical-title" className="mt-4 text-[22px] font-medium leading-tight">{hit.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-[var(--j-mu)]">{hit.detail}</p>
                <p className="mt-4 text-[13px] text-[var(--j-mu)]">AltureLock does not touch your position. Check it on your exchange.</p>
                <div className="mt-6 flex flex-wrap gap-2">
                    <button type="button" autoFocus onClick={() => onConfirm(hit.key)} className="rounded-lg bg-[var(--j-active)] px-4 py-2.5 text-[13px] font-medium text-[var(--j-activeink)]">
                        I have seen it
                    </button>
                    {onOpen && hit.ruleId !== "test" && (
                        <button type="button" onClick={() => { onOpen(hit.symbol); onConfirm(hit.key); }} className="rounded-lg border border-[var(--j-line)] px-4 py-2.5 text-[13px]">
                            Show the chart
                        </button>
                    )}
                    {tradeHref && hit.ruleId !== "test" && (
                        <a href={tradeHref} className="rounded-lg border border-[var(--j-line)] px-4 py-2.5 text-[13px]">
                            Open the position
                        </a>
                    )}
                </div>
                <p className="mt-4 text-[11.5px] text-[var(--j-mu)]">Logged at {new Date(hit.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}.</p>
            </div>
        </div>
    );
}
