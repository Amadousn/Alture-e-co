"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import AltureLockLogo, { LockMark } from "@/app/components/altur/workspace/alturelock-logo";
import Ribbon from "@/app/components/altur/alture-lock/ribbon";
import { useSession } from "@/utils/use-session";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/language-context";
import { DEMO_OPEN, LOGIN_OPEN } from "@/utils/launch";

const AltureLockLoginPage = () => {
    const router = useRouter();
    const { t } = useLanguage();
    const { alturelockLogin, loginPage } = t;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const session = useSession();
    // Temporary: lets the three candidate designs be compared with ?style=a, b or c.
    const [style, setStyle] = useState("a");
    useEffect(() => setStyle(new URLSearchParams(window.location.search).get("style") ?? "a"), []);

    // Already signed in: there is nothing to do here.
    useEffect(() => {
        if (session.signedIn) router.replace("/alturelock/workspace");
    }, [session.signedIn, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Access has not begun: the page is shown, but nothing is sent.
        if (!LOGIN_OPEN) return;
        setError("");
        setLoading(true);
        try {
            const res = await fetch("/api/alturelock-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (res.ok) {
                router.push("/alturelock/workspace");
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

    const field = "!w-full !rounded-none !border-0 !border-b !border-white/25 !bg-transparent !px-0 !py-3 !text-base !text-white placeholder:!text-white/30 focus:!border-white focus:!outline-none focus:!ring-0 disabled:!opacity-40 disabled:!cursor-not-allowed";
    const form = (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-left">
            <div>
                <label htmlFor="login-username" className="block text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {alturelockLogin.usernameLabel}
                </label>
                <input id="login-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" disabled={!LOGIN_OPEN} className={field} />
            </div>
            <div>
                <label htmlFor="login-password" className="block text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {alturelockLogin.passwordLabel}
                </label>
                <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" disabled={!LOGIN_OPEN} className={field} />
            </div>
            {error && (
                <p role="alert" className="text-sm text-[#E955A8]">
                    {error}
                </p>
            )}
            {!LOGIN_OPEN && (
                <p role="status" className="border-l-2 border-[#FACC15] pl-4 text-sm text-white/80">
                    {loginPage.closed}
                </p>
            )}
            <button type="submit" disabled={!LOGIN_OPEN || loading || !username || !password} className="group flex w-full items-center justify-center gap-3 rounded-sm bg-white py-3.5 text-sm font-semibold text-black hover:bg-[#e4e4e8] transition-colors lit disabled:opacity-30 disabled:shadow-none">
                {loading ? alturelockLogin.signingInButton : alturelockLogin.signInButton}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
        </form>
    );
    const others = (
        <p className="text-xs text-white/45">
            {loginPage.noAccount}{" "}
            {DEMO_OPEN ? (
                <Link href="/alturelock/demo" className="text-white/80 border-b border-white/25 hover:text-white hover:border-white">
                    {loginPage.tryDemo}
                </Link>
            ) : (
                <Link href="/#contact" className="text-white/80 border-b border-white/25 hover:text-white hover:border-white">
                    {loginPage.requestAccess}
                </Link>
            )}{" "}
            {loginPage.or}{" "}
            <Link href="/alturelock" className="text-white/80 border-b border-white/25 hover:text-white hover:border-white">
                {loginPage.explore}
            </Link>
        </p>
    );
    const wordmark = (
        <span className="inline-flex items-center gap-4 font-logo text-4xl sm:text-5xl text-white leading-none">
            <LockMark className="h-[0.95em] w-[0.95em]" weight={1} />
            <span>
                <span className="font-extralight">Alture</span>
                <span className="font-normal">Lock</span>
            </span>
        </span>
    );

    // B: the brand on the left, the form on the right.
    if (style === "b")
        return (
            <section className="bg-black min-h-[100dvh] !py-0 grid lg:grid-cols-2">
                <div className="flex flex-col justify-end px-6 md:px-12 pt-32 pb-12 lg:border-r lg:border-white/15">
                    <Ribbon className="h-[28vh] min-h-[160px] max-h-[320px] mb-auto" />
                    {wordmark}
                    <p className="mt-5 max-w-md text-white/55">{t.entry.headline}</p>
                </div>
                <div className="flex flex-col justify-center gap-8 px-6 md:px-12 py-16">
                    <h1 className="!text-3xl md:!text-4xl text-white">{loginPage.title}</h1>
                    {form}
                    {others}
                </div>
            </section>
        );

    // C: nothing but the mark and the form.
    if (style === "c")
        return (
            <section className="bg-black min-h-[100dvh] flex flex-col items-center justify-center gap-10 px-6 !py-28 text-center">
                <AltureLockLogo />
                <h1 className="!text-4xl md:!text-5xl text-white">{loginPage.title}</h1>
                {form}
                {others}
            </section>
        );

    // A: the same opening as AltureLock itself, with the form beneath the wordmark.
    return (
        <section className="bg-black min-h-[100dvh] flex flex-col items-center justify-center px-6 !pt-24 !pb-16 text-center">
            <Ribbon className="h-[26vh] min-h-[150px] max-h-[300px] max-w-5xl" />
            <h1 className="sr-only">Log in to AltureLock</h1>
            <div className="mt-4">{wordmark}</div>
            <p className="mt-4 mb-10 text-sm md:text-base text-white/60">{t.entry.headline}</p>
            {form}
            <div className="mt-8">{others}</div>
        </section>
    );
};

export default AltureLockLoginPage;
