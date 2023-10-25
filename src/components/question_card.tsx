import Image from 'next/image';
import { Question } from '@/interfaces/question';
import { LazyTeX } from './lazy_tex';

interface QuestionCardProps {
  question: Question;
  reveal: boolean;
  selected: number[] | number;
  onClick?: (answer: number) => void;
}

export default function QuestionCard({
  question,
  reveal,
  onClick,
  selected,
}: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-xl text-gray-700">
        <span className="font-bold text-primary">
          A{question.id.toString().padStart(3, '0')}:{' '}
        </span>
        {question.question}
      </div>

      {question.image && (
        <Image
          className="max-h-80 max-w-full object-contain"
          src={`/question_images/${question.image}`}
          alt={question.image}
          height={500}
          width={500}
          style={{ width: '100%', height: 'auto' }}
        />
      )}

      <div className="flex flex-col gap-2">
        {question.answers.map((answer, i) => (
          <Answer
            key={i}
            index={i}
            answer={answer}
            reveal={reveal}
            isCorrect={question.correct === i}
            isSelected={
              selected instanceof Array ? selected.includes(i) : selected === i
            }
            onClick={!onClick ? undefined : () => onClick(i)}
          />
        ))}
      </div>
    </div>
  );
}

interface AnswerProps {
  index: number;
  answer: string;
  reveal: boolean;
  isCorrect: boolean;
  isSelected: boolean;
  onClick?: () => void;
}

function Answer({
  index,
  answer,
  reveal,
  isCorrect,
  isSelected,
  onClick,
}: AnswerProps) {
  return (
    <button
      className={`btn flex h-auto flex-nowrap items-center justify-start gap-6 font-normal normal-case ${
        !isSelected
          ? ''
          : !reveal
          ? 'border-primary bg-primary/30 hover:border-primary hover:bg-primary/30'
          : isCorrect
          ? 'border-success bg-success/30 text-success-content hover:border-success hover:bg-success/30 hover:text-success-content'
          : 'border-error bg-error/30 text-error-content hover:border-error hover:bg-error/30 hover:text-error-content'
      } ${!onClick ? 'no-animation' : ''}`}
      onClick={onClick}
    >
      <div className="text-sm font-bold">{String.fromCharCode(65 + index)}</div>
      <div className="py-2 text-left text-lg">
        {answer.startsWith('$') ? (
          <span className="ml-2">
            <LazyTeX math={answer.slice(1, answer.length - 1)} />
          </span>
        ) : (
          answer
        )}
      </div>
    </button>
  );
}
