import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer bg-base-200 p-10 text-base-content">
      <aside>
        <Link
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
        </p>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <Link href="#" className="link-hover link">
          Branding
        </Link>
        <Link href="#" className="link-hover link">
          Design
        </Link>
        <Link href="#" className="link-hover link">
          Marketing
        </Link>
        <Link href="#" className="link-hover link">
          Advertisement
        </Link>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <Link href="#" className="link-hover link">
          About us
        </Link>
        <Link href="#" className="link-hover link">
          Contact
        </Link>
        <Link href="#" className="link-hover link">
          Jobs
        </Link>
        <Link href="#" className="link-hover link">
          Press kit
        </Link>
      </nav>
    </footer>
  );
}
