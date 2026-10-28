import { Metadata } from "next";
import DemoHome from "@/app/components/altur/workspace/demo-home";

export const metadata: Metadata = {
    title: "Home | AltureLock demo",
    description: "The AltureLock Home with sample trades.",
};

const DemoHomePage = () => <DemoHome />;

export default DemoHomePage;
