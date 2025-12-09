"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from '@iconify/react';

interface ProfessionalGalleryProps {
    images: string[];
    title: string;
    price: string;
    location: string;
    beds?: number;
    bathrooms?: number;
    livingArea?: string;
    description?: string;
}

export default function ProfessionalGallery({
    images,
    title,
    price,
    location,
    beds,
    bathrooms,
    livingArea,
    description
}: ProfessionalGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'Escape') closeModal();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* Single Hero Image Trigger */}
            <div
                className="relative h-[60vh] min-h-[500px] w-full rounded-2xl overflow-hidden cursor-pointer group shadow-2xl shadow-black/50 border border-white/10"
                onClick={() => openModal(0)}
            >
                <Image
                    src={images[0]}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

                {/* View Gallery Button (Centered) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-all transform group-hover:scale-105 shadow-xl flex items-center gap-3">
                        <Icon icon="lucide:grid" className="w-5 h-5" />
                        View Gallery
                    </div>
                </div>

                {/* Photo Count Badge (Bottom Right) */}
                <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Icon icon="lucide:camera" className="w-4 h-4" />
                    <span className="font-medium">{images.length} Photos</span>
                </div>
            </div>

            {/* Professional Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[60]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/95 backdrop-blur-md" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="flex min-h-full items-center justify-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full h-screen bg-black text-white flex flex-col">
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-xl font-bold">{title}</h3>
                                            <span className="text-primary text-lg font-bold">{price}</span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-gray-400">
                                                {currentIndex + 1} / {images.length}
                                            </span>
                                            <button
                                                onClick={closeModal}
                                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                            >
                                                <Icon icon="lucide:x" className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 flex overflow-hidden">
                                        {/* Image Section */}
                                        <div className="flex-1 flex items-center justify-center p-8 relative bg-neutral-900/50">
                                            {/* Navigation Arrows */}
                                            {images.length > 1 && (
                                                <>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full transition-all z-10 backdrop-blur-sm"
                                                    >
                                                        <Icon icon="lucide:chevron-left" className="w-6 h-6" />
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-black/50 hover:bg-white/10 border border-white/10 rounded-full transition-all z-10 backdrop-blur-sm"
                                                    >
                                                        <Icon icon="lucide:chevron-right" className="w-6 h-6" />
                                                    </button>
                                                </>
                                            )}

                                            {/* Main Image */}
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={images[currentIndex]}
                                                    alt={`${title} - ${currentIndex + 1}`}
                                                    fill
                                                    className="object-contain"
                                                    quality={100}
                                                    priority
                                                />
                                            </div>
                                        </div>

                                        {/* Info Panel */}
                                        <div className="w-[400px] bg-black border-l border-white/10 p-8 overflow-y-auto hidden lg:block">
                                            <div className="space-y-8">
                                                {/* Location */}
                                                <div>
                                                    <div className="flex items-center gap-2 text-primary mb-3">
                                                        <Icon icon="lucide:map-pin" className="w-4 h-4" />
                                                        <span className="text-xs font-bold uppercase tracking-[0.2em]">Location</span>
                                                    </div>
                                                    <p className="text-2xl font-light text-white">{location}</p>
                                                </div>

                                                {/* Quick Stats */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                        <Icon icon="lucide:bed-double" className="w-6 h-6 text-primary mb-3" />
                                                        <p className="text-2xl font-bold">{beds || 0}</p>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Bedrooms</p>
                                                    </div>
                                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                                        <Icon icon="lucide:bath" className="w-6 h-6 text-primary mb-3" />
                                                        <p className="text-2xl font-bold">{bathrooms || 0}</p>
                                                        <p className="text-xs text-gray-500 uppercase tracking-wider">Bathrooms</p>
                                                    </div>
                                                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 col-span-2">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <Icon icon="lucide:scaling" className="w-6 h-6 text-primary mb-2" />
                                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Living Area</p>
                                                            </div>
                                                            <p className="text-2xl font-bold">{livingArea || 'N/A'} <span className="text-sm font-normal text-gray-500">sq ft</span></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Description */}
                                                {description && (
                                                    <div>
                                                        <div className="flex items-center gap-2 text-primary mb-4">
                                                            <div className="w-8 h-[1px] bg-primary"></div>
                                                            <span className="text-xs font-bold uppercase tracking-[0.2em]">About</span>
                                                        </div>
                                                        <p className="text-gray-400 text-sm leading-relaxed font-light">
                                                            {description.substring(0, 400)}...
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Thumbnail Strip */}
                                    <div className="h-24 border-t border-white/10 bg-neutral-900/50 backdrop-blur-md">
                                        <div className="flex h-full items-center gap-2 px-4 overflow-x-auto">
                                            {images.map((img, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentIndex(idx)}
                                                    className={`relative flex-shrink-0 h-16 w-24 rounded-lg overflow-hidden transition-all duration-300 ${idx === currentIndex
                                                        ? 'ring-2 ring-primary scale-105 opacity-100'
                                                        : 'opacity-50 hover:opacity-100 hover:scale-105'
                                                        }`}
                                                >
                                                    <Image
                                                        src={img}
                                                        alt={`Thumbnail ${idx + 1}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
