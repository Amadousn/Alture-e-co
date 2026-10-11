import { Suspense } from "react";
import { Metadata } from "next";
import CockpitOS from "@/app/components/altur/workspace/cockpit-os";

export const metadata: Metadata = {
    title: "Cockpit | AltureLock",
    description: "Markets, news, the economic calendar, your chart, your trade and your journal in one screen.",
};

const WorkspacePage = () => (
    <Suspense fallback={null}>
        <CockpitOS />
    </Suspense>
);

export default WorkspacePage;
