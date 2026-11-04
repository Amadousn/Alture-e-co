import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import BacktestStudio from "@/app/components/altur/workspace/backtest-studio";
import { isCustomer } from "@/integrations/billing";

export const metadata: Metadata = {
    title: "Backtesting | AltureLock",
    description: "Replay real market history candle by candle and test a strategy before trading it.",
};

// Sold as "coming soon": customers do not get it yet.
const BacktestPage = async () =>
    (await isCustomer()) ? (
        <WorkspaceShell>
            <div className="max-w-xl py-16">
                <h1 className="text-2xl font-medium tracking-tight text-white">Backtesting is coming soon.</h1>
            </div>
        </WorkspaceShell>
    ) : (
        <WorkspaceShell width="full">
            <BacktestStudio />
        </WorkspaceShell>
    );

export default BacktestPage;
