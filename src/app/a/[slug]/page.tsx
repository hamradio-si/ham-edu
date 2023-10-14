import { strapiFunctions } from '@/api';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => (
    <Link href={props.src}>
      <Image
        width={600}
        height={600}
        alt={props.alt}
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    </Link>
  ),
};

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

      <div>
        <MDXRemote
          source={article.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    properties: {
                      className: ['anchor'],
                    },
                  },
                ],
              ],
            },
          }}
          components={components}
        />
      </div>
    </article>
  );
}
