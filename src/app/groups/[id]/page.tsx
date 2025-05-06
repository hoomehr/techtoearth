'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FiUsers, FiCalendar, FiMessageSquare, FiArrowLeft, FiShare2, FiUserPlus, FiEdit2 } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

export default function GroupDetailPage() {
  const params = useParams();
  // Access the id directly from params
  const groupId = parseInt(params.id as string);
  const [group, setGroup] = useState(null);
  const [relatedGroups, setRelatedGroups] = useState([]);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch the specific group
        const response = await fetch(`/api/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        const data = await response.json();
        setGroup(data);

        // Check if user is a member of this group
        if (user && data.members) {
          setIsMember(data.members.includes(user.id));
        }

        // Fetch all groups for related groups section
        const allGroupsResponse = await fetch('/api/groups');
        const allGroupsData = await allGroupsResponse.json();
        setRelatedGroups(
          allGroupsData.groups
            .filter(g => g.id !== groupId && g.category === data.category)
            .slice(0, 3)
        );

        // Fetch events for related events section
        const eventsResponse = await fetch('/api/events');
        const eventsData = await eventsResponse.json();
        setRelatedEvents(eventsData.events.slice(0, 2));
      } catch (error) {
        console.error('Error fetching group data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [groupId, user]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading Group...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Show 404 if group not found
  if (!group) {
    notFound();
  }

  const handleJoin = async () => {
    if (!user) {
      alert('Please sign in to join this group');
      return;
    }

    setJoining(true);
    try {
      const response = await fetch('/api/groups/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: group.id,
          userId: user.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to join group');
      }

      setIsMember(true);
      // Update the group data with the returned group object
      if (data.group) {
        setGroup(data.group);
      }
    } catch (error) {
      console.error('Error joining group:', error);
      alert(error.message || 'Failed to join group');
    } finally {
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    if (!user) {
      return;
    }

    setJoining(true);
    try {
      const response = await fetch('/api/groups/join', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          groupId: group.id,
          userId: user.id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to leave group');
      }

      setIsMember(false);
      // Update the group data with the returned group object
      if (data.group) {
        setGroup(data.group);
      }
    } catch (error) {
      console.error('Error leaving group:', error);
      alert(error.message || 'Failed to leave group');
    } finally {
      setJoining(false);
    }
  };

  // Generate random discussion topics
  const discussionTopics = [
    {
      id: 1,
      title: `Latest trends in ${group.category}`,
      author: "Sarah Johnson",
      replies: 24,
      lastActivity: "2 days ago"
    },
    {
      id: 2,
      title: `Resources for beginners in ${group.category}`,
      author: "Michael Chen",
      replies: 18,
      lastActivity: "5 days ago"
    },
    {
      id: 3,
      title: `Challenges and solutions in ${group.name}`,
      author: "Emily Rodriguez",
      replies: 32,
      lastActivity: "1 day ago"
    }
  ];

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
            <FiArrowLeft className="mr-2" /> Back to Groups
          </Link>
        </div>

        {/* Group header */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
          <div className="relative h-80 w-full">
            <Image
              src={group.image}
              alt={group.name}
              fill
              className="object-cover"
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex justify-between items-start w-full">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {group.category}
                  </span>
                </div>
                {(user?.isAdmin || (user?.isCreator && group.creatorId === user.id)) && (
                  <Link
                    href={`/admin/edit-group/${group.id}`}
                    className="inline-flex items-center px-4 py-1.5 border border-green-300 rounded-full text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <FiEdit2 className="mr-2 h-4 w-4" />
                    Edit Group
                  </Link>
                )}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-2">
                {group.name}
              </h1>
              <div className="flex items-center">
                <FiUsers className="mr-2" /> {group.memberCount} members
              </div>
            </div>
          </div>

          {/* Group details */}
          <div className="p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {isMember ? (
                <button
                  onClick={handleLeave}
                  disabled={joining}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  {joining ? 'Processing...' : 'Leave Group'}
                </button>
              ) : (
                <button
                  onClick={handleJoin}
                  disabled={joining}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  <FiUserPlus className={joining ? 'hidden' : 'mr-2'} />
                  {joining ? 'Processing...' : 'Join Group'}
                </button>
              )}
              <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <FiShare2 className="mr-2" /> Share Group
              </button>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Group</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">{group.description}</p>
                <p className="mb-4">
                  Our community is dedicated to sharing knowledge, resources, and opportunities in the field of {group.category.toLowerCase()}.
                  Whether you're just starting your journey or are an experienced professional, you'll find valuable connections and insights here.
                </p>
                <p>
                  We host regular virtual and in-person events, maintain an active discussion forum, and share the latest news and resources in our field.
                  Join us today to become part of this growing community!
                </p>
              </div>
            </div>

            {/* Discussion topics */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Recent Discussions</h2>
                <button className="text-green-600 hover:text-green-700 font-medium">View All</button>
              </div>
              <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
                {discussionTopics.map(topic => (
                  <div key={topic.id} className="p-4 hover:bg-gray-100 transition-colors duration-150">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{topic.title}</h3>
                        <p className="text-sm text-gray-500">Started by {topic.author}</p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <div className="flex items-center">
                          <FiMessageSquare className="mr-1" /> {topic.replies} replies
                        </div>
                        <div>Last activity: {topic.lastActivity}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming events */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Group Events</h2>
                <button className="text-green-600 hover:text-green-700 font-medium">View All</button>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {relatedEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
                    <div className="md:flex">
                      <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 relative">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <FiCalendar className="mr-1" /> {event.date}
                          </div>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {event.isVirtual ? 'Virtual' : 'In-Person'}
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{event.description}</p>
                        <Link
                          href={`/events/${event.id}`}
                          className="text-sm text-green-600 hover:text-green-500 inline-block"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Similar groups */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Similar Groups You Might Like</h2>
            <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-transparent rounded-full mt-2"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {relatedGroups.map(relatedGroup => (
              <div key={relatedGroup.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 relative">
                  <Image
                    src={relatedGroup.image}
                    alt={relatedGroup.name}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {relatedGroup.category}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <FiUsers className="mr-1" /> {relatedGroup.memberCount}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1">{relatedGroup.name}</h3>
                  <Link
                    href={`/groups/${relatedGroup.id}`}
                    className="text-sm text-green-600 hover:text-green-500 mt-2 inline-block"
                  >
                    View Group →
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
