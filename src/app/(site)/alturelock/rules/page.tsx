import { Metadata } from "next";
import RulesWorkflow from "@/app/components/altur/workspace/rules-workflow";

export const metadata: Metadata = {
    title: "Rules | AltureLock",
    description: "Plan a trade on the chart, confirm you are ready, track it and review it against your own rules.",
};

const RulesPage = () => <RulesWorkflow />;

export default RulesPage;
