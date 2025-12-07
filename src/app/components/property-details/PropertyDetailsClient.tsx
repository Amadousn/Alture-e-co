'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { getImgPath } from '@/utils/pathUtils';
import { propertyData } from '@/app/types/property/propertyData';
import { Icon } from '@iconify/react';

export default function PropertyDetailsClient({ property }: { property: propertyData }) {
  const [showGallery, setShowGallery] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const allImages = [property.property_img, ...(property.gallery_images || [])].filter(Boolean);

  // Handle Scroll Effect for Header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when gallery is open
  useEffect(() => {
    if (showGallery) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [showGallery]);

  const openGallery = () => {
    setShowGallery(true);
    setActivePhotoIndex(0); // Start with first image directly
  };
  
  const closeGallery = () => {
    setShowGallery(false);
    setActivePhotoIndex(null);
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % allImages.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + allImages.length) % allImages.length);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showGallery) return;
      if (e.key === 'Escape') closeGallery();
      if (activePhotoIndex !== null) {
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showGallery, activePhotoIndex]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans selection:bg-primary selection:text-white">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <div className="relative h-[85vh] w-full overflow-hidden group">
        <Image
          src={getImgPath(allImages[0])}
          alt={property.property_title}
          fill
          className="object-cover transition-transform duration-[10s] ease-in-out group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-24 flex flex-col items-start justify-end h-full animate-in fade-in slide-in-from-bottom-10 duration-1000">
           <div className="bg-[#B8860B]/20 backdrop-blur-md border border-[#B8860B]/40 px-6 py-2 text-[#F4C430] text-xs font-bold tracking-[0.2em] uppercase mb-8">
              {property.status} • {property.category}
           </div>
           <h1 className="text-5xl md:text-8xl font-thin text-white mb-8 tracking-tighter drop-shadow-2xl max-w-5xl leading-none">
             {property.property_title}
           </h1>
           <div className="flex items-center gap-8 text-white text-lg font-light tracking-widest">
              <span className="flex items-center gap-3">
                <Icon icon="ph:map-pin-thin" className="text-[#D4AF37] w-6 h-6" /> 
                <span className="uppercase">{property.location}</span>
              </span>
              <span className="text-[#D4AF37]">•</span>
              <span className="text-3xl font-light text-[#D4AF37]">{property.property_price}</span>
           </div>
        </div>

        {/* View Photos Button */}
        <button 
          onClick={openGallery}
          className="absolute bottom-12 right-12 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 font-light tracking-[0.2em] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-all duration-500 flex items-center gap-4 group z-20 uppercase text-xs"
        >
          <Icon icon="ph:squares-four-thin" className="w-5 h-5" />
          <span>View Gallery</span>
        </button>
      </div>

      {/* 2. ELEGANT CONTENT LAYOUT */}
      <div className="max-w-[1800px] mx-auto px-6 md:px-24 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          
          {/* Main Info (Left) */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* Minimal Stats - Gold Accent */}
            <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-12">
               {[
                 { label: 'Living Area', value: property.livingArea },
                 { label: 'Bedrooms', value: property.beds },
                 { label: 'Bathrooms', value: property.bathrooms },
                 { label: 'Type', value: property.type }
               ].map((stat, i) => (
                 <div key={i} className="text-center md:text-left">
                    <div className="text-[#D4AF37] text-[10px] uppercase tracking-[0.25em] mb-3 font-semibold">{stat.label}</div>
                    <div className="text-4xl font-thin text-gray-900 dark:text-white">{stat.value}</div>
                 </div>
               ))}
            </div>

            {/* Narrative Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
               <h2 className="font-light text-4xl mb-10 tracking-tight text-gray-900 dark:text-white">
                 <span className="text-[#D4AF37]">The</span> Residence
               </h2>
               {property.description ? (
                 <div className="whitespace-pre-line text-gray-600 dark:text-gray-400 leading-loose font-light text-xl text-justify">
                    {property.description}
                 </div>
               ) : (
                 <>
                   <p className="text-gray-600 dark:text-gray-400 leading-loose font-light text-xl text-justify">
                     Nestled in the prestigious enclave of {property.location}, this exquisite {property.category} redefines luxury living. 
                     Boasting {property.rooms} elegantly appointed rooms and spanning {property.livingArea}, every inch of this residence 
                     has been curated for the discerning individual.
                   </p>
                   <p className="text-gray-600 dark:text-gray-400 leading-loose font-light text-xl mt-8 text-justify">
                     From the moment you step through the grand entrance, you are greeted by an atmosphere of sophistication and tranquility.
                     Premium finishes, bespoke joinery, and state-of-the-art amenities blend seamlessly to create a home that is both 
                     a masterpiece of design and a sanctuary of comfort.
                   </p>
                 </>
               )}
            </div>

            {/* Amenities Grid - Professional Icons */}
            <div>
               <h3 className="font-light text-2xl mb-10 tracking-wide text-gray-900 dark:text-white">Amenities & Features</h3>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
                  {(property.amenities && property.amenities.length > 0 ? property.amenities : [
                    'Private Pool', 'Concierge', 'Smart Home', 'Wine Cellar', 'Spa & Gym', '24/7 Security'
                  ]).map((item, i) => {
                     // Simple icon mapping logic
                     let icon = 'ph:star-thin';
                     const lowerItem = item.toLowerCase();
                     if (lowerItem.includes('pool')) icon = 'ph:swimming-pool-thin';
                     else if (lowerItem.includes('concierge')) icon = 'ph:bell-simple-thin';
                     else if (lowerItem.includes('smart')) icon = 'ph:house-line-thin';
                     else if (lowerItem.includes('wine')) icon = 'ph:wine-thin';
                     else if (lowerItem.includes('gym') || lowerItem.includes('spa')) icon = 'ph:barbell-thin';
                     else if (lowerItem.includes('security')) icon = 'ph:shield-check-thin';
                     else if (lowerItem.includes('parking') || lowerItem.includes('car')) icon = 'ph:car-thin';
                     else if (lowerItem.includes('wifi')) icon = 'ph:wifi-high-thin';
                     else if (lowerItem.includes('cinema')) icon = 'ph:film-strip-thin';
                     else if (lowerItem.includes('garden')) icon = 'ph:plant-thin';
                     else if (lowerItem.includes('elevator')) icon = 'ph:arrows-out-line-vertical-thin';

                     return (
                        <div key={i} className="flex items-center gap-4 text-gray-800 dark:text-gray-200 group cursor-default">
                           <div className="p-3 rounded-full border border-gray-200 dark:border-gray-800 group-hover:border-[#D4AF37] transition-colors">
                              <Icon icon={icon} className="w-6 h-6 text-[#D4AF37]" />
                           </div>
                           <span className="font-light text-lg tracking-wide">{item}</span>
                        </div>
                     );
                  })}
               </div>
            </div>
          </div>

          {/* Sticky Sidebar (Right) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 p-10 bg-[#FAFAFA] dark:bg-[#111] border border-gray-100 dark:border-gray-800">
               <div className="text-center mb-10">
                 <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-xs font-bold mb-4">Listing Price</p>
                 <div className="text-5xl font-extralight text-gray-900 dark:text-white">{property.property_price}</div>
               </div>

               <div className="flex items-center gap-6 mb-10 pb-10 border-b border-gray-200 dark:border-gray-800">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#D4AF37] p-1">
                    <div className="w-full h-full bg-gray-200 rounded-full relative overflow-hidden">
                       {/* Ideally replace with real agent image */}
                       <Icon icon="ph:user-thin" className="w-full h-full p-2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-medium text-gray-900 dark:text-white">Sarah Jenkins</div>
                    <div className="text-[#D4AF37] text-xs uppercase tracking-widest mt-1">Senior Broker</div>
                    <div className="text-gray-400 text-sm mt-2 font-light">+971 50 123 4567</div>
                  </div>
               </div>

               <div className="space-y-4">
                 <button className="w-full bg-[#111] dark:bg-white text-white dark:text-black py-4 font-medium text-sm uppercase tracking-[0.15em] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] hover:text-white transition-colors duration-300">
                    Schedule Viewing
                 </button>
                 <button className="w-full border border-gray-300 dark:border-gray-700 py-4 font-medium text-sm uppercase tracking-[0.15em] text-gray-900 dark:text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-300">
                    Contact Broker
                 </button>
               </div>

               <div className="mt-8 text-center">
                  <span className="text-[#D4AF37] text-xs uppercase tracking-widest">Alture & Co. Exclusive</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. LUXURY GALLERY MODAL OVERLAY (Slideshow with Thumbnails) */}
      {showGallery && activePhotoIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black animate-in fade-in duration-300 flex flex-col">
          
          {/* Gallery Header */}
          <div className="flex justify-between items-center px-6 py-4 absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
             <div className="text-white/90 text-sm font-medium tracking-wide">
                {activePhotoIndex + 1} / {allImages.length}
             </div>
             <button 
                onClick={closeGallery} 
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors"
             >
               <Icon icon="mdi:close" width="24" />
             </button>
          </div>

          {/* Main Slideshow Area */}
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
             
             {/* Prev Button */}
             <button onClick={(e) => prevPhoto(e)} className="absolute left-4 p-4 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all z-20 hidden md:block">
               <Icon icon="mdi:chevron-left" width="48" />
             </button>

             {/* Main Image */}
             <div className="relative w-full h-full">
                <Image
                   src={getImgPath(allImages[activePhotoIndex])}
                   alt="Fullscreen"
                   fill
                   className="object-contain"
                   priority
                />
             </div>

             {/* Next Button */}
             <button onClick={(e) => nextPhoto(e)} className="absolute right-4 p-4 rounded-full bg-black/20 hover:bg-black/50 text-white transition-all z-20 hidden md:block">
               <Icon icon="mdi:chevron-right" width="48" />
             </button>
          </div>

          {/* Thumbnails Strip */}
          <div className="h-24 bg-black/90 p-4 flex justify-center gap-3 overflow-x-auto no-scrollbar border-t border-white/10 z-50">
             {allImages.map((img, idx) => (
               <div 
                 key={idx} 
                 onClick={() => setActivePhotoIndex(idx)}
                 className={`relative w-20 h-full flex-shrink-0 cursor-pointer rounded-md overflow-hidden transition-all duration-300 ${
                   activePhotoIndex === idx 
                     ? 'ring-2 ring-white opacity-100 scale-105' 
                     : 'opacity-40 hover:opacity-80'
                 }`}
               >
                 <Image
                   src={getImgPath(img)}
                   alt={`Thumb ${idx}`}
                   fill
                   className="object-cover"
                 />
               </div>
             ))}
          </div>

        </div>
      )}
    </div>
  );
}

