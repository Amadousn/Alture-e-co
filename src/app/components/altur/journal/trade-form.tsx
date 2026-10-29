"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { ClosedTrade } from "@/utils/bybit";

// Adds a closed trade to the journal by hand, or corrects one. The result is
// worked out from the prices, the size and the fees, so it always agrees with
// them; a trader whose exchange reports a different figure can enter that instead.

const pad = (n: number) => String(n).padStart(2, "0");
// Times are typed in UTC, the way the journal counts its days.
const toInput = (at: number) => {
    const d = new Date(at);
    return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`;
};
const fromInput = (value: string) => (value ? Date.parse(`${value}:00Z`) : NaN);
const num = (value: string) => (value.trim() === "" ? NaN : Number(value.replace(",", ".")));

type Draft = { instrument: string; direction: "Long" | "Short"; entry: string; exit: string; quantity: string; leverage: string; fee: string; opened: string; closed: string; setup: string; reported: string };

// colours: the journal theme variables, since the form is drawn outside the page.
const TradeForm = ({ trade, onSave, onClose, colours }: { trade?: ClosedTrade; onSave: (trade: ClosedTrade) => void; onClose: () => void; colours?: React.CSSProperties }) => {
    const [draft, setDraft] = useState<Draft>(() => ({
        instrument: trade ? trade.instrument.replace(/USDT$/, "") : "BTC",
        direction: trade?.direction ?? "Long",
        entry: trade ? String(trade.entryPrice) : "",
        exit: trade ? String(trade.exitPrice) : "",
        quantity: trade ? String(trade.quantity) : "",
        leverage: trade ? String(trade.leverage) : "1",
        fee: trade ? String(trade.fee) : "",
        opened: trade?.openedAt ? toInput(trade.openedAt) : "",
        closed: toInput(trade?.closedAt ?? Date.now()),
        setup: trade?.setup ?? "",
        reported: trade?.pnlSource === "exchange" ? String(trade.profitLoss) : "",
    }));
    const [tried, setTried] = useState(false);
    const set = (change: Partial<Draft>) => setDraft((d) => ({ ...d, ...change }));
    useEffect(() => {
        const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", key);
        return () => window.removeEventListener("keydown", key);
    }, [onClose]);

    const v = { entry: num(draft.entry), exit: num(draft.exit), quantity: num(draft.quantity), leverage: num(draft.leverage), fee: draft.fee.trim() === "" ? 0 : num(draft.fee), opened: fromInput(draft.opened), closed: fromInput(draft.closed), reported: num(draft.reported) };
    const gross = (v.exit - v.entry) * v.quantity * (draft.direction === "Long" ? 1 : -1);
    const computed = gross - v.fee;
    const problems = useMemo(() => {
        const out: string[] = [];
        if (!/^[A-Za-z0-9]{2,15}$/.test(draft.instrument.trim())) out.push("Name the asset, for example BTC.");
        if (!(v.entry > 0)) out.push("Enter the entry price.");
        if (!(v.exit > 0)) out.push("Enter the exit price.");
        if (!(v.quantity > 0)) out.push("Enter the size, in units of the asset.");
        if (!(v.leverage >= 1)) out.push("Leverage is 1 or more.");
        if (!(v.fee >= 0)) out.push("Fees cannot be negative.");
        if (!Number.isFinite(v.closed)) out.push("Enter when the trade closed.");
        if (Number.isFinite(v.closed) && v.closed > Date.now() + 60000) out.push("The close cannot be in the future.");
        if (Number.isFinite(v.opened) && Number.isFinite(v.closed) && v.opened > v.closed) out.push("The trade must open before it closes.");
        if (draft.reported.trim() !== "" && !Number.isFinite(v.reported)) out.push("The reported result must be a number.");
        return out;
    }, [draft, v.entry, v.exit, v.quantity, v.leverage, v.fee, v.opened, v.closed, v.reported]);

    const save = () => {
        setTried(true);
        if (problems.length) return;
        const symbol = draft.instrument.trim().toUpperCase();
        const instrument = symbol.endsWith("USDT") ? symbol : `${symbol}USDT`;
        const useReported = Number.isFinite(v.reported);
        onSave({
            ...(trade ?? {}),
            id: trade?.id ?? `manual-${Date.now()}`,
            instrument,
            direction: draft.direction,
            entryPrice: v.entry,
            exitPrice: v.exit,
            quantity: v.quantity,
            leverage: v.leverage,
            positionSize: Math.round(v.entry * v.quantity * 100) / 100,
            fee: Math.round(v.fee * 100) / 100,
            profitLoss: Math.round((useReported ? v.reported : computed) * 100) / 100,
            pnlSource: useReported ? "exchange" : "computed",
            setup: draft.setup === "Continuation" || draft.setup === "Reversal" ? draft.setup : undefined,
            openedAt: Number.isFinite(v.opened) ? v.opened : undefined,
            closedAt: v.closed,
            source: trade?.source ?? "manual",
        });
    };

    const field = "!mt-1.5 !block !w-full !rounded-lg !border-0 !bg-[var(--j-s2)] !px-3 !py-2 !text-[14px] !text-[var(--j-ink)] placeholder:!text-[var(--j-fa)]";
    const label = "block text-[12.5px] text-[var(--j-mu)]";
    const money = (value: number) => `${value < 0 ? "−" : "+"}$${Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    return createPortal(
        <div style={colours} className="fixed inset-0 z-[130] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label={trade ? "Edit the trade" : "Add a trade"}>
            <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 cursor-default bg-black/60" />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    save();
                }}
                className="relative max-h-[100dvh] w-full overflow-y-auto rounded-t-2xl bg-[var(--j-s1)] p-6 text-[var(--j-ink)] shadow-2xl sm:max-w-[560px] sm:rounded-2xl"
            >
                <div className="flex items-baseline justify-between">
                    <p className="text-[17px] font-medium">{trade ? "Edit the trade" : "Add a trade"}</p>
                    <button type="button" onClick={onClose} className="text-[13px] text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                        Cancel
                    </button>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
                    <label className={label}>
                        Asset
                        <input value={draft.instrument} onChange={(e) => set({ instrument: e.target.value })} placeholder="BTC" className={field} />
                    </label>
                    <div className={label}>
                        Direction
                        <div className="mt-1.5 flex rounded-lg bg-[var(--j-s2)] p-1">
                            {(["Long", "Short"] as const).map((d) => (
                                <button key={d} type="button" aria-pressed={draft.direction === d} onClick={() => set({ direction: d })} className={`flex-1 rounded-md py-1.5 text-[13.5px] ${draft.direction === d ? "bg-[var(--j-s1)] text-[var(--j-ink)] shadow-sm" : "text-[var(--j-mu)]"}`}>
                                    {d}
                                </button>
                            ))}
                        </div>
                    </div>
                    <label className={label}>
                        Entry price
                        <input inputMode="decimal" value={draft.entry} onChange={(e) => set({ entry: e.target.value })} className={field} />
                    </label>
                    <label className={label}>
                        Exit price
                        <input inputMode="decimal" value={draft.exit} onChange={(e) => set({ exit: e.target.value })} className={field} />
                    </label>
                    <label className={label}>
                        Size (units of the asset)
                        <input inputMode="decimal" value={draft.quantity} onChange={(e) => set({ quantity: e.target.value })} placeholder="0.25" className={field} />
                    </label>
                    <label className={label}>
                        Leverage
                        <input inputMode="decimal" value={draft.leverage} onChange={(e) => set({ leverage: e.target.value })} className={field} />
                    </label>
                    <label className={label}>
                        Opened (UTC, optional)
                        <input type="datetime-local" value={draft.opened} onChange={(e) => set({ opened: e.target.value })} className={field} />
                    </label>
                    <label className={label}>
                        Closed (UTC)
                        <input type="datetime-local" value={draft.closed} onChange={(e) => set({ closed: e.target.value })} className={field} />
                    </label>
                    <label className={label}>
                        Fees paid ($)
                        <input inputMode="decimal" value={draft.fee} onChange={(e) => set({ fee: e.target.value })} placeholder="0" className={field} />
                    </label>
                    <label className={label}>
                        Setup (optional)
                        <select value={draft.setup} onChange={(e) => set({ setup: e.target.value })} className={field}>
                            <option value="">Not recorded</option>
                            <option value="Continuation">Continuation</option>
                            <option value="Reversal">Reversal</option>
                        </select>
                    </label>
                </div>

                <div className="mt-5 rounded-xl bg-[var(--j-s2)] p-4 text-[13.5px]">
                    <div className="flex justify-between">
                        <span className="text-[var(--j-mu)]">Net result, from the figures above</span>
                        <span className={`font-mono ${Number.isFinite(computed) ? (computed >= 0 ? "text-[var(--j-up)]" : "text-[var(--j-dn)]") : "text-[var(--j-fa)]"}`}>{Number.isFinite(computed) ? money(computed) : "–"}</span>
                    </div>
                    <label className="mt-3 block text-[12.5px] text-[var(--j-mu)]">
                        Result reported by your exchange (optional, replaces the figure above)
                        <input inputMode="decimal" value={draft.reported} onChange={(e) => set({ reported: e.target.value })} placeholder="e.g. 412.30 or -95" className="!mt-1.5 !block !w-full !rounded-lg !border-0 !bg-[var(--j-s1)] !px-3 !py-2 !text-[14px] !text-[var(--j-ink)] placeholder:!text-[var(--j-fa)]" />
                    </label>
                </div>

                {tried && problems.length > 0 && (
                    <ul className="mt-4 space-y-1 text-[13px] text-[var(--j-dn)]" role="alert">
                        {problems.map((p) => (
                            <li key={p}>{p}</li>
                        ))}
                    </ul>
                )}
                <button type="submit" className="mt-5 w-full rounded-xl bg-[var(--j-active)] py-3 text-[14px] font-medium text-[var(--j-activeink)]">
                    {trade ? "Save the changes" : "Add to the journal"}
                </button>
                <p className="mt-3 text-center text-[12px] text-[var(--j-fa)]">Saved in this browser with the rest of your journal.</p>
            </form>
        </div>,
        document.body
    );
};

export default TradeForm;
