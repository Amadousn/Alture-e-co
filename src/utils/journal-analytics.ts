// Analytics for the trading journal: where results come from, by day, hour,
// direction, asset, strategy, tag and confluence. Pure functions, so the same
// figures back the owner's journal and the demo, and can be tested.

export type AnalyticsTrade = {
    id: string;
    instrument: string;
    direction: "Long" | "Short";
    profitLoss: number;
    closedAt: number;
    openedAt?: number;
};
export type AnalyticsReview = { strategy?: string; confluences?: string[]; tags?: string[]; rating?: number };

export type Group = { label: string; trades: number; wins: number; winRate: number; profitLoss: number; average: number };

function group(label: string, list: AnalyticsTrade[]): Group {
    const wins = list.filter((trade) => trade.profitLoss > 0).length;
    const profitLoss = list.reduce((sum, trade) => sum + trade.profitLoss, 0);
    return { label, trades: list.length, wins, winRate: list.length ? (wins / list.length) * 100 : 0, profitLoss, average: list.length ? profitLoss / list.length : 0 };
}
function groupBy(trades: AnalyticsTrade[], key: (trade: AnalyticsTrade) => string | string[] | undefined): Group[] {
    const buckets = new Map<string, AnalyticsTrade[]>();
    for (const trade of trades) {
        const keys = key(trade);
        for (const k of Array.isArray(keys) ? keys : keys === undefined ? [] : [keys]) buckets.set(k, [...(buckets.get(k) ?? []), trade]);
    }
    return [...buckets.entries()].map(([label, list]) => group(label, list));
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Days and hours are read in UTC, as the journal's calendar is.
export function analyse(trades: AnalyticsTrade[], reviews: Record<string, AnalyticsReview> = {}) {
    const day = (trade: AnalyticsTrade) => new Date(trade.closedAt).toISOString().slice(0, 10);
    const days = groupBy(trades, day).sort((a, b) => a.profitLoss - b.profitLoss);
    const held = trades.filter((trade) => trade.openedAt !== undefined).map((trade) => trade.closedAt - trade.openedAt!);
    const reviewed = trades.filter((trade) => reviews[trade.id] && Object.keys(reviews[trade.id]).length > 0);
    const rated = trades.filter((trade) => reviews[trade.id]?.rating);

    // For each confluence: how trades did when it was ticked.
    const confluences = groupBy(trades, (trade) => reviews[trade.id]?.confluences).sort((a, b) => b.trades - a.trades);
    const years = [...new Set(trades.map((trade) => new Date(trade.closedAt).getUTCFullYear()))].sort((a, b) => b - a);

    return {
        bestDay: days.length ? days[days.length - 1] : null,
        worstDay: days.length ? days[0] : null,
        tradingDays: days.length,
        direction: (["Long", "Short"] as const).map((side) => group(side, trades.filter((trade) => trade.direction === side))),
        assets: groupBy(trades, (trade) => trade.instrument).sort((a, b) => b.trades - a.trades),
        // Starting with Monday, the way a trading week reads.
        weekdays: [1, 2, 3, 4, 5, 6, 0].map((d) => group(WEEKDAYS[d], trades.filter((trade) => new Date(trade.closedAt).getUTCDay() === d))),
        hours: Array.from({ length: 24 }, (_, h) => group(`${String(h).padStart(2, "0")}:00`, trades.filter((trade) => new Date(trade.openedAt ?? trade.closedAt).getUTCHours() === h))),
        averageHold: held.length ? held.reduce((sum, ms) => sum + ms, 0) / held.length : null,
        strategies: groupBy(trades, (trade) => reviews[trade.id]?.strategy).sort((a, b) => b.trades - a.trades),
        tags: groupBy(trades, (trade) => reviews[trade.id]?.tags).sort((a, b) => b.trades - a.trades),
        confluences,
        ratings: [5, 4, 3, 2, 1].map((stars) => group(`${stars}`, trades.filter((trade) => reviews[trade.id]?.rating === stars))),
        averageRating: rated.length ? rated.reduce((sum, trade) => sum + (reviews[trade.id]!.rating ?? 0), 0) / rated.length : null,
        reviewed: reviewed.length,
        years: years.map((year) => ({ year, months: MONTHS.map((label, m) => group(label, trades.filter((trade) => { const d = new Date(trade.closedAt); return d.getUTCFullYear() === year && d.getUTCMonth() === m; }))) })),
    };
}
export type Analytics = ReturnType<typeof analyse>;
