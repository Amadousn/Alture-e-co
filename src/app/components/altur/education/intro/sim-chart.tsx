"use client";

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import type { Candle } from "@/utils/education-chart-data";
import { corners, priceAt, Side } from "@/utils/education-sim";

// The chart of the simulated trade, drawn on a canvas so that it can move
// smoothly: the candles the learner has seen, then, once they have decided,
// the minutes that followed, replayed. It never draws a candle that the
// clock has not reached, however far it is scrolled.

export type ChartLevel = { key: string; price: number; label: string; tone: "entry" | "stop" | "target" | "liq" | "hint"; draggable?: boolean };
export type ChartMark = { at: number; price: number; label: string; tone: "plain" | "good" | "bad" };
export type ChartSwing = { i: number; kind: "high" | "low"; label?: string };
export type SimChartHandle = { draw: () => void; fit: () => void };

type Props = {
    seen: Candle[];
    minutes: Candle[];
    side: Side | null;
    // Minutes replayed since the decision; 0 before it. Read on every frame, so it is a ref and not state.
    clock: React.MutableRefObject<number>;
    digits: number;
    title: string;
    // Used instead of the title when the chart is too narrow for it.
    brief: string;
    levels: ChartLevel[];
    // Shades the profit and the loss side of an open plan.
    zone?: { entry: number; stop: number; target: number } | null;
    swings?: ChartSwing[];
    marks?: ChartMark[];
    onPlace?: (price: number) => void;
    onDrag?: (key: string, price: number) => void;
    className?: string;
};

const UP = "#20B8A8";
const DOWN = "#E955A8";
const TONE = { entry: "#ffffff", stop: DOWN, target: UP, liq: "#FACC15", hint: "rgba(255,255,255,0.55)" } as const;
const AXIS = 68;
const FOOT = 24;
const SLOT = 15;
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

// A round step for the price grid: 1, 2 or 5 times a power of ten.
function niceStep(range: number, lines: number) {
    const raw = range / lines;
    const power = Math.pow(10, Math.floor(Math.log10(raw)));
    const unit = raw / power;
    return (unit < 1.5 ? 1 : unit < 3.5 ? 2 : unit < 7.5 ? 5 : 10) * power;
}

// The 15-minute candles that the replay has reached, the last of them still forming.
function replayed(minutes: Candle[], side: Side | null, at: number): Candle[] {
    const out: Candle[] = [];
    const whole = Math.floor(at);
    for (let k = 0; k * SLOT < at && k * SLOT < minutes.length; k++) {
        const done = minutes.slice(k * SLOT, Math.min(k * SLOT + SLOT, whole));
        const candle = { t: minutes[k * SLOT].t, o: minutes[k * SLOT].o, h: -Infinity, l: Infinity, c: minutes[k * SLOT].o };
        for (const minute of done) {
            candle.h = Math.max(candle.h, minute.h);
            candle.l = Math.min(candle.l, minute.l);
            candle.c = minute.c;
        }
        // The minute being drawn now: only the part of its path already walked.
        if (whole >= k * SLOT && whole < k * SLOT + SLOT && whole < minutes.length && at > whole) {
            const visited = corners(minutes[whole], side).slice(0, Math.floor((at - whole) * 3) + 1);
            const now = priceAt(minutes, side, at);
            candle.h = Math.max(candle.h, now, ...visited);
            candle.l = Math.min(candle.l, now, ...visited);
            candle.c = now;
        }
        if (candle.h === -Infinity) candle.h = candle.l = candle.o;
        out.push(candle);
    }
    return out;
}

const SimChart = forwardRef<SimChartHandle, Props>(function SimChart(props, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const latest = useRef(props);
    latest.current = props;
    // The view: pixels per candle, the candle index at the right edge, and a price range once the learner has set one by hand.
    const view = useRef<{ bar: number; right: number; range: [number, number] | null; follow: boolean; set: boolean }>({ bar: 10, right: 0, range: null, follow: true, set: false });
    const hover = useRef<{ x: number; y: number } | null>(null);
    const drag = useRef<{ mode: "pan" | "scale" | "stretch" | "level"; key?: string; x: number; y: number; right: number; bar: number; range: [number, number]; moved: boolean } | null>(null);
    const pointers = useRef(new Map<number, { x: number; y: number }>());
    const pinch = useRef<{ distance: number; bar: number } | null>(null);
    const shown = useRef<{ min: number; max: number; width: number; height: number }>({ min: 0, max: 1, width: 0, height: 0 });
    const font = useRef("sans-serif");

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const { seen, minutes, side, clock, digits, title, brief, levels, zone, swings, marks } = latest.current;
        const ratio = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if (width < 40 || height < 40) return;
        if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
        }
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, width, height);
        const plotW = width - AXIS;
        const plotH = height - FOOT;
        const at = clamp(clock.current, 0, minutes.length);
        const list = at > 0 ? [...seen, ...replayed(minutes, side, at)] : seen;
        const state = view.current;
        if (!state.set) {
            state.bar = plotW / (seen.length + 9);
            state.right = seen.length + 8.5;
            state.set = true;
        }
        // While the replay runs, the newest candle is kept away from the right edge.
        if (state.follow && at > 0) state.right = Math.max(state.right, seen.length + at / SLOT + 4.5);
        const x = (i: number) => plotW - (state.right - i) * state.bar;

        // The price range: what is in view, with room, unless the learner has set the scale themselves.
        let [min, max] = state.range ?? [Infinity, -Infinity];
        if (!state.range) {
            list.forEach((candle, i) => {
                if (x(i) < -state.bar || x(i) > plotW + state.bar) return;
                min = Math.min(min, candle.l);
                max = Math.max(max, candle.h);
            });
            if (min === Infinity) [min, max] = [Math.min(...list.map((candle) => candle.l)), Math.max(...list.map((candle) => candle.h))];
            const reach = (max - min) * 0.3;
            // The learner's own levels stay in view; a far-off liquidation price does not flatten the chart.
            for (const level of levels) if (level.tone !== "hint" && (level.tone !== "liq" || (level.price > min - reach && level.price < max + reach))) [min, max] = [Math.min(min, level.price), Math.max(max, level.price)];
            const room = (max - min || max * 0.001) * 0.1;
            [min, max] = [min - room, max + room];
        }
        shown.current = { min, max, width, height };
        const y = (price: number) => plotH - ((price - min) / (max - min)) * plotH;
        const text = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
        ctx.font = `11px ${font.current}`;
        ctx.textBaseline = "middle";

        // Grid and price scale.
        const step = niceStep(max - min, Math.max(3, Math.floor(plotH / 56)));
        ctx.lineWidth = 1;
        for (let price = Math.ceil(min / step) * step; price < max; price += step) {
            const py = Math.round(y(price)) + 0.5;
            ctx.strokeStyle = "rgba(255,255,255,0.06)";
            ctx.beginPath();
            ctx.moveTo(0, py);
            ctx.lineTo(plotW, py);
            ctx.stroke();
            ctx.fillStyle = "rgba(255,255,255,0.45)";
            ctx.textAlign = "left";
            ctx.fillText(text(price), plotW + 8, py);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.12)";
        ctx.beginPath();
        ctx.moveTo(plotW + 0.5, 0);
        ctx.lineTo(plotW + 0.5, plotH);
        ctx.moveTo(0, plotH + 0.5);
        ctx.lineTo(width, plotH + 0.5);
        ctx.stroke();

        // Time scale, in UTC.
        const every = Math.max(1, Math.ceil(84 / state.bar / 4) * 4);
        const first = Math.floor(state.right - plotW / state.bar);
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(255,255,255,0.4)";
        for (let i = Math.ceil(first / every) * every; i <= state.right; i += every) {
            const px = x(i);
            if (px < 24 || px > plotW - 20) continue;
            const date = new Date(seen[0].t + i * SLOT * 60000);
            const clockText = `${String(date.getUTCHours()).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
            ctx.fillText(date.getUTCHours() === 0 && date.getUTCMinutes() === 0 ? `${date.getUTCDate()} ${date.toLocaleString("en-US", { month: "short", timeZone: "UTC" })}` : clockText, px, plotH + FOOT / 2);
        }

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, plotW, plotH);
        ctx.clip();

        // Where the decision was taken: everything to the right of it came afterwards.
        if (at > 0) {
            const px = Math.round(x(seen.length - 0.5)) + 0.5;
            ctx.setLineDash([3, 4]);
            ctx.strokeStyle = "rgba(255,255,255,0.22)";
            ctx.beginPath();
            ctx.moveTo(px, 0);
            ctx.lineTo(px, plotH);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // The plan: profit side and loss side of the entry.
        if (zone) {
            const from = clamp(x(seen.length - 0.5), 0, plotW);
            ctx.fillStyle = "rgba(32,184,168,0.09)";
            ctx.fillRect(from, Math.min(y(zone.entry), y(zone.target)), plotW - from, Math.abs(y(zone.entry) - y(zone.target)));
            ctx.fillStyle = "rgba(233,85,168,0.09)";
            ctx.fillRect(from, Math.min(y(zone.entry), y(zone.stop)), plotW - from, Math.abs(y(zone.entry) - y(zone.stop)));
        }

        // Candles.
        const body = Math.max(1, Math.min(state.bar * 0.68, state.bar - 1.5));
        list.forEach((candle, i) => {
            const px = x(i);
            if (px < -state.bar || px > plotW + state.bar) return;
            const colour = candle.c >= candle.o ? UP : DOWN;
            ctx.fillStyle = colour;
            ctx.fillRect(Math.round(px) - 0.5, y(candle.h), 1, Math.max(1, y(candle.l) - y(candle.h)));
            const top = y(Math.max(candle.o, candle.c));
            ctx.fillRect(px - body / 2, top, body, Math.max(1, y(Math.min(candle.o, candle.c)) - top));
        });

        // Swing points a hint has pointed out.
        for (const swing of swings ?? []) {
            const candle = seen[swing.i];
            if (!candle) continue;
            const px = x(swing.i);
            const py = swing.kind === "high" ? y(candle.h) - 9 : y(candle.l) + 9;
            ctx.strokeStyle = "rgba(255,255,255,0.75)";
            ctx.lineWidth = 1.25;
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.stroke();
            if (swing.label) {
                ctx.fillStyle = "rgba(255,255,255,0.75)";
                ctx.textAlign = "center";
                ctx.fillText(swing.label, clamp(px, 44, plotW - 44), swing.kind === "high" ? py - 13 : py + 14);
            }
        }
        ctx.lineWidth = 1;

        // Levels: a dashed line with its name at the left.
        for (const level of levels) {
            const py = Math.round(y(level.price)) + 0.5;
            if (py < -10 || py > plotH + 10) continue;
            ctx.strokeStyle = TONE[level.tone];
            ctx.globalAlpha = level.tone === "hint" ? 0.7 : 0.9;
            ctx.setLineDash(level.tone === "entry" ? [] : [5, 4]);
            ctx.beginPath();
            ctx.moveTo(0, py);
            ctx.lineTo(plotW, py);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
            ctx.textAlign = "left";
            const wide = ctx.measureText(level.label).width + 12;
            // A hint's name sits at the right, clear of the learner's own levels at the left.
            const left = level.tone === "hint" ? plotW - wide - 10 : 8;
            ctx.fillStyle = "#000000";
            ctx.fillRect(left, py - 9, wide, 18);
            ctx.strokeStyle = TONE[level.tone];
            ctx.strokeRect(left + 0.5, py - 8.5, wide, 17);
            ctx.fillStyle = TONE[level.tone];
            ctx.fillText(level.label, left + 6, py + 0.5);
        }

        // Where the order was filled and where the trade ended.
        for (const mark of marks ?? []) {
            if (mark.at > at + 1e-6) continue;
            const px = x(seen.length - 0.5 + mark.at / SLOT);
            const py = y(mark.price);
            const colour = mark.tone === "good" ? UP : mark.tone === "bad" ? DOWN : "#ffffff";
            ctx.fillStyle = "#000000";
            ctx.strokeStyle = colour;
            ctx.lineWidth = 1.75;
            ctx.beginPath();
            ctx.arc(px, py, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.lineWidth = 1;
            ctx.fillStyle = colour;
            ctx.textAlign = px > plotW - 110 ? "right" : "left";
            ctx.fillText(mark.label, px > plotW - 110 ? px - 11 : px + 11, py < 48 ? py + 14 : py - 12);
        }
        ctx.restore();

        // Tags on the price scale: each level, then the current price above them.
        const tag = (price: number, colour: string, ink: string) => {
            const py = clamp(y(price), 9, plotH - 9);
            ctx.fillStyle = colour;
            ctx.fillRect(plotW + 1, py - 9, AXIS - 1, 18);
            ctx.fillStyle = ink;
            ctx.textAlign = "left";
            ctx.fillText(text(price), plotW + 8, py + 0.5);
        };
        for (const level of levels) if (level.tone !== "hint" && y(level.price) > -10 && y(level.price) < plotH + 10) tag(level.price, TONE[level.tone], "#000000");
        const last = list[list.length - 1];
        const lastY = Math.round(y(last.c)) + 0.5;
        ctx.setLineDash([1, 3]);
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.beginPath();
        ctx.moveTo(0, lastY);
        ctx.lineTo(plotW, lastY);
        ctx.stroke();
        ctx.setLineDash([]);
        tag(last.c, last.c >= last.o ? UP : DOWN, "#000000");

        // Title, and the candle under the pointer.
        ctx.textAlign = "left";
        ctx.fillStyle = "rgba(255,255,255,0.55)";
        ctx.fillText(ctx.measureText(title).width < plotW - 130 ? title : brief, 10, 14);
        const point = hover.current;
        if (point && !drag.current && point.x < plotW && point.y < plotH) {
            const index = clamp(Math.round(state.right - (plotW - point.x) / state.bar), 0, list.length - 1);
            const candle = list[index];
            ctx.strokeStyle = "rgba(255,255,255,0.22)";
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(0, Math.round(point.y) + 0.5);
            ctx.lineTo(plotW, Math.round(point.y) + 0.5);
            ctx.moveTo(Math.round(point.x) + 0.5, 0);
            ctx.lineTo(Math.round(point.x) + 0.5, plotH);
            ctx.stroke();
            ctx.setLineDash([]);
            tag(min + ((plotH - point.y) / plotH) * (max - min), "#2a2a30", "#ffffff");
            ctx.fillStyle = "rgba(255,255,255,0.8)";
            ctx.textAlign = "left";
            ctx.fillText(`O ${text(candle.o)}   H ${text(candle.h)}   L ${text(candle.l)}   C ${text(candle.c)}`, 10, 32);
        }
    }, []);

    const fit = useCallback(() => {
        view.current = { ...view.current, range: null, follow: true, set: false };
        draw();
    }, [draw]);
    useImperativeHandle(ref, () => ({ draw, fit }), [draw, fit]);

    // A new chart starts from its own fitted view.
    const first = props.seen[0].t;
    useEffect(() => {
        view.current = { bar: 10, right: 0, range: null, follow: true, set: false };
        draw();
    }, [first, draw]);
    useEffect(() => {
        draw();
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        font.current = getComputedStyle(document.body).fontFamily || "sans-serif";
        const observer = new ResizeObserver(() => {
            // Keep the same candles in view at the new width.
            const plotW = canvas.clientWidth - AXIS;
            const before = shown.current.width - AXIS;
            if (view.current.set && before > 40 && plotW > 40) view.current.bar *= plotW / before;
            draw();
        });
        observer.observe(canvas);
        document.fonts?.ready.then(draw).catch(() => undefined);

        const zoom = (factor: number, anchor: number) => {
            const state = view.current;
            const plotW = canvas.clientWidth - AXIS;
            const index = state.right - (plotW - anchor) / state.bar;
            state.bar = clamp(state.bar * factor, 2.5, 48);
            state.right = index + (plotW - anchor) / state.bar;
            draw();
        };
        const scale = (factor: number) => {
            const { min, max } = shown.current;
            const middle = (min + max) / 2;
            const half = ((max - min) / 2) * factor;
            view.current.range = [middle - half, middle + half];
            draw();
        };
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const box = canvas.getBoundingClientRect();
            const px = event.clientX - box.left;
            if (px > box.width - AXIS) return scale(Math.exp(event.deltaY * 0.0022));
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
                view.current.right += event.deltaX / view.current.bar;
                view.current.follow = false;
                return draw();
            }
            zoom(Math.exp(-event.deltaY * 0.0022), px);
        };
        canvas.addEventListener("wheel", onWheel, { passive: false });
        const onZoom = (event: Event) => {
            const detail = (event as CustomEvent<number>).detail;
            zoom(detail, (canvas.clientWidth - AXIS) * 0.75);
        };
        canvas.addEventListener("simchart:zoom", onZoom);
        return () => {
            observer.disconnect();
            canvas.removeEventListener("wheel", onWheel);
            canvas.removeEventListener("simchart:zoom", onZoom);
        };
    }, [draw]);

    const priceOf = (py: number) => {
        const { min, max, height } = shown.current;
        const value = min + ((height - FOOT - py) / (height - FOOT)) * (max - min);
        return Number(value.toFixed(latest.current.digits));
    };
    const near = (py: number) => {
        const { min, max, height } = shown.current;
        const y = (price: number) => height - FOOT - ((price - min) / (max - min)) * (height - FOOT);
        return latest.current.levels.find((level) => level.draggable && Math.abs(y(level.price) - py) <= 8);
    };
    const local = (event: React.PointerEvent) => {
        const box = event.currentTarget.getBoundingClientRect();
        return { x: event.clientX - box.left, y: event.clientY - box.top, plotW: box.width - AXIS, plotH: box.height - FOOT };
    };

    const onPointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const at = local(event);
        pointers.current.set(event.pointerId, { x: at.x, y: at.y });
        if (pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            pinch.current = { distance: Math.hypot(a.x - b.x, a.y - b.y), bar: view.current.bar };
            drag.current = null;
            return;
        }
        event.currentTarget.setPointerCapture(event.pointerId);
        const { min, max } = shown.current;
        const level = at.x < at.plotW && latest.current.onDrag ? near(at.y) : undefined;
        drag.current = { mode: at.x >= at.plotW ? "scale" : at.y >= at.plotH ? "stretch" : level ? "level" : "pan", key: level?.key, x: at.x, y: at.y, right: view.current.right, bar: view.current.bar, range: [min, max], moved: false };
    };
    const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const at = local(event);
        if (pointers.current.has(event.pointerId)) pointers.current.set(event.pointerId, { x: at.x, y: at.y });
        if (pinch.current && pointers.current.size === 2) {
            const [a, b] = [...pointers.current.values()];
            const factor = Math.hypot(a.x - b.x, a.y - b.y) / (pinch.current.distance || 1);
            const state = view.current;
            const anchor = (a.x + b.x) / 2;
            const index = state.right - (at.plotW - anchor) / state.bar;
            state.bar = clamp(pinch.current.bar * factor, 2.5, 48);
            state.right = index + (at.plotW - anchor) / state.bar;
            return draw();
        }
        hover.current = { x: at.x, y: at.y };
        const held = drag.current;
        const canvas = event.currentTarget;
        if (!held) {
            canvas.style.cursor = at.x >= at.plotW ? "ns-resize" : at.y >= at.plotH ? "ew-resize" : latest.current.onDrag && near(at.y) ? "row-resize" : latest.current.onPlace ? "crosshair" : "grab";
            return draw();
        }
        const [dx, dy] = [at.x - held.x, at.y - held.y];
        if (Math.abs(dx) + Math.abs(dy) > 4) held.moved = true;
        if (held.mode === "level" && held.key) latest.current.onDrag?.(held.key, priceOf(clamp(at.y, 0, at.plotH)));
        else if (held.mode === "scale") {
            const factor = Math.exp(dy * 0.006);
            const middle = (held.range[0] + held.range[1]) / 2;
            const half = ((held.range[1] - held.range[0]) / 2) * factor;
            view.current.range = [middle - half, middle + half];
        } else if (held.mode === "stretch") {
            // Dragging the time scale squeezes or spreads the candles, about the right edge of the chart.
            view.current.bar = clamp(held.bar * Math.exp(dx * 0.006), 2.5, 48);
            view.current.follow = false;
        } else if (held.moved) {
            view.current.right = held.right - dx / view.current.bar;
            view.current.follow = false;
            // Once the price scale has been set by hand, the chart can be moved up and down as well.
            if (view.current.range) {
                const shift = (dy / at.plotH) * (held.range[1] - held.range[0]);
                view.current.range = [held.range[0] + shift, held.range[1] + shift];
            }
            canvas.style.cursor = "grabbing";
        }
        draw();
    };
    const onPointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const at = local(event);
        pointers.current.delete(event.pointerId);
        if (pointers.current.size < 2) pinch.current = null;
        const held = drag.current;
        drag.current = null;
        if (held && held.mode === "pan" && !held.moved && at.x < at.plotW && at.y < at.plotH) latest.current.onPlace?.(priceOf(at.y));
        draw();
    };

    const button = "flex h-7 min-w-7 items-center justify-center rounded-sm border border-white/20 bg-black/70 px-2 text-xs text-white/80 transition-colors hover:border-white hover:text-white";
    return (
        <div className={`relative select-none ${props.className ?? ""}`}>
            <canvas
                ref={canvasRef}
                role="img"
                aria-label={`${props.title}. A candlestick chart. Drag to move it, scroll to zoom, drag the price scale on the right or the time scale below to stretch it.`}
                className="absolute inset-0 block h-full w-full touch-pan-y"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onPointerLeave={() => {
                    hover.current = null;
                    draw();
                }}
                onDoubleClick={fit}
            />
            <div className="absolute right-[76px] top-2 flex gap-1.5">
                <button type="button" aria-label="Zoom out" className={button} onClick={() => canvasRef.current?.dispatchEvent(new CustomEvent("simchart:zoom", { detail: 1 / 1.3 }))}>
                    −
                </button>
                <button type="button" aria-label="Zoom in" className={button} onClick={() => canvasRef.current?.dispatchEvent(new CustomEvent("simchart:zoom", { detail: 1.3 }))}>
                    +
                </button>
                <button type="button" className={button} onClick={fit}>
                    Fit
                </button>
            </div>
        </div>
    );
});

export default SimChart;
