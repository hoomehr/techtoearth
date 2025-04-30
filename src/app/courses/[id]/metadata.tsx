import coursesData from '@/data/courses.json';

export default function generateMetadata({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const course = coursesData.courses.find(c => c.id === courseId);

  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found',
    };
  }

  return {
    title: `${course.title} | TechToEarth Courses`,
    description: course.description,
  };
}
