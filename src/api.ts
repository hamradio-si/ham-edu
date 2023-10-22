import { Article } from './interfaces/article.interface';
import { Category } from './interfaces/category.interface';

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
      `${strapiUrl}/api/articles?filters[slug]=${slug}&populate=*`,
    );
    const data = await res.json();
    return data.data[0];
  },
  getCategories: async (): Promise<Category[]> => {
    const res = await fetch(`${strapiUrl}/api/categories`);
    const data = await res.json();
    return data.data;
  },
  getExamPage: async (): Promise<string> => {
    const res = await fetch(`${strapiUrl}/api/exam`);
    const data = await res.json();
    return data.data.attributes.content;
  },
};
