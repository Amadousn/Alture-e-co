"use client";
import Link from "next/link";
import Ticker from "../ticker";
import HeroBtcChart from "./hero-btc-chart";
import { DubaiTime } from "@/app/components/altur/brand/desk-mark";
import { useLanguage } from "@/app/i18n/language-context";

const Hero = () => {
   const { t } = useLanguage();

   return (
      <section className="relative min-h-[100dvh] flex flex-col bg-black !py-0 overflow-hidden">
         <div className="container mx-auto max-w-7xl flex-grow flex flex-col px-4 md:px-6 pt-28 md:pt-36">
            {/* The statement sits left; the live market runs off to the right. */}
            <div className="flex-grow grid lg:grid-cols-12 gap-x-10 gap-y-14 items-end pb-10 md:pb-14">
               <div className="lg:col-span-6" data-aos="fade-up">
                  <h1 className="!text-4xl sm:!text-5xl lg:!text-[64px] text-white !leading-[1.04] mb-7 max-w-[13ch]">
                     {t.hero.headline} <span className="text-primary">{t.hero.headlineAccent}</span>{t.hero.headlineSuffix}
                  </h1>
                  <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-md">
                     {t.hero.subtext}
                  </p>
                  <Link href="/alturelock" className="group inline-flex items-baseline gap-3 mt-9 text-sm font-medium text-white border-b border-white/30 pb-1.5 hover:border-white transition-colors">
                     {t.offer.alturelock.cta}
                     <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
               </div>

               <div className="lg:col-span-6" data-aos="fade-up" data-aos-delay="100">
                  <HeroBtcChart />
               </div>
            </div>

            {/* Where the desk is, and what time it is there. */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-white/15 py-3.5 text-[11px] uppercase tracking-[0.14em] text-white/45">
               <span className="text-white/70">Business Bay, Dubai</span>
               <span className="hidden sm:inline font-mono normal-case tracking-normal">25.19° N, 55.27° E</span>
               <DubaiTime className="normal-case tracking-normal" />
            </div>
         </div>

         <div className="w-full relative z-20 border-t border-white/10 bg-black">
            <Ticker />
         </div>
      </section>
   );
};

export default Hero;
