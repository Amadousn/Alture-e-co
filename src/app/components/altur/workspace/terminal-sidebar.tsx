"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The narrow rail of rooms down the left of every AltureLock screen on a wide
// display: Home, Terminal and Journal, and the rest behind "More". On a phone
// the top bar carries the same places.

const icon = (path: React.ReactNode) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
        {path}
    </svg>
);
const ICONS = {
    home: icon(<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>),
    terminal: icon(<><path d="M3 17l5-6 4 3 6-8 3 3" /><path d="M3 21h18" /></>),
    journal: icon(<><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 8h6M9 12h6M9 16h4" /></>),
    more: icon(<><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>),
};

export const SIDEBAR_WIDTH = "lg:pl-16";

const TerminalSidebar = ({ demo }: { demo: boolean }) => {
    const path = usePathname();
    const [open, setOpen] = useState(false);
    const box = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!open) return;
        const close = (event: MouseEvent | KeyboardEvent) => {
            if (event instanceof KeyboardEvent ? event.key === "Escape" : !box.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", close);
        document.addEventListener("keydown", close);
        return () => {
            document.removeEventListener("mousedown", close);
            document.removeEventListener("keydown", close);
        };
    }, [open]);

    const main = demo
        ? [
              { href: "/alturelock/demo/home", label: "Home", icon: ICONS.home },
              { href: "/alturelock/demo", label: "Terminal", icon: ICONS.terminal },
              { href: "/alturelock/demo/journal", label: "Journal", icon: ICONS.journal },
          ]
        : [
              { href: "/alturelock/home", label: "Home", icon: ICONS.home },
              { href: "/alturelock/workspace", label: "Terminal", icon: ICONS.terminal },
              { href: "/alturelock/journal", label: "Journal", icon: ICONS.journal },
          ];
    const more = demo
        ? [
              ["/alturelock/demo/trade", "Guided trade"],
              ["/education/dashboard", "Education"],
              ["/alturelock", "About AltureLock"],
          ]
        : [
              ["/alturelock/rules", "Plan a trade"],
              ["/education/dashboard", "Education"],
              ["/alturelock/connections", "Connections"],
              ["/alturelock/settings", "Settings"],
              ["/alturelock/help", "Help"],
          ];

    return (
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-16 flex-col items-center border-r border-white/[0.06] bg-[#080a0c] py-3 lg:flex" aria-label="AltureLock">
            <Link href={main[0].href} aria-label="AltureLock" className="mb-6 flex h-9 w-9 items-center justify-center rounded-md border border-white/15 font-logo text-[15px] text-white">
                A
            </Link>
            <nav className="flex flex-col items-center gap-2">
                {main.map((item) => {
                    const active = path === item.href;
                    return (
                        <Link key={item.href} href={item.href} aria-label={item.label} title={item.label} aria-current={active ? "page" : undefined} className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${active ? "border border-[#20B8A8]/40 bg-[#20B8A8]/10 text-white shadow-[0_0_18px_rgba(32,184,168,0.18)]" : "text-white/45 hover:bg-white/[0.05] hover:text-white"}`}>
                            {active && <span className="absolute -left-3 top-2 h-6 w-[2px] rounded-full bg-[#20B8A8]" aria-hidden="true" />}
                            {item.icon}
                        </Link>
                    );
                })}
            </nav>
            <span className="my-4 h-px w-6 bg-white/10" aria-hidden="true" />
            <div ref={box} className="relative">
                <button type="button" aria-label="More" title="More" aria-expanded={open} onClick={() => setOpen((value) => !value)} className={`flex h-10 w-10 items-center justify-center rounded-md transition-colors ${open ? "bg-white/[0.07] text-white" : "text-white/45 hover:bg-white/[0.05] hover:text-white"}`}>
                    {ICONS.more}
                </button>
                {open && (
                    <div className="cmd-panel w-52 py-2" style={{ position: "absolute", left: 48, top: 0 }} role="menu">
                        {more.map(([href, text]) => (
                            <Link key={href} href={href} role="menuitem" onClick={() => setOpen(false)} className={`block px-4 py-2 text-[13px] transition-colors ${path === href ? "text-white" : "text-white/60 hover:bg-white/[0.04] hover:text-white"}`}>
                                {text}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
};

export default TerminalSidebar;
