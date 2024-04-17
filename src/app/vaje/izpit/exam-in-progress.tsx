import QuestionCard from '@/components/question-card';
import { Question } from '@/interfaces/question.interface';
import { useEffect, useState } from 'react';

interface ExamInProgressProps {
  questions: Question[];
  answers: number[];
  endTime: Date;
  setAnswer: (questionIndex: number, answerIndex: number) => void;
  finish: () => void;
}

export function ExamInProgress({
  questions,
  answers,
  endTime: timeEnd,
  setAnswer,
  finish,
}: ExamInProgressProps) {
  return (
    <>
      <div className="section flex flex-col gap-12">
        {questions?.map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={false}
            selected={answers[qi]}
            onClick={(i) => setAnswer(qi, i)}
          />
        ))}
      </div>

      <div className="sticky inset-0 top-auto mb-10 flex select-none p-5">
        <div className="mx-auto flex items-center gap-6 rounded-lg border bg-base-100 px-6 py-4 shadow-lg">
          <div className="text-lg">
            {answers.filter((v) => v >= 0).length} / {answers.length}
          </div>
          <Countdown timeEnd={timeEnd} finish={finish} />
          <button className="btn btn-primary btn-sm" onClick={finish}>
            Zaključi
          </button>
        </div>
      </div>
    </>
  );
}

interface CountdownProps {
  timeEnd: Date;
  finish: () => void;
}

export function Countdown({ timeEnd, finish }: CountdownProps) {
  const [remaining, setRemaining] = useState(timeEnd.valueOf() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      const newVal = Math.max(0, timeEnd.valueOf() - Date.now());
      setRemaining(newVal);
      if (newVal === 0) {
        clearInterval(interval);
        finish();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [timeEnd, finish]);

  return (
    <div className="text-lg">
      {Math.floor(remaining / 1000 / 60)}:
      {Math.floor((remaining / 1000) % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
}
