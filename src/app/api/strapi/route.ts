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
    const article = event.entry as {
      slug: string;
      course: { data: { slug: string } | null };
    };

    revalidatePath(`/v/${article.slug}`);
    revalidatePath('/vsebine');
    if (article.course.data) {
      revalidatePath(`/tecaji/${article.course.data.slug}`);
    }
    revalidatePath('/');
  }

  // Revalidate course
  if (event.model === 'course') {
    const course = event.entry as {
      slug: string;
      parent: { data: { slug: string } | null };
      subcourses: { data: { slug: string }[] | null };
      articles: { data: { slug: string }[] | null };
    };

    revalidatePath(`/tecaji/${course.slug}`);

    if (course.parent.data) {
      const parent = course.parent.data;
      revalidatePath(`/tecaji/${parent.slug}`);
    } else {
      revalidatePath('/tecaji');
    }

    course.subcourses.data?.forEach((subcourse: { slug: string }) => {
      revalidatePath(`/tecaji/${subcourse.slug}`);
    });
    course.articles.data?.forEach((article: { slug: string }) => {
      revalidatePath(`/v/${article.slug}`);
    });
  }

  // Revalidate page
  if (event.model === 'page') {
    const slug = event.entry.slug as string;
    revalidatePath(`/${slug}`);
  }

  return new Response('OK');
}
