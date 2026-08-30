"use client";

import { useEffect, useState } from "react";

type PricePoint = { t: number; price: number };

function mulberry32(seed: number) {
    let s = seed;
    return function () {
        s |= 0;
        s = (s + 0x6d2b79f5) | 0;
        let t = Math.imul(s ^ (s >>> 15), 1 | s);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function generateFallback(): PricePoint[] {
    const rand = mulberry32(7);
    let price = 78000;
    const points: PricePoint[] = [];
    const now = Date.now();
    for (let i = 0; i < 80; i++) {
        price += (rand() - 0.5) * 260;
        price = Math.max(1000, price);
        points.push({ t: now - (80 - i) * 60000, price });
    }
    return points;
}

const FALLBACK_HISTORY = generateFallback();
const REFRESH_MS = 60 * 1000;

const VIEW_WIDTH = 1400;
const VIEW_HEIGHT = 700;
const TOP_PADDING = VIEW_HEIGHT * 0.26;
const BOTTOM_PADDING = VIEW_HEIGHT * 0.12;
const GRID_LINES = 5;

// The dot only activates when the cursor is genuinely close to the line itself
// (in viewBox units), rather than reacting anywhere across the whole hero.
const PROXIMITY_THRESHOLD = VIEW_HEIGHT * 0.12;

type MousePos = { xFraction: number; yFraction: number } | null;
type TextZone = { top: number; bottom: number } | null;

// Used only until the real headline position has been measured (first paint).
const DEFAULT_TEXT_TOP = 0.34;
const DEFAULT_TEXT_BOTTOM = 0.58;
const TEXT_MARGIN = 0.05;

type Props = {
    mousePos: MousePos;
    textZone: TextZone;
};

const HeroChartBackground = ({ mousePos, textZone }: Props) => {
    const [history, setHistory] = useState<PricePoint[]>(FALLBACK_HISTORY);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            try {
                const res = await fetch("/api/btc-history", { cache: "no-store" });
                if (!res.ok) return;
                const data = await res.json();
                if (cancelled || !Array.isArray(data.points) || data.points.length < 2) return;
                setHistory(data.points);
            } catch {
                // keep the last known history if the fetch fails
            }
        };

        load();
        const id = setInterval(load, REFRESH_MS);
        return () => {
            cancelled = true;
            clearInterval(id);
        };
    }, []);

    const prices = history.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const range = maxPrice - minPrice || 1;

    const scaleX = (i: number) => (i / (history.length - 1)) * VIEW_WIDTH;
    const scaleY = (price: number) =>
        VIEW_HEIGHT - BOTTOM_PADDING - ((price - minPrice) / range) * (VIEW_HEIGHT - TOP_PADDING - BOTTOM_PADDING);

    const linePath = history
        .map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(i).toFixed(1)},${scaleY(p.price).toFixed(1)}`)
        .join(" ");
    const areaPath = `${linePath} L${VIEW_WIDTH},${VIEW_HEIGHT} L0,${VIEW_HEIGHT} Z`;

    const restingIndex = history.length - 1;

    let activeIndex = restingIndex;
    if (mousePos != null) {
        const candidateIndex = Math.min(restingIndex, Math.max(0, Math.round(mousePos.xFraction * restingIndex)));
        const candidateLineY = scaleY(history[candidateIndex].price);
        const mouseY = mousePos.yFraction * VIEW_HEIGHT;
        if (Math.abs(mouseY - candidateLineY) <= PROXIMITY_THRESHOLD) {
            activeIndex = candidateIndex;
        }
    }

    const activePoint = history[activeIndex];
    const dotX = scaleX(activeIndex);
    const dotY = scaleY(activePoint.price);

    // Text-danger band is measured from the headline's real DOM position
    // (passed down as textZone), not guessed as a fixed percentage, since
    // the text's actual proportion of the hero varies by breakpoint and
    // aspect ratio. The chart mask stays clear of it, on top of staying
    // clear of the header above and the ticker below, at any screen size.
    const textTopFrac = Math.max(0, (textZone?.top ?? DEFAULT_TEXT_TOP) - TEXT_MARGIN);
    const textBottomFrac = Math.min(1, (textZone?.bottom ?? DEFAULT_TEXT_BOTTOM) + TEXT_MARGIN);

    const transitionStyle = {
        transition:
            "cx 450ms cubic-bezier(0.22, 1, 0.36, 1), cy 450ms cubic-bezier(0.22, 1, 0.36, 1), x 450ms cubic-bezier(0.22, 1, 0.36, 1), y 450ms cubic-bezier(0.22, 1, 0.36, 1)",
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`} preserveAspectRatio="none" className="w-full h-full">
                <defs>
                    <linearGradient id="heroLineFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                    </linearGradient>
                    {/* Keeps the chart faint specifically behind the headline band, using
                        the same measured text zone as the tag's danger band above */}
                    <linearGradient id="heroTextSafeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset={`${Math.max(0, (textTopFrac - 0.1) * 100).toFixed(1)}%`} stopColor="#FFFFFF" />
                        <stop offset={`${(textTopFrac * 100).toFixed(1)}%`} stopColor="#333333" />
                        <stop offset={`${(textBottomFrac * 100).toFixed(1)}%`} stopColor="#333333" />
                        <stop offset={`${Math.min(100, (textBottomFrac + 0.1) * 100).toFixed(1)}%`} stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                    <mask id="heroTextSafeMask">
                        <rect x={0} y={0} width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#heroTextSafeGradient)" />
                    </mask>
                </defs>

                <g mask="url(#heroTextSafeMask)">
                    {/* Grid lines */}
                    {Array.from({ length: GRID_LINES }).map((_, i) => {
                        const y = (VIEW_HEIGHT / (GRID_LINES + 1)) * (i + 1);
                        return (
                            <line key={i} x1={0} x2={VIEW_WIDTH} y1={y} y2={y} stroke="#FFFFFF" strokeOpacity={0.04} strokeWidth={1} vectorEffect="non-scaling-stroke" />
                        );
                    })}

                    {/* Area fill */}
                    <path d={areaPath} fill="url(#heroLineFill)" />

                    {/* Price line */}
                    <path d={linePath} fill="none" stroke="#D4AF37" strokeOpacity={0.28} strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                </g>

                {/* Crosshair */}
                <line x1={dotX} x2={dotX} y1={0} y2={VIEW_HEIGHT} stroke="#D4AF37" strokeOpacity={0.12} strokeWidth={1} strokeDasharray="6 6" vectorEffect="non-scaling-stroke" style={transitionStyle} />

                {/* Glow dot */}
                <circle cx={dotX} cy={dotY} r={7} fill="#FFD400" fillOpacity={0.3} style={transitionStyle} className="hero-chart-dot-glow" />
                <circle cx={dotX} cy={dotY} r={3.5} fill="#FFD400" style={transitionStyle} />
            </svg>

            <style jsx>{`
                @keyframes heroChartDotPulse {
                    0%, 100% { r: 5.5; opacity: 0.35; }
                    50% { r: 9; opacity: 0.1; }
                }
                .hero-chart-dot-glow {
                    animation: heroChartDotPulse 2.4s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default HeroChartBackground;
