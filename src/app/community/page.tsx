import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/cards/EventCard';
import GroupCard from '@/components/cards/GroupCard';
import SectionHeader from '@/components/SectionHeader';
import eventsData from '@/data/events.json';
import groupsData from '@/data/groups.json';

export const metadata = {
  title: 'Community | TechToEarth',
  description: 'Join our community of tech professionals transitioning to agriculture',
};

export default function CommunityPage() {
  return (
    <div>
      {/* Hero section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader
            tag="Connect"
            title="Join Our Community"
            subtitle="Grow Together With Like-Minded Professionals"
            description="Connect with like-minded professionals, attend events, and be part of a growing movement of tech experts transitioning to agriculture."
            actionButton={{
              text: "View Upcoming Events",
              href: "#events"
            }}
          />
        </div>
      </div>

      {/* Upcoming Events section */}
      <div className="py-8 md:py-12" id="events">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Calendar
              </span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">Upcoming Events</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Join Us and Learn</p>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
              Join us for workshops, webinars, and networking opportunities designed for tech professionals interested in agriculture.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {eventsData.events.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                title={event.title}
                description={event.description}
                date={event.date}
                time={event.time}
                location={event.location}
                isVirtual={event.isVirtual}
                image={event.image}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              View All Events
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Groups section */}
      <div className="py-8 md:py-12 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-left">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Connect
              </span>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-gray-900">Featured Groups</h2>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Find Your Community</p>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl">
              Join specialized groups based on your interests and connect with members who share your passion.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {groupsData.groups.map((group) => (
              <GroupCard
                key={group.id}
                id={group.id}
                name={group.name}
                description={group.description}
                memberCount={group.memberCount}
                category={group.category}
                image={group.image}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/groups"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
            >
              Explore All Groups
            </Link>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-700 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="text-center">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    Join Us
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block mb-2">Ready to Get Involved?</span>
                  <span className="block text-green-200 text-2xl sm:text-3xl">Become Part of Our Community</span>
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-base text-green-100 sm:text-lg md:mt-8 md:text-xl">
                  Create an account to join discussions, RSVP to events, and connect with other members.
                </p>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50"
                  >
                    Sign Up Now
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-green-300 text-base font-medium rounded-md shadow-sm text-white hover:bg-green-800"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
