import Link from "next/link";
import WorkspaceShell from "./workspace-shell";

// Shown to a customer whose plan does not include the Terminal.
const TerminalLocked = () => (
    <WorkspaceShell>
        <div className="max-w-xl py-16">
            <h1 className="text-2xl font-medium tracking-tight text-white">The Terminal is not in your plan.</h1>
            <p className="mt-3 text-[15px] leading-relaxed text-white/60">It comes with the Terminal and AltureLock plans.</p>
            <Link href="/alturelock#pricing" className="mt-6 inline-block border-b border-white/30 text-sm text-white hover:border-white">See the plans</Link>
        </div>
    </WorkspaceShell>
);

export default TerminalLocked;
