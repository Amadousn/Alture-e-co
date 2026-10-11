// Pure performance maths for a list of closed trades. Deliberately knows
// nothing about Bybit, so the same numbers can back the owner's journal, the
// public page and visitors' own journals.

export type StatTrade = {
    profitLoss: number;
    fee: number;
    closedAt: number;
};

export type DailyPerformance = {
    date: string;
    trades: number;
    profitLoss: number;
    cumulative: number;
};

export type JournalStats = {
    totalTrades: number;
    wins: number;
    losses: number;
    winRate: number;
    totalPnl: number;
    totalFees: number;
    averageWin: number;
    averageLoss: number;
    // Gross profit divided by gross loss. Null when there are no losing trades.
    profitFactor: number | null;
    bestTrade: number;
    worstTrade: number;
    // Average P&L per trade.
    expectancy: number;
    // Average win divided by average loss. Null when there are no losing trades.
    payoffRatio: number | null;
    // Largest peak-to-trough fall in running P&L, as a positive amount.
    maxDrawdown: number;
    daily: DailyPerformance[];
};

// Days are bucketed in UTC, matching how Bybit draws its own P&L calendar.
function utcDay(timestamp: number): string {
    return new Date(timestamp).toISOString().slice(0, 10);
}

export function computeJournalStats(trades: StatTrade[]): JournalStats {
    const winning = trades.filter((t) => t.profitLoss > 0);
    const losing = trades.filter((t) => t.profitLoss < 0);
    const grossProfit = winning.reduce((sum, t) => sum + t.profitLoss, 0);
    const grossLoss = Math.abs(losing.reduce((sum, t) => sum + t.profitLoss, 0));

    const byDay = new Map<string, { trades: number; profitLoss: number }>();
    for (const trade of trades) {
        const day = utcDay(trade.closedAt);
        const bucket = byDay.get(day) ?? { trades: 0, profitLoss: 0 };
        bucket.trades += 1;
        bucket.profitLoss += trade.profitLoss;
        byDay.set(day, bucket);
    }

    let cumulative = 0;
    const daily = Array.from(byDay.entries())
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, bucket]) => {
            cumulative += bucket.profitLoss;
            return { date, trades: bucket.trades, profitLoss: bucket.profitLoss, cumulative };
        });

    let running = 0;
    let peak = 0;
    let maxDrawdown = 0;
    for (const trade of [...trades].sort((x, y) => x.closedAt - y.closedAt)) {
        running += trade.profitLoss;
        peak = Math.max(peak, running);
        maxDrawdown = Math.max(maxDrawdown, peak - running);
    }

    const pnls = trades.map((t) => t.profitLoss);
    return {
        totalTrades: trades.length,
        wins: winning.length,
        losses: losing.length,
        winRate: trades.length > 0 ? (winning.length / trades.length) * 100 : 0,
        totalPnl: grossProfit - grossLoss,
        totalFees: trades.reduce((sum, t) => sum + t.fee, 0),
        averageWin: winning.length > 0 ? grossProfit / winning.length : 0,
        averageLoss: losing.length > 0 ? -grossLoss / losing.length : 0,
        profitFactor: grossLoss > 0 ? grossProfit / grossLoss : null,
        bestTrade: pnls.length > 0 ? Math.max(...pnls) : 0,
        worstTrade: pnls.length > 0 ? Math.min(...pnls) : 0,
        expectancy: trades.length > 0 ? (grossProfit - grossLoss) / trades.length : 0,
        payoffRatio: winning.length > 0 && losing.length > 0 ? grossProfit / winning.length / (grossLoss / losing.length) : null,
        maxDrawdown,
        daily,
    };
}
