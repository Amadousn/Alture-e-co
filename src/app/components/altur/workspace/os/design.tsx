// The AltureLock design system, taken from the Journal: surfaces, ink, the
// teal gain and pink loss, borders, radii and shadows for both themes. Pages
// spread THEMES[theme] on their root and draw their cards with Module.

export const THEMES = {
    light: { "--j-bg": "#f3f4f7", "--j-s1": "#ffffff", "--j-s2": "#eef0f4", "--j-s3": "#e5e8ee", "--j-ink": "#0c0d10", "--j-mu": "#62656e", "--j-fa": "#9a9ea8", "--j-line": "#e2e4ea", "--j-up": "#0d8a7b", "--j-dn": "#c23a77", "--j-upbg": "#e1f2ef", "--j-dnbg": "#f7e4ec", "--j-upsoft": "#9fd3cc", "--j-shadow": "0 1px 2px rgba(23,24,26,0.04), 0 14px 32px -20px rgba(23,24,26,0.22)", "--j-tip": "#0c0d10", "--j-tipink": "#ffffff", "--j-active": "#0c0d10", "--j-activeink": "#ffffff", "--font-mono": "var(--font-logo)" },
    dark: { "--j-bg": "#040306", "--j-s1": "#0b090e", "--j-s2": "#151119", "--j-s3": "#1d1822", "--j-ink": "#ededee", "--j-mu": "#9a93a3", "--j-fa": "#625b6b", "--j-line": "#221c28", "--j-up": "#4DD0E1", "--j-dn": "#E955A8", "--j-upbg": "rgba(77,208,225,0.13)", "--j-dnbg": "rgba(233,85,168,0.13)", "--j-upsoft": "rgba(77,208,225,0.4)", "--j-border": "rgba(255, 255, 255,0.16)", "--j-shadow": "0 0 40px -18px rgba(255, 255, 255,0.35)", "--j-radius": "10px", "--j-glow": "radial-gradient(70% 40% at 15% 0%, rgba(255, 255, 255,0.16), transparent 70%)", "--font-mono": "var(--font-logo)", "--j-tip": "#f2f2f3", "--j-tipink": "#111214", "--j-active": "#f2f2f3", "--j-activeink": "#111214" },
} as const;

export const Module = ({ children, className = "", label }: { children: React.ReactNode; className?: string; label?: string }) => (
    <section aria-label={label} className={`rounded-[var(--j-radius,16px)] border border-[var(--j-border,transparent)] bg-[var(--j-s1)] shadow-[var(--j-shadow)] ${className}`}>
        {children}
    </section>
);
