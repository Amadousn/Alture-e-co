"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/language-context";

const EducationHero = () => {
    const { t } = useLanguage();
    const { education } = t;

    return (
        <section className="relative min-h-[100dvh] flex items-center bg-black overflow-hidden pt-32 pb-20 px-4 md:px-6">
            {/* Soft purple/pink glow, ambient accent only, page stays pure black */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[480px] h-[480px] md:w-[680px] md:h-[680px] rounded-full bg-gradient-to-br from-purple-500/25 via-fuchsia-500/15 to-transparent blur-[90px]" />
            </div>

            <div className="container mx-auto max-w-3xl relative z-10 text-center">
                <span
                    className="inline-block px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium tracking-[0.2em] uppercase mb-8"
                    style={{ color: "#E9A6FF" }}
                >
                    {education.badge}
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-snug mb-6 text-white">
                    {education.headlineLine1}
                    <br />
                    {education.headlinePrefix}{" "}
                    <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                        {education.headlineAccent}
                    </span>
                    .
                </h1>

                <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mb-10">
                    {education.subtext}
                </p>

                <Link
                    href="#access"
                    className="inline-flex items-center gap-2 px-7 py-3 border border-white/25 text-white text-sm tracking-wide hover:border-white/50 hover:bg-white/5 transition-colors"
                >
                    {education.requestAccess}
                    <span aria-hidden="true">→</span>
                </Link>
            </div>
        </section>
    );
};

export default EducationHero;
