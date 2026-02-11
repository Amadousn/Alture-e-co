"use client";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/pathUtils";
import { Icon } from "@iconify/react";
import Ticker from "../ticker";

const Hero = () => {
   return (
      <section className="relative min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-black pt-24 md:pt-0">
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
         </div>

         <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-6 h-full flex flex-col justify-center md:justify-start items-center flex-grow py-12 md:pt-48 md:pb-12">

            {/* Main Content - Centered */}
            <div className="text-center max-w-5xl mb-12 md:mb-16" data-aos="fade-up">
               <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-[#E5D5A0] mb-8 md:mb-10 tracking-wide uppercase leading-tight">
                  Digital Asset Strategy
               </h1>

               <div className="flex justify-center">
                  <Link
                     href="#contact"
                     className="px-8 py-3 md:px-10 md:py-4 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs md:text-sm uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm bg-black/30 backdrop-blur-sm"
                  >
                     Request Access
                  </Link>
               </div>
            </div>

            {/* 3 Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-6xl mt-4 md:mt-8">
               {/* Card 1: Proprietary Trading */}
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm text-center hover:border-[#D4AF37]/50 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex justify-center mb-4 md:mb-6">
                     <Icon icon="ph:chart-bar-thin" className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-lg md:text-xl font-medium mb-2 md:mb-4">Proprietary Trading</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                     Discretionary crypto trading using in-house strategies, risk control, and market structure analysis.
                  </p>
               </div>

               {/* Card 2: AI Market Analysis */}
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm text-center hover:border-[#D4AF37]/50 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex justify-center mb-4 md:mb-6">
                     <Icon icon="ph:brain-thin" className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-lg md:text-xl font-medium mb-2 md:mb-4">AI Market Analysis</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                     AI-assisted models used to identify momentum, volatility shifts, and high probability market scenarios.
                  </p>
               </div>

               {/* Card 3: Capital Strategy */}
               <div className="bg-black/60 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-sm text-center hover:border-[#D4AF37]/50 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex justify-center mb-4 md:mb-6">
                     <Icon icon="ph:briefcase-thin" className="w-8 h-8 md:w-12 md:h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-lg md:text-xl font-medium mb-2 md:mb-4">Capital Strategy</h3>
                  <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                     Strategic deployment of capital across digital assets, aligned with risk profile and market conditions.
                  </p>
               </div>
            </div>

         </div>

         {/* Ticker at the absolute bottom */}
         <div className="w-full relative z-20 border-t border-white/10 bg-black">
            <Ticker />
         </div>
      </section>
   );
};

export default Hero;

