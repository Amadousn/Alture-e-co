// Everything the demo cockpit shows that is not public market data: a made-up
// account, made-up trades and a hand-written example briefing. None of it is
// real, and every screen that shows it says so.

import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import type { BriefingStory } from "@/utils/use-market-intel";
import type { ActiveTrade } from "@/utils/workspace-store";

const DAY = 24 * 60 * 60 * 1000;

const SAMPLE: [number, string, "Long" | "Short", number, "Continuation" | "Reversal", boolean][] = [
    [27, "BTCUSDT", "Long", 420, "Continuation", true],
    [24, "ETHUSDT", "Short", -180, "Reversal", true],
    [21, "SOLUSDT", "Long", 310, "Continuation", true],
    [17, "BTCUSDT", "Short", -95, "Reversal", false],
    [13, "HYPEUSDT", "Long", 540, "Continuation", true],
    [9, "ETHUSDT", "Long", -150, "Continuation", true],
    [6, "BTCUSDT", "Long", 260, "Continuation", true],
    [3, "XRPUSDT", "Short", 190, "Reversal", true],
];

export function demoTrades(now: number): ClosedTrade[] {
    return SAMPLE.map(([daysAgo, instrument, direction, profitLoss, setup, rulesFollowed], i) => ({
        id: `demo-${i}`,
        instrument,
        direction,
        entryPrice: 0,
        exitPrice: 0,
        quantity: 0,
        leverage: 10,
        positionSize: 0,
        fee: 0,
        profitLoss,
        closedAt: now - daysAgo * DAY,
        setup,
        source: "rules",
        rulesFollowed,
    }));
}

// A simulated open position, priced from the real market so the screen behaves as it would live.
// The entry is set once from the price seen on arrival; after that only the real price moves.
export function demoPosition(price: number, now: number, reference = price): OpenPosition {
    const entry = Math.round(reference * 0.994 * 10) / 10;
    const quantity = 0.25;
    return { instrument: "BTCUSDT", direction: "Long", entryPrice: entry, markPrice: price, quantity, leverage: 10, positionSize: entry * quantity, unrealisedPnl: (price - entry) * quantity, openedAt: now - 95 * 60 * 1000 };
}

export function demoActiveTrade(price: number, now: number): ActiveTrade {
    const entry = price * 0.994;
    const round = (value: number) => String(Math.round(value * 10) / 10);
    return {
        stage: "execute",
        checks: { context: true, setup: true, risk: true },
        plan: { instrument: "BTCUSDT", direction: "Long", setup: "Continuation", plannedEntry: round(entry), actualEntry: round(entry), stopLoss: round(entry * 0.99), takeProfit: round(entry * 1.025), quantity: "0.25", leverage: "10", riskAmount: "150", sizeMode: "risk" },
        openedAt: now - 95 * 60 * 1000,
        answers: {},
        manualPrice: "",
        manualPriceAt: null,
        step: 4,
        reached: 4,
        version: 2,
    };
}

// Written by hand to show the format. It describes no real event and cites no real article.
export const DEMO_BRIEFING: BriefingStory[] = [
    {
        headline: "Example: a large spot Bitcoin fund reports a week of inflows",
        whatHappened: "In this example, a fund issuer reports several days of net buying of its Bitcoin product.",
        whyItMatters: "Sustained inflows can support price, but one report does not show whether buying will continue.",
        watchNext: "Whether the next days' flow figures confirm it, and how price behaves at the recent high.",
        scope: "Crypto",
        lean: "Bullish",
        assets: ["BTC"],
        sources: [{ title: "Example headline one", url: "", source: "Example source" }],
    },
    {
        headline: "Example: inflation data is due before the US open",
        whatHappened: "In this example, a monthly consumer price report is scheduled for release today.",
        whyItMatters: "A reading far from the forecast can move rate expectations, the dollar and risk assets together, crypto included.",
        watchNext: "The figure against the forecast on the economic calendar, and the first hour of trading after it.",
        scope: "Macro",
        lean: "Unclear",
        assets: ["BTC", "ETH", "Nasdaq"],
        sources: [{ title: "Example headline two", url: "", source: "Example source" }],
    },
    {
        headline: "Example: an exchange announces a change to a listed token",
        whatHappened: "In this example, an exchange says it will change trading terms for one altcoin.",
        whyItMatters: "Announcements like this mostly affect the token named, and can cut both ways depending on the detail.",
        watchNext: "The effective date and the token's volume around it.",
        scope: "Crypto",
        lean: "Mixed",
        assets: ["Altcoins"],
        sources: [{ title: "Example headline three", url: "", source: "Example source" }],
    },
];
