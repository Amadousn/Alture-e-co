import { Suspense } from "react";
import { Metadata } from "next";
import CockpitOS from "@/app/components/altur/workspace/cockpit-os";
import TerminalLocked from "@/app/components/altur/workspace/terminal-locked";
import { terminalAllowed } from "@/integrations/billing";

export const metadata: Metadata = {
    title: "Cockpit | AltureLock",
    description: "Markets, news, the economic calendar, your chart, your trade and your journal in one screen.",
};

const WorkspacePage = async () =>
    (await terminalAllowed()) ? (
        <Suspense fallback={null}>
            <CockpitOS />
        </Suspense>
    ) : (
        <TerminalLocked />
    );

export default WorkspacePage;
