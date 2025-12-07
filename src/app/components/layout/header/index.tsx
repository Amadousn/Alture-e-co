"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";
import { Icon } from "@iconify/react";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

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
    { label: "HOME", href: "/" },
    { label: "PROPERTIES", href: "/properties/properties-list" },
    { label: "SERVICES", href: "/#what-we-offer" },
    { label: "ABOUT", href: "/#who-we-are" },
    { label: "CONTACT", href: "/#contact" },
  ];

  // Check if user is on dashboard to hide header (handled by layout normally, but safety check)
  if (pathUrl.startsWith('/dashboard')) return null;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        sticky 
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
        </nav>

        {/* Right Actions (Admin) */}
        <div className="hidden lg:flex items-center">
          <Link 
            href="/dashboard"
            className="px-5 py-2 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors text-xs font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <Icon icon="ph:user-thin" className="w-4 h-4" />
            Admin
          </Link>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
      )}

      {/* Mobile Menu Drawer */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-[300px] bg-[#0a0a0a] border-l border-white/10 shadow-2xl transform transition-transform duration-300 z-50 ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="text-white font-bold tracking-widest">MENU</span>
            <button onClick={() => setNavbarOpen(false)} className="text-white">
                <Icon icon="ph:x" className="w-6 h-6" />
            </button>
            </div>
            
            <nav className="flex flex-col p-6 space-y-6">
            {menuItems.map((item, index) => (
                <MobileHeaderLink key={index} item={item} />
            ))}
            <div className="h-px bg-white/10 my-4" />
            <Link 
                href="/dashboard"
                className="text-[#D4AF37] font-medium flex items-center gap-3"
            >
                <Icon icon="ph:user-circle" className="w-5 h-5" />
                Admin Dashboard
            </Link>
            </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
