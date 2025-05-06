export interface EnrollCourseCardProps {
  price: number;
  instructor: {
    name: string;
    expertise: string[];
    initials: string;
  };
  isEnrolled?: boolean;
  enrolling?: boolean;
  onEnroll?: () => void;
  onUnenroll?: () => void;
  enrollmentCount?: number;
}

export default function EnrollCourseCard({
  price,
  instructor,
  isEnrolled = false,
  enrolling = false,
  onEnroll,
  onUnenroll,
  enrollmentCount = 0
}: EnrollCourseCardProps) {
  return (
    <div className="space-y-6">
      {/* Enrollment Card */}
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{
          boxShadow: '0 0 20px rgba(0, 128, 0, 0.15)'
        }}
      >
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Enroll in this course</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Gain full access to all course materials, projects, and instructor support.</p>
          </div>
          <div className="mt-5">
            <div className="rounded-md bg-gray-50 px-6 py-5 sm:flex sm:items-start">
              <div className="mt-3 sm:mt-0 sm:ml-4">
                <div className="text-sm font-medium text-gray-900">Course Price</div>
                <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                  <div className="text-3xl font-bold text-gray-900">${price}</div>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <span className="font-medium">{enrollmentCount}</span> students enrolled
                </div>
              </div>
            </div>
            {isEnrolled ? (
              <button
                type="button"
                onClick={onUnenroll}
                disabled={enrolling}
                className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 disabled:opacity-50"
              >
                {enrolling ? 'Processing...' : 'Unenroll from Course'}
              </button>
            ) : (
              <button
                type="button"
                onClick={onEnroll}
                disabled={enrolling}
                className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
              >
                {enrolling ? 'Processing...' : 'Enroll Now (Free)'}
              </button>
            )}
            {!isEnrolled && (
              <button
                type="button"
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add to Wishlist
              </button>
            )}
          </div>
        </div>
        <div className="px-4 py-5 bg-gray-50 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">This course includes:</h3>
          <div className="mt-6 space-y-4">
            <div className="flex">
              <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  On-demand video lessons
                </p>
              </div>
            </div>
            <div className="flex">
              <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Downloadable resources and projects
                </p>
              </div>
            </div>
            <div className="flex">
              <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Full lifetime access
                </p>
              </div>
            </div>
            <div className="flex">
              <svg className="flex-shrink-0 h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-gray-700">
                  Certificate of completion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructor Card */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Your Instructor</h3>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-800 font-medium text-lg">
                  {instructor.initials}
                </span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-base font-medium text-gray-900">{instructor.name}</h4>
              <p className="text-sm text-gray-500">
                Expert in {instructor.expertise.join(' and ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
