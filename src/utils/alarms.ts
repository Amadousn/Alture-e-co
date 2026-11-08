// Rule alarms for the terminal. A rule never closes a trade: it tells the
// trader to look. "check" asks for attention; "exit" marks an obvious break
// (several closes beyond a level, or the stop reached). Only closed candles
// count, so a wick through a level never sets anything off.

export type AlarmTimeframe = "5" | "15" | "60" | "240";
export type AlarmRule = {
    id: string;
    symbol: string;
    // "close": candles closing beyond a price level. "price": the live price touching it.
    kind: "close" | "price";
    side: "above" | "below";
    level: number;
    timeframe: AlarmTimeframe;
    // Consecutive closes needed. 1 = check, 2 or more = exit signal.
    closes: number;
    label: string;
    on: boolean;
    // Marks a price rule as an exit signal (the stop loss), not just a look.
    urgent?: boolean;
};

export type AlarmCandle = { t: number; c: number };
export type AlarmHit = { key: string; ruleId: string; symbol: string; level: "check" | "exit"; title: string; detail: string; at: number };

export const TIMEFRAME_MS: Record<AlarmTimeframe, number> = { "5": 300_000, "15": 900_000, "60": 3_600_000, "240": 14_400_000 };
export const TIMEFRAME_NAME: Record<AlarmTimeframe, string> = { "5": "5m", "15": "15m", "60": "1h", "240": "4h" };

const beyond = (side: AlarmRule["side"], value: number, level: number) => (side === "above" ? value > level : value < level);

// The candles whose period has ended by `now`, oldest first.
export function closedCandles(candles: AlarmCandle[], timeframe: AlarmTimeframe, now: number) {
    return candles.filter((candle) => candle.t + TIMEFRAME_MS[timeframe] <= now);
}

export const severity = (rule: Pick<AlarmRule, "kind" | "closes" | "urgent">): AlarmHit["level"] => (rule.urgent || (rule.kind === "close" && rule.closes >= 2) ? "exit" : "check");

// One rule against the market. Returns a hit at most once per candle (its key
// carries the candle time), so the caller can drop keys it has already shown.
export function evaluateRule(rule: AlarmRule, candles: AlarmCandle[], price: number | null, now: number, digits = 2): AlarmHit | null {
    if (!rule.on || !Number.isFinite(rule.level)) return null;
    const lvl = rule.level.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
    const name = rule.label || `${rule.side === "above" ? "Above" : "Below"} ${lvl}`;
    if (rule.kind === "price") {
        if (price === null || (!beyond(rule.side, price, rule.level) && price !== rule.level)) return null;
        // Once per crossing: the caller forgets this key when the price is back on the other side.
        return { key: `${rule.id}:p`, ruleId: rule.id, symbol: rule.symbol, level: severity(rule), title: name, detail: `Price ${rule.side === "above" ? "at or above" : "at or below"} ${lvl}.`, at: now };
    }
    const closed = closedCandles(candles, rule.timeframe, now);
    const need = Math.max(1, Math.floor(rule.closes));
    if (closed.length < need) return null;
    const last = closed.slice(-need);
    if (!last.every((candle) => beyond(rule.side, candle.c, rule.level))) return null;
    // Only the moment the run completes: the candle before it must not already have qualified.
    const before = closed[closed.length - need - 1];
    if (need === 1 && before && beyond(rule.side, before.c, rule.level)) return null;
    if (need > 1 && closed.length > need && closed.slice(-need - 1, -1).every((candle) => beyond(rule.side, candle.c, rule.level))) return null;
    const tf = TIMEFRAME_NAME[rule.timeframe];
    const detail = need === 1 ? `A ${tf} candle closed ${rule.side} ${lvl}.` : `${need} ${tf} candles in a row closed ${rule.side} ${lvl}.`;
    return { key: `${rule.id}:c:${last[last.length - 1].t}`, ruleId: rule.id, symbol: rule.symbol, level: severity(rule), title: name, detail, at: now };
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
