'use client';

import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/cards/CourseCard';
import coursesData from '@/data/courses.json';

// Metadata is moved to a separate file when using client components

export default function CoursesPage() {
  return (
    <div className="bg-yellow-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Courses</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Designed specifically for tech professionals looking to transition to agriculture, food, and beverage industries.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coursesData.courses.map((course) => (
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
