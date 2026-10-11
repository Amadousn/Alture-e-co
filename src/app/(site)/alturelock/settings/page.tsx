import { Metadata } from "next";
import WorkspaceSettings from "@/app/components/altur/workspace/workspace-settings";

export const metadata: Metadata = {
    title: "Settings | AltureLock",
    robots: { index: false, follow: false },
};

const SettingsPage = () => <WorkspaceSettings />;

export default SettingsPage;
