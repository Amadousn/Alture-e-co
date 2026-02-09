'use client'
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37] bg-black/60 backdrop-blur-md text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 ease-out hover:bg-[#D4AF37] hover:text-black hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)]"
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
