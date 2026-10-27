import { Metadata } from "next";
import WorkspaceHome from "@/app/components/altur/workspace/workspace-home";

export const metadata: Metadata = {
    title: "Home | AltureLock",
    description: "Your day at a glance: the market, the news that matters, and how your own trading is going.",
};

const HomePage = () => <WorkspaceHome />;

export default HomePage;
