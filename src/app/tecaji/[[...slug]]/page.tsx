import { strapiFunctions } from '@/api';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Course } from '@/interfaces/course.interface';

interface CoursePageProps {
  params: {
    slug?: string[];
  };
}

export async function generateMetadata({
  params: { slug },
}: CoursePageProps): Promise<Metadata> {
  const course = (await strapiFunctions.getCourseBySlug(slug?.join('/')))
    ?.attributes;

  if (!course) {
    notFound();
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: course.title,
      description: course.description,
    },
  };
}

export async function generateStaticParams() {
  const courses = await strapiFunctions.getAllCourses();

  return courses.map((c) => ({ slug: c.attributes.slug?.split('/') }));
}

export default async function CoursesPage({
  params: { slug },
}: CoursePageProps) {
  const course = (await strapiFunctions.getCourseBySlug(slug?.join('/')))
    ?.attributes;

  if (!course) {
    notFound();
  }

  const parent = course.parent?.data;

  return (
    <div className="section container max-w-[65ch]">
      {parent && (
        <Link
          href={`/tecaji/${parent.attributes.slug ?? ''}`}
          className="btn btn-link p-0"
        >
          <FontAwesomeIcon icon={faArrowLeft} height={18} width={16} />
          {parent.attributes.title}
        </Link>
      )}

      <div className="prose mb-8">
        <h1>{course.title}</h1>
        {course.description && <p>{course.description}</p>}
      </div>

      <CAList path="tecaji" data={course.subcourses?.data} />
      <CAList path="v" data={course.articles?.data} />
    </div>
  );
}

interface ListProps {
  path: string;
  data?:
    | {
        id: number;
        attributes: {
          title: string;
          slug: string;
        };
      }[]
    | Course[];
}

function CAList({ path, data }: ListProps) {
  if (!data) return null;

  return (
    <ol className="mb-2 flex flex-col gap-2 text-left">
      {data.map((subc) => (
        <li key={subc.id}>
          <Link
            href={`/${path}/${subc.attributes.slug}`}
            className="btn no-animation btn-block justify-start"
          >
            {subc.attributes.title}
          </Link>
        </li>
      ))}
    </ol>
  );
}
