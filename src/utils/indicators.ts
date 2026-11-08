// Indicator values for rule conditions, one value per candle (null while there
// is not enough history). Computed only from real candles; nothing is guessed.

export type Bar = { t: number; o?: number; h?: number; l?: number; c: number; v?: number };

export function sma(bars: Bar[], period: number): (number | null)[] {
    let sum = 0;
    return bars.map((bar, i) => {
        sum += bar.c;
        if (i >= period) sum -= bars[i - period].c;
        return i >= period - 1 ? sum / period : null;
    });
}

export function ema(bars: Bar[], period: number): (number | null)[] {
    const k = 2 / (period + 1);
    let prev: number | null = null;
    const seed = sma(bars, period);
    return bars.map((bar, i) => {
        if (prev === null) {
            prev = seed[i];
            return prev;
        }
        prev = bar.c * k + prev * (1 - k);
        return prev;
    });
}

// Wilder's RSI.
export function rsi(bars: Bar[], period = 14): (number | null)[] {
    const out: (number | null)[] = bars.map(() => null);
    if (bars.length <= period) return out;
    let gain = 0;
    let loss = 0;
    for (let i = 1; i <= period; i++) {
        const d = bars[i].c - bars[i - 1].c;
        if (d >= 0) gain += d;
        else loss -= d;
    }
    gain /= period;
    loss /= period;
    out[period] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
    for (let i = period + 1; i < bars.length; i++) {
        const d = bars[i].c - bars[i - 1].c;
        gain = (gain * (period - 1) + Math.max(d, 0)) / period;
        loss = (loss * (period - 1) + Math.max(-d, 0)) / period;
        out[i] = loss === 0 ? 100 : 100 - 100 / (1 + gain / loss);
    }
    return out;
}

const DAY = 86_400_000;

// Session VWAP, reset at 00:00 UTC like most crypto charts. A session whose start
// is not in the candles gives null: a VWAP from part of the day would be wrong.
export function vwap(bars: Bar[]): (number | null)[] {
    if (!bars.length) return [];
    const firstSession = Math.floor(bars[0].t / DAY);
    const startsClean = bars[0].t % DAY === 0;
    let session = -1;
    let pv = 0;
    let vol = 0;
    return bars.map((bar) => {
        const day = Math.floor(bar.t / DAY);
        if (day !== session) {
            session = day;
            pv = 0;
            vol = 0;
        }
        if (day === firstSession && !startsClean) return null;
        const typical = bar.h !== undefined && bar.l !== undefined ? (bar.h + bar.l + bar.c) / 3 : bar.c;
        pv += typical * (bar.v ?? 0);
        vol += bar.v ?? 0;
        return vol > 0 ? pv / vol : null;
    });
}
