"use client";

import { useEffect, useState } from "react";
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
    backtest: icon(<><path d="M4 12a8 8 0 1 0 2.3-5.6" /><path d="M4 4v4h4" /><path d="M12 8v4l3 2" /></>),
    journal: icon(<><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 8h6M9 12h6M9 16h4" /></>),
    plan: icon(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></>),
    connections: icon(<><path d="M9 15l6-6" /><path d="M11 6l1.5-1.5a4 4 0 0 1 5.7 5.7L16.6 12" /><path d="M13 18l-1.5 1.5a4 4 0 0 1-5.7-5.7L7.4 12" /></>),
    settings: icon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>),
    help: icon(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 0 1 4.9.8c0 1.7-2.4 2.2-2.4 3.7" /><path d="M12 17h.01" /></>),
    education: icon(<><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>),
    about: icon(<><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>),
    collapse: icon(<><path d="M15 6l-6 6 6 6" /></>),
    more: icon(<><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>),
};

// The page leaves room for the rail: wide with labels, or narrow when the trader folds it (globals.css, .rail-pad).
export const SIDEBAR_WIDTH = "rail-pad";

type Item = { href: string; label: string; icon: React.ReactNode };

const TerminalSidebar = ({ demo }: { demo: boolean }) => {
    const path = usePathname();
    // Icons only by default: the workspace gets the full width. The trader can open the labels.
    const [narrow, setNarrow] = useState(true);
    useEffect(() => {
        try {
            setNarrow(localStorage.getItem("alturelock:rail") !== "wide");
        } catch {}
    }, []);
    useEffect(() => {
        document.documentElement.dataset.rail = narrow ? "narrow" : "wide";
    }, [narrow]);
    const fold = () =>
        setNarrow((value) => {
            try {
                localStorage.setItem("alturelock:rail", value ? "wide" : "narrow");
            } catch {}
            return !value;
        });

    const groups: { title: string; items: Item[] }[] = demo
        ? [
              { title: "Workspace", items: [
                  { href: "/alturelock/demo/home", label: "Home", icon: ICONS.home },
                  { href: "/alturelock/demo", label: "Terminal", icon: ICONS.terminal },
                  { href: "/alturelock/demo/journal", label: "Journal", icon: ICONS.journal },
                  { href: "/alturelock/demo/backtest", label: "Backtesting", icon: ICONS.backtest },
                  { href: "/alturelock/demo/trade", label: "Guided trade", icon: ICONS.plan },
              ] },
              { title: "More", items: [
                  { href: "/education/dashboard", label: "Education", icon: ICONS.education },
                  { href: "/alturelock", label: "About AltureLock", icon: ICONS.about },
              ] },
          ]
        : [
              { title: "Workspace", items: [
                  { href: "/alturelock/home", label: "Home", icon: ICONS.home },
                  { href: "/alturelock/workspace", label: "Terminal", icon: ICONS.terminal },
                  { href: "/alturelock/journal", label: "Journal", icon: ICONS.journal },
                  { href: "/alturelock/backtest", label: "Backtesting", icon: ICONS.backtest },
                  { href: "/alturelock/rules", label: "Plan a trade", icon: ICONS.plan },
              ] },
              { title: "Account", items: [
                  { href: "/alturelock/connections", label: "Accounts & exchanges", icon: ICONS.connections },
                  { href: "/alturelock/settings", label: "Settings", icon: ICONS.settings },
                  { href: "/alturelock/help", label: "Help", icon: ICONS.help },
              ] },
              { title: "Learn", items: [{ href: "/education/dashboard", label: "Education", icon: ICONS.education }] },
          ];

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 hidden flex-col border-r border-white/[0.06] bg-[#080a0c] py-3 transition-[width] duration-200 lg:flex ${narrow ? "w-16 items-center" : "w-56 px-3"}`} aria-label="AltureLock">
            <div className={`mb-5 flex items-center ${narrow ? "flex-col gap-3" : "justify-between px-1"}`}>
                <Link href={groups[0].items[0].href} className="flex items-center gap-2.5" aria-label="AltureLock home">
                    <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 font-logo text-[15px] text-white">A</span>
                    {!narrow && <span className="font-logo text-[15px] text-white">Alture<span className="font-semibold">Lock</span></span>}
                </Link>
                <button type="button" onClick={fold} aria-label={narrow ? "Show labels" : "Hide labels"} title={narrow ? "Show labels" : "Hide labels"} className={`flex h-7 w-7 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white ${narrow ? "rotate-180" : ""}`}>
                    {ICONS.collapse}
                </button>
            </div>
            <nav className="flex flex-1 flex-col gap-5 overflow-y-auto">
                {groups.map((group) => (
                    <div key={group.title} className={narrow ? "flex flex-col items-center gap-1.5" : ""}>
                        {narrow ? <span className="mb-1 h-px w-6 bg-white/10" aria-hidden="true" /> : <p className="mb-1.5 px-2.5 text-[10.5px] font-medium uppercase tracking-[0.08em] text-white/35">{group.title}</p>}
                        {group.items.map((item) => {
                            const active = path === item.href;
                            return (
                                <Link key={item.href} href={item.href} title={narrow ? item.label : undefined} aria-label={narrow ? item.label : undefined} aria-current={active ? "page" : undefined} className={`relative flex items-center gap-3 rounded-md text-[13.5px] transition-colors ${narrow ? "h-10 w-10 justify-center" : "px-2.5 py-2"} ${active ? "bg-white/[0.08] text-white" : "text-white/55 hover:bg-white/[0.05] hover:text-white"}`}>
                                    {active && <span className={`absolute top-2 h-6 w-[2px] rounded-full bg-white ${narrow ? "-left-3" : "-left-3"}`} aria-hidden="true" />}
                                    <span className={active ? "text-white" : ""}>{item.icon}</span>
                                    {!narrow && <span>{item.label}</span>}
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default TerminalSidebar;
