"use client";

import { useId, useState } from "react";
import { decimalsOf } from "@/utils/trade-plan";

export const panelClass = "rounded-sm border border-white/15 bg-black";
export const labelClass = "text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]";
export const fieldClass = "!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white tabular-nums";
export const primaryButton = "h-11 px-6 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors lit disabled:opacity-30 disabled:shadow-none disabled:hover:bg-white";
export const quietButton = "h-11 px-5 rounded-sm border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:hover:bg-transparent";

// What to call the price source on screen.
export const feedName = (market: { simulated?: boolean }) => (market.simulated ? "Simulated" : "Bybit");

export const UP = "#20B8A8";
export const DOWN = "#E955A8";
export const AMBER = "#FACC15";

export const money = (value: number) => `${value < 0 ? "-" : ""}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const signed = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// Prices keep the instrument's own precision when its tick size is known.
export const priceText = (value: number, tick?: number) =>
    `$${value.toLocaleString(undefined, tick ? { minimumFractionDigits: decimalsOf(tick), maximumFractionDigits: decimalsOf(tick) } : { maximumFractionDigits: 6 })}`;

export const quantityText = (value: number) => value.toLocaleString(undefined, { maximumFractionDigits: 6 });

export const clock = (time: number) => new Date(time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export function duration(ms: number): string {
    const total = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${total % 60}s`;
}

export type CockpitState = "PREPARING" | "TRADE READY" | "READY" | "ACTIVE" | "REVIEW REQUIRED" | "CLOSED";

const STATE_TONE: Record<CockpitState, string> = {
    PREPARING: "border-white/25 text-[#c8c8d0]",
    "TRADE READY": "border-[#20B8A8] text-[#20B8A8] bg-[#20B8A8]/10",
    READY: "border-[#20B8A8] text-[#20B8A8] bg-[#20B8A8]/10",
    ACTIVE: "border-white text-white bg-white/10",
    "REVIEW REQUIRED": "border-[#FACC15] text-[#FACC15] bg-[#FACC15]/10",
    CLOSED: "border-[#55555e] text-[#c8c8d0] bg-white/5",
};

export const StateBadge = ({ state }: { state: CockpitState }) => (
    <span role="status" className={`inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors ${STATE_TONE[state]}`}>
        <span className={`h-1.5 w-1.5 rounded-full bg-current ${state === "ACTIVE" ? "cockpit-pulse" : ""}`} aria-hidden="true" />
        {state}
    </span>
);

// A term with its plain-English meaning one tap away. Works on touch, unlike a hover tooltip.
export const Explain = ({ term, children }: { term: string; children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const id = useId();
    return (
        <>
            <button
                type="button"
                aria-expanded={open}
                aria-controls={id}
                aria-label={`What is ${term}?`}
                onClick={() => setOpen((value) => !value)}
                className={`ml-2 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border text-[11px] font-semibold normal-case tracking-normal transition-colors align-middle ${open ? "border-accent text-accent lit" : "border-[#55555e] text-[#9a9aa5] hover:border-white hover:text-white"}`}
            >
                ?
            </button>
            {open && (
                <span id={id} className="cockpit-rise mt-2 block border-l border-accent/60 pl-3 text-[13px] leading-relaxed normal-case tracking-normal text-[#c8c8d0]">
                    {children}
                </span>
            )}
        </>
    );
};

export const Chip = ({ children, tone = "plain" }: { children: React.ReactNode; tone?: "plain" | "long" | "short" }) => (
    <span className={`text-[11px] font-semibold uppercase px-1.5 py-0.5 rounded-sm ${tone === "long" ? "bg-[#20B8A8] text-black" : tone === "short" ? "bg-[#E955A8] text-black" : "border border-white/25 text-[#9a9aa5]"}`}>{children}</span>
);

export const Cells = ({ cells, columns = "grid-cols-2" }: { cells: [string, React.ReactNode][]; columns?: string }) => (
    <dl className={`grid ${columns} gap-px bg-white/15`}>
        {cells.map(([label, value]) => (
            <div key={label} className="bg-black px-4 py-3 min-w-0">
                <dt className={`${labelClass} mb-1`}>{label}</dt>
                <dd className="text-[15px] font-medium tabular-nums text-white truncate">{value}</dd>
            </div>
        ))}
    </dl>
);
