import { strapiFunctions } from '@/api';
import { MDX } from '@/components/mdx';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Radioamaterski izpit',
  description: 'Informacije o radioamaterskem izpitu',
  openGraph: {
    title: 'Radioamaterski izpit',
    description: 'Informacije o radioamaterskem izpitu',
  },
};

export default async function Izpit() {
  const source = await strapiFunctions.getExamPage();

  return (
    <div className="section container prose">
      <MDX source={source} />
    </div>
  );
}
