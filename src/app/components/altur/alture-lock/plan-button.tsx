"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Opens Stripe's payment page for a plan; a visitor signs in first.
const PlanButton = ({ plan, yearly, className, children }: { plan: string; yearly: boolean; className: string; children: React.ReactNode }) => {
    const router = useRouter();
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState("");
    const go = async () => {
        setBusy(true);
        setError("");
        try {
            const res = await fetch("/api/billing/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plan, interval: yearly ? "yearly" : "monthly" }) });
            const json = await res.json();
            if (res.status === 401) return router.push("/alturelock/login");
            if (!res.ok || !json.url) throw new Error(json.error ?? "The payment page could not be opened. Try again.");
            window.location.assign(json.url);
        } catch (e) {
            setError(e instanceof Error ? e.message : "The payment page could not be opened. Try again.");
            setBusy(false);
        }
    };
    return (
        <>
            <button type="button" onClick={go} disabled={busy} className={className}>
                {busy ? "Opening…" : children}
            </button>
            {error && <p role="alert" className="mt-2 text-xs text-[#E5484D]">{error}</p>}
        </>
    );
};

export default PlanButton;
