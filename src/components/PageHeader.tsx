'use client';

interface PageHeaderProps {
  tag: string;
  title: string;
  subtitle: string;
  subtitle2?: string;
  actionButton?: {
    text: string;
    href: string;
  };
}

export default function PageHeader({ tag, title, subtitle, subtitle2, actionButton }: PageHeaderProps) {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {tag}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block mb-2">{title}</span>
            <span className="block text-green-600 text-3xl sm:text-4xl md:text-5xl">{subtitle}</span>
          </h1>
          {subtitle2 && (
            <p className="mt-6 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
              {subtitle2}
            </p>
          )}
          
          {actionButton && (
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a 
                  href={actionButton.href} 
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  {actionButton.text}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
