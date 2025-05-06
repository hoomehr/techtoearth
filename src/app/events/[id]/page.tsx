'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiMonitor, FiUsers, FiArrowLeft, FiShare2, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

export default function EventDetailPage() {
  const params = useParams();
  // Access the id directly from params
  const eventId = parseInt(params.id as string);
  const [event, setEvent] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchEvent() {
      try {
        // Fetch the specific event
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEvent(data);

        // Check if user is registered for this event
        if (user && data.attendees) {
          setIsRegistered(data.attendees.includes(user.id));
        }

        // Fetch all events for related events section
        const allEventsResponse = await fetch('/api/events');
        const allEventsData = await allEventsResponse.json();
        setRelatedEvents(allEventsData.events.filter(e => e.id !== eventId).slice(0, 3));
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [eventId, user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading Event...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Show 404 if event not found
  if (!event) {
    notFound();
  }

  const handleRegister = async () => {
    if (!user) {
      alert('Please sign in to register for this event');
      return;
    }

    setRegistering(true);
    try {
      console.log('Registering for event:', event.id, 'User:', user.id);

      // First, check if the user and event exist in the database
      const checkUserResponse = await fetch(`/api/users/${user.id}`);
      if (!checkUserResponse.ok) {
        throw new Error('User not found in the database. Please log out and log in again.');
      }

      const checkEventResponse = await fetch(`/api/events/${event.id}`);
      if (!checkEventResponse.ok) {
        throw new Error('Event not found in the database.');
      }

      // Now proceed with registration
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: parseInt(event.id),
          userId: parseInt(user.id)
        }),
      });

      const data = await response.json();
      console.log('Registration response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register for event');
      }

      setIsRegistered(true);
      // Update the event data with the returned event object
      if (data.event) {
        setEvent(data.event);
      } else {
        // Refresh the event data if the returned data doesn't include the event
        const refreshResponse = await fetch(`/api/events/${event.id}`);
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setEvent(refreshData);
        }
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      alert(error.message || 'Failed to register for event');
    } finally {
      setRegistering(false);
    }
  };

  const handleUnregister = async () => {
    if (!user) {
      return;
    }

    setRegistering(true);
    try {
      console.log('Unregistering from event:', event.id, 'User:', user.id);

      const response = await fetch('/api/events/register', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: parseInt(event.id),
          userId: parseInt(user.id)
        }),
      });

      const data = await response.json();
      console.log('Unregistration response:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to unregister from event');
      }

      setIsRegistered(false);
      // Update the event data with the returned event object
      if (data.event) {
        setEvent(data.event);
      } else {
        // Refresh the event data if the returned data doesn't include the event
        const refreshResponse = await fetch(`/api/events/${event.id}`);
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          setEvent(refreshData);
        }
      }
    } catch (error) {
      console.error('Error unregistering from event:', error);
      alert(error.message || 'Failed to unregister from event');
    } finally {
      setRegistering(false);
    }
  };

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
          <div className="flex justify-between items-start mb-4">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {event.isVirtual ? 'Virtual Event' : 'In-Person Event'}
              </span>
            </div>
            {(user?.isAdmin || (user?.isCreator && event.creatorId === user.id)) && (
              <Link
                href={`/admin/edit-event/${event.id}`}
                className="inline-flex items-center px-4 py-1.5 border border-green-300 rounded-full text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
              >
                <FiEdit2 className="mr-2 h-4 w-4" />
                Edit Event
              </Link>
            )}
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
                  <p className="font-medium">{event.attendeeCount || 0} registered</p>
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
              {isRegistered ? (
                <button
                  onClick={handleUnregister}
                  disabled={registering}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {registering ? 'Processing...' : 'Cancel Registration'}
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  {registering ? 'Processing...' : 'Register Now'}
                </button>
              )}
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
            {relatedEvents.map(relatedEvent => (
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
