import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import BacktestStudio from "@/app/components/altur/workspace/backtest-studio";

export const metadata: Metadata = {
    title: "Backtesting | AltureLock",
    description: "Replay real market history candle by candle and test a strategy before trading it.",
};

const BacktestPage = () => (
    <WorkspaceShell width="full">
        <BacktestStudio />
    </WorkspaceShell>
);

export default BacktestPage;
