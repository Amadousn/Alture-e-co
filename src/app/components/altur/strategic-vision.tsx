"use client";

const StrategicVision = () => {
    return (
        <section id="strategic-vision" className="py-12 md:py-20 bg-black relative overflow-hidden">
            {/* Diagonal lines background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, #D4AF37 35px, #D4AF37 36px)',
                }}></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                {/* Section Header */}
                <div className="mb-12 md:mb-16" data-aos="fade-up">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-primary text-xs md:text-sm font-mono tracking-widest">VISION</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-primary via-transparent to-transparent"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                        Strategic <span className="text-primary">Vision</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray max-w-2xl">
                        Long-term wealth objectives through strategic planning and discreet execution
                    </p>
                </div>

                {/* Vision Grid - 2x2 Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-px bg-transparent md:bg-primary/20 max-w-5xl mx-auto mb-12 md:mb-16">
                    {/* Item 1 */}
                    <div className="bg-black/50 md:bg-black p-6 md:p-8 border border-white/10 md:border-none group hover:bg-semidark transition-colors" data-aos="fade-up" data-aos-delay="100">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Strategic Planning</h3>
                                <p className="text-gray text-xs md:text-sm">
                                    Comprehensive analysis and long-term roadmaps tailored to your wealth objectives
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-black/50 md:bg-black p-6 md:p-8 border border-white/10 md:border-none group hover:bg-semidark transition-colors" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Discreet Execution</h3>
                                <p className="text-gray text-xs md:text-sm">
                                    Confidential implementation with trusted partners across all jurisdictions
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-black/50 md:bg-black p-6 md:p-8 border border-white/10 md:border-none group hover:bg-semidark transition-colors" data-aos="fade-up" data-aos-delay="300">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Exclusive Opportunities</h3>
                                <p className="text-gray text-xs md:text-sm">
                                    Access to exclusive digital asset markets and private investment circles
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="bg-black/50 md:bg-black p-6 md:p-8 border border-white/10 md:border-none group hover:bg-semidark transition-colors" data-aos="fade-up" data-aos-delay="400">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 md:w-12 md:h-12 border border-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/10 transition-colors">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">Deep Market Expertise</h3>
                                <p className="text-gray text-xs md:text-sm">
                                    Innovative approaches backed by years of experience in Dubai and UAE markets
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA - Modern Design */}
                <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="500">
                    <div className="border border-primary/30 p-6 md:p-8 relative group hover:border-primary/50 transition-colors">
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

                        <p className="text-base md:text-lg text-gray mb-6 text-center">
                            Our approach combines <span className="text-primary font-semibold">bespoke portfolio strategies</span> with
                            <span className="text-white font-semibold"> long-term wealth objectives</span>, ensuring every decision aligns with your vision.
                        </p>
                        <div className="text-center">
                            <a href="#contact" className="inline-flex items-center gap-2 text-primary hover:text-primary_hover transition-colors group">
                                <span className="font-medium">Discuss Your Strategy</span>
                                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StrategicVision;
