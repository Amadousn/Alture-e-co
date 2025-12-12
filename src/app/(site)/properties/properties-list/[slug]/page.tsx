import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import ProfessionalGallery from '@/app/components/property-details/ProfessionalGallery';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

const formatPrice = (price: string | number) => {
  const num = Number(price);
  if (!isNaN(num)) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  }
  return String(price);
};

export async function generateStaticParams() {
  try {
    const filePath = join(process.cwd(), 'public/data/propertydata.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const properties = JSON.parse(fileContents);

    return properties
      .filter((property: any) => property.slug)
      .map((property: any) => ({
        slug: property.slug,
      }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Details({ params }: Props) {
  const { slug } = await params;
  const filePath = join(process.cwd(), 'public/data/propertydata.json');

  let item;
  try {
    const fileContents = readFileSync(filePath, 'utf8');
    const properties = JSON.parse(fileContents);
    item = properties.find((p: any) => p.slug === slug);

    if (!item) {
      notFound();
    }
  } catch (error) {
    console.error("Error reading property data:", error);
    notFound();
  }

  const images = item.property_images && item.property_images.length > 0
    ? item.property_images
    : [item.image];

  const descriptionParagraphs = (item.description || item.property_description)
    ? (item.description || item.property_description).split('\n').filter((p: string) => p.trim())
    : [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20 selection:bg-primary/30">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px] opacity-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Breadcrumb - Cleaner */}
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 pt-32 pb-6">
          <div className="flex items-center gap-3 text-xs font-medium text-neutral-500 uppercase tracking-widest">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-neutral-700">/</span>
            <Link href="/properties/properties-list" className="hover:text-white transition-colors">Properties</Link>
            <span className="text-neutral-700">/</span>
            <span className="text-neutral-300 truncate max-w-[300px]">{item.property_title}</span>
          </div>
        </div>

        {/* Main Container */}
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">

          {/* Header Section - Minimalist */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 border-b border-neutral-800/50 pb-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-tight">
                {item.property_title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-neutral-400">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:map-pin" className="w-4 h-4 text-primary/80" />
                  <span className="text-base font-light tracking-wide">{item.location}, {item.region}</span>
                </div>
                <span className="w-px h-4 bg-neutral-800"></span>
                <span className="text-sm border border-neutral-700/50 px-4 py-1.5 rounded-full text-neutral-300">
                  {item.type || 'Distinctive Home'}
                </span>
              </div>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-2">Asking Price</p>
              <div className="text-3xl md:text-5xl font-light text-white tracking-tight">
                {formatPrice(String(item.property_price))}
              </div>
            </div>
          </div>

          {/* Professional Gallery (Hero) - Clean edges */}
          <div className="mb-20">
            <ProfessionalGallery
              images={images}
              title={item.property_title}
              price={formatPrice(String(item.property_price))}
              location={`${item.location}, ${item.region}`}
              beds={item.beds}
              bathrooms={item.bathrooms}
              livingArea={item.livingArea}
              description={item.description || item.property_description}
            />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-20">

              {/* Key Features - Minimalist Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 border-b border-neutral-800/50">
                {[
                  { icon: "lucide:bed-double", label: "Bedrooms", value: item.beds || 0 },
                  { icon: "lucide:bath", label: "Bathrooms", value: item.bathrooms || 0 },
                  { icon: "lucide:scaling", label: "Living Area", value: item.livingArea || "N/A" },
                  { icon: "lucide:car", label: "Garages", value: item.garages || 0 }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col p-4 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-3 mb-2 text-neutral-400">
                      <Icon icon={stat.icon} className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-light text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Description - Editorial Style */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-6 uppercase tracking-widest">About this Property</h3>
                <div className="prose prose-xl prose-invert text-neutral-300 font-light leading-relaxed max-w-none">
                  {descriptionParagraphs.length > 0 ? (
                    descriptionParagraphs.map((p: string, i: number) => (
                      <p key={i} className="mb-6">{p}</p>
                    ))
                  ) : (
                    <p className="italic text-neutral-600">No description available for this property.</p>
                  )}
                </div>
              </div>

              {/* Amenities - Tag Cloud Style */}
              {item.features && item.features.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">Amenities & Features</h3>
                  <div className="flex flex-wrap gap-3">
                    {item.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 px-6 py-3 bg-neutral-900/50 border border-neutral-800 rounded-full hover:border-neutral-600 transition-colors">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        <span className="text-sm font-medium text-neutral-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications - Table Style */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-8 uppercase tracking-widest">Property Details</h3>
                <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    { label: "Property ID", value: item.id || "N/A" },
                    { label: "Type", value: item.type || "Villa" },
                    { label: "Status", value: item.status || "Active" },
                    { label: "Listed On", value: new Date(Number(item.id) || Date.now()).toISOString().split('T')[0] },
                    { label: "Region", value: item.region },
                    { label: "Location", value: item.location }
                  ].map((spec, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-neutral-800/50">
                      <span className="text-neutral-500 text-sm uppercase tracking-wide">{spec.label}</span>
                      <span className="font-medium text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Sidebar - Refined Glass */}
            <div className="lg:col-span-4 h-full">
              <div className="sticky top-32 space-y-6">
                <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-neutral-800/50 relative overflow-hidden">

                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-16 h-16 bg-black border border-neutral-800 rounded-full flex items-center justify-center text-white font-serif text-xl">
                      SA
                    </div>
                    <div>
                      <h3 className="font-medium text-lg text-white">Sirius Agency</h3>
                      <p className="text-neutral-500 text-xs tracking-widest uppercase mt-1">Luxury Real Estate</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <button className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-neutral-200 transition-all flex items-center justify-center gap-3">
                      <Icon icon="lucide:phone" className="w-4 h-4" />
                      Contact Agent
                    </button>
                    <button className="w-full bg-transparent text-white border border-neutral-700 py-4 rounded-full font-medium hover:border-white transition-all flex items-center justify-center gap-3">
                      <Icon icon="lucide:calendar" className="w-4 h-4" />
                      Schedule Viewing
                    </button>
                  </div>

                  <div className="text-center pt-6 border-t border-neutral-800/50">
                    <p className="text-2xl font-light text-neutral-300">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
