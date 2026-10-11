"use client";
import Link from "next/link";
import { SectionMark } from "@/app/components/altur/brand/desk-mark";
import { useLanguage } from "@/app/i18n/language-context";

// The firm's four activities as an index, not a grid of cards: each row is
// one link, and the first is given the room its importance deserves.
const WhatWeOffer = () => {
    const { t } = useLanguage();
    const { offer } = t;

    const rest = [
        { n: "02", href: "/alturelock#journal", item: offer.journal, tag: "" },
        { n: "03", href: "/education", item: offer.education, tag: "" },
        { n: "04", href: "/contact", item: offer.trading, tag: "" },
    ];

    return (
        <section id="what-we-offer" className="bg-black !py-20 md:!py-28">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <Link href="/alturelock" data-aos="fade-up" className="group block">
                    <SectionMark index="01" label={offer.alturelock.label} />
                    <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 items-end pt-8 pb-14 md:pt-12 md:pb-20">
                        <h2 className="lg:col-span-7 font-logo !font-extralight !tracking-[-0.02em] !text-6xl sm:!text-7xl lg:!text-[112px] !leading-[0.95] text-white">
                            Alture<span className="font-normal">Lock</span>
                        </h2>
                        <div className="lg:col-span-5 lg:pb-3">
                            <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md">{offer.alturelock.description}</p>
                            <span className="inline-flex items-center gap-3 mt-7 rounded-sm bg-white text-black text-sm font-medium px-6 py-3.5 lit group-hover:bg-[#e4e4e8] transition-colors">
                                {offer.alturelock.cta}
                                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                            </span>
                        </div>
                    </div>
                </Link>

                <ul>
                    {rest.map(({ n, href, item, tag }) => (
                        <li key={n} data-aos="fade-up">
                            <Link href={href} className="group grid grid-cols-[2.5rem_1fr_auto] lg:grid-cols-12 gap-x-4 lg:gap-x-10 gap-y-2 items-baseline border-t border-white/15 py-7 md:py-9 transition-colors hover:bg-white/[0.025]">
                                <span className="lg:col-span-1 font-mono text-[11px] tabular-nums text-accent">{n}</span>
                                <span className="lg:col-span-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                                    <span className="text-2xl md:text-[32px] font-medium tracking-tight text-white">{item.title}</span>
                                    {tag && <span className="text-[10px] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-sm border border-[#20B8A8]/70 text-[#20B8A8]">{tag}</span>}
                                </span>
                                <span className="col-start-2 lg:col-start-auto lg:col-span-5 text-[15px] leading-relaxed text-white/55 max-w-lg">{item.description}</span>
                                <span className="col-start-2 lg:col-start-auto lg:col-span-2 lg:text-right text-sm font-medium text-white/80 group-hover:text-white whitespace-nowrap">
                                    {item.cta.replace(/\s*→\s*$/, "")}{" "}
                                    <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li className="border-t border-white/15" aria-hidden="true" />
                </ul>
            </div>
        </section>
    );
};

export default WhatWeOffer;
