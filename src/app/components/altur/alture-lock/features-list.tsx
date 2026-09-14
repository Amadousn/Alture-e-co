const FEATURES = [
    "Sequential pre-trade checklist, no shortcuts",
    "Live monitoring against your predefined exit rules while the trade is open",
    "Risk limits enforced at the account level",
    "Full trade journal that shows whether you lost because the strategy failed or because you did not follow it",
    "Position sizing calculated automatically from your risk percent and stop distance",
    "Trade results measured in R multiples, not only dollar profit and loss",
    "Secured with IP-restricted API keys",
];

const FeaturesList = () => {
    return (
        <section className="bg-black pb-20 md:pb-28 px-4 md:px-6">
            <div className="container mx-auto max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white text-center leading-snug mb-12 md:mb-16">
                    What It Does
                </h2>

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
    );
};

export default FeaturesList;
