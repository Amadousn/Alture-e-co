import { Metadata } from "next";
import EducationHero from "@/app/components/altur/education/education-hero";

export const metadata: Metadata = {
    title: "Education | Alture & Co.",
    description: "A private circle for ladies learning to trade crypto with structure, not guesswork.",
};

const EducationPage = () => <EducationHero />;

export default EducationPage;
