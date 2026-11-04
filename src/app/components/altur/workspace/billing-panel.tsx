"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/utils/use-plan";

const NAMES: Record<string, string> = { free: "Free", journal: "Journal", terminal: "Terminal", alturelock: "AltureLock" };

// The customer's plan, and Stripe's own page to change card, change plan or cancel.
const BillingPanel = () => {
    const { ready, enforced, plan } = usePlan();
    const [error, setError] = useState("");
    if (!ready || !enforced || !plan) return null;
    const manage = async () => {
        setError("");
        const res = await fetch("/api/billing/portal", { method: "POST" }).catch(() => null);
        const json = res ? await res.json().catch(() => null) : null;
        if (json?.url) window.location.assign(json.url);
        else setError(json?.error ?? "The billing page could not be opened. Try again.");
    };
    return (
        <div className="my-6 max-w-xl border border-white/15 p-5">
            <p className="text-[11px] uppercase tracking-[0.08em] text-[#7d7d87]">Your plan</p>
            <p className="mt-1 text-xl font-semibold text-white">{NAMES[plan] ?? plan}</p>
            <div className="mt-3 text-sm">
                {plan === "free" ? (
                    <Link href="/alturelock#pricing" className="text-white border-b border-white/30 hover:border-white">See the plans</Link>
                ) : (
                    <button type="button" onClick={manage} className="text-white border-b border-white/30 hover:border-white">Manage billing</button>
                )}
            </div>
            {error && <p role="alert" className="mt-2 text-xs text-[#E5484D]">{error}</p>}
        </div>
    );
};

export default BillingPanel;
