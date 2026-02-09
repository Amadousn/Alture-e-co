import React from 'react';
import Link from 'next/link';
import LogoutButton from './components/LogoutButton';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkmode flex font-dm-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-semidark shadow-lg flex-shrink-0 fixed h-full z-10 overflow-y-auto flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-primary">Alture Admin</h1>
        </div>
        <nav className="mt-6 flex-1">
          <Link href="/dashboard" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="font-medium">Properties</span>
          </Link>
          <Link href="/dashboard/categories" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="font-medium">Categories</span>
          </Link>
          <Link href="/dashboard/users" className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <span className="font-medium">Users</span>
          </Link>
        </nav>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <LogoutButton />
          <Link href="/" className="flex items-center px-6 py-3 text-gray-500 hover:text-primary transition-colors justify-center mt-2">
            <span className="text-sm">Back to Site</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64 bg-gray-50 dark:bg-darkmode min-h-screen text-black dark:text-white">
        {children}
      </main>
    </div>
  );
}
