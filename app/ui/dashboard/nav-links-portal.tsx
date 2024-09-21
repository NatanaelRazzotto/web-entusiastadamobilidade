'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';



// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  // {
  //   name: 'Busca por Intinerários',
  //   href: '/',
  //   icon: DocumentDuplicateIcon,
  // },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
            {
              ' text-orange-700': pathname === link.href,
            },
          )}
        >
          <LinkIcon className="w-6" />
          <p className="hidden md:block">{link.name}</p>
          
        </Link>
        
        );
      })}
    </>
  );
}
