// The full outline of each month. Not shown on the site: see programme-data.ts for what visitors see.
export const MONTHS = [
    {
        title: "Setup & Foundations",
        description: "Broker account setup (KYC, funding, API key connection for AltureLock later), platform walkthrough. Execute one real trade — any setup — to create a baseline, no rules yet. Then unpack it: market structure basics (BOS/CHoCH), why discipline beats prediction, journaling from day one.",
    },
    {
        title: "Reading the Chart",
        description: "VWAP, volume profile, CVD — how to use them together. Multi-timeframe context (4h bias → 15m structure → 5m entry). Spotting liquidity sweeps.",
    },
    {
        title: "Order Flow & Confirmation",
        description: "Deeper order flow reading. BTC correlation driving altcoin moves. Trend-alignment confirmation (BTC + asset + VWAP) before any entry.",
    },
    {
        title: "AltureLock: The Rule System",
        description: "Pre-trade checklist, hard drawdown stop, session lock after one loss. Why the system exists and how it's enforced at account level.",
    },
    {
        title: "Strategy & Entries",
        description: "The scalping strategy end to end — setup criteria, entry triggers, invalidation. Live chart walkthroughs. Why countertrend/reversal setups are banned by the rules.",
    },
    {
        title: "Live Practice, Guided",
        description: "Paper or micro-size live trading with AltureLock active. Group trade reviews.",
    },
    {
        title: "Trading for Real",
        description: "Consistent execution with AltureLock rules on, real position sizing, tracking actual results. The goal: make money, consistently, without blowing up the account.",
    },
];

const LockIcon = ({ gradientId }: { gradientId: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
        </defs>
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke={`url(#${gradientId})`} strokeWidth="1.5" />
        <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const EducationCurriculum = () => {
    return (
        <section className="py-12 md:py-20 bg-black relative overflow-hidden">
            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                <div className="mb-12 md:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-white">
                        The <span className="text-primary">Curriculum</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base font-light text-center mt-4 max-w-xl mx-auto">
                        Seven months, one system. Each month unlocks once you're in.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto divide-y divide-white/10">
                    {MONTHS.map((month, i) => (
                        <div key={i} className="py-8 group" data-aos="fade-up" data-aos-delay={i * 50}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-xs font-mono tracking-[0.2em] text-primary/60">
                                    MONTH {String(i + 1).padStart(2, "0")}
                                </span>
                                <LockIcon gradientId={`curriculumLock${i}`} />
                            </div>
                            <h3 className="text-lg md:text-xl font-light text-white mb-2">{month.title}</h3>
                            <p className="text-sm md:text-base font-light text-gray-400 leading-relaxed">
                                {month.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationCurriculum;
