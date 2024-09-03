import { strapiFunctions } from '@/api';
import { MDX } from '@/components/mdx';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const page = (await strapiFunctions.getPageBySlug(slug.join('/')))
    ?.attributes;
  if (!page) {
    notFound();
  }

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords || undefined,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const pages = await strapiFunctions.getAllPages();

  return pages.map((a) => ({ slug: a.attributes.slug.split('/') }));
}

export default async function Page({ params: { slug } }: PageProps) {
  const page = await strapiFunctions.getPageBySlug(slug.join('/'));
  if (!page) {
    notFound();
  }

  return (
    <div className="section container prose">
      <MDX source={page.attributes.content} />
    </div>
  );
}
