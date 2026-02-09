'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { propertyData } from '@/app/types/property/propertyData';

import Image from 'next/image';
import { getImgPath } from '@/utils/pathUtils';

interface PropertyFormProps {
  initialData?: Partial<propertyData>;
  isEdit?: boolean;
}

export default function PropertyForm({ initialData, isEdit }: PropertyFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<propertyData>>({
    property_title: '',
    property_price: '',
    category: 'house',
    location: '',
    tag: 'Sell',
    status: 'Sell',
    rooms: 1,
    bathrooms: 1,
    beds: 1,
    garages: 0,
    livingArea: '',
    property_img: '/images/properties/prop-1.jpg',
    category_img: '/images/property_option/house.svg',
    type: 'House',
    region: 'north',
    name: '',
    slug: '',
    check: true,
    description: '',
    amenities: [],
    ...initialData,
  });

  const AVAILABLE_AMENITIES = [
    'Private Pool', 'Concierge', 'Smart Home', 'Wine Cellar', 
    'Spa & Gym', '24/7 Security', 'Private Parking', 'Sea View', 
    'Home Cinema', 'Elevator', 'Garden', 'Jacuzzi'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData((prev) => {
        const current = prev.amenities || [];
        if (current.includes(amenity)) {
            return { ...prev, amenities: current.filter(a => a !== amenity) };
        } else {
            return { ...prev, amenities: [...current, amenity] };
        }
    });
  };

  const [isDragging, setIsDragging] = useState(false);
  const [isGalleryDragging, setIsGalleryDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent, type: 'main' | 'gallery') => {
    e.preventDefault();
    if (type === 'main') setIsDragging(true);
    else setIsGalleryDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent, type: 'main' | 'gallery') => {
    e.preventDefault();
    if (type === 'main') setIsDragging(false);
    else setIsGalleryDragging(false);
  };

  const handleDrop = async (e: React.DragEvent, type: 'main' | 'gallery') => {
    e.preventDefault();
    if (type === 'main') setIsDragging(false);
    else setIsGalleryDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (type === 'main') {
        await uploadFile(e.dataTransfer.files[0], 'main');
      } else {
        // Upload all files for gallery
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            await uploadFile(e.dataTransfer.files[i], 'gallery');
        }
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery') => {
    if (e.target.files && e.target.files.length > 0) {
        if (type === 'main') {
            await uploadFile(e.target.files[0], 'main');
        } else {
            for (let i = 0; i < e.target.files.length; i++) {
                await uploadFile(e.target.files[i], 'gallery');
            }
        }
    }
  };

  const uploadFile = async (file: File, type: 'main' | 'gallery') => {
    setUploading(true);
    const data = new FormData();
    data.set("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      
      if (type === 'main') {
        setFormData((prev) => ({ ...prev, property_img: json.url }));
      } else {
        setFormData((prev) => ({ 
            ...prev, 
            gallery_images: [...(prev.gallery_images || []), json.url] 
        }));
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (indexToRemove: number) => {
    setFormData((prev) => ({
        ...prev,
        gallery_images: prev.gallery_images?.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit && initialData?.id 
        ? `/api/properties/${initialData.id}` 
        : '/api/properties';
      
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
             ...formData,
             slug: formData.slug || formData.property_title?.toLowerCase().replace(/\s+/g, '-'),
             name: formData.name || formData.property_title,
             tag: 'Sell',
             status: 'Sell' 
        }),
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        alert('Failed to save property');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-semidark p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            name="property_title"
            value={formData.property_title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
          <input
            type="text"
            name="property_price"
            value={formData.property_price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
            <option value="shop">Shop</option>
            <option value="warehouse">Warehouse</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Beds</label>
           <input
             type="number"
             name="beds"
             value={formData.beds}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bathrooms</label>
           <input
             type="number"
             name="bathrooms"
             value={formData.bathrooms}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
           />
        </div>

        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rooms</label>
           <input
             type="number"
             name="rooms"
             value={formData.rooms}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
           />
        </div>
        
        <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Garages</label>
           <input
             type="number"
             name="garages"
             value={formData.garages}
             onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
           />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Living Area</label>
          <input
            type="text"
            name="livingArea"
            value={formData.livingArea}
            onChange={handleChange}
            placeholder="e.g. 150m²"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-darkmode dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Describe the property..."
          />
        </div>

        <div className="md:col-span-2">
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amenities</label>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {AVAILABLE_AMENITIES.map((amenity) => (
                  <label key={amenity} className="flex items-center space-x-2 cursor-pointer bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors">
                      <input 
                          type="checkbox"
                          checked={(formData.amenities || []).includes(amenity)}
                          onChange={() => handleAmenityToggle(amenity)}
                          className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="text-sm dark:text-gray-300">{amenity}</span>
                  </label>
              ))}
           </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {/* Main Image Dropzone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Main Presentation Image</label>
            <div 
              onDragOver={(e) => handleDragOver(e, 'main')}
              onDragLeave={(e) => handleDragLeave(e, 'main')}
              onDrop={(e) => handleDrop(e, 'main')}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer
                ${isDragging 
                  ? 'border-primary bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary'
                }`}
            >
              <div className="relative w-full h-48 mb-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                 {formData.property_img ? (
                   <Image 
                     src={getImgPath(formData.property_img)} 
                     alt="Preview" 
                     fill 
                     className="object-contain" 
                   />
                 ) : (
                   <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <span className="text-4xl mb-2">📷</span>
                      <span className="text-sm">No main image</span>
                   </div>
                 )}
              </div>
              
              <div className="text-center">
                <label className="relative cursor-pointer bg-white dark:bg-semidark rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>Upload Main Image</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 'main')}
                    disabled={uploading}
                  />
                </label>
                <p className="pl-1 text-gray-500 text-sm">or drag and drop</p>
              </div>
            </div>
            <input type="hidden" name="property_img" value={formData.property_img} />
          </div>

          {/* Gallery Dropzone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Gallery</label>
            <div 
              onDragOver={(e) => handleDragOver(e, 'gallery')}
              onDragLeave={(e) => handleDragLeave(e, 'gallery')}
              onDrop={(e) => handleDrop(e, 'gallery')}
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors cursor-pointer mb-4
                ${isGalleryDragging 
                  ? 'border-primary bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary dark:hover:border-primary'
                }`}
            >
               <div className="text-center">
                <span className="text-4xl mb-2 block">🖼️</span>
                <label className="relative cursor-pointer bg-white dark:bg-semidark rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                  <span>Upload Gallery Images</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFileSelect(e, 'gallery')}
                    disabled={uploading}
                  />
                </label>
                <p className="pl-1 text-gray-500 text-sm">or drag and drop multiple files</p>
              </div>
            </div>

            {/* Gallery Grid */}
            {formData.gallery_images && formData.gallery_images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.gallery_images.map((img, index) => (
                        <div key={index} className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden group">
                            <Image 
                                src={getImgPath(img)} 
                                alt={`Gallery ${index}`} 
                                fill 
                                className="object-cover" 
                            />
                            <button
                                type="button"
                                onClick={() => removeGalleryImage(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-lg bg-primary hover:bg-blue-700 text-white font-bold disabled:opacity-50 transition-colors"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Property' : 'Create Property')}
        </button>
      </div>
    </form>
  );
}
