// Risk and behaviour figures for a list of closed trades. Pure functions, in UTC like the calendar.
// Every figure is computed from the trades given; one that cannot be computed is null, never estimated.

export type RiskTrade = {
    profitLoss: number;
    closedAt: number;
    entryPrice: number;
    quantity: number;
    stopLoss?: number;
    rulesFollowed?: boolean;
};

const dayOf = (at: number) => new Date(at).toISOString().slice(0, 10);
// The Monday that starts the trade's UTC week.
const weekOf = (at: number) => {
    const d = new Date(at);
    const back = (d.getUTCDay() + 6) % 7;
    return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - back)).toISOString().slice(0, 10);
};
const average = (list: number[]) => (list.length ? list.reduce((s, v) => s + v, 0) / list.length : null);
const median = (list: number[]) => {
    if (!list.length) return null;
    const sorted = [...list].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

function totals(trades: RiskTrade[], key: (at: number) => string) {
    const map = new Map<string, { pnl: number; trades: number }>();
    for (const t of trades) {
        const k = key(t.closedAt);
        const v = map.get(k) ?? { pnl: 0, trades: 0 };
        map.set(k, { pnl: v.pnl + t.profitLoss, trades: v.trades + 1 });
    }
    return [...map.entries()].map(([date, v]) => ({ date, ...v }));
}

// What one trade risked: the distance to its stop times its size. Null without a stop.
export const riskOf = (t: RiskTrade) => (t.stopLoss && t.stopLoss > 0 && t.quantity > 0 ? Math.abs(t.entryPrice - t.stopLoss) * t.quantity : null);

export function analyseRisk(trades: RiskTrade[]) {
    const ordered = [...trades].sort((a, b) => a.closedAt - b.closedAt);
    const days = totals(ordered, dayOf);
    const weeks = totals(ordered, weekOf);
    const worst = (list: { date: string; pnl: number; trades: number }[]) => list.reduce<(typeof list)[number] | null>((low, item) => (item.pnl < 0 && (!low || item.pnl < low.pnl) ? item : low), null);

    let lossRun = 0;
    let winRun = 0;
    let longestLosses = 0;
    let longestWins = 0;
    // Trades taken right after two or more losses in a row.
    const afterLosses: number[] = [];
    for (const t of ordered) {
        if (lossRun >= 2) afterLosses.push(t.profitLoss);
        if (t.profitLoss < 0) (lossRun += 1), (winRun = 0);
        else if (t.profitLoss > 0) (winRun += 1), (lossRun = 0);
        longestLosses = Math.max(longestLosses, lossRun);
        longestWins = Math.max(longestWins, winRun);
    }

    // Busy days: at least twice the usual number of trades, and at least four.
    const usual = median(days.map((d) => d.trades));
    const busy = usual === null ? [] : days.filter((d) => d.trades >= Math.max(4, usual * 2));
    const calm = days.filter((d) => !busy.includes(d));

    const risked = ordered.map((t) => ({ t, risk: riskOf(t) })).filter((item): item is { t: RiskTrade; risk: number } => item.risk !== null && item.risk > 0);
    const multiples = risked.map(({ t, risk }) => t.profitLoss / risk);
    const ruled = ordered.filter((t) => t.rulesFollowed !== undefined);

    return {
        worstDay: worst(days),
        worstWeek: worst(weeks),
        longestLosses,
        longestWins,
        afterLosses: afterLosses.length ? { trades: afterLosses.length, average: average(afterLosses)!, winRate: (afterLosses.filter((p) => p > 0).length / afterLosses.length) * 100 } : null,
        averagePerTrade: average(ordered.map((t) => t.profitLoss)),
        busyDays: busy.length ? { days: busy.length, threshold: Math.max(4, usual! * 2), average: average(busy.map((d) => d.pnl))!, otherDays: average(calm.map((d) => d.pnl)) } : null,
        // Only trades with a stop loss: how much each risked, and what it returned in multiples of that risk.
        withStop: risked.length,
        averageRisk: average(risked.map((r) => r.risk)),
        averageR: average(multiples),
        riskSpread: risked.length >= 2 ? Math.max(...risked.map((r) => r.risk)) / Math.min(...risked.map((r) => r.risk)) : null,
        rules: ruled.length ? { trades: ruled.length, followed: ruled.filter((t) => t.rulesFollowed).length } : null,
    };
}
export type RiskAnalysis = ReturnType<typeof analyseRisk>;
