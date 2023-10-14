export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    subtitle?: string;
    cover?: string;
    author?: string;
    in_exam?: boolean;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}
