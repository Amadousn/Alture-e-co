"use client";
import Link from 'next/link';
import Image from 'next/image';
import { getImgPath } from '@/utils/pathUtils';

const PropertiesCTA = () => {
    return (
        <section id="properties-cta" className="py-20 bg-black relative overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={getImgPath("/images/hero/hero-image.png")}
                    alt="Dubai Properties"
                    fill
                    className="object-cover opacity-30"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>
            </div>

            {/* Decorative gold elements */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="absolute top-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
                    {/* Section Header */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-20 bg-primary"></div>
                            <span className="text-primary text-sm font-mono tracking-widest">PORTFOLIO</span>
                            <div className="h-px w-20 bg-primary"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            Explore Our <span className="text-primary">Premium Properties</span>
                        </h2>
                        <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
                            Discover an exclusive selection of luxury real estate in Dubai's most prestigious locations
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-8 mb-12 py-8 border-y border-primary/20" data-aos="fade-up" data-aos-delay="100">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">20+</div>
                            <div className="text-sm text-gray">Premium Listings</div>
                        </div>
                        <div className="text-center border-x border-primary/20">
                            <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                            <div className="text-sm text-gray">Portfolio Value</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">100%</div>
                            <div className="text-sm text-gray">Exclusive Access</div>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="200">
                        <Link
                            href="/properties/properties-list"
                            className="btn w-full sm:w-auto px-8 py-4 text-center flex items-center justify-center gap-2 group"
                        >
                            View All Properties
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="#contact"
                            className="btn_white w-full sm:w-auto px-8 py-4 text-center"
                        >
                            Schedule Viewing
                        </Link>
                    </div>

                    {/* Trust Badge */}
                    <div className="mt-12 pt-8 border-t border-primary/20" data-aos="fade-up" data-aos-delay="300">
                        <p className="text-sm text-gray italic">
                            🔒 All property viewings are conducted with strict confidentiality
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PropertiesCTA;
