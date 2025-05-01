'use client';

interface SectionHeaderWithFadingBarProps {
  tag: string;
  title: string;
  subtitle: string;
  description?: string;
  actionButton?: {
    text: string;
    href: string;
  };
  className?: string;
}

export default function SectionHeaderWithFadingBar({
  tag,
  title,
  subtitle,
  description,
  actionButton,
  className = '',
}: SectionHeaderWithFadingBarProps) {
  return (
    <div className={`mb-10 text-left ${className}`}>
      <div className="inline-block mb-4">
        <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
          {tag}
        </span>
      </div>
      <div className="mb-2">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="flex items-center mb-4">
        <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">{subtitle}</p>
        <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
      </div>
      {description && (
        <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl mb-6">
          {description}
        </p>
      )}
      {actionButton && (
        <div>
          <a 
            href={actionButton.href} 
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md"
          >
            {actionButton.text}
          </a>
        </div>
      )}
    </div>
  );
}
