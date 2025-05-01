import Image from 'next/image';
import SectionHeaderWithFadingBar from '@/components/SectionHeaderWithFadingBar';

export const metadata = {
  title: 'About | TechToEarth',
  description: 'Learn about our mission to help tech professionals transition to agriculture',
};

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-green-300 rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-yellow-300 rounded-full opacity-10 blur-2xl"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Our Story
            </span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              About TechToEarth
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Bridging Technology and Agriculture</p>
            <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
          </div>
          <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
            Our mission is to help tech professionals successfully transition to fulfilling careers in agriculture, food, and beverage industries.
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mr-4">Our Beginnings</h2>
                  <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                </div>
                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                  TechToEarth was founded by a group of former tech professionals who successfully made the transition to agriculture and food-related industries. We understand the challenges and opportunities that come with this career change.
                </p>
                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                  After experiencing our own transitions, we realized there was a need for a dedicated platform to help others make this journey. We created TechToEarth to provide the resources, community, and knowledge we wish we had when we started.
                </p>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 relative h-64 lg:h-96 overflow-hidden rounded-lg shadow-lg group">
              <Image
                className="rounded-lg object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Our team"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="mt-8 lg:mt-0 relative h-64 lg:h-96 lg:order-first overflow-hidden rounded-lg shadow-lg group">
              <Image
                className="rounded-lg object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Our mission"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-l from-green-500 to-transparent opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent opacity-40"></div>
            </div>
            <div>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mr-4">Our Mission</h2>
                  <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                </div>
                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                  We believe that the skills developed in the tech industry—problem-solving, innovation, systems thinking—are incredibly valuable in agriculture and food production. Our mission is to help tech professionals leverage these skills in their new careers.
                </p>
                <p className="mt-3 max-w-3xl text-lg text-gray-600">
                  We're committed to supporting sustainable and regenerative practices in agriculture, and we believe that the influx of talent from the tech industry can help drive innovation and positive change in how we grow and produce food.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-10">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl mr-4">Our Values</h2>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="text-green-600 text-xl font-semibold mb-4">What Drives Us Forward</p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovation</h3>
                  <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <p className="mt-5 text-base text-gray-600">
                    We believe in applying innovative thinking and technology to solve agricultural challenges and create more sustainable food systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Community</h3>
                  <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <p className="mt-5 text-base text-gray-600">
                    We foster a supportive community where knowledge is shared freely and connections are made to help everyone succeed in their transition.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg px-6 pb-8 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-green-100">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Sustainability</h3>
                  <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  <p className="mt-5 text-base text-gray-600">
                    We're committed to promoting sustainable and regenerative practices that benefit the environment, communities, and future generations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
