"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/app/i18n/language-context";

const Footer = () => {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isEducation = pathname?.startsWith("/education");
  const accentColor = isEducation ? "#E879F9" : "#D4AF37";

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl pt-12 md:pt-20 pb-8 md:pb-10 px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12 md:mb-20">

          {/* Brand Column */}
          <div className="md:col-span-4 col-span-12">
            <Link href="/" className="inline-block mb-6 md:mb-8">
              <div className="text-2xl md:text-3xl font-light text-white tracking-tighter">
                <span className="font-bold" style={{ color: accentColor }}>Alture</span> & Co.
              </div>
            </Link>
            <div className="flex gap-4">
              <SocialLink icon="ph:instagram-logo-thin" href="https://instagram.com/altureandco" />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-8" style={{ color: accentColor }}>{t.footer.explore}</h4>
              <ul className="space-y-3 md:space-y-4">
                <FooterLink href="/" label={t.footer.home} />
                <FooterLink href="/alturelock" label={t.footer.alturelock} />
                <FooterLink href="/#contact" label={t.footer.contactLink} />
                <li>
                  <Link href="/education" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-light text-sm tracking-wide">
                    <Icon icon="ph:lock-simple-thin" className="w-4 h-4 flex-shrink-0" style={{ color: "#E879F9" }} />
                    {t.footer.education}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-8" style={{ color: accentColor }}>{t.footer.legal}</h4>
              <ul className="space-y-3 md:space-y-4">
                <FooterLink href="/privacy-policy" label={t.footer.privacyPolicy} />
                <FooterLink href="/terms-of-service" label={t.footer.termsOfService} />
                <FooterLink href="/disclaimer" label={t.footer.disclaimer} />
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 md:mb-8" style={{ color: accentColor }}>{t.footer.contact}</h4>
              <ul className="space-y-3 md:space-y-4">
                <li className="flex items-start gap-3 text-gray-400 font-light">
                  <Icon
                    icon="ph:map-pin-thin"
                    className="w-5 h-5 mt-1 flex-shrink-0"
                    style={{ color: isEducation ? "#D1D5DB" : "#D4AF37" }}
                  />
                  <span className="text-sm md:text-base">Business Bay, Dubai</span>
                </li>
                <li>
                  <a href="mailto:celine@altureandco.com" className="flex items-center gap-3 text-gray-400 font-light hover:text-white transition-colors">
                    <Icon
                      icon="ph:envelope-simple-thin"
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: isEducation ? "#D1D5DB" : "#D4AF37" }}
                    />
                    <span className="text-sm md:text-base break-all">celine@altureandco.com</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light uppercase tracking-wider text-center md:text-left">
          <p> 2025 Alture & Co. {t.footer.rightsReserved}</p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string, label: string }) => (
  <li>
    <Link href={href} className="text-gray-400 hover:text-[#D4AF37] transition-colors font-light text-sm tracking-wide">
      {label}
    </Link>
  </li>
);

const SocialLink = ({ icon, href }: { icon: string, href: string }) => (
  <a href={href} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300">
    <Icon icon={icon} className="w-5 h-5" />
  </a>
);

export default Footer;