"use client";

import { useLanguage } from "@/app/i18n/language-context";

const Contact = () => {
    const { t } = useLanguage();

    return (
        <section id="contact" className="py-12 md:py-20 bg-black relative overflow-hidden">
            {/* Soft ambient glow behind the contact grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#D4AF37]/15 via-[#D4AF37]/6 to-transparent blur-[100px]" />
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Contact Grid */}
                    <div className="grid mb-8 md:mb-12">
                        <div
                            className="max-w-xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 md:divide-x md:divide-white/10"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            {/* Email */}
                            <a href="mailto:celine@altureandco.com" className="group md:px-8 py-2 text-center md:text-left">
                                <span className="block text-xs font-mono tracking-[0.2em] text-primary/50 mb-3">01</span>
                                <p className="text-sm font-light text-gray-400 mb-1">{t.contact.email}</p>
                                <p className="inline-block relative text-base md:text-lg font-light text-white group-hover:text-primary transition-colors break-all">
                                    celine@altureandco.com
                                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"></span>
                                </p>
                            </a>

                            {/* Location */}
                            <div className="group md:px-8 py-2 text-center md:text-left">
                                <span className="block text-xs font-mono tracking-[0.2em] text-primary/50 mb-3">02</span>
                                <p className="text-sm font-light text-gray-400 mb-1">{t.contact.location}</p>
                                <p className="inline-block relative text-base md:text-lg font-light text-white">
                                    Business Bay, Dubai
                                    <span className="absolute left-0 -bottom-1 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
