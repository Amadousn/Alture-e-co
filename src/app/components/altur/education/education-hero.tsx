"use client";

import Link from "next/link";
import { useLanguage } from "@/app/i18n/language-context";
import { MODULES } from "./programme-data";

const EducationHero = () => {
    const { t } = useLanguage();
    const { education } = t;

    return (
        <section className="bg-black min-h-[100dvh] flex flex-col justify-end !pt-32 md:!pt-40 !pb-14 md:!pb-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex items-baseline gap-4 border-t border-white/15 pt-3.5 text-[11px] uppercase tracking-[0.14em]">
                    <span className="text-white/70">{education.badge}</span>
                    <span className="ml-auto font-mono normal-case tracking-normal text-white/45">{String(MODULES.length).padStart(2, "0")}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-12 pt-10 md:pt-16">
                    <div className="lg:col-span-7">
                        <h1 className="!text-4xl sm:!text-5xl lg:!text-6xl !leading-[1.06] mb-7 text-white">
                            {education.headlineLine1}
                            <br />
                            {education.headlinePrefix} <span className="text-primary">{education.headlineAccent}</span>.
                        </h1>

                        <p className="text-white/60 text-[15px] md:text-base leading-relaxed max-w-lg mb-9">{education.subtext}</p>

                        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
                            <Link href="/education/programme" className="group inline-flex items-center gap-3 rounded-sm px-6 py-3.5 bg-white text-black text-sm font-medium hover:bg-[#e4e4e8] transition-colors lit">
                                {education.exploreProgramme}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-white border-b border-white/30 pb-1.5 hover:border-white transition-colors">
                                {education.requestAccess}
                            </Link>
                        </div>
                    </div>

                    {/* The programme as a table of contents: each line opens the programme page at that module. */}
                    <ol className="lg:col-span-5 lg:pl-10 self-end">
                        {MODULES.map((item, i) => (
                            <li key={i}>
                                <Link href={`/education/programme#module-${i + 1}`} className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 border-t border-white/15 py-3.5 text-left transition-colors hover:bg-white/[0.03]">
                                    <span className="font-mono text-[11px] tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                                    <span className="text-[15px] text-white/75 group-hover:text-white transition-colors">{item.title}</span>
                                    <span aria-hidden="true" className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">→</span>
                                </Link>
                            </li>
                        ))}
                        <li className="border-t border-white/15" aria-hidden="true" />
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default EducationHero;
