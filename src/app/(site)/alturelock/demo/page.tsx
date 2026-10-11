import { Suspense } from "react";
import { Metadata } from "next";
import CockpitOS from "@/app/components/altur/workspace/cockpit-os";

export const metadata: Metadata = {
    title: "Demo | AltureLock",
    description: "The AltureLock cockpit with a simulated account.",
};

const DemoPage = () => (
    <Suspense fallback={null}>
        <CockpitOS demo />
    </Suspense>
);

export default DemoPage;
