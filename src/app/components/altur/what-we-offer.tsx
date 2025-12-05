"use client";

const WhatWeOffer = () => {
    return (
        <section id="what-we-offer" className="py-20 bg-black relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-16" data-aos="fade-up">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                        <span className="text-primary text-sm font-mono tracking-widest">SERVICES</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
                        What We <span className="text-primary">Manage</span>
                    </h2>
                    <p className="text-xl text-gray text-center max-w-2xl mx-auto">
                        Comprehensive wealth management across real estate and digital assets
                    </p>
                </div>

                {/* Services Grid - Modern Layout */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {/* Service 1: Real Estate */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="100">
                        {/* Gold border that animates on hover */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-primary/30 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all">
                            {/* Number indicator */}
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">01</span>
                                <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">Real Estate</h3>
                            <p className="text-gray mb-6">
                                Property portfolios composed of 20 to 40+ assets
                            </p>

                            {/* Features list with gold bullets */}
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Coordination with selected agents</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Clear strategy per asset</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Single trusted contact</p>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Service 2: Digital Assets */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="200">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary via-primary to-secondary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-secondary/30 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-secondary/20 transition-all">
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-6xl font-bold text-secondary/20 group-hover:text-secondary/30 transition-colors">02</span>
                                <div className="w-12 h-12 border border-secondary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">Digital Assets</h3>
                            <p className="text-gray mb-6">
                                Structuring of crypto portfolios: cold wallet configuration
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Asset organization & custody</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">UAE residency alignment</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-secondary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Secure cold wallet setup</p>
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>

                    {/* Service 3: Cross-Border */}
                    <div className="group relative" data-aos="fade-up" data-aos-delay="300">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                        <div className="relative bg-black border border-primary/30 p-8 h-full shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all">
                            <div className="flex items-start justify-between mb-6">
                                <span className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">03</span>
                                <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-4 text-white">Cross-Border Coordination</h3>
                            <p className="text-gray mb-6">
                                Real estate and digital capital aligned between Europe and UAE
                            </p>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Discreet legal partnerships</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Financial coordination</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-1 h-1 bg-primary mt-2 flex-shrink-0"></div>
                                    <p className="text-sm text-gray/80">Regulatory navigation</p>
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
