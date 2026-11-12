"use client";

import { useState } from "react";
import CandleStage, { CandlePart } from "./intro/candle-stage";

// A real exercise from the free Introduction ("Body and wicks"): the same candle,
// the same three parts and the same words as the lesson.
const PARTS: { key: CandlePart; label: string; text: string }[] = [
    { key: "body", label: "The body", text: "From the open to the close. A long body means price travelled far and stayed there." },
    { key: "upper", label: "The upper wick", text: "From the top of the body to the high. Price went up there and came back down before the close." },
    { key: "lower", label: "The lower wick", text: "From the bottom of the body to the low. Price went down there and came back up before the close." },
];

const CandleExercise = () => {
    const [found, setFound] = useState<CandlePart[]>([]);
    const [open, setOpen] = useState<CandlePart | null>(null);
    const part = PARTS.find((p) => p.key === open);
    const reveal = (p: CandlePart) => {
        if (!PARTS.some((x) => x.key === p)) return;
        setOpen(p);
        setFound((f) => (f.includes(p) ? f : [...f, p]));
    };
    return (
        <div className="rounded-[10px] border border-white/15 bg-[#050407] p-5 md:p-7">
            <style>{`@keyframes ce-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@media (prefers-reduced-motion: reduce){[style*=ce-in]{animation:none!important}}`}</style>
            <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">From the free Introduction</p>
                <p className="text-[12px] tabular-nums text-white/45">{found.length} / 3 found</p>
            </div>
            <p className="mt-3 text-[17px] text-white">Click the body, the upper wick and the lower wick.</p>
            <CandleStage className="mx-auto mt-2 w-full max-w-[420px]" pick="parts" onPart={reveal} spec={{ kind: "bull", show: found, focus: open }} />
            <div className="min-h-[72px] border-t border-white/10 pt-4">
                {part ? (
                    <p key={part.key} className="text-[14px] leading-relaxed text-white/75" style={{ animation: "ce-in .35s both" }}>
                        <span className="text-white">{part.label}.</span> {part.text}
                    </p>
                ) : (
                    <p className="text-[14px] text-white/45">The free Introduction works like this: you explore, answer, practise on real Bitcoin charts, then review your own simulated trade.</p>
                )}
            </div>
        </div>
    );
};

export default CandleExercise;
