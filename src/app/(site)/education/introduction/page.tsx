import { Metadata } from "next";
import ReadingTheChart from "@/app/components/altur/education/intro/reading-the-chart";

export const metadata: Metadata = {
    title: "Reading the Chart | Alture & Co. Education",
    description: "The Introduction to the Alture & Co. programme: learn to read a chart, one interactive lesson at a time.",
};

const IntroductionPage = () => <ReadingTheChart />;

export default IntroductionPage;
