"use client";

import { useCallback, useEffect, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";
import { useImports } from "@/utils/workspace-store";
import { mergeTrades } from "./bybit/positions.ts";
import type { ConnectionStatus, ConnectionSummary, ProviderId, SyncFailure } from "./types";

// A sync re-reads a little before the last one, so nothing at the boundary is missed.
const OVERLAP_MS = 60 * 60 * 1000;

export type Connection = {
    // False until the server has answered once.
    ready: boolean;
    // False when this site has not switched connections on.
    available: boolean;
    status: ConnectionStatus;
    summary: ConnectionSummary | null;
    failure: SyncFailure | null;
    lastSyncAt: number | null;
    tradeCount: number;
    // What the last sync brought in during this visit.
    lastResult: { added: number; executions: number } | null;
    connect: (input: Record<string, string>) => Promise<boolean>;
    sync: () => Promise<void>;
    disconnect: (removeTrades: boolean) => Promise<void>;
};

// One provider's connection, as the server reports it. Nothing here is
// assumed: "connected" follows a successful check with the provider, and
// "synced" follows trade data actually arriving.
export function useConnection(provider: ProviderId): Connection {
    const [imports, setImports, store] = useImports();
    const [ready, setReady] = useState(false);
    const [available, setAvailable] = useState(true);
    const [summary, setSummary] = useState<ConnectionSummary | null>(null);
    const [busy, setBusy] = useState<"connecting" | "syncing" | null>(null);
    const [failure, setFailure] = useState<SyncFailure | null>(null);
    const [lastResult, setLastResult] = useState<Connection["lastResult"]>(null);
    const held = imports[provider];

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/integrations/${provider}`, { cache: "no-store" })
            .then((res) => res.json())
            .then((json) => {
                if (cancelled) return;
                setAvailable(json.available !== false);
                setSummary(json.connected ? json.summary : null);
            })
            .catch(() => {})
            .finally(() => !cancelled && setReady(true));
        return () => {
            cancelled = true;
        };
    }, [provider]);

    const sync = useCallback(async () => {
        setBusy("syncing");
        setFailure(null);
        try {
            const since = held?.lastSyncAt ? Math.min(held.lastSyncAt - OVERLAP_MS, held.openSince ?? Infinity) : 0;
            const res = await fetch(`/api/integrations/${provider}/sync`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ since }) });
            const json = await res.json();
            if (!res.ok) {
                setFailure(json.failure ?? { message: json.error ?? "The sync failed.", retryable: true, reconnect: false });
                if (json.failure?.reconnect && res.status === 401 && json.error === "Not connected.") setSummary(null);
                return;
            }
            const incoming = json.trades as ClosedTrade[];
            setImports((current) => {
                const before = current[provider]?.trades ?? [];
                const merged = mergeTrades(before, incoming);
                setLastResult({ added: merged.length - before.length, executions: json.executions });
                return { ...current, [provider]: { trades: merged, positions: json.positions as OpenPosition[], lastSyncAt: json.syncedAt, openSince: json.openSince } };
            });
        } catch {
            setFailure({ message: "The sync could not reach AltureLock. Check your connection and try again.", retryable: true, reconnect: false });
        } finally {
            setBusy(null);
        }
    }, [provider, held?.lastSyncAt, held?.openSince, setImports]);

    const connect = useCallback(
        async (input: Record<string, string>) => {
            setBusy("connecting");
            setFailure(null);
            try {
                const res = await fetch(`/api/integrations/${provider}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
                const json = await res.json();
                if (!res.ok) {
                    setFailure(json.failure ?? { message: json.error ?? "The connection could not be made.", retryable: true, reconnect: true });
                    return false;
                }
                setSummary(json.summary);
                return true;
            } catch {
                setFailure({ message: "AltureLock could not be reached. Check your connection and try again.", retryable: true, reconnect: true });
                return false;
            } finally {
                setBusy(null);
            }
        },
        [provider]
    );

    const disconnect = useCallback(
        async (removeTrades: boolean) => {
            await fetch(`/api/integrations/${provider}`, { method: "DELETE" }).catch(() => {});
            setSummary(null);
            setFailure(null);
            setLastResult(null);
            setImports((current) => {
                const next = { ...current };
                if (removeTrades) delete next[provider];
                // Open positions are a live reading; without a connection they would go stale.
                else if (next[provider]) next[provider] = { ...next[provider], positions: [] };
                return next;
            });
        },
        [provider, setImports]
    );

    const status: ConnectionStatus = busy ?? (!summary ? "not-connected" : failure ? "sync-failed" : held?.lastSyncAt ? "synced" : "connected");

    return { ready: ready && store.ready, available, status, summary, failure, lastSyncAt: held?.lastSyncAt ?? null, tradeCount: held?.trades.length ?? 0, lastResult, connect, sync, disconnect };
}
