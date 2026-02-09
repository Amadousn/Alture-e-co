import { useState } from 'react';
import Link from 'next/link';
import { HeaderItem } from '../../../../types/layout/menu';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const MobileHeaderLink: React.FC<{ item: HeaderItem; onClick?: () => void }> = ({ item, onClick }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggle = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const router = useRouter();

  const handlenav = () => {
    if (onClick) onClick();
    router.push(item.href)
  }

  const path = usePathname();

  return (
    <div className="relative w-full" suppressHydrationWarning={true}>
      <button
        onClick={item.submenu ? handleToggle : handlenav}
        className={`group flex items-center justify-between w-full py-4 px-2 border-b border-white/5 text-left focus:outline-none transition-all duration-300 ${path === item.href ? 'text-[#D4AF37]' : 'text-gray-400 hover:text-white'}`}
      >
        <span className={`text-sm tracking-[0.15em] uppercase font-light group-hover:pl-2 transition-all duration-300 ${path === item.href ? 'font-medium' : ''}`}>
          {item.label}
        </span>
        {item.submenu && (
          <Icon icon="ph:caret-down-thin" className={`w-4 h-4 transition-transform duration-300 ${submenuOpen ? 'rotate-180 text-[#D4AF37]' : ''}`} />
        )}
      </button>
      {submenuOpen && item.submenu && (
        <div className="bg-white/5 py-2 px-4 w-full mt-2 rounded-sm border-l border-[#D4AF37]/30">
          {item.submenu.map((subItem, index) => (
            <Link 
              key={index} 
              href={subItem.href} 
              onClick={onClick}
              className={`block py-3 px-2 text-xs uppercase tracking-wider transition-colors ${subItem.href === path ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
