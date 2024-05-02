import { strapiFunctions, strapiUrl } from '@/api';
import { MDX } from '@/components/mdx';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: ArticlePageProps): Promise<Metadata> {
  const article = (await strapiFunctions.getArticleBySlug(slug))?.attributes;

  if (!article) {
    throw new Error('Article not found');
  }

  const cover = article.cover.data;

  return {
    title: article.title,
    description: article.subtitle,
    authors: article.author ? { name: article.author } : undefined,
    openGraph: {
      title: article.title,
      description: article.subtitle,
      authors: article.author,
      type: 'article',
      images: cover
        ? {
            url: `${strapiUrl}${cover.attributes.url}`,
            alt: cover.attributes.alternativeText,
            height: cover.attributes.height,
            width: cover.attributes.width,
          }
        : undefined,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await strapiFunctions.getAllArticles();

  return articles.map((a) => ({ slug: a.attributes.slug }));
}

export default async function ArticlePage({
  params: { slug },
}: ArticlePageProps) {
  const article = (await strapiFunctions.getArticleBySlug(slug))?.attributes;

  if (!article) {
    notFound();
  }

  const course = article.course.data?.attributes;

  return (
    <div className="section container flex flex-row-reverse justify-center gap-10">
      {course && (
        <div className="sticky top-10 mb-auto hidden border-l border-base-200 py-2 pl-4 md:block">
          <ol className="flex flex-col gap-2">
            <li>
              <Link
                href={`/tecaji/${course.slug ?? ''}`}
                className="btn no-animation btn-sm btn-block h-auto min-h-0 justify-start py-3 text-left"
              >
                <FontAwesomeIcon icon={faAngleUp} height={18} width={16} />
                <span>{course.title}</span>
              </Link>
            </li>
            <li>
              <ol className="ml-4 flex flex-col gap-2">
                {course.articles?.data.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/v/${a.attributes.slug}`}
                      className={`btn no-animation btn-sm btn-block h-auto min-h-0 justify-start py-3 text-left ${a.attributes.slug === slug ? 'btn-primary' : 'btn-ghost'}`}
                    >
                      {a.attributes.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </div>
      )}

      <article className="prose">
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

          {article.subtitle && (
            <p className="my-2 text-lg">{article.subtitle}</p>
          )}
          {/* <div className="flex items-center gap-2">
            <span className="badge badge-ghost">{course?.title}</span>
            {article.in_exam && (
              <span className="badge badge-primary">V izpitu</span>
            )}
          </div> */}
        </div>

        <MDX source={article.content} />
      </article>
    </div>
  );
}
