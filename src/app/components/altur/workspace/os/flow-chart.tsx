"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bubble, DEFAULT_FLOW_SETTINGS, FlowSettings, FlowSnapshot, INTERVAL_MS, Signal, usd } from "@/utils/order-flow";
import { useOrderFlow } from "@/utils/use-order-flow";
import { PROFILE_DEFAULTS, volumeProfile } from "@/utils/volume-profile";

type Kline = { t: number; o: number; h: number; l: number; c: number; v?: number };
type Prefs = { profile: boolean; bubbles: boolean; absorption: boolean; exhaustion: boolean; divergence: boolean; buyColor: string; sellColor: string; exhColor: string; opacity: number; settings: FlowSettings };
type Pick = { type: "bubble"; bubble: Bubble } | { type: "signal"; signal: Signal };
type Hit = { x: number; y: number; r: number; pick: Pick };

const STORE = "alturelock.flow.v1";
const DEFAULT_PREFS: Prefs = { profile: true, bubbles: true, absorption: true, exhaustion: true, divergence: true, buyColor: "#20B8A8", sellColor: "#E955A8", exhColor: "#E3A1F7", opacity: 0.55, settings: DEFAULT_FLOW_SETTINGS };
const LABELS: Record<string, string> = { "1": "1 minute", "3": "3 minutes", "5": "5 minutes", "15": "15 minutes", "30": "30 minutes", "60": "1 hour", "240": "4 hours", D: "1 day" };

const fmtPrice = (value: number) => value.toLocaleString(undefined, { minimumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5, maximumFractionDigits: value >= 100 ? 2 : value >= 1 ? 3 : 5 });
const clock = (time: number, seconds = true) => new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", ...(seconds ? { second: "2-digit" } : {}) });
const rgba = (hex: string, alpha: number) => {
    const value = /^#[0-9a-f]{6}$/i.test(hex) ? hex : "#ffffff";
    return `rgba(${parseInt(value.slice(1, 3), 16)},${parseInt(value.slice(3, 5), 16)},${parseInt(value.slice(5, 7), 16)},${alpha})`;
};

// Candles from the exchange's own klines, with the live candle kept current by the trade stream.
function mergeRows(klines: Kline[], snapshot: FlowSnapshot | null): Kline[] {
    const rows = new Map(klines.map((candle) => [candle.t, { ...candle }]));
    for (const live of snapshot?.candles ?? []) {
        const row = rows.get(live.t);
        if (!row) {
            if (klines.length > 0 && live.t > klines[klines.length - 1].t) rows.set(live.t, { t: live.t, o: live.o, h: live.h, l: live.l, c: live.c });
        } else if (live.t >= (klines[klines.length - 1]?.t ?? 0)) {
            row.h = Math.max(row.h, live.h);
            row.l = Math.min(row.l, live.l);
            row.c = live.c;
        }
    }
    return [...rows.values()].sort((a, b) => a.t - b.t);
}

function paint(ctx: CanvasRenderingContext2D, w: number, h: number, rows: Kline[], snapshot: FlowSnapshot | null, prefs: Prefs, intervalMs: number, selected: string | null): Hit[] {
    const hits: Hit[] = [];
    ctx.clearRect(0, 0, w, h);
    if (rows.length < 2) return hits;
    const narrow = w < 520;
    const gutter = narrow ? 62 : 66;
    const axis = 18;
    const cvdH = Math.max(52, Math.round(h * 0.2));
    const top = 10;
    const plotW = w - gutter;
    const plotH = h - top - axis - cvdH - 8;
    const cw = narrow ? 7 : 9;
    // The Volume Profile has its own strip between the candles and the price scale.
    const vpW = prefs.profile ? Math.round(plotW * (narrow ? 0.22 : 0.17)) : 0;
    const count = Math.max(10, Math.min(rows.length, Math.floor((plotW - vpW) / cw) - 3));
    const view = rows.slice(-count);
    const first = view[0].t;
    const lo = Math.min(...view.map((row) => row.l));
    const hi = Math.max(...view.map((row) => row.h));
    const pad = (hi - lo || hi * 0.001) * 0.08;
    const min = lo - pad;
    const max = hi + pad;
    const index = new Map(view.map((row, i) => [row.t, i]));
    const xi = (i: number) => (i + 0.5) * cw;
    const xt = (time: number) => {
        const start = Math.floor(time / intervalMs) * intervalMs;
        const i = index.get(start);
        return i === undefined ? null : xi(i) + ((time - start) / intervalMs - 0.5) * cw * 0.8;
    };
    const y = (price: number) => top + ((max - price) / (max - min)) * plotH;

    ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.textBaseline = "middle";

    // Price grid and scale.
    ctx.lineWidth = 1;
    for (let k = 0; k <= 4; k++) {
        const price = min + ((max - min) * k) / 4;
        const py = Math.round(y(price)) + 0.5;
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.beginPath();
        ctx.moveTo(0, py);
        ctx.lineTo(plotW, py);
        ctx.stroke();
        ctx.fillStyle = "rgba(255,255,255,0.32)";
        ctx.textAlign = "left";
        ctx.fillText(fmtPrice(price), plotW + 6, py);
    }

    // Where order flow begins. Everything left of this line is price only.
    const since = snapshot?.since ?? null;
    if (since !== null && since > first) {
        const sx = xt(since);
        if (sx !== null) {
            ctx.fillStyle = "rgba(255,255,255,0.025)";
            ctx.fillRect(0, top, sx, plotH);
            ctx.setLineDash([2, 4]);
            ctx.strokeStyle = "rgba(255,255,255,0.25)";
            ctx.beginPath();
            ctx.moveTo(Math.round(sx) + 0.5, top);
            ctx.lineTo(Math.round(sx) + 0.5, top + plotH);
            ctx.stroke();
            ctx.setLineDash([]);
            if (sx > 150) {
                ctx.fillStyle = "rgba(255,255,255,0.3)";
                ctx.textAlign = "right";
                ctx.fillText("price only before this line", sx - 6, top + 7);
            }
        }
    }

    // Candles in white and grey, so the coloured bubbles carry the order flow.
    view.forEach((row, i) => {
        const cx = Math.round(xi(i)) + 0.5;
        const up = row.c >= row.o;
        ctx.strokeStyle = up ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.34)";
        ctx.fillStyle = up ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.34)";
        ctx.beginPath();
        ctx.moveTo(cx, y(row.h));
        ctx.lineTo(cx, y(row.l));
        ctx.stroke();
        const bodyTop = y(Math.max(row.o, row.c));
        const bodyH = Math.max(1, y(Math.min(row.o, row.c)) - bodyTop);
        const bw = Math.max(3, cw - 3);
        ctx.fillRect(cx - bw / 2, bodyTop, bw, bodyH);
    });

    // Time axis.
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.textAlign = "center";
    const every = Math.max(1, Math.round(view.length / (narrow ? 4 : 7)));
    for (let i = every; i < view.length - 1; i += every) ctx.fillText(intervalMs >= 86400000 ? new Date(view[i].t).toLocaleDateString(undefined, { day: "numeric", month: "short" }) : clock(view[i].t, false), xi(i), h - cvdH - axis / 2 - 6);

    // Last price.
    const last = view[view.length - 1].c;
    const ly = Math.round(y(last)) + 0.5;
    ctx.setLineDash([1, 3]);
    ctx.strokeStyle = "rgba(255,255,255,0.4)";
    ctx.beginPath();
    ctx.moveTo(0, ly);
    ctx.lineTo(plotW, ly);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(plotW + 2, ly - 8, gutter - 4, 16);
    ctx.fillStyle = "#000000";
    ctx.textAlign = "left";
    ctx.fillText(fmtPrice(last), plotW + 6, ly);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, plotW, top + plotH + 2);
    ctx.clip();

    // Volume Profile: the volume traded at each price over the candles in view, from the exchange's own klines.
    // Each row is up-candle volume (light) then down-candle volume; rows inside the value area are brighter.
    const traded = view.filter((row) => (row.v ?? 0) > 0).map((row) => ({ ...row, v: row.v ?? 0 }));
    if (vpW > 0 && traded.length >= 10) {
        const profile = volumeProfile(traded, { ...PROFILE_DEFAULTS, rows: Math.max(24, Math.round(plotH / 4)) });
        const biggest = Math.max(...profile.rows);
        const rowH = Math.max(1, Math.abs(y(profile.lo) - y(profile.lo + profile.step)) - 1);
        const widest = vpW - 6;
        profile.rows.forEach((volume, j) => {
            if (volume <= 0 || biggest <= 0) return;
            const price = profile.lo + (j + 0.5) * profile.step;
            const width = (widest * volume) / biggest;
            const upWidth = (width * profile.up[j]) / volume;
            const inside = price <= profile.vah && price >= profile.val;
            const py = y(price) - rowH / 2;
            ctx.fillStyle = `rgba(230,230,230,${inside ? 0.5 : 0.18})`;
            ctx.fillRect(plotW - upWidth, py, upWidth, rowH);
            ctx.fillStyle = `rgba(181,124,196,${inside ? 0.7 : 0.26})`;
            ctx.fillRect(plotW - width, py, width - upWidth, rowH);
        });
        ctx.textAlign = "left";
        for (const [name, price, color] of [["VAH", profile.vah, "rgba(255,255,255,0.55)"], ["POC", profile.poc, "rgba(245,217,10,0.95)"], ["VAL", profile.val, "rgba(255,255,255,0.55)"]] as const) {
            const py = Math.round(y(price)) + 0.5;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(plotW - vpW - (name === "POC" ? 28 : 0), py);
            ctx.lineTo(plotW, py);
            ctx.stroke();
            ctx.fillStyle = color;
            ctx.fillText(name, plotW - vpW + 2, py - 7);
        }
    }

    // Bubbles: one per cluster of aggressive volume at a price, area in proportion to its size.
    if (prefs.bubbles && snapshot && snapshot.bubbleThreshold) {
        const maxR = narrow ? 16 : 22;
        for (const bubble of snapshot.bubbles) {
            const bx = xt(bubble.at);
            if (bx === null) continue;
            const by = y(bubble.price);
            const r = Math.max(3.5, Math.min(maxR, 3.5 * Math.sqrt(bubble.notional / snapshot.bubbleThreshold)));
            const color = bubble.side === "Buy" ? prefs.buyColor : prefs.sellColor;
            ctx.beginPath();
            ctx.arc(bx, by, r, 0, Math.PI * 2);
            ctx.fillStyle = rgba(color, prefs.opacity * 0.6);
            ctx.fill();
            ctx.lineWidth = selected === bubble.id ? 2 : 1;
            ctx.strokeStyle = selected === bubble.id ? "#FFFFFF" : rgba(color, Math.min(1, prefs.opacity + 0.3));
            ctx.stroke();
            hits.push({ x: bx, y: by, r, pick: { type: "bubble", bubble } });
        }
    }

    // Signals. Filled once confirmed, outlined while provisional, grey when failed or unconfirmed.
    for (const signal of snapshot?.signals ?? []) {
        if (!prefs[signal.kind]) continue;
        const sx = signal.kind === "absorption" ? xt(signal.t) : index.has(signal.t) ? xi(index.get(signal.t)!) : null;
        if (sx === null) continue;
        // Selling absorbed and selling exhausted lean supportive (buy colour); the buying side the reverse.
        const supportive = signal.side === "Sell";
        const dead = signal.status === "failed" || signal.status === "unconfirmed";
        // Exhaustion has its own colour; the triangle's direction says which side ran out.
        const color = dead ? "rgba(255,255,255,0.3)" : signal.kind === "divergence" ? "#FFFFFF" : signal.kind === "exhaustion" ? prefs.exhColor : supportive ? prefs.buyColor : prefs.sellColor;
        const filled = signal.status === "confirmed";
        const offset = signal.kind === "absorption" ? 0 : supportive ? 12 : -12;
        const sy = y(signal.price) + offset;
        ctx.lineWidth = selected === signal.id ? 2 : 1.25;
        ctx.strokeStyle = selected === signal.id ? "#FFFFFF" : color;
        ctx.fillStyle = color;
        ctx.beginPath();
        if (signal.kind === "absorption") {
            ctx.moveTo(sx, sy - 6);
            ctx.lineTo(sx + 6, sy);
            ctx.lineTo(sx, sy + 6);
            ctx.lineTo(sx - 6, sy);
        } else if (signal.kind === "exhaustion") {
            // A triangle pointing the way the move may now stall towards.
            const d = supportive ? -1 : 1;
            ctx.moveTo(sx - 5, sy - 4 * d);
            ctx.lineTo(sx + 5, sy - 4 * d);
            ctx.lineTo(sx, sy + 5 * d);
        } else {
            if (signal.from && index.has(signal.from.t)) {
                ctx.save();
                ctx.globalAlpha = 0.55;
                ctx.moveTo(xi(index.get(signal.from.t)!), y(signal.from.price));
                ctx.lineTo(sx, y(signal.price));
                ctx.stroke();
                ctx.restore();
                ctx.beginPath();
            }
            ctx.arc(sx, sy, 4, 0, Math.PI * 2);
        }
        ctx.closePath();
        if (filled) ctx.fill();
        ctx.stroke();
        ctx.fillStyle = dead ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.75)";
        ctx.textAlign = "left";
        ctx.fillText(signal.kind === "absorption" ? "A" : signal.kind === "exhaustion" ? "E" : "D", sx + 9, sy);
        hits.push({ x: sx, y: sy, r: 9, pick: { type: "signal", signal } });
    }
    ctx.restore();

    // Cumulative delta from the exchange's taker side, over the fully streamed candles only.
    const cvdTop = h - cvdH;
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath();
    ctx.moveTo(0, cvdTop + 0.5);
    ctx.lineTo(w, cvdTop + 0.5);
    ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.textAlign = "left";
    const points = (snapshot?.cvd ?? []).filter((point) => index.has(point.t));
    ctx.fillText(points.length >= 2 ? "CVD · real taker side · streamed candles only" : "CVD appears after two fully streamed candles", 0, cvdTop + 10);
    if (points.length >= 2) {
        const values = points.map((point) => point.v);
        const vMin = Math.min(0, ...values);
        const vMax = Math.max(0, ...values);
        const span = vMax - vMin || 1;
        const cy = (value: number) => cvdTop + 20 + ((vMax - value) / span) * (cvdH - 26);
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(0, Math.round(cy(0)) + 0.5);
        ctx.lineTo(plotW, Math.round(cy(0)) + 0.5);
        ctx.stroke();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        points.forEach((point, i) => {
            const px = xi(index.get(point.t)!);
            if (i === 0) ctx.moveTo(px, cy(point.v));
            else ctx.lineTo(px, cy(point.v));
        });
        ctx.stroke();
        const end = points[points.length - 1];
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillText(`${end.v < 0 ? "-" : "+"}${usd(Math.abs(end.v))}`, plotW + 6, cy(end.v));
    }
    return hits;
}

const Toggle = ({ on, onChange, children }: { on: boolean; onChange: (next: boolean) => void; children: React.ReactNode }) => (
    <button type="button" aria-pressed={on} onClick={() => onChange(!on)} className={`nav-link pb-1 text-xs font-medium ${on ? "is-active" : "!text-white/35"}`}>
        {children}
    </button>
);

const Field = ({ label, hint, value, onChange, step = 1, min = 0 }: { label: string; hint?: string; value: number; onChange: (next: number) => void; step?: number; min?: number }) => (
    <label className="block">
        <span className="block text-[11px] text-white/45">{label}</span>
        <input type="number" inputMode="decimal" value={value} min={min} step={step} onChange={(event) => Number.isFinite(event.target.valueAsNumber) && onChange(Math.max(min, event.target.valueAsNumber))} className="mt-1 w-full border-b border-white/15 bg-transparent py-1 font-mono text-sm tabular-nums text-white outline-none focus:border-white/60" />
        {hint && <span className="mt-1 block text-[10px] text-white/30">{hint}</span>}
    </label>
);

// Live order flow over candles: bubbles of real aggressive volume, with
// potential absorption, exhaustion and CVD divergence marked and explained.
// `fill` makes the chart take the height of its container (full screen); otherwise it sets its own.
const FlowChart = ({ symbol, interval, fill = false }: { symbol: string; interval: string; fill?: boolean }) => {
    const wrap = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);
    const hits = useRef<Hit[]>([]);
    const [size, setSize] = useState({ w: 0, h: 0 });
    const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);
    const [loaded, setLoaded] = useState(false);
    const [tuning, setTuning] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [klines, setKlines] = useState<{ key: string; candles: Kline[] } | null>(null);
    const [failed, setFailed] = useState(false);
    const key = `${symbol}|${interval}`;
    const intervalMs = INTERVAL_MS[interval] ?? INTERVAL_MS["5"];
    const flow = useOrderFlow(symbol, interval, prefs.settings, true);
    const snapshot = flow.snapshot;

    // Display preferences are a per-browser convenience; the chart works without them.
    useEffect(() => {
        try {
            const saved = JSON.parse(window.localStorage.getItem(STORE) ?? "null");
            if (saved && typeof saved === "object") setPrefs({ ...DEFAULT_PREFS, ...saved, settings: { ...DEFAULT_FLOW_SETTINGS, ...(saved.settings ?? {}) } });
        } catch {
            // Keep the defaults.
        }
        setLoaded(true);
    }, []);
    useEffect(() => {
        if (!loaded) return;
        try {
            window.localStorage.setItem(STORE, JSON.stringify(prefs));
        } catch {
            // Storage may be blocked; nothing depends on it.
        }
    }, [prefs, loaded]);

    useEffect(() => {
        let cancelled = false;
        setFailed(false);
        const load = async () => {
            try {
                const res = await fetch(`/api/market/klines?symbol=${symbol}&interval=${interval}`, { cache: "no-store" });
                if (!res.ok) throw new Error("unavailable");
                const json = await res.json();
                if (!cancelled) setKlines({ key: `${symbol}|${interval}`, candles: json.candles });
            } catch {
                if (!cancelled) setFailed(true);
            }
        };
        load();
        const id = setInterval(load, 15000);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, [symbol, interval]);
    useEffect(() => setSelected(null), [key]);

    useEffect(() => {
        const node = wrap.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setSize({ w: Math.floor(entry.contentRect.width), h: Math.floor(entry.contentRect.height) }));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const candles = klines?.key === key ? klines.candles : null;
    const rows = useMemo(() => (candles ? mergeRows(candles, snapshot) : []), [candles, snapshot]);

    // Drawn whenever the data changes rather than on an animation loop.
    useEffect(() => {
        const node = canvas.current;
        if (!node || size.w === 0 || size.h === 0) return;
        const ratio = window.devicePixelRatio || 1;
        node.width = Math.round(size.w * ratio);
        node.height = Math.round(size.h * ratio);
        const ctx = node.getContext("2d");
        if (!ctx) return;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        hits.current = paint(ctx, size.w, size.h, rows, snapshot, prefs, intervalMs, selected);
    }, [rows, snapshot, prefs, size, intervalMs, selected]);

    const choose = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;
        let best: { id: string; distance: number } | null = null;
        for (const hit of hits.current) {
            const distance = Math.hypot(hit.x - px, hit.y - py);
            // Signals win ties with the bubble underneath them; a finger gets a wider target than a mouse.
            const reach = Math.max(hit.r, event.pointerType === "touch" ? 16 : 10);
            const score = distance - (hit.pick.type === "signal" ? 6 : 0);
            if (distance <= reach && (!best || score < best.distance)) best = { id: hit.pick.type === "signal" ? hit.pick.signal.id : hit.pick.bubble.id, distance: score };
        }
        setSelected(best?.id ?? null);
    };

    const set = (patch: Partial<Prefs>) => setPrefs((current) => ({ ...current, ...patch }));
    const tune = (patch: Partial<FlowSettings>) => setPrefs((current) => ({ ...current, settings: { ...current.settings, ...patch } }));
    const s = prefs.settings;
    const pair = `${symbol.replace(/USDT$/, "")} / USDT perpetual, Bybit`;
    const found = (kind: Signal["kind"]) => snapshot?.signals.filter((item) => item.kind === kind).length ?? 0;
    const signal = selected ? snapshot?.signals.find((item) => item.id === selected) : undefined;
    const bubble = selected && !signal ? snapshot?.bubbles.find((item) => item.id === selected) : undefined;

    const statusText =
        flow.status === "reconnecting"
            ? "Disconnected from Bybit's trade stream. Reconnecting. Nothing is filled in for the time missed."
            : flow.status === "connecting"
              ? "Connecting to Bybit's public trade stream…"
              : snapshot?.since
                ? `Live from Bybit's public trades · order flow since ${clock(snapshot.since)} · ${snapshot.tradeCount.toLocaleString()} trades`
                : "Connected. Waiting for the first trades…";
    const waiting: string[] = [];
    if (snapshot && flow.status === "live") {
        if (prefs.bubbles && !snapshot.bubbleThreshold) waiting.push("Bubbles appear once enough trades have arrived to set the automatic size threshold.");
        if (prefs.absorption && snapshot.absThreshold === null) waiting.push(`Absorption needs ${s.absWindowSec * 3} seconds of trades to set its automatic volume threshold.`);
        if (prefs.exhaustion && snapshot.coveredCandles < 3) waiting.push(`Exhaustion needs 3 fully streamed ${LABELS[interval] ?? ""} candles (${snapshot.coveredCandles} so far).`);
        if (prefs.divergence && snapshot.coveredCandles < s.divPivot * 2 + 3) waiting.push(`CVD divergence needs two confirmed swings, so at least ${s.divPivot * 2 + 3} fully streamed candles (${snapshot.coveredCandles} so far).`);
    }

    return (
        <div className={`flex flex-col ${fill ? "h-full" : ""}`}>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                <p className="flex items-center gap-2 text-[11px] text-white/45" role="status">
                    <span className={`inline-flex h-1.5 w-1.5 shrink-0 rounded-full ${flow.status === "live" && snapshot?.since ? "bg-[#20B8A8]" : flow.status === "reconnecting" ? "bg-[#E955A8]" : "bg-white/40"}`} />
                    {statusText}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-1" role="group" aria-label="Order flow layers">
                    <Toggle on={prefs.profile} onChange={(profile) => set({ profile })}>Volume profile</Toggle>
                    <Toggle on={prefs.bubbles} onChange={(bubbles) => set({ bubbles })}>Bubbles</Toggle>
                    <Toggle on={prefs.absorption} onChange={(absorption) => set({ absorption })}>Absorption {found("absorption")}</Toggle>
                    <Toggle on={prefs.exhaustion} onChange={(exhaustion) => set({ exhaustion })}>Exhaustion {found("exhaustion")}</Toggle>
                    <Toggle on={prefs.divergence} onChange={(divergence) => set({ divergence })}>CVD divergence {found("divergence")}</Toggle>
                    <Toggle on={tuning} onChange={setTuning}>Settings</Toggle>
                </div>
            </div>

            <div ref={wrap} className={`relative mt-3 ${fill ? "min-h-[240px] flex-1" : "h-[52vh] min-h-[340px]"}`}>
                {!candles ? (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">{failed ? "The chart is unavailable right now: the market data source could not be reached." : "Loading the chart…"}</div>
                ) : (
                    <canvas ref={canvas} onPointerDown={choose} className="absolute inset-0 h-full w-full cursor-crosshair touch-manipulation" role="img" aria-label={`${pair} candles with live order flow`} />
                )}
            </div>

            <p className="mt-2 text-[10px] leading-relaxed text-white/30">
                Circle: a cluster of aggressive volume at one price (size = traded value). A diamond: potential absorption. E triangle (purple): potential exhaustion. D: potential CVD divergence. Outlined is provisional, filled is confirmed, grey did not hold. Tap any mark for the numbers. Bybit only; none of this is a trade signal.
            </p>
            {waiting.length > 0 && <p className="mt-1 text-[10px] leading-relaxed text-white/30">{waiting.join(" ")}</p>}

            {tuning && (
                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-white/10 pt-4 md:grid-cols-4">
                    <Field label="Bubble minimum, USD" hint="0 = automatic (largest 10% of clusters)" value={s.bubbleMinUsd} step={1000} onChange={(bubbleMinUsd) => tune({ bubbleMinUsd })} />
                    <label className="block">
                        <span className="block text-[11px] text-white/45">Bubble opacity</span>
                        <input type="range" min={0.15} max={1} step={0.05} value={prefs.opacity} onChange={(event) => set({ opacity: Number(event.target.value) })} className="mt-2 w-full accent-white" />
                    </label>
                    <label className="block">
                        <span className="block text-[11px] text-white/45">Aggressive buying colour</span>
                        <input type="color" value={prefs.buyColor} onChange={(event) => set({ buyColor: event.target.value })} className="mt-1 h-7 w-full cursor-pointer border-0 bg-transparent p-0" />
                    </label>
                    <label className="block">
                        <span className="block text-[11px] text-white/45">Aggressive selling colour</span>
                        <input type="color" value={prefs.sellColor} onChange={(event) => set({ sellColor: event.target.value })} className="mt-1 h-7 w-full cursor-pointer border-0 bg-transparent p-0" />
                    </label>
                    <label className="block">
                        <span className="block text-[11px] text-white/45">Exhaustion colour</span>
                        <input type="color" value={prefs.exhColor} onChange={(event) => set({ exhColor: event.target.value })} className="mt-1 h-7 w-full cursor-pointer border-0 bg-transparent p-0" />
                    </label>
                    <Field label="Absorption window, seconds" value={s.absWindowSec} min={10} step={10} onChange={(absWindowSec) => tune({ absWindowSec })} />
                    <Field label="Absorption minimum, USD" hint="0 = automatic (3x the average window)" value={s.absMinUsd} step={10000} onChange={(absMinUsd) => tune({ absMinUsd })} />
                    <Field label="Absorption: one-sided share, %" value={Math.round(s.absShare * 100)} min={50} onChange={(value) => tune({ absShare: Math.min(100, value) / 100 })} />
                    <Field label="Absorption: minimum trades" value={s.absMinTrades} min={1} onChange={(absMinTrades) => tune({ absMinTrades })} />
                    <Field label="Absorption: max price progress, %" value={s.absMaxMovePct} step={0.01} onChange={(absMaxMovePct) => tune({ absMaxMovePct })} />
                    <Field label="Exhaustion: delta at most, % of prior" value={Math.round(s.exhDecline * 100)} onChange={(value) => tune({ exhDecline: value / 100 })} />
                    <Field label="Exhaustion: progress at most, % of prior" value={Math.round(s.exhProgress * 100)} onChange={(value) => tune({ exhProgress: value / 100 })} />
                    <Field label="Exhaustion: lookback candles" value={s.exhLookback} min={3} onChange={(exhLookback) => tune({ exhLookback: Math.round(exhLookback) })} />
                    <Field label="CVD divergence: candles each side of a swing" hint="Also the delay before a mark appears" value={s.divPivot} min={1} onChange={(divPivot) => tune({ divPivot: Math.max(1, Math.round(divPivot)) })} />
                    <button type="button" onClick={() => setPrefs(DEFAULT_PREFS)} className="nav-link self-end justify-self-start pb-1 text-xs font-medium">
                        Reset to defaults
                    </button>
                </div>
            )}

            {(signal || bubble) && (
                <section className="mt-4 border-t border-white/10 pt-4" aria-live="polite" aria-label="Selected event">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="!text-base text-white">{signal ? signal.title : `Aggressive ${bubble!.side === "Buy" ? "buying" : "selling"} cluster`}</h3>
                        <button type="button" onClick={() => setSelected(null)} className="nav-link pb-1 text-xs font-medium">
                            Close
                        </button>
                    </div>
                    <p className="mt-1 text-[11px] text-white/45">
                        {pair} · {LABELS[interval] ?? interval} · {new Date(signal ? signal.t : bubble!.at).toLocaleString(undefined, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" })} · <span className="font-mono tabular-nums text-white/70">{fmtPrice(signal ? signal.price : bubble!.price)}</span>
                    </p>
                    {signal ? (
                        <>
                            <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">{signal.why}</p>
                            <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                                {signal.reasons.map((reason) => (
                                    <div key={reason.label} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 text-xs">
                                        <dt className="text-white/45">{reason.label}</dt>
                                        <dd className="text-right font-mono tabular-nums text-white">
                                            {reason.value}
                                            {reason.threshold && <span className="block font-sans text-[10px] text-white/35">needs {reason.threshold}</span>}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            <p className="mt-4 text-xs text-white/60">
                                <span className="mr-2 uppercase tracking-[0.1em] text-[10px] text-white/40">{signal.status}</span>
                                {signal.statusNote}
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="mt-3 max-w-prose text-sm leading-relaxed text-white/70">
                                Trades over a short stretch of this candle where the {bubble!.side === "Buy" ? "buyer" : "seller"} was the aggressor, grouped within one price step{snapshot?.binSize ? ` of ${snapshot.binSize} USDT` : ""}. This is an observed fact from the exchange, not a signal.
                            </p>
                            <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                                {[
                                    ["Traded value", usd(bubble!.notional), snapshot?.bubbleThreshold ? `shown from ${usd(snapshot.bubbleThreshold)}${s.bubbleMinUsd > 0 ? "" : " (automatic)"}` : ""],
                                    ["Quantity", `${bubble!.qty.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${symbol.replace(/USDT$/, "")}`, ""],
                                    ["Trades in the cluster", String(bubble!.trades), ""],
                                    ["Side", `${bubble!.side === "Buy" ? "Aggressive buying" : "Aggressive selling"}, as reported by Bybit`, ""],
                                ].map(([label, value, note]) => (
                                    <div key={label} className="flex items-baseline justify-between gap-4 border-b border-white/5 pb-2 text-xs">
                                        <dt className="text-white/45">{label}</dt>
                                        <dd className="text-right font-mono tabular-nums text-white">
                                            {value}
                                            {note && <span className="block font-sans text-[10px] text-white/35">{note}</span>}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </>
                    )}
                </section>
            )}
        </div>
    );
};

export default FlowChart;
