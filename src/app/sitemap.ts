import { strapiFunctions } from '@/api';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://edu.jkob.cc';

  const pages1 = [
    '/izpit',
    '/kontakt',
    '/licenca',
    '/tecaji',
    '/vaje',
    '/vaje/izpit',
    '/vsebine',
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const pages2 = [
    '/izpit/razredi',
    '/izpit/zbirka',
    '/licenca/klicni-znak',
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  const courses = (await strapiFunctions.getAllCourses()).map((course) => ({
    url: `${baseUrl}/tecaji/${course.attributes.slug}`,
    lastModified: course.attributes.updatedAt,
    priority: 0.6,
  }));

  const articles = (await strapiFunctions.getAllArticles()).map((article) => ({
    url: `${baseUrl}/v/${article.attributes.slug}`,
    lastModified: article.attributes.updatedAt,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    ...pages1,
    ...pages2,
    ...courses,
    ...articles,
  ];
}
