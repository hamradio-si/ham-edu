import { Article } from './interfaces/article.interface';

const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

export const strapiFunctions = {
  getArticles: async (): Promise<Article[]> => {
    const res = await fetch(`${strapiUrl}/api/articles`);
    const data = await res.json();
    return data.data;
  },
  getArticleById: async (id: number): Promise<Article> => {
    const res = await fetch(`${strapiUrl}/api/articles/${id}`);
    const data = await res.json();
    return data.data;
  },
  getArticleBySlug: async (slug: string): Promise<Article> => {
    const res = await fetch(
      `${strapiUrl}/api/articles?filters[slug][$eq]=${slug}`,
    );
    const data = await res.json();
    return data.data[0];
  },
};
