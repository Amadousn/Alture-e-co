"use client";

import { useCallback, useEffect, useState } from "react";

// Whether this browser is signed in to AltureLock. Null until the server has answered.
export function useSession() {
    const [signedIn, setSignedIn] = useState<boolean | null>(null);
    useEffect(() => {
        let cancelled = false;
        fetch("/api/alturelock-login", { cache: "no-store" })
            .then((res) => res.json())
            .then((json) => !cancelled && setSignedIn(Boolean(json.signedIn)))
            .catch(() => !cancelled && setSignedIn(false));
        return () => {
            cancelled = true;
        };
    }, []);
    const signOut = useCallback(async () => {
        await fetch("/api/alturelock-login", { method: "DELETE" }).catch(() => {});
        setSignedIn(false);
    }, []);
    return { signedIn, signOut };
}
