import { strapiFunctions, strapiUrl } from '@/api';
import { Hero } from '@/components/hero';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const vsebine = await strapiFunctions.getArticles();

  return (
    <>
      <Hero image="/ef8r.jpg" className="min-h-[500px]">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">Pozdravljen</h1>
        <p className="mb-5">
          Dobrodošel na Radioamaterskem Izobraževalnem Portalu Zveze
          Radioamaterjev Slovenije. Na tem portalu lahko najdeš vsebine, ki
          pomagajo pri pripravi na radioamaterski izpit ali pa samo želiš
          izvedeti kaj več o radioamaterstvu.
        </p>
        <button className="btn btn-primary">Vsebine za izpit</button>
      </Hero>

      <div className="section container">
        <div className="alert mx-auto max-w-3xl">
          <FontAwesomeIcon icon={faInfoCircle} className="h-6 w-6 text-info" />
          <div>
            <h3 className="mb-2 font-bold">Pomoč pri vsebini</h3>
            <div>
              Vsebina spletne strani je še v pripravi, zato je zaželeno, da
              pomagate pri njenem nastajanju. Če želite pomagati pri nastajanju
              vsebine, nas kontaktirajte na podstrani{' '}
              <Link href="/kontakt" className="link">
                Kontakt
              </Link>
              .
            </div>
          </div>
        </div>
      </div>

      <div className="section container flex flex-col gap-4">
        <div className="prose">
          <h2>Najnovejše vsebine</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {vsebine.slice(0, 6).map(({ attributes: a }) => (
            <Link
              key={a.slug}
              href={`/v/${a.slug}`}
              className="card flex-1 shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl"
            >
              {a.cover.data && (
                <figure>
                  <Image
                    src={`${strapiUrl}${a.cover.data.attributes.url}`}
                    alt={a.cover.data.attributes.alternativeText}
                    height={600}
                    width={600}
                    style={{
                      // height: '150px',
                      // width: '250px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                  />
                </figure>
              )}
              <div className="card-body">
                <div className="card-title">{a.title}</div>

                {a.subtitle && <div className="card-text">{a.subtitle}</div>}
              </div>
            </Link>
          ))}
        </div>

        <Link href="/vsebine" className="btn btn-primary mx-auto">
          Več vsebin
        </Link>
      </div>
    </>
  );
}
