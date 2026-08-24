import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 | Alture & Co.",
};

const ErrorPage = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-black overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#D4AF37 1px, transparent 1px), linear-gradient(90deg, #D4AF37 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>

      <div className="container mx-auto max-w-xl relative z-10 px-4 md:px-6 text-center">
        <p className="text-primary text-sm font-mono tracking-widest mb-4">404</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 tracking-normal leading-snug">
          Page not found
        </h1>
        <p className="text-gray-400 text-sm md:text-base font-light leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 rounded-sm"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
