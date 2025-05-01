import Image from 'next/image';
import Link from 'next/link';
import EventCard from '@/components/cards/EventCard';
import GroupCard from '@/components/cards/GroupCard';
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
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Join Our Community</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect with like-minded professionals, attend events, and be part of a growing movement of tech experts transitioning to agriculture.
            </p>
          </div>
        </div>
      </div>

      {/* Upcoming Events section */}
      <div className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Calendar</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Events
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
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
      <div className="py-12 md:py-16 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Connect</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Featured Groups
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
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
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to get involved?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-green-200">
                  Create an account to join discussions, RSVP to events, and connect with other members.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
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
