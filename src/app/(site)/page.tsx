import React from 'react';
import { Metadata } from "next";
import Hero from '../components/home/hero';
import WhatWeOffer from '../components/altur/what-we-offer';
import WhoWeAre from '../components/altur/who-we-are';
import StrategicVision from '../components/altur/strategic-vision';
import Contact from '../components/altur/contact';

export const metadata: Metadata = {
  title: "Alture & Co. - Strategic Portfolio Management",
  description: "Premium real estate and digital asset structuring in Dubai. Luxury properties, crypto portfolio management, and cross-border wealth coordination.",
  icons: {
    icon: 'data:,', // Hide favicon
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeOffer />
      <WhoWeAre />
      <StrategicVision />
      <Contact />
    </main>
  )
}
