"use client";
import Link from "next/link";

const WhatWeOffer = () => {
    return (
        <section id="what-we-offer" className="py-12 md:py-20 bg-black relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-12 md:mb-16" data-aos="fade-up">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center text-white">
                        Core <span className="text-primary">Disciplines</span>
                    </h2>
                </div>

                {/* Services Grid - Quiet, hairline-divided layout */}
                <div className="grid md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-white/10">
                    {/* Service 1: Proprietary Trading */}
                    <div className="group" data-aos="fade-up" data-aos-delay="100">
                        <div className="border-t border-white/10 group-hover:border-primary/40 transition-colors duration-500 pt-8 md:px-10 md:py-2">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-mono tracking-[0.2em] text-primary/50">01</span>
                                <svg className="w-5 h-5 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-light mb-4 text-white">Proprietary Trading</h3>
                            <p className="text-gray font-light leading-relaxed mb-6">
                                Crypto trading executed from our Dubai desk, using in-house strategies and risk-controlled execution.
                            </p>

                            <div className="space-y-2">
                                <p className="text-sm font-light text-gray/70">Institutional-grade execution, based in Dubai</p>
                                <p className="text-sm font-light text-gray/70">Performance available on request</p>
                            </div>
                        </div>
                    </div>

                    {/* Service 2: AI Market Data & News */}
                    <div className="group" data-aos="fade-up" data-aos-delay="200">
                        <div className="border-t border-white/10 group-hover:border-secondary/40 transition-colors duration-500 pt-8 md:px-10 md:py-2">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-mono tracking-[0.2em] text-secondary/60">02</span>
                                <svg className="w-5 h-5 text-secondary/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-light mb-4 text-white">AI Market Data &amp; News</h3>
                            <p className="text-gray font-light leading-relaxed mb-6">
                                Real-time market intelligence, including news, momentum shifts, and volatility signals, surfaced through our data feed.
                            </p>

                            <div className="space-y-2">
                                <p className="text-sm font-light text-gray/70">Live market news &amp; data feed</p>
                                <p className="text-sm font-light text-gray/70">Momentum and volatility tracking</p>
                                <p className="text-sm font-light text-gray/70">Signals to inform, not replace, judgment</p>
                            </div>
                        </div>
                    </div>

                    {/* Service 3: Trading Rules System */}
                    <div id="trading-rules" className="group" data-aos="fade-up" data-aos-delay="300">
                        <div className="border-t border-white/10 group-hover:border-primary/40 transition-colors duration-500 pt-8 md:px-10 md:py-2">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-mono tracking-[0.2em] text-primary/50">03</span>
                                <svg className="w-5 h-5 text-primary/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>

                            <h3 className="text-xl md:text-2xl font-light mb-4 text-white">Trading Rules System</h3>
                            <p className="text-gray font-light leading-relaxed mb-6">
                                Software built into the trade itself, enforced at the account level. Every order passes through it before execution. One loss triggers a session lock.
                            </p>

                            <div className="space-y-2">
                                <p className="text-sm font-light text-gray/70">Pre-trade checklist, hard drawdown stop, strategy confirmation</p>
                                <p className="text-sm font-light text-gray/70">Session lock after one loss, configurable</p>
                                <p className="text-sm font-light text-gray/70">Connected directly to your broker</p>
                                <p className="text-sm font-light text-gray/70">Secured with IP-restricted API keys</p>
                            </div>

                            <Link
                                href="/alturelock"
                                className="inline-block mt-6 text-sm font-light text-primary hover:text-primary_hover transition-colors"
                            >
                                Explore AltureLock →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
