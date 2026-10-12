// The programme as the site shows it. Only what a visitor may read is kept here,
// so nothing of a locked module is ever sent to the browser. The full outlines
// live in education-curriculum.tsx, which no page uses.

// The Introduction comes before the seven modules and is open to everyone.
export const INTRODUCTION = {
    title: "Introduction",
    name: "Step into the market",
    text: "Six interactive stages, from your first question about Bitcoin to your first simulated trade: what cryptocurrency and the markets are, how trading capital and funded programmes work, how to read a real Bitcoin chart, and a decision of your own to review.",
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
