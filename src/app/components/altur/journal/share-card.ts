// Draws the shareable month card onto a canvas. One renderer serves both
// exports: the still image is the last frame (progress 1) and the video is
// the same drawing stepped from 0 to 1.

import qrcode from "qrcode-generator";
import type { JournalStats } from "@/utils/journal-stats";

export const SHARE_FORMATS = {
    story: { label: "Story", hint: "9:16", width: 1080, height: 1920 },
    post: { label: "Post", hint: "4:5", width: 1080, height: 1350 },
    square: { label: "Square", hint: "1:1", width: 1080, height: 1080 },
} as const;

export type ShareFormat = keyof typeof SHARE_FORMATS;

export type SharePeriod = "day" | "week" | "month";

export type ShareCardData = {
    period: SharePeriod;
    // Shown top right: the month, the week's dates, or the day.
    headerLabel: string;
    // Figures for the chosen period only.
    stats: JournalStats;
    // Running P&L through the period, one point per day (month) or per trade.
    curve: number[];
    best: { label: string; value: number };
    // Month view: which month to lay the calendar out for. 0-indexed month.
    calendar?: { year: number; month: number };
    // Week view: the seven slots of that calendar row; day is null outside the month.
    week?: { label: string; day: number | null; value?: number }[];
    // Day view: that day's trades in the order they closed.
    trades?: { instrument: string; direction: "Long" | "Short"; profitLoss: number; time: string; entryPrice: number; exitPrice: number }[];
    showAmount: boolean;
    theme: ShareTheme;
    // Public demo: the card says so, so sample numbers are never passed off as real.
    sample: boolean;
    fonts: { sans: string; logo: string };
};

const SITE_URL = "https://www.altureandco.com";
const SITE_LABEL = "altureandco.com";

export type ShareTheme = "dark" | "light";

// Each theme is tuned on its own: the light one uses deeper green, pink and
// purple so they hold their contrast on a pale ground. Losses are pink, not
// red, throughout the journal.
const PALETTES = {
    dark: {
        backgroundTop: "#0E0D12",
        background: "#050506",
        glow: "255, 255, 255",
        glowStrength: 0.12,
        text: "#ffffff",
        muted: "#8a8a94",
        faint: "#5c5c66",
        rule: "#26262c",
        cell: "#131318",
        accent: "#FFFFFF",
        green: "#20B8A8",
        greenRgb: "32, 184, 168",
        red: "#E955A8",
        redRgb: "233, 85, 168",
        curveRgb: "255, 255, 255",
        qrGround: "#ffffff",
        qrInk: "#050506",
    },
    light: {
        backgroundTop: "#FFFFFF",
        background: "#EFEFF2",
        glow: "120, 120, 135",
        glowStrength: 0.18,
        text: "#0B0A0D",
        muted: "#6B6B74",
        faint: "#9A9AA3",
        rule: "#D8D8DE",
        cell: "#E4E4E9",
        accent: "#0B0A0D",
        green: "#0F8A7E",
        greenRgb: "15, 138, 126",
        red: "#D63A8E",
        redRgb: "214, 58, 142",
        curveRgb: "11, 10, 13",
        qrGround: "#ffffff",
        qrInk: "#0B0A0D",
    },
} as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);
// Progress of one stage that runs between `from` and `to` on the 0..1 timeline.
const stage = (progress: number, from: number, to: number) => ease((progress - from) / (to - from));

let qrCache: boolean[][] | null = null;
function qrModules(): boolean[][] {
    if (qrCache) return qrCache;
    const qr = qrcode(0, "M");
    qr.addData(SITE_URL);
    qr.make();
    const count = qr.getModuleCount();
    qrCache = Array.from({ length: count }, (_, row) => Array.from({ length: count }, (_, col) => qr.isDark(row, col)));
    return qrCache;
}

function setSpacing(ctx: CanvasRenderingContext2D, value: string) {
    // Not in every browser's canvas yet; the card still reads fine without it.
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = value;
}

function money(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Short form for calendar cells: +1.5K, -522.
function compact(value: number): string {
    const sign = value >= 0 ? "+" : "-";
    const abs = Math.abs(value);
    return abs >= 1000 ? `${sign}${(abs / 1000).toFixed(1)}K` : `${sign}${Math.round(abs)}`;
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

export function drawShareCard(ctx: CanvasRenderingContext2D, width: number, height: number, data: ShareCardData, progress: number) {
    const { stats, fonts } = data;
    const s = width / 1080;
    const pad = 72 * s;
    const inner = width - pad * 2;
    const ratio = height / width;
    const layout = ratio > 1.6 ? "story" : ratio > 1.15 ? "post" : "square";
    const font = (weight: number, size: number, family = fonts.sans) => `${weight} ${size * s}px ${family}`;
    const positive = stats.totalPnl >= 0;
    const palette = PALETTES[data.theme];
    const resultColor = positive ? palette.green : palette.red;
    const resultRgb = positive ? palette.greenRgb : palette.redRgb;

    ctx.save();
    ctx.globalAlpha = 1;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    setSpacing(ctx, "0px");

    // Background: a vertical wash, the brand glow from the top corner, a hint
    // of the result colour from the opposite one, and a hairline frame.
    const wash = ctx.createLinearGradient(0, 0, 0, height);
    wash.addColorStop(0, palette.backgroundTop);
    wash.addColorStop(1, palette.background);
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * 0.15, 0, 0, width * 0.15, 0, height * 0.55);
    glow.addColorStop(0, `rgba(${palette.glow}, ${palette.glowStrength})`);
    glow.addColorStop(1, `rgba(${palette.glow}, 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    const tint = ctx.createRadialGradient(width, height, 0, width, height, width * 0.95);
    tint.addColorStop(0, `rgba(${resultRgb}, 0.10)`);
    tint.addColorStop(1, `rgba(${resultRgb}, 0)`);
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = palette.rule;
    ctx.lineWidth = 1.5 * s;
    ctx.strokeRect(26 * s, 26 * s, width - 52 * s, height - 52 * s);

    // Header
    ctx.globalAlpha = stage(progress, 0, 0.1);
    let x = pad;
    const headerBaseline = pad + 44 * s;
    ctx.font = font(200, 50, fonts.logo);
    for (const [text, color] of [["Alture ", palette.text], ["& ", palette.accent], ["Co.", palette.text]] as const) {
        ctx.fillStyle = color;
        ctx.fillText(text, x, headerBaseline);
        x += ctx.measureText(text).width;
    }
    ctx.textAlign = "right";
    ctx.font = font(500, 22);
    setSpacing(ctx, `${4 * s}px`);
    ctx.fillStyle = palette.text;
    ctx.fillText(data.headerLabel.toUpperCase(), width - pad, headerBaseline - 8 * s);
    ctx.font = font(500, 17);
    setSpacing(ctx, `${3 * s}px`);
    ctx.fillStyle = data.sample ? palette.accent : palette.muted;
    ctx.fillText(data.sample ? "DEMO DATA" : "TRADING JOURNAL", width - pad, headerBaseline + 20 * s);
    ctx.textAlign = "left";
    setSpacing(ctx, "0px");

    // Headline figure
    let y = headerBaseline + (layout === "story" ? 150 : layout === "post" ? 104 : 78) * s;
    ctx.globalAlpha = stage(progress, 0.04, 0.16);
    ctx.font = font(500, 22);
    setSpacing(ctx, `${4 * s}px`);
    ctx.fillStyle = palette.muted;
    ctx.fillText(data.showAmount ? "NET P&L" : "WIN RATE", pad, y);
    setSpacing(ctx, "0px");

    const heroProgress = stage(progress, 0.08, 0.45);
    const heroText = data.showAmount ? money(stats.totalPnl * heroProgress) : `${Math.round(stats.winRate * heroProgress)}%`;
    const heroFinal = data.showAmount ? money(stats.totalPnl) : `${Math.round(stats.winRate)}%`;
    let heroSize = layout === "story" ? 118 : layout === "post" ? 108 : 96;
    ctx.font = font(600, heroSize);
    setSpacing(ctx, `${-0.035 * heroSize * s}px`);
    // Sized from the final value so the number does not jump while it counts.
    const heroWidth = ctx.measureText(heroFinal).width;
    if (heroWidth > inner) heroSize = Math.floor(heroSize * (inner / heroWidth));
    y += heroSize * 0.9 * s + 14 * s;
    ctx.font = font(600, heroSize);
    setSpacing(ctx, `${-0.035 * heroSize * s}px`);
    ctx.globalAlpha = stage(progress, 0.06, 0.18);
    // The headline stays in the text colour; the calendar and the curve
    // carry the green and red.
    ctx.fillStyle = palette.text;
    ctx.fillText(heroText, pad - 0.02 * heroSize * s, y);
    setSpacing(ctx, "0px");

    y += 50 * s;
    ctx.globalAlpha = stage(progress, 0.14, 0.28);
    ctx.font = font(400, 28);
    let lineX = pad;
    const summary: [string, string][] = [
        [`${stats.totalTrades}`, stats.totalTrades === 1 ? " trade" : " trades"],
        [`${stats.wins}`, stats.wins === 1 ? " win" : " wins"],
        [`${stats.losses}`, stats.losses === 1 ? " loss" : " losses"],
    ];
    summary.forEach(([figure, word], i) => {
        if (i > 0) {
            ctx.fillStyle = palette.faint;
            ctx.fillText("   /   ", lineX, y);
            lineX += ctx.measureText("   /   ").width;
        }
        ctx.font = font(600, 28);
        ctx.fillStyle = palette.text;
        ctx.fillText(figure, lineX, y);
        lineX += ctx.measureText(figure).width;
        ctx.font = font(400, 28);
        ctx.fillStyle = palette.muted;
        ctx.fillText(word, lineX, y);
        lineX += ctx.measureText(word).width;
    });

    // Fixed blocks, measured before drawing so each format fits exactly.
    const cellGap = 10 * s;
    const cellWidth = (inner - cellGap * 6) / 7;
    const visualHeader = 44 * s;
    const calendar = data.period === "month" ? data.calendar : undefined;
    const daysInMonth = calendar ? new Date(Date.UTC(calendar.year, calendar.month + 1, 0)).getUTCDate() : 0;
    const firstWeekday = calendar ? new Date(Date.UTC(calendar.year, calendar.month, 1)).getUTCDay() : 0;
    const weeks = Math.ceil((firstWeekday + daysInMonth) / 7);
    const dayTrades = data.period === "day" ? data.trades ?? [] : [];
    const shownRows = Math.min(dayTrades.length, layout === "story" ? 6 : layout === "post" ? 4 : 3);
    // Fewer trades get taller rows, so a quiet day still fills the card.
    const rowHeight =
        (layout === "story" ? (shownRows === 1 ? 150 : shownRows === 2 ? 230 : shownRows <= 4 ? 176 : 132) : layout === "post" ? (shownRows === 1 ? 116 : shownRows === 2 ? 150 : 108) : shownRows <= 2 ? 104 : 80) * s;
    const hiddenRows = dayTrades.length - shownRows;
    // A single trade is laid out as a ticket: the row, then its details in a grid.
    const ticketCell = (layout === "story" ? 150 : 116) * s;
    const ticketHeight = dayTrades.length === 1 && layout !== "square" ? ticketCell * 2 : 0;
    let cellHeight = 0;
    let visualHeight = 0;
    if (data.period === "month") {
        cellHeight = cellWidth * (layout === "story" ? 0.9 : layout === "post" ? 0.6 : 0.45);
        visualHeight = visualHeader + weeks * cellHeight + (weeks - 1) * cellGap;
    } else if (data.period === "week") {
        cellHeight = cellWidth * (layout === "story" ? 1.7 : layout === "post" ? 1.25 : 0.95);
        visualHeight = visualHeader + cellHeight;
    } else {
        visualHeight = shownRows * rowHeight + (hiddenRows > 0 ? 44 * s : 0) + ticketHeight;
    }
    const calendarHeight = visualHeight;
    const statsHeight = (layout === "square" ? 108 : 132) * s;
    const qrSize = (layout === "story" ? 150 : layout === "post" ? 128 : 104) * s;
    const footerTop = height - pad - qrSize;
    const blockGap = (layout === "story" ? 60 : layout === "post" ? 42 : 30) * s;
    const statsTop = footerTop - blockGap - statsHeight;

    // Running P&L, where the format has the height for it
    const curveRoom = statsTop - blockGap - calendarHeight - blockGap - y - blockGap;
    const curveHeight = layout === "square" ? 0 : Math.min((layout === "story" ? 250 : 150) * s, curveRoom);
    if (curveHeight >= 80 * s && data.curve.length >= 2) {
        y += blockGap;
        const values = [0, ...data.curve];
        const min = Math.min(...values);
        const max = Math.max(...values);
        const span = max - min || 1;
        const px = (i: number) => pad + (i / (values.length - 1 || 1)) * inner;
        const py = (value: number) => y + curveHeight - 6 * s - ((value - min) / span) * (curveHeight - 12 * s);
        const curveProgress = stage(progress, 0.15, 0.5);
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y - 40 * s, pad + inner * curveProgress + 6 * s, curveHeight + 80 * s);
        ctx.clip();
        ctx.beginPath();
        values.forEach((value, i) => (i === 0 ? ctx.moveTo(px(i), py(value)) : ctx.lineTo(px(i), py(value))));
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 5 * s;
        ctx.strokeStyle = palette.text;
        ctx.save();
        ctx.shadowColor = `rgba(${palette.curveRgb}, ${data.theme === "dark" ? 0.45 : 0.18})`;
        ctx.shadowBlur = 20 * s;
        ctx.stroke();
        ctx.restore();
        ctx.lineTo(px(values.length - 1), y + curveHeight);
        ctx.lineTo(px(0), y + curveHeight);
        ctx.closePath();
        const fill = ctx.createLinearGradient(0, y, 0, y + curveHeight);
        fill.addColorStop(0, `rgba(${palette.curveRgb}, 0.14)`);
        fill.addColorStop(1, `rgba(${palette.curveRgb}, 0)`);
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.restore();
        const endAlpha = stage(progress, 0.48, 0.56);
        const endX = px(values.length - 1);
        const endY = py(values[values.length - 1]);
        ctx.globalAlpha = endAlpha * 0.22;
        ctx.fillStyle = palette.text;
        ctx.beginPath();
        ctx.arc(endX, endY, 22 * s, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = endAlpha;
        ctx.beginPath();
        ctx.arc(endX, endY, 9 * s, 0, Math.PI * 2);
        ctx.fill();
        y += curveHeight;
    }

    // The period's own visual, centred between the headline and the figures:
    // a calendar for a month, seven tiles for a week, the trade list for a day.
    const regionTop = y + blockGap;
    const regionHeight = statsTop - blockGap - regionTop;
    const visualTop = regionTop + Math.max(0, (regionHeight - visualHeight) / 2);
    const radius = 3 * s;
    const onColour = (strength: number) => (data.theme === "dark" || strength > 0.6 ? "#ffffff" : palette.text);

    if (data.period === "month") {
        const byDay = new Map(stats.daily.map((day) => [Number(day.date.slice(8)), day.profitLoss]));
        const largest = Math.max(1, ...stats.daily.map((day) => Math.abs(day.profitLoss)));
        ctx.globalAlpha = stage(progress, 0.3, 0.4);
        ctx.font = font(500, 18);
        ctx.fillStyle = palette.muted;
        ctx.textAlign = "center";
        ["S", "M", "T", "W", "T", "F", "S"].forEach((label, i) => {
            ctx.fillText(label, pad + i * (cellWidth + cellGap) + cellWidth / 2, visualTop + 20 * s);
        });
        ctx.textAlign = "left";
        const showCellAmounts = data.showAmount && layout !== "square";
        for (let day = 1; day <= daysInMonth; day++) {
            const slot = firstWeekday + day - 1;
            const cx = pad + (slot % 7) * (cellWidth + cellGap);
            const cy = visualTop + visualHeader + Math.floor(slot / 7) * (cellHeight + cellGap);
            const value = byDay.get(day);
            const order = day / daysInMonth;
            const strength = value === undefined ? 0 : 0.3 + 0.7 * (Math.abs(value) / largest);
            ctx.globalAlpha = stage(progress, 0.3 + order * 0.2, 0.4 + order * 0.2);
            ctx.fillStyle = palette.cell;
            roundedRect(ctx, cx, cy, cellWidth, cellHeight, radius);
            ctx.fill();
            if (value !== undefined) {
                const pop = stage(progress, 0.4 + order * 0.28, 0.52 + order * 0.28);
                ctx.globalAlpha = pop;
                ctx.fillStyle = `rgba(${value >= 0 ? palette.greenRgb : palette.redRgb}, ${strength})`;
                const inset = (1 - pop) * cellWidth * 0.12;
                roundedRect(ctx, cx + inset, cy + inset, cellWidth - inset * 2, cellHeight - inset * 2, radius);
                ctx.fill();
                if (showCellAmounts) {
                    ctx.font = font(600, layout === "story" ? 25 : 21);
                    ctx.fillStyle = onColour(strength);
                    ctx.textAlign = "center";
                    ctx.fillText(compact(value), cx + cellWidth / 2, cy + cellHeight - (layout === "story" ? 18 : 12) * s);
                    ctx.textAlign = "left";
                }
            }
            ctx.globalAlpha = stage(progress, 0.3 + order * 0.2, 0.4 + order * 0.2);
            ctx.font = font(500, layout === "square" ? 15 : 16);
            ctx.fillStyle = value === undefined ? palette.faint : data.theme === "dark" || strength > 0.6 ? "rgba(255, 255, 255, 0.85)" : palette.text;
            ctx.fillText(`${day}`, cx + 10 * s, cy + (layout === "square" ? 20 : 24) * s);
        }
    } else if (data.period === "week") {
        const slots = data.week ?? [];
        const largest = Math.max(1, ...slots.map((slot) => Math.abs(slot.value ?? 0)));
        slots.forEach((slot, i) => {
            const cx = pad + i * (cellWidth + cellGap);
            const cy = visualTop + visualHeader;
            const order = i / 7;
            const strength = slot.value === undefined ? 0 : 0.3 + 0.7 * (Math.abs(slot.value) / largest);
            ctx.globalAlpha = stage(progress, 0.3 + order * 0.2, 0.4 + order * 0.2);
            ctx.font = font(500, 17);
            ctx.fillStyle = palette.muted;
            ctx.textAlign = "center";
            ctx.fillText(slot.label, cx + cellWidth / 2, visualTop + 20 * s);
            ctx.textAlign = "left";
            if (slot.day === null) return;
            ctx.fillStyle = palette.cell;
            roundedRect(ctx, cx, cy, cellWidth, cellHeight, radius);
            ctx.fill();
            if (slot.value !== undefined) {
                const pop = stage(progress, 0.42 + order * 0.3, 0.56 + order * 0.3);
                ctx.globalAlpha = pop;
                ctx.fillStyle = `rgba(${slot.value >= 0 ? palette.greenRgb : palette.redRgb}, ${strength})`;
                const inset = (1 - pop) * cellWidth * 0.12;
                roundedRect(ctx, cx + inset, cy + inset, cellWidth - inset * 2, cellHeight - inset * 2, radius);
                ctx.fill();
                if (data.showAmount) {
                    ctx.font = font(600, layout === "square" ? 23 : 27);
                    ctx.fillStyle = onColour(strength);
                    ctx.textAlign = "center";
                    ctx.fillText(compact(slot.value), cx + cellWidth / 2, cy + cellHeight - 22 * s);
                    ctx.textAlign = "left";
                }
            }
            ctx.globalAlpha = stage(progress, 0.3 + order * 0.2, 0.4 + order * 0.2);
            ctx.font = font(600, 24);
            ctx.fillStyle = slot.value === undefined ? palette.faint : data.theme === "dark" || strength > 0.6 ? "#ffffff" : palette.text;
            ctx.fillText(`${slot.day}`, cx + 14 * s, cy + 38 * s);
        });
    } else {
        // Type scales with the row, between the compact and the roomy size.
        const roomy = Math.min(1, Math.max(0, (rowHeight / s - 80) / 150));
        const titleSize = 32 + roomy * 20;
        const detailSize = 21 + roomy * 9;
        const price = (value: number) => `$${value.toLocaleString("en-US", { maximumFractionDigits: 4 })}`;
        dayTrades.slice(0, shownRows).forEach((trade, i) => {
            const top = visualTop + i * rowHeight;
            const twoLines = rowHeight >= 100 * s && ticketHeight === 0;
            const baseline = twoLines ? top + rowHeight * 0.46 : top + rowHeight * 0.62;
            const second = top + rowHeight * 0.46 + (detailSize + 22) * s;
            ctx.globalAlpha = stage(progress, 0.34 + i * 0.07, 0.5 + i * 0.07);
            ctx.fillStyle = palette.rule;
            ctx.fillRect(pad, top + rowHeight - 1.5 * s, inner, 1.5 * s);
            if (i === 0) ctx.fillRect(pad, top, inner, 1.5 * s);
            ctx.font = font(600, titleSize);
            ctx.fillStyle = palette.text;
            ctx.fillText(trade.instrument, pad, baseline);
            const cursor = pad + ctx.measureText(trade.instrument).width + 20 * s;
            const tag = trade.direction.toUpperCase();
            const tagSize = 15 + roomy * 6;
            ctx.font = font(700, tagSize);
            setSpacing(ctx, `${1 * s}px`);
            const tagHeight = (tagSize + 17) * s;
            const tagWidth = ctx.measureText(tag).width + 20 * s;
            ctx.fillStyle = trade.direction === "Long" ? palette.green : palette.red;
            roundedRect(ctx, cursor, baseline - tagHeight + 5 * s, tagWidth, tagHeight, 3 * s);
            ctx.fill();
            ctx.fillStyle = data.theme === "dark" ? "#050506" : "#ffffff";
            ctx.fillText(tag, cursor + 10 * s, baseline - 5 * s);
            setSpacing(ctx, "0px");
            ctx.textAlign = "right";
            ctx.font = font(600, titleSize);
            ctx.fillStyle = trade.profitLoss >= 0 ? palette.green : palette.red;
            ctx.fillText(data.showAmount ? money(trade.profitLoss) : trade.profitLoss >= 0 ? "WIN" : "LOSS", pad + inner, baseline);
            ctx.font = font(400, detailSize);
            ctx.fillStyle = palette.muted;
            if (twoLines) {
                ctx.fillText(`Closed ${trade.time}`, pad + inner, second);
                ctx.textAlign = "left";
                ctx.fillText(`${price(trade.entryPrice)}  →  ${price(trade.exitPrice)}`, pad, second);
            } else {
                ctx.textAlign = "left";
                ctx.fillText(trade.time, cursor + tagWidth + 18 * s, baseline - 2 * s);
            }
            ctx.textAlign = "left";
        });
        if (ticketHeight > 0) {
            const trade = dayTrades[0];
            const move = ((trade.exitPrice - trade.entryPrice) / trade.entryPrice) * 100;
            const cells: [string, string][] = [
                ["ENTRY PRICE", price(trade.entryPrice)],
                ["EXIT PRICE", price(trade.exitPrice)],
                ["PRICE MOVE", `${move >= 0 ? "+" : ""}${move.toFixed(2)}%`],
                ["CLOSED", trade.time],
            ];
            const gridTop = visualTop + rowHeight;
            ctx.globalAlpha = stage(progress, 0.46, 0.6);
            ctx.fillStyle = palette.rule;
            ctx.fillRect(pad, gridTop + ticketCell - 1.5 * s, inner, 1.5 * s);
            ctx.fillRect(pad, gridTop + ticketCell * 2 - 1.5 * s, inner, 1.5 * s);
            ctx.fillRect(pad + inner / 2, gridTop, 1.5 * s, ticketCell * 2);
            cells.forEach(([label, value], i) => {
                const cx = pad + (i % 2) * (inner / 2) + (i % 2 === 1 ? 32 * s : 0);
                const cy = gridTop + Math.floor(i / 2) * ticketCell;
                ctx.globalAlpha = stage(progress, 0.5 + i * 0.05, 0.66 + i * 0.05);
                ctx.font = font(500, 17);
                setSpacing(ctx, `${2.5 * s}px`);
                ctx.fillStyle = palette.muted;
                ctx.fillText(label, cx, cy + 46 * s);
                setSpacing(ctx, "0px");
                ctx.font = font(600, layout === "story" ? 46 : 38);
                ctx.fillStyle = palette.text;
                ctx.fillText(value, cx, cy + ticketCell - 30 * s);
            });
        }
        if (hiddenRows > 0) {
            ctx.globalAlpha = stage(progress, 0.7, 0.8);
            ctx.font = font(400, 22);
            ctx.fillStyle = palette.muted;
            ctx.fillText(`+ ${hiddenRows} more ${hiddenRows === 1 ? "trade" : "trades"}`, pad, visualTop + shownRows * rowHeight + 34 * s);
        }
    }

    // Four figures along one ruled line
    const figures: [string, string, string?][] = data.showAmount
        ? [
              ["WIN RATE", `${Math.round(stats.winRate * stage(progress, 0.6, 0.82))}%`],
              ["TRADES", `${Math.round(stats.totalTrades * stage(progress, 0.63, 0.85))}`],
              ["PROFIT FACTOR", stats.profitFactor === null ? "n/a" : (stats.profitFactor * stage(progress, 0.66, 0.88)).toFixed(2)],
              [data.best.label, compact(data.best.value * stage(progress, 0.69, 0.91)), data.best.value >= 0 ? palette.green : palette.red],
          ]
        : [
              ["TRADES", `${Math.round(stats.totalTrades * stage(progress, 0.6, 0.82))}`],
              ["WINS", `${Math.round(stats.wins * stage(progress, 0.63, 0.85))}`, palette.green],
              ["LOSSES", `${Math.round(stats.losses * stage(progress, 0.66, 0.88))}`, palette.red],
              ["PROFIT FACTOR", stats.profitFactor === null ? "n/a" : (stats.profitFactor * stage(progress, 0.69, 0.91)).toFixed(2)],
          ];
    ctx.globalAlpha = stage(progress, 0.58, 0.68);
    ctx.fillStyle = palette.rule;
    ctx.fillRect(pad, statsTop, inner, 1.5 * s);
    figures.forEach(([label, value, color], i) => {
        const fx = pad + (i * inner) / 4;
        ctx.globalAlpha = stage(progress, 0.6 + i * 0.03, 0.74 + i * 0.03);
        ctx.font = font(500, 16);
        setSpacing(ctx, `${2.5 * s}px`);
        ctx.fillStyle = palette.muted;
        ctx.fillText(label, fx, statsTop + 42 * s);
        setSpacing(ctx, "0px");
        ctx.font = font(600, layout === "square" ? 42 : 50);
        ctx.fillStyle = color ?? palette.text;
        ctx.fillText(value, fx, statsTop + statsHeight - 12 * s);
    });

    // Footer, anchored to the bottom edge
    ctx.globalAlpha = stage(progress, 0.82, 0.95);
    const modules = qrModules();
    const quiet = qrSize * 0.09;
    ctx.fillStyle = palette.qrGround;
    roundedRect(ctx, pad, footerTop, qrSize, qrSize, 3 * s);
    ctx.fill();
    if (data.theme === "light") {
        ctx.strokeStyle = palette.rule;
        ctx.lineWidth = 1.5 * s;
        ctx.stroke();
    }
    const moduleSize = (qrSize - quiet * 2) / modules.length;
    ctx.fillStyle = palette.qrInk;
    modules.forEach((row, r) =>
        row.forEach((dark, c) => {
            if (dark) ctx.fillRect(pad + quiet + c * moduleSize, footerTop + quiet + r * moduleSize, moduleSize + 0.5, moduleSize + 0.5);
        })
    );
    const textX = pad + qrSize + 30 * s;
    ctx.font = font(600, 30);
    ctx.fillStyle = palette.text;
    ctx.fillText(SITE_LABEL, textX, footerTop + qrSize / 2 - 10 * s);
    ctx.font = font(400, 21);
    ctx.fillStyle = palette.muted;
    ctx.fillText("Tracked with AltureLock", textX, footerTop + qrSize / 2 + 24 * s);
    ctx.font = font(400, 14);
    ctx.fillStyle = palette.faint;
    ctx.fillText("Past performance is not indicative of future results.", textX, footerTop + qrSize - 4 * s);

    ctx.restore();
}
