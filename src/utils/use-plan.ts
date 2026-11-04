"use client";

import { useEffect, useState } from "react";

export type PlanState = { ready: boolean; enforced: boolean; plan: string | null };

// The customer's plan as the server reads it from Stripe. Not enforced for visitors, the owner, or while payments are off.
export function usePlan(skip = false): PlanState {
    const [state, setState] = useState<PlanState>({ ready: skip, enforced: false, plan: null });
    useEffect(() => {
        if (skip) return;
        let live = true;
        fetch("/api/billing/status", { cache: "no-store" })
            .then((res) => (res.ok ? res.json() : Promise.reject()))
            .then((json) => live && setState({ ready: true, enforced: json.enforced === true, plan: json.plan ?? null }))
            .catch(() => live && setState({ ready: true, enforced: false, plan: null }));
        return () => {
            live = false;
        };
    }, [skip]);
    return state;
}
