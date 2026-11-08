"use client";

import { useEffect, useRef, useState } from "react";

// Bloomberg Television's own live stream, in YouTube's player. The channel
// address always plays whatever Bloomberg has live, so the panel does not need
// updating when their stream restarts. It starts muted, the sound is turned on
// with our own button through YouTube's player commands, and the trader's choice
// to show or hide it is remembered in this browser.

const CHANNEL = "UCIALMKvObZNtJ6AmdCLP7Lg";
const KEY = "alturelock:live-tv";

const LiveTV = () => {
  const [on, setOn] = useState(true);
  // The player is heavy: it waits until the chart and prices have loaded first.
  const [ready, setReady] = useState(false);
  const [sound, setSound] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);
  const command = (func: string, args: unknown[] = []) =>
    player.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "https://www.youtube.com");
  const toggleSound = () => {
    const next = !sound;
    command(next ? "unMute" : "mute");
    if (next) {
      command("setVolume", [100]);
      command("playVideo");
    }
    setSound(next);
  };
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);
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
    setSound(false);
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
          {on && (
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#F48FB1]"
              aria-hidden="true"
            />
          )}
          Bloomberg · Live TV
        </p>
        <span className="flex items-center gap-3">
          {on && ready && (
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={sound}
              className={`text-xs transition-colors hover:text-white ${sound ? "text-white" : "text-white/50"}`}
            >
              {sound ? "Sound on" : "Sound off"}
            </button>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={on}
            className="text-xs text-white/50 transition-colors hover:text-white"
          >
            {on ? "Hide" : "Show"}
          </button>
        </span>
      </div>
      {on && (
        <div className="mt-2.5 aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-[#0a0a0a]">
          {ready && (
            <iframe
              ref={player}
              title="Bloomberg Television, live"
              src={`https://www.youtube.com/embed/live_stream?channel=${CHANNEL}&autoplay=1&mute=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LiveTV;
