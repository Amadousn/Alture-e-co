"use client";

import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex flex-col group">
      {/* Logo Text */}
      <span className="font-logo text-2xl font-extralight text-black dark:text-white leading-none whitespace-nowrap">
        Alture{' '}
        <span className="accent-light">
          &
        </span>{' '}
        Co.
      </span>
    </Link>
  );
};

export default Logo;
