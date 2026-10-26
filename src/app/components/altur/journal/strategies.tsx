"use client";

import { useState } from "react";
import { useStrategies } from "@/utils/workspace-store";

// The trader's strategies and the confluences each one looks for. Reviews tick
// these, and the analytics show which of them actually pay.
const Strategies = () => {
    const [strategies, setStrategies, store] = useStrategies();
    const [name, setName] = useState("");
    const [adding, setAdding] = useState<Record<string, string>>({});
    if (!store.ready) return null;

    const create = () => {
        const clean = name.trim();
        if (!clean || strategies.some((item) => item.name === clean)) return;
        setStrategies((list) => [...list, { id: `s-${Date.now()}`, name: clean, confluences: [] }]);
        setName("");
    };
    const change = (id: string, confluences: string[]) => setStrategies((list) => list.map((item) => (item.id === id ? { ...item, confluences } : item)));

    return (
        <div className="rounded-sm border border-white/15 bg-black p-4">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Strategies</p>
            <p className="mt-1.5 text-sm text-white/60">Name each strategy and list the confluences you look for. You tick them when you review a trade.</p>
            <ul className="mt-4 space-y-4">
                {strategies.map((item) => (
                    <li key={item.id} className="border-t border-white/10 pt-3">
                        <div className="flex items-baseline justify-between gap-4">
                            <p className="text-[15px] font-medium text-white">{item.name}</p>
                            <button type="button" onClick={() => setStrategies((list) => list.filter((entry) => entry.id !== item.id))} className="text-xs text-white/40 hover:text-[#E955A8]">
                                Remove
                            </button>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.confluences.map((confluence) => (
                                <span key={confluence} className="inline-flex items-center gap-1.5 rounded-sm border border-white/20 px-2 py-0.5 text-xs text-white/80">
                                    {confluence}
                                    <button type="button" aria-label={`Remove ${confluence}`} onClick={() => change(item.id, item.confluences.filter((value) => value !== confluence))} className="text-white/40 hover:text-white">
                                        ×
                                    </button>
                                </span>
                            ))}
                            <form
                                className="inline-flex"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    const value = (adding[item.id] ?? "").trim();
                                    if (value && !item.confluences.includes(value)) change(item.id, [...item.confluences, value]);
                                    setAdding((all) => ({ ...all, [item.id]: "" }));
                                }}
                            >
                                <input value={adding[item.id] ?? ""} onChange={(event) => setAdding((all) => ({ ...all, [item.id]: event.target.value }))} maxLength={40} placeholder="Add a confluence, e.g. Liquidity sweep" className="!h-7 !w-56 !rounded-sm !border !border-white/15 !bg-transparent !px-2 !text-xs !text-white placeholder:!text-white/30 focus:!border-white" />
                            </form>
                        </div>
                    </li>
                ))}
            </ul>
            <form
                className="mt-4 flex gap-2 border-t border-white/10 pt-4"
                onSubmit={(event) => {
                    event.preventDefault();
                    create();
                }}
            >
                <input value={name} onChange={(event) => setName(event.target.value)} maxLength={40} placeholder="New strategy, e.g. London breakout" className="!h-9 !flex-1 !rounded-sm !border !border-white/20 !bg-transparent !px-3 !text-sm !text-white placeholder:!text-white/30 focus:!border-white" />
                <button type="submit" className="h-9 rounded-sm bg-white px-4 text-sm font-medium text-black hover:bg-[#e4e4e8]">
                    Add strategy
                </button>
            </form>
        </div>
    );
};

export default Strategies;
