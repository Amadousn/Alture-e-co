import { Metadata } from "next";
import JournalPage from "@/app/components/altur/alture-lock/journal-page";

export const metadata: Metadata = {
    title: "Trading Journal | AltureLock",
    description: "The AltureLock Trading Journal: P&L calendar with weekly totals, five performance charts, and an Alture Score that explains your trades in plain words.",
};

const TradingJournalPage = () => <JournalPage />;

export default TradingJournalPage;
