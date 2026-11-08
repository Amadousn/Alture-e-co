"use client";

import { useCallback, useEffect, useState } from "react";
import { hasAccounts, supabase } from "@/utils/supabase/client";
import { signOutOfWorkspace } from "@/utils/workspace-store";

// Whether this browser is signed in to AltureLock: a customer account, or the
// owner's older login. Null until that is known.
export function useSession() {
    const [signedIn, setSignedIn] = useState<boolean | null>(null);
    useEffect(() => {
        let cancelled = false;
        Promise.all([
            (hasAccounts ? supabase().auth.getUser().then(({ data }) => Boolean(data.user)).catch(() => false) : Promise.resolve(false)),
            fetch("/api/alturelock-login", { cache: "no-store" }).then((res) => res.json()).then((json) => Boolean(json.signedIn)).catch(() => false),
        ]).then(([customer, owner]) => !cancelled && setSignedIn(customer || owner));
        return () => {
            cancelled = true;
        };
    }, []);
    const signOut = useCallback(async () => {
        await signOutOfWorkspace().catch(() => {});
        await fetch("/api/alturelock-login", { method: "DELETE" }).catch(() => {});
        setSignedIn(false);
    }, []);
    return { signedIn, signOut };
}
