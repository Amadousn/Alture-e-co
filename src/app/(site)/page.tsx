import React from 'react';
import { Metadata } from "next";
import Hero from '../components/home/hero';
import WhatWeOffer from '../components/altur/what-we-offer';
import Contact from '../components/altur/contact';

const title = "Alture & Co. | Proprietary Trading";
const description = "A discreet proprietary crypto trading desk in Dubai. Every trade passes through the same system before it's placed.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://www.altureandco.com",
    siteName: "Alture & Co.",
    images: [{ url: "/images/logo/alture-icon-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/images/logo/alture-icon-512.png"],
  },
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
