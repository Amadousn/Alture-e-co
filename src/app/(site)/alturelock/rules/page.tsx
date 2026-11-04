import { Metadata } from "next";
import RulesWorkflow from "@/app/components/altur/workspace/rules-workflow";
import TerminalLocked from "@/app/components/altur/workspace/terminal-locked";
import { terminalAllowed } from "@/integrations/billing";

export const metadata: Metadata = {
    title: "Rules | AltureLock",
    description: "Plan a trade on the chart, confirm you are ready, track it and review it against your own rules.",
};

const RulesPage = async () => ((await terminalAllowed()) ? <RulesWorkflow /> : <TerminalLocked />);

export default RulesPage;
