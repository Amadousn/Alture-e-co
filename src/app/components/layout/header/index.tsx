"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "next-themes";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/app/i18n/language-context";
import { useSession } from "@/utils/use-session";
import { LANGUAGES } from "@/app/i18n/translations";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const session = useSession();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [mounted, setMounted] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Portals need the document to exist, so only render the portal after mount.
  useEffect(() => {
    setMounted(true);
  }, []);


  // Locks background scroll while the mobile menu is open, so the page
  // underneath can't be scrolled while the overlay is showing.
  useEffect(() => {
    if (navbarOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [navbarOpen]);

  // Function to handle scroll to set sticky class
  const handleScroll = () => {
    setSticky(window.scrollY >= 20);
  };

  // Function to handle click outside
  const handleClickOutside = (event: MouseEvent) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen]);

  const menuItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.alturelock, href: "/alturelock" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const LanguageSwitcher = ({ className }: { className?: string }) => (
    <div className={`flex items-center gap-1.5 text-xs font-medium tracking-wide ${className ?? ""}`}>
      {/* Account access, kept quiet: the page stays about the product. */}
      <Link href={session.signedIn ? "/alturelock/workspace" : "/alturelock/login"} className="nav-link is-inline mr-4 whitespace-nowrap">
        {session.signedIn ? t.mobile.workspace : t.mobile.logIn}
      </Link>
      {translated && LANGUAGES.map((lang, i) => (
        <div key={lang.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/20">/</span>}
          <button
            type="button"
            onClick={() => setLanguage(lang.code)}
            aria-pressed={language === lang.code}
            className={`nav-link is-inline ${language === lang.code ? "is-active" : ""}`}
          >
            {lang.label}
          </button>
        </div>
      ))}
    </div>
  );

  const PrivateLockIcon = ({ className, gradientId }: { className?: string; gradientId: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      style={{ color: "#E3A1F7", filter: "drop-shadow(0 0 6px rgba(227, 161, 247, 0.75)) drop-shadow(0 0 2px rgba(255, 255, 255, 0.55))" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  // Check if user is on dashboard to hide header (handled by layout normally, but safety check)
  // if (pathUrl.startsWith('/dashboard')) return null;

  // The AltureLock application itself is in English only, so the language choice is offered on the pages that are translated.
  const translated = !pathUrl.startsWith("/alturelock") || pathUrl === "/alturelock" || pathUrl === "/alturelock/login";

  // The cockpit is a full-screen application with its own bar.
  if (pathUrl === "/alturelock/workspace" || pathUrl === "/alturelock/demo") return null;
  // The learning pages have their own bar too.
  if (pathUrl === "/education/dashboard" || pathUrl === "/education/introduction") return null;

  return (
    <>
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${sticky
        ? "bg-black/90 backdrop-blur-md shadow-lg border-b border-white/10 py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-6">
        {/* Logo Area */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Centered Desktop Navigation */}
        <nav className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
          {menuItems.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
          <Link
            href="/education"
            aria-current={pathUrl.startsWith("/education") ? "page" : undefined}
            className={`nav-link flex items-center gap-2 py-3 text-sm tracking-wide font-medium ${pathUrl.startsWith("/education") ? "is-active" : ""}`}
          >
            <PrivateLockIcon gradientId="lockGradientDesktop" className="w-4 h-4" />
            {t.nav.education}
          </Link>
        </nav>

        {/* Right Actions (Language) */}
        <div className="hidden lg:flex items-center">
          <LanguageSwitcher />
        </div>

        {/* Phones: language and login only. The three destinations are in the tab bar. */}
        <div className="flex items-center gap-4 lg:hidden text-xs font-medium">
          <Link href={session.signedIn ? "/alturelock/workspace" : "/alturelock/login"} className="nav-link is-inline whitespace-nowrap">
            {session.signedIn ? t.mobile.workspace : t.mobile.logIn}
          </Link>
          {translated && (
            <label className="relative">
              <span className="sr-only">Language</span>
              <select value={language} onChange={(event) => setLanguage(event.target.value as typeof language)} className="!w-auto !rounded-sm !border-white/25 !bg-black !py-1.5 !pl-2 !pr-6 !text-xs !font-medium !text-white uppercase">
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      </div>
    </header>

    </>
  );
};

export default Header;
