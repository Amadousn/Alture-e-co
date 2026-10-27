"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AltureLockLogo from "./alturelock-logo";

// The column of rooms down the left of every AltureLock screen on a wide display.
// On a phone the top bar carries the same places.

const icon = (path: React.ReactNode) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px] flex-shrink-0" aria-hidden="true">
        {path}
    </svg>
);
const ICONS = {
    home: icon(<><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>),
    terminal: icon(<><path d="M3 17l5-6 4 3 6-8 3 3" /><path d="M3 21h18" /></>),
    rules: icon(<><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></>),
    journal: icon(<><path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z" /><path d="M5 17a3 3 0 013-3h11" /></>),
    education: icon(<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>),
    connections: icon(<><path d="M9 15l6-6" /><path d="M11 6l1-1a4 4 0 016 6l-1 1M13 18l-1 1a4 4 0 01-6-6l1-1" /></>),
    settings: icon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" /></>),
    help: icon(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 015 .5c0 1.7-2.5 2-2.5 3.5M12 17h.01" /></>),
};
type Item = { href: string; label: string; icon: keyof typeof ICONS; external?: boolean };

export const SIDEBAR_WIDTH = "lg:pl-[216px]";

const TerminalSidebar = ({ demo }: { demo: boolean }) => {
    const path = usePathname();
    const groups: { title: string; items: Item[] }[] = demo
        ? [
              { title: "Demo", items: [{ href: "/alturelock/demo", label: "Terminal", icon: "terminal" }, { href: "/alturelock/demo/trade", label: "Guided trade", icon: "rules" }, { href: "/alturelock/demo/journal", label: "Journal", icon: "journal" }] },
              { title: "Learn", items: [{ href: "/education/dashboard", label: "Education", icon: "education", external: true }] },
          ]
        : [
              { title: "Trade", items: [{ href: "/alturelock/home", label: "Home", icon: "home" }, { href: "/alturelock/workspace", label: "Terminal", icon: "terminal" }, { href: "/alturelock/rules", label: "Plan a trade", icon: "rules" }, { href: "/alturelock/journal", label: "Journal", icon: "journal" }] },
              { title: "Learn", items: [{ href: "/education/dashboard", label: "Education", icon: "education", external: true }] },
              { title: "Account", items: [{ href: "/alturelock/connections", label: "Connections", icon: "connections" }, { href: "/alturelock/settings", label: "Settings", icon: "settings" }, { href: "/alturelock/help", label: "Help", icon: "help" }] },
          ];
    return (
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-[216px] flex-col border-r border-white/10 bg-black lg:flex" aria-label="AltureLock">
            <Link href={demo ? "/alturelock" : "/alturelock/home"} aria-label="AltureLock" className="flex h-[49px] flex-shrink-0 items-center gap-3 border-b border-white/10 px-4">
                <AltureLockLogo size="sm" />
                {demo && <span className="rounded-sm border border-[#FACC15]/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FACC15]">Demo</span>}
            </Link>
            <nav className="flex-1 overflow-y-auto px-2.5 py-4">
                {groups.map((group) => (
                    <div key={group.title} className="mb-5">
                        <p className="mb-1.5 px-2.5 text-[10px] uppercase tracking-[0.14em] text-white/35">{group.title}</p>
                        <ul className="space-y-0.5">
                            {group.items.map((item) => {
                                const active = path === item.href;
                                return (
                                    <li key={item.href}>
                                        <Link href={item.href} aria-current={active ? "page" : undefined} className={`flex items-center gap-3 rounded-sm px-2.5 py-2 text-[13px] transition-colors ${active ? "bg-white/[0.07] text-white" : "text-white/55 hover:bg-white/[0.04] hover:text-white"}`}>
                                            <span className={active ? "text-accent" : ""}>{ICONS[item.icon]}</span>
                                            {item.label}
                                            {item.external && <span className="ml-auto text-[10px] text-white/30">↗</span>}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default TerminalSidebar;
