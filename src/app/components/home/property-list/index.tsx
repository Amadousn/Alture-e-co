"use client";
import { useEffect, useState } from 'react';
import PropertyCard from './property-card';
import { getDataPath } from '@/utils/pathUtils';

const Listing = () => {
  const [properties, setProperties] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath('/data/propertydata.json'))
        if (!res.ok) throw new Error('Failed to fetch')

        const data = await res.json()
        setProperties(data || [])
      } catch (error) {
        console.error('Error loading properties:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <section id="properties" className="py-20 bg-white relative overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16" data-aos="fade-up">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <span className="text-primary text-sm font-mono tracking-widest">PORTFOLIO</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-black">
            Featured <span className="text-primary">Properties</span>
          </h2>
          <p className="text-xl text-black text-center max-w-2xl mx-auto">
            Exclusive selection of premium Dubai real estate
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property, index) => (
            <div key={property.id} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listing;