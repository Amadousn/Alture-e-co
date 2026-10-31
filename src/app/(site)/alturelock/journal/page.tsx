import { Suspense } from "react";
import { Metadata } from "next";
import WorkspaceJournal from "@/app/components/altur/workspace/workspace-journal";

export const metadata: Metadata = {
    title: "Trading Journal | AltureLock",
    description: "The free AltureLock Trading Journal: trade history, statistics and daily notes.",
};

const JournalPage = () => (
    <Suspense fallback={null}>
        <WorkspaceJournal />
    </Suspense>
);

export default JournalPage;
