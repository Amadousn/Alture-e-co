"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AltureLockLogo from "./alturelock-logo";
import { useWorkspaceSettings } from "@/utils/workspace-store";

const NAV = [
    { href: "/alturelock/workspace", label: "Terminal" },
    { href: "/alturelock/rules", label: "Rules" },
    { href: "/alturelock/journal", label: "Journal" },
    { href: "/alturelock/connections", label: "Connections" },
];



// Frame shared by every workspace page: the AltureLock mark, the two
// sections, and a quiet way into profile and settings.
const DEMO_NAV = [
    { href: "/alturelock/demo", label: "Terminal" },
    { href: "/alturelock/demo/trade", label: "Guided trade" },
    { href: "/alturelock/demo/journal", label: "Journal" },
];

const WorkspaceShell = ({ children, width = "max-w-7xl", demo = false }: { children: React.ReactNode; width?: string; demo?: boolean }) => {
    const path = usePathname();
    const [settings, , store] = useWorkspaceSettings();
    const initial = (settings.name.trim()[0] ?? "A").toUpperCase();


    return (
        <section className="bg-black min-h-[100dvh] !pt-28 md:!pt-32 !pb-20">
            <div className={`${width} mx-auto px-4 md:px-6`}>
                <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-white/15 pb-4 mb-8 md:mb-10">
                    <Link href={demo ? "/alturelock" : "/alturelock/workspace"} aria-label="AltureLock" className="flex items-center gap-3">
                        <AltureLockLogo />
                        {demo && <span className="rounded-sm border border-[#FACC15]/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FACC15]">Demo</span>}
                    </Link>

                    <nav aria-label="AltureLock" className="order-3 md:order-none w-full md:w-auto flex items-baseline gap-x-6 overflow-x-auto">
                        {(demo ? DEMO_NAV : NAV).map((item) => {
                            const active = demo ? path === item.href : path.startsWith(item.href);
                            return (
                                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`nav-link flex-shrink-0 pb-1.5 text-xs font-medium uppercase tracking-[0.06em] ${active ? "is-active" : ""}`}>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-5">
                    <Link href="/alturelock/help" className={`text-xs transition-colors ${path.startsWith("/alturelock/help") ? "text-white" : "text-white/60 hover:text-white"}`}>
                        Help
                    </Link>
                    <Link
                        href="/alturelock/settings"
                        aria-label="Profile and settings"
                        className={`flex items-center gap-2.5 text-xs transition-colors ${path.startsWith("/alturelock/settings") ? "text-white" : "text-white/60 hover:text-white"}`}
                    >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/60 text-[11px] font-semibold text-accent">{store.ready ? initial : ""}</span>
                        Settings
                    </Link>
                    </div>
                </div>

                {store.ready && !store.persistent && (
                    <p className="rounded-sm border border-[#E955A8]/40 bg-[#E955A8]/10 px-4 py-3 text-sm text-white mb-8">
                        This browser is blocking storage, so nothing you enter here will be kept after you leave the page.
                    </p>
                )}

                {children}
            </div>
        </section>
    );
};

export default WorkspaceShell;
