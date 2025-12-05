"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-semidark dark:bg-semidark">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-10 pb-5 px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12 flex flex-col px-4 sm:px-0">
            <Link href="/" className="mb-6 inline-block max-w-40">
              <div className="text-2xl font-bold text-white">
                <span className="text-primary">A&C</span> Alture & Co.
              </div>
            </Link>
            <p className="text-sm text-gray mb-4">
              Discreet advisory firm specializing in real estate and digital capital structuring
            </p>
          </div>
          <div className="md:col-span-8 col-span-12 grid grid-cols-12 gap-4 px-4 sm:px-0">
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white">
                Location
              </h4>
              <p className="mb-2 text-gray text-base">
                Dubai, UAE
              </p>
              <p className="mb-6 text-sm text-gray">
                Strategic wealth management across Europe & UAE
              </p>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white">
                Navigation
              </h4>
              <ul>
                <li>
                  <Link href="#what-we-offer" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    What We Manage
                  </Link>
                </li>
                <li>
                  <Link href="#who-we-are" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link href="#strategic-vision" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Strategic Vision
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white">
                Services
              </h4>
              <ul>
                <li>
                  <Link href="#what-we-offer" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Real Estate Management
                  </Link>
                </li>
                <li>
                  <Link href="#what-we-offer" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Digital Assets
                  </Link>
                </li>
                <li>
                  <Link href="#what-we-offer" className="mb-3 inline-block text-base text-gray hover:text-primary transition-colors">
                    Cross-Border Coordination
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-dark_border py-8">
        <div className="container flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="lg:max-w-45 max-w-full text-center lg:text-left mb-4 lg:mb-0">
            <div className="flex lg:flex-nowrap flex-wrap lg:flex-row lg:gap-11 gap-4 text-base sm:text-lg md:text-xl">
              <p className="text-white">
                Phone :
                <a href="https://wa.me/971509845622" className="text-gray hover:text-primary transition-colors ml-2">
                  +971 50 984 5622
                </a>
              </p>
              <p className="text-white">
                Email :
                <a href="mailto:Celine@altureandco.com" className="text-gray hover:text-primary transition-colors ml-2">
                  Celine@altureandco.com
                </a>
              </p>
            </div>
          </div>
          <div className="text-center lg:text-right">
            <p className="text-sm text-gray">
              © 2025 Alture & Co. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;