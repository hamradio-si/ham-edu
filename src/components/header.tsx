'use client';

import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    title: 'Vsebine',
    href: '/vsebine',
  },
  {
    title: 'Radioamaterski izpit',
    href: '/izpit',
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
    <header className="navbar bg-base-200">
      <div className="navbar-start pl-3">
        <Link href="/" className="text-xl font-semibold">
          <h1>Radioamaterski Izobraževalni Portal</h1>
        </Link>
      </div>
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {links.map(({ href, title }) => (
            <li key={title}>
              <Link
                href={href}
                className={pathname == href ? 'btn-active' : ''}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
          >
            {links.map(({ title, href }) => (
              <li key={title}>
                <Link
                  href={href}
                  className={pathname == href ? 'btn-active' : ''}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
