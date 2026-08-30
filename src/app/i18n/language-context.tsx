"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Language, DEFAULT_LANGUAGE, translations } from "./translations";

type LanguageContextValue = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: typeof translations[Language];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "alture-language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
        if (stored && translations[stored]) {
            setLanguageState(stored);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch {
            // ignore storage errors (private browsing, etc.)
        }
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
    return ctx;
};
