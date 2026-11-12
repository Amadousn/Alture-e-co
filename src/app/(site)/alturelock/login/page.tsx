"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { LockMark } from "@/app/components/altur/workspace/alturelock-logo";
import { useSession } from "@/utils/use-session";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/i18n/language-context";
import { LOGIN_OPEN } from "@/utils/launch";
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
    const [reveal, setReveal] = useState(false);
    // Sign-up consents: the terms are required, marketing is optional and stored on its own.
    const [terms, setTerms] = useState(false);
    const [marketing, setMarketing] = useState(false);
    const [done, setDone] = useState(false);
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
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
                if (!terms) return setError("Please accept the Terms of Use to create your account.");
                const now = new Date().toISOString();
                // Kept in the account's own data, separately: the terms acceptance, and the marketing choice the trader can change later.
                const { error } = await auth.signUp({ email: username, password, options: { emailRedirectTo: back, data: { terms_accepted_at: now, marketing_opt_in: marketing, marketing_updated_at: now } } });
                if (error) setError(error.code === "weak_password" ? copy.weak : error.status === 429 ? copy.tooMany : alturelockLogin.errorGeneric);
                else setNotice(copy.checkMail);
            } else {
                const { error } = mode === "reset" ? await auth.updateUser({ password }) : await auth.signInWithPassword({ email: username, password });
                if (!error) {
                    // A full load, so the workspace starts from this account's data.
                    leaving = true;
                    setDone(true);
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
    const field = "!mt-2 !block !h-12 !w-full !rounded-md !border !border-white/12 !bg-white/[0.035] !px-4 !text-[15px] !text-white placeholder:!text-white/25 transition-colors hover:!border-white/25 focus:!border-[#4DD0E1]/70 focus:!bg-white/[0.05] focus:!outline-none focus:!ring-[3px] focus:!ring-[#4DD0E1]/15 disabled:!cursor-not-allowed disabled:!opacity-40";
    const box = "mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer appearance-none rounded-[4px] border border-white/30 bg-transparent transition-colors checked:border-[#4DD0E1] checked:bg-[#4DD0E1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1]/40 bg-center bg-no-repeat checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 16 16%22><path d=%22M4 8.5l2.5 2.5L12 5.5%22 fill=%22none%22 stroke=%22black%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>')]";
    const form = (
        <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            {needsEmail && (
                <div>
                    <label htmlFor="login-email" className={label}>
                        {copy.email}
                    </label>
                    <input id="login-email" type="email" required value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="email" placeholder="you@example.com" disabled={!LOGIN_OPEN || done} className={field} />
                </div>
            )}
            {needsPassword && (
                <div>
                    <div className="flex items-baseline justify-between">
                        <label htmlFor="login-password" className={label}>
                            {mode === "reset" ? copy.newPassword : alturelockLogin.passwordLabel}
                        </label>
                        {LOGIN_OPEN && mode === "signin" && (
                            <button type="button" onClick={() => go("forgot")} className="text-[12px] text-white/45 transition-colors hover:text-white">
                                {copy.forgot}
                            </button>
                        )}
                    </div>
                    <div className="relative">
                        <input id="login-password" type={reveal ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} disabled={!LOGIN_OPEN || done} className={`${field} !pr-16`} />
                        <button type="button" onClick={() => setReveal((v) => !v)} aria-label={reveal ? "Hide password" : "Show password"} aria-pressed={reveal} className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 rounded px-1.5 py-1 text-[11px] font-medium uppercase tracking-wider text-white/40 transition-colors hover:text-white">
                            {reveal ? "Hide" : "Show"}
                        </button>
                    </div>
                    {mode === "signup" && <p className="mt-2 text-[11.5px] text-white/35">{copy.short}</p>}
                </div>
            )}
            {mode === "signup" && (
                <div className="space-y-3 pt-1">
                    <label className="flex cursor-pointer gap-3 text-[12.5px] leading-relaxed text-white/65">
                        <input type="checkbox" required checked={terms} onChange={(e) => setTerms(e.target.checked)} className={box} />
                        <span>
                            I agree to the{" "}
                            <Link href="/terms-of-service" target="_blank" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                                Terms of Use
                            </Link>{" "}
                            and acknowledge that I have read the{" "}
                            <Link href="/privacy-policy" target="_blank" className="text-white underline decoration-white/30 underline-offset-2 hover:decoration-white">
                                Privacy Policy
                            </Link>
                            .
                        </span>
                    </label>
                    <label className="flex cursor-pointer gap-3 text-[12.5px] leading-relaxed text-white/50">
                        <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className={box} />
                        <span>
                            Send me product updates, trading insights, tips and exclusive offers from Alture &amp; Co. <span className="text-white/30">Optional.</span>
                        </span>
                    </label>
                </div>
            )}
            {error && (
                <p role="alert" className="border-l-2 border-[#E955A8] pl-3 text-[13px] leading-relaxed text-[#E955A8]">
                    {error}
                </p>
            )}
            {notice && (
                <p role="status" className="border-l-2 border-[#4DD0E1] pl-3 text-[13px] leading-relaxed text-white/80">
                    {notice}
                </p>
            )}
            {/* Access has not begun: said to screen readers, and the button stays off. */}
            {!LOGIN_OPEN && <p className="sr-only">{loginPage.closed}</p>}
            <button type="submit" disabled={!LOGIN_OPEN || loading || done || (mode === "signup" && !terms)} aria-busy={loading} className={`relative flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-md text-[14px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DD0E1] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${done ? "bg-[#4DD0E1]/15 text-[#4DD0E1]" : "bg-[#4DD0E1] text-black hover:bg-[#6fdbe9] disabled:cursor-not-allowed disabled:bg-white/[0.07] disabled:text-white/35"}`}>
                {done ? "Signed in · opening your workspace" : loading ? button[1] : button[0]}
                {/* While waiting: a thin line runs along the bottom of the button. Nothing spins. */}
                {loading && <span aria-hidden="true" className="auth-wait absolute inset-x-0 bottom-0 h-[2px] bg-black/50" />}
            </button>
            {LOGIN_OPEN && mode !== "reset" && !done && (
                <p className="text-center text-[13px] text-white/45">
                    {mode === "signin" ? copy.noAccount : copy.haveAccount}{" "}
                    <button type="button" onClick={() => go(mode === "signin" ? "signup" : "signin")} className="font-medium text-white transition-colors hover:text-[#4DD0E1]">
                        {mode === "signin" ? copy.signUp : copy.signIn}
                    </button>
                </p>
            )}
            {LOGIN_OPEN && mode === "forgot" && (
                <p className="text-center text-[13px]">
                    <button type="button" onClick={() => go("signin")} className="text-white/45 transition-colors hover:text-white">
                        ← {copy.signIn}
                    </button>
                </p>
            )}
        </form>
    );
    const heading = mode === "signup" ? copy.create : mode === "forgot" ? copy.forgot : mode === "reset" ? copy.newPassword : loginPage.title;

    // One focused column: the mark, the heading, the form. Nothing else competes with it.
    return (
        <section className="bg-black min-h-[100dvh] !py-0">
            <div className="mx-auto flex min-h-[100dvh] w-full max-w-[420px] flex-col justify-center px-5 pb-16 pt-28">
                <div className="text-center">
                    <span className="inline-flex items-center gap-3 font-logo text-[34px] leading-none text-white">
                        <LockMark className="h-[0.95em] w-[0.95em]" weight={1} />
                        <span>
                            <span className="font-extralight">Alture</span>
                            <span className="font-normal">Lock</span>
                        </span>
                    </span>
                    {/* Signing in, the logo is the heading. Other steps (create, forgot, reset) say what they are. */}
                    {mode === "signin" ? <h1 className="sr-only">{heading}</h1> : <h1 className="!mt-8 !text-[24px] !font-light !leading-tight !tracking-tight text-white">{heading}</h1>}
                </div>
                <div className="mt-10">{form}</div>
            </div>
            <style>{`@keyframes auth-wait{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}.auth-wait{animation:auth-wait 1.1s cubic-bezier(.4,0,.2,1) infinite}@media (prefers-reduced-motion: reduce){.auth-wait{animation:none}}`}</style>
        </section>
    );
};
export default AltureLockLoginPage;
