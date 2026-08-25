import { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
const dmsans = DM_Sans({ subsets: ["latin"] });
// import { AppContextProvider } from "../context-api/PropertyContext";
// import { NextAuthProvider } from "./components/auth/NextAuthProvider";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        url: "/images/logo/alture-icon-512.png",
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
      <body className={`${dmsans.className}`} suppressHydrationWarning={true}>
        <div className="ambient-grid" />
        <div className="ambient-glow" />
        {/* <NextAuthProvider> */}
          {/* <AppContextProvider> */}
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="dark"
            >
              {children}
            </ThemeProvider>
          {/* </AppContextProvider> */}
        {/* </NextAuthProvider> */}
      </body>
    </html>
  );
}