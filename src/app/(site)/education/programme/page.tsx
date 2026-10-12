import { Metadata } from "next";
import EducationProgramme from "@/app/components/altur/education/education-programme";

export const metadata: Metadata = {
    title: "The Programme | Alture & Co. Education",
    description: "Seven modules, one step at a time: the Introduction and the modules of the Alture & Co. programme.",
};

const ProgrammePage = () => <EducationProgramme />;

export default ProgrammePage;
