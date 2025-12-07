import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
const dmsans = DM_Sans({ subsets: ["latin"] });
import { AppContextProvider } from "../context-api/PropertyContext";
import { NextAuthProvider } from "./components/auth/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${dmsans.className}`} suppressHydrationWarning={true}>
        <NextAuthProvider>
          <AppContextProvider>
            <ThemeProvider
              attribute="class"
              enableSystem={false}
              defaultTheme="dark"
            >
              {children}
            </ThemeProvider>
          </AppContextProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}