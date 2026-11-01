"use client";

import { useState } from "react";
import type { ClosedTrade } from "@/utils/bybit";
import { useImports } from "@/utils/workspace-store";
import { mergeTrades } from "@/integrations/bybit/positions.ts";
import { parseMt5, rowsFromHtml, type FileImport as Parsed } from "@/integrations/files/mt5.ts";
import { parseIbkr } from "@/integrations/files/ibkr.ts";

// Imports a platform's own history file into the journal: MetaTrader 5's HTML
// report, or Interactive Brokers' Activity Statement CSV. The file is read in
// this browser and never sent anywhere.

const SOURCES = {
    metatrader5: { name: "MetaTrader 5", accept: ".htm,.html", how: "In MetaTrader 5, open the History tab, choose Positions, set the period, then right-click → Report → HTML." },
    ibkr: { name: "Interactive Brokers", accept: ".csv", how: "In the IBKR Portal: Performance & Reports → Statements → Activity, choose the period, and download it as CSV. Stocks, ETFs and forex are imported." },
} as const;
type Source = keyof typeof SOURCES;

// MT5 writes its HTML report in UTF-16.
const readText = async (file: File) => {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const utf16 = bytes[0] === 0xff && bytes[1] === 0xfe;
    return new TextDecoder(utf16 ? "utf-16le" : "utf-8").decode(bytes);
};

const FileImport = ({ onClose }: { onClose: () => void }) => {
    const [source, setSource] = useState<Source>("metatrader5");
    const [parsed, setParsed] = useState<Parsed | null>(null);
    const [error, setError] = useState("");
    const [done, setDone] = useState<number | null>(null);
    const [, setImports] = useImports();

    const read = async (file: File | undefined) => {
        setParsed(null);
        setError("");
        if (!file) return;
        try {
            const text = await readText(file);
            const result = source === "metatrader5" ? parseMt5(rowsFromHtml(text)) : parseIbkr(text);
            if (!result.trades.length) throw new Error("No closed trade was found in this file for the period it covers.");
            setParsed(result);
        } catch (e) {
            setError(e instanceof Error ? e.message : "This file could not be read.");
        }
    };

    const save = () => {
        if (!parsed) return;
        const incoming = parsed.trades.map((t) => ({ ...t, source, provider: source })) as unknown as ClosedTrade[];
        setImports((current) => {
            const held = current[source];
            return { ...current, [source]: { trades: mergeTrades(held?.trades ?? [], incoming), positions: [], lastSyncAt: Date.now(), openSince: null } };
        });
        setDone(incoming.length);
    };

    const total = parsed?.trades.reduce((s, t) => s + t.profitLoss, 0) ?? 0;
    const box = "rounded-[var(--j-radius,12px)] bg-[var(--j-s1)] text-[var(--j-ink)] shadow-[var(--j-shadow)]";

    return (
        <div role="dialog" aria-label="Import a file" className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={onClose}>
            <div className={`${box} w-full max-w-lg p-6`} onClick={(e) => e.stopPropagation()}>
                <p className="text-[17px] font-medium">Import a file</p>
                <p className="mt-1 text-[13px] text-[var(--j-mu)]">The file is read in this browser. Nothing is uploaded.</p>

                {done !== null ? (
                    <>
                        <p className="mt-6 text-[15px]">
                            {done} {done === 1 ? "trade" : "trades"} from {SOURCES[source].name} are now in your journal.
                        </p>
                        <p className="mt-2 text-[13px] text-[var(--j-mu)]">Importing the same file again replaces them, it never doubles them.</p>
                        <button type="button" onClick={onClose} className="mt-6 rounded-lg bg-[var(--j-active)] px-4 py-2 text-[13px] text-[var(--j-activeink)]">
                            Done
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mt-5 grid grid-cols-2 gap-1 rounded-lg bg-[var(--j-s2)] p-1 text-[13px]" role="group" aria-label="Platform">
                            {(Object.keys(SOURCES) as Source[]).map((id) => (
                                <button key={id} type="button" aria-pressed={source === id} onClick={() => { setSource(id); setParsed(null); setError(""); }} className={`rounded-md py-1.5 transition-colors ${source === id ? "bg-[var(--j-active)] text-[var(--j-activeink)]" : "text-[var(--j-mu)] hover:text-[var(--j-ink)]"}`}>
                                    {SOURCES[id].name}
                                </button>
                            ))}
                        </div>
                        <p className="mt-4 text-[13px] leading-relaxed text-[var(--j-mu)]">{SOURCES[source].how}</p>
                        <label className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-[var(--j-line)] px-4 py-7 text-center text-[13px] text-[var(--j-mu)] transition-colors hover:border-[var(--j-mu)]">
                            <span className="text-lg leading-none">+</span>
                            Choose the {source === "metatrader5" ? "HTML report" : "CSV statement"}
                            <input key={source} type="file" accept={SOURCES[source].accept} hidden onChange={(e) => read(e.target.files?.[0])} />
                        </label>

                        {error && <p className="mt-3 text-[13px] text-[var(--j-dn)]">{error}</p>}
                        {parsed && (
                            <div className="mt-4 rounded-lg bg-[var(--j-s2)] p-4 text-[13px]">
                                <p>
                                    {parsed.trades.length} closed {parsed.trades.length === 1 ? "trade" : "trades"} found · net{" "}
                                    <span className={total >= 0 ? "text-[var(--j-up)]" : "text-[var(--j-dn)]"}>
                                        {total >= 0 ? "+" : "−"}
                                        {Math.abs(total).toLocaleString("en-US", { maximumFractionDigits: 2 })} {parsed.currency ?? ""}
                                    </span>
                                </p>
                                {parsed.skipped > 0 && <p className="mt-1 text-[var(--j-mu)]">{parsed.skipped} {parsed.skipped === 1 ? "row was" : "rows were"} set aside (deposits, options, futures or unreadable lines).</p>}
                                {source === "metatrader5" && <p className="mt-1 text-[var(--j-mu)]">Times are your broker&apos;s server time. Sizes are in lots.</p>}
                            </div>
                        )}
                        <div className="mt-6 flex gap-2">
                            <button type="button" disabled={!parsed} onClick={save} className="rounded-lg bg-[var(--j-active)] px-4 py-2 text-[13px] text-[var(--j-activeink)] disabled:opacity-40">
                                Add to my journal
                            </button>
                            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-[13px] text-[var(--j-mu)] hover:text-[var(--j-ink)]">
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default FileImport;
