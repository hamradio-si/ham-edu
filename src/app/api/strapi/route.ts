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

  if (event.model === 'article') {
    const article = event.entry as { slug: string; course?: { slug: string } };

    revalidatePath(`/v/${article.slug}`);
    revalidatePath('/vsebine');
    if (article.course) {
      revalidatePath(`/tecaji/${article.course.slug}`);
    }
    revalidatePath('/');
  }

  if (event.model === 'course') {
    const course = event.entry as {
      slug: string;
      parent: { slug: string };
      subcourses: { slug: string }[];
      articles: { slug: string }[];
    };

    revalidatePath(`/tecaji/${course.slug}`);

    if (event.entry.parent) {
      const parent = course.parent as { slug: string };
      revalidatePath(`/tecaji/${parent.slug}`);
    } else {
      revalidatePath('/tecaji');
    }

    course.subcourses?.forEach((subcourse: { slug: string }) => {
      revalidatePath(`/tecaji/${subcourse.slug}`);
    });
    course.articles?.forEach((article: { slug: string }) => {
      revalidatePath(`/v/${article.slug}`);
    });
  }

  return new Response('OK');
}
