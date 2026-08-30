import Aoscompo from "@/utils/aos";
import NextTopLoader from 'nextjs-toploader';
import Footer from "../components/layout/footer";
import ScrollToTop from "../components/scroll-to-top";
import Header from "../components/layout/header";
import HashScrollFix from "../components/hash-scroll-fix";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Aoscompo>
      <Header />
      <NextTopLoader />
      {children}
      <Footer />
      <ScrollToTop />
      <HashScrollFix />
    </Aoscompo>
  );
}
