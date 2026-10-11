import { Metadata } from "next";
import RulesDemo from "@/app/components/altur/workspace/rules-demo";

export const metadata: Metadata = {
    title: "Guided trade | AltureLock demo",
    description: "A guided walk through an AltureLock trade, from plan to review, on simulated data.",
};

const DemoTradePage = () => <RulesDemo />;

export default DemoTradePage;
