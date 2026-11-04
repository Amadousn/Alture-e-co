import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import BacktestStudio from "@/app/components/altur/workspace/backtest-studio";
import Link from "next/link";
import { backtestAllowed } from "@/integrations/billing";

export const metadata: Metadata = {
    title: "Backtesting | AltureLock",
    description: "Replay real market history candle by candle and test a strategy before trading it.",
};

const BacktestPage = async () =>
    (await backtestAllowed()) ? (
        <WorkspaceShell width="full">
            <BacktestStudio />
        </WorkspaceShell>
    ) : (
        <WorkspaceShell>
            <div className="max-w-xl py-16">
                <h1 className="text-2xl font-medium tracking-tight text-white">Backtesting is not in your plan.</h1>
                <p className="mt-3 text-[15px] leading-relaxed text-white/60">It comes with the Journal and AltureLock plans.</p>
                <Link href="/alturelock#pricing" className="mt-6 inline-block border-b border-white/30 text-sm text-white hover:border-white">See the plans</Link>
            </div>
        </WorkspaceShell>
    );

export default BacktestPage;
