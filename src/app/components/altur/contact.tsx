"use client";

import { DubaiTime, SectionMark } from "@/app/components/altur/brand/desk-mark";
import SocialLinks from "@/app/components/altur/brand/social-links";
import { useLanguage } from "@/app/i18n/language-context";

const EMAIL = "celine@altureandco.com";

// One way to get in touch, set large. No scroll-in animation: "Request
// access" links land here directly, and it has to be readable at once.
const Contact = () => {
    const { t } = useLanguage();
    const { contact } = t;

    return (
        <section id="contact" className="bg-black !py-20 md:!py-28 scroll-mt-20">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <SectionMark label={contact.label}>
                    <DubaiTime />
                </SectionMark>

                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 pt-10 md:pt-16 items-end">
                    <div className="lg:col-span-7">
                        <h2 className="!text-4xl md:!text-6xl text-white mb-6">{contact.title}</h2>
                        <p className="text-white/55 leading-relaxed max-w-md">{contact.text}</p>
                    </div>

                    <dl className="lg:col-span-5 grid sm:grid-cols-2 gap-x-10 gap-y-6 text-sm lg:pb-2">
                        <div className="sm:col-span-2">
                            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-1.5">{contact.email}</dt>
                            <dd>
                                <a href={`mailto:${EMAIL}`} className="text-base text-white border-b border-white/30 pb-0.5 hover:border-white transition-colors break-all">
                                    {EMAIL}
                                </a>
                            </dd>
                        </div>
                        <div>
                            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-1.5">{contact.location}</dt>
                            <dd className="text-white">Business Bay, Dubai</dd>
                        </div>
                        <div>
                            <dt className="text-[11px] uppercase tracking-[0.14em] text-white/45 mb-0.5">Social</dt>
                            <dd>
                                <SocialLinks className="-ml-2.5" />
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default Contact;
