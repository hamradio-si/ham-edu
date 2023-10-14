import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div
        className="hero min-h-[500px]"
        style={{
          backgroundImage: 'url(/ef8r.jpg)',
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content py-10 text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Pozdravljen</h1>
            <p className="mb-5">
              Dobrodošel na Radioamaterskem Izobraževalnem Portalu Zveze
              Radioamaterjev Slovenije. Na tem portalu lahko najdeš vsebine, ki
              pomagajo pri pripravi na radioamaterski izpit ali pa samo želiš
              izvedeti kaj več o radioamaterstvu.
            </p>
            <div className="flex justify-center gap-3">
              <button className="btn btn-primary">
                Priprava na radioamaterski izpit
              </button>
              <button className="btn btn-primary">Brskaj vsebine</button>
            </div>
          </div>
        </div>
      </div>

      <div className="section container prose">
        <h2>Pomoč pri vsebini</h2>

        <p>
          Vsebina spletne strani je še v pripravi, zato je zaželeno, da pomagate
          pri njenem nastajanju. Če želite pomagati pri nastajanju vsebine, nas
          kontaktirajte na podstrani{' '}
          <Link href="/kontakt" className="link">
            Kontakt
          </Link>
          .
        </p>
      </div>
    </>
  );
}
