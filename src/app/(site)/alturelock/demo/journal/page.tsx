import { Metadata } from "next";
import Link from "next/link";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import JournalDemo from "@/app/components/altur/journal/journal-demo";

export const metadata: Metadata = {
    title: "Sample journal | AltureLock demo",
    description: "The AltureLock Trading Journal with sample trades.",
};

const DemoJournalPage = () => (
    <WorkspaceShell demo>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h1 className="!text-3xl md:!text-5xl text-white">Trading Journal</h1>
            <Link href="/alturelock/demo" className="text-sm text-white/70 border-b border-white/25 pb-0.5 hover:text-white hover:border-white transition-colors">
                ← Back to the demo
            </Link>
        </div>
        <p className="mb-8 border-l-2 border-[#FACC15] pl-4 text-sm leading-relaxed text-white/70">Sample trades, not a real account. Open any trade to see its recap on the real candles of that day.</p>
        <JournalDemo />
    </WorkspaceShell>
);

export default DemoJournalPage;
