"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PropertyData {
    id?: string;
    property_title: string;
    property_price: string;
    location: string;
    region: string;
    description: string;
    type: string;
    status: string;
    rooms: number;
    beds: number;
    bathrooms: number;
    garages: number;
    livingArea: string;
    property_images: string[];
    primary_image_index: number;
    features?: string[];
    tag?: string;
    category?: string;
    property_img?: string; // Legacy support
}

interface PropertyFormProps {
    initialData?: PropertyData;
    isEdit?: boolean;
}

function SortableImage({ url, index, isPrimary, onSetPrimary, onRemove }: { url: string, index: number, isPrimary: boolean, onSetPrimary: (idx: number) => void, onRemove: (idx: number) => void }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: url });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className={`relative group aspect-square rounded-lg overflow-hidden border-2 ${isPrimary ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
            <Image src={url} alt={`Property image ${index + 1}`} fill className="object-cover" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    title="Remove image"
                >
                    <Icon icon="lucide:trash-2" className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => onSetPrimary(index)}
                    className={`p-1.5 rounded-full transition-colors ${isPrimary ? 'bg-yellow-500 text-white' : 'bg-gray-600/80 text-white hover:bg-yellow-500'}`}
                    title={isPrimary ? "Primary image" : "Set as primary"}
                >
                    <Icon icon={isPrimary ? "lucide:star" : "lucide:star"} className="w-4 h-4" fill={isPrimary ? "currentColor" : "none"} />
                </button>
                <div {...attributes} {...listeners} className="p-1.5 bg-gray-600/80 text-white rounded-full cursor-move hover:bg-gray-700">
                    <Icon icon="lucide:move" className="w-4 h-4" />
                </div>
            </div>
            {isPrimary && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded shadow-sm">
                    Primary
                </div>
            )}
        </div>
    );
}

export default function PropertyForm({ initialData, isEdit }: PropertyFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<PropertyData>({
        defaultValues: {
            property_title: initialData?.property_title || "",
            property_price: initialData?.property_price || "",
            location: initialData?.location || "",
            region: initialData?.region || "",
            description: initialData?.description || "",
            type: initialData?.type || "Villa",
            status: initialData?.status || "Active",
            rooms: initialData?.rooms || 0,
            beds: initialData?.beds || 0,
            bathrooms: initialData?.bathrooms || 0,
            garages: initialData?.garages || 0,
            livingArea: initialData?.livingArea || "",
            property_images: initialData?.property_images || (initialData?.property_img ? [initialData.property_img] : []),
            primary_image_index: initialData?.primary_image_index || 0,
            tag: "Sell", // Forced
            category: "buy", // Forced for compatibility
        }
    });

    const propertyImages = watch("property_images");
    const primaryIndex = watch("primary_image_index");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const oldIndex = propertyImages.indexOf(active.id as string);
            const newIndex = propertyImages.indexOf(over?.id as string);

            // Adjust primary index if moving images around
            const primaryImage = propertyImages[primaryIndex];
            const newImages = arrayMove(propertyImages, oldIndex, newIndex);
            const newPrimaryIndex = newImages.indexOf(primaryImage);

            setValue("property_images", newImages);
            setValue("primary_image_index", newPrimaryIndex);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = propertyImages.filter((_, i) => i !== index);
        setValue("property_images", newImages);
        if (primaryIndex >= index && primaryIndex > 0) {
            setValue("primary_image_index", primaryIndex - 1);
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setUploading(true);
        const newImages = [...propertyImages];

        try {
            for (const file of acceptedFiles) {
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    newImages.push(data.path);
                } else {
                    toast.error(`Failed to upload ${file.name}`);
                }
            }
            setValue("property_images", newImages);
            toast.success("Images uploaded successfully");
        } catch (error) {
            toast.error("Error uploading images");
        } finally {
            setUploading(false);
        }
    }, [propertyImages, setValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true
    });

    const onSubmit = async (data: PropertyData) => {
        setIsSubmitting(true);
        try {
            // Ensure compatibility
            data.property_img = data.property_images[data.primary_image_index] || data.property_images[0] || "";
            data.tag = "Sell";
            data.category = "buy";

            const url = isEdit && initialData?.id ? `/api/properties/${initialData.id}` : "/api/properties";
            const method = isEdit ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                toast.success(isEdit ? "Property updated!" : "Property created!");
                router.push("/admin/properties");
                router.refresh();
            } else {
                toast.error("Operation failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 rounded-2xl bg-neutral-900 p-8 shadow-2xl border border-neutral-800">
            <div className="flex justify-between items-center border-b border-neutral-800 pb-6">
                <h2 className="text-3xl font-bold text-white">{isEdit ? "Edit Property" : "Add New Property"}</h2>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-wider">
                    Mode: SELL Only
                </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Property Title</label>
                    <input
                        {...register("property_title", { required: "Title is required" })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                        placeholder="e.g. Luxury Villa in Bali"
                    />
                    {errors.property_title && <p className="mt-1 text-sm text-red-500 font-medium">{errors.property_title.message}</p>}
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Price ($)</label>
                    <input
                        {...register("property_price", { required: "Price is required" })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                        placeholder="e.g. 500,000"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Description</label>
                    <textarea
                        {...register("description")}
                        rows={4}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                        placeholder="Write a detailed description..."
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Location</label>
                    <input
                        {...register("location", { required: "Location is required" })}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                        placeholder="e.g. Bali, Indonesia"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Region</label>
                    <input
                        {...register("region")}
                        className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all outline-none"
                        placeholder="e.g. South Asia"
                    />
                </div>
            </div>


            {/* Amenities */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
                    Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-neutral-800/50 rounded-xl border border-neutral-800">
                    {["Swimming Pool", "Ocean View", "Garden", "Garage", "Air Conditioning", "Wi-Fi", "Gym", "Security"].map((amenity) => (
                        <label key={amenity} className="flex items-center gap-3 p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 cursor-pointer transition-colors border border-neutral-700 group">
                            <input
                                type="checkbox"
                                value={amenity}
                                {...register("features")}
                                className="w-5 h-5 rounded border-neutral-600 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-0 bg-neutral-900"
                            />
                            <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Details */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
                    Property Details
                </h3>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 p-4 bg-neutral-800/50 rounded-xl border border-neutral-800">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-300">Rooms</label>
                        <input type="number" {...register("rooms", { valueAsNumber: true })} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-300">Bedrooms</label>
                        <input type="number" {...register("beds", { valueAsNumber: true })} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-300">Bathrooms</label>
                        <input type="number" {...register("bathrooms", { valueAsNumber: true })} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-300">Garages</label>
                        <input type="number" {...register("garages", { valueAsNumber: true })} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-gray-300">Area (sq ft)</label>
                        <input {...register("livingArea")} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none" />
                    </div>
                </div>
            </div>

            {/* Type & Status */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Property Type</label>
                    <select {...register("type")} className="w-full rounded-xl border border-neutral-700 bg-neutral-800 p-3 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none">
                        <option value="Apartment">Apartment</option>
                        <option value="House">House</option>
                        <option value="Villa">Villa</option>
                        <option value="Office">Office</option>
                        <option value="Shop">Shop</option>
                        <option value="Warehouse">Warehouse</option>
                    </select>
                </div>
                <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">Status</label>
                    <div className="flex gap-4 pt-3">
                        <label className="flex items-center gap-2 text-white cursor-pointer group">
                            <input type="radio" value="Active" {...register("status")} className="w-4 h-4 text-yellow-500 bg-neutral-700 border-neutral-600 focus:ring-yellow-500" />
                            <span className="group-hover:text-yellow-500 transition-colors">Active</span>
                        </label>
                        <label className="flex items-center gap-2 text-white cursor-pointer group">
                            <input type="radio" value="Sold" {...register("status")} className="w-4 h-4 text-yellow-500 bg-neutral-700 border-neutral-600 focus:ring-yellow-500" />
                            <span className="group-hover:text-yellow-500 transition-colors">Sold</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Image Gallery */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-yellow-500 rounded-full"></span>
                    Gallery
                </h3>
                <label className="mb-4 block text-sm text-gray-400">Drag & drop photos or click to upload. Star the primary image.</label>

                <div {...getRootProps()} className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${isDragActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-neutral-700 bg-neutral-800 hover:bg-neutral-800/80 hover:border-yellow-500/50'}`}>
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 text-yellow-500">
                            <Icon icon="lucide:cloud-upload" className="h-8 w-8" />
                        </div>
                        <p className="text-sm text-gray-300 text-center font-medium">
                            {uploading ? "Uploading..." : <><span className="text-yellow-500 font-bold">Click to upload</span> or drag and drop</>}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">SVG, PNG, JPG or GIF</p>
                    </div>
                </div>

                {propertyImages.length > 0 && (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={propertyImages} strategy={rectSortingStrategy}>
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {propertyImages.map((url, index) => (
                                    <SortableImage
                                        key={url}
                                        url={url}
                                        index={index}
                                        isPrimary={index === primaryIndex}
                                        onSetPrimary={(idx) => setValue("primary_image_index", idx)}
                                        onRemove={handleRemoveImage}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}
            </div>

            <div className="flex gap-4 pt-6 border-t border-neutral-800">
                <button
                    type="submit"
                    disabled={isSubmitting || uploading}
                    className="flex-1 rounded-xl bg-yellow-500 px-6 py-3.5 text-center text-sm font-bold text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 disabled:opacity-50 transition-all shadow-lg shadow-yellow-500/20"
                >
                    {isSubmitting ? "Saving..." : "Save Property"}
                </button>
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="rounded-xl border border-neutral-700 bg-transparent px-6 py-3.5 text-center text-sm font-bold text-white hover:bg-neutral-800 focus:outline-none focus:ring-4 focus:ring-neutral-800 transition-all"
                >
                    Cancel
                </button>
            </div>
        </form >
    );
}
