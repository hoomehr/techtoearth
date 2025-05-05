'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { use } from 'react';
import RelatedCoursesSection from '@/components/cards/RelatedCoursesSection';
import EnrollCourseCard from '@/components/cards/EnrollCourseCard';
import { useAuth } from '@/contexts/AuthContext';
import { FiEdit2 } from 'react-icons/fi';

export default function CourseDetailsPage() {
  const params = useParams();
  // In Next.js 15, params should be unwrapped with React.use()
  const unwrappedParams = use(params);
  const courseId = parseInt(unwrappedParams.id);
  const [course, setCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCourse() {
      try {
        // Fetch the specific course
        const response = await fetch(`/api/courses/${courseId}`);
        const data = await response.json();
        setCourse(data);

        // Fetch all courses for related courses section
        const allCoursesResponse = await fetch('/api/courses');
        const allCoursesData = await allCoursesResponse.json();
        setAllCourses(allCoursesData.courses);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading Course...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Course Not Found</h1>
            <p className="mt-4 text-xl text-gray-500">The course you're looking for doesn't exist or has been removed.</p>
            <div className="mt-10">
              <Link href="/courses" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover"
            src={course.image}
            alt={course.title}
            fill
            priority
          />
          <div className="absolute inset-0 bg-green-800 mix-blend-multiply opacity-70" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-white">
            {course.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {course.level}
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {course.duration}
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ${course.price}
            </span>
            {(user?.isAdmin || (user?.isCreator && course.creatorId === user.id)) && (
              <Link
                href={`/admin/edit-course/${course.id}`}
                className="inline-flex items-center px-4 py-1.5 border border-green-300 rounded-full text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
              >
                <FiEdit2 className="mr-2 h-4 w-4" />
                Edit Course
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Course details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose prose-green prose-lg max-w-none">
              <h2>About This Course</h2>
              <p>{course.longDescription || course.description}</p>

              <h2 className="mt-12">What You'll Learn</h2>
              <ul>
                {course.topics && course.topics.length > 0 ? (
                  course.topics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))
                ) : (
                  <li>Course topics will be added soon</li>
                )}
              </ul>

              <h2 className="mt-12">Course Content</h2>
              <div className="mt-8 space-y-8">
                {course.modules && course.modules.length > 0 ? (
                  course.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-green-50 px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">Module {moduleIndex + 1}: {module.title}</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {module.lessons && module.lessons.length > 0 ? (
                          module.lessons.map((lesson, lessonIndex) => {
                            // Handle both string lessons and object lessons with title/duration
                            const lessonTitle = typeof lesson === 'string' ? lesson : (lesson?.title || `Lesson ${lessonIndex + 1}`);
                            const lessonDuration = typeof lesson === 'string' ? '45-60 min' : (lesson?.duration || '45-60 min');

                            return (
                              <li key={lessonIndex} className="px-4 py-4 sm:px-6 bg-white">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-green-600 truncate">
                                    Lesson {lessonIndex + 1}: {lessonTitle}
                                  </p>
                                  <div className="ml-2 flex-shrink-0 flex">
                                    <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      {lessonDuration}
                                    </p>
                                  </div>
                                </div>
                              </li>
                            );
                          })
                        ) : (
                          <li className="px-4 py-4 sm:px-6 bg-white">
                            <p className="text-sm text-gray-600">
                              Lessons will be added to this module soon.
                            </p>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                ))
                ) : (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-green-50 px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">Course modules will be added soon</h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-4 sm:px-6 bg-white">
                      <p className="text-sm text-gray-600">
                        The instructor is currently preparing the course content. Check back soon!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0">
            <div className="sticky top-8">
              <EnrollCourseCard
                price={course.price}
                instructor={{
                  name: course.instructor || 'Instructor',
                  expertise: [course.topics?.[0] || 'Agriculture', course.topics?.[1] || 'Farming'],
                  initials: course.instructor ? course.instructor.split(' ').map(name => name[0]).join('') : 'I'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Related courses */}
      <RelatedCoursesSection
        currentCourseId={course.id}
        courses={allCourses}
        level={course.level || 'Beginner'}
      />
    </div>
  );
}
