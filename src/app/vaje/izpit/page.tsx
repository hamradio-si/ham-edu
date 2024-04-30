'use client';

import { create } from 'zustand';
import { StartForm } from './start_form';
import { getExamQuestions } from '@/util/question-util';
import { scrollToTop } from '@/util/scroll-util';
import { Question } from '@/interfaces/question.interface';
import { ExamInProgress } from './exam-in-progress';
import { ExamResults } from './exam-results';
import { umamiTrack } from '@/components/umami-analytics';

enum QuizState {
  Loading,
  Ready,
  InProgress,
  Finished,
}

interface IzpitQuizStore {
  state: QuizState;

  questions?: Question[];
  answers?: number[];
  endTime?: Date;

  load: (questionCount: number, time: number) => void;
  finish: () => void;
  reset: () => void;
}

const useExamStore = create<IzpitQuizStore>((set, get) => ({
  state: QuizState.Ready,

  questions: undefined,
  answers: undefined,
  time: undefined,

  load: async (questionCount: number, time: number) => {
    set({ state: QuizState.Loading });

    const questions = await getExamQuestions(
      new Date().valueOf(),
      questionCount,
    );

    set({
      state: QuizState.InProgress,
      questions,
      answers: Array(questions.length).fill(-1),
      endTime: new Date(Date.now() + 1000 * 60 * time),
    });
  },

  finish: () => {
    const { questions, answers } = get();
    const incorrect = questions!.filter((q, qi) => q.correct !== answers![qi]);
    const correctPercent =
      Math.round((1 - incorrect.length / answers!.length) * 1000) / 10;

    umamiTrack('exam_finished', {
      correctPercent,
      incorrect: incorrect.map((q) => q.id).join(','),
    });
    set({
      state: QuizState.Finished,
    });
    scrollToTop();
  },

  reset: () => {
    set({ state: QuizState.Ready });
  },
}));

export default function ExamPractice() {
  const [state, questions, answers, endTime, load, finish, reset] =
    useExamStore((state) => [
      state.state,
      state.questions,
      state.answers,
      state.endTime,
      state.load,
      state.finish,
      state.reset,
    ]);

  if (state === QuizState.Ready) return <StartForm onStart={load} />;

  if (state === QuizState.Loading) return <div>Pripravljanje ...</div>;

  if (state === QuizState.InProgress)
    return (
      <ExamInProgress
        questions={questions!}
        answers={answers!}
        endTime={endTime!}
        setAnswer={(qi, ai) => {
          const newAnswers = [...answers!];
          newAnswers[qi] = ai;
          useExamStore.setState({ answers: newAnswers });
        }}
        finish={finish}
      />
    );

  if (state === QuizState.Finished)
    return (
      <ExamResults questions={questions!} answers={answers!} reset={reset} />
    );

  return <></>;
}
