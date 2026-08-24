import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Alture & Co.",
};

const ContactPage = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-black overflow-hidden pt-32 pb-20">
      {/* Subtle background texture, matching the hero */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 px-4 md:px-6 text-center">
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mb-12">
          For a confidential discussion about our services, reach out directly.
        </p>

        <div className="flex flex-col items-center gap-4 text-sm md:text-base font-light">
          <a href="mailto:celine@altureandco.com" className="text-white hover:text-primary transition-colors">
            celine@altureandco.com
          </a>
          <span className="text-gray-500">Business Bay, Dubai</span>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
