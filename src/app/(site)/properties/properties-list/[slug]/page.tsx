import React from 'react';
import { readFileSync } from 'fs';
import { join } from 'path';
import PropertyDetailsClient from '@/app/components/property-details/PropertyDetailsClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const filePath = join(process.cwd(), 'public/data/propertydata.json');
  const fileContents = readFileSync(filePath, 'utf8');
  const properties = JSON.parse(fileContents);
  
  return properties.map((property: any) => ({
    slug: property.slug,
  }));
}

export default async function Details({ params }: Props) {
  const { slug } = await params;
  const filePath = join(process.cwd(), 'public/data/propertydata.json');
  const fileContents = readFileSync(filePath, 'utf8');
  const properties = JSON.parse(fileContents);
  
  const item = properties.find((item: any) => item.slug === slug);

  if (!item) {
    return <div>Property not found</div>;
  }

  return <PropertyDetailsClient property={item} />;
}
