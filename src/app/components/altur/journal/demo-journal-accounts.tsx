"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import JournalDemo from "./journal-demo";
import JournalStudio from "./journal-studio";
import { useBacktests } from "@/utils/workspace-store";

// The demo journal: the sample account, and beside it the trades taken in the demo's backtesting.
const DemoJournalAccounts = () => {
    const [backtests] = useBacktests();
    const trades = useMemo(() => backtests.flatMap((item) => item.trades).sort((a, b) => b.closedAt - a.closedAt), [backtests]);
    const [account, setAccount] = useState<"sample" | "backtest">("sample");
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("account") === "backtest") setAccount("backtest");
    }, []);
    return (
        <>
            <div className="mb-6 flex items-center gap-5 text-sm" role="tablist" aria-label="Account">
                {(
                    [
                        ["sample", "Sample account"],
                        ["backtest", `Backtest${trades.length ? ` · ${trades.length}` : ""}`],
                    ] as const
                ).map(([id, text]) => (
                    <button key={id} type="button" role="tab" aria-selected={account === id} onClick={() => setAccount(id)} className={`border-b pb-0.5 transition-colors ${account === id ? "border-white text-white" : "border-transparent text-[#8a8a94] hover:text-white"}`}>
                        {text}
                    </button>
                ))}
            </div>
            {account === "backtest" ? (
                <JournalStudio
                    key="backtest"
                    reviewable
                    trades={trades}
                    positions={[]}
                    status={
                        <>
                            <span>
                                {trades.length} backtest {trades.length === 1 ? "trade" : "trades"}, simulated on past Bybit candles
                            </span>
                            <span className="text-[#55555e]">·</span>
                            <Link href="/alturelock/demo/backtest" className="text-white border-b border-white/30 hover:border-white">
                                Open Backtesting
                            </Link>
                        </>
                    }
                />
            ) : (
                <JournalDemo />
            )}
        </>
    );
};

export default DemoJournalAccounts;
