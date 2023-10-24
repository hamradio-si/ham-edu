'use client';

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  {
    title: 'Vsebine',
    href: '/vsebine',
  },
  {
    title: 'Izpit in licenca',
    sub: [
      {
        title: 'Radioamaterski izpit',
        href: '/izpit',
      },
      {
        title: 'Primerjava razredov radioamaterjev',
        href: '/izpit/razredi',
      },
      {
        title: 'Radioamatersko dovoljenje (licenca)',
        href: '/licenca',
      },
      {
        title: 'Izbira klicnega znaka',
        href: '/licenca/klicni-znak',
      },
    ],
  },
  {
    title: 'Vaje',
    href: '/vaje',
  },
  {
    title: 'Kontakt',
    href: '/kontakt',
  },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between bg-secondary px-6 py-4 text-white">
      <Link href="/" className="text-xl font-semibold">
        Radioamaterski izobraževalni portal
      </Link>

      <div className="hidden items-center gap-1 sm:flex">
        {links.map(({ href, sub, title }) =>
          sub ? (
            <Dropdown key={title} links={sub} title={title} />
          ) : (
            <Link
              href={href}
              key={href}
              className={`nav-btn ${pathname === href ? 'nav-btn-active' : ''}`}
            >
              {title}
            </Link>
          ),
        )}
      </div>

      <div className="sm:hidden">
        <FontAwesomeIcon icon={faBars} />
      </div>
    </header>
  );
}

function Dropdown({
  links,
  title,
}: {
  links: { title: string; href: string }[];
  title: string;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={title} onMouseLeave={() => setIsOpen(false)} className="relative">
      <button
        onMouseOver={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="nav-btn"
      >
        {title}
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`absolute right-0 top-full z-[1] pt-4 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="flex w-60 flex-col gap-1 rounded-xl bg-base-100 p-2 text-base-content shadow-md">
          {links.map(({ href, title }) => (
            <Link
              href={href}
              key={href}
              className={`btn btn-ghost btn-sm h-auto justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                href === pathname ? 'btn-active' : ''
              }`}
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
