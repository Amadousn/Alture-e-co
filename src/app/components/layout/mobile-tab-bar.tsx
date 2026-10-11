"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/i18n/language-context";
import { useSession } from "@/utils/use-session";

// The three places a visitor goes on a phone, within reach of the thumb. The
// Cockpit tab leads to the real workspace only for someone who is logged in;
// everyone else gets the entry page, where the demo and the login are.
const MobileTabBar = () => {
    const path = usePathname();
    const { t } = useLanguage();
    const session = useSession();
    const tabs = [
        { id: "home", href: "/", label: t.nav.home, active: !path.startsWith("/alturelock") && !path.startsWith("/education"), icon: <path d="M4 11.5L12 5l8 6.5M6.5 10v9h11v-9" /> },
        { id: "cockpit", href: session.signedIn ? "/alturelock/workspace" : "/alturelock", label: t.mobile.cockpit, active: path.startsWith("/alturelock"), icon: <><path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" /><rect x="5.5" y="11" width="13" height="9" rx="2.2" /></> },
        { id: "education", href: "/education", label: t.nav.education, active: path.startsWith("/education"), icon: <path d="M3.5 9.5L12 5.5l8.5 4-8.5 4-8.5-4zM7 11.5v4.2c1.4 1.2 3.1 1.8 5 1.8s3.6-.6 5-1.8v-4.2" /> },
    ];

    return (
        <nav aria-label="Main" className="lg:hidden fixed inset-x-0 bottom-0 z-[60] border-t border-white/15 bg-black/95 backdrop-blur" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
            <ul className="mx-auto grid max-w-md grid-cols-3">
                {tabs.map((tab) => (
                    <li key={tab.id}>
                        <Link href={tab.href} aria-current={tab.active ? "page" : undefined} className={`relative flex h-[58px] flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-[0.1em] transition-colors ${tab.active ? "text-accent" : "text-white/55"}`}>
                            <svg viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                {tab.icon}
                            </svg>
                            {tab.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MobileTabBar;
