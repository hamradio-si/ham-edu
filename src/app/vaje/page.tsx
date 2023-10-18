import VajaQuiz from '@/components/vaja-quiz';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vaja za radioamaterski izpit',
  description: 'Vadi vprašanja, ki se lahko pojavijo na izpitu',
};

export default function PracticePage() {
  return (
    <div className="container max-w-xl">
      <div className="section prose">
        <h1>Vaja za radioamaterski izpit</h1>
      </div>

      <VajaQuiz />
    </div>
  );
}
