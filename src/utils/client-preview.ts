"use client";

import { useEffect, useState } from "react";

// Local preview only: ?as=client on a demo page hides every demo label, so the
// owner can see the screens as a customer with Bybit connected would. It is kept
// for the tab (sessionStorage) and never works in a production build.
export function useClientPreview(): boolean {
    const [on, setOn] = useState(false);
    useEffect(() => {
        if (process.env.NODE_ENV === "production") return;
        try {
            const asked = new URLSearchParams(location.search).get("as");
            if (asked === "client") sessionStorage.setItem("alturelock:as-client", "1");
            if (asked === "demo") sessionStorage.removeItem("alturelock:as-client");
            setOn(sessionStorage.getItem("alturelock:as-client") === "1");
        } catch {}
    }, []);
    return on;
}
