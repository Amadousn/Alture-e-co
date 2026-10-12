import { Metadata } from "next";
import ReadingTheChart from "@/app/components/altur/education/intro/reading-the-chart";

export const metadata: Metadata = {
    title: "The Introduction | Alture & Co. Education",
    description: "The free Introduction to the Alture & Co. programme: from what Bitcoin is to a simulated trade on a real chart, learned by doing.",
};

const IntroductionPage = () => <ReadingTheChart />;

export default IntroductionPage;
