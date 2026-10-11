// AltureLock's own mark, kept apart from the Alture & Co. wordmark: a lock
// whose body holds the "A", with the A's crossbar reduced to a single dot
// that doubles as the keyhole. The name is set in the brand's logo face with
// "Lock" a weight heavier.
export const LockMark = ({ className = "", weight = 1.25 }: { className?: string; weight?: number }) => (
    <svg viewBox="0 0 28 28" fill="none" className={className} aria-hidden="true">
        <path d="M9 11.5V8.25a5 5 0 0 1 10 0v3.25" stroke="currentColor" strokeWidth={weight} strokeLinecap="round" />
        <rect x="4.25" y="11.5" width="19.5" height="15" rx="3.75" stroke="currentColor" strokeWidth={weight} />
        <path d="M10.6 23l3.4-8 3.4 8" stroke="currentColor" strokeWidth={weight + 0.15} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="21" r={0.95 + weight * 0.12} fill="currentColor" />
    </svg>
);

// The same mark as an object: brushed metal catching a slow light. Used large, as a focal point.
export const MetalLock = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 56 60" fill="none" className={className} aria-hidden="true">
        <defs>
            <linearGradient id="al-metal" x1="6" y1="4" x2="50" y2="58" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#f6f0f8" />
                <stop offset="0.28" stopColor="#b9a3c0" />
                <stop offset="0.5" stopColor="#4b4152" />
                <stop offset="0.72" stopColor="#cdb9d6" />
                <stop offset="1" stopColor="#5a4d62" />
                <animateTransform attributeName="gradientTransform" type="translate" values="-10 -10; 10 10; -10 -10" dur="9s" repeatCount="indefinite" />
            </linearGradient>
            <linearGradient id="al-metal-edge" x1="0" y1="0" x2="0" y2="60" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
        </defs>
        <g stroke="url(#al-metal)" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 26V19.5a10 10 0 0 1 20 0V26" />
            <rect x="8.5" y="26" width="39" height="30" rx="7.5" />
            <path d="M21.2 49L28 33l6.8 16" />
        </g>
        <g stroke="url(#al-metal-edge)" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" opacity="0.8">
            <path d="M16.6 26V19.5a11.4 11.4 0 0 1 11.4 -11.4" />
            <path d="M7.1 48V33.5a7.5 7.5 0 0 1 7.5 -7.5" />
            <path d="M20 49L28 30.2" />
        </g>
        <circle cx="28" cy="45" r="2.3" fill="#f6f0f8" />
    </svg>
);

const AltureLockLogo = ({ size = "md" }: { size?: "sm" | "md" }) => {
    const mark = size === "sm" ? "w-6 h-6" : "w-7 h-7";
    return (
        <span className="inline-flex items-center gap-2.5 text-white">
            <LockMark className={mark} />
            <span className={`font-logo leading-none whitespace-nowrap ${size === "sm" ? "text-lg" : "text-xl"}`}>
                <span className="font-extralight">Alture</span>
                <span className="font-normal">Lock</span>
            </span>
        </span>
    );
};

export default AltureLockLogo;
