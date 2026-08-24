"use client";
import Ticker from "../ticker";

const Hero = () => {
   return (
      <section className="relative min-h-[100dvh] flex flex-col justify-between items-center overflow-hidden bg-black pt-24 md:pt-0">
         {/* Subtle background texture */}
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-5">
               <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
               }}></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-primary rounded-full blur-3xl opacity-5"></div>
         </div>

         <div className="container mx-auto max-w-7xl relative z-10 px-4 md:px-6 h-full flex flex-col justify-center items-center flex-grow py-12">

            {/* Main Content - Centered */}
            <div className="text-center max-w-3xl" data-aos="fade-up">
               <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 md:mb-8 tracking-normal leading-snug">
                  We trade crypto. With <span className="text-primary">rules</span>, not feelings.
               </h1>

               <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
                  A discreet proprietary desk in Dubai. Every trade passes through the same system before it&apos;s placed.
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
