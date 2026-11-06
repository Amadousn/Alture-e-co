"use client";

import { usePrivacy } from "@/utils/workspace-store";

// The one Hide amounts control. Home, Journal and Terminal all read the same
// choice, so hiding amounts on one page hides them on the others.
const PrivacyToggle = ({ className = "" }: { className?: string }) => {
    const [hidden, setHidden] = usePrivacy();
    return (
        <button type="button" onClick={() => setHidden(!hidden)} aria-pressed={hidden} title={hidden ? "Show amounts" : "Hide amounts"} className={`flex items-center gap-1.5 ${className}`}>
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                <circle cx="12" cy="12" r="3" />
                {hidden && <path d="M4 4l16 16" />}
            </svg>
            {hidden ? "Show amounts" : "Hide amounts"}
        </button>
    );
};

export default PrivacyToggle;
