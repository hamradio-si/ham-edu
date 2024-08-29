'use client';

import { Logo } from '@/assets';
import { faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  {
    title: 'Tečaji',
    href: '/tecaji',
  },
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
  let pathname = usePathname();
  if (pathname?.startsWith('/tecaji/')) pathname = '/tecaji';

  return (
    <header className="flex items-center justify-between bg-neutral px-6 py-4 text-white">
      <Link href="/" className="flex items-center gap-4">
        <Logo className="h-12 w-12" />
        <div className="flex flex-col">
          <div className="text-4xl font-bold text-accent">S5 Edu</div>
          <div>Radioamaterski izobraževalni portal</div>
        </div>
      </Link>

      <nav>
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map(({ href, sub, title }) =>
            sub ? (
              <li key={title}>
                <Dropdown links={sub} title={title} />
              </li>
            ) : (
              <li key={href}>
                <Link
                  href={href}
                  className={`nav-btn ${
                    pathname === href ? 'nav-btn-active' : ''
                  }`}
                >
                  {title}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="relative flex lg:hidden">
          <BurgerMenu />
        </div>
      </nav>
    </header>
  );
}

function BurgerMenu() {
  let pathname = usePathname();
  if (pathname?.startsWith('/tecaji/')) pathname = '/tecaji';

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
        <ul className="flex w-64 flex-col gap-1 rounded-xl bg-base-100 p-2 text-base-content shadow-md">
          {links.map(({ href, sub, title }) =>
            sub ? (
              <li key={title}>
                <div
                  className={`btn btn-ghost btn-sm h-auto w-full justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                    href === pathname ? 'btn-active' : ''
                  }`}
                >
                  {title}
                </div>
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
              </li>
            ) : (
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
            ),
          )}
        </ul>
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
  let pathname = usePathname();
  if (pathname?.startsWith('/tecaji/')) pathname = '/tecaji';

  const [isOpen, setIsOpen] = useState(0);

  return (
    <div key={title} onMouseLeave={() => setIsOpen(0)} className="relative">
      <label
        onMouseOver={() => setIsOpen(isOpen | 1)}
        onClick={() => setIsOpen(isOpen ^ 2)}
        className="nav-btn"
      >
        {title}
      </label>

      <div
        onClick={() => setIsOpen(0)}
        className={`absolute right-0 top-full z-[1] pt-4 ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <ul className="flex w-60 flex-col gap-1 rounded-xl bg-base-100 p-2 text-base-content shadow-md">
          {links.map(({ href, title }) => (
            <li key={href}>
              <Link
                href={href}
                className={`btn btn-ghost btn-sm h-auto w-full justify-start px-4 py-1.5 text-left font-normal normal-case leading-normal ${
                  href === pathname ? 'btn-active' : ''
                }`}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
