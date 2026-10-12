import { Metadata } from "next";
import EducationDashboard from "@/app/components/altur/education/education-dashboard";

export const metadata: Metadata = {
    title: "Your dashboard | Alture & Co. Education",
    description: "Your Alture & Co. learning dashboard: the Introduction, your progress, and the path ahead.",
};

const DashboardPage = () => <EducationDashboard />;

export default DashboardPage;
