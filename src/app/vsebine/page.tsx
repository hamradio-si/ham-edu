import { strapiFunctions, strapiUrl } from '@/api';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vsebine',
  description: 'Poučne vsebine',
};

const kategorije = [
  'Predpisi',
  'Operaterstvo',
  'Elektrotehnika',
  'Signali in modulacija',
  'Oddajniki',
  'Sprejemniki',
  'Valovanje',
  'Antene in napajanje anten',
  'Motnje',
  'Meritve',
];

export default async function VsebinePage() {
  const articles = await strapiFunctions.getArticles();

  return (
    <div className="section container">
      <div className="prose mb-8">
        <h1>Vsebine</h1>
      </div>

      <div className="gap-8 lg:flex">
        <div className="flex-1">
          <div>
            <input
              type="search"
              placeholder="Išči"
              className="input input-bordered w-full max-w-lg"
            />
          </div>

          {articles.map(({ attributes: a }) => (
            <Link
              key={a.slug}
              href={`/v/${a.slug}`}
              className="flex w-full flex-col gap-8 overflow-clip border-b border-base-200 px-6 py-8 last:border-0 md:flex-row"
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="card-title">{a.title}</div>

                {a.subtitle && <div className="card-text">{a.subtitle}</div>}
                <div className="flex items-center gap-2">
                  <span className="badge badge-ghost">{a.category}</span>
                  {a.in_exam && (
                    <span className="badge badge-primary">V izpitu</span>
                  )}
                </div>
              </div>
              {a.cover.data && (
                <figure>
                  <Image
                    src={`${strapiUrl}${a.cover.data.attributes.url}`}
                    alt={a.cover.data.attributes.alternativeText}
                    height={500}
                    width={500}
                    style={{
                      // height: '150px',
                      // width: '250px',
                      objectFit: 'cover',
                    }}
                    className="h-40 w-full rounded md:w-64"
                  />
                </figure>
              )}
            </Link>
          ))}
        </div>

        <div className="lg:w-1/3">
          <h3 className="mb-4 text-xl font-bold">Priporočene kategorije</h3>

          <div className="flex flex-wrap gap-2">
            {kategorije.map((k) => (
              <Link
                key={k}
                href={`?cat=${k}`}
                className="badge badge-ghost px-4 py-4"
              >
                {k}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
