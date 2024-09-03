import { strapiFunctions } from '@/api';
import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

interface StrapiEvent {
  event: string;
  createdAt: string;
  model: string;
  entry: Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  const auth = request.headers.get('Authorization');
  if (!auth || auth !== `Bearer ${process.env.STRAPI_TOKEN}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  const event = (await request.json()) as StrapiEvent;
  console.log(event);

  if (!event.event.startsWith('entry.')) return new Response('OK');

  // Revalidate article
  if (event.model === 'article') {
    const slug = event.entry.slug as string;

    revalidatePath(`/v/${slug}`);
    revalidatePath('/vsebine');
    revalidatePath('/');

    const article = (await strapiFunctions.getArticleBySlug(slug))?.attributes;
    if (article?.course?.data) {
      const courseSlug = article.course.data.attributes.slug;
      if (courseSlug) revalidatePath(`/tecaji/${courseSlug}`);
      else revalidatePath('/tecaji');
    }
  }

  // Revalidate course
  if (event.model === 'course') {
    const slug = event.entry.slug as string | null;

    if (slug) revalidatePath(`/tecaji/${slug}`);
    else revalidatePath('/tecaji');

    const course = (await strapiFunctions.getCourseBySlug(slug))?.attributes;
    if (course?.parent?.data) {
      const parent = course.parent?.data.attributes;
      revalidatePath(`/tecaji/${parent.slug}`);
    }

    course?.subcourses?.data?.forEach((subcourse) => {
      revalidatePath(`/tecaji/${subcourse.attributes.slug}`);
    });
    course?.articles?.data?.forEach((article) => {
      revalidatePath(`/v/${article.attributes.slug}`);
    });
  }

  // Revalidate page
  if (event.model === 'page') {
    const slug = event.entry.slug as string;
    revalidatePath(`/${slug}`);
  }

  return new Response('OK');
}
