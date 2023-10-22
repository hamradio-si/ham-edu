import { strapiFunctions, strapiUrl } from '@/api';
import { MDX } from '@/components/mdx';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: ArticlePageProps): Promise<Metadata> {
  const article = await strapiFunctions
    .getArticleBySlug(slug)
    .then((a) => a.attributes);

  return {
    title: article.title,
    description: article.subtitle ?? article.title,
    authors: article.author ? { name: article.author } : undefined,
  };
}

export async function generateStaticParams() {
  const articles = await strapiFunctions.getArticles();

  return articles.map((a) => ({ slug: a.attributes.slug }));
}

export default async function ArticlePage({
  params: { slug },
}: ArticlePageProps) {
  const article = (await strapiFunctions.getArticleBySlug(slug))?.attributes;

  if (!article) {
    notFound();
  }

  return (
    <article className="section container prose">
      {article.cover.data && (
        <figure className="rounded-none">
          <Image
            src={`${strapiUrl}${article.cover.data.attributes.url}`}
            alt={article.cover.data.attributes.alternativeText}
            height={1024}
            width={1024}
            style={{
              maxHeight: '300px',
              width: '100%',
              objectFit: 'cover',
            }}
          />
        </figure>
      )}

      <div className="mb-8">
        <h1 className="mb-2">{article.title}</h1>

        {article.subtitle && <p className="my-2">{article.subtitle}</p>}
        <div className="flex items-center gap-2">
          <span className="badge badge-ghost">
            {article.category.data?.attributes.name}
          </span>
          {article.in_exam && (
            <span className="badge badge-primary">V izpitu</span>
          )}
        </div>
      </div>

      <MDX source={article.content} />
    </article>
  );
}
