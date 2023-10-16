import { strapiFunctions } from '@/api';
import { MDX } from '@/components/mdx';

export default async function Izpit() {
  const source = await strapiFunctions.getExamPage();

  return (
    <div className="section container prose">
      <MDX source={source} />
    </div>
  );
}
