"use client";

// The AltureLock workspace keeps everything in the visitor's own browser.
// There is no server copy: each of the four stores below is one localStorage
// key, and the hooks keep every open tab and component in step.

import { useCallback, useEffect, useRef, useState } from "react";
import type { ClosedTrade, OpenPosition } from "@/utils/bybit";

export type ChecklistItem = { id: string; label: string; required: boolean };

// The trader's own stopping rules for a day. Empty means no limit is set.
export type DayLimits = { maxTrades?: number; maxLosses?: number };

export type WorkspaceSettings = { name: string; checklist: ChecklistItem[]; limits?: DayLimits };

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
    { id: "context", label: "Higher-timeframe context checked", required: true },
    { id: "setup", label: "Trading setup confirmed", required: true },
    { id: "entry", label: "Entry conditions met", required: true },
    { id: "stop", label: "Stop loss defined", required: true },
    { id: "target", label: "Take profit defined", required: true },
    { id: "risk", label: "Risk and position size calculated", required: true },
    { id: "conditions", label: "Trading conditions valid", required: true },
];

export const DEFAULT_SETTINGS: WorkspaceSettings = { name: "Diva", checklist: DEFAULT_CHECKLIST };

// "manage" is only found on trades saved by the first version of the
// workflow; it is read as "execute" (see normaliseActiveTrade).
export type RulesStage = "prepare" | "execute" | "manage" | "review";

export type TradePlan = {
    instrument: string;
    direction: "Long" | "Short";
    setup: "" | "Continuation" | "Reversal";
    plannedEntry: string;
    actualEntry: string;
    stopLoss: string;
    takeProfit: string;
    quantity: string;
    leverage: string;
    // What the trader is prepared to lose if the stop is hit, in USD.
    riskAmount?: string;
    // "risk" (default) sizes the position from riskAmount; "manual" leaves quantity as typed.
    sizeMode?: "risk" | "manual";
};

// The one trade currently moving through the Rules workflow, if any.
export type ActiveTrade = {
    stage: RulesStage;
    checks: Record<string, boolean>;
    plan: TradePlan;
    openedAt: number | null;
    // Answers to the Manage questions; null until the trader has answered.
    answers: Record<string, boolean | null>;
    // A price the trader typed in themselves. Never fetched.
    manualPrice: string;
    manualPriceAt: number | null;
    // Where the trader is in the guided Prepare sequence, and how far they have been.
    step?: number;
    reached?: number;
    version?: 2;
    // What the trader did with this trade, and when: the record kept for review.
    events?: TradeEvent[];
};

export type TradeEvent = { at: number; text: string };

export const EMPTY_PLAN: TradePlan = {
    instrument: "",
    direction: "Long",
    setup: "",
    plannedEntry: "",
    actualEntry: "",
    stopLoss: "",
    takeProfit: "",
    quantity: "",
    leverage: "",
};

export const NEW_ACTIVE_TRADE: ActiveTrade = {
    stage: "prepare",
    checks: {},
    plan: EMPTY_PLAN,
    openedAt: null,
    answers: {},
    manualPrice: "",
    manualPriceAt: null,
    step: 0,
    reached: 0,
    version: 2,
};

// Trades saved by the first version of the workflow had a form stage called
// "execute" and a tracking stage called "manage". Map them onto today's stages.
export function normaliseActiveTrade(trade: ActiveTrade): ActiveTrade {
    if (trade.version === 2) return trade;
    const opened = trade.stage === "manage" || trade.stage === "review";
    return {
        ...trade,
        version: 2,
        stage: trade.stage === "manage" ? "execute" : trade.stage === "execute" ? "prepare" : trade.stage,
        step: trade.stage === "execute" ? 3 : 0,
        reached: trade.stage === "prepare" ? 0 : 4,
        plan: { ...trade.plan, sizeMode: "manual", plannedEntry: trade.plan.plannedEntry || (opened ? "" : trade.plan.actualEntry), actualEntry: opened ? trade.plan.actualEntry : "" },
    };
}

// Daily notes, keyed by calendar date as YYYY-MM-DD.
export type DailyNotes = Record<string, string>;

const KEYS = {
    settings: "alturelock:settings",
    active: "alturelock:active-trade",
    trades: "alturelock:trades",
    notes: "alturelock:notes",
    imports: "alturelock:imports",
    watchlist: "alturelock:watchlist",
    timezone: "alturelock:timezone",
} as const;

const CHANGE_EVENT = "alturelock:store-change";

type StoreState = {
    // False until the saved value has been read, so pages can show a loading state.
    ready: boolean;
    // False when the browser refuses storage: changes then last only for this visit.
    persistent: boolean;
};

function useStored<T>(key: string, initial: T): [T, (next: T | ((current: T) => T)) => void, StoreState] {
    const [value, setValue] = useState<T>(initial);
    const [state, setState] = useState<StoreState>({ ready: false, persistent: true });
    const latest = useRef<T>(initial);

    useEffect(() => {
        const read = () => {
            try {
                const raw = window.localStorage.getItem(key);
                const parsed = raw === null ? initial : (JSON.parse(raw) as T);
                latest.current = parsed;
                setValue(parsed);
                setState({ ready: true, persistent: true });
            } catch {
                setState({ ready: true, persistent: false });
            }
        };
        read();
        const onChange = (event: Event) => {
            if (event instanceof StorageEvent ? event.key === key : (event as CustomEvent<string>).detail === key) read();
        };
        window.addEventListener("storage", onChange);
        window.addEventListener(CHANGE_EVENT, onChange);
        return () => {
            window.removeEventListener("storage", onChange);
            window.removeEventListener(CHANGE_EVENT, onChange);
        };
        // `initial` is a constant for every caller below.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    const update = useCallback(
        (next: T | ((current: T) => T)) => {
            const resolved = typeof next === "function" ? (next as (current: T) => T)(latest.current) : next;
            latest.current = resolved;
            setValue(resolved);
            try {
                window.localStorage.setItem(key, JSON.stringify(resolved));
                window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
            } catch {
                setState({ ready: true, persistent: false });
            }
        },
        [key]
    );

    return [value, update, state];
}

export const useWorkspaceSettings = () => useStored<WorkspaceSettings>(KEYS.settings, DEFAULT_SETTINGS);
export const useActiveTrade = () => useStored<ActiveTrade | null>(KEYS.active, null);
export const useRecordedTrades = () => useStored<ClosedTrade[]>(KEYS.trades, []);
export const useDailyNotes = () => useStored<DailyNotes>(KEYS.notes, {});

// Trades imported through a connection, kept apart from trades recorded in
// Rules so that disconnecting can remove exactly what was imported.
export type ProviderImport = {
    trades: ClosedTrade[];
    positions: OpenPosition[];
    // When the last successful sync finished. Null until one has.
    lastSyncAt: number | null;
    // The oldest position still open at that sync: the next one must reach back at least this far.
    openSince: number | null;
};
export type Imports = Record<string, ProviderImport>;

export const useImports = () => useStored<Imports>(KEYS.imports, {});

// The instruments the trader follows, in their own order. A starting list the
// trader can change; prices always come from the market feed, never from here.
export const DEFAULT_WATCHLIST = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "XRPUSDT", "HYPEUSDT"];
export const useWatchlist = () => useStored<string[]>(KEYS.watchlist, DEFAULT_WATCHLIST);

// The timezone sessions and times are shown in. "local" follows the device.
export const useTimezone = () => useStored<string>(KEYS.timezone, "Asia/Dubai");
