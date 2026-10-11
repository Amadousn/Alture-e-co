import { Metadata } from "next";
import ProductPage from "@/app/components/altur/alture-lock/product-page";

export const metadata: Metadata = {
    title: "AltureLock | Alture & Co.",
    description: "AltureLock: the trading system, the Alture Indicator, the Trading Journal and the tools around them, in one terminal.",
};

// The public description of the product. Entering the product itself is a choice made on this page.
const AltureLockPage = () => <ProductPage />;

export default AltureLockPage;
