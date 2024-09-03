export interface Course {
  id: number;
  attributes: {
    title: string;
    description?: string;
    slug: string | null;
    parent?: {
      data: Course | null;
    };
    subcourses?: {
      data: Course[];
    };
    articles?: {
      data: {
        id: number;
        attributes: {
          title: string;
          slug: string;
        };
      }[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    keywords?: string;
  };
}
