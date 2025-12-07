'use client';

import { signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="flex items-center px-6 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-colors"
    >
      <Icon icon="mdi:logout" width="24" className="mr-3" />
      <span className="font-medium">Sign Out</span>
    </button>
  );
}
