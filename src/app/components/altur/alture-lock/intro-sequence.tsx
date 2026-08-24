"use client";

const IntroSequence = () => {
    return (
        <section className="relative bg-black overflow-hidden pt-32 pb-16 md:pb-20 font-mono">
            <div className="absolute inset-0 z-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="container mx-auto max-w-3xl relative z-10 px-4 md:px-6 text-center">
                <p className="intro-step intro-step-1 text-xs tracking-[0.2em] text-gray-600 mb-6">
                    &gt; SYSTEMS ARMED
                </p>

                <h1 className="intro-step intro-step-2 text-2xl sm:text-3xl md:text-4xl font-normal tracking-normal leading-snug mb-2">
                    <span className="text-white">Alture</span><span className="text-primary">Lock</span>
                </h1>
                <p className="intro-step intro-step-2 text-sm md:text-base text-gray-600 mb-10">
                    // your co-pilot
                </p>

                <div className="max-w-md mx-auto mb-10">
                    <p className="intro-step intro-step-3 text-sm md:text-base text-gray-300">
                        You define the rules.
                    </p>
                    <p className="intro-step intro-step-4 text-sm md:text-base text-gray-300 mt-2">
                        I lock them.
                    </p>
                    <p className="intro-step intro-step-5 text-sm md:text-base text-gray-300 mt-2">
                        You execute. I monitor.
                    </p>
                </div>

                <p className="intro-step intro-step-6 text-xs md:text-sm text-gray-600 leading-relaxed max-w-xl mx-auto">
                    // Ten years of experience does not stop a broken rule. Under pressure, everyone is human, not a machine. This is not about being a beginner or being profitable. It is about staying disciplined when it matters most.
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
