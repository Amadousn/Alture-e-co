import { Metadata } from "next";
import WorkspaceShell from "@/app/components/altur/workspace/workspace-shell";
import BacktestStudio from "@/app/components/altur/workspace/backtest-studio";

export const metadata: Metadata = {
    title: "Backtesting | AltureLock demo",
    description: "Replay real market history candle by candle.",
};

const DemoBacktestPage = () => (
    <WorkspaceShell demo width="full">
        <BacktestStudio demo />
    </WorkspaceShell>
);

export default DemoBacktestPage;
