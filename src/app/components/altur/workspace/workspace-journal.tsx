"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import WorkspaceShell from "./workspace-shell";
import JournalStudio from "@/app/components/altur/journal/journal-studio";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import {
  useBacktests,
  useDailyNotes,
  useImports,
  useRecordedTrades,
} from "@/utils/workspace-store";
import { useSearchParams } from "next/navigation";

// How far back the calendar can be browsed.
const HISTORY_DAYS = 365;
const SYNC_DAYS = 90;

type Sync =
  | { status: "checking" }
  // Not signed in, or no exchange key configured: the journal simply runs
  // on the trades recorded in Rules.
  | { status: "off" }
  | { status: "error"; message: string }
  | {
      status: "on";
      env: "demo" | "live";
      trades: ClosedTrade[];
      positions: OpenPosition[];
    };

const WorkspaceJournal = () => {
  const [recorded, , tradesStore] = useRecordedTrades();
  const [notes, setNotes, notesStore] = useDailyNotes();
  const [imports, , importsStore] = useImports();
  const imported = useMemo(
    () => Object.values(imports).flatMap((item) => item.trades),
    [imports],
  );
  const importedPositions = useMemo(
    () => Object.values(imports).flatMap((item) => item.positions),
    [imports],
  );
  const [sync, setSync] = useState<Sync>({ status: "checking" });
  // The account shown: the trader's real trades, or the trades taken in backtesting. Never mixed.
  const [backtests, , backtestStore] = useBacktests();
  const params = useSearchParams();
  const [account, setAccount] = useState<"real" | "backtest">(
    params.get("account") === "backtest" ? "backtest" : "real",
  );
  const backtestTrades = useMemo(
    () =>
      backtests
        .flatMap((item) => item.trades)
        .sort((a, b) => b.closedAt - a.closedAt),
    [backtests],
  );

  // The exchange sync is optional and owner-only. Anything other than a
  // clean answer leaves the journal on its locally recorded trades.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/bybit/journal?days=${SYNC_DAYS}`, {
          cache: "no-store",
        });
        if (cancelled) return;
        if (res.status === 401 || res.status === 503)
          return setSync({ status: "off" });
        const json = await res.json();
        if (!res.ok)
          return setSync({
            status: "error",
            message: json.error ?? "The exchange sync failed.",
          });
        setSync({
          status: "on",
          env: json.env,
          trades: (json.trades as ClosedTrade[]).map((trade) => ({
            ...trade,
            source: "bybit",
          })),
          positions: json.positions,
        });
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
    const synced =
      imported.length === 0 && sync.status === "on" ? sync.trades : [];
    return [...recorded, ...imported, ...synced].sort(
      (a, b) => b.closedAt - a.closedAt,
    );
  }, [recorded, imported, sync]);

  const saveNote = (dateKey: string, text: string | null) =>
    setNotes((current) => {
      const next = { ...current };
      if (text === null) delete next[dateKey];
      else next[dateKey] = text;
      return next;
    });

  const ready =
    tradesStore.ready &&
    notesStore.ready &&
    importsStore.ready &&
    backtestStore.ready;
  const noteCount = Object.keys(notes).length;

  return (
    <WorkspaceShell width="full" themed>
      {!ready ? (
        <p className="text-sm text-[#7d7d87]">Loading your journal…</p>
      ) : (
        <>
          {sync.status === "error" && (
            <p className="rounded-sm border border-[#E955A8]/40 bg-[#E955A8]/10 px-4 py-3 text-sm text-white mb-6">
              Exchange sync: {sync.message} Your recorded trades below are
              unaffected.
            </p>
          )}

          <div
            className="mb-6 flex items-center gap-5 text-sm"
            role="tablist"
            aria-label="Account"
          >
            {(
              [
                ["real", "Trading account"],
                [
                  "backtest",
                  `Backtest${backtestTrades.length ? ` · ${backtestTrades.length}` : ""}`,
                ],
              ] as const
            ).map(([id, text]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={account === id}
                onClick={() => setAccount(id)}
                className={`border-b pb-0.5 transition-colors ${account === id ? "border-white text-white" : "border-transparent text-[#8a8a94] hover:text-white"}`}
              >
                {text}
              </button>
            ))}
          </div>

          {account === "backtest" ? (
            <JournalStudio
              key="backtest"
              reviewable
              trades={backtestTrades}
              positions={[]}
              notes={notes}
              onSaveNote={saveNote}
              status={
                <>
                  <span>
                    {backtestTrades.length} backtest{" "}
                    {backtestTrades.length === 1 ? "trade" : "trades"},
                    simulated on past Bybit candles
                  </span>
                  <span className="text-[#55555e]">·</span>
                  <Link
                    href="/alturelock/backtest"
                    className="text-white border-b border-white/30 hover:border-white"
                  >
                    Open Backtesting
                  </Link>
                </>
              }
            />
          ) : (
            <JournalStudio
              key="real"
              reviewable
              trades={trades}
              positions={
                importedPositions.length > 0
                  ? importedPositions
                  : imported.length === 0 && sync.status === "on"
                    ? sync.positions
                    : []
              }
              notes={notes}
              onSaveNote={saveNote}
              status={
                <>
                  <span>
                    {recorded.length}{" "}
                    {recorded.length === 1 ? "trade" : "trades"} recorded in
                    Rules
                  </span>
                  {imported.length > 0 && (
                    <>
                      <span className="text-[#55555e]">·</span>
                      <span>
                        {imported.length} imported from{" "}
                        <Link
                          href="/alturelock/connections"
                          className="text-white border-b border-white/30 hover:border-white"
                        >
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
          )}
        </>
      )}
    </WorkspaceShell>
  );
};

export default WorkspaceJournal;
