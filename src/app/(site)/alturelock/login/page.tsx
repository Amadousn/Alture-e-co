"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { LockMark } from "@/app/components/altur/workspace/alturelock-logo";
import { useSession } from "@/utils/use-session";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/language-context";
import { DEMO_OPEN, LOGIN_OPEN } from "@/utils/launch";
import { supabase } from "@/utils/supabase/client";

type Mode = "signin" | "signup" | "forgot" | "reset";

const COPY = {
    en: { email: "Email", newPassword: "New password", create: "Create account", creating: "Creating...", noAccount: "No account yet?", haveAccount: "Already have an account?", signIn: "Sign in", signUp: "Create one", forgot: "Forgot your password?", send: "Send the link", sending: "Sending...", save: "Save the password", saving: "Saving...", checkMail: "Check your email and open the link to confirm your account.", resetSent: "If this email has an account, a link to choose a new password is on its way. Nothing after a few minutes? Check your spam, and the address you typed.", short: "Use at least 8 characters.", unconfirmed: "Confirm your email first, using the link we sent you.", same: "This is already your password. Choose a different one.", weak: "This password is too easy to guess. Choose a stronger one.", tooMany: "Too many attempts. Please wait a few minutes and try again.", wrong: "Incorrect email or password.", expired: "This link has expired. Please ask for a new one." },
    fr: { email: "Email", newPassword: "Nouveau mot de passe", create: "Créer mon compte", creating: "Création...", noAccount: "Pas encore de compte ?", haveAccount: "Déjà un compte ?", signIn: "Se connecter", signUp: "En créer un", forgot: "Mot de passe oublié ?", send: "Envoyer le lien", sending: "Envoi...", save: "Enregistrer", saving: "Enregistrement...", checkMail: "Ouvrez le lien reçu par email pour confirmer votre compte.", resetSent: "Si cet email a un compte, vous allez recevoir un lien pour choisir un nouveau mot de passe. Rien après quelques minutes ? Regardez vos spams et vérifiez l'adresse saisie.", short: "8 caractères minimum.", unconfirmed: "Confirmez d'abord votre email avec le lien reçu.", same: "C'est déjà votre mot de passe. Choisissez-en un autre.", weak: "Ce mot de passe est trop facile à deviner. Choisissez-en un plus solide.", tooMany: "Trop de tentatives. Patientez quelques minutes avant de réessayer.", wrong: "Email ou mot de passe incorrect.", expired: "Ce lien a expiré. Demandez-en un nouveau." },
    it: { email: "Email", newPassword: "Nuova password", create: "Crea account", creating: "Creazione...", noAccount: "Non hai un account?", haveAccount: "Hai già un account?", signIn: "Accedi", signUp: "Creane uno", forgot: "Password dimenticata?", send: "Invia il link", sending: "Invio...", save: "Salva la password", saving: "Salvataggio...", checkMail: "Apri il link che ti abbiamo inviato per confermare l'account.", resetSent: "Se a questa email corrisponde un account, riceverai un link per scegliere una nuova password. Non arriva dopo qualche minuto? Controlla lo spam e l'indirizzo inserito.", short: "Almeno 8 caratteri.", unconfirmed: "Prima conferma l'email con il link che ti abbiamo inviato.", same: "È già la tua password. Scegline una diversa.", weak: "Questa password è troppo facile da indovinare. Scegline una più sicura.", tooMany: "Troppi tentativi. Attendi qualche minuto e riprova.", wrong: "Email o password errati.", expired: "Questo link è scaduto. Richiedine uno nuovo." },
    ru: { email: "Email", newPassword: "Новый пароль", create: "Создать аккаунт", creating: "Создаём...", noAccount: "Ещё нет аккаунта?", haveAccount: "Уже есть аккаунт?", signIn: "Войти", signUp: "Создать", forgot: "Забыли пароль?", send: "Отправить ссылку", sending: "Отправляем...", save: "Сохранить пароль", saving: "Сохраняем...", checkMail: "Откройте ссылку из письма, чтобы подтвердить аккаунт.", resetSent: "Если на этот email есть аккаунт, мы отправим ссылку для смены пароля. Письма нет уже несколько минут? Проверьте спам и правильность адреса.", short: "Минимум 8 символов.", unconfirmed: "Сначала подтвердите email по ссылке из письма.", same: "Это ваш текущий пароль. Выберите другой.", weak: "Этот пароль слишком простой. Выберите более надёжный.", tooMany: "Слишком много попыток. Подождите несколько минут и повторите.", wrong: "Неверный email или пароль.", expired: "Срок действия ссылки истёк. Запросите новую." },
};

const AltureLockLoginPage = () => {
    const router = useRouter();
    const { t, language } = useLanguage();
    const copy = COPY[language as keyof typeof COPY] ?? COPY.en;
    const [mode, setMode] = useState<Mode>("signin");
    const [notice, setNotice] = useState("");
    const { alturelockLogin, loginPage } = t;
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const session = useSession();
    // Temporary: compares the two login directions with ?style=1 or ?style=2.
    const [style, setStyle] = useState("1");
    const [reveal, setReveal] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setStyle(params.get("style") ?? "1");
        if (params.get("mode") === "reset") setMode("reset");
        if (params.get("link") === "expired") setError(copy.expired);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Already signed in: there is nothing to do here.
    useEffect(() => {
        if (session.signedIn && mode !== "reset") router.replace("/alturelock/workspace");
    }, [session.signedIn, mode, router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Access has not begun: the page is shown, but nothing is sent.
        if (!LOGIN_OPEN) return;
        setError("");
        setNotice("");
        if ((mode === "signup" || mode === "reset") && password.length < 8) return setError(copy.short);
        setLoading(true);
        const auth = supabase().auth;
        let leaving = false;
        const back = `${window.location.origin}/alturelock/auth/callback`;
        try {
            if (mode === "forgot") {
                await auth.resetPasswordForEmail(username, { redirectTo: `${back}?reset=1` });
                setNotice(copy.resetSent);
            } else if (mode === "signup") {
                const { error } = await auth.signUp({ email: username, password, options: { emailRedirectTo: back } });
                if (error) setError(error.code === "weak_password" ? copy.weak : error.status === 429 ? copy.tooMany : alturelockLogin.errorGeneric);
                else setNotice(copy.checkMail);
            } else {
                const { error } = mode === "reset" ? await auth.updateUser({ password }) : await auth.signInWithPassword({ email: username, password });
                if (!error) {
                    // A full load, so the workspace starts from this account's data.
                    leaving = true;
                    window.location.assign("/alturelock/workspace");
                    return;
                }
                setError(error.code === "email_not_confirmed" ? copy.unconfirmed : error.code === "same_password" ? copy.same : error.code === "weak_password" ? copy.weak : error.code === "session_not_found" || error.code === "session_expired" || error.name === "AuthSessionMissingError" ? copy.expired : error.status === 429 ? copy.tooMany : mode === "signin" && error.status === 400 ? copy.wrong : alturelockLogin.errorGeneric);
            }
        } catch {
            setError(alturelockLogin.errorGeneric);
        } finally {
            // Stays busy while the workspace loads, so the form cannot be sent twice.
            if (!leaving) setLoading(false);
        }
    };
    const go = (next: Mode) => {
        setMode(next);
        setError("");
        setNotice("");
    };
    const needsEmail = mode !== "reset";
    const needsPassword = mode !== "forgot";
    const button = { signin: [alturelockLogin.signInButton, alturelockLogin.signingInButton], signup: [copy.create, copy.creating], forgot: [copy.send, copy.sending], reset: [copy.save, copy.saving] }[mode];

    const label = "block text-[12px] font-medium text-white/70";
    const field = "!mt-2 !block !h-12 !w-full !rounded-md !border !border-white/15 !bg-white/[0.04] !px-4 !text-[15px] !text-white placeholder:!text-white/30 transition-colors hover:!border-white/30 focus:!border-[#4DD0E1] focus:!bg-white/[0.06] focus:!outline-none focus:!ring-2 focus:!ring-[#4DD0E1]/20 disabled:!cursor-not-allowed disabled:!opacity-40";
    const form = (
        <form onSubmit={handleSubmit} className="w-full space-y-5 text-left" noValidate={false}>
            {needsEmail && (
                <div>
                    <label htmlFor="login-email" className={label}>
                        {copy.email}
                    </label>
                    <input id="login-email" type="email" required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="email" placeholder="you@example.com" disabled={!LOGIN_OPEN} className={field} />
                </div>
            )}
            {needsPassword && (
                <div>
                    <div className="flex items-baseline justify-between">
                        <label htmlFor="login-password" className={label}>
                            {mode === "reset" ? copy.newPassword : alturelockLogin.passwordLabel}
                        </label>
                        {LOGIN_OPEN && mode === "signin" && (
                            <button type="button" onClick={() => go("forgot")} className="text-[12px] text-white/50 transition-colors hover:text-[#4DD0E1]">
                                {copy.forgot}
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <input id="login-password" type={reveal ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} disabled={!LOGIN_OPEN} className={`${field} !pr-16`} />
                        <button type="button" onClick={() => setReveal((v) => !v)} aria-label={reveal ? "Hide password" : "Show password"} aria-pressed={reveal} className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 rounded px-1.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/45 transition-colors hover:text-white">
                            {reveal ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>
            )}
            {error && (
                <p role="alert" className="rounded-md border border-[#E955A8]/30 bg-[#E955A8]/[0.07] px-3.5 py-2.5 text-[13px] text-[#E955A8]">
                    {error}
                </p>
            )}
            {notice && (
                <p role="status" className="rounded-md border border-[#4DD0E1]/25 bg-[#4DD0E1]/[0.06] px-3.5 py-2.5 text-[13px] text-white/85">
                    {notice}
                </p>
            )}
            {/* Access has not begun: said to screen readers, and the button stays off. */}
            {!LOGIN_OPEN && <p className="sr-only">{loginPage.closed}</p>}
            <button type="submit" disabled={!LOGIN_OPEN || loading} aria-busy={loading} className="group flex h-12 w-full items-center justify-center gap-2.5 rounded-md bg-[#4DD0E1] text-[14px] font-semibold text-black transition-[background-color,box-shadow] hover:bg-[#6fdbe9] hover:shadow-[0_0_0_4px_rgba(77,208,225,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40 disabled:shadow-none">
                {loading && <span aria-hidden="true" className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/25 border-t-black" />}
                {loading ? button[1] : button[0]}
                {!loading && (
                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                )}
            </button>
            {LOGIN_OPEN && mode !== "reset" && (
                <p className="text-center text-[13px] text-white/50">
                    {mode === "signin" ? copy.noAccount : copy.haveAccount}{" "}
                    <button type="button" onClick={() => go(mode === "signin" ? "signup" : "signin")} className="font-medium text-white transition-colors hover:text-[#4DD0E1]">
                        {mode === "signin" ? copy.signUp : copy.signIn}
                    </button>
                </p>
            )}
            {LOGIN_OPEN && mode === "forgot" && (
                <p className="text-center text-[13px]">
                    <button type="button" onClick={() => go("signin")} className="text-white/50 transition-colors hover:text-white">
                        ← {copy.signIn}
                    </button>
                </p>
            )}
        </form>
    );
    const others = (
        <p className="text-[12px] text-white/40">
            {loginPage.noAccount}{" "}
            {DEMO_OPEN ? (
                <Link href="/alturelock/demo" className="text-white/75 hover:text-white">
                    {loginPage.tryDemo}
                </Link>
            ) : (
                <span className="text-white/75">{({ en: "Coming soon", fr: "Bientôt disponible", it: "Presto disponibile", ru: "Скоро" } as Record<string, string>)[language] ?? "Coming soon"}</span>
            )}{" "}
            {loginPage.or}{" "}
            <Link href="/alturelock" className="text-white/75 hover:text-white">
                {loginPage.explore}
            </Link>
        </p>
    );
    const wordmark = (size: string) => (
        <span className={`inline-flex items-center gap-3 font-logo leading-none text-white ${size}`}>
            <LockMark className="h-[0.95em] w-[0.95em]" weight={1} />
            <span>
                <span className="font-extralight">Alture</span>
                <span className="font-normal">Lock</span>
            </span>
        </span>
    );
    const heading = mode === "signup" ? copy.create : mode === "forgot" ? copy.forgot : mode === "reset" ? copy.newPassword : loginPage.title;

    // Direction 2: premium trading technology. The brand and what it does on the left, a defined panel on the right.
    if (style === "2")
        return (
            <section className="bg-black min-h-[100dvh] flex items-center !py-0">
                <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-16 pt-28 md:px-8 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-20 lg:pt-24">
                    <div className="hidden lg:block">
                        {wordmark("text-[40px]")}
                        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-white/60">{t.entry.headline}</p>
                        <dl className="mt-12 grid max-w-md grid-cols-3 border-t border-white/10 pt-6">
                            {[
                                ["Before", "Your rules"],
                                ["During", "Your alarms"],
                                ["After", "Your journal"],
                            ].map(([k, v]) => (
                                <div key={k}>
                                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#4DD0E1]">{k}</dt>
                                    <dd className="mt-1.5 text-[13px] text-white/70">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35">Read-only exchange access · No order is ever placed</p>
                    </div>
                    <div className="w-full rounded-xl border border-white/10 bg-[#0b0b0d] p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-9">
                        <div className="lg:hidden">{wordmark("text-[28px]")}</div>
                        <h1 className="!mt-7 !text-[24px] !font-medium !leading-tight text-white lg:!mt-0">{heading}</h1>
                        <p className="mt-2 text-[13px] text-white/45">AltureLock workspace</p>
                        <div className="mt-8">{form}</div>
                        <div className="mt-8 border-t border-white/10 pt-5 text-center">{others}</div>
                    </div>
                </div>
            </section>
        );

    // Direction 1: minimal private fintech. One centred column, the brand directly above the form.
    return (
        <section className="bg-black min-h-[100dvh] flex flex-col items-center justify-center px-5 !pt-28 !pb-16">
            <div className="w-full max-w-[400px]">
                <div className="text-center">
                    {wordmark("text-[30px] sm:text-[34px]")}
                    <h1 className="!mt-8 !text-[22px] !font-medium !leading-tight text-white">{heading}</h1>
                    <p className="mt-2 text-[13px] text-white/45">{t.entry.headline}</p>
                </div>
                <div className="mt-9 rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7">{form}</div>
                <div className="mt-6 text-center">{others}</div>
            </div>
        </section>
    );
};
export default AltureLockLoginPage;
