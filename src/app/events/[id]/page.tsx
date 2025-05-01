import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiCalendar, FiClock, FiMapPin, FiMonitor, FiUsers, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import eventsData from '@/data/events.json';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Find the event with the matching ID
  const eventId = parseInt(params.id);
  const event = eventsData.events.find(e => e.id === eventId);

  // Show 404 if event not found
  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: '#b3dfa1',
      backgroundImage: 'linear-gradient(315deg, #b3dfa1 0%, #f0e703 74%)'
    }}>
      {/* Background decorative elements */}
      <div className="fixed top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="fixed bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="fixed top-1/3 left-1/4 w-40 h-40 bg-green-300 rounded-full opacity-10 blur-2xl z-0"></div>
      <div className="fixed bottom-1/3 right-1/4 w-60 h-60 bg-yellow-300 rounded-full opacity-10 blur-2xl z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href="/community"
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <FiArrowLeft className="mr-2" /> Back to Events
          </Link>
        </div>

        {/* Event header */}
        <div className="mb-8 text-left">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {event.isVirtual ? 'Virtual Event' : 'In-Person Event'}
            </span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              {event.title}
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">{event.date}</p>
            <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
          </div>
        </div>

        {/* Event content */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          {/* Event image */}
          <div className="relative h-96 w-full">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
          </div>

          {/* Event details */}
          <div className="p-8">
            <div className="flex flex-wrap gap-6 mb-8 bg-green-50 p-6 rounded-lg">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <FiCalendar className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{event.date}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <FiClock className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{event.time}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  {event.isVirtual ? (
                    <FiMonitor className="text-green-600 text-xl" />
                  ) : (
                    <FiMapPin className="text-green-600 text-xl" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-500">{event.isVirtual ? 'Platform' : 'Location'}</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-3">
                  <FiUsers className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Attendees</p>
                  <p className="font-medium">42 registered</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">{event.description}</p>
                <p className="mb-4">
                  Join us for this {event.isVirtual ? 'virtual' : 'in-person'} event where we'll explore the intersection of technology and agriculture. Whether you're a seasoned professional or just starting your journey, this event offers valuable insights and networking opportunities.
                </p>
                <p>
                  Don't miss this chance to connect with like-minded individuals and learn from experts in the field. Registration is required, and space is limited, so secure your spot today!
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Register Now
              </button>
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <FiShare2 className="mr-2" /> Share Event
              </button>
            </div>
          </div>
        </div>

        {/* Related events section */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">More Events You Might Like</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-transparent rounded-full mt-2"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {eventsData.events
              .filter(e => e.id !== event.id)
              .slice(0, 3)
              .map(relatedEvent => (
                <div key={relatedEvent.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-40 relative">
                    <Image
                      src={relatedEvent.image}
                      alt={relatedEvent.title}
                      fill
                      className="object-cover"
                      unoptimized={true}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-green-600">{relatedEvent.date}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {relatedEvent.isVirtual ? 'Virtual' : 'In-Person'}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{relatedEvent.title}</h3>
                    <Link
                      href={`/events/${relatedEvent.id}`}
                      className="text-sm text-green-600 hover:text-green-500 mt-2 inline-block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
