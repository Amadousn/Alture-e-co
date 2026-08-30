"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const AltureLockLoginPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        <section className="relative min-h-[100dvh] flex items-center justify-center bg-black overflow-hidden px-4 py-20">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#D4AF37]/8 to-transparent blur-[90px]" />
            </div>

            <div className="w-full max-w-sm relative z-10">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl md:text-3xl font-light mb-1">
                        <span className="text-white">Alture</span><span className="text-primary">Lock</span>
                    </h1>
                    <p className="text-sm text-gray-500">Your Co-Pilot</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            className="w-full bg-black border border-white/20 text-white text-sm px-3 py-2 focus:border-primary/60 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className="w-full bg-black border border-white/20 text-white text-sm px-3 py-2 focus:border-primary/60 focus:outline-none transition-colors"
                        />
                    </div>

                    {error && <p className="text-sm text-red-400">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full border border-primary text-primary py-3 text-xs tracking-widest uppercase hover:bg-primary hover:text-black transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p className="text-xs text-center leading-relaxed mt-8 max-w-xs mx-auto text-gray-600">
                    Ten years of experience does not stop a broken rule. Under pressure, everyone is human, not a machine. This is not about being a beginner or being profitable. It is about staying disciplined when it matters most.
                </p>
            </div>
        </section>
    );
};

export default AltureLockLoginPage;
