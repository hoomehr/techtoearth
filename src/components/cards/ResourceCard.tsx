'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiBook, FiFileText, FiVideo, FiLink, FiTool, FiUser } from 'react-icons/fi';

export interface ResourceCardProps {
  id: number;
  title: string;
  description: string;
  type: string;
  author: string;
  url: string;
  image: string;
  category: string;
}

export default function ResourceCard({
  id,
  title,
  description,
  type,
  author,
  url,
  image,
  category,
}: ResourceCardProps) {
  // Get the appropriate icon based on resource type
  const getTypeIcon = () => {
    switch (type.toLowerCase()) {
      case 'book':
        return <FiBook className="mr-2" />;
      case 'pdf':
      case 'guide':
      case 'article':
        return <FiFileText className="mr-2" />;
      case 'video':
        return <FiVideo className="mr-2" />;
      case 'tool':
        return <FiTool className="mr-2" />;
      default:
        return <FiLink className="mr-2" />;
    }
  };

  return (
    <div className="flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 group bg-white shadow-md hover:shadow-xl border border-gray-100">
      {/* Resource image - full width at top */}
      <div className="w-full h-40 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-300 group-hover:scale-105"
          unoptimized={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-0 left-0 bg-green-600 text-white px-3 py-1 rounded-br-lg">
          <div className="flex items-center text-sm font-medium">
            {getTypeIcon()}
            <span className="capitalize">{type}</span>
          </div>
        </div>
      </div>

      {/* Resource content */}
      <div className="flex-1 p-5">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-3 mb-4">{description}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <FiUser className="mr-1" />
              <span className="font-medium">{author}</span>
            </div>
            <Link
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              View Resource
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
