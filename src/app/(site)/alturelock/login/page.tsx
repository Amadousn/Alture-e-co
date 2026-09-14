"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/language-context";

const AltureLockLoginPage = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const { alturelockLogin } = t;
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
            setError(res.status === 401 ? alturelockLogin.errorDefault : alturelockLogin.errorGeneric);
        } catch {
            setError(alturelockLogin.errorGeneric);
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
                    <p className="text-sm text-gray-500">{alturelockLogin.tagline}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">{alturelockLogin.usernameLabel}</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            className="w-full bg-black border border-white/20 text-white text-sm px-3 py-2 focus:border-primary/60 focus:outline-none transition-colors"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500 mb-2">{alturelockLogin.passwordLabel}</label>
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
                        {loading ? alturelockLogin.signingInButton : alturelockLogin.signInButton}
                    </button>
                </form>

                <p className="text-xs text-center leading-relaxed mt-8 max-w-xs mx-auto text-gray-600">
                    {alturelockLogin.quote}
                </p>
            </div>
        </section>
    );
};

export default AltureLockLoginPage;
