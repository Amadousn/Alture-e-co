"use client";
import { useEffect, useRef, useState } from "react";
import Ticker from "../ticker";
import HeroChartBackground from "./hero-chart-background";
import LivePriceHeader from "./live-price-header";
import { useLanguage } from "@/app/i18n/language-context";

const Hero = () => {
   const { t } = useLanguage();
   const sectionRef = useRef<HTMLElement>(null);
   const headlineRef = useRef<HTMLDivElement>(null);
   const [mousePos, setMousePos] = useState<{ xFraction: number; yFraction: number } | null>(null);
   const [textZone, setTextZone] = useState<{ top: number; bottom: number } | null>(null);

   const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const xFraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const yFraction = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
      setMousePos({ xFraction, yFraction });
   };

   const handleMouseLeave = () => {
      setMousePos(null);
   };

   useEffect(() => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      if (!section || !headline) return;

      const update = () => {
         const sectionRect = section.getBoundingClientRect();
         const headlineRect = headline.getBoundingClientRect();
         if (sectionRect.height === 0) return;
         setTextZone({
            top: (headlineRect.top - sectionRect.top) / sectionRect.height,
            bottom: (headlineRect.bottom - sectionRect.top) / sectionRect.height,
         });
      };

      update();
      const observer = new ResizeObserver(update);
      observer.observe(section);
      observer.observe(headline);
      return () => observer.disconnect();
   }, []);

   return (
      <section
         ref={sectionRef}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         className="relative min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-black pt-24 md:pt-0"
      >
         {/* Live price chart texture */}
         <HeroChartBackground mousePos={mousePos} textZone={textZone} />

         {/* Live BTC price readout, top right */}
         <div className="hidden md:block absolute top-24 right-6 md:right-10 z-20">
            <LivePriceHeader />
         </div>

         <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-6 h-full flex flex-col justify-center items-center flex-grow py-12">

            {/* Main Content - Centered */}
            <div ref={headlineRef} className="text-center max-w-3xl" data-aos="fade-up">
               <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 md:mb-8 tracking-normal leading-snug">
                  {t.hero.headline} <span className="text-primary">{t.hero.headlineAccent}</span>{t.hero.headlineSuffix}
               </h1>

               <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
                  {t.hero.subtext}
               </p>
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
