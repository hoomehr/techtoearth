import Image from 'next/image';
import Link from 'next/link';

// This would typically come from a database
const courses = [
  {
    id: 1,
    title: 'Introduction to Sustainable Farming',
    description: 'Learn the basics of sustainable farming practices and how to apply your tech skills to modern agriculture.',
    longDescription: 'This comprehensive course introduces you to the principles and practices of sustainable farming. You\'ll learn how to leverage your technical background to implement modern agricultural solutions that are environmentally friendly, economically viable, and socially responsible. From soil health to water conservation, crop rotation to integrated pest management, this course covers all the fundamentals you need to start your journey in sustainable agriculture.',
    level: 'Beginner',
    duration: '4 weeks',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Dr. Emily Johnson',
    price: 199,
    topics: ['Soil Health', 'Water Conservation', 'Organic Farming', 'Tech Integration', 'Crop Planning'],
    modules: [
      {
        title: 'Foundations of Sustainable Agriculture',
        lessons: [
          { title: 'Introduction to Sustainable Farming', duration: '45 min' },
          { title: 'Understanding Ecosystems and Biodiversity', duration: '60 min' },
          { title: 'Soil Science Basics', duration: '55 min' },
          { title: 'Water Management Principles', duration: '50 min' },
        ],
      },
      {
        title: 'Tech Applications in Farming',
        lessons: [
          { title: 'IoT and Sensor Technology in Agriculture', duration: '65 min' },
          { title: 'Data Analytics for Farm Management', duration: '70 min' },
          { title: 'Automation and Robotics in Farming', duration: '60 min' },
          { title: 'Building Simple Farm Monitoring Systems', duration: '90 min' },
        ],
      },
      {
        title: 'Practical Implementation',
        lessons: [
          { title: 'Planning Your Sustainable Farm', duration: '75 min' },
          { title: 'Crop Selection and Rotation Strategies', duration: '60 min' },
          { title: 'Integrated Pest Management', duration: '55 min' },
          { title: 'Final Project: Your Farm Tech Plan', duration: '120 min' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Tech Solutions for Agriculture',
    description: 'Discover how to leverage your technical expertise to solve common agricultural challenges.',
    longDescription: 'This intermediate course is designed for tech professionals who want to apply their skills to solve real-world agricultural problems. You\'ll explore how technologies like IoT, AI, machine learning, and data analytics are transforming farming practices. Through case studies and hands-on projects, you\'ll learn to develop and implement technical solutions that address challenges in crop monitoring, resource management, yield prediction, and more.',
    level: 'Intermediate',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    instructor: 'Prof. Michael Chen',
    price: 299,
    topics: ['IoT in Agriculture', 'AI and Machine Learning', 'Precision Farming', 'Data Analytics', 'Smart Irrigation'],
    modules: [
      {
        title: 'Agricultural Technology Overview',
        lessons: [
          { title: 'The AgTech Revolution', duration: '50 min' },
          { title: 'Current Challenges in Agriculture', duration: '55 min' },
          { title: 'Technology Adoption in Farming', duration: '45 min' },
          { title: 'Case Studies: Successful Tech Integration', duration: '60 min' },
        ],
      },
      {
        title: 'Data-Driven Agriculture',
        lessons: [
          { title: 'Collecting and Managing Farm Data', duration: '70 min' },
          { title: 'Predictive Analytics for Crop Yields', duration: '75 min' },
          { title: 'Weather Forecasting and Climate Modeling', duration: '65 min' },
          { title: 'Building a Farm Data Dashboard', duration: '90 min' },
        ],
      },
      {
        title: 'Smart Farming Systems',
        lessons: [
          { title: 'Designing IoT Networks for Farms', duration: '80 min' },
          { title: 'Automated Irrigation Systems', duration: '70 min' },
          { title: 'Drone Technology for Crop Monitoring', duration: '65 min' },
          { title: 'Final Project: Agricultural Tech Solution', duration: '120 min' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Starting Your Own Farm Business',
    description: 'A comprehensive guide to planning, launching, and growing your own agricultural business.',
    longDescription: 'This advanced course provides a complete roadmap for tech professionals looking to start their own farm business. From business planning and financial management to marketing and distribution, you\'ll learn all aspects of running a successful agricultural enterprise. The course emphasizes how to leverage your technical background to create innovative, efficient, and profitable farming operations. You\'ll develop a comprehensive business plan and go-to-market strategy for your farm venture.',
    level: 'Advanced',
    duration: '8 weeks',
    image: 'https://images.unsplash.com/photo-1595508064774-5ff825520ba5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    instructor: 'Sarah Williams, MBA',
    price: 399,
    topics: ['Business Planning', 'Financial Management', 'Marketing', 'Distribution', 'Legal Considerations'],
    modules: [
      {
        title: 'Farm Business Fundamentals',
        lessons: [
          { title: 'Types of Farm Businesses', duration: '55 min' },
          { title: 'Market Research and Opportunity Analysis', duration: '65 min' },
          { title: 'Creating Your Farm Business Plan', duration: '75 min' },
          { title: 'Legal Structures and Regulations', duration: '60 min' },
        ],
      },
      {
        title: 'Financial Planning and Management',
        lessons: [
          { title: 'Startup Costs and Capital Requirements', duration: '70 min' },
          { title: 'Funding Options for Farm Businesses', duration: '65 min' },
          { title: 'Financial Projections and Budgeting', duration: '80 min' },
          { title: 'Risk Management and Insurance', duration: '60 min' },
        ],
      },
      {
        title: 'Operations and Growth',
        lessons: [
          { title: 'Land Acquisition and Infrastructure', duration: '75 min' },
          { title: 'Marketing and Distribution Channels', duration: '70 min' },
          { title: 'Scaling Your Farm Business', duration: '65 min' },
          { title: 'Final Project: Complete Business Plan', duration: '120 min' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Vineyard Management and Wine Production',
    description: 'Learn the art and science of vineyard management and wine production from industry experts.',
    longDescription: 'This specialized course covers all aspects of vineyard management and wine production, from grape cultivation to fermentation, aging, and bottling. You\'ll learn how to apply technical skills to optimize vineyard operations, monitor grape quality, and implement precision viticulture techniques. The course also covers wine chemistry, sensory analysis, and quality control methods. By the end, you\'ll have the knowledge to start or manage a vineyard operation with a focus on producing high-quality wines.',
    level: 'Intermediate',
    duration: '10 weeks',
    image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80',
    instructor: 'Antonio Rossi, Master Vintner',
    price: 499,
    topics: ['Viticulture', 'Enology', 'Wine Chemistry', 'Vineyard Technology', 'Wine Business'],
    modules: [
      {
        title: 'Vineyard Establishment and Management',
        lessons: [
          { title: 'Site Selection and Vineyard Planning', duration: '60 min' },
          { title: 'Grape Varieties and Clones', duration: '70 min' },
          { title: 'Trellising and Canopy Management', duration: '65 min' },
          { title: 'Soil Management and Irrigation', duration: '75 min' },
        ],
      },
      {
        title: 'Wine Production Fundamentals',
        lessons: [
          { title: 'Harvest Decisions and Techniques', duration: '60 min' },
          { title: 'Fermentation Science and Management', duration: '80 min' },
          { title: 'Aging, Fining, and Filtration', duration: '70 min' },
          { title: 'Blending and Bottling', duration: '65 min' },
        ],
      },
      {
        title: 'Technology in Viticulture and Enology',
        lessons: [
          { title: 'Precision Viticulture Technologies', duration: '75 min' },
          { title: 'Monitoring and Control Systems', duration: '70 min' },
          { title: 'Data Analytics for Wine Quality', duration: '65 min' },
          { title: 'Final Project: Vineyard Tech Integration Plan', duration: '120 min' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Craft Brewing Fundamentals',
    description: 'Master the fundamentals of craft brewing and learn how to start your own microbrewery.',
    longDescription: 'This course provides a comprehensive introduction to craft brewing, covering everything from ingredients and brewing processes to equipment setup and business operations. You\'ll learn the science behind brewing different styles of beer and how to apply technical skills to optimize brewing operations. The course also covers quality control, packaging, and distribution. By the end, you\'ll have the knowledge and skills to start your own microbrewery or work in the craft brewing industry.',
    level: 'Beginner',
    duration: '6 weeks',
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    instructor: 'James Miller, Master Brewer',
    price: 299,
    topics: ['Brewing Science', 'Beer Styles', 'Equipment Setup', 'Quality Control', 'Brewery Business'],
    modules: [
      {
        title: 'Brewing Fundamentals',
        lessons: [
          { title: 'Introduction to Brewing Science', duration: '60 min' },
          { title: 'Ingredients: Malt, Hops, Yeast, and Water', duration: '75 min' },
          { title: 'The Brewing Process Overview', duration: '65 min' },
          { title: 'Beer Styles and Characteristics', duration: '70 min' },
        ],
      },
      {
        title: 'Brewing Equipment and Techniques',
        lessons: [
          { title: 'Brewery Setup and Equipment', duration: '80 min' },
          { title: 'Mashing and Lautering Techniques', duration: '65 min' },
          { title: 'Boiling, Cooling, and Fermentation', duration: '70 min' },
          { title: 'Conditioning, Carbonation, and Packaging', duration: '65 min' },
        ],
      },
      {
        title: 'Brewery Operations',
        lessons: [
          { title: 'Quality Control and Testing', duration: '60 min' },
          { title: 'Recipe Development and Scaling', duration: '75 min' },
          { title: 'Brewery Management Systems', duration: '65 min' },
          { title: 'Final Project: Brewery Business Plan', duration: '120 min' },
        ],
      },
    ],
  },
  {
    id: 6,
    title: 'Farm-to-Table Restaurant Management',
    description: 'Learn how to create and manage a successful farm-to-table restaurant concept.',
    longDescription: 'This advanced course covers all aspects of creating and managing a farm-to-table restaurant, from concept development and menu planning to sourcing, operations, and marketing. You\'ll learn how to build relationships with local farmers, create seasonal menus, and implement sustainable practices throughout your restaurant. The course emphasizes how to leverage technology for inventory management, supplier relationships, and customer engagement. By the end, you\'ll have a complete business plan for a farm-to-table restaurant.',
    level: 'Advanced',
    duration: '12 weeks',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80',
    instructor: 'Chef Maria Rodriguez',
    price: 599,
    topics: ['Restaurant Concept', 'Menu Planning', 'Local Sourcing', 'Sustainable Operations', 'Culinary Techniques'],
    modules: [
      {
        title: 'Farm-to-Table Concept Development',
        lessons: [
          { title: 'The Farm-to-Table Philosophy', duration: '55 min' },
          { title: 'Restaurant Concept and Brand Development', duration: '70 min' },
          { title: 'Location Selection and Design', duration: '65 min' },
          { title: 'Building Your Culinary Team', duration: '60 min' },
        ],
      },
      {
        title: 'Sourcing and Menu Management',
        lessons: [
          { title: 'Building Relationships with Local Producers', duration: '75 min' },
          { title: 'Seasonal Menu Planning and Development', duration: '80 min' },
          { title: 'Inventory Management and Cost Control', duration: '70 min' },
          { title: 'Sustainable Practices in Restaurant Operations', duration: '65 min' },
        ],
      },
      {
        title: 'Restaurant Operations and Marketing',
        lessons: [
          { title: 'Service Standards and Staff Training', duration: '60 min' },
          { title: 'Technology Systems for Restaurant Management', duration: '70 min' },
          { title: 'Marketing Your Farm-to-Table Concept', duration: '75 min' },
          { title: 'Final Project: Restaurant Business Plan', duration: '120 min' },
        ],
      },
    ],
  },
];

export async function generateMetadata({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return {
      title: 'Course Not Found',
      description: 'The requested course could not be found',
    };
  }

  return {
    title: `${course.title} | TechToEarth Courses`,
    description: course.description,
  };
}

export default async function CourseDetailsPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id);
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <div className="bg-yellow-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Course Not Found</h1>
            <p className="mt-4 text-xl text-gray-500">The course you're looking for doesn't exist or has been removed.</p>
            <div className="mt-10">
              <Link href="/courses" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Back to Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 min-h-screen">
      {/* Hero section */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image
            className="h-full w-full object-cover"
            src={course.image}
            alt={course.title}
            fill
            priority
          />
          <div className="absolute inset-0 bg-green-800 mix-blend-multiply opacity-70" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {course.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-white">
            {course.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {course.level}
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {course.duration}
            </span>
            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              ${course.price}
            </span>
          </div>
        </div>
      </div>

      {/* Course details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="prose prose-green prose-lg max-w-none">
              <h2>About This Course</h2>
              <p>{course.longDescription}</p>

              <h2 className="mt-12">What You'll Learn</h2>
              <ul>
                {course.topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>

              <h2 className="mt-12">Course Content</h2>
              <div className="mt-8 space-y-8">
                {course.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-5 sm:px-6">
                      <h3 className="text-lg font-medium text-gray-900">Module {moduleIndex + 1}: {module.title}</h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <ul className="divide-y divide-gray-200">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex} className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-green-600 truncate">
                                Lesson {lessonIndex + 1}: {lesson.title}
                              </p>
                              <div className="ml-2 flex-shrink-0 flex">
                                <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden sticky top-8">
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
                        <div className="text-3xl font-bold text-gray-900">${course.price}</div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-5 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Enroll Now
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Add to Wishlist
                  </button>
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
                        {course.modules.reduce((total, module) => total + module.lessons.length, 0)} on-demand video lessons
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

            <div className="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Your Instructor</h3>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-800 font-medium text-lg">
                        {course.instructor.split(' ').map(name => name[0]).join('')}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium text-gray-900">{course.instructor}</h4>
                    <p className="text-sm text-gray-500">Expert in {course.topics[0]} and {course.topics[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related courses */}
      <div className="bg-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900">Related Courses</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter(c => c.id !== course.id && c.level === course.level)
              .slice(0, 3)
              .map((relatedCourse) => (
                <div key={relatedCourse.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0 h-48 w-full relative">
                    <Image
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {relatedCourse.level}
                        </span>
                        <span className="text-sm text-gray-500">{relatedCourse.duration}</span>
                      </div>
                      <Link href={`/courses/${relatedCourse.id}`} className="block mt-2">
                        <p className="text-xl font-semibold text-gray-900">{relatedCourse.title}</p>
                        <p className="mt-3 text-base text-gray-500">{relatedCourse.description}</p>
                      </Link>
                    </div>
                    <div className="mt-6">
                      <Link
                        href={`/courses/${relatedCourse.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        View Course
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
