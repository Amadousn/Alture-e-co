"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
