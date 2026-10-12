"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TRADE_LINK } from "./intro/course";

const LINKS = [
    ["/education/dashboard", "Dashboard"],
    ["/education/introduction", "Introduction"],
    ["/education/programme", "Programme"],
];

// The bar across the top of the learning pages: where you are, and how far along.
const EduBar = ({ percent }: { percent: number | null }) => {
    const path = usePathname();
    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 md:gap-x-8 gap-y-2 px-4 md:px-6 py-3">
                <Link href="/education" className="flex items-baseline gap-3 whitespace-nowrap">
                    <span className="font-logo text-xl font-extralight text-white">
                        Alture <span className="accent-light">&amp;</span> Co.
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.14em] text-white/55">Education</span>
                </Link>
                <nav aria-label="Education" className="order-3 md:order-none flex w-full md:w-auto items-center gap-x-6 overflow-x-auto">
                    {LINKS.map(([href, text]) => (
                        <Link key={href} href={href} aria-current={path === href ? "page" : undefined} className={`nav-link flex-shrink-0 text-xs font-medium uppercase tracking-[0.06em] ${path === href ? "is-active" : ""}`}>
                            {text}
                        </Link>
                    ))}
                    {/* A full page load, so that it works from inside the Introduction too. */}
                    <a href={TRADE_LINK} className="flex-shrink-0 rounded-sm border border-white/30 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.06em] text-white transition-colors hover:border-white">
                        Try a trade
                    </a>
                </nav>
                <div className="ml-auto flex items-center gap-3 text-xs text-white/55">
                    {percent !== null && (
                        <>
                            <span className="hidden sm:inline">Introduction</span>
                            <span className="h-[3px] w-14 sm:w-24 overflow-hidden rounded-full bg-white/15" aria-hidden="true">
                                <span className="block h-full bg-accent transition-[width] duration-500" style={{ width: `${percent}%` }} />
                            </span>
                            <span className="tabular-nums text-white">{percent}%</span>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default EduBar;
