import { strapiFunctions, strapiUrl } from '@/api';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from './search';
import { PageNumber } from './page-number';
import { Logo } from '@/assets';

export const metadata: Metadata = {
  title: 'Vsebine',
  description: 'Poučne vsebine',
  keywords: ['vsebine', 'poučno', 'znanje'],
  openGraph: {
    title: 'Vsebine',
    description: 'Poučne vsebine',
  },
};

export default async function VsebinePage({
  searchParams,
}: {
  searchParams: { p?: string; q?: string };
}) {
  const page = +(searchParams.p || 1);

  const {
    data: articles,
    meta: { pagination },
  } = await strapiFunctions.getArticles({
    page: +page,
    search: searchParams.q,
  });

  return (
    <div className="section container max-w-screen-md">
      <div className="prose mb-8">
        <h1>Vsebine</h1>
      </div>

      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        <div className="flex-1">
          <Search />

          {articles.length === 0 && (
            <div className="card mt-4 bg-base-200">
              <div className="card-body">
                <h2 className="card-title">Ni rezultatov</h2>
                <p className="card-text">
                  Poizkusite z drugačnim iskalnim nizom.
                </p>
              </div>
            </div>
          )}

          <div>
            {articles.map(({ attributes: a }) => (
              <Link
                key={a.slug}
                href={`/v/${a.slug}`}
                className="flex w-full flex-col-reverse gap-6 overflow-clip border-b border-base-200 px-6 py-8 last:border-0 md:flex-row md:gap-8"
              >
                <div className="flex flex-1 flex-col gap-2">
                  <div className="card-title">{a.title}</div>

                  {a.subtitle && <div className="card-text">{a.subtitle}</div>}
                  <div className="flex items-center gap-2">
                    {/* {a.category?.data && (
                    <span className="badge badge-ghost">
                      {a.category.data?.attributes.name}
                    </span>
                  )} */}
                  </div>
                </div>
                <figure>
                  {a.cover?.data ? (
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
                      className="h-36 w-full rounded md:w-64"
                    />
                  ) : (
                    <Logo className="h-36 w-full rounded bg-base-200 p-4 text-base-300 md:w-64" />
                  )}
                </figure>
              </Link>
            ))}
          </div>

          <PageNumber pagination={pagination} />
        </div>

        {/* <div className="border-base-200 lg:w-1/3 lg:border-l lg:pl-8">
          <CategoryFilter categories={categories} /> 
        </div>*/}
      </div>
    </div>
  );
}
