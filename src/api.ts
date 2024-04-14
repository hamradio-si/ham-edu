import { Article } from './interfaces/article.interface';
import { Course } from './interfaces/course.interface';

export const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

export const strapiFunctions = {
  getArticles: async (filter?: {
    category?: number;
    search?: string;
  }): Promise<Article[]> => {
    const cat = filter?.category;
    const search = filter?.search;
    const res = await fetch(
      `${strapiUrl}/api/articles?populate=*${
        cat ? `&filters[category][id]=${cat}` : ''
      }${search ? `&filters[title][$containsi]=${search}` : ''}`,
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
  getRootCourses: async (): Promise<Course[]> => {
    const res = await fetch(
      `${strapiUrl}/api/courses?populate[subcourses]=*&populate[articles][fields][0]=title&populate[articles][fields][1]=slug&filters[parent][id][$null]=true`,
    );
    const data = await res.json();
    return data.data;
  },
  getCourseBySlug: async (slug: string): Promise<Course> => {
    const res = await fetch(
      `${strapiUrl}/api/courses?filters[slug]=${slug}&populate[parent]=*&populate[subcourses]=*&populate[articles][fields][0]=title&populate[articles][fields][1]=slug`,
    );
    const data = await res.json();
    return data.data[0];
  },
  getExamPage: async (): Promise<string> => {
    const res = await fetch(`${strapiUrl}/api/exam`);
    const data = await res.json();
    return data.data.attributes.content;
  },
};
