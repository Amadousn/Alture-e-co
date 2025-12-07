"use client";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/pathUtils";
import { Icon } from "@iconify/react";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={getImgPath("/images/hero/hero-image.png")}
          alt="Dubai Skyline"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 px-6 h-full flex flex-col justify-center pb-32">
        
        {/* Main Content - Editorial Style */}
        <div className="max-w-4xl pt-20" data-aos="fade-up">
          {/* Refined Sub-header */}
          <div className="flex items-center gap-3 mb-6 opacity-80">
             <div className="h-[1px] w-8 bg-[#D4AF37]"></div>
             <span className="text-white text-[10px] font-medium tracking-[0.3em] uppercase">Est. 2025 • Dubai & Europe</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 leading-[1.1] tracking-tight">
            The Art of <br />
            <span className="font-serif italic text-[#D4AF37]">Wealth Architecture</span>
          </h1>
          
          <p className="text-lg text-gray-300 max-w-xl font-light leading-relaxed tracking-wide mb-10 border-l border-[#D4AF37]/50 pl-6">
            An exclusive advisory firm dedicated to structuring premium real estate and digital assets for the discerning investor.
          </p>

          <div className="flex flex-wrap gap-6">
            <Link 
                href="#what-we-offer" 
                className="px-8 py-3 bg-white text-black font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] transition-colors duration-500"
            >
                Our Expertise
            </Link>
            <Link 
                href="#contact" 
                className="px-8 py-3 border border-white/30 text-white font-medium text-xs uppercase tracking-[0.2em] hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-500"
            >
                Private Consultation
            </Link>
          </div>
        </div>

        {/* Elegant Footer Pillars (Bottom of Hero) */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/5 bg-black/60 backdrop-blur-md">
           <div className="container mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                 
                 {/* Pillar 1 */}
                 <div className="py-6 md:px-8 first:pl-0 group cursor-default hover:bg-white/5 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-2">
                       <Icon icon="ph:buildings-thin" className="w-6 h-6 text-[#D4AF37]" />
                       <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Real Estate</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                       Curated portfolios of 20-40+ premium assets.
                    </p>
                 </div>

                 {/* Pillar 2 */}
                 <div className="py-6 md:px-8 group cursor-default hover:bg-white/5 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-2">
                       <Icon icon="ph:currency-btc-thin" className="w-6 h-6 text-[#D4AF37]" />
                       <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Digital Assets</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                       Secure crypto structuring & cold storage.
                    </p>
                 </div>

                 {/* Pillar 3 */}
                 <div className="py-6 md:px-8 group cursor-default hover:bg-white/5 transition-colors duration-500">
                    <div className="flex items-center gap-3 mb-2">
                       <Icon icon="ph:globe-hemisphere-east-thin" className="w-6 h-6 text-[#D4AF37]" />
                       <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em]">Cross-Border</h3>
                    </div>
                    <p className="text-gray-400 text-xs font-light leading-relaxed group-hover:text-gray-200 transition-colors">
                       UAE & Europe wealth alignment strategy.
                    </p>
                 </div>

              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;

