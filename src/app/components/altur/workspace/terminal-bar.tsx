"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import AltureLockLogo from "./alturelock-logo";
import { useSession } from "@/utils/use-session";
import { useWorkspaceSettings } from "@/utils/workspace-store";

// The bar across the top of every AltureLock screen, in the terminal and in its demo:
// where you are, and the few other places to go.
const TerminalBar = ({ demo }: { demo: boolean }) => {
    const path = usePathname();
    const [settings, , store] = useWorkspaceSettings();
    const session = useSession();
    const links = demo
        ? [["/alturelock/demo", "Terminal"], ["/alturelock/demo/trade", "Guided trade"], ["/alturelock/demo/journal", "Journal"]]
        : [["/alturelock/workspace", "Terminal"], ["/alturelock/rules", "Rules"], ["/alturelock/journal", "Journal"], ["/alturelock/connections", "Connections"]];

    return (
        <header className="flex flex-shrink-0 flex-wrap items-center gap-x-8 gap-y-2 border-b border-white/10 px-4 py-2.5">
            <Link href={demo ? "/alturelock" : "/alturelock/workspace"} aria-label="AltureLock" className="flex items-center gap-3">
                <AltureLockLogo size="sm" />
                {demo && <span className="rounded-sm border border-[#FACC15]/60 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#FACC15]">Demo</span>}
            </Link>

            <nav aria-label="AltureLock" className="order-3 lg:order-none flex w-full lg:w-auto items-center gap-x-6 overflow-x-auto">
                {links.map(([href, text]) => {
                    const active = path === href;
                    return (
                        <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`nav-link flex-shrink-0 pb-0.5 text-xs font-medium uppercase tracking-[0.06em] ${active ? "is-active" : ""}`}>
                            {text}
                        </Link>
                    );
                })}
            </nav>

            <div className="ml-auto flex items-center gap-x-4 text-xs">
                {demo ? (
                    <>
                        <Link href="/alturelock" className="hidden sm:inline text-white/45 hover:text-white transition-colors">
                            About AltureLock
                        </Link>
                        <Link href="/alturelock/login" className="rounded-sm border border-white/35 px-3 py-1.5 font-medium text-white hover:border-white transition-colors">
                            Log in
                        </Link>
                    </>
                ) : (
                    <>
                        {store.ready && settings.name.trim() && <span className="hidden sm:inline text-white/45">{settings.name.trim()}</span>}
                        <Link href="/alturelock/settings" className="nav-link is-inline">
                            Settings
                        </Link>
                        <Link href="/alturelock/help" className="nav-link is-inline hidden sm:inline">
                            Help
                        </Link>
                        {session.signedIn === true && (
                            <button type="button" onClick={() => session.signOut().then(() => window.location.assign("/alturelock"))} className="nav-link is-inline">
                                Log out
                            </button>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};

export default TerminalBar;
