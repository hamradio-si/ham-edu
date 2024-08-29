import Link from 'next/link';

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
        <Link href="/tecaji" className="link-hover link">
          Tečaji
        </Link>
        <Link href="/vsebine" className="link-hover link">
          Vsebine
        </Link>
        <Link href="/izpit" className="link-hover link">
          Radioamaterski izpit
        </Link>
        <Link href="/vaje" className="link-hover link">
          Vaja za izpit
        </Link>
        <Link href="/kontakt" className="link-hover link">
          Kontakt
        </Link>
      </nav>
      <nav>
        <header className="footer-title">Zunanje povezave</header>
        <Link href="https://www.hamradio.si/" className="link-hover link">
          Zveza Radioamaterjev Slovenije
        </Link>
        <Link
          target="_blank"
          href="https://forum.hamradio.si/"
          className="link-hover link"
        >
          S50LEA Forum
        </Link>
        <Link href="https://www.iaru-r1.org/" className="link-hover link">
          Spletna stran IARU R1
        </Link>
      </nav>
    </footer>
  );
}
