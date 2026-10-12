"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { START_BALANCE } from "@/utils/education-sim";

// What a learner has actually done in the Introduction, kept in this browser.
// Nothing here is filled in for them: a step is recorded when they finish it.
export type EducationProgress = {
    // Step id -> how many attempts it took (1 = right the first time; films and explorations count as 1).
    done: Record<string, number>;
    // Where they last were.
    lesson: number;
    step: number;
    // When this browser first and last opened the dashboard or a lesson.
    firstAt: number | null;
    lastAt: number | null;
};

const KEY = "alture-learning:v1";
const EVENT = "alture-learning:change";
const EMPTY: EducationProgress = { done: {}, lesson: 0, step: 0, firstAt: null, lastAt: null };

export function useEducationProgress() {
    const [progress, setProgress] = useState<EducationProgress>(EMPTY);
    const [ready, setReady] = useState(false);
    // Whether this browser had been here before this visit began.
    const [returning, setReturning] = useState(false);
    const latest = useRef<EducationProgress>(EMPTY);

    useEffect(() => {
        const read = () => {
            try {
                const raw = window.localStorage.getItem(KEY);
                latest.current = raw ? { ...EMPTY, ...(JSON.parse(raw) as EducationProgress) } : EMPTY;
            } catch {
                latest.current = EMPTY;
            }
            setProgress(latest.current);
        };
        read();
        setReturning(latest.current.firstAt !== null);
        setReady(true);
        window.addEventListener("storage", read);
        window.addEventListener(EVENT, read);
        return () => {
            window.removeEventListener("storage", read);
            window.removeEventListener(EVENT, read);
        };
    }, []);

    const update = useCallback((change: (current: EducationProgress) => EducationProgress) => {
        const next = change(latest.current);
        if (next === latest.current) return;
        latest.current = next;
        setProgress(next);
        try {
            window.localStorage.setItem(KEY, JSON.stringify(next));
            window.dispatchEvent(new Event(EVENT));
        } catch {
            // Storage refused: progress lasts for this visit only.
        }
    }, []);

    // Called once when the dashboard or a lesson opens.
    const visit = useCallback(() => update((current) => ({ ...current, firstAt: current.firstAt ?? Date.now(), lastAt: Date.now() })), [update]);
    const complete = useCallback((id: string, tries: number) => update((current) => (current.done[id] ? current : { ...current, done: { ...current.done, [id]: Math.max(1, tries) }, lastAt: Date.now() })), [update]);
    const goTo = useCallback((lesson: number, step: number) => update((current) => (current.lesson === lesson && current.step === step ? current : { ...current, lesson, step })), [update]);
    const reset = useCallback(() => update((current) => ({ ...EMPTY, firstAt: current.firstAt, lastAt: Date.now() })), [update]);

    return { progress, ready, returning, visit, complete, goTo, reset };
}

// ---- The simulated trade and the practice journal. Everything in it comes from the learner's own choices.
export type PracticeTrade = {
    id: string;
    at: number;
    scenario: string;
    // When the chart's candles traded, e.g. "6 Sep 2026".
    when: string;
    side: "long" | "short" | "out";
    entry: number | null;
    stop: number | null;
    target: number | null;
    result: "target" | "stop" | "liquidated" | "open" | "unfilled" | "out";
    exit: number | null;
    size: number;
    gross: number;
    fees: number;
    net: number;
    r: number;
    // The part of the practice account put into the trade, the leverage on it, and the result as a share of that part.
    margin: number;
    leverage: number;
    roi: number;
    // How many minutes after the decision the trade ended.
    minutes: number | null;
    // What price did over the candles that followed: the last close, the highest and the lowest.
    after: { from: number; end: number; high: number; low: number };
};
export type JournalEntry = PracticeTrade & { reason: string; again: string; note: string };
// The practice account: virtual dollars that every finished simulated trade adds to or takes from.
export type PracticeAccount = { balance: number; trades: number; wins: number };
type Practice = { last: PracticeTrade | null; journal: JournalEntry[]; account: PracticeAccount };

// v2: trades carry a margin and a leverage, and there is a practice account.
const PRACTICE_KEY = "alture-learning:practice:v2";
const PRACTICE_EVENT = "alture-learning:practice";
const NO_PRACTICE: Practice = { last: null, journal: [], account: { balance: START_BALANCE, trades: 0, wins: 0 } };

export function usePractice() {
    const [practice, setPractice] = useState<Practice>(NO_PRACTICE);
    const [ready, setReady] = useState(false);
    const latest = useRef<Practice>(NO_PRACTICE);

    useEffect(() => {
        const read = () => {
            try {
                const raw = window.localStorage.getItem(PRACTICE_KEY);
                latest.current = raw ? { ...NO_PRACTICE, ...(JSON.parse(raw) as Practice) } : NO_PRACTICE;
            } catch {
                latest.current = NO_PRACTICE;
            }
            setPractice(latest.current);
        };
        read();
        setReady(true);
        window.addEventListener("storage", read);
        window.addEventListener(PRACTICE_EVENT, read);
        return () => {
            window.removeEventListener("storage", read);
            window.removeEventListener(PRACTICE_EVENT, read);
        };
    }, []);

    const update = useCallback((change: (current: Practice) => Practice) => {
        latest.current = change(latest.current);
        setPractice(latest.current);
        try {
            window.localStorage.setItem(PRACTICE_KEY, JSON.stringify(latest.current));
            window.dispatchEvent(new Event(PRACTICE_EVENT));
        } catch {
            // Storage refused: the journal lasts for this visit only.
        }
    }, []);

    // A finished trade becomes the one under review, and its result goes to the practice account. Staying out, or an order never filled, changes nothing.
    const setLast = useCallback(
        (trade: PracticeTrade) =>
            update((current) => {
                const traded = trade.side !== "out" && trade.result !== "unfilled";
                const account = traded ? { balance: Math.max(0, current.account.balance + trade.net), trades: current.account.trades + 1, wins: current.account.wins + (trade.net > 0 ? 1 : 0) } : current.account;
                return { ...current, last: trade, account };
            }),
        [update]
    );
    const refill = useCallback(() => update((current) => ({ ...current, account: NO_PRACTICE.account })), [update]);
    const record = useCallback((entry: JournalEntry) => update((current) => ({ ...current, journal: [entry, ...current.journal.filter((item) => item.id !== entry.id)] })), [update]);
    const clear = useCallback(() => update(() => NO_PRACTICE), [update]);
    return { practice, ready, setLast, record, clear, refill };
}
