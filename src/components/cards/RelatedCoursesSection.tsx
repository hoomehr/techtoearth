import CourseCard from './CourseCard';

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
}

interface RelatedCoursesSectionProps {
  currentCourseId: number;
  courses: Course[];
  level: string;
}

export default function RelatedCoursesSection({
  currentCourseId,
  courses,
  level,
}: RelatedCoursesSectionProps) {
  // Filter courses by level and exclude the current course
  const relatedCourses = courses
    .filter(c => c.id !== currentCourseId && c.level === level)
    .slice(0, 3);

  if (relatedCourses.length === 0) {
    return null;
  }

  return (
    <div className="bg-yellow-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900">Related Courses</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {relatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              description={course.description}
              level={course.level}
              duration={course.duration}
              image={course.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
