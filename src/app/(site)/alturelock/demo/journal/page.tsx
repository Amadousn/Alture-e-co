import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import DemoJournalAccounts from "@/app/components/altur/journal/demo-journal-accounts";

export const metadata: Metadata = {
    title: "Sample journal | AltureLock demo",
    description: "The AltureLock Trading Journal with sample trades.",
};

const DemoJournalPage = () => (
    <WorkspaceShell demo width="full" themed>
        <DemoJournalAccounts />
    </WorkspaceShell>
);

export default DemoJournalPage;
