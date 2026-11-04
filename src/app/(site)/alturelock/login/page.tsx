"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import AltureLockLogo, { LockMark } from "@/app/components/altur/workspace/alturelock-logo";
import Ribbon from "@/app/components/altur/alture-lock/ribbon";
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
    // Temporary: lets the three candidate designs be compared with ?style=a, b or c.
    const [style, setStyle] = useState("a");
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setStyle(params.get("style") ?? "a");
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

    const field = "!w-full !rounded-none !border-0 !border-b !border-white/25 !bg-transparent !px-0 !py-3 !text-base !text-white placeholder:!text-white/30 focus:!border-white focus:!outline-none focus:!ring-0 disabled:!opacity-40 disabled:!cursor-not-allowed";
    const form = (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6 text-left">
            {needsEmail && (
                <div>
                    <label htmlFor="login-email" className="block text-[11px] uppercase tracking-[0.14em] text-white/45">
                        {copy.email}
                    </label>
                    <input id="login-email" type="email" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="email" disabled={!LOGIN_OPEN} className={field} />
                </div>
            )}
            {needsPassword && (
                <div>
                    <label htmlFor="login-password" className="block text-[11px] uppercase tracking-[0.14em] text-white/45">
                        {mode === "reset" ? copy.newPassword : alturelockLogin.passwordLabel}
                    </label>
                    <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "signin" ? "current-password" : "new-password"} disabled={!LOGIN_OPEN} className={field} />
                </div>
            )}
            {error && (
                <p role="alert" className="text-sm text-[#E5484D]">
                    {error}
                </p>
            )}
            {notice && <p role="status" className="text-sm text-white/80">{notice}</p>}
            {/* Access has not begun. The page stays pure brand, so this is said to screen readers only. */}
            {!LOGIN_OPEN && <p className="sr-only">{loginPage.closed}</p>}
            <button type="submit" disabled={!LOGIN_OPEN || loading || (needsEmail && !username) || (needsPassword && !password)} className="group flex w-full items-center justify-center gap-3 rounded-sm bg-white py-3.5 text-sm font-semibold text-black hover:bg-[#e4e4e8] transition-colors lit disabled:opacity-30 disabled:shadow-none">
                {loading ? button[1] : button[0]}
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
            {LOGIN_OPEN && mode !== "reset" && (
                <div className="space-y-2 text-center text-xs text-white/45">
                    {mode === "signin" && (
                        <p>
                            <button type="button" onClick={() => go("forgot")} className="hover:text-white">{copy.forgot}</button>
                        </p>
                    )}
                    <p>
                        {mode === "signin" ? copy.noAccount : copy.haveAccount}{" "}
                        <button type="button" onClick={() => go(mode === "signin" ? "signup" : "signin")} className="border-b border-white/25 text-white/80 hover:border-white hover:text-white">
                            {mode === "signin" ? copy.signUp : copy.signIn}
                        </button>
                    </p>
                </div>
            )}
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

    // Brand only: the ribbon and the wordmark, nothing else.
    if (style === "brand")
        return (
            <section className="bg-black min-h-[100dvh] flex flex-col items-center justify-center px-6 !pt-24 !pb-24 text-center">
                <h1 className="sr-only">AltureLock</h1>
                <Ribbon wide className="h-[40vh] min-h-[200px] max-h-[440px] max-w-6xl" />
                <div className="mt-8">{wordmark}</div>
            </section>
        );

    // A: the brand and the form, with nothing written beside them.
    return (
        <section className="bg-black min-h-[100dvh] flex flex-col items-center justify-center px-6 !pt-24 !pb-20 text-center">
            <Ribbon wide className="h-[30vh] min-h-[170px] max-h-[340px] max-w-5xl" />
            <h1 className="sr-only">Log in to AltureLock</h1>
            <div className="mt-6 mb-12">{wordmark}</div>
            {form}
        </section>
    );
};

export default AltureLockLoginPage;
