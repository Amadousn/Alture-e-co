"use client";

import TerminalBar from "./terminal-bar";
import { useWorkspaceSettings } from "@/utils/workspace-store";

// Frame shared by every AltureLock page outside the terminal itself: the same bar on top, then the page.
const WorkspaceShell = ({ children, width = "max-w-7xl", demo = false }: { children: React.ReactNode; width?: string; demo?: boolean }) => {
    const [, , store] = useWorkspaceSettings();


    return (
        <div className="min-h-[100dvh] bg-black text-white">
            <div className="sticky top-0 z-40 bg-black">
                <TerminalBar demo={demo} />
                {demo && (
                    <p className="border-b border-white/10 px-4 py-2 text-xs text-white/70">
                        <span className="mr-2 font-semibold text-[#FACC15]">Demo environment.</span>
                        The account, the trade and the results on this page are simulated.
                    </p>
                )}
            </div>
            <div className={`${width} mx-auto px-4 pb-24 pt-8 md:px-6 md:pt-10`}>
                {store.ready && !store.persistent && (
                    <p className="rounded-sm border border-[#E955A8]/40 bg-[#E955A8]/10 px-4 py-3 text-sm text-white mb-8">
                        This browser is blocking storage, so nothing you enter here will be kept after you leave the page.
                    </p>
                )}

                {children}
            </div>
        </div>
    );
};

export default WorkspaceShell;
