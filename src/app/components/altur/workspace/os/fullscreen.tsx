"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Real browser full screen for one panel. Where the browser does not allow it
// (iPhone Safari), `supported` is false and no control is shown.
export function useFullscreen<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    const [active, setActive] = useState(false);
    const [supported, setSupported] = useState(false);

    useEffect(() => {
        setSupported(Boolean(document.fullscreenEnabled));
        const sync = () => setActive(document.fullscreenElement === ref.current && ref.current !== null);
        document.addEventListener("fullscreenchange", sync);
        return () => document.removeEventListener("fullscreenchange", sync);
    }, []);

    const toggle = useCallback(() => {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        else ref.current?.requestFullscreen().catch(() => {});
    }, []);

    return { ref, active, supported, toggle };
}

export const FullscreenButton = ({ active, onClick }: { active: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} aria-pressed={active} className="inline-flex h-9 items-center gap-2 rounded-sm border border-white/25 px-3.5 text-xs font-medium text-white hover:bg-white/10 transition-colors">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            {active ? <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" /> : <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />}
        </svg>
        {active ? "Exit full screen" : "Full screen"}
    </button>
);
