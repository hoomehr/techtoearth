import Link from 'next/link';
import Image from 'next/image';
import CourseCard from '@/components/cards/CourseCard';

// This would typically come from a database
const courses = [
  {
    id: 1,
    title: 'Introduction to Sustainable Farming',
    description: 'Learn the basics of sustainable farming practices and how to apply your tech skills to modern agriculture.',
    level: 'Beginner',
    duration: '4 weeks',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 2,
    title: 'Tech Solutions for Agriculture',
    description: 'Discover how to leverage your technical expertise to solve common agricultural challenges.',
    level: 'Intermediate',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
  },
  {
    id: 3,
    title: 'Starting Your Own Farm Business',
    description: 'A comprehensive guide to planning, launching, and growing your own agricultural business.',
    level: 'Advanced',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1595508064774-5ff825520ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 4,
    title: 'Vineyard Management and Wine Production',
    description: 'Learn the art and science of vineyard management and wine production from industry experts.',
    level: 'Intermediate',
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
  },
  {
    id: 5,
    title: 'Craft Brewing Fundamentals',
    description: 'Master the fundamentals of craft brewing and learn how to start your own microbrewery.',
    level: 'Beginner',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 6,
    title: 'Farm-to-Table Restaurant Management',
    description: 'Learn how to create and manage a successful farm-to-table restaurant concept.',
    level: 'Advanced',
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
  },
];

export const metadata = {
  title: 'Courses | TechToEarth',
  description: 'Browse our courses designed to help tech professionals transition to agriculture',
};

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
          {courses.map((course) => (
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
