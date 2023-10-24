import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import Link from 'next/link';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

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

export function MDX({ source }: { source: string }) {
  return (
    <div>
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
    </div>
  );
}
