import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import 'katex/dist/katex.min.css';

const components = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  img: (props: any) => (
    <Link href={props.src}>
      <Image
        {...props}
        width={600}
        height={600}
        alt={props.alt}
        style={{ width: '100%', height: 'auto' }}
      />
    </Link>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: (props: any) =>
    props.href.startsWith('http') ? (
      <Link target="_blank" {...props} />
    ) : (
      <Link {...props} />
    ),
};

export function MDX({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [
            // @ts-expect-error rehype-katex types are wrong
            rehypeKatex,
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
  );
}
