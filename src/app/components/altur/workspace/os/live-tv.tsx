"use client";

import { useEffect, useState } from "react";

// Bloomberg Television's own live stream, in YouTube's player. The channel
// address always plays whatever Bloomberg has live, so the panel does not need
// updating when their stream restarts. It starts muted, and the trader's choice
// to show or hide it is remembered in this browser.

const CHANNEL = "UCIALMKvObZNtJ6AmdCLP7Lg";
const KEY = "alturelock:live-tv";

const LiveTV = () => {
    const [on, setOn] = useState(true);
    useEffect(() => {
        try {
            if (window.localStorage.getItem(KEY) === "off") setOn(false);
        } catch {
            // storage refused: the panel simply starts shown
        }
    }, []);
    const toggle = () => {
        const next = !on;
        setOn(next);
        try {
            window.localStorage.setItem(KEY, next ? "on" : "off");
        } catch {
            // nothing to keep
        }
    };
    return (
        <div className="flex-shrink-0 border-b border-white/10 px-4 pb-4 pt-3">
            <div className="flex items-center justify-between gap-3">
                <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/45">
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-[#E955A8]" aria-hidden="true" />}
                    Bloomberg · Live TV
                </p>
                <button type="button" onClick={toggle} aria-pressed={on} className="text-xs text-white/50 transition-colors hover:text-white">
                    {on ? "Hide" : "Show"}
                </button>
            </div>
            {on && (
                <div className="mt-2.5 aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]">
                    <iframe
                        title="Bloomberg Television, live"
                        src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL}&autoplay=1&mute=1&playsinline=1&rel=0`}
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="h-full w-full"
                    />
                </div>
            )}
        </div>
    );
};

export default LiveTV;
