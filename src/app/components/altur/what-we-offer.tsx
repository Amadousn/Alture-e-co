"use client";

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
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        <span className="text-primary text-xs md:text-sm font-mono tracking-widest">SERVICES</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 text-white">
                        What We <span className="text-primary">Manage</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray text-center max-w-2xl mx-auto">
                        Comprehensive wealth management across digital assets and strategic capital markets
                    </p>
                </div>

                {/* Services Grid - Modern Layout */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
                    {/* Service 1: Proprietary Trading */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="100">
                        {/* Gold border that animates on hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-primary/30 p-6 md:p-8 h-full shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all">
                            {/* Number indicator */}
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-5xl md:text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">01</span>
                                <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">Proprietary Trading</h3>
                            <p className="text-gray mb-6">
                                Institutional-grade experience across proprietary trading desks.
                            </p>

                            {/* Features list with gold bullets */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Performance metrics available</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Direct discussion only</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Institutional-grade execution</p>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Service 2: AI Market Analysis */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="200">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-secondary/30 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-secondary/20 transition-all">
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-6xl font-bold text-secondary/20 group-hover:text-secondary/30 transition-colors">02</span>
                                <div className="w-12 h-12 border border-secondary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">AI Market Analysis</h3>
                            <p className="text-gray mb-6">
                                AI-assisted market analysis focused on momentum and volatility regimes.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Momentum identification</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Volatility regime analysis</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">High-probability conditions</p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Service 3: Capital Strategy */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="300">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-primary/30 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all">
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">03</span>
                                <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">Capital Strategy</h3>
                            <p className="text-gray mb-6">
                                Strategic capital deployment across digital assets.
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Risk parameter alignment</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Market structure analysis</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Strategic deployment</p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeOffer;
