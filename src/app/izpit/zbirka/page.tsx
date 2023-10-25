import QuestionCard from '@/components/question_card';
import { Metadata } from 'next';
import { questions } from '@/../public/questions.json';
import { Question } from '@/interfaces/question';

export const metadata: Metadata = {
  title: 'Zbirka vprašanj',
  description:
    'Zbirka vprašanj, ki se lahko pojavijo na radioamaterskem izpitu',
};

export default async function QuestionPool() {
  return (
    <div className="section container max-w-xl">
      <div className="prose mb-12">
        <h1>Zbirka vprašanj</h1>
      </div>

      <div className="flex flex-col gap-12">
        {(questions as Question[]).map((question, qi) => (
          <QuestionCard
            key={qi}
            question={question}
            reveal={false}
            selected={question.correct}
          />
        ))}
      </div>
    </div>
  );
}
