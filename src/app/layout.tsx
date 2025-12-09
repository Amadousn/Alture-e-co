import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
const dmsans = DM_Sans({ subsets: ["latin"] });
import NextTopLoader from 'nextjs-toploader';
import { AppContextProvider } from "../context-api/PropertyContext";
// import AuthProvider from "./components/auth/SessionProvider"; // Temporarily disabled
import Footer from "./components/layout/footer";
import ScrollToTop from "./components/scroll-to-top";
import Header from "./components/layout/header";
import AosInit from "./components/AosInit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${dmsans.className}`} suppressHydrationWarning>
        {/* <AuthProvider> - Temporarily disabled */}
        <AppContextProvider>
          <AosInit />
          <ThemeProvider
            attribute="class"
            enableSystem={false}
            defaultTheme="dark"
          >
            <Header />
            <NextTopLoader />
            {children}
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </AppContextProvider>
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
