"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/app/i18n/language-context";

const EducationAccessForm = () => {
    const { t } = useLanguage();
    const { education } = t;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/education-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                setSuccess(true);
                return;
            }
            setError(res.status === 401 ? education.errorIncorrect : education.errorGeneric);
        } catch {
            setError(education.errorGeneric);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="access" className="relative bg-black overflow-hidden px-4 py-20 md:py-28">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[420px] h-[420px] rounded-full bg-gradient-to-br from-purple-500/15 via-fuchsia-500/8 to-transparent blur-[90px]" />
            </div>

            <div className="w-full max-w-sm mx-auto relative z-10">
                <h2 className="text-xl md:text-2xl font-light text-white text-center mb-8">
                    {education.dashboardHeading}
                </h2>

                {success ? (
                    <p className="text-sm text-gray-300 text-center leading-relaxed">
                        {education.successMessage}
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">{education.usernameLabel}</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoComplete="username"
                                className="w-full bg-black border border-white/20 text-white text-sm px-3 py-2 focus:border-fuchsia-400/60 focus:outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500 mb-2">{education.passwordLabel}</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                className="w-full bg-black border border-white/20 text-white text-sm px-3 py-2 focus:border-fuchsia-400/60 focus:outline-none transition-colors"
                            />
                        </div>

                        {error && <p className="text-sm text-red-400">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full border border-white/25 text-white py-3 text-xs tracking-widest uppercase hover:border-fuchsia-400/60 hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            {loading ? education.checkingButton : education.enterButton}
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default EducationAccessForm;
