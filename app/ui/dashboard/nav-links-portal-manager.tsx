'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  ShoppingBagIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.


export default function NavLinksManager({session}) {
  const pathname = usePathname();

  const links = [
    { name: 'Aquisiçao de Fotos', href: '/clientspace/order/'+session.user.id, icon: ShoppingBagIcon },
    {
      name: 'Espaco do Gestor',
      href: '/managerspace/drafts',
      icon: BriefcaseIcon,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
          key={link.name}
          href={link.href}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-orange-100 p-3 text-sm font-medium hover:text-orange-700 hover:bg-orange-500 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-orange-100 text-orange-700': pathname === link.href,
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
