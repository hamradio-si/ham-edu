import { strapiFunctions } from '@/api';
import { MDX } from '@/components/mdx';
import { Metadata } from 'next';
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
      <div className="mb-8">
        <h1 className="mb-2">{article.title}</h1>

        {article.subtitle && <p className="my-2">{article.subtitle}</p>}
        <div className="flex gap-2">
          {article.in_exam && (
            <span className="badge badge-primary">V izpitu</span>
          )}
        </div>
      </div>

      <MDX source={article.content} />
    </article>
  );
}
