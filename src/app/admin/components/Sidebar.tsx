"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { signOut } from 'next-auth/react';

const menuItems = [
    { name: 'Dashboard', icon: 'lucide:layout-dashboard', path: '/admin' },
    { name: 'Properties', icon: 'lucide:home', path: '/admin/properties' },
    { name: 'Blogs', icon: 'lucide:file-text', path: '/admin/blogs' },
    { name: 'Settings', icon: 'lucide:settings', path: '/admin/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-neutral-800 bg-black transition-transform sm:translate-x-0">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-4">
                <Link href="/" className="mb-8 flex items-center ps-2.5 mt-4">
                    <span className="self-center whitespace-nowrap text-2xl font-bold text-white"><span className="text-yellow-500">Alture</span> Admin</span>
                </Link>
                <ul className="space-y-2 font-medium">
                    {menuItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`group flex items-center rounded-lg p-3 text-gray-300 hover:bg-neutral-900 hover:text-yellow-500 transition-all duration-200 ${pathname === item.path ? 'bg-neutral-900 text-yellow-500 border-r-4 border-yellow-500' : ''
                                    }`}
                            >
                                <Icon icon={item.icon} className={`h-5 w-5 flex-shrink-0 transition duration-75 ${pathname === item.path ? 'text-yellow-500' : 'text-gray-400 group-hover:text-yellow-500'}`} />
                                <span className="ms-3">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="mt-auto border-t border-neutral-800 pt-4">
                    <button
                        onClick={() => signOut()}
                        className="group flex w-full items-center rounded-lg p-3 text-gray-400 hover:bg-red-900/20 hover:text-red-500 transition-colors"
                    >
                        <Icon icon="lucide:log-out" className="h-5 w-5 flex-shrink-0 transition duration-75" />
                        <span className="ms-3">Sign Out</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
