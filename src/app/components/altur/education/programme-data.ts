// The programme as the site shows it. Only what a visitor may read is kept here,
// so nothing of a locked module is ever sent to the browser. The full outlines
// live in education-curriculum.tsx, which no page uses.

// The Introduction comes before the seven modules and is open to everyone.
export const INTRODUCTION = {
    title: "Introduction",
    name: "Reading the Chart",
    text: "Seven short, interactive lessons on real, historical Bitcoin charts: the scales, candlesticks, price movement, market structure, support and resistance, and the broader context.",
};

// The seven modules, in order. All are locked until a learner is in the programme.
export const MODULES: { title: string }[] = [
    { title: "Setup & Foundations" },
    { title: "Reading the Chart" },
    { title: "Order Flow & Confirmation" },
    { title: "AltureLock: The Rule System" },
    { title: "Strategy & Entries" },
    { title: "Live Practice, Guided" },
    { title: "Trading for Real" },
];
