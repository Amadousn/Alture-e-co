"use client";

import { useEffect, useState } from "react";
import WorkspaceHome from "./workspace-home";
import { buildSample } from "@/app/components/altur/journal/journal-demo";
import type { ClosedTrade } from "@/utils/bybit";

// The demo Home: the same page on the sample trades, built after mount because
// their dates follow the visitor's clock.
const DemoHome = () => {
    const [trades, setTrades] = useState<ClosedTrade[] | null>(null);
    useEffect(() => setTrades(buildSample().trades), []);
    return <WorkspaceHome demoTrades={trades ?? []} />;
};

export default DemoHome;
