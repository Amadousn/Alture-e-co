"use client";

import { useEffect } from "react";

// A fresh page load to a URL like /#contact relies on the browser's native
// hash-jump, but this site's global `scroll-behavior: smooth` turns that
// jump into an animated scroll that gets interrupted while the page is
// still settling (fonts, client components mounting) - it ends up landing
// near the top instead of at the target section. This corrects it once
// the layout has stabilized.
export default function HashScrollFix() {
    useEffect(() => {
        const hash = window.location.hash;
        if (!hash) return;

        const target = document.getElementById(hash.slice(1));
        if (!target) return;

        const timeout = setTimeout(() => {
            target.scrollIntoView({ behavior: "auto", block: "start" });
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return null;
}
