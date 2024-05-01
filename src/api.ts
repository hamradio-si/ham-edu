import { Article } from './interfaces/article.interface';
import { Course } from './interfaces/course.interface';
import { Page } from './interfaces/page.interface';
import { Paginated } from './interfaces/paginated.interface';

export const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

export const strapiFunctions = {
  getArticles: async (params?: {
    search?: string;
    page?: number;
  }): Promise<Paginated<Article>> => {
    const { search, page } = params || {};
    const res = await fetch(
      `${strapiUrl}/api/articles?populate=*&sort=publishedAt:desc${search ? `&filters[title][$containsi]=${search}` : ''}&pagination[page]=${page || 1}`,
    );
    return await res.json();
  },
  getAllArticles: async (): Promise<Article[]> => {
    const res = await fetch(
      `${strapiUrl}/api/articles?pagination[pageSize]=1000&fields[0]=slug&fields[1]=updatedAt`,
    );
    const data = await res.json();
    return data.data;
  },
  getArticleById: async (id: number): Promise<Article> => {
    const res = await fetch(`${strapiUrl}/api/articles/${id}?populate=*`);
    const data = await res.json();
    return data.data;
  },
  getArticleBySlug: async (slug: string): Promise<Article> => {
    const res = await fetch(
      `${strapiUrl}/api/articles?filters[slug]=${slug}&populate[cover][populate]=*&populate[course][populate][articles][fields][1]=title&populate[course][populate][articles][fields][2]=slug`,
    );
    const data = await res.json();
    return data.data[0];
  },
  getAllCourses: async (): Promise<Course[]> => {
    const res = await fetch(
      `${strapiUrl}/api/courses?pagination[pageSize]=1000`,
    );
    const data = await res.json();
    return data.data;
  },
  getCourseBySlug: async (slug?: string): Promise<Course> => {
    const slg = slug ? `=${slug}` : '[$null]=true';
    const res = await fetch(
      `${strapiUrl}/api/courses?filters[slug]${slg}&populate[parent]=*&populate[subcourses]=*&populate[articles][fields][0]=title&populate[articles][fields][1]=slug`,
    );
    const data = await res.json();
    return data.data[0];
  },
  getAllPages: async (): Promise<Page[]> => {
    const res = await fetch(
      `${strapiUrl}/api/pages?pagination[pageSize]=1000&fields[0]=slug&fields[1]=updatedAt`,
    );
    const data = await res.json();
    return data.data;
  },
  getPageBySlug: async (slug: string): Promise<Page> => {
    const res = await fetch(`${strapiUrl}/api/pages?filters[slug]=${slug}`);
    const data = await res.json();
    return data.data[0];
  },
};
