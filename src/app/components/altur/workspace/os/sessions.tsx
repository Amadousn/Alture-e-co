"use client";

import { useEffect, useMemo, useState } from "react";
import { useTimezone } from "@/utils/workspace-store";

// The main cash session of each centre, in its own local time. Daylight
// saving is handled by the browser's timezone data, never by fixed offsets.
// Public holidays are not known here.
const SESSIONS = [
    { id: "asia", name: "Asia", venue: "Tokyo", zone: "Asia/Tokyo", open: [9, 0], close: [15, 30] },
    { id: "london", name: "London", venue: "London", zone: "Europe/London", open: [8, 0], close: [16, 30] },
    { id: "paris", name: "Paris", venue: "Paris", zone: "Europe/Paris", open: [9, 0], close: [17, 30] },
    { id: "newyork", name: "New York", venue: "New York", zone: "America/New_York", open: [9, 30], close: [16, 0] },
] as const;

export const TIMEZONES = [
    { id: "Asia/Dubai", label: "Dubai" },
    { id: "local", label: "My device" },
    { id: "UTC", label: "UTC" },
    { id: "Europe/London", label: "London" },
    { id: "Europe/Paris", label: "Paris" },
    { id: "America/New_York", label: "New York" },
    { id: "Asia/Tokyo", label: "Tokyo" },
    { id: "Asia/Singapore", label: "Singapore" },
];

const MINUTE = 60000;
const resolve = (zone: string) => (zone === "local" ? Intl.DateTimeFormat().resolvedOptions().timeZone : zone);

// Wall-clock parts of an instant in a timezone.
function parts(time: number, zone: string) {
    const out: Record<string, string> = {};
    for (const part of new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(time)) out[part.type] = part.value;
    return { weekday: out.weekday, minutes: Number(out.hour) * 60 + Number(out.minute) };
}

type State = { open: boolean; changesAt: number; soon: boolean; intervals: [number, number][] };

// Walks minute by minute through the window, so every opening and closing
// lands on the right instant whatever the daylight-saving rules are.
function schedule(session: (typeof SESSIONS)[number], from: number, to: number) {
    const openAt = session.open[0] * 60 + session.open[1];
    const closeAt = session.close[0] * 60 + session.close[1];
    const isOpen = (time: number) => {
        const { weekday, minutes } = parts(time, session.zone);
        return weekday !== "Sat" && weekday !== "Sun" && minutes >= openAt && minutes < closeAt;
    };
    const intervals: [number, number][] = [];
    let start: number | null = null;
    for (let time = from; time <= to; time += MINUTE) {
        const open = isOpen(time);
        if (open && start === null) start = time;
        if (!open && start !== null) {
            intervals.push([start, time]);
            start = null;
        }
    }
    if (start !== null) intervals.push([start, to]);
    return { isOpen, intervals };
}

const clock = (time: number, zone: string) => new Intl.DateTimeFormat("en-GB", { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(time);
const countdown = (ms: number) => {
    const minutes = Math.max(0, Math.round(ms / MINUTE));
    const d = Math.floor(minutes / 1440);
    const h = Math.floor((minutes % 1440) / 60);
    return d > 0 ? `${d}d ${h}h` : h > 0 ? `${h}h ${String(minutes % 60).padStart(2, "0")}m` : `${minutes}m`;
};

const DAY = 24 * 60 * MINUTE;

// The four sessions as they stand now, in the trader's chosen timezone.
export function useSessions() {
    const [stored, setZone, store] = useTimezone();
    const [now, setNow] = useState<number | null>(null);
    useEffect(() => {
        const tick = () => setNow(Math.floor(Date.now() / MINUTE) * MINUTE);
        tick();
        const id = setInterval(tick, 20000);
        return () => clearInterval(id);
    }, []);

    const zone = resolve(stored);
    // The timeline runs from the start of today, in the chosen timezone, for 24 hours.
    const dayStart = now === null ? null : now - parts(now, zone).minutes * MINUTE;

    const rows = useMemo(() => {
        if (now === null || dayStart === null) return [];
        return SESSIONS.map((session) => {
            const ahead = schedule(session, now, now + 4 * DAY);
            const open = ahead.isOpen(now);
            // The first moment its state differs from now.
            const changesAt = open ? ahead.intervals[0]?.[1] ?? now : ahead.intervals[0]?.[0] ?? now;
            const today = schedule(session, dayStart, dayStart + DAY).intervals;
            const state: State = { open, changesAt, soon: !open && changesAt - now <= 60 * MINUTE, intervals: today };
            return { session, state, next: `${open ? "Closes" : "Opens"} in ${countdown(changesAt - now)}, at ${clock(changesAt, zone)}` };
        });
    }, [now, dayStart, zone]);

    return { rows, now, dayStart, zone, stored, setZone, ready: now !== null && dayStart !== null && store.ready };
}

const MarketSessions = ({ compact = false }: { compact?: boolean }) => {
    const { rows, now, dayStart, zone, stored, setZone, ready } = useSessions();

    if (now === null || dayStart === null || !ready) return <div className={compact ? "h-[132px]" : "h-[260px]"} aria-hidden="true" />;

    const openNow = rows.filter((row) => row.state.open).map((row) => row.session.name);
    const position = (time: number) => `${((time - dayStart) / DAY) * 100}%`;

    return (
        <div>
            <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                    Market sessions
                    <span className="ml-3 normal-case tracking-normal text-white/70">{openNow.length === 0 ? "None of the four is open" : openNow.length === 1 ? `${openNow[0]} is open` : `Overlap: ${openNow.join(" and ")}`}</span>
                </p>
                <label className="flex items-center gap-2 text-[11px] text-white/45">
                    Times in
                    <select value={stored} onChange={(event) => setZone(event.target.value)} className="!w-auto !rounded-sm !border-white/25 !bg-black !py-1 !pl-2 !pr-7 !text-xs !text-white">
                        {TIMEZONES.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <ul className={compact ? "grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5" : "space-y-0"}>
                {rows.map(({ session, state }) => {
                    const status = state.open ? "Open" : state.soon ? "Opens soon" : "Closed";
                    const tone = state.open ? "text-[#20B8A8]" : state.soon ? "text-[#FACC15]" : "text-white/45";
                    const hours = `${String(session.open[0]).padStart(2, "0")}:${String(session.open[1]).padStart(2, "0")} to ${String(session.close[0]).padStart(2, "0")}:${String(session.close[1]).padStart(2, "0")} ${session.venue} time`;
                    const next = `${state.open ? "Closes" : "Opens"} in ${countdown(state.changesAt - now)}, at ${clock(state.changesAt, zone)}`;
                    if (compact)
                        return (
                            <li key={session.id}>
                                <p className="flex items-baseline justify-between gap-3">
                                    <span className="text-lg font-medium tracking-tight text-white">{session.name}</span>
                                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] ${tone}`}>
                                        <span className={`h-1.5 w-1.5 rounded-full bg-current ${state.open ? "cockpit-pulse" : ""}`} aria-hidden="true" />
                                        {status}
                                    </span>
                                </p>
                                <div className="relative mt-2 h-1 bg-white/10" aria-hidden="true">
                                    {state.intervals.map(([from, to]) => (
                                        <span key={from} className={`absolute inset-y-0 ${state.open ? "bg-[#20B8A8]" : "bg-white/45"}`} style={{ left: position(from), width: `${((to - from) / DAY) * 100}%` }} />
                                    ))}
                                    <span className="absolute -inset-y-1 w-px bg-white" style={{ left: position(now) }} />
                                </div>
                                <p className="mt-2 text-xs tabular-nums text-white/55">{next}</p>
                            </li>
                        );
                    return (
                        <li key={session.id} className="grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_7.5rem_1fr_15rem] items-center gap-x-6 gap-y-2 border-t border-white/15 py-4">
                            <span className="text-lg font-medium tracking-tight text-white">{session.name}</span>
                            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] ${tone}`}>
                                <span className={`h-1.5 w-1.5 rounded-full bg-current ${state.open ? "cockpit-pulse" : ""}`} aria-hidden="true" />
                                {status}
                            </span>
                            <div className="relative col-span-2 md:col-span-1 h-1.5 bg-white/10" aria-hidden="true">
                                {state.intervals.map(([from, to]) => (
                                    <span key={from} className={`absolute inset-y-0 ${state.open ? "bg-[#20B8A8]" : "bg-white/45"}`} style={{ left: position(from), width: `${((to - from) / DAY) * 100}%` }} />
                                ))}
                                <span className="absolute -inset-y-1.5 w-px bg-white" style={{ left: position(now) }} />
                            </div>
                            <p className="col-span-2 md:col-span-1 text-xs tabular-nums text-white/55 md:text-right">
                                {next}
                                <span className="block text-white/35">{hours}</span>
                            </p>
                        </li>
                    );
                })}
                {!compact && <li className="border-t border-white/15" aria-hidden="true" />}
            </ul>

            {!compact && (
                <div className="mt-2 grid grid-cols-[6.5rem_1fr] md:grid-cols-[8rem_7.5rem_1fr_15rem] gap-x-6 text-[10px] tabular-nums text-white/35">
                    <span className="hidden md:block" />
                    <span />
                    <div className="col-span-2 md:col-span-1 flex justify-between">
                        {[0, 6, 12, 18, 24].map((hour) => (
                            <span key={hour}>{String(hour % 24).padStart(2, "0")}:00</span>
                        ))}
                    </div>
                </div>
            )}

            <p className="mt-4 text-xs leading-relaxed text-white/35">
                Stock-exchange hours, Monday to Friday; public holidays are not taken into account. Crypto trades around the clock: sessions are context for when volume and news tend to arrive, not opening hours for crypto.
            </p>
        </div>
    );
};

export default MarketSessions;
