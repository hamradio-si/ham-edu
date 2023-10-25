'use client';

import { faClose, faBars } from '@fortawesome/free-solid-svg-icons';
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
        title: 'Zbirka izpitnih vprašanj',
        href: '/izpit/zbirka',
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

      <div className="hidden items-center gap-1 lg:flex">
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

      <div className="relative flex lg:hidden">
        <BurgerMenu />
      </div>
    </header>
  );
}

function BurgerMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className={`swap swap-rotate z-50 h-full ${
          isOpen ? 'swap-active' : ''
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} className="swap-off h-6 w-6" />
        <FontAwesomeIcon icon={faClose} className="swap-on h-6 w-6" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/50 ${isOpen ? '' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`absolute -right-5 top-full z-50 pt-5 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <div className="flex w-64 flex-col gap-1 rounded-xl bg-base-100 p-2 text-base-content shadow-md">
          {links.map(({ href, sub, title }) =>
            sub ? (
              <div key={title}>
                <div
                  className={`btn btn-ghost btn-sm h-auto w-full justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                    href === pathname ? 'btn-active' : ''
                  }`}
                >
                  {title}
                </div>
                {sub && (
                  <div className="pl-5">
                    <ul className="mt-1 w-full border-l border-base-300 pl-2">
                      {sub.map(({ href, title }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={`btn btn-ghost btn-sm h-auto w-full justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                              href === pathname ? 'btn-active' : ''
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                className={`btn btn-ghost btn-sm h-auto w-full justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                  href === pathname ? 'btn-active' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {title}
              </Link>
            ),
          )}
        </div>
      </div>
    </>
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
  const [isOpen, setIsOpen] = useState(0);

  return (
    <div key={title} onMouseLeave={() => setIsOpen(0)} className="relative">
      <button
        onMouseOver={() => setIsOpen(isOpen | 1)}
        onClick={() => setIsOpen(isOpen ^ 2)}
        className="nav-btn"
      >
        {title}
      </button>

      <div
        onClick={() => setIsOpen(0)}
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
