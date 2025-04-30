import Link from 'next/link';
import Image from 'next/image';

export interface CourseCardProps {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
}

export default function CourseCard({
  id,
  title,
  description,
  level,
  duration,
  image,
}: CourseCardProps) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex-shrink-0 h-48 w-full relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {level}
            </span>
            <span className="text-sm text-gray-500">{duration}</span>
          </div>
          <Link href={`/courses/${id}`} className="block mt-2 hover:text-green-600">
            <p className="text-xl font-semibold text-gray-900 hover:text-green-600">{title}</p>
            <p className="mt-3 text-base text-gray-500">{description}</p>
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={`/courses/${id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
          >
            View Course Details
          </Link>
        </div>
      </div>
    </div>
  );
}
