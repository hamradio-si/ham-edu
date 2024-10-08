import QuestionCard from '@/components/question-card';
import { Metadata } from 'next';
import questionFile from '@/../public/questions.json';
import { QuestionFile } from '@/interfaces/question.interface';

export const metadata: Metadata = {
  title: 'Zbirka vprašanj',
  description:
    'Zbirka vprašanj, ki se lahko pojavijo na radioamaterskem izpitu',
  keywords: ['izpit', 'vprašanja', 'zbirka', 'izpitna vprašanja'],
  openGraph: {
    title: 'Zbirka vprašanj',
    description:
      'Zbirka vprašanj, ki se lahko pojavijo na radioamaterskem izpitu',
  },
};

export default async function QuestionPool() {
  return (
    <div className="section container max-w-xl">
      <div className="prose mb-12">
        <h1>Zbirka vprašanj</h1>
      </div>

      <div className="flex flex-col gap-12">
        {(questionFile as QuestionFile).questions.map((question, qi) => (
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
