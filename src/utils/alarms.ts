// Rule alarms for the terminal. A rule never closes a trade: it tells the
// trader to look. "check" asks for attention; "exit" marks an obvious break
// (several closes beyond a level, or the stop reached). Only closed candles
// count, so a wick through a level never sets anything off.

import { ema, rsi, sma, vwap, type Bar } from "./indicators.ts";

export type AlarmTimeframe = "5" | "15" | "60" | "240";
// What a candle close is compared with. "price": a fixed level. "rsi": the RSI value against the level.
export type ConditionSource = "price" | "vwap" | "ema" | "sma" | "rsi";
export type AlarmRule = {
    id: string;
    symbol: string;
    // "close": candles closing beyond a level or indicator. "price": the live price touching a level.
    kind: "close" | "price";
    side: "above" | "below";
    level: number;
    timeframe: AlarmTimeframe;
    // Consecutive closes needed. 1 = check, 2 or more = exit signal.
    closes: number;
    label: string;
    on: boolean;
    // Marks a rule as critical (the stop loss): it stays on screen until confirmed.
    urgent?: boolean;
    source?: ConditionSource;
    period?: number;
};

export type AlarmCandle = Bar;
export type AlarmHit = { key: string; ruleId: string; symbol: string; level: "check" | "exit" | "critical"; title: string; detail: string; at: number };

export const TIMEFRAME_MS: Record<AlarmTimeframe, number> = { "5": 300_000, "15": 900_000, "60": 3_600_000, "240": 14_400_000 };
export const TIMEFRAME_NAME: Record<AlarmTimeframe, string> = { "5": "5m", "15": "15m", "60": "1h", "240": "4h" };
export const SOURCE_NAME: Record<ConditionSource, string> = { price: "Price level", vwap: "VWAP", ema: "EMA", sma: "SMA", rsi: "RSI" };

const beyond = (side: AlarmRule["side"], value: number, level: number) => (side === "above" ? value > level : value < level);

// The candles whose period has ended by `now`, oldest first.
export function closedCandles(candles: AlarmCandle[], timeframe: AlarmTimeframe, now: number) {
    return candles.filter((candle) => candle.t + TIMEFRAME_MS[timeframe] <= now);
}

export const severity = (rule: Pick<AlarmRule, "kind" | "closes" | "urgent">): AlarmHit["level"] => (rule.urgent ? "critical" : rule.kind === "close" && rule.closes >= 2 ? "exit" : "check");

type CloseRule = Pick<AlarmRule, "side" | "level" | "timeframe" | "closes" | "source" | "period">;

// For each closed candle: true when it meets the condition, false when not, null when the
// indicator has no value yet (not enough real history).
export function closeTests(rule: CloseRule, candles: AlarmCandle[], now: number): { t: number; c: number; ref: number | null; ok: boolean | null }[] {
    const closed = closedCandles(candles, rule.timeframe, now);
    const source = rule.source ?? "price";
    const period = Math.max(2, Math.floor(rule.period ?? (source === "rsi" ? 14 : 20)));
    const series = source === "vwap" ? vwap(closed) : source === "ema" ? ema(closed, period) : source === "sma" ? sma(closed, period) : source === "rsi" ? rsi(closed, period) : closed.map(() => rule.level);
    return closed.map((candle, i) => {
        const ref = series[i];
        if (ref === null || ref === undefined) return { t: candle.t, c: candle.c, ref: null, ok: null };
        return { t: candle.t, c: candle.c, ref, ok: source === "rsi" ? beyond(rule.side, ref, rule.level) : beyond(rule.side, candle.c, ref) };
    });
}

export const describeCondition = (rule: CloseRule, digits = 2) => {
    const source = rule.source ?? "price";
    const tf = TIMEFRAME_NAME[rule.timeframe];
    const n = Math.max(1, rule.closes);
    const closes = n === 1 ? `A ${tf} close` : `${n} ${tf} closes in a row`;
    if (source === "rsi") return `${closes} with RSI ${rule.period ?? 14} ${rule.side} ${rule.level}`;
    const ref = source === "price" ? rule.level.toLocaleString("en-US", { maximumFractionDigits: digits }) : source === "vwap" ? "VWAP" : `${SOURCE_NAME[source]} ${rule.period ?? 20}`;
    return `${closes} ${rule.side} ${ref}`;
};

// One rule against the market. Returns a hit at most once per candle (its key
// carries the candle time), so the caller can drop keys it has already shown.
export function evaluateRule(rule: AlarmRule, candles: AlarmCandle[], price: number | null, now: number, digits = 2): AlarmHit | null {
    if (!rule.on || !Number.isFinite(rule.level)) return null;
    const lvl = rule.level.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    if (rule.kind === "price") {
        const name = rule.label || `${rule.side === "above" ? "Above" : "Below"} ${lvl}`;
        if (price === null || (!beyond(rule.side, price, rule.level) && price !== rule.level)) return null;
        // Once per crossing: the caller forgets this key when the price is back on the other side.
        return { key: `${rule.id}:p`, ruleId: rule.id, symbol: rule.symbol, level: severity(rule), title: name, detail: `Price ${rule.side === "above" ? "at or above" : "at or below"} ${lvl}.`, at: now };
    }
    const tests = closeTests(rule, candles, now);
    const need = Math.max(1, Math.floor(rule.closes));
    if (tests.length < need) return null;
    const last = tests.slice(-need);
    if (!last.every((x) => x.ok === true)) return null;
    // Only the moment the run completes: the run must not already have been complete one candle earlier.
    if (tests.length > need && tests.slice(-need - 1, -1).every((x) => x.ok === true)) return null;
    const detail = describeCondition(rule, digits) + ".";
    return { key: `${rule.id}:c:${last[last.length - 1].t}`, ruleId: rule.id, symbol: rule.symbol, level: severity(rule), title: rule.label || describeCondition(rule, digits), detail, at: now };
}

// The state of a condition right now, for a pre-trade rule: are the last closes meeting it?
export function conditionNow(rule: CloseRule, candles: AlarmCandle[] | null, now: number): { state: "confirmed" | "not" | "waiting"; ref: number | null; at: number | null } {
    if (!candles) return { state: "waiting", ref: null, at: null };
    const tests = closeTests(rule, candles, now);
    const need = Math.max(1, Math.floor(rule.closes));
    const last = tests.slice(-need);
    if (last.length < need || last.some((x) => x.ok === null)) return { state: "waiting", ref: last[last.length - 1]?.ref ?? null, at: null };
    const end = last[last.length - 1];
    return { state: last.every((x) => x.ok) ? "confirmed" : "not", ref: end.ref, at: end.t + TIMEFRAME_MS[rule.timeframe] };
}

// Rules a trader would want on an open trade: a look at the entry, a firm signal at the stop.
export function rulesForTrade(trade: { instrument: string; direction: "Long" | "Short"; entry: number; stop: number | null; target: number | null }, id = () => Math.random().toString(36).slice(2, 9)): AlarmRule[] {
    const against = trade.direction === "Long" ? "below" : "above";
    const toward = trade.direction === "Long" ? "above" : "below";
    const rules: AlarmRule[] = [{ id: id(), symbol: trade.instrument, kind: "close", side: against, level: trade.entry, timeframe: "15", closes: 1, label: "Back through the entry", on: true }];
    if (trade.stop !== null) rules.push({ id: id(), symbol: trade.instrument, kind: "price", side: against, level: trade.stop, timeframe: "5", closes: 1, label: "Stop loss reached", on: true, urgent: true });
    if (trade.target !== null) rules.push({ id: id(), symbol: trade.instrument, kind: "price", side: toward, level: trade.target, timeframe: "5", closes: 1, label: "Take profit reached", on: true });
    return rules;
}

// Several warnings against the trade within a short window add up to a critical alert.
export function combined(hits: AlarmHit[], now: number, windowMs = 15 * 60_000): AlarmHit | null {
    const recent = hits.filter((h) => h.level !== "critical" && h.ruleId !== "test" && now - h.at <= windowMs);
    const rules = new Set(recent.map((h) => h.ruleId));
    if (rules.size < 2) return null;
    const key = `combined:${[...rules].sort().join("+")}`;
    return { key, ruleId: "combined", symbol: recent[0].symbol, level: "critical", title: `${rules.size} rules broken at once`, detail: recent.map((h) => h.title).join(" · ") + ".", at: now };
}

// How close the price is to the stop, as a share of the entry-to-stop distance (0 = at the stop).
export function stopDistance(direction: "Long" | "Short", entry: number, stop: number, price: number) {
    const span = Math.abs(entry - stop);
    if (!span) return null;
    return (direction === "Long" ? price - stop : stop - price) / span;
}
