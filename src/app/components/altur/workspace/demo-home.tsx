"use client";

import WorkspaceHome from "./workspace-home";
import { useSample } from "@/app/components/altur/journal/journal-demo";

// The demo Home: the same page on the sample trades, built after mount because
// their dates follow the visitor's clock.
const DemoHome = () => {
    const data = useSample();
    return <WorkspaceHome demoTrades={data?.trades ?? []} />;
};

export default DemoHome;
