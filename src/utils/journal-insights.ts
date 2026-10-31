import type { ClosedTrade } from "./bybit";
import type { TradeReviews } from "./workspace-store";

// The Alture Score and the plain-language findings of the Journal. Everything is
// computed from the trader's own closed trades; nothing is estimated or invented.
// A finding is only stated when enough trades support it.

export const MIN_SCORE_TRADES = 10;
const MIN_GROUP = 3;

export type ScorePart = { label: string; value: number; detail: string };
export type Score = { total: number; parts: ScorePart[] } | null;
export type Insight = { text: string; tone: "up" | "down" | "neutral"; weight: number };

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const sum = (list: ClosedTrade[]) => list.reduce((s, t) => s + t.profitLoss, 0);
const usd = (value: number) => `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const pct = (value: number) => `${Math.round(value * 100)}%`;
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SESSIONS = [
    { name: "Asia", from: 0, to: 7 },
    { name: "London", from: 7, to: 13 },
    { name: "New York", from: 13, to: 21 },
    { name: "after hours", from: 21, to: 24 },
];

export function scoreOf(trades: ClosedTrade[], reviews: TradeReviews): Score {
    if (trades.length < MIN_SCORE_TRADES) return null;
    const wins = trades.filter((t) => t.profitLoss > 0);
    const losses = trades.filter((t) => t.profitLoss < 0);
    const gain = sum(wins);
    const loss = -sum(losses);
    const winRate = wins.length / trades.length;
    const factor = loss ? gain / loss : wins.length ? Infinity : 0;
    const payoff = wins.length && losses.length ? gain / wins.length / (loss / losses.length) : wins.length ? Infinity : 0;

    const byDay = new Map<string, number>();
    for (const t of trades) byDay.set(new Date(t.closedAt).toISOString().slice(0, 10), (byDay.get(new Date(t.closedAt).toISOString().slice(0, 10)) ?? 0) + t.profitLoss);
    const days = [...byDay.values()].filter((v) => v !== 0);
    const greenDays = days.filter((v) => v > 0).length;

    let running = 0;
    let peak = 0;
    let drawdown = 0;
    for (const t of [...trades].sort((a, b) => a.closedAt - b.closedAt)) {
        running += t.profitLoss;
        peak = Math.max(peak, running);
        drawdown = Math.max(drawdown, peak - running);
    }
    const net = running;

    const parts: ScorePart[] = [
        { label: "Win rate", value: clamp(((winRate - 0.3) / 0.4) * 100), detail: `${pct(winRate)} of trades won` },
        { label: "Profit factor", value: clamp(((Math.min(factor, 4) - 1) / 2.5) * 100), detail: Number.isFinite(factor) ? `${factor.toFixed(2)} earned per 1 lost` : "No losing trade" },
        { label: "Win / loss size", value: clamp(((Math.min(payoff, 4) - 0.5) / 2.5) * 100), detail: Number.isFinite(payoff) ? `A win is ${payoff.toFixed(2)}× a loss` : "No losing trade" },
        { label: "Consistency", value: clamp(days.length ? (greenDays / days.length / 0.85) * 100 : 0), detail: `${greenDays} of ${days.length} days green` },
        { label: "Drawdown control", value: net <= 0 ? 0 : clamp((1 - drawdown / (net + drawdown)) * 100), detail: net <= 0 ? "Net result below zero" : `Deepest fall ${usd(-drawdown)}` },
    ];
    const rated = trades.map((t) => reviews[t.id]?.rating).filter((r): r is number => typeof r === "number");
    if (rated.length >= MIN_GROUP) {
        const average = rated.reduce((s, r) => s + r, 0) / rated.length;
        parts.push({ label: "Discipline", value: clamp(((average - 1) / 4) * 100), detail: `Execution rated ${average.toFixed(1)} of 5` });
    }
    return { total: Math.round(parts.reduce((s, p) => s + p.value, 0) / parts.length), parts };
}

// Splits trades by a key and keeps the groups large enough to say something about.
const split = (trades: ClosedTrade[], key: (t: ClosedTrade) => string | undefined) => {
    const groups = new Map<string, ClosedTrade[]>();
    for (const t of trades) {
        const k = key(t);
        if (k) groups.set(k, [...(groups.get(k) ?? []), t]);
    }
    return [...groups.entries()].filter(([, list]) => list.length >= MIN_GROUP).map(([name, list]) => ({ name, list, total: sum(list), average: sum(list) / list.length }));
};

// Best against worst group of one kind, when they really differ.
const contrast = (trades: ClosedTrade[], key: (t: ClosedTrade) => string | undefined, say: (best: string, worst: string) => string): Insight | null => {
    const groups = split(trades, key).sort((a, b) => b.average - a.average);
    if (groups.length < 2) return null;
    const best = groups[0];
    const worst = groups[groups.length - 1];
    if (best.average - worst.average < Math.abs(sum(trades) / trades.length) * 0.5) return null;
    const line = (g: typeof best) => `${usd(g.average)} a trade over ${g.list.length}`;
    return { text: `${say(best.name, worst.name)}: ${line(best)}, against ${line(worst)}.`, tone: worst.average < 0 ? "down" : "neutral", weight: (best.average - worst.average) * Math.min(best.list.length, worst.list.length) };
};

export function insightsOf(trades: ClosedTrade[], reviews: TradeReviews, strategyOf: (t: ClosedTrade) => string | undefined): Insight[] {
    if (trades.length < MIN_SCORE_TRADES) return [];
    const ordered = [...trades].sort((a, b) => a.closedAt - b.closedAt);
    const found: (Insight | null)[] = [];

    found.push(contrast(trades, (t) => DAYS[new Date(t.closedAt).getUTCDay()], (b, w) => `Your ${b} trades pay most and your ${w} trades least`));
    found.push(contrast(trades, strategyOf, (b, w) => `${b} is your strongest strategy and ${w} your weakest`));
    found.push(
        contrast(
            trades,
            (t) => (t.openedAt === undefined ? undefined : SESSIONS.find((s) => new Date(t.openedAt!).getUTCHours() >= s.from && new Date(t.openedAt!).getUTCHours() < s.to)?.name),
            (b, w) => `Entries in the ${b} session pay most and ${w} entries least`,
        ),
    );
    found.push(contrast(trades, (t) => t.direction, (b, w) => `You trade ${b.toLowerCase()} better than ${w.toLowerCase()}`));

    // The trade that follows two losses in a row.
    const after: ClosedTrade[] = [];
    for (let i = 2; i < ordered.length; i++) if (ordered[i - 1].profitLoss < 0 && ordered[i - 2].profitLoss < 0) after.push(ordered[i]);
    if (after.length >= MIN_GROUP + 2) {
        const rate = after.filter((t) => t.profitLoss > 0).length / after.length;
        const overall = trades.filter((t) => t.profitLoss > 0).length / trades.length;
        if (Math.abs(rate - overall) >= 0.15)
            found.push({
                text: rate < overall ? `After two losses in a row, your next trade wins ${pct(rate)} of the time, against ${pct(overall)} overall. A pause after two losses would have helped.` : `After two losses in a row you stay steady: the next trade wins ${pct(rate)} of the time, against ${pct(overall)} overall.`,
                tone: rate < overall ? "down" : "up",
                weight: Math.abs(rate - overall) * after.length * Math.abs(sum(after) / after.length || 1),
            });
    }

    // The habit that costs the most, from the trader's own tags.
    const tags = new Map<string, ClosedTrade[]>();
    for (const t of trades) for (const tag of reviews[t.id]?.tags ?? []) tags.set(tag, [...(tags.get(tag) ?? []), t]);
    const costly = [...tags.entries()].filter(([, list]) => list.length >= MIN_GROUP && sum(list) < 0).sort((a, b) => sum(a[1]) - sum(b[1]))[0];
    if (costly) found.push({ text: `Trades tagged “${costly[0]}” have cost you ${usd(sum(costly[1]))} over ${costly[1].length} trades.`, tone: "down", weight: -sum(costly[1]) * 2 });

    return (found.filter(Boolean) as Insight[]).sort((a, b) => b.weight - a.weight).slice(0, 3);
}
