import { Category } from './category.interface';

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    subtitle?: string;
    cover: {
      data?: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          caption: string;
          width: number;
          height: number;
          formats: object;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string;
          provider: string;
          provider_metadata: object;
          created_at: string;
          updated_at: string;
        };
      };
    };
    author?: string;
    in_exam?: boolean;
    category: {
      data?: Category;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}
