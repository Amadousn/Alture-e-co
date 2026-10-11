import { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./i18n/language-context";
// Both carry Cyrillic so the Russian site renders in the same typefaces.
const sans = Geist({ subsets: ["latin", "cyrillic"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono" });
// Wordmark only, which is always Latin.
const logo = Outfit({ subsets: ["latin"], variable: "--font-logo" });
// import { AppContextProvider } from "../context-api/PropertyContext";
// import { NextAuthProvider } from "./components/auth/NextAuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.altureandco.com"),
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/images/logo/alture-icon-512.png?v=2",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${sans.variable} ${mono.variable} ${logo.variable} font-sans`} suppressHydrationWarning={true}>
        <div className="ambient-glow" />
        {/* <NextAuthProvider> */}
          {/* <AppContextProvider> */}
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="dark"
            >
              <LanguageProvider>
                {children}
              </LanguageProvider>
            </ThemeProvider>
          {/* </AppContextProvider> */}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}