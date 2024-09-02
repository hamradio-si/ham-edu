import Link from 'next/link';

const links = [
  {
    title: 'Domov',
    href: '/',
  },
  {
    title: 'Tečaji',
    href: '/tecaji',
  },
  {
    title: 'Vsebine',
    href: '/vsebine',
  },
  {
    title: 'Literatura',
    href: '/literatura',
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

const externalLinks = [
  {
    title: 'Zveza Radioamaterjev Slovenije',
    href: 'https://www.hamradio.si/',
  },
  {
    title: 'S50LEA Forum',
    href: 'https://forum.hamradio.si/',
  },
  {
    title: 'Spletna stran IARU R1',
    href: 'https://www.iaru-r1.org/',
  },
];

export function Footer() {
  return (
    <footer className="footer bg-base-200 p-10 text-base-content">
      <aside>
        <div>
          <div className="text-4xl font-bold text-primary">S5 Edu</div>
          <div>Radioamaterski izobraževalni portal</div>
        </div>
        {/* <Link
          target="_blank"
          className="text-lg font-medium"
          href="https://www.hamradio.si/"
        >
          Zveza Radioamaterjev Slovenije
        </Link>
        <p>
          Bezjakova ulica 151
          <br />
          2341 Limbuš
          <br />
          SLOVENIJA
        </p> */}
      </aside>
      <nav>
        <header className="footer-title">Kazalo</header>
        {links.map(({ title, href }) => (
          <Link key={href} href={href} className="link-hover link">
            {title}
          </Link>
        ))}
      </nav>
      <nav>
        <header className="footer-title">Zunanje povezave</header>
        {externalLinks.map(({ title, href }) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className="link-hover link"
          >
            {title}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
