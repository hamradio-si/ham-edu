import { strapiFunctions } from '@/api';
import { Metadata } from 'next';
import { CourseList } from './course-list';

export const metadata: Metadata = {
  title: 'Tečaji',
  description: 'Tečaji, ki vas pripravijo na radioamaterski izpit',
  openGraph: {
    title: 'Tečaji',
    description: 'Tečaji, ki vas pripravijo na radioamaterski izpit',
  },
};

export default async function CoursesPage() {
  const courses = await strapiFunctions.getRootCourses();

  return (
    <div className="section container max-w-[65ch]">
      <div className="prose mb-8">
        <h1>Tečaji</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>

      <CourseList courses={courses} />
    </div>
  );
}
