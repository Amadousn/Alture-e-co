// The programme as the site shows it. Only what a visitor may read is kept here,
// so nothing of a locked month is ever sent to the browser. The full outlines
// live in education-curriculum.tsx, which no page uses.
//
// "locked" shows the title only, "intro" adds a short introduction, "open" shows the outline given in `text`.
export type MonthAccess = "locked" | "intro" | "open";

export const MONTHS: { title: string; access: MonthAccess; text?: string }[] = [
    { title: "Setup & Foundations", access: "locked" },
    {
        title: "Reading the Chart",
        access: "intro",
        text: "This is the month you learn to read a chart instead of guessing at it. You work with three tools, VWAP, the volume profile and CVD, and with how to use them together. You build your context across timeframes, from the 4-hour bias to the 15-minute structure and the 5-minute entry, and you learn to spot liquidity sweeps.",
    },
    { title: "Order Flow & Confirmation", access: "locked" },
    { title: "AltureLock: The Rule System", access: "locked" },
    { title: "Strategy & Entries", access: "locked" },
    { title: "Live Practice, Guided", access: "locked" },
    { title: "Trading for Real", access: "locked" },
];
