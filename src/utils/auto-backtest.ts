// The automatic backtest of the Sweep reversal, on 1-minute candles. Its definitions
// follow the All-in-One indicator: value area of the rolling 24 hours at 70%,
// VWAP reset each UTC day with bands at 1, 2 and 3 deviations, gaps of 0.25 ATR or more.
// It only reads candles already closed at each step, and a candle touching both
// stop and target counts as the stop. Results are simulated, net of fees and slippage.

export type Bar = { t: number; o: number; h: number; l: number; c: number; v: number };
export type ExitPlan = "fixed" | "reaction" | "half" | "value-area";
export type SimTrade = { direction: "Long" | "Short"; openedAt: number; closedAt: number; entry: number; stop: number; r: number; vwapConfirmed: boolean; exit: string; sweepAt: number; vah: number; val: number; gapTop: number; gapBottom: number; gapAt: number };
export type Settings = { sweepVolume: number; acceptCandles: number; costPerSide: number; secondSweep?: { within: number; volume: boolean }; limitOrders?: boolean };

// Bybit's standard rates. A limit order pays the maker fee and no slippage, a stop always pays the taker fee and slippage.
const MAKER = 0.0002;
const TAKER_WITH_SLIPPAGE = 0.00065;

export const DEFAULTS: Settings = { sweepVolume: 1.5, acceptCandles: 2, costPerSide: 0.00065 }; // Bybit taker 0.055% plus 0.01% slippage

const MIN = 60000;
const DAY = 1440 * MIN;

export function aggregate(bars: Bar[], minutes: number): Bar[] {
    const size = minutes * MIN;
    const out: Bar[] = [];
    for (const b of bars) {
        const t = Math.floor(b.t / size) * size;
        const last = out[out.length - 1];
        if (last && last.t === t) {
            last.h = Math.max(last.h, b.h);
            last.l = Math.min(last.l, b.l);
            last.c = b.c;
            last.v += b.v;
        } else out.push({ ...b, t });
    }
    return out;
}

// VWAP and its deviation at the close of each 1-minute candle, reset each UTC day.
function vwapSeries(bars: Bar[]) {
    let day = -1, pv = 0, v = 0, pvv = 0;
    return bars.map((b) => {
        const d = Math.floor(b.t / DAY);
        if (d !== day) (day = d), (pv = 0), (v = 0), (pvv = 0);
        const hlc = (b.h + b.l + b.c) / 3;
        pv += hlc * b.v;
        pvv += hlc * hlc * b.v;
        v += b.v;
        const vwap = v > 0 ? pv / v : b.c;
        return { vwap, dev: Math.sqrt(Math.max(0, (v > 0 ? pvv / v : 0) - vwap * vwap)) };
    });
}

function valueArea(bars: Bar[], rows = 200, share = 0.7) {
    const lo = Math.min(...bars.map((b) => b.l));
    const hi = Math.max(...bars.map((b) => b.h));
    if (!(hi > lo)) return null;
    const step = (hi - lo) / rows;
    const vol = new Array(rows).fill(0);
    for (const b of bars) {
        const from = Math.min(rows - 1, Math.floor((b.l - lo) / step));
        const to = Math.min(rows - 1, Math.floor((b.h - lo) / step));
        for (let i = from; i <= to; i++) vol[i] += b.v / (to - from + 1);
    }
    let poc = 0;
    vol.forEach((x, i) => { if (x > vol[poc]) poc = i; });
    const total = vol.reduce((a, b) => a + b, 0);
    let a = poc, z = poc, sum = vol[poc];
    while (sum < total * share && (a > 0 || z < rows - 1)) {
        const down = a > 0 ? vol[a - 1] : -1;
        const up = z < rows - 1 ? vol[z + 1] : -1;
        if (up >= down) sum += vol[++z];
        else sum += vol[--a];
    }
    return { val: lo + a * step, vah: lo + (z + 1) * step };
}

const average = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / (xs.length || 1);

// Everything is written for a short and mirrored for a long by turning prices negative.
const flip = (b: Bar): Bar => ({ ...b, o: -b.o, c: -b.c, h: -b.l, l: -b.h });

export function runBacktest(bars: Bar[], plan: ExitPlan, s: Settings = DEFAULTS): { trades: SimTrade[]; skipped: number; missed: number } {
    const vw = vwapSeries(bars);
    const m15 = aggregate(bars, 15);
    const m5 = aggregate(bars, 5);
    const index5 = new Map(m5.map((b, i) => [b.t, i]));
    const index1 = new Map(bars.map((b, i) => [b.t, i]));
    const trades: SimTrade[] = [];
    let skipped = 0;
    let missed = 0;
    let busyUntil = 0;

    for (let i = 96 + 20; i < m15.length - 1; i++) {
        let sweep = m15[i];
        if (sweep.t < busyUntil) continue;
        const va = valueArea(m15.slice(i - 96, i));
        if (!va) continue;
        if (sweep.v <= average(m15.slice(i - 20, i).map((b) => b.v)) * s.sweepVolume) continue;
        const short = sweep.h > va.vah && sweep.c < va.vah;
        const long = sweep.l < va.val && sweep.c > va.val;
        if (!short && !long) continue;
        const sign = short ? 1 : -1;
        const see = (b: Bar) => (short ? b : flip(b));

        // Optionally wait for a second sweep of the same side, with the stop beyond both.
        let stopFrom = see(sweep).h;
        if (s.secondSweep) {
            let found = false;
            for (let j = i + 1; j <= Math.min(i + s.secondSweep.within, m15.length - 2); j++) {
                const again = valueArea(m15.slice(j - 96, j));
                if (!again) continue;
                const b = m15[j];
                const repeats = short ? b.h > again.vah && b.c < again.vah : b.l < again.val && b.c > again.val;
                const loud = !s.secondSweep.volume || b.v > average(m15.slice(j - 20, j).map((x) => x.v)) * s.sweepVolume;
                if (repeats && loud) {
                    sweep = b;
                    stopFrom = Math.max(stopFrom, see(b).h);
                    found = true;
                    va.vah = again.vah;
                    va.val = again.val;
                    break;
                }
            }
            if (!found) continue;
        }

        // The gap on the 5-minute, within an hour of the sweep.
        const start5 = index5.get(sweep.t + 15 * MIN);
        if (start5 === undefined) continue;
        const stop = stopFrom;
        let gap: { top: number; bottom: number; at: number } | null = null;
        for (let k = Math.max(start5, 16); k < Math.min(start5 + 12, m5.length); k++) {
            const [a, c] = [see(m5[k - 2]), see(m5[k])];
            if (c.c > stop) break;
            const atr = average(m5.slice(k - 14, k).map((b) => b.h - b.l));
            if (c.h < a.l && a.l - c.h > atr * 0.25) {
                gap = { top: a.l, bottom: c.h, at: k };
                break;
            }
        }
        if (!gap) continue;

        // Back into the gap, then a 5-minute close below it, with no close above it, within an hour.
        let respected = -1, touched = false;
        for (let k = gap.at + 1; k < Math.min(gap.at + 13, m5.length); k++) {
            const b = see(m5[k]);
            if (b.c > gap.top) break;
            if (b.h >= gap.bottom) touched = true;
            if (touched && b.c < gap.bottom) {
                respected = k;
                break;
            }
        }
        if (respected < 0) continue;

        // The entry: the close of the first bearish 1-minute candle, within 15 minutes.
        const from1 = index1.get(m5[respected].t + 5 * MIN);
        if (from1 === undefined) continue;
        let entryAt = -1;
        for (let k = from1; k < Math.min(from1 + 15, bars.length); k++) {
            const b = see(bars[k]);
            if (b.c < b.o) {
                entryAt = k;
                break;
            }
        }
        if (s.limitOrders) {
            // A limit at the gap's edge, valid 15 minutes. It counts as filled only if price trades through it.
            entryAt = -1;
            for (let k = from1; k < Math.min(from1 + 15, bars.length); k++) {
                if (see(bars[k]).c > stop) break;
                if (see(bars[k]).h > gap.bottom) {
                    entryAt = k;
                    break;
                }
            }
            if (entryAt < 0) {
                missed += 1;
                continue;
            }
        }
        if (entryAt < 0) continue;
        const entry = s.limitOrders ? gap.bottom : see(bars[entryAt]).c;
        const risk = stop - entry;
        if (!(risk > 0)) continue;
        const v0 = vw[entryAt];
        const vwapAt = (k: number) => (short ? vw[k].vwap : -vw[k].vwap);
        const bandAt = (k: number, n: number) => vwapAt(k) - n * vw[k].dev;
        const first = [1, 2, 3].find((n) => bandAt(entryAt, n) < entry);
        const target0 = short ? va.val : -va.vah;
        if ((plan !== "value-area" && first === undefined) || (plan === "value-area" && target0 >= entry)) {
            skipped += 1;
            continue;
        }

        // Managed candle by candle until the stop, the exit rule, or the end of the UTC day.
        const dayEnd = (Math.floor(bars[entryAt].t / DAY) + 1) * DAY;
        const cost = ((s.costPerSide * 2 * (short ? entry : -entry)) / risk);
        const R = (price: number) => (entry - price) / risk;
        let band = first ?? 3;
        let reached = false, accepted = 0, banked = 0, open = 1;
        let exitAt = entryAt, result = 0, exit = "day end";
        for (let k = entryAt + 1; k < bars.length; k++) {
            const b = see(bars[k]);
            exitAt = k;
            if (bars[k].t >= dayEnd) {
                result = banked + open * R(b.o);
                break;
            }
            if (b.h >= stop) {
                result = banked + open * R(stop);
                exit = "stop";
                break;
            }
            if (plan === "value-area") {
                if (s.limitOrders ? b.l < target0 : b.l <= target0) {
                    result = R(target0);
                    exit = "value area";
                    break;
                }
                continue;
            }
            const level = bandAt(k, band);
            if (!reached && (s.limitOrders ? b.l < level : b.l <= level)) {
                reached = true;
                accepted = 0;
                if (plan === "fixed") {
                    result = R(level);
                    exit = `band ${band}`;
                    break;
                }
                if (plan === "half" && open === 1) {
                    banked = 0.5 * R(level);
                    open = 0.5;
                }
            }
            if (reached) {
                // Holding beyond the band: the next band becomes the target.
                accepted = b.c < level ? accepted + 1 : 0;
                if (accepted >= s.acceptCandles && band < 3) {
                    band += 1;
                    reached = false;
                    continue;
                }
                // A big 5-minute sweep of the band that closes back: the move is taken as over.
                const closes5 = (bars[k].t + MIN) % (5 * MIN) === 0;
                const at5 = index5.get(Math.floor(bars[k].t / (5 * MIN)) * 5 * MIN);
                if (closes5 && at5 !== undefined && at5 >= 20) {
                    const bar5 = see(m5[at5]);
                    if (bar5.l < level && bar5.c > level && m5[at5].v > average(m5.slice(at5 - 20, at5).map((x) => x.v)) * s.sweepVolume) {
                        result = banked + open * R(b.c);
                        exit = "sweep at band";
                        break;
                    }
                }
            }
        }
        trades.push({ direction: short ? "Short" : "Long", openedAt: bars[entryAt].t, closedAt: bars[exitAt].t, entry: entry * sign, stop: stop * sign, r: result - (s.limitOrders ? (((MAKER + (exit === "stop" || exit === "day end" || exit === "sweep at band" ? TAKER_WITH_SLIPPAGE : MAKER)) * Math.abs(entry)) / risk) : Math.abs(cost)), vwapConfirmed: bars[entryAt].c * sign < v0.vwap * sign, exit, sweepAt: sweep.t, vah: va.vah, val: va.val, gapTop: gap.top * sign, gapBottom: gap.bottom * sign, gapAt: m5[gap.at].t });
        busyUntil = bars[exitAt].t;
    }
    return { trades, skipped, missed };
}

export function summary(trades: SimTrade[]) {
    const wins = trades.filter((t) => t.r > 0);
    const gross = wins.reduce((a, t) => a + t.r, 0);
    const lost = trades.filter((t) => t.r <= 0).reduce((a, t) => a - t.r, 0);
    let peak = 0, equity = 0, drawdown = 0;
    for (const t of trades) {
        equity += t.r;
        peak = Math.max(peak, equity);
        drawdown = Math.max(drawdown, peak - equity);
    }
    return { trades: trades.length, winRate: trades.length ? wins.length / trades.length : 0, totalR: equity, avgR: trades.length ? equity / trades.length : 0, profitFactor: lost > 0 ? gross / lost : null, drawdownR: drawdown };
}
