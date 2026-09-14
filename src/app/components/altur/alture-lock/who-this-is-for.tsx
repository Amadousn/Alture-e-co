const WhoThisIsFor = () => {
    return (
        <section className="bg-black py-16 md:py-24 px-4 md:px-6">
            <div className="container mx-auto max-w-2xl text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-snug mb-6">
                    For Who?
                </h2>

                <div className="space-y-6 text-left">
                    <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                        AltureLock is built for traders who are already profitable, some managing serious size, with years of experience. Every one of them eventually loses money to the same thing — not a bad strategy, a broken rule. A trade that should have been closed and wasn't.
                    </p>
                    <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                        It happens on leverage, where a small delay in cutting a trade becomes a large loss — not because you don't know better, but because you're human, not a machine. AltureLock closes that gap: rules enforced at the account level, not left on paper.
                    </p>
                    <p className="text-sm md:text-base font-light text-white leading-relaxed">
                        Level 1 broken, alarm. Level 2 broken, alarm. No negotiating with the setup once it is invalidated.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WhoThisIsFor;
