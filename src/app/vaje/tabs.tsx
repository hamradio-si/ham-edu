'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    href: '/vaje',
    label: 'Vaja vprašanj',
  },
  {
    href: '/vaje/izpit',
    label: 'Simulator izpita',
  },
];

export function Tabs() {
  const pathname = usePathname();

  return (
    <div className="tabs-boxed tabs mb-6">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`tab flex-1 ${pathname === href ? 'tab-active' : ''}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
