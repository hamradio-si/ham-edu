export interface Page {
  id: number;
  attributes: {
    slug: string;
    title: string;
    description: string;
    keywords: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
