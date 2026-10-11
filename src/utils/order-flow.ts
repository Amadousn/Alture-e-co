// Order flow from real exchange trades: volume bubbles, absorption, exhaustion
// and CVD divergence. Everything here is computed from trades that carry the
// exchange's own taker side. Nothing is estimated from candles and nothing is
// generated: with no trades there are no bubbles and no signals.

export type Side = "Buy" | "Sell";
// One public trade. `side` is the taker (aggressor) side as stated by the exchange.
export type Trade = { id: string; t: number; p: number; q: number; side: Side };

// Buy and sell are aggressive volume in quote currency (USDT).
export type FlowCandle = { t: number; o: number; h: number; l: number; c: number; buy: number; sell: number; trades: number; covered: boolean };

export type Bubble = { id: string; candle: number; at: number; price: number; side: Side; notional: number; qty: number; trades: number };

export type SignalStatus = "provisional" | "confirmed" | "failed" | "unconfirmed";
export type Reason = { label: string; value: string; threshold?: string };
export type Signal = {
    id: string;
    kind: "absorption" | "exhaustion" | "divergence";
    // The side of the aggressive flow the signal is about.
    side: Side;
    t: number;
    price: number;
    status: SignalStatus;
    title: string;
    why: string;
    statusNote: string;
    reasons: Reason[];
    // For divergences: the earlier swing the line is drawn from.
    from?: { t: number; price: number };
};

export type FlowSettings = {
    // 0 means automatic.
    bubbleMinUsd: number;
    absWindowSec: number;
    absMinUsd: number;
    absShare: number;
    absMinTrades: number;
    absMaxMovePct: number;
    exhDecline: number;
    exhProgress: number;
    exhLookback: number;
    divPivot: number;
};

export const DEFAULT_FLOW_SETTINGS: FlowSettings = {
    bubbleMinUsd: 0,
    absWindowSec: 60,
    absMinUsd: 0,
    absShare: 0.65,
    absMinTrades: 25,
    absMaxMovePct: 0.03,
    exhDecline: 0.5,
    exhProgress: 0.5,
    exhLookback: 8,
    divPivot: 2,
};

export type FlowSnapshot = {
    candles: FlowCandle[];
    bubbles: Bubble[];
    signals: Signal[];
    // Cumulative delta over the unbroken run of fully covered candles.
    cvd: { t: number; v: number }[];
    tradeCount: number;
    // Time of the first trade of the current unbroken stretch, or null before any trade.
    since: number | null;
    lastTradeAt: number | null;
    lastPrice: number | null;
    coveredCandles: number;
    bubbleThreshold: number | null;
    absThreshold: number | null;
    binSize: number | null;
};

const KEEP_CANDLES = 400;
const MAX_BUBBLES = 260;
const AUTO_BUBBLE_PERCENTILE = 0.9;
const AUTO_BUBBLE_MIN_CLUSTERS = 30;
const AUTO_ABS_MULTIPLE = 3;

export const INTERVAL_MS: Record<string, number> = { "1": 60000, "3": 180000, "5": 300000, "15": 900000, "30": 1800000, "60": 3600000, "240": 14400000, D: 86400000 };

export const usd = (value: number) => (value >= 1e6 ? `$${(value / 1e6).toFixed(2)}M` : value >= 1e3 ? `$${(value / 1e3).toFixed(1)}K` : `$${value.toFixed(0)}`);
const pct = (value: number, digits = 0) => `${(value * 100).toFixed(digits)}%`;

// A round price step near 0.01% of price, so one bubble covers a few ticks, not one.
export function binFor(price: number): number {
    const raw = price * 0.0001;
    const pow = 10 ** Math.floor(Math.log10(raw));
    const unit = raw / pow;
    return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * pow;
}

type Cluster = Bubble & { pq: number; tq: number };
type AbsRef = { signal: Signal; hi: number; lo: number; until: number };

export function createFlowEngine(intervalMs: number, initial: FlowSettings = DEFAULT_FLOW_SETTINGS) {
    let settings = initial;
    // A bubble groups the trades of one side at one price step within a slice of the candle.
    const sliceMs = Math.max(10000, intervalMs / 6);
    const candles = new Map<number, FlowCandle>();
    const clusters = new Map<string, Cluster>();
    const seen = new Set<string>();
    const seenOrder: string[] = [];
    const signals: Signal[] = [];
    let recent: Trade[] = [];
    let bin: number | null = null;
    let since: number | null = null;
    let lastTradeAt: number | null = null;
    let lastPrice: number | null = null;
    let tradeCount = 0;
    let current: number | null = null;
    // Aggressive volume since `since`, for the automatic absorption threshold.
    const sideTotal: Record<Side, number> = { Buy: 0, Sell: 0 };
    const lastAbs: Record<Side, number> = { Buy: 0, Sell: 0 };
    const openAbs: AbsRef[] = [];
    // Fully covered candles with no gap between them, oldest first.
    let run: FlowCandle[] = [];
    let runCvd: number[] = [];
    let pendingExh: { signal: Signal; candle: FlowCandle }[] = [];
    let lastSwing: Record<"high" | "low", { t: number; price: number; cvd: number } | null> = { high: null, low: null };

    const remember = (id: string) => {
        seen.add(id);
        seenOrder.push(id);
        if (seenOrder.length > 6000) seen.delete(seenOrder.shift()!);
    };

    const absThreshold = (side: Side): number | null => {
        if (settings.absMinUsd > 0) return settings.absMinUsd;
        if (since === null || lastTradeAt === null) return null;
        const windowMs = settings.absWindowSec * 1000;
        const elapsed = lastTradeAt - since;
        // The baseline needs a few windows of history before it means anything.
        if (elapsed < windowMs * 3) return null;
        return (sideTotal[side] / elapsed) * windowMs * AUTO_ABS_MULTIPLE;
    };

    const cvdOfRun = () => run.map((candle, i) => ({ t: candle.t, v: runCvd[i] }));

    function detectAbsorption(now: number) {
        const windowMs = settings.absWindowSec * 1000;
        if (recent.length === 0 || since === null || now - since < windowMs) return;
        const first = recent[0].p;
        const last = recent[recent.length - 1].p;
        let hi = -Infinity;
        let lo = Infinity;
        const vol: Record<Side, number> = { Buy: 0, Sell: 0 };
        const count: Record<Side, number> = { Buy: 0, Sell: 0 };
        const pq: Record<Side, number> = { Buy: 0, Sell: 0 };
        const qty: Record<Side, number> = { Buy: 0, Sell: 0 };
        for (const trade of recent) {
            hi = Math.max(hi, trade.p);
            lo = Math.min(lo, trade.p);
            vol[trade.side] += trade.p * trade.q;
            count[trade.side] += 1;
            pq[trade.side] += trade.p * trade.q;
            qty[trade.side] += trade.q;
        }
        const total = vol.Buy + vol.Sell;
        if (total <= 0) return;
        const maxMove = settings.absMaxMovePct / 100;
        const range = (hi - lo) / first;
        for (const side of ["Sell", "Buy"] as Side[]) {
            if (now - lastAbs[side] < windowMs) continue;
            const threshold = absThreshold(side);
            if (threshold === null) continue;
            const share = vol[side] / total;
            // Progress in the direction the aggressors were pushing: down for sells, up for buys.
            const progress = side === "Sell" ? (first - last) / first : (last - first) / first;
            if (vol[side] < threshold || share < settings.absShare || count[side] < settings.absMinTrades || progress > maxMove || range > maxMove * 2.5) continue;
            lastAbs[side] = now;
            const price = pq[side] / qty[side];
            const selling = side === "Sell";
            const signal: Signal = {
                id: `abs-${side}-${now}`,
                kind: "absorption",
                side,
                t: now,
                price,
                status: "provisional",
                title: selling ? "Potential absorption of selling" : "Potential absorption of buying",
                why: selling
                    ? "Aggressive sellers traded heavily in this window, yet price did not move down in proportion. That fits passive buyers absorbing the selling. It is not a guaranteed reversal."
                    : "Aggressive buyers traded heavily in this window, yet price did not move up in proportion. That fits passive sellers absorbing the buying. It is not a guaranteed reversal.",
                statusNote: `Provisional. Confirmed if price trades ${selling ? "above" : "below"} the window's ${selling ? "high" : "low"} within ${settings.absWindowSec * 2} seconds; failed if it breaks the other side.`,
                reasons: [
                    { label: `Aggressive ${selling ? "sell" : "buy"} volume in ${settings.absWindowSec}s`, value: usd(vol[side]), threshold: `at least ${usd(threshold)}${settings.absMinUsd > 0 ? "" : ` (${AUTO_ABS_MULTIPLE}x the average since connection)`}` },
                    { label: `${selling ? "Sell" : "Buy"} share of the window`, value: pct(share), threshold: `at least ${pct(settings.absShare)}` },
                    { label: `${selling ? "Sell" : "Buy"} trades at the level`, value: String(count[side]), threshold: `at least ${settings.absMinTrades}` },
                    { label: `Price progress ${selling ? "down" : "up"}`, value: pct(progress, 3), threshold: `at most ${pct(maxMove, 3)}` },
                    { label: "Window price range", value: pct(range, 3), threshold: `at most ${pct(maxMove * 2.5, 3)}` },
                    { label: "Order book depth", value: "not used", threshold: "trades only" },
                ],
            };
            signals.push(signal);
            openAbs.push({ signal, hi, lo, until: now + windowMs * 2 });
        }
    }

    function settleAbsorption(trade: Trade) {
        for (let i = openAbs.length - 1; i >= 0; i--) {
            const ref = openAbs[i];
            const selling = ref.signal.side === "Sell";
            const tolerance = (settings.absMaxMovePct / 100) * ref.signal.price;
            const confirmed = selling ? trade.p > ref.hi : trade.p < ref.lo;
            const failed = selling ? trade.p < ref.lo - tolerance : trade.p > ref.hi + tolerance;
            if (confirmed) {
                ref.signal.status = "confirmed";
                ref.signal.statusNote = `Confirmed by price: it traded ${selling ? "above the window high" : "below the window low"} afterwards. Still not a guarantee of follow-through.`;
            } else if (failed) {
                ref.signal.status = "failed";
                ref.signal.statusNote = `Failed: price broke ${selling ? "below the window low" : "above the window high"} afterwards, so the level did not hold.`;
            } else if (trade.t > ref.until) {
                ref.signal.status = "unconfirmed";
                ref.signal.statusNote = "Not confirmed: price neither left the range in the expected direction nor broke the level in time.";
            } else continue;
            openAbs.splice(i, 1);
        }
    }

    function detectExhaustion(closed: FlowCandle) {
        // Settle the signals raised on the previous candle first.
        for (const pending of pendingExh) {
            const buying = pending.signal.side === "Buy";
            const prev = pending.candle;
            const stalled = buying ? closed.h <= prev.h && closed.c < prev.c : closed.l >= prev.l && closed.c > prev.c;
            const resumed = buying ? closed.h > prev.h && closed.buy - closed.sell > prev.buy - prev.sell : closed.l < prev.l && closed.buy - closed.sell < prev.buy - prev.sell;
            pending.signal.status = stalled ? "confirmed" : resumed ? "failed" : "unconfirmed";
            pending.signal.statusNote = stalled
                ? `Confirmed by the next candle: no new ${buying ? "high" : "low"} and a ${buying ? "lower" : "higher"} close. Still not a guaranteed reversal.`
                : resumed
                  ? `Failed: the next candle made a new ${buying ? "high" : "low"} with stronger delta, so the move continued.`
                  : "Not confirmed: the next candle neither stalled nor clearly resumed the move.";
        }
        pendingExh = [];
        if (run.length < 3) return;
        const [a, b, c] = run.slice(-3);
        const look = run.slice(-Math.max(3, settings.exhLookback));
        const delta = (candle: FlowCandle) => candle.buy - candle.sell;
        for (const side of ["Buy", "Sell"] as Side[]) {
            const buying = side === "Buy";
            const stepNow = buying ? c.h - b.h : b.l - c.l;
            const stepBefore = buying ? b.h - a.h : a.l - b.l;
            // A move in progress: two successive new extremes, and the latest is the extreme of the lookback.
            if (stepNow <= 0 || stepBefore <= 0) continue;
            const extreme = buying ? look.every((candle) => candle.h <= c.h) : look.every((candle) => candle.l >= c.l);
            const push = buying ? delta(b) : -delta(b);
            const pushNow = buying ? delta(c) : -delta(c);
            if (!extreme || push <= 0) continue;
            const deltaRatio = pushNow / push;
            const progressRatio = stepNow / stepBefore;
            const activity = b.trades > 0 ? c.trades / b.trades : 0;
            if (deltaRatio > settings.exhDecline || progressRatio > settings.exhProgress || activity < 0.5) continue;
            const signal: Signal = {
                id: `exh-${side}-${c.t}`,
                kind: "exhaustion",
                side,
                t: c.t,
                price: buying ? c.h : c.l,
                status: "provisional",
                title: buying ? "Potential buying exhaustion" : "Potential selling exhaustion",
                why: buying
                    ? "Price made another high, but net aggressive buying fell sharply and the new high added much less than the one before, while trading stayed active. That fits buyers running out of push. It is not a guaranteed reversal."
                    : "Price made another low, but net aggressive selling fell sharply and the new low added much less than the one before, while trading stayed active. That fits sellers running out of push. It is not a guaranteed reversal.",
                statusNote: "Provisional until the next candle closes.",
                reasons: [
                    { label: `Net aggressive ${buying ? "buying" : "selling"}, this candle vs the one before`, value: `${usd(Math.max(0, pushNow))} vs ${usd(push)} (${pct(Math.max(0, deltaRatio))})`, threshold: `at most ${pct(settings.exhDecline)}` },
                    { label: `New ${buying ? "high" : "low"} vs the previous step`, value: pct(progressRatio), threshold: `at most ${pct(settings.exhProgress)}` },
                    { label: "Trades vs the candle before", value: pct(activity), threshold: "at least 50%" },
                    { label: `${buying ? "Highest high" : "Lowest low"} of the lookback`, value: `${look.length} candles`, threshold: `up to ${settings.exhLookback}` },
                ],
            };
            signals.push(signal);
            pendingExh.push({ signal, candle: c });
        }
    }

    function detectDivergence() {
        const k = settings.divPivot;
        const index = run.length - 1 - k;
        if (index - k < 0) return;
        const cvd = cvdOfRun();
        const pivot = run[index];
        const around = run.slice(index - k, index + k + 1).filter((candle) => candle !== pivot);
        const check = (kind: "high" | "low") => {
            const high = kind === "high";
            const price = high ? pivot.h : pivot.l;
            if (!around.every((candle) => (high ? candle.h < price : candle.l > price))) return;
            const swing = { t: pivot.t, price, cvd: cvd[index].v };
            const prev = lastSwing[kind];
            lastSwing[kind] = swing;
            if (!prev) return;
            const diverges = high ? price > prev.price && swing.cvd < prev.cvd : price < prev.price && swing.cvd > prev.cvd;
            if (!diverges) return;
            signals.push({
                id: `div-${kind}-${pivot.t}`,
                kind: "divergence",
                side: high ? "Buy" : "Sell",
                t: pivot.t,
                price,
                // The swing itself is confirmed; what follows is not.
                status: "confirmed",
                title: high ? "Potential bearish CVD divergence" : "Potential bullish CVD divergence",
                why: high
                    ? "Price made a higher high while cumulative delta made a lower high: the new high was reached with less net aggressive buying. It is not a guaranteed reversal or an entry."
                    : "Price made a lower low while cumulative delta made a higher low: the new low was reached with less net aggressive selling. It is not a guaranteed reversal or an entry.",
                statusNote: `The swing is confirmed: ${k} candles have closed after it without a ${high ? "higher high" : "lower low"}, which is why the mark appears ${k} candles late.`,
                reasons: [
                    { label: `Price ${high ? "high" : "low"}`, value: String(price), threshold: `${high ? "above" : "below"} ${prev.price}` },
                    { label: "CVD at that swing", value: usd(Math.abs(swing.cvd)) + (swing.cvd < 0 ? " net sold" : " net bought"), threshold: `${high ? "below" : "above"} ${usd(Math.abs(prev.cvd))}${prev.cvd < 0 ? " net sold" : " net bought"}` },
                    { label: "Swing rule", value: `${k} candles each side` },
                    { label: "CVD source", value: "exchange taker side, since connection" },
                ],
                from: { t: prev.t, price: prev.price },
            });
        };
        check("high");
        check("low");
    }

    function closeCandle(t: number) {
        const candle = candles.get(t);
        if (!candle) return;
        const previous = run[run.length - 1];
        if (!candle.covered || (previous && candle.t - previous.t !== intervalMs)) {
            // A hole in the data: cumulative delta and swings cannot be carried across it.
            run = candle.covered ? [candle] : [];
            runCvd = candle.covered ? [candle.buy - candle.sell] : [];
            lastSwing = { high: null, low: null };
            pendingExh = [];
            return;
        }
        run.push(candle);
        runCvd.push((runCvd[runCvd.length - 1] ?? 0) + candle.buy - candle.sell);
        if (run.length > KEEP_CANDLES) {
            run.shift();
            runCvd.shift();
        }
        detectExhaustion(candle);
        detectDivergence();
    }

    function ingestOne(trade: Trade) {
        if (seen.has(trade.id) || !(trade.p > 0) || !(trade.q > 0)) return;
        // Trades arrive in order; an older one after a newer one is a late duplicate of the backfill.
        if (lastTradeAt !== null && trade.t < lastTradeAt - 5000) return;
        remember(trade.id);
        const start = Math.floor(trade.t / intervalMs) * intervalMs;
        if (since === null) since = trade.t;
        if (bin === null) bin = binFor(trade.p);
        if (current !== null && start > current) closeCandle(current);
        const notional = trade.p * trade.q;
        let candle = candles.get(start);
        if (!candle) {
            // Covered only if the stream was already running when the candle opened.
            candle = { t: start, o: trade.p, h: trade.p, l: trade.p, c: trade.p, buy: 0, sell: 0, trades: 0, covered: since <= start };
            candles.set(start, candle);
            if (candles.size > KEEP_CANDLES) {
                const oldest = Math.min(...candles.keys());
                candles.delete(oldest);
                for (const [key, cluster] of clusters) if (cluster.candle <= oldest) clusters.delete(key);
            }
        }
        current = Math.max(current ?? start, start);
        candle.h = Math.max(candle.h, trade.p);
        candle.l = Math.min(candle.l, trade.p);
        candle.c = trade.p;
        candle.trades += 1;
        if (trade.side === "Buy") candle.buy += notional;
        else candle.sell += notional;

        const level = Math.round(trade.p / bin);
        const key = `${Math.floor(trade.t / sliceMs)}|${trade.side}|${level}`;
        let cluster = clusters.get(key);
        if (!cluster) {
            cluster = { id: key, candle: start, at: trade.t, price: trade.p, side: trade.side, notional: 0, qty: 0, trades: 0, pq: 0, tq: 0 };
            clusters.set(key, cluster);
        }
        cluster.notional += notional;
        cluster.qty += trade.q;
        cluster.trades += 1;
        cluster.pq += trade.p * trade.q;
        cluster.tq += trade.t * trade.q;
        cluster.price = cluster.pq / cluster.qty;
        cluster.at = cluster.tq / cluster.qty;

        sideTotal[trade.side] += notional;
        tradeCount += 1;
        lastTradeAt = trade.t;
        lastPrice = trade.p;
        recent.push(trade);
        settleAbsorption(trade);
    }

    return {
        setSettings(next: FlowSettings) {
            settings = next;
        },
        // Trades in time order. Duplicates (by exchange trade id) are ignored.
        ingest(trades: Trade[]) {
            if (trades.length === 0) return;
            for (const trade of trades) ingestOne(trade);
            if (lastTradeAt === null) return;
            const cutoff = lastTradeAt - settings.absWindowSec * 1000;
            let drop = 0;
            while (drop < recent.length && recent[drop].t < cutoff) drop++;
            if (drop > 0) recent = recent.slice(drop);
            detectAbsorption(lastTradeAt);
        },
        // The stream dropped: what was missed is unknown, so coverage restarts from the next trade.
        gap() {
            if (current !== null) {
                const candle = candles.get(current);
                if (candle) candle.covered = false;
            }
            since = null;
            current = null;
            recent = [];
            run = [];
            runCvd = [];
            pendingExh = [];
            lastSwing = { high: null, low: null };
            sideTotal.Buy = 0;
            sideTotal.Sell = 0;
            for (const ref of openAbs) {
                ref.signal.status = "unconfirmed";
                ref.signal.statusNote = "Not confirmed: the trade stream disconnected before the outcome was known.";
            }
            openAbs.length = 0;
        },
        snapshot(): FlowSnapshot {
            const all = [...clusters.values()];
            let threshold: number | null = settings.bubbleMinUsd > 0 ? settings.bubbleMinUsd : null;
            if (threshold === null && all.length >= AUTO_BUBBLE_MIN_CLUSTERS) {
                const sorted = all.map((cluster) => cluster.notional).sort((x, y) => x - y);
                threshold = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * AUTO_BUBBLE_PERCENTILE))];
            }
            const bubbles = threshold === null ? [] : all.filter((cluster) => cluster.notional >= threshold!).sort((x, y) => y.notional - x.notional).slice(0, MAX_BUBBLES).map(({ pq: _pq, tq: _tq, ...bubble }) => bubble);
            const list = [...candles.values()].sort((x, y) => x.t - y.t);
            return {
                candles: list,
                bubbles,
                signals: signals.slice(-200),
                cvd: cvdOfRun(),
                tradeCount,
                since,
                lastTradeAt,
                lastPrice,
                coveredCandles: run.length,
                bubbleThreshold: threshold,
                absThreshold: absThreshold("Sell"),
                binSize: bin,
            };
        },
    };
}

export type FlowEngine = ReturnType<typeof createFlowEngine>;
