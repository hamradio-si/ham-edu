import { Course } from './course.interface';

export interface Article {
  id: number;
  attributes: {
    title: string;
    slug: string;
    subtitle?: string;
    cover: {
      data: {
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
      } | null;
    };
    author?: string;
    course: {
      data: Course | null;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}
