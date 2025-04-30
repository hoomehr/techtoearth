import Image from 'next/image';

export const metadata = {
  title: 'About | TechToEarth',
  description: 'Learn about our mission to help tech professionals transition to agriculture',
};

export default function AboutPage() {
  return (
    <div className="bg-yellow-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">About TechToEarth</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our mission is to help tech professionals successfully transition to fulfilling careers in agriculture, food, and beverage industries.
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Our Story</h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                TechToEarth was founded by a group of former tech professionals who successfully made the transition to agriculture and food-related industries. We understand the challenges and opportunities that come with this career change.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                After experiencing our own transitions, we realized there was a need for a dedicated platform to help others make this journey. We created TechToEarth to provide the resources, community, and knowledge we wish we had when we started.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 relative h-64 lg:h-96">
              <Image
                className="rounded-lg shadow-lg object-cover"
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Our team"
                fill
              />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="mt-8 lg:mt-0 relative h-64 lg:h-96 lg:order-first">
              <Image
                className="rounded-lg shadow-lg object-cover"
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Our mission"
                fill
              />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Our Mission</h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                We believe that the skills developed in the tech industry—problem-solving, innovation, systems thinking—are incredibly valuable in agriculture and food production. Our mission is to help tech professionals leverage these skills in their new careers.
              </p>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                We're committed to supporting sustainable and regenerative practices in agriculture, and we believe that the influx of talent from the tech industry can help drive innovation and positive change in how we grow and produce food.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl text-center">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Innovation</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We believe in applying innovative thinking and technology to solve agricultural challenges and create more sustainable food systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Community</h3>
                  <p className="mt-5 text-base text-gray-500">
                    We foster a supportive community where knowledge is shared freely and connections are made to help everyone succeed in their transition.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Sustainability</h3>
                  <p className="mt-5 text-base text-gray-500">
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
