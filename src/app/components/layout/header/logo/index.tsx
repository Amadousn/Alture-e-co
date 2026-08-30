"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Logo: React.FC = () => {
  const pathname = usePathname();
  const isEducation = pathname?.startsWith('/education');

  return (
    <Link href="/" className="flex flex-col group">
      {/* Logo Text */}
      <span className="text-2xl font-bold text-black dark:text-white leading-none">
        Alture{' '}
        <span className={isEducation ? '' : 'text-primary'} style={isEducation ? { color: '#E879F9' } : undefined}>
          &
        </span>{' '}
        Co.
      </span>
    </Link>
  );
};

export default Logo;
