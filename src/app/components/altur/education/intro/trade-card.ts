// Draws the card a learner can share after a simulated trade. It says what it
// is on its face: a practice trade on historical data, with no real money.

import qrcode from "qrcode-generator";

export const CARD_SIZE = { width: 1080, height: 1350 };

export type TradeCardData = {
    pair: string;
    side: "Long" | "Short";
    leverage: number;
    margin: number;
    roi: number;
    net: number;
    entry: number;
    exit: number;
    digits: number;
    // "Take profit reached", "Stopped out"...
    result: string;
    held: string;
    when: string;
    // Price through the trade: minutes from the decision (negative = before it) and the price then.
    curve: { at: number; price: number }[];
    filledAt: number;
    fonts: { sans: string; logo: string };
};

const SITE_URL = "https://www.altureandco.com/education";
const INK = { text: "#ffffff", muted: "#8a8a94", faint: "#5c5c66", rule: "#26262c", green: "#20B8A8", greenRgb: "32, 184, 168", red: "#E955A8", redRgb: "233, 85, 168" };

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

export function drawTradeCard(ctx: CanvasRenderingContext2D, width: number, height: number, data: TradeCardData) {
    const s = width / 1080;
    const pad = 72 * s;
    const inner = width - pad * 2;
    const font = (weight: number, size: number, family = data.fonts.sans) => `${weight} ${size * s}px ${family}`;
    const positive = data.net >= 0;
    const colour = positive ? INK.green : INK.red;
    const rgb = positive ? INK.greenRgb : INK.redRgb;
    const price = (value: number) => value.toLocaleString("en-US", { minimumFractionDigits: data.digits, maximumFractionDigits: data.digits });
    const signed = (value: number, digits = 2) => `${value >= 0 ? "+" : "-"}${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;

    ctx.save();
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    setSpacing(ctx, "0px");

    // Ground: a vertical wash, a white glow from the top corner, a hint of the result's colour from the other, and a hairline frame.
    const wash = ctx.createLinearGradient(0, 0, 0, height);
    wash.addColorStop(0, "#0E0D12");
    wash.addColorStop(1, "#050506");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, width, height);
    const glow = ctx.createRadialGradient(width * 0.15, 0, 0, width * 0.15, 0, height * 0.55);
    glow.addColorStop(0, "rgba(255, 255, 255, 0.12)");
    glow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    const tint = ctx.createRadialGradient(width, height, 0, width, height, width * 0.95);
    tint.addColorStop(0, `rgba(${rgb}, 0.12)`);
    tint.addColorStop(1, `rgba(${rgb}, 0)`);
    ctx.fillStyle = tint;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = INK.rule;
    ctx.lineWidth = 1.5 * s;
    ctx.strokeRect(26 * s, 26 * s, width - 52 * s, height - 52 * s);

    // Header.
    let x = pad;
    const headerBaseline = pad + 44 * s;
    ctx.font = font(200, 50, data.fonts.logo);
    ctx.fillStyle = INK.text;
    for (const part of ["Alture ", "& ", "Co."]) {
        ctx.fillText(part, x, headerBaseline);
        x += ctx.measureText(part).width;
    }
    ctx.textAlign = "right";
    ctx.font = font(500, 22);
    setSpacing(ctx, `${4 * s}px`);
    ctx.fillText("PRACTICE TRADE", width - pad, headerBaseline - 8 * s);
    ctx.font = font(500, 17);
    setSpacing(ctx, `${3 * s}px`);
    ctx.fillStyle = INK.muted;
    ctx.fillText("SIMULATED · NO REAL MONEY", width - pad, headerBaseline + 20 * s);
    ctx.textAlign = "left";
    setSpacing(ctx, "0px");

    // The market and the direction.
    let y = headerBaseline + 120 * s;
    ctx.font = font(600, 54);
    ctx.fillStyle = INK.text;
    ctx.fillText(data.pair, pad, y);
    const pairWidth = ctx.measureText(data.pair).width;
    const badge = `${data.side.toUpperCase()} ${data.leverage}x`;
    ctx.font = font(600, 24);
    setSpacing(ctx, `${2 * s}px`);
    const badgeWidth = ctx.measureText(badge).width + 30 * s;
    const sideColour = data.side === "Long" ? INK.green : INK.red;
    ctx.fillStyle = sideColour;
    ctx.fillRect(pad + pairWidth + 24 * s, y - 40 * s, badgeWidth, 46 * s);
    ctx.fillStyle = "#050506";
    ctx.fillText(badge, pad + pairWidth + 39 * s, y - 8 * s);
    setSpacing(ctx, "0px");

    // The headline: the return on the amount put in. White; the colour is left to the dollars under it.
    y += 78 * s;
    ctx.font = font(500, 22);
    setSpacing(ctx, `${4 * s}px`);
    ctx.fillStyle = INK.muted;
    ctx.fillText("RETURN ON THE AMOUNT PUT IN", pad, y);
    setSpacing(ctx, "0px");
    const hero = `${signed(data.roi * 100)}%`;
    let heroSize = 168;
    ctx.font = font(600, heroSize);
    setSpacing(ctx, `${-0.035 * heroSize * s}px`);
    const heroWidth = ctx.measureText(hero).width;
    if (heroWidth > inner) heroSize = Math.floor(heroSize * (inner / heroWidth));
    y += heroSize * 0.86 * s + 18 * s;
    ctx.font = font(600, heroSize);
    setSpacing(ctx, `${-0.035 * heroSize * s}px`);
    ctx.fillStyle = INK.text;
    ctx.fillText(hero, pad - 4 * s, y);
    setSpacing(ctx, "0px");
    y += 62 * s;
    ctx.font = font(600, 40);
    ctx.fillStyle = colour;
    const netText = `${data.net >= 0 ? "+" : "-"}$${Math.abs(data.net).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    ctx.fillText(netText, pad, y);
    const netWidth = ctx.measureText(netText).width;
    ctx.font = font(400, 28);
    ctx.fillStyle = INK.muted;
    ctx.fillText(`virtual, on $${data.margin.toLocaleString("en-US")} at ${data.leverage}x`, pad + netWidth + 18 * s, y);

    // Footer and figures are anchored to the bottom; the price curve takes the room between.
    const qrSize = 128 * s;
    const footerTop = height - pad - qrSize;
    const statsHeight = 124 * s;
    const statsTop = footerTop - 44 * s - statsHeight;
    const curveTop = y + 56 * s;
    const curveBottom = statsTop - 76 * s;

    const prices = data.curve.map((point) => point.price).concat(data.entry, data.exit);
    const [low, high] = [Math.min(...prices), Math.max(...prices)];
    const [from, to] = [data.curve[0].at, data.curve[data.curve.length - 1].at];
    const px = (at: number) => pad + ((at - from) / (to - from || 1)) * inner;
    const py = (value: number) => curveBottom - ((value - low) / (high - low || 1)) * (curveBottom - curveTop);
    ctx.beginPath();
    data.curve.forEach((point, i) => (i === 0 ? ctx.moveTo(px(point.at), py(point.price)) : ctx.lineTo(px(point.at), py(point.price))));
    ctx.lineJoin = "round";
    ctx.lineWidth = 3.5 * s;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();
    ctx.lineTo(px(to), curveBottom + 20 * s);
    ctx.lineTo(px(from), curveBottom + 20 * s);
    ctx.closePath();
    const fill = ctx.createLinearGradient(0, curveTop, 0, curveBottom + 20 * s);
    fill.addColorStop(0, "rgba(255, 255, 255, 0.14)");
    fill.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = fill;
    ctx.fill();
    // The entry, as a dashed line from where the order was filled, and the exit.
    ctx.setLineDash([10 * s, 9 * s]);
    ctx.lineWidth = 2 * s;
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.beginPath();
    ctx.moveTo(px(data.filledAt), py(data.entry));
    ctx.lineTo(px(to), py(data.entry));
    ctx.stroke();
    ctx.setLineDash([]);
    const dot = (at: number, value: number, ink: string) => {
        ctx.beginPath();
        ctx.arc(px(at), py(value), 9 * s, 0, Math.PI * 2);
        ctx.fillStyle = "#050506";
        ctx.fill();
        ctx.lineWidth = 4 * s;
        ctx.strokeStyle = ink;
        ctx.stroke();
    };
    dot(data.filledAt, data.entry, "#ffffff");
    dot(to, data.exit, colour);
    ctx.font = font(400, 21);
    ctx.fillStyle = INK.muted;
    ctx.fillText(`${data.result} · chart of ${data.when} · Bybit perpetual, historical`, pad, statsTop - 28 * s);

    // Figures.
    const move = ((data.exit - data.entry) / data.entry) * 100;
    const figures: [string, string][] = [
        ["ENTRY", price(data.entry)],
        ["EXIT", price(data.exit)],
        ["PRICE MOVE", `${signed(move)}%`],
        ["HELD", data.held],
    ];
    ctx.fillStyle = INK.rule;
    ctx.fillRect(pad, statsTop, inner, 1.5 * s);
    figures.forEach(([name, value], i) => {
        const fx = pad + (i * inner) / 4;
        ctx.font = font(500, 16);
        setSpacing(ctx, `${2.5 * s}px`);
        ctx.fillStyle = INK.muted;
        ctx.fillText(name, fx, statsTop + 42 * s);
        setSpacing(ctx, "0px");
        let size = 42;
        ctx.font = font(600, size);
        const limit = inner / 4 - 18 * s;
        if (ctx.measureText(value).width > limit) size = Math.floor(size * (limit / ctx.measureText(value).width));
        ctx.font = font(600, size);
        ctx.fillStyle = INK.text;
        ctx.fillText(value, fx, statsTop + statsHeight - 12 * s);
    });

    // Footer.
    const modules = qrModules();
    const quiet = qrSize * 0.09;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(pad, footerTop, qrSize, qrSize);
    const moduleSize = (qrSize - quiet * 2) / modules.length;
    ctx.fillStyle = "#050506";
    modules.forEach((row, r) =>
        row.forEach((dark, c) => {
            if (dark) ctx.fillRect(pad + quiet + c * moduleSize, footerTop + quiet + r * moduleSize, moduleSize + 0.5, moduleSize + 0.5);
        })
    );
    const textX = pad + qrSize + 30 * s;
    ctx.font = font(600, 30);
    ctx.fillStyle = INK.text;
    ctx.fillText("altureandco.com/education", textX, footerTop + qrSize / 2 - 10 * s);
    ctx.font = font(400, 21);
    ctx.fillStyle = INK.muted;
    ctx.fillText("Practised on Alture Education", textX, footerTop + qrSize / 2 + 24 * s);
    ctx.font = font(400, 14);
    ctx.fillStyle = INK.faint;
    ctx.fillText("A simulated trade on historical market data. No real money was used. Not financial advice.", textX, footerTop + qrSize - 4 * s);

    ctx.restore();
}
