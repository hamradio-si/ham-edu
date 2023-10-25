import QuestionCard from '@/components/question_card';
import { getQuestions } from '@/util/question-util';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zbirka vprašanj',
  description:
    'Zbirka vprašanj, ki se lahko pojavijo na radioamaterskem izpitu',
};

export default async function QuestionPool() {
  const questions = await getQuestions();

  return (
    <div className="section container max-w-xl">
      <div className="prose mb-12">
        <h1>Zbirka vprašanj</h1>
      </div>

      <div className="flex flex-col gap-12">
        {questions?.map((question, qi) => (
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
