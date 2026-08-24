import { Metadata } from "next";
import LegalPage from "@/app/components/legal/legal-page";

export const metadata: Metadata = {
    title: "Terms of Service | Alture & Co.",
};

const sections = [
    {
        heading: "Overview",
        body: [
            "By accessing this website or using AltureLock, you agree to the following terms.",
        ],
    },
    {
        heading: "Use of service",
        body: [
            "AltureLock is a rules enforcement and trade monitoring software tool provided by Alture & Co. Access is limited to authorized users only.",
        ],
    },
    {
        heading: "No investment advice",
        body: [
            "Nothing on this site or within AltureLock constitutes financial, investment, or legal advice. Trading involves substantial risk, and past performance does not guarantee future results.",
        ],
    },
    {
        heading: "Account responsibility",
        body: [
            "Users are responsible for maintaining the confidentiality of their login credentials and for all activity under their account.",
        ],
    },
    {
        heading: "Limitation of liability",
        body: [
            "Alture & Co. is not liable for any losses, damages, or trading outcomes resulting from the use of this website or AltureLock.",
        ],
    },
    {
        heading: "Changes to terms",
        body: [
            "These terms may be updated periodically without prior notice.",
        ],
    },
    {
        heading: "Contact",
        body: [
            "celine@altureandco.com",
        ],
    },
];

const TermsOfServicePage = () => {
    return <LegalPage title="Terms of Service" sections={sections} />;
};

export default TermsOfServicePage;
