"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Entrance stages, revealed one at a time.
const STAGES = [
    "brand",       // AltureLock / Your Co-Pilot
    "username",
    "password",
    "button",
] as const;

const STEP_DELAY_MS = 220;

const AltureLockLoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(-1);

    useEffect(() => {
        if (step >= STAGES.length - 1) return;
        const id = setTimeout(() => setStep((s) => s + 1), STEP_DELAY_MS);
        return () => clearTimeout(id);
    }, [step]);

    const visible = (stage: (typeof STAGES)[number]) => step >= STAGES.indexOf(stage);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/alturelock-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                router.push("/alturelock");
                router.refresh();
                return;
            }
            const data = await res.json().catch(() => ({}));
            setError(data.error || "Incorrect username or password.");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[100dvh] flex flex-col items-center justify-center bg-black px-4 py-20 font-mono">
            <div className="w-full max-w-sm">
                <div className="border border-white/10 bg-black p-8 md:p-10">
                    {visible("brand") && (
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-normal mb-1">
                                <span className="text-white">Alture</span><span className="text-primary">Lock</span>
                            </h1>
                            <p className="text-xs text-gray-600">Your Co-Pilot</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {visible("username") && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    autoComplete="username"
                                    className="w-full bg-black border border-white/30 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none transition-colors font-mono"
                                />
                            </div>
                        )}
                        {visible("password") && (
                            <div>
                                <label className="block text-xs text-gray-500 mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    autoComplete="current-password"
                                    className="w-full bg-black border border-white/30 text-white text-sm px-3 py-2 focus:border-primary focus:outline-none transition-colors font-mono"
                                />
                            </div>
                        )}

                        {error && (
                            <p className="text-sm text-red-400">// {error}</p>
                        )}

                        {visible("button") && (
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full border border-primary text-primary py-3 text-xs tracking-widest hover:bg-primary hover:text-black transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? "[ SIGNING IN ]" : "[ SIGN IN ]"}
                            </button>
                        )}
                    </form>
                </div>

                <p className="text-xs text-center leading-relaxed mt-8 max-w-xs mx-auto text-gray-600">
                    // Ten years of experience does not stop a broken rule. Under pressure, everyone is human, not a machine. This is not about being a beginner or being profitable. It is about staying disciplined when it matters most.
                </p>
            </div>
        </section>
    );
};

export default AltureLockLoginPage;
