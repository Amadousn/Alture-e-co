import { Metadata } from "next";
import LegalPage from "@/app/components/legal/legal-page";

export const metadata: Metadata = {
    title: "Disclaimer | Alture & Co.",
};

const sections = [
    {
        heading: "Risk warning",
        body: [
            "Trading cryptocurrency and other financial instruments involves significant risk of loss and is not suitable for everyone. You should carefully consider your financial situation and risk tolerance before trading.",
        ],
    },
    {
        heading: "Informational purposes only",
        body: [
            "Content on this website, including information about AltureLock, is provided for informational purposes only and does not constitute an offer, solicitation, or recommendation to buy or sell any financial instrument.",
        ],
    },
    {
        heading: "AltureLock",
        body: [
            "AltureLock is a rules enforcement and monitoring tool. It does not guarantee profitability and does not eliminate trading risk. Past performance is not indicative of future results.",
        ],
    },
    {
        heading: "Not a licensed advisor",
        body: [
            "Alture & Co. is not a licensed financial advisor or fund manager. Any capital allocation arrangements are handled on an individual, direct basis and are not open to public investment.",
        ],
    },
    {
        heading: "Contact",
        body: [
            "For questions, contact celine@altureandco.com.",
        ],
    },
];

const DisclaimerPage = () => {
    return <LegalPage title="Disclaimer" sections={sections} />;
};

export default DisclaimerPage;
