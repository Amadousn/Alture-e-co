"use client";

import { useEffect, useState } from "react";

// The brand's recurring device: a hairline with a folio number, a label and,
// where it helps, a fact on the right. It replaces boxed section headers.
export const SectionMark = ({ index, label, children, className = "" }: { index?: string; label: string; children?: React.ReactNode; className?: string }) => (
    <div className={`flex items-baseline gap-4 border-t border-white/15 pt-3.5 text-[11px] uppercase tracking-[0.14em] ${className}`}>
        {index && <span className="font-mono tabular-nums text-accent">{index}</span>}
        <span className="text-white/70">{label}</span>
        {children && <span className="ml-auto text-right font-mono normal-case tracking-normal text-white/45">{children}</span>}
    </div>
);

const dubaiClock = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit" });

// The desk's local time, read from the visitor's own clock. Empty until
// mounted so the server and the browser never disagree.
export const DubaiTime = ({ className = "" }: { className?: string }) => {
    const [time, setTime] = useState("");
    useEffect(() => {
        const tick = () => setTime(dubaiClock.format(new Date()));
        tick();
        const id = setInterval(tick, 15000);
        return () => clearInterval(id);
    }, []);
    return (
        <span className={`font-mono tabular-nums ${className}`} suppressHydrationWarning>
            Dubai {time || "--:--"} GST
        </span>
    );
};
