'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiUsers } from 'react-icons/fi';

export interface GroupCardProps {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  category: string;
  image: string;
}

export default function GroupCard({
  id,
  name,
  description,
  memberCount,
  category,
  image,
}: GroupCardProps) {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 group bg-white shadow-md hover:shadow-xl">
      <div className="flex-shrink-0 h-48 w-full relative">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-all duration-300 group-hover:blur-[2px]"
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-transparent group-hover:bg-black group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <Link
            href={`/groups/${id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform scale-0 group-hover:scale-100"
          >
            Join Group
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {category}
            </span>
            <span className="text-sm text-gray-500 flex items-center">
              <FiUsers className="mr-1" />
              {memberCount} members
            </span>
          </div>
          <Link href={`/groups/${id}`} className="block mt-2 hover:text-green-600">
            <p className="text-xl font-semibold text-gray-900 hover:text-green-600">{name}</p>
            <p className="mt-3 text-base text-gray-500 line-clamp-3">{description}</p>
          </Link>
        </div>
        <div className="mt-6">
          <Link
            href={`/groups/${id}`}
            className="text-base font-medium text-green-600 hover:text-green-500"
          >
            Learn more about this group →
          </Link>
        </div>
      </div>
    </div>
  );
}
