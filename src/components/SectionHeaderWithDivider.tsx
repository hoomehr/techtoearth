'use client';

interface SectionHeaderWithDividerProps {
  tag: string;
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

export default function SectionHeaderWithDivider({
  tag,
  title,
  subtitle,
  description,
  className = '',
}: SectionHeaderWithDividerProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <div className="inline-block mb-4">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {tag}
        </span>
      </div>
      <div className="flex items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <div className="ml-4 flex-grow h-0.5 bg-gradient-to-r from-green-500 to-yellow-400 rounded-full"></div>
      </div>
      <p className="text-green-600 text-2xl sm:text-3xl font-semibold mb-4">{subtitle}</p>
      {description && (
        <p className="max-w-2xl mx-auto text-base text-gray-600 sm:text-lg md:text-xl">
          {description}
        </p>
      )}
    </div>
  );
}
