export interface QuestionFile {
  questions: Question[];
  categories: QCategory[];
}

export interface QCategory {
  id: number;
  title: string;
}

export interface Question {
  id: number;
  category: number;
  question: string;
  image?: string;
  answers: string[];
  correct: number;
  classes: string[];
  difficulty: number;
}
