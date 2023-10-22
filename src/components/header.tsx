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
    <header className="navbar bg-secondary text-white">
      <div className="navbar-start pl-3">
        <Link href="/" className="text-xl font-semibold">
          <h1>Radioamaterski Izobraževalni Portal</h1>
        </Link>
      </div>
      <div className="navbar-end hidden md:flex">
        <ul className="menu menu-horizontal gap-1 px-1">
          {links.map(({ href, title, sub }) => (
            <li key={title}>
              {sub ? (
                <div className="dropdown dropdown-end dropdown-bottom dropdown-hover hover:bg-white/20 [&:hover>label]:text-white">
                  <label tabIndex={0}>{title}</label>
                  <div className="menu dropdown-content p-0 pt-4">
                    <ul
                      tabIndex={0}
                      className="rounded-box z-[1] w-64 bg-base-100 p-2 shadow"
                    >
                      {sub.map(({ title, href }) => (
                        <li key={title} tabIndex={0}>
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
              ) : (
                <Link
                  href={href}
                  className={`hover:bg-white/20 hover:text-white focus:!bg-white/20 focus:!text-white ${
                    pathname == href ? 'bg-white/20' : ''
                  }`}
                >
                  {title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end md:hidden">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn btn-ghost md:hidden">
            <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 text-base-content shadow"
          >
            {links.map(({ title, href, sub }) => (
              <li key={title}>
                {sub ? (
                  <>
                    <label>{title}</label>
                    <ul className="menu">
                      {sub.map(({ title, href }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className={pathname == href ? 'btn-active' : ''}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={href}
                    className={pathname == href ? 'btn-active' : ''}
                  >
                    {title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
