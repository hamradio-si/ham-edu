import { strapiFunctions } from '@/api';
import Link from 'next/link';

export default async function VsebinePage() {
  const articles = await strapiFunctions.getArticles();

  return (
    <div className="section container">
      <div className="prose mb-8">
        <h1>Vsebine</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map(({ attributes: a }) => (
          <Link
            key={a.slug}
            href={`/v/${a.slug}`}
            className="card border border-base-300"
          >
            <div className="card-body">
              <div className="card-title">{a.title}</div>
              {a.subtitle && <div className="card-text">{a.subtitle}</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
