import React from "react";
import { Metadata } from "next";
import AltureLockSimulator from "@/app/components/altur/alture-lock/simulator";
import PriceAlerts from "@/app/components/altur/alture-lock/price-alerts";
import IntroSequence from "@/app/components/altur/alture-lock/intro-sequence";

export const metadata: Metadata = {
    title: "AltureLock | Alture & Co.",
    description: "Trading rules and execution control, built directly into how we trade.",
};

const FEATURES = [
    "Sequential pre-trade checklist, no shortcuts",
    "Live monitoring against your predefined exit rules while the trade is open",
    "Risk limits enforced at the account level",
    "Full trade journal that shows whether you lost because the strategy failed or because you did not follow it",
    "Position sizing calculated automatically from your risk percent and stop distance",
    "Trade results measured in R multiples, not only dollar profit and loss",
    "Secured with IP-restricted API keys",
];

const AltureLockPage = () => {
    return (
        <>
            {/* Intro */}
            <IntroSequence />

            {/* Who this is for */}
            <section className="bg-black py-16 md:py-24 px-4 md:px-6">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-white text-center leading-relaxed mb-12 md:mb-16">
                        Not for beginners. Not about becoming profitable. About staying disciplined.
                    </h2>

                    <div className="space-y-6 text-left">
                        <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                            AltureLock is not designed for someone learning to trade. It is built for traders who are already profitable, some managing serious size, with years of experience.
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                            Every profitable trader loses money to the same thing eventually. Not a bad strategy. A broken rule. A trade that should have been closed and was not. A level that broke, a setup that was no longer valid, and a decision to hold anyway.
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                            This is not a beginner problem. It happens to experienced traders on leverage, where a small delay in cutting a trade becomes a large loss. Everyone comes back to the same habits eventually, not because they do not know better, but because they are human, not a machine.
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                            AltureLock exists to close that gap, the space between what a trader knows and what they actually do under pressure.
                        </p>
                        <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed">
                            If you are trading real size, on leverage, with a desk that costs thousands of dollars, your rules should not live on paper or in a spreadsheet. A system that costs less than one bad trade should be the thing standing between you and your own worst decision.
                        </p>
                        <p className="text-sm md:text-base font-light text-white leading-relaxed">
                            Level 1 broken, alarm. Level 2 broken, alarm. No negotiating with the setup once it is invalidated. Ten years of experience does not change what happens under pressure, it just makes the excuses more convincing.
                        </p>
                    </div>
                </div>
            </section>

            {/* Live price alerts */}
            <section className="bg-black pb-16 md:pb-20 px-4 md:px-6">
                <PriceAlerts />
            </section>

            {/* Interactive simulation */}
            <section className="bg-black pb-16 md:pb-24 px-4 md:px-6">
                <AltureLockSimulator />
            </section>

            {/* Feature list */}
            <section className="bg-black pb-20 md:pb-28 px-4 md:px-6">
                <div className="container mx-auto max-w-2xl">
                    <div className="space-y-5">
                        {FEATURES.map((feature, i) => (
                            <div key={i} className="border-l border-primary/30 pl-4 md:pl-6">
                                <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed">
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default AltureLockPage;
