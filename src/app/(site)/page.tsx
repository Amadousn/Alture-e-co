import React from 'react';
import { Metadata } from "next";
import { readFileSync } from 'fs';
import { join } from 'path';
import Hero from '../components/home/hero';
import WhatWeOffer from '../components/altur/what-we-offer';
import FeaturedProperties from '../components/home/featured-properties';
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
  // Read properties from JSON file
  /* 
  let properties = [];
  try {
    const filePath = join(process.cwd(), 'public/data/propertydata.json');
    const fileContents = readFileSync(filePath, 'utf8');
    properties = JSON.parse(fileContents);
  } catch (error) {
    console.error("Failed to load properties for homepage:", error);
  }
  */

  return (
    <main>
      <Hero />
      <WhatWeOffer />
      {/* <FeaturedProperties properties={properties} /> */}
      <WhoWeAre />
      <StrategicVision />
      <Contact />
    </main>
  )
}
