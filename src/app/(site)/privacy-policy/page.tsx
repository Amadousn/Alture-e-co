import { Metadata } from "next";
import LegalPage from "@/app/components/legal/legal-page";

export const metadata: Metadata = {
    title: "Privacy Policy | Alture & Co.",
};

const sections = [
    {
        heading: "Overview",
        body: [
            "Alture & Co. respects your privacy. This page explains what information we collect and how it is used.",
        ],
    },
    {
        heading: "Information we collect",
        body: [
            "When you contact us or use AltureLock, we may collect your name, email address, and information you provide directly to us.",
        ],
    },
    {
        heading: "How we use it",
        body: [
            "Information is used solely to operate our services, respond to inquiries, and improve what we offer. We do not sell your personal information to third parties.",
        ],
    },
    {
        heading: "Data security",
        body: [
            "We take reasonable measures to protect your information, including restricted access and secured credentials.",
        ],
    },
    {
        heading: "Contact",
        body: [
            "For any privacy questions, contact us at celine@altureandco.com.",
        ],
    },
    {
        heading: "Updates",
        body: [
            "This policy may be updated from time to time.",
        ],
    },
];

const PrivacyPolicyPage = () => {
    return <LegalPage title="Privacy Policy" sections={sections} />;
};

export default PrivacyPolicyPage;
