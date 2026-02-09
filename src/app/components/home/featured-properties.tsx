'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getImgPath } from '@/utils/pathUtils';
import { propertyData } from '@/app/types/property/propertyData';
import { Icon } from '@iconify/react';

export default function FeaturedProperties({ properties }: { properties: propertyData[] }) {
  // Show only the first 3 properties
  const featured = properties.slice(0, 3);

  return (
    <section className="py-12 md:py-24 bg-black relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
          <Image
              src={getImgPath("/images/hero/hero-image.png")}
              alt="Background"
              fill
              className="object-cover opacity-30"
              quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>
      </div>

      {/* Decorative gold elements */}
      <div className="absolute inset-0 opacity-10 z-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#B8860B] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
                <div className="h-px w-12 bg-[#D4AF37]"></div>
                <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">Exclusive</span>
                <div className="h-px w-12 bg-[#D4AF37]"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-thin text-white mb-4 md:mb-6">
                Featured <span className="text-[#D4AF37]">Properties</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
                Explore our latest hand-picked selection of premium real estate opportunities in Dubai.
            </p>
        </div>

        {/* Properties Grid */}
        {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {featured.map((property) => (
                <Link 
                    href={`/properties/properties-list/${property.slug}`} 
                    key={property.id}
                    className="group block"
                >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-4 md:mb-6">
                        <Image
                            src={getImgPath(property.property_img)}
                            alt={property.property_title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                        
                        {/* Price Badge */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-[#D4AF37]/30 px-3 py-1.5 md:px-4 md:py-2 text-white text-[10px] md:text-xs font-bold tracking-widest uppercase">
                            {property.status}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[#D4AF37] text-xs uppercase tracking-widest font-bold">
                            {property.location}
                        </div>
                        <h3 className="text-xl md:text-2xl font-light text-white group-hover:text-[#D4AF37] transition-colors">
                            {property.property_title}
                        </h3>
                        <div className="flex items-center gap-4 text-gray-400 text-xs md:text-sm font-light pt-2 border-t border-white/10 mt-2 md:mt-4">
                            <span className="flex items-center gap-1">
                                <Icon icon="ph:bed-thin" className="w-4 h-4" /> {property.beds} Beds
                            </span>
                            <span className="flex items-center gap-1">
                                <Icon icon="ph:shower-thin" className="w-4 h-4" /> {property.bathrooms} Baths
                            </span>
                            <span className="flex items-center gap-1">
                                <Icon icon="ph:ruler-thin" className="w-4 h-4" /> {property.livingArea}
                            </span>
                        </div>
                        <div className="pt-1 md:pt-2 text-lg md:text-xl text-white font-medium">
                            {property.property_price}
                        </div>
                    </div>
                </Link>
            ))}
            </div>
        ) : (
            <div className="text-center py-12 md:py-20 border border-[#D4AF37]/20 rounded-lg bg-[#111]">
                <p className="text-gray-400 text-base md:text-lg font-light">No properties available at the moment.</p>
                <p className="text-[#D4AF37] text-xs md:text-sm mt-2">Check back soon for exclusive listings.</p>
            </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12 md:mt-16">
            <Link 
                href="/properties/properties-list"
                className="inline-block border border-white/20 text-white px-8 py-3 md:px-10 md:py-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-300"
            >
                View All Listings
            </Link>
        </div>

      </div>
    </section>
  );
}
