"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/app/i18n/language-context";
import { LANGUAGES } from "@/app/i18n/translations";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

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
      {LANGUAGES.map((lang, i) => (
        <div key={lang.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-white/20">/</span>}
          <button
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`transition-colors ${language === lang.code ? "text-[#D4AF37]" : "text-gray-500 hover:text-white"}`}
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
      style={{ filter: "drop-shadow(0 0 5px rgba(216, 166, 255, 0.55)) drop-shadow(0 0 3px rgba(244, 114, 182, 0.5))" }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D8B4FE" />
          <stop offset="50%" stopColor="#E879F9" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
      </defs>
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke={`url(#${gradientId})`} strokeWidth="1.5" />
      <path d="M8 10.5V7.5a4 4 0 018 0v3" stroke={`url(#${gradientId})`} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  // Check if user is on dashboard to hide header (handled by layout normally, but safety check)
  // if (pathUrl.startsWith('/dashboard')) return null;

  return (
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
          <Link href="/education" aria-label="Private education access" className="flex items-center py-3 opacity-90 hover:opacity-100 transition-opacity">
            <PrivateLockIcon gradientId="lockGradientDesktop" className="w-4 h-4" />
          </Link>
        </nav>

        {/* Right Actions (Language) */}
        <div className="hidden lg:flex items-center">
          <LanguageSwitcher />
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="p-2 text-white"
            aria-label="Toggle mobile menu"
          >
            <Icon icon={navbarOpen ? "ph:x" : "ph:list"} className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {navbarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300" 
          onClick={() => setNavbarOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-[85%] sm:w-[350px] bg-[#050505]/95 backdrop-blur-xl border-l border-[#D4AF37]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-50 ${navbarOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-8 border-b border-white/5">
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-lg">MENU</span>
            <button 
              onClick={() => setNavbarOpen(false)} 
              className="text-white/70 hover:text-[#D4AF37] transition-colors p-2 rounded-full hover:bg-white/5"
            >
              <Icon icon="ph:x" className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col p-8 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <MobileHeaderLink key={index} item={item} onClick={() => setNavbarOpen(false)} />
            ))}
            <Link
              href="/education"
              onClick={() => setNavbarOpen(false)}
              className="flex items-center gap-3 py-4 px-2 border-b border-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <PrivateLockIcon gradientId="lockGradientMobile" className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm tracking-[0.15em] uppercase font-light">Private</span>
            </Link>
            <div className="h-px bg-white/10 my-4" />
            <LanguageSwitcher className="px-2" />
            {/* <Link
              href="/dashboard"
              className="text-[#D4AF37] font-medium flex items-center gap-3"
            >
              <Icon icon="ph:user-circle" className="w-5 h-5" />
              Admin Dashboard
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
