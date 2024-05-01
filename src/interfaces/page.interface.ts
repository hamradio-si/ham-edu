export interface Page {
  id: number;
  attributes: {
    slug: string;
    title: string;
    description: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}
