// The limits a trader set for their own day, against the trades closed today by their own clock.
type Closed = { closedAt: number; profitLoss: number };
type Limits = { maxTrades?: number; maxLosses?: number };

export function dayLimit(trades: Closed[], limits: Limits | undefined, now: number) {
    const start = new Date(now).setHours(0, 0, 0, 0);
    const today = trades.filter((trade) => trade.closedAt >= start);
    const losses = today.filter((trade) => trade.profitLoss < 0).length;
    const byLosses = limits?.maxLosses !== undefined && losses >= limits.maxLosses;
    const byTrades = limits?.maxTrades !== undefined && today.length >= limits.maxTrades;
    const text = byLosses
        ? `${losses} losing ${losses === 1 ? "trade" : "trades"} today, your limit`
        : byTrades
          ? `${today.length} ${today.length === 1 ? "trade" : "trades"} today, your limit`
          : "";
    return { reached: byLosses || byTrades, text, today, losses };
}
