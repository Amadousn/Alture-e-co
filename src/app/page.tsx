import React from 'react';
import { Metadata } from "next";
import Hero from './components/home/hero';
import WhatWeOffer from './components/altur/what-we-offer';
import PropertiesCTA from './components/altur/properties-cta';
import WhoWeAre from './components/altur/who-we-are';
import StrategicVision from './components/altur/strategic-vision';
import Contact from './components/altur/contact';
import MarketTicker from './components/altur/market-ticker';

export const metadata: Metadata = {
  title: "Alture & Co. - Strategic Portfolio Management",
  description: "Premium real estate and digital asset structuring in Dubai. Luxury properties, crypto portfolio management, and cross-border wealth coordination.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <MarketTicker />
      <WhatWeOffer />
      <PropertiesCTA />
      <WhoWeAre />
      <StrategicVision />
      <Contact />
    </main>
  )
}
