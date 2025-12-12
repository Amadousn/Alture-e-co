"use client";

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white relative overflow-hidden">
            {/* Radial gradient background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-16" data-aos="fade-up">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <div className="h-px w-20 bg-primary"></div>
                            <span className="text-primary text-sm font-mono tracking-widest">CONTACT</span>
                            <div className="h-px w-20 bg-primary"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
                            Get in <span className="text-primary">Touch</span>
                        </h2>
                        <p className="text-xl text-black">
                            Discreet consultation for high-net-worth individuals
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="grid md:grid-cols-2 gap-12 mb-12">
                        {/* Left: Contact Methods */}
                        <div className="space-y-6" data-aos="fade-right" data-aos-delay="100">
                            <h3 className="text-2xl font-bold text-black mb-8 flex items-center gap-3">
                                <div className="w-1 h-8 bg-primary"></div>
                                Contact Information
                            </h3>

                            {/* WhatsApp */}
                            <a href="https://wa.me/971509845622" className="group flex items-start gap-4 p-6 border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-black mb-1">WhatsApp</p>
                                    <p className="text-lg font-medium text-black group-hover:text-primary transition-colors">
                                        <span className="text-primary">+971 50 984 5622</span>
                                    </p>
                                    <p className="text-xs text-black mt-2">Preferred method for <span className="text-primary">quick response</span></p>
                                </div>
                            </a>

                            {/* Email */}
                            <a href="mailto:Celine@altureandco.com" className="group flex items-start gap-4 p-6 border border-secondary/30 hover:border-secondary hover:bg-secondary/5 transition-all shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 border border-secondary flex items-center justify-center flex-shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-black mb-1">Email</p>
                                    <p className="text-lg font-medium text-black group-hover:text-secondary transition-colors">
                                        <span className="text-secondary">Celine@altureandco.com</span>
                                    </p>
                                    <p className="text-xs text-black mt-2">For <span className="text-secondary">detailed inquiries</span></p>
                                </div>
                            </a>

                            {/* Location */}
                            <div className="group flex items-start gap-4 p-6 border border-primary/30 hover:border-primary hover:bg-primary/5 transition-all shadow-sm hover:shadow-md">
                                <div className="w-12 h-12 border border-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-black mb-1">Location</p>
                                    <p className="text-lg font-medium text-black">
                                        <span className="text-primary">Dubai, UAE</span>
                                    </p>
                                    <p className="text-xs text-black mt-2">Strategic hub for <span className="text-primary">Europe-UAE</span> coordination</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: CTA Box */}
                        <div className="flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200">
                            <div className="border-2 border-primary/30 p-8 relative shadow-lg">
                                {/* Animated corner */}
                                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                                <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary"></div>

                                <h4 className="text-2xl font-bold mb-4 text-black">Schedule a <span className="text-primary">Consultation</span></h4>
                                <p className="text-black mb-8">
                                    Reach out via <span className="text-primary">WhatsApp</span> or <span className="text-secondary">email</span> for a confidential discussion about your wealth management needs.
                                </p>

                                <div className="space-y-4">
                                    <a
                                        href="https://wa.me/971509845622?text=Hello%2C%20I%27d%20like%20to%20discuss%20wealth%20management%20services"
                                        className="btn w-full text-center flex items-center justify-center gap-2"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Contact via WhatsApp
                                    </a>

                                </div>

                                <div className="mt-8 pt-6 border-t border-primary/20 text-center">
                                    <p className="text-sm text-black italic">
                                        🔒 All inquiries are treated with strict confidentiality
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
