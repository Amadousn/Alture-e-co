"use client";
import Link from "next/link";
import Image from "next/image";
import { getImgPath } from "@/utils/pathUtils";
import { Icon } from "@iconify/react";
import Ticker from "../ticker";

const Hero = () => {
   return (
      <section className="relative h-screen flex flex-col justify-between items-center overflow-hidden bg-black">
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90"></div>
         </div>

         <div className="container mx-auto max-w-7xl relative z-10 px-6 h-full flex flex-col justify-center items-center flex-grow">

            {/* Main Content - Centered */}
            <div className="text-center max-w-5xl mb-16" data-aos="fade-up">
               <h1 className="text-5xl md:text-7xl font-light text-[#E5D5A0] mb-10 tracking-wide uppercase">
                  Digital Asset Strategy
               </h1>

               <div className="flex justify-center">
                  <Link
                     href="#contact"
                     className="px-10 py-4 border border-[#D4AF37] text-[#D4AF37] font-medium text-sm uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm"
                  >
                     Request Access
                  </Link>
               </div>
            </div>

            {/* 3 Pillars Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mt-8">
               {/* Card 1: Proprietary Trading */}
               <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-lg text-center hover:bg-black/60 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="100">
                  <div className="flex justify-center mb-6">
                     <Icon icon="ph:chart-bar-thin" className="w-12 h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-xl font-medium mb-4">Proprietary Trading</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                     Discretionary crypto trading using in-house strategies, risk control, and market structure analysis.
                  </p>
               </div>

               {/* Card 2: AI Market Analysis */}
               <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-lg text-center hover:bg-black/60 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="200">
                  <div className="flex justify-center mb-6">
                     <Icon icon="ph:brain-thin" className="w-12 h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-xl font-medium mb-4">AI Market Analysis</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                     AI-assisted models used to identify momentum, volatility shifts, and high probability market scenarios.
                  </p>
               </div>

               {/* Card 3: Capital Strategy */}
               <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-8 rounded-lg text-center hover:bg-black/60 transition-all duration-500 group" data-aos="fade-up" data-aos-delay="300">
                  <div className="flex justify-center mb-6">
                     <Icon icon="ph:briefcase-thin" className="w-12 h-12 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[#E5D5A0] text-xl font-medium mb-4">Capital Strategy</h3>
                  <p className="text-gray-300 text-sm font-light leading-relaxed">
                     Strategic deployment of capital across digital assets, aligned with risk profile and market conditions.
                  </p>
               </div>
            </div>

         </div>

         {/* Ticker at the absolute bottom */}
         <div className="w-full relative z-20">
            <Ticker />
         </div>
      </section>
   );
};

export default Hero;

