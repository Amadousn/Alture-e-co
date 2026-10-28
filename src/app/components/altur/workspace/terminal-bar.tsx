"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AltureLockLogo from "./alturelock-logo";
import { useSessions } from "./os/sessions";
import { useSession } from "@/utils/use-session";
import { useImports } from "@/utils/workspace-store";

// The bar across the top of every AltureLock screen: where you are, whether an
// exchange is connected, the next session change, the time in UTC, and full screen.

const PAGES: Record<string, string> = {
    "/alturelock/home": "Command",
    "/alturelock/workspace": "Terminal",
    "/alturelock/journal": "Journal",
    "/alturelock/rules": "Plan a trade",
    "/alturelock/connections": "Connections",
    "/alturelock/settings": "Settings",
    "/alturelock/help": "Help",
    "/alturelock/demo/home": "Command",
    "/alturelock/demo": "Terminal",
    "/alturelock/demo/journal": "Journal",
    "/alturelock/demo/trade": "Guided trade",
};
const span = (ms: number) => {
    const minutes = Math.max(0, Math.round(ms / 60000));
    return minutes >= 60 ? `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m` : `${minutes}m`;
};

const TerminalBar = ({ demo }: { demo: boolean }) => {
    const path = usePathname();
    const session = useSession();
    const [imports, , importsStore] = useImports();
    const { rows, now } = useSessions();
    const [clock, setClock] = useState<string | null>(null);
    const [full, setFull] = useState(false);

    useEffect(() => {
        const tick = () => setClock(new Date().toISOString().slice(11, 16));
        tick();
        const id = setInterval(tick, 10000);
        const sync = () => setFull(Boolean(document.fullscreenElement));
        document.addEventListener("fullscreenchange", sync);
        return () => {
            clearInterval(id);
            document.removeEventListener("fullscreenchange", sync);
        };
    }, []);
    const toggleFull = useCallback(() => {
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        else document.documentElement.requestFullscreen().catch(() => {});
    }, []);
    // F toggles full screen, unless the trader is typing.
    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            if (event.key.toLowerCase() !== "f" || event.metaKey || event.ctrlKey || event.altKey || target.closest("input, textarea, select, [contenteditable]")) return;
            toggleFull();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [toggleFull]);

    const links = demo
        ? [["/alturelock/demo/home", "Home"], ["/alturelock/demo", "Terminal"], ["/alturelock/demo/journal", "Journal"]]
        : [["/alturelock/home", "Home"], ["/alturelock/workspace", "Terminal"], ["/alturelock/journal", "Journal"], ["/alturelock/rules", "Plan"], ["/alturelock/connections", "Connections"]];
    const connected = Object.keys(imports);
    // The session that changes state next: one about to open, or the open one about to close.
    const next = now === null ? null : [...rows].sort((a, b) => a.state.changesAt - b.state.changesAt)[0];

    return (
        <header className="flex flex-shrink-0 flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.06] bg-[#0a0d0f]/95 px-4 py-2.5 backdrop-blur lg:px-5">
            <Link href={links[0][0]} aria-label="AltureLock" className="flex items-center gap-3 lg:hidden">
                <AltureLockLogo size="sm" />
            </Link>
            <p className="hidden items-baseline gap-3 lg:flex">
                <span className="text-[15px] font-semibold tracking-tight text-white">AltureLock</span>
                <span className="text-sm text-white/45">/ {PAGES[path] ?? ""}</span>
                {demo && <span className="rounded-sm border border-[#FACC15]/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FACC15]">Demo</span>}
            </p>
            {/* On a wide screen these places are in the rail. */}
            <nav aria-label="AltureLock" className="order-3 flex w-full items-center gap-x-6 overflow-x-auto lg:hidden">
                {links.map(([href, text]) => (
                    <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={`nav-link flex-shrink-0 pb-0.5 text-xs font-medium uppercase tracking-[0.06em] ${path === href ? "is-active" : ""}`}>
                        {text}
                    </Link>
                ))}
            </nav>

            <div className="ml-auto flex items-center gap-2">
                {demo ? (
                    <span className="cmd-chip hidden sm:inline-flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" aria-hidden="true" />
                        Simulated account
                    </span>
                ) : (
                    importsStore.ready && (
                        <Link href="/alturelock/connections" className="cmd-chip hidden hover:border-white/20 sm:inline-flex">
                            <span className={`h-1.5 w-1.5 rounded-full ${connected.length ? "cmd-live bg-[#20B8A8]" : "bg-white/30"}`} aria-hidden="true" />
                            {connected.length ? `${connected.map((id) => id[0].toUpperCase() + id.slice(1)).join(", ")} · read-only` : "No exchange connected"}
                        </Link>
                    )
                )}
                {next && now !== null && (
                    <span className="cmd-chip hidden md:inline-flex">
                        {next.session.name} {next.state.open ? "closes" : "opens"} · {span(next.state.changesAt - now)}
                    </span>
                )}
                {clock && <span className="cmd-chip hidden md:inline-flex">{clock} UTC</span>}
                <button type="button" onClick={toggleFull} aria-pressed={full} aria-label={full ? "Exit full screen (F)" : "Full screen (F)"} title={full ? "Exit full screen (F)" : "Full screen (F)"} className="hidden h-[30px] w-[30px] items-center justify-center rounded-md border border-[#20B8A8]/35 text-[#20B8A8] transition-colors hover:bg-[#20B8A8]/10 sm:flex">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                        {full ? <path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4" /> : <path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4" />}
                    </svg>
                </button>
                {demo ? (
                    <Link href="/alturelock/login" className="ml-1 rounded-md border border-white/25 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-white">
                        Log in
                    </Link>
                ) : (
                    session.signedIn === true && (
                        <button type="button" onClick={() => session.signOut().then(() => window.location.assign("/alturelock"))} className="ml-1 text-xs text-white/45 transition-colors hover:text-white">
                            Log out
                        </button>
                    )
                )}
            </div>
        </header>
    );
};

export default TerminalBar;
