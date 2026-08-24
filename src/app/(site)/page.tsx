import React from 'react';
import { Metadata } from "next";
import Hero from '../components/home/hero';
import WhatWeOffer from '../components/altur/what-we-offer';
import Contact from '../components/altur/contact';

export const metadata: Metadata = {
  title: "Alture & Co. | Proprietary Trading",
  description: "Premium digital asset structuring in Dubai. Crypto portfolio management and cross-border wealth coordination.",
};

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatWeOffer />
      <Contact />
    </main>
  )
}
