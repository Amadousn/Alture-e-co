"use client";

import { useEffect, useRef, useState } from "react";
import { compress, readShots, Shot, writeShots } from "@/utils/trade-shots";

// The charts of a trade: before the entry, at the exit, the higher timeframe.
// Added by pasting a screenshot, dropping a file or picking one.

const LIMIT = 6;
const label = "text-[11px] uppercase tracking-[0.08em] text-[var(--j-mu,#7d7d87)]";

const TradeShots = ({ tradeId }: { tradeId: string }) => {
    const [shots, setShots] = useState<Shot[]>([]);
    const [open, setOpen] = useState<Shot | null>(null);
    const [over, setOver] = useState(false);
    const [error, setError] = useState("");
    const input = useRef<HTMLInputElement>(null);
    const zone = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let live = true;
        readShots(tradeId).then((list) => live && setShots(list)).catch(() => live && setError("The charts could not be loaded. Check your connection and try again."));
        return () => {
            live = false;
        };
    }, [tradeId]);

    const add = async (files: Blob[]) => {
        const images = files.filter((file) => file.type.startsWith("image/")).slice(0, LIMIT - shots.length);
        if (!images.length) return setError(shots.length >= LIMIT ? `Up to ${LIMIT} charts per trade.` : "Only images can be added.");
        try {
            const added = await Promise.all(images.map(async (file) => ({ id: crypto.randomUUID(), src: await compress(file), addedAt: Date.now() })));
            const next = [...shots, ...added];
            await writeShots(tradeId, next);
            setShots(next);
            setError("");
        } catch {
            setError("The image could not be saved. Check your connection and try again.");
        }
    };
    const remove = async (id: string) => {
        const next = shots.filter((shot) => shot.id !== id);
        await writeShots(tradeId, next);
        setShots(next);
        setOpen(null);
    };

    // Ctrl/Cmd+V of a screenshot while the pointer or focus is on this block.
    useEffect(() => {
        const paste = (event: ClipboardEvent) => {
            const node = zone.current;
            if (!node || !(node.matches(":hover") || node.contains(document.activeElement))) return;
            const files = [...(event.clipboardData?.files ?? [])];
            if (files.length) {
                event.preventDefault();
                add(files);
            }
        };
        window.addEventListener("paste", paste);
        return () => window.removeEventListener("paste", paste);
    });

    useEffect(() => {
        if (!open) return;
        const key = (event: KeyboardEvent) => event.key === "Escape" && setOpen(null);
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, [open]);

    return (
        <div ref={zone} tabIndex={-1} className="border-t border-[var(--j-line,rgba(255,255,255,0.15))] px-5 py-4 outline-none">
            <div className="flex items-baseline justify-between gap-3">
                <p className={label}>Charts</p>
                <span className="text-[11px] text-[var(--j-fa,rgba(255,255,255,0.35))]">{shots.length} / {LIMIT}</span>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2">
                {shots.map((shot) => (
                    <button key={shot.id} type="button" onClick={() => setOpen(shot)} className="group relative aspect-[16/10] overflow-hidden rounded-md border border-[var(--j-line,rgba(255,255,255,0.15))]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={shot.src} alt="Chart of this trade" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    </button>
                ))}
                {shots.length < LIMIT && (
                    <button
                        type="button"
                        onClick={() => input.current?.click()}
                        onDragOver={(event) => {
                            event.preventDefault();
                            setOver(true);
                        }}
                        onDragLeave={() => setOver(false)}
                        onDrop={(event) => {
                            event.preventDefault();
                            setOver(false);
                            add([...event.dataTransfer.files]);
                        }}
                        className={`flex aspect-[16/10] flex-col items-center justify-center gap-1 rounded-md border border-dashed px-2 text-center text-[11px] leading-snug transition-colors ${over ? "border-[var(--j-ink,#fff)] text-[var(--j-ink,#fff)]" : "border-[var(--j-line,rgba(255,255,255,0.2))] text-[var(--j-mu,rgba(255,255,255,0.45))] hover:border-[var(--j-mu,rgba(255,255,255,0.5))]"} ${shots.length === 0 ? "col-span-3 aspect-auto py-6" : ""}`}
                    >
                        <span className="text-base leading-none">+</span>
                        {shots.length === 0 ? "Paste a screenshot (⌘V), drop it here or pick a file" : "Add"}
                    </button>
                )}
            </div>
            <input ref={input} type="file" accept="image/*" multiple hidden onChange={(event) => { add([...(event.target.files ?? [])]); event.target.value = ""; }} />
            {error && <p className="mt-2 text-[11px] text-[var(--j-dn,#E5484D)]">{error}</p>}

            {open && (
                <div role="dialog" aria-label="Chart" className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/85 p-6 backdrop-blur-sm" onClick={() => setOpen(null)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={open.src} alt="Chart of this trade" className="max-h-[82vh] max-w-full rounded-lg border border-white/15" onClick={(event) => event.stopPropagation()} />
                    <div className="flex gap-3 text-sm" onClick={(event) => event.stopPropagation()}>
                        <button type="button" onClick={() => remove(open.id)} className="rounded-sm border border-white/25 px-4 py-2 text-white/80 hover:border-[#E5484D] hover:text-[#E5484D]">Remove</button>
                        <button type="button" onClick={() => setOpen(null)} className="rounded-sm bg-white px-4 py-2 font-medium text-black">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TradeShots;
