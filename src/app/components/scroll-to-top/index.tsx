'use client'
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const path = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // The terminal is an application with its own panes: no floating button over its figures.
  if (path === "/alturelock/workspace" || path === "/alturelock/demo" || path === "/education/dashboard" || path === "/education/introduction") return null;

  return (
    <div className="fixed bottom-20 right-4 lg:bottom-8 lg:right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#FFFFFF] bg-black/60 backdrop-blur-md text-[#FFFFFF] shadow-[0_0_20px_rgba(255, 255, 255,0.2)] transition-all duration-500 ease-out hover:bg-[#FFFFFF] hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(255, 255, 255,0.6)]"
        >
          <Icon
            icon="ph:arrow-up-thin"
            className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1"
          />
        </button>
      )}
    </div>
  );
}
