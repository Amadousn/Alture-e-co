import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import JournalDemo from "@/app/components/altur/journal/journal-demo";

export const metadata: Metadata = {
    title: "Sample journal | AltureLock demo",
    description: "The AltureLock Trading Journal with sample trades.",
};

const DemoJournalPage = () => (
    <WorkspaceShell demo width="full">
        <JournalDemo />
    </WorkspaceShell>
);

export default DemoJournalPage;
