import Image from "next/image";
import Link from "next/link";
import SuccessStoryCard from "@/components/cards/SuccessStoryCard";
import SectionHeader from "@/components/SectionHeader";
import successStoriesData from "@/data/successStories.json";

export default function Home() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative mt-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden" style={{ boxShadow: '0 0 30px rgba(0, 128, 0, 0.3)' }}>
            <div className="absolute inset-0">
              <Image
                className="h-full w-full object-cover"
                src="https://placehold.co/1920x1080/4B7F52/FFFFFF?text=TechToEarth+Hero+Image"
                alt="People working on farms"
                fill
                priority
              />
              <div className="absolute inset-0 bg-green-800 mix-blend-multiply opacity-80" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    Welcome
                  </span>
                </div>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                  <span className="block text-white drop-shadow-lg mb-2" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Your New Career Begins Here</span>
                  <span className="block text-green-200 text-3xl sm:text-4xl md:text-5xl">From Tech to Agriculture</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                  A platform for tech professionals looking to transition into agriculture, food, and beverage industries.
                </p>
              </div>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link
                    href="/courses"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 sm:px-8"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 sm:px-8"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Success Stories
              </span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">From Tech to Earth</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Real Transitions</p>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
              Meet some of our members who successfully made the leap from tech careers to agriculture.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {successStoriesData.successStories.slice(0, 3).map((story) => (
              <SuccessStoryCard
                key={story.id}
                name={story.name}
                formerRole={story.formerRole}
                currentRole={story.currentRole}
                testimonial={story.testimonial}
                transitionYear={story.transitionYear}
                imageSrc={story.imageSrc}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Our Platform
              </span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">Everything You Need</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">To Transition to Agriculture</p>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
              We provide the knowledge, community, and resources to help you make a successful career change.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Comprehensive Courses</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Learn from industry experts with practical, hands-on courses designed for tech professionals.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Supportive Community</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Connect with like-minded professionals who have made or are making the transition.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Career Opportunities</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Discover job opportunities, internships, and apprenticeships in agriculture and food industries.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Practical Resources</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Access guides, tools, and resources to help you navigate your career transition successfully.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            tag="Join Us"
            title="Ready to Start Your Journey?"
            subtitle="Join Our Community Today"
            actionButton={{
              text: "Get Started",
              href: "/register"
            }}
          />

          <div className="mt-4 flex justify-center">
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50 shadow-md"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
