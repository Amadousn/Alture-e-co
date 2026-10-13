"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import SocialLinks from "@/app/components/altur/brand/social-links";
import { useLanguage } from "@/app/i18n/language-context";

const Footer = () => {
  const { t } = useLanguage();
  const path = usePathname();
  // The cockpit is a full-screen application: no site footer under it.
  if ((path.startsWith("/alturelock/") && path !== "/alturelock/login") || path === "/education/dashboard" || path === "/education/introduction") return null;

  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl pt-12 md:pt-20 pb-8 md:pb-10 px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12 md:mb-20">

          {/* Brand Column */}
          <div className="md:col-span-4 col-span-12">
            <Link href="/" className="inline-block mb-6 md:mb-8">
              <div className="font-logo text-2xl md:text-3xl font-extralight text-white whitespace-nowrap">
                Alture <span className="accent-light">&</span> Co.
              </div>
            </Link>
            <p className="text-sm text-white/45 leading-relaxed max-w-[26ch]">Business Bay, Dubai</p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="text-[11px] !font-normal uppercase tracking-[0.14em] mb-4 md:mb-6 text-white/45">{t.footer.explore}</h4>
              <ul className="space-y-3 md:space-y-4">
                <FooterLink href="/" label={t.footer.home} />
                <FooterLink href="/alturelock" label={t.footer.alturelock} />
                <FooterLink href="/#contact" label={t.footer.contactLink} />
                <li>
                  <Link href="/education" className="inline-flex items-center gap-2 nav-link is-inline font-light text-sm tracking-wide">
                    <Icon icon="ph:lock-simple-thin" className="w-4 h-4 flex-shrink-0" style={{ color: "#E3A1F7", filter: "drop-shadow(0 0 5px rgba(227, 161, 247, 0.7))" }} />
                    {t.footer.education}
                  </Link>
              </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] !font-normal uppercase tracking-[0.14em] mb-4 md:mb-6 text-white/45">{t.footer.legal}</h4>
              <ul className="space-y-3 md:space-y-4">
                <FooterLink href="/privacy-policy" label={t.footer.privacyPolicy} />
                <FooterLink href="/terms-of-service" label={t.footer.termsOfService} />
                <FooterLink href="/disclaimer" label={t.footer.disclaimer} />
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] !font-normal uppercase tracking-[0.14em] mb-4 md:mb-6 text-white/45">{t.footer.contact}</h4>
              <ul className="space-y-3 md:space-y-4">
                <li>
                  <a href="mailto:celine@altureandco.com" className="nav-link is-inline font-light text-sm tracking-wide break-all">celine@altureandco.com</a>
                </li>
                <li>
                  <SocialLinks className="-ml-2.5" />
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

const FooterLink = ({ href, label }: { href: string, label: string }) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <li>
      <Link href={href} aria-current={active ? "page" : undefined} className={`nav-link is-inline font-light text-sm tracking-wide ${active ? "is-active" : ""}`}>
        {label}
      </Link>
    </li>
  );
};

export default Footer;