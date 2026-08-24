import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex flex-col group">
      {/* Logo Text */}
      <span className="text-2xl font-bold text-black dark:text-white leading-none">
        Alture <span className="text-primary">&</span> Co.
      </span>
    </Link>
  );
};

export default Logo;
