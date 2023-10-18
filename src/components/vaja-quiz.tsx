'use client';

import { Question } from '@/interfaces/question';
import { getCategories, getQuestions } from '@/util/question-util';
import { useEffect } from 'react';
import { create } from 'zustand';
import { Category } from '@/interfaces/category';
import QuestionCard from '@/components/question_card';

const qPerPage = 5;

interface QuizStore {
  isLoading: boolean;

  categories: Category[];
  selectedCategory: string;

  questions: Question[];
  answers: number[][];
  displayed: number;
  loadMore: () => void;
}

const useStore = create<QuizStore>((set) => ({
  isLoading: false,

  categories: [],
  selectedCategory: 'all',

  questions: [],
  answers: [],
  displayed: 0,
  loadMore: () => set((state) => ({ displayed: state.displayed + qPerPage })),
}));

async function load(selectedCategory: string) {
  useStore.setState({ isLoading: true });

  const categories = await getCategories();
  let questions = await getQuestions();
  if (selectedCategory !== 'all') {
    const catId = parseInt(selectedCategory);
    const cat = categories.find((cat) => cat.id == catId);
    if (!cat) return;

    questions = questions.filter((q) => q.category == catId);
  }
  // Shuffle
  questions = questions.sort(() => Math.random() - 0.5);

  useStore.setState({
    isLoading: false,
    categories,
    questions,
    answers: Array(questions.length).fill([]),
    displayed: qPerPage,
  });
}

export default function VajaQuiz() {
  const [
    isLoading,
    categories,
    selectedCategory,
    questions,
    answers,
    displayed,
    loadMore,
  ] = useStore((state) => [
    state.isLoading,
    state.categories,
    state.selectedCategory,
    state.questions,
    state.answers,
    state.displayed,
    state.loadMore,
  ]);

  useEffect(() => {
    if (questions.length === 0) {
      load(selectedCategory);
    }
  }, [questions.length, selectedCategory]);

  return (
    <>
      <div>
        <label htmlFor="category" className="mb-2 block font-medium">
          Izberi kategorijo
        </label>
        <div className="flex flex-row gap-3">
          <select
            id="category"
            name="category"
            className="select select-bordered flex-1"
            value={selectedCategory}
            onChange={(e) => {
              const selectedCategory = e.target.value;
              useStore.setState({ selectedCategory });
              load(selectedCategory);
            }}
          >
            <option value="all">Vse kategorije</option>
            {categories.map((category, i) => (
              <option key={i} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>

          <button
            className="btn btn-primary"
            disabled={isLoading}
            onClick={!isLoading ? () => load(selectedCategory) : undefined}
          >
            Naloži
          </button>
        </div>
      </div>

      <div className="section mx-auto flex flex-col gap-12">
        {questions.slice(0, displayed).map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={true}
            selected={answers[qi]}
            onClick={
              answers[qi].includes(question.correct)
                ? undefined
                : (i) => {
                    const newAnswers = [...answers];
                    newAnswers[qi] = [...newAnswers[qi], i];
                    useStore.setState({ answers: newAnswers });
                  }
            }
          />
        ))}

        {questions.length > displayed && (
          <div className="flex flex-row justify-center gap-3">
            <button className="btn btn-primary" onClick={loadMore}>
              Naloži več
            </button>
          </div>
        )}
      </div>
    </>
  );
}
