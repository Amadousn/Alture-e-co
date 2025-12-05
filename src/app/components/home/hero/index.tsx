"use client";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/pathUtils";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImgPath("/images/hero/hero-image.png")}
          alt="Dubai Skyline"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      {/* Decorative gold gradient elements */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10 px-4">
        {/* Main Title */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
              REAL ESTATE AND DIGITAL ASSET STRUCTURING
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow-lg">
            Strategic portfolio management for high-net-worth individuals across Europe & UAE
          </p>
        </div>

        {/* Three Pillars */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {/* Real Estate Pillar */}
          <div
            className="bg-black/60 backdrop-blur-md border border-primary/30 rounded-xl p-6 group hover:scale-105 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl mb-6 group-hover:bg-primary/30 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Real Estate</h3>
            <p className="text-gray mb-4">
              Premium Dubai properties & strategic investments
            </p>
            <p className="text-sm text-gray/80">
              Property portfolios composed of 20 to 40+ assets with coordinated management
            </p>
          </div>

          {/* Digital Assets Pillar */}
          <div
            className="bg-black/60 backdrop-blur-md border border-secondary/30 rounded-xl p-6 group hover:scale-105 hover:border-secondary transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/20"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-xl mb-6 group-hover:bg-secondary/30 transition-colors">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Digital Assets</h3>
            <p className="text-gray mb-4">
              Crypto portfolio structuring & secure custody
            </p>
            <p className="text-sm text-gray/80">
              Cold wallet configuration and asset positioning aligned with UAE residency
            </p>
          </div>

          {/* Cross-Border Pillar */}
          <div
            className="bg-black/60 backdrop-blur-md border border-primary/30 rounded-xl p-6 group hover:scale-105 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-xl mb-6 group-hover:bg-primary/30 transition-colors">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white">Cross-Border</h3>
            <p className="text-gray mb-4">
              Strategic wealth alignment between Europe & UAE
            </p>
            <p className="text-sm text-gray/80">
              Discreet coordination with legal and financial partners across jurisdictions
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="400">
          <Link href="#what-we-offer" className="btn">
            Discover Our Services
          </Link>
          <Link href="#contact" className="btn_white">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

