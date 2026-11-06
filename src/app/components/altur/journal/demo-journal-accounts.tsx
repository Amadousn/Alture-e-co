"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import JournalDemo, { SAMPLE_ACCOUNTS, type SampleAccount } from "./journal-demo";
import JournalStudio from "./journal-studio";
import { useBacktests } from "@/utils/workspace-store";

// The demo journal: the sample account, and beside it the trades taken in the demo's backtesting.
const DemoJournalAccounts = () => {
    const [backtests] = useBacktests();
    const trades = useMemo(() => backtests.flatMap((item) => item.trades).sort((a, b) => b.closedAt - a.closedAt), [backtests]);
    const [account, setAccount] = useState<"sample" | "backtest">("sample");
    const [shown, setShown] = useState<SampleAccount | "all">("all");
    useEffect(() => {
        if (new URLSearchParams(window.location.search).get("account") === "backtest") setAccount("backtest");
    }, []);
    return (
        <>
            <div className="mb-6 flex items-center gap-5 text-sm" role="tablist" aria-label="Account">
                {(
                    [
                        ["sample", "Trading account"],
                        ["backtest", `Backtest${trades.length ? ` · ${trades.length}` : ""}`],
                    ] as const
                ).map(([id, text]) => (
                    <button key={id} type="button" role="tab" aria-selected={account === id} onClick={() => setAccount(id)} className={`border-b pb-0.5 transition-colors ${account === id ? "border-white text-white" : "border-transparent text-[#8a8a94] hover:text-white"}`}>
                        {text}
                    </button>
                ))}
            </div>
            {account === "sample" && (
                <div className="mb-6 flex flex-wrap gap-2 text-xs" role="group" aria-label="Show account">
                    {[{ id: "all" as const, name: "All accounts" }, ...SAMPLE_ACCOUNTS].map((item) => (
                        <button key={item.id} type="button" aria-pressed={shown === item.id} onClick={() => setShown(item.id)} className={`rounded-sm border px-3 py-1.5 transition-colors ${shown === item.id ? "border-white bg-white/10 text-white" : "border-white/20 text-white/50 hover:text-white"}`}>
                            {item.name}
                        </button>
                    ))}
                </div>
            )}
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
                <JournalDemo key={shown} account={shown === "all" ? undefined : shown} />
            )}
        </>
    );
};

export default DemoJournalAccounts;
