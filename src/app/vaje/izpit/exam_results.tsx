import QuestionCard from '@/components/question_card';
import { Question } from '@/interfaces/question.interface';

interface ExamResultsProps {
  questions: Question[];
  answers: number[];
  reset: () => void;
}

export function ExamResults({ questions, answers, reset }: ExamResultsProps) {
  const correct = questions.filter((q, qi) => q.correct === answers[qi]).length;
  const correctPercent = Math.round((correct / answers.length) * 1000) / 10;

  return (
    <>
      <div className="flex flex-col items-center gap-4 rounded-xl bg-base-200 p-6">
        <div className="flex flex-col items-center">
          <h2 className="text-xl">Rezultat</h2>
          <p className="text-4xl">
            {correct} / {answers.length} ({correctPercent} %)
          </p>
        </div>

        {correctPercent > 60 ? (
          <div className="alert alert-success rounded-xl text-center">
            Čestitke, dosegel si več kot 60 % pravilnih odgovorov!
          </div>
        ) : (
          <div className="alert alert-error rounded-xl text-center">
            Žal si dosegel manj kot 60 % pravilnih odgovorov. Poskusi znova.
          </div>
        )}

        <button className="btn btn-primary" onClick={reset}>
          Nazaj na začetek
        </button>
      </div>

      {correct !== answers.length && (
        <div className="section">
          <h1 className="mb-10 text-center text-2xl font-semibold">
            Napačni odgovori
          </h1>

          <div className="flex flex-col gap-12">
            {questions.map(
              (question, qi) =>
                question.correct !== answers[qi] && (
                  <QuestionCard
                    key={qi}
                    question={question}
                    reveal={true}
                    selected={[answers[qi], question.correct]}
                  />
                ),
            )}
          </div>
        </div>
      )}
    </>
  );
}
