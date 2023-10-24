import { strapiFunctions, strapiUrl } from '@/api';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from './search';
import { CategoryFilter } from './category-filter';

export const metadata: Metadata = {
  title: 'Vsebine',
  description: 'Poučne vsebine',
};

export default async function VsebinePage({
  searchParams,
}: {
  searchParams: { c?: string; q?: string };
}) {
  const filter = {
    category: searchParams.c ? +searchParams.c : undefined,
    search: searchParams.q,
  };

  const [articles, categories] = await Promise.all([
    strapiFunctions.getArticles(filter),
    strapiFunctions.getCategories(),
  ]);

  return (
    <div className="section container">
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

          {articles.map(({ attributes: a }) => (
            <Link
              key={a.slug}
              href={`/v/${a.slug}`}
              className="flex w-full flex-col gap-8 overflow-clip border-b border-base-200 px-6 py-8 md:flex-row lg:last:border-0"
            >
              <div className="flex flex-1 flex-col gap-2">
                <div className="card-title">{a.title}</div>

                {a.subtitle && <div className="card-text">{a.subtitle}</div>}
                <div className="flex items-center gap-2">
                  {a.category?.data && (
                    <span className="badge badge-ghost">
                      {a.category.data?.attributes.name}
                    </span>
                  )}
                  {a.in_exam && (
                    <span className="badge badge-primary">V izpitu</span>
                  )}
                </div>
              </div>
              {a.cover?.data && (
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

        <div className="border-base-200 lg:w-1/3 lg:border-l lg:pl-8">
          <CategoryFilter categories={categories} />
        </div>
      </div>
    </div>
  );
}
