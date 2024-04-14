import { Course } from '@/interfaces/course.interface';
import Link from 'next/link';

export function CourseList({
  courses,
  articles,
}: {
  courses?: Course[];
  articles?: {
    id: number;
    attributes: {
      title: string;
      slug: string;
    };
  }[];
}) {
  return (
    <>
      <ol className="flex flex-col gap-2 text-left">
        {courses?.map((subc) => (
          <li key={subc.id}>
            <Link
              href={`/tecaji/${subc.attributes.slug}`}
              className="btn no-animation btn-block justify-start"
            >
              {subc.attributes.title}
            </Link>
          </li>
        ))}
      </ol>
      <ol className="flex flex-col gap-2">
        {articles?.map((article) => (
          <li key={article.id}>
            <Link
              href={`/v/${article.attributes.slug}`}
              className="btn no-animation btn-block justify-start"
            >
              {article.attributes.title}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
