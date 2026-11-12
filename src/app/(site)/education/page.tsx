import { Metadata } from "next";
import EducationHero from "@/app/components/altur/education/education-hero";
import EducationPillars from "@/app/components/altur/education/education-pillars";

export const metadata: Metadata = {
    title: "Education | Alture & Co.",
    description: "A private circle for people learning to trade crypto with structure, not guesswork.",
};

const EducationPage = () => (
    <>
        <EducationHero />
        <EducationPillars />
    </>
);

export default EducationPage;
