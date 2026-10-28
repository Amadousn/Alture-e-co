"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import JournalStudio from "@/app/components/altur/journal/journal-studio";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { useDailyNotes, useImports, useRecordedTrades } from "@/utils/workspace-store";

// How far back the calendar can be browsed.
const HISTORY_DAYS = 365;
const SYNC_DAYS = 90;

type Sync =
    | { status: "checking" }
    // Not signed in, or no exchange key configured: the journal simply runs
    // on the trades recorded in Rules.
    | { status: "off" }
    | { status: "error"; message: string }
    | { status: "on"; env: "demo" | "live"; trades: ClosedTrade[]; positions: OpenPosition[] };

const WorkspaceJournal = () => {
    const [recorded, , tradesStore] = useRecordedTrades();
    const [notes, setNotes, notesStore] = useDailyNotes();
    const [imports, , importsStore] = useImports();
    const imported = useMemo(() => Object.values(imports).flatMap((item) => item.trades), [imports]);
    const importedPositions = useMemo(() => Object.values(imports).flatMap((item) => item.positions), [imports]);
    const [sync, setSync] = useState<Sync>({ status: "checking" });

    // The exchange sync is optional and owner-only. Anything other than a
    // clean answer leaves the journal on its locally recorded trades.
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`/api/bybit/journal?days=${SYNC_DAYS}`, { cache: "no-store" });
                if (cancelled) return;
                if (res.status === 401 || res.status === 503) return setSync({ status: "off" });
                const json = await res.json();
                if (!res.ok) return setSync({ status: "error", message: json.error ?? "The exchange sync failed." });
                setSync({ status: "on", env: json.env, trades: (json.trades as ClosedTrade[]).map((trade) => ({ ...trade, source: "bybit" })), positions: json.positions });
            } catch {
                if (!cancelled) setSync({ status: "off" });
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const trades = useMemo(() => {
        // The owner-only server sync is ignored once a connection has imported trades, so nothing is counted twice.
        const synced = imported.length === 0 && sync.status === "on" ? sync.trades : [];
        return [...recorded, ...imported, ...synced].sort((a, b) => b.closedAt - a.closedAt);
    }, [recorded, imported, sync]);

    const saveNote = (dateKey: string, text: string | null) =>
        setNotes((current) => {
            const next = { ...current };
            if (text === null) delete next[dateKey];
            else next[dateKey] = text;
            return next;
        });

    const ready = tradesStore.ready && notesStore.ready && importsStore.ready;
    const noteCount = Object.keys(notes).length;

    return (
        <WorkspaceShell width="full" themed>
            {!ready ? (
                <p className="text-sm text-[#7d7d87]">Loading your journal…</p>
            ) : (
                <>
                    {sync.status === "error" && (
                        <p className="rounded-sm border border-[#E955A8]/40 bg-[#E955A8]/10 px-4 py-3 text-sm text-white mb-6">
                            Exchange sync: {sync.message} Your recorded trades below are unaffected.
                        </p>
                    )}

                    {trades.length === 0 && (
                        <div className="rounded-sm border border-white/15 bg-black p-6 md:p-8 mb-6">
                            <p className="text-xl font-semibold tracking-tight text-white mb-2">No trades yet.</p>
                            <p className="text-sm text-[#9a9aa5] max-w-xl mb-5">
                                Take a trade through Rules and it lands here when you review it, with its result, setup and your reflection. You can already keep a note for any day on the calendar below.
                            </p>
                            <Link href="/alturelock/rules" className="h-11 px-6 inline-flex items-center rounded-sm bg-white text-black text-sm font-semibold hover:bg-[#e4e4e8] transition-colors">
                                Start in Rules
                            </Link>
                        </div>
                    )}

                    <JournalStudio
                        reviewable
                        trades={trades}
                        positions={importedPositions.length > 0 ? importedPositions : imported.length === 0 && sync.status === "on" ? sync.positions : []}
                        notes={notes}
                        onSaveNote={saveNote}
                        status={
                            <>
                                <span>
                                    {recorded.length} {recorded.length === 1 ? "trade" : "trades"} recorded in Rules
                                </span>
                                {imported.length > 0 && (
                                    <>
                                        <span className="text-[#55555e]">·</span>
                                        <span>
                                            {imported.length} imported from{" "}
                                            <Link href="/alturelock/connections" className="text-white border-b border-white/30 hover:border-white">
                                                connections
                                            </Link>
                                        </span>
                                    </>
                                )}
                                {imported.length === 0 && sync.status === "on" && (
                                    <>
                                        <span className="text-[#55555e]">·</span>
                                        <span>
                                            {sync.trades.length} synced from Bybit ({sync.env})
                                        </span>
                                    </>
                                )}
                                <span className="text-[#55555e]">·</span>
                                <span>
                                    {noteCount} {noteCount === 1 ? "note" : "notes"}
                                </span>
                                <span className="text-[#55555e]">·</span>
                                <span>Saved in this browser</span>
                            </>
                        }
                    />
                </>
            )}
        </WorkspaceShell>
    );
};

export default WorkspaceJournal;
