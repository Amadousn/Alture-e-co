"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { propertyData } from "@/app/types/property/propertyData";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PropertiesClient({ initialData }: { initialData: propertyData[] }) {
    const [properties, setProperties] = useState<propertyData[]>(initialData);
    const router = useRouter();

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return;

        try {
            const res = await fetch(`/api/properties/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                setProperties(properties.filter((p) => p.id !== id));
                toast.success("Property deleted successfully");
            } else {
                toast.error("Failed to delete property");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    return (
        <div>
            <Toaster />
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-white">Properties</h1>
                <Link
                    href="/admin/properties/add"
                    className="flex items-center rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500/50 shadow-lg shadow-yellow-500/20 transition-all"
                >
                    <Icon icon="lucide:plus" className="mr-2 h-5 w-5" />
                    Add Property
                </Link>
            </div>

            <div className="relative overflow-x-auto shadow-2xl sm:rounded-xl">
                <table className="w-full text-left text-sm text-gray-400">
                    <thead className="bg-black text-xs uppercase text-yellow-500 font-bold border-b border-neutral-800">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Location
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr
                                key={property.id}
                                className="border-b border-neutral-800 bg-neutral-900 hover:bg-neutral-800 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="h-16 w-16 relative rounded-lg overflow-hidden border border-neutral-700">
                                        <Image
                                            src={property.property_img || '/placeholder.jpg'}
                                            alt={property.property_title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-bold text-white">
                                    {property.property_title}
                                </td>
                                <td className="px-6 py-4 font-medium text-yellow-500">
                                    {property.property_price}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-bold border ${property.status === "Active"
                                            ? "bg-green-900/20 text-green-400 border-green-900"
                                            : "bg-red-900/20 text-red-400 border-red-900"
                                            }`}
                                    >
                                        {property.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-300">{property.location}</td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-3">
                                        <Link
                                            href={`/admin/properties/edit/${property.id}`}
                                            className="font-medium text-gray-400 hover:text-white transition-colors flex items-center gap-1"
                                        >
                                            <Icon icon="lucide:edit" className="w-4 h-4" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(property.id!)}
                                            className="font-medium text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
                                        >
                                            <Icon icon="lucide:trash-2" className="w-4 h-4" /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
