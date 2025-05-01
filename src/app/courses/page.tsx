'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/cards/CourseCard';
import CourseFilterBar from '@/components/filters/CourseFilterBar';
import SectionHeaderWithDivider from '@/components/SectionHeaderWithDivider';
import coursesData from '@/data/courses.json';

// Metadata is moved to a separate file when using client components

export default function CoursesPage() {
  const [filters, setFilters] = useState({
    search: '',
    levels: [] as string[],
    topics: [] as string[],
  });

  // Extract all unique levels and topics from courses
  const allLevels = useMemo(() => {
    const levels = new Set<string>();
    coursesData.courses.forEach(course => {
      levels.add(course.level);
    });
    return Array.from(levels);
  }, []);

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    coursesData.courses.forEach(course => {
      course.topics.forEach(topic => {
        topics.add(topic);
      });
    });
    return Array.from(topics);
  }, []);

  // Filter courses based on search and selected filters
  const filteredCourses = useMemo(() => {
    return coursesData.courses.filter(course => {
      // Filter by search term
      const searchMatch = !filters.search ||
        course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.search.toLowerCase());

      // Filter by level
      const levelMatch = filters.levels.length === 0 ||
        filters.levels.includes(course.level);

      // Filter by topics
      const topicMatch = filters.topics.length === 0 ||
        course.topics.some(topic => filters.topics.includes(topic));

      return searchMatch && levelMatch && topicMatch;
    });
  }, [filters]);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10 text-left">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Education
            </span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Our Courses
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Learn From Industry Experts</p>
            <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
          </div>
          <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl mb-6">
            Designed specifically for tech professionals looking to transition to agriculture, food, and beverage industries.
          </p>
          <div>
            <a
              href="#courses"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md"
            >
              Browse All
            </a>
          </div>
        </div>

        <div className="mt-12" id="courses">
          <CourseFilterBar
            levels={allLevels}
            topics={allTopics}
            onFilterChange={setFilters}
            coursesData={coursesData.courses}
          />

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
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
          )}

          {filteredCourses.length > 0 && (
            <div className="mt-8 text-center text-gray-500">
              Showing {filteredCourses.length} of {coursesData.courses.length} courses
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
