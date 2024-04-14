export interface Course {
  id: number;
  attributes: {
    title: string;
    description?: string;
    slug: string;
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
  };
}
