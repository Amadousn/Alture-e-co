"use client";

import { useEffect, useRef } from "react";

type Props = {
    className?: string;
    // Folds the ribbon flat, for leaving the page.
    leaving?: boolean;
    // Real prices, oldest first. When given, the ribbon's line follows them.
    series?: number[] | null;
    // Tells the page which point of the series is under the pointer.
    onProbe?: (index: number | null) => void;
    // Follows the pointer anywhere on the page, not only over the ribbon itself.
    wide?: boolean;
};

// A ribbon of fine lines that turns over on itself once, drawn on a canvas.
// It unrolls when it appears, turns where the pointer is, swells under it,
// and sends a ripple along its length when pressed. With reduced motion it
// is drawn once and left still.
const Ribbon = ({ className = "", leaving = false, series = null, onProbe, wide = false }: Props) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const live = useRef({ leaving, series, onProbe });
    live.current = { leaving, series, onProbe };

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        let frame = 0;
        let started = 0;
        let flat = 0;
        // Where the pointer is along the ribbon, whether it is over it, and how strongly it is felt.
        let pointer = 0.42;
        let turn = 0.42;
        let over = false;
        let presence = 0;
        // How far the line has moved from its resting wave toward the real prices.
        let fitted = 0;
        const pulses: { at: number; from: number }[] = [];
        let smoothedFrom: number[] | null | undefined;
        let smoothed: number[] | null = null;

        const draw = (time: number) => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            if (canvas.width !== Math.round(w * ratio) || canvas.height !== Math.round(h * ratio)) {
                canvas.width = Math.round(w * ratio);
                canvas.height = Math.round(h * ratio);
            }
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            ctx.clearRect(0, 0, w, h);

            if (!started) started = time || 1;
            const t = time / 1000;
            const drawn = still ? 1 : Math.min(1, (time - started) / 900);
            const reach = 1 - Math.pow(1 - drawn, 3);
            flat += ((live.current.leaving ? 1 : 0) - flat) * 0.14;
            turn += ((over ? pointer : 0.42 + Math.sin(t * 0.3) * 0.03) - turn) * 0.07;
            presence += ((over ? 1 : 0) - presence) * 0.1;
            // The prices are smoothed into a flowing line: the ribbon shows the day's shape, not every tick.
            const raw = live.current.series;
            if (raw !== smoothedFrom) {
                smoothedFrom = raw;
                smoothed = raw && raw.length > 1 ? raw.map((_, i) => { let sum = 0, n = 0; for (let k = -6; k <= 6; k++) { const v = raw[i + k]; if (v !== undefined) { const weight = 7 - Math.abs(k); sum += v * weight; n += weight; } } return sum / n; }) : null;
            }
            const data = smoothed;
            fitted += ((data && data.length > 1 ? 1 : 0) - fitted) * 0.04;
            while (pulses.length > 0 && time - pulses[0].at > 2600) pulses.shift();

            let lo = 0;
            let range = 1;
            if (data && data.length > 1) {
                lo = Math.min(...data);
                range = Math.max(...data) - lo || 1;
            }
            const lines = Math.max(80, Math.round(w / 6));

            for (let i = 0; i <= lines; i++) {
                const u = i / lines;
                if (u > reach) break;
                const d = u - turn;
                const side = d < 0 ? d / Math.max(turn, 0.05) : d / Math.max(1 - turn, 0.05);

                // The centre line: a resting wave that settles onto the real prices once they arrive.
                const wave = 0.64 - 0.3 * side * side + 0.015 * Math.sin(t * 0.5 + u * 5);
                let line = wave;
                if (data && data.length > 1) {
                    const at = u * (data.length - 1);
                    const a = data[Math.floor(at)];
                    const b = data[Math.min(data.length - 1, Math.floor(at) + 1)];
                    const value = a + (b - a) * (at - Math.floor(at));
                    line = wave + (0.74 - 0.46 * ((value - lo) / range) - wave) * fitted;
                }

                // What the pointer and any ripples add at this slat.
                const near = Math.exp(-((u - pointer) * (u - pointer)) / 0.0035) * presence;
                let ripple = 0;
                for (const pulse of pulses) {
                    const age = (time - pulse.at) / 1000;
                    const edge = age * 0.55;
                    const gap = Math.abs(u - pulse.from) - edge;
                    ripple += Math.exp(-(gap * gap) / 0.0012) * Math.max(0, 1 - age / 2.6);
                }
                const lift = near * 0.55 + ripple * 0.7;

                // Each line is one slat: edge-on at the turn, face-on at the ends.
                const angle = (Math.PI / 2) * Math.sign(d || 1) * Math.pow(Math.min(1, Math.abs(side)), 0.75);
                const width = h * (0.12 + 0.24 * u) * Math.min(1, (reach - u) * 7 + 0.15) * (1 - flat) * (1 + lift);
                const rise = width * Math.sin(angle);
                const run = width * Math.cos(angle) * 0.9;
                const x = u * w;
                const y = h * line - ripple * h * 0.03;
                const facing = Math.abs(Math.sin(angle));
                const glint = Math.exp(-(d * d) / 0.004);
                const alpha = Math.min(1, (d > 0 ? 0.14 + 0.8 * facing : 0.05 + 0.24 * facing) + glint * 0.7 + lift * 0.5) * (1 - flat * 0.6);
                const gradient = ctx.createLinearGradient(x - run, y + rise, x + run, y - rise);
                gradient.addColorStop(0, `rgba(227,161,247,${alpha * (0.18 + lift * 0.5)})`);
                gradient.addColorStop(0.5, `rgba(240,228,248,${alpha * 0.85})`);
                gradient.addColorStop(1, `rgba(255,255,255,${alpha})`);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 0.9 + 1.1 * u * facing + lift * 0.8;
                ctx.beginPath();
                ctx.moveTo(x - run, y + rise);
                ctx.lineTo(x + run, y - rise);
                ctx.stroke();
            }
            if (!still) frame = requestAnimationFrame(draw);
        };

        const place = (event: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
            const data = live.current.series;
            if (data && data.length > 1) live.current.onProbe?.(Math.round(pointer * (data.length - 1)));
        };
        const enter = (event: PointerEvent) => {
            over = true;
            place(event);
        };
        const leave = () => {
            over = false;
            live.current.onProbe?.(null);
        };
        const press = (event: PointerEvent) => {
            enter(event);
            pulses.push({ at: performance.now(), from: pointer });
            if (still) draw(performance.now());
        };
        const redraw = () => still && draw(performance.now());

        // On a page that is all brand, the whole page is the ribbon's stage.
        const stage: HTMLElement = wide ? document.documentElement : canvas;
        stage.addEventListener("pointermove", enter);
        stage.addEventListener("pointerdown", press);
        stage.addEventListener("pointerleave", leave);
        stage.addEventListener("pointercancel", leave);
        window.addEventListener("resize", redraw);
        frame = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(frame);
            stage.removeEventListener("pointermove", enter);
            stage.removeEventListener("pointerdown", press);
            stage.removeEventListener("pointerleave", leave);
            stage.removeEventListener("pointercancel", leave);
            window.removeEventListener("resize", redraw);
        };
    }, [wide]);

    return <canvas ref={ref} className={`block w-full cursor-crosshair ${className}`} style={{ touchAction: "pan-y" }} aria-hidden="true" />;
};

export default Ribbon;
