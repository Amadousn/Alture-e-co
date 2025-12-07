import React from 'react';
import PropertyForm from '../../components/PropertyForm';
import { propertyData } from '@/app/types/property/propertyData';
import fs from 'fs';
import path from 'path';

async function getProperty(id: string): Promise<propertyData | null> {
  try {
     const dataPath = path.join(process.cwd(), 'public/data/propertydata.json');
     const fileContents = fs.readFileSync(dataPath, 'utf8');
     const data = JSON.parse(fileContents);
     return data.find((p: any) => p.id === id) || null;
  } catch(e) {
      console.error(e);
      return null;
  }
}

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Edit Property</h2>
      <PropertyForm initialData={property} isEdit />
    </div>
  );
}
