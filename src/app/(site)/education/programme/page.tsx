import { Metadata } from "next";
import EducationProgramme from "@/app/components/altur/education/education-programme";

export const metadata: Metadata = {
    title: "The Programme | Alture & Co. Education",
    description: "Seven months, one step at a time: what each month of the Alture & Co. programme covers.",
};

const ProgrammePage = () => <EducationProgramme />;

export default ProgrammePage;
