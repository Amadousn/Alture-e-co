"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { ClosedTrade } from "@/utils/bybit";

type Props = {
    dateLabel: string;
    note: string;
    // Saves the text; an empty string or null removes the note.
    onSave: (text: string | null) => void;
    trades: ClosedTrade[];
    onOpenTrade: (trade: ClosedTrade) => void;
    onClose: () => void;
};

const signed = (value: number) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// One calendar date: its note, and the trades closed that day. The note
// belongs to the date, so it exists whether or not anything was traded.
const DayPanel = ({ dateLabel, note, onSave, trades, onOpenTrade, onClose }: Props) => {
    const [editing, setEditing] = useState(note === "");
    const [text, setText] = useState(note);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const total = trades.reduce((sum, trade) => sum + trade.profitLoss, 0);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    const save = () => {
        const trimmed = text.trim();
        onSave(trimmed === "" ? null : trimmed);
        setText(trimmed);
        setEditing(trimmed === "");
    };

    return createPortal(
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={dateLabel}>
            <button type="button" aria-label="Close" onClick={onClose} className="absolute inset-0 bg-black/80 cursor-default" />

            <div className="relative w-full sm:max-w-[520px] max-h-[100dvh] overflow-y-auto bg-black border border-white/15 sm:rounded-sm shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/15">
                    <p className="text-lg font-semibold tracking-tight text-white">{dateLabel}</p>
                    <button type="button" onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-sm text-[#9a9aa5] hover:text-white hover:bg-white/10 transition-colors text-xl leading-none">
                        ×
                    </button>
                </div>

                <div className="px-5 py-5 border-b border-white/15">
                    <div className="flex items-center justify-between gap-4 mb-3">
                        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">
                            {note !== "" && <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" aria-hidden="true" />}
                            Note for this day
                        </p>
                        {note !== "" && !editing && (
                            <div className="flex items-center gap-4 text-xs">
                                <button type="button" onClick={() => setEditing(true)} className="text-white border-b border-white/40 hover:border-white">
                                    Edit
                                </button>
                                {confirmDelete ? (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSave(null);
                                                setText("");
                                                setEditing(true);
                                                setConfirmDelete(false);
                                            }}
                                            className="text-[#E955A8] border-b border-[#E955A8]/50 hover:border-[#E955A8]"
                                        >
                                            Delete note
                                        </button>
                                        <button type="button" onClick={() => setConfirmDelete(false)} className="text-[#7d7d87] hover:text-white">
                                            Keep
                                        </button>
                                    </>
                                ) : (
                                    <button type="button" onClick={() => setConfirmDelete(true)} className="text-[#7d7d87] hover:text-[#E955A8] transition-colors">
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {editing ? (
                        <>
                            <textarea
                                autoFocus
                                rows={5}
                                aria-label="Note for this day"
                                placeholder="How was the day? What did you see, what did you do well, what would you change?"
                                value={text}
                                onChange={(event) => setText(event.target.value)}
                                className="!rounded-sm !bg-[#0c0c0c] !border-white/25 !text-sm !text-white px-3 py-2.5 focus:!border-white resize-y"
                            />
                            <div className="flex items-center gap-3 mt-3">
                                <button type="button" onClick={save} disabled={text.trim() === "" && note === ""} className="h-10 px-5 rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors disabled:opacity-30 disabled:hover:bg-white">
                                    {note === "" ? "Add note" : "Save note"}
                                </button>
                                {note !== "" && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setText(note);
                                            setEditing(false);
                                        }}
                                        className="text-xs text-[#7d7d87] hover:text-white"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <p className="text-[15px] leading-relaxed text-white whitespace-pre-wrap">{note}</p>
                    )}
                </div>

                <div className="px-5 py-5">
                    <div className="flex items-center justify-between gap-4 mb-3">
                        <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Trades closed this day</p>
                        {trades.length > 0 && <span className={`text-sm font-semibold tabular-nums ${total >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{signed(total)}</span>}
                    </div>
                    {trades.length === 0 ? (
                        <p className="text-sm text-[#7d7d87]">No trades closed on this day.</p>
                    ) : (
                        <ul className="rounded-sm border border-white/15 divide-y divide-white/15">
                            {trades.map((trade) => (
                                <li key={trade.id}>
                                    <button type="button" onClick={() => onOpenTrade(trade)} className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-[#0c0c0c] transition-colors">
                                        <span className="flex items-center gap-2.5">
                                            <span className="text-sm font-medium text-white">{trade.instrument}</span>
                                            <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm text-black ${trade.direction === "Long" ? "bg-[#20B8A8]" : "bg-[#E955A8]"}`}>{trade.direction}</span>
                                        </span>
                                        <span className={`text-sm tabular-nums ${trade.profitLoss >= 0 ? "text-[#20B8A8]" : "text-[#E955A8]"}`}>{signed(trade.profitLoss)}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default DayPanel;
