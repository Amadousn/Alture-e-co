"use client";

const WhoWeAre = () => {
    return (
        <section id="who-we-are" className="py-20 bg-white relative overflow-hidden">
            {/* Animated background lines */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
                <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent"></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-12" data-aos="fade-up">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-primary"></div>
                            <span className="text-primary text-sm font-mono tracking-widest">ABOUT</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black">
                            Who We Are
                        </h2>
                    </div>

                    {/* Main Content - Split Layout */}
                    <div className="grid md:grid-cols-2 gap-12" data-aos="fade-up" data-aos-delay="100">
                        {/* Left: Description */}
                        <div className="space-y-6">
                            <div className="border-l-2 border-primary pl-6">
                                <p className="text-xl text-black leading-relaxed mb-4">
                                    Alture & Co. is a <span className="text-primary font-medium">discreet advisory firm</span> based in Dubai.
                                </p>
                                <p className="text-lg text-black leading-relaxed">
                                    Focused on real estate and digital capital, the firm serves an international clientele across{" "}
                                    <span className="text-primary font-semibold">Europe and the UAE</span>.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-primary/20">
                                <p className="text-base text-black leading-relaxed">
                                    Every engagement is guided by <span className="text-primary font-medium">long-term vision</span>,{" "}
                                    <span className="text-primary font-medium">clarity</span>, and{" "}
                                    <span className="text-primary font-medium">full confidentiality</span>.
                                </p>
                            </div>
                        </div>

                        {/* Right: Clientele */}
                        <div>
                            <h3 className="text-xl font-bold mb-8 text-black flex items-center gap-3">
                                <div className="w-8 h-px bg-primary"></div>
                                Our Clientele
                            </h3>

                            <div className="space-y-4">
                                <div className="group flex items-start gap-4 p-4 bg-white border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all shadow-sm">
                                    <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <div>
                                        <h4 className="text-black font-semibold mb-1">Private <span className="text-primary">Investors</span></h4>
                                        <p className="text-sm text-black">Managing significant capital across markets</p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-4 p-4 bg-white border-2 border-secondary/30 hover:border-secondary hover:bg-secondary/5 transition-all shadow-sm">
                                    <div className="w-2 h-2 bg-secondary mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <div>
                                        <h4 className="text-black font-semibold mb-1"><span className="text-secondary">Founders</span></h4>
                                        <p className="text-sm text-black">Entrepreneurs building global ventures</p>
                                    </div>
                                </div>

                                <div className="group flex items-start gap-4 p-4 bg-white border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all shadow-sm">
                                    <div className="w-2 h-2 bg-primary mt-2 flex-shrink-0 group-hover:scale-150 transition-transform"></div>
                                    <div>
                                        <h4 className="text-black font-semibold mb-1">Independent <span className="text-primary">Wealth Managers</span></h4>
                                        <p className="text-sm text-black">Professionals seeking strategic partnerships</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats/Highlights */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-primary/20" data-aos="fade-up" data-aos-delay="200">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">120-150</div>
                            <div className="text-sm text-black">Assets per Portfolio</div>
                        </div>
                        <div className="text-center border-x border-primary/20">
                            <div className="text-3xl font-bold text-primary mb-2">2</div>
                            <div className="text-sm text-black">Continents Covered</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-black">Confidential</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
