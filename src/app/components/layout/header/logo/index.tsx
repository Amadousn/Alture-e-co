import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex flex-col group">
      {/* Logo Text */}
      <span className="text-2xl font-bold text-black dark:text-white leading-none">
        Alture <span className="text-primary">&</span> Co.
      </span>
      <span className="text-[9px] text-gray-600 dark:text-gray-400 tracking-[0.15em] uppercase mt-1">
        Strategic Advisory
      </span>
    </Link>
  );
};

export default Logo;