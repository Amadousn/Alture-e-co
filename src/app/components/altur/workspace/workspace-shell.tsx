"use client";

import { useClientPreview } from "@/utils/client-preview";
import TerminalBar from "./terminal-bar";
import TerminalSidebar, { SIDEBAR_WIDTH } from "./terminal-sidebar";
import { useWorkspaceSettings } from "@/utils/workspace-store";
import { useTheme } from "@/utils/use-theme";
import { THEMES } from "./os/design";

// Frame shared by every AltureLock page outside the terminal itself: the same bar on top, then the page.
// width="full" lets the page use the whole screen (Home, Journal), with a full-screen control.
// themed: the page offers the light and dark themes, and the frame follows the choice.
const WorkspaceShell = ({ children, width = "max-w-7xl", demo = false, themed = false, paper = false }: { children: React.ReactNode; width?: string; demo?: boolean; themed?: boolean; paper?: boolean }) => {
    const [, , store] = useWorkspaceSettings();
    const [theme] = useTheme();
    const full = width === "full";
    const asClient = useClientPreview();


    return (
        <div style={themed ? undefined : (THEMES.dark as unknown as React.CSSProperties)} className={`cmd-ground min-h-[100dvh] overflow-y-auto text-white ${SIDEBAR_WIDTH} ${themed ? (theme === "light" ? `lumen${paper ? " lumen-term" : ""}` : "") : "j-term"}`}>
            <TerminalSidebar demo={demo} />
            <div className="sticky top-0 z-40">
                <TerminalBar demo={demo} />
                {demo && !asClient && (
                    <p className="sr-only">Demo environment: the account, the trades and the results on this page are simulated.</p>
                )}
            </div>
            <div className={full ? "relative px-4 pb-24 pt-6 md:px-8 xl:px-10" : `${width} mx-auto px-4 pb-24 pt-8 md:px-6 md:pt-10`}>
                {store.ready && !store.persistent && (
                    <p className="rounded-sm border border-[#F48FB1]/40 bg-[#F48FB1]/10 px-4 py-3 text-sm text-white mb-8">
                        This browser is blocking storage, so nothing you enter here will be kept after you leave the page.
                    </p>
                )}

                {children}
            </div>
        </div>
    );
};

export default WorkspaceShell;
