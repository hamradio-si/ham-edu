import { strapiFunctions, strapiUrl } from '@/api';
import { Logo } from '@/assets';
import { Hero } from '@/components/hero';
import Image from 'next/image';
import Link from 'next/link';

export default async function Home() {
  const { data: vsebine } = await strapiFunctions.getArticles();

  return (
    <>
      <Hero image="/ef8r.jpg" className="min-h-[500px]">
        <h1 className="mb-5 text-3xl font-bold md:text-4xl">Pozdravljen</h1>
        <p className="mb-5">
          Dobrodošel na Radioamaterskem izobraževalnem portalu Zveze
          Radioamaterjev Slovenije. Na tem portalu lahko najdeš vsebine, ki
          pomagajo pri pripravi na radioamaterski izpit ali pa samo želiš
          izvedeti kaj več o radioamaterstvu.
        </p>
        <div className="flex gap-3">
          <Link className="btn btn-primary" href="/tecaji">
            Tečaji
          </Link>
          <Link className="btn btn-primary" href="/vsebine">
            Ostale vsebine
          </Link>
        </div>
      </Hero>

      <div className="section container flex flex-col gap-8">
        <div className="prose">
          <h2>Najnovejše vsebine</h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {vsebine.slice(0, 6).map(({ attributes: a }) => (
            <Link
              key={a.slug}
              href={`/v/${a.slug}`}
              className="flex-1 transition-all"
            >
              <figure>
                {a.cover.data ? (
                  <Image
                    src={`${strapiUrl}${a.cover.data.attributes.url}`}
                    alt={a.cover.data.attributes.alternativeText}
                    height={600}
                    width={600}
                    style={{
                      maxHeight: '128px',
                      objectFit: 'cover',
                    }}
                    className="rounded-lg"
                  />
                ) : (
                  <Logo className="max-h-32 w-full rounded-lg bg-base-200 p-4 text-base-300" />
                )}
              </figure>
              <div className="card-body px-2 py-4">
                <div className="card-title">{a.title}</div>

                {a.subtitle && (
                  <div className="card-text opacity-80">{a.subtitle}</div>
                )}
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
