import React from "react";
import { Metadata } from "next";
import AltureLockSimulator from "@/app/components/altur/alture-lock/simulator";
import PriceAlerts from "@/app/components/altur/alture-lock/price-alerts";
import IntroSequence from "@/app/components/altur/alture-lock/intro-sequence";
import WhoThisIsFor from "@/app/components/altur/alture-lock/who-this-is-for";
import LiveTradePanel from "@/app/components/altur/alture-lock/live-trade-panel";
import TradeJournal from "@/app/components/altur/alture-lock/trade-journal";
import FeaturesList from "@/app/components/altur/alture-lock/features-list";

export const metadata: Metadata = {
    title: "AltureLock | Alture & Co.",
    description: "Trading rules and execution control, built directly into how we trade.",
};

const AltureLockPage = () => {
    return (
        <>
            {/* 1. Hero */}
            <IntroSequence />

            {/* 2. What It Does */}
            <FeaturesList />

            {/* 3. For Who */}
            <WhoThisIsFor />

            {/* 4. Your Rules */}
            <section className="bg-black pb-16 md:pb-24 px-4 md:px-6">
                <AltureLockSimulator />
            </section>

            {/* 5. See It In Action - Current Position, Trade History, Watchlist,
                one unified preview instead of three separate blocks. */}
            <section className="bg-black pb-16 md:pb-24 px-4 md:px-6">
                <div className="mb-12 md:mb-16 text-center">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-snug mb-4">
                        See It In Action
                    </h2>
                    <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed max-w-md mx-auto">
                        A preview of what your account looks like once connected to your broker.
                    </p>
                </div>
                <div className="space-y-6">
                    <LiveTradePanel />
                    <div className="max-w-4xl mx-auto">
                        <PriceAlerts />
                    </div>
                </div>
            </section>

            {/* 6. Trade Recap */}
            <section className="bg-black pb-16 md:pb-24 px-4 md:px-6">
                <TradeJournal />
            </section>
        </>
    );
};

export default AltureLockPage;
