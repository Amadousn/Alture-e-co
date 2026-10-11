import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import AltureLockFaq from "@/app/components/altur/workspace/alturelock-faq";

export const metadata: Metadata = {
    title: "Help | AltureLock",
    description: "Answers to common questions about AltureLock.",
};

const HelpPage = () => (
    <WorkspaceShell>
        <h1 className="!text-3xl md:!text-5xl text-white mb-10">Help</h1>
        <div className="max-w-3xl">
            <AltureLockFaq />
        </div>
    </WorkspaceShell>
);

export default HelpPage;
