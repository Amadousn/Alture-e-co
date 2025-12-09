"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Icon } from '@iconify/react';

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
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

    // If no images (shouldn't happen with migration, but safety first)
    if (!images || images.length === 0) return null;

    return (
        <div className="mb-12">
            {/* Ultra Premium Grid Layout with Advanced Effects */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[60vh] min-h-[600px] mb-6">
                {/* Main Hero Image - Enhanced */}
                <div
                    className="md:col-span-8 relative h-full rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_80px_-15px_rgba(234,179,8,0.3)] transition-all duration-700 ring-1 ring-black/5"
                    onClick={() => openModal(0)}
                >
                    <Image
                        src={images[0]}
                        alt={`${title} - Main`}
                        fill
                        className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-105"
                        priority
                    />
                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-yellow-500/10 opacity-70 group-hover:opacity-40 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-700" />

                    {/* Featured Badge with Glassmorphism */}
                    <div className="absolute bottom-8 left-8 z-10 flex items-center gap-3">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-yellow-500/50 backdrop-blur-sm border border-yellow-300/20 hover:scale-105 transition-transform">
                            ✦ Featured Property
                        </span>
                    </div>

                    {/* View Gallery Hint */}
                    <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-semibold border border-white/20">
                            <Icon icon="lucide:maximize-2" className="w-4 h-4 inline mr-2" />
                            View Gallery
                        </div>
                    </div>
                </div>

                {/* Side Grid - Enhanced */}
                <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-5 h-full">
                    {/* Top Right */}
                    <div
                        className="relative rounded-[2rem] overflow-hidden cursor-pointer group h-full shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(234,179,8,0.2)] transition-all duration-700 ring-1 ring-black/5"
                        onClick={() => openModal(1)}
                    >
                        <Image
                            src={images[1] || images[0]}
                            alt={`${title} - 2`}
                            fill
                            className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-yellow-500/5 group-hover:opacity-0 transition-opacity duration-700" />
                    </div>

                    {/* Bottom Right Container */}
                    <div className="grid grid-cols-2 gap-5 h-full">
                        <div
                            className="relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(234,179,8,0.2)] transition-all duration-700 ring-1 ring-black/5"
                            onClick={() => openModal(2)}
                        >
                            <Image
                                src={images[2] || images[0]}
                                alt={`${title} - 3`}
                                fill
                                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-yellow-500/5 group-hover:opacity-0 transition-opacity duration-700" />
                        </div>
                        <div
                            className="relative rounded-[2rem] overflow-hidden cursor-pointer group shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(234,179,8,0.2)] transition-all duration-700 ring-1 ring-black/5"
                            onClick={() => openModal(3)}
                        >
                            <Image
                                src={images[3] || images[0]}
                                alt={`${title} - 4`}
                                fill
                                className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-105"
                            />
                            {/* Glassmorphic "View All" Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-yellow-500/20 backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-700 flex items-center justify-center">
                                {images.length > 4 ? (
                                    <div className="text-center transform group-hover:scale-110 transition-transform duration-500">
                                        <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
                                            <span className="block text-3xl font-black text-white mb-2 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">+{images.length - 4}</span>
                                            <span className="text-xs text-yellow-300 uppercase tracking-[0.15em] font-bold">More Photos</span>
                                        </div>
                                    </div>
                                ) : (
                                    <Icon icon="lucide:maximize-2" className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View All Button (if needed, though grid handles first one well) */}
            <div className="md:hidden mt-2">
                <button
                    onClick={() => openModal(0)}
                    className="w-full py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm font-medium"
                >
                    View all {images.length} photos
                </button>
            </div>


            {/* Lightbox Modal */}
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/90" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-black p-1 text-left align-middle shadow-xl transition-all relative aspect-video">

                                    {/* Close Button */}
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"
                                    >
                                        <Icon icon="lucide:x" className="w-6 h-6" />
                                    </button>

                                    {/* Navigation */}
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"
                                            >
                                                <Icon icon="lucide:chevron-left" className="w-8 h-8" />
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-black/80"
                                            >
                                                <Icon icon="lucide:chevron-right" className="w-8 h-8" />
                                            </button>
                                        </>
                                    )}

                                    {/* Main Image */}
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={images[currentIndex]}
                                            alt={`${title} - View ${currentIndex + 1}`}
                                            fill
                                            className="object-contain"
                                            quality={100}
                                        />
                                    </div>

                                    {/* Counter */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                                        {currentIndex + 1} / {images.length}
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}
