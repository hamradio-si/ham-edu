import { Article } from './interfaces/article.interface';

export const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';

export const strapiFunctions = {
  getArticles: async (): Promise<Article[]> => {
    const res = await fetch(`${strapiUrl}/api/articles?populate=*`, {
      next: { revalidate: 1 },
    });
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
      `${strapiUrl}/api/articles?filters[slug][$eq]=${slug}&populate=*`,
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
