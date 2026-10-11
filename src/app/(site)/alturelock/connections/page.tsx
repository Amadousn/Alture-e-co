import { Metadata } from "next";
import WorkspaceConnections from "@/app/components/altur/workspace/workspace-connections";

export const metadata: Metadata = {
    title: "Connections | AltureLock",
    description: "Connect a trading platform to import your trades into the AltureLock journal. Read-only.",
};

const ConnectionsPage = () => <WorkspaceConnections />;

export default ConnectionsPage;
