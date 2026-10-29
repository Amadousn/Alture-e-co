"use client";

import { useCallback, useEffect, useState } from "react";

// Light or dark, for the AltureLock pages that offer both. Dark is the default;
// the choice is kept in this browser and shared by every open tab.
export type Theme = "light" | "dark";
const KEY = "alturelock:theme";
const EVENT = "alturelock:theme-change";

export function useTheme(): [Theme, (theme: Theme) => void] {
    const [theme, setTheme] = useState<Theme>("dark");
    useEffect(() => {
        const read = () => {
            try {
                setTheme(window.localStorage.getItem(KEY) === "light" ? "light" : "dark");
            } catch {
                // storage refused: stay on the default
            }
        };
        read();
        window.addEventListener(EVENT, read);
        window.addEventListener("storage", read);
        return () => {
            window.removeEventListener(EVENT, read);
            window.removeEventListener("storage", read);
        };
    }, []);
    const choose = useCallback((next: Theme) => {
        setTheme(next);
        try {
            window.localStorage.setItem(KEY, next);
            window.dispatchEvent(new Event(EVENT));
        } catch {
            // the choice lasts for this visit
        }
    }, []);
    return [theme, choose];
}
