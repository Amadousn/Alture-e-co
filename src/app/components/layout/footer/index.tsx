"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black border-t border-white/10">
      <div className="container mx-auto max-w-7xl pt-20 pb-10 px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="md:col-span-4 col-span-12">
            <Link href="/" className="inline-block mb-8">
              <div className="text-3xl font-light text-white tracking-tighter">
                <span className="text-[#D4AF37] font-bold">Alture</span> & Co.
              </div>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-xs mb-8">
              Discreet advisory firm specializing in premium real estate and digital capital structuring across Dubai and Europe.
            </p>
            <div className="flex gap-4">
               <SocialLink icon="ph:instagram-logo-thin" href="#" />
               <SocialLink icon="ph:linkedin-logo-thin" href="#" />
               <SocialLink icon="ph:twitter-logo-thin" href="#" />
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-8 col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div>
              <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">Explore</h4>
              <ul className="space-y-4">
                <FooterLink href="/" label="Home" />
                <FooterLink href="/properties/properties-list" label="Properties" />
                <FooterLink href="/#what-we-offer" label="Services" />
                <FooterLink href="/#strategic-vision" label="Vision" />
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">Legal</h4>
              <ul className="space-y-4">
                <FooterLink href="#" label="Privacy Policy" />
                <FooterLink href="#" label="Terms of Service" />
                <FooterLink href="#" label="Disclaimer" />
              </ul>
            </div>

            <div>
              <h4 className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.2em] mb-8">Contact</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-gray-400 font-light">
                   <Icon icon="ph:map-pin-thin" className="w-5 h-5 mt-1 text-[#D4AF37]" />
                   <span>Dubai, UAE<br/>Financial Center</span>
                </li>
                <li>
                   <a href="https://wa.me/971509845622" className="flex items-center gap-3 text-gray-400 font-light hover:text-white transition-colors">
                      <Icon icon="ph:whatsapp-logo-thin" className="w-5 h-5 text-[#D4AF37]" />
                      +971 50 984 5622
                   </a>
                </li>
                <li>
                   <a href="mailto:Celine@altureandco.com" className="flex items-center gap-3 text-gray-400 font-light hover:text-white transition-colors">
                      <Icon icon="ph:envelope-simple-thin" className="w-5 h-5 text-[#D4AF37]" />
                      Celine@altureandco.com
                   </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-light uppercase tracking-wider">
          <p> 2025 Alture & Co. All rights reserved.</p>
          <p>Designed for Excellence</p>
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