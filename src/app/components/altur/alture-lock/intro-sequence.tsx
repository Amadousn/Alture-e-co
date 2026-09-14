"use client";

const IntroSequence = () => {
    return (
        <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden pt-32 pb-16 md:pb-20">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] md:w-[680px] md:h-[680px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/8 to-transparent blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-3xl relative z-10 px-4 md:px-6 text-center">
                <span className="intro-step intro-step-1 inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium tracking-[0.2em] uppercase mb-8 text-primary">
                    Active
                </span>

                <h1 className="intro-step intro-step-2 text-3xl sm:text-4xl md:text-5xl font-light tracking-normal leading-snug mb-3">
                    <span className="text-white">Alture</span><span className="text-primary">Lock</span>
                </h1>
                <p className="intro-step intro-step-2 text-sm md:text-base text-gray-500 mb-10 font-light">
                    Your Co-Pilot
                </p>

                <div className="max-w-md mx-auto mb-10">
                    <p className="intro-step intro-step-3 text-base md:text-lg text-gray-300 font-light">
                        You define the rules.
                    </p>
                    <p className="intro-step intro-step-4 text-base md:text-lg text-gray-300 font-light mt-2">
                        I lock them.
                    </p>
                    <p className="intro-step intro-step-5 text-base md:text-lg text-gray-300 font-light mt-2">
                        You execute. I monitor.
                    </p>
                </div>

                <p className="intro-step intro-step-6 text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-xl mx-auto">
                    Ten years of experience does not stop a broken rule. Under pressure, everyone is human, not a machine. This is not about being a beginner or being profitable. It is about staying disciplined when it matters most.
                </p>
            </div>

            <style jsx>{`
                .intro-step {
                    opacity: 0;
                    transform: translateY(6px);
                    animation: introFadeUp 400ms ease-out forwards;
                }
                .intro-step-1 { animation-delay: 0ms; }
                .intro-step-2 { animation-delay: 200ms; }
                .intro-step-3 { animation-delay: 450ms; }
                .intro-step-4 { animation-delay: 600ms; }
                .intro-step-5 { animation-delay: 750ms; }
                .intro-step-6 { animation-delay: 1000ms; }

                @keyframes introFadeUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
};

export default IntroSequence;
