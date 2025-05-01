'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiBook, FiUsers, FiCalendar, FiSettings, FiHeart, FiBookmark, FiClock, FiMapPin, FiMonitor } from 'react-icons/fi';
import coursesData from '@/data/courses.json';
import eventsData from '@/data/events.json';
import groupsData from '@/data/groups.json';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('courses');

  // Mock user data
  const user = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://placehold.co/400x400/4B7F52/FFFFFF?text=JS',
    bio: 'Former software engineer transitioning to sustainable agriculture. Passionate about permaculture and regenerative farming practices.',
    location: 'Portland, OR',
    joinedDate: 'January 2023',
  };

  // Mock enrolled courses (using a subset of the courses data)
  const enrolledCourses = coursesData.courses.slice(0, 3);

  // Mock saved events (using a subset of the events data)
  const savedEvents = eventsData.events.slice(0, 4);

  // Mock joined groups (using a subset of the groups data)
  const joinedGroups = groupsData.groups.slice(0, 2);

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
        {/* Profile header */}
        <div className="mb-12 text-left">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Dashboard
            </span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              My Profile
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Personal Learning Journey</p>
            <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
          <div className="md:flex items-start">
            <div className="md:flex-shrink-0 mb-4 md:mb-0 md:mr-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-transparent rounded-full my-2"></div>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                    <FiSettings className="mr-2" /> Edit Profile
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">{user.bio}</p>
              </div>
              <div className="flex flex-wrap text-sm text-gray-600">
                <div className="mr-6 mb-2">
                  <span className="font-medium">Location:</span> {user.location}
                </div>
                <div className="mr-6 mb-2">
                  <span className="font-medium">Member since:</span> {user.joinedDate}
                </div>
                <div className="mr-6 mb-2">
                  <span className="font-medium">Courses:</span> {enrolledCourses.length}
                </div>
                <div className="mr-6 mb-2">
                  <span className="font-medium">Groups:</span> {joinedGroups.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard tabs */}
        <div className="mb-6">
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-2">
            <nav className="flex flex-wrap">
              <button
                onClick={() => setActiveTab('courses')}
                className={`${
                  activeTab === 'courses'
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                } flex items-center px-4 py-3 font-medium text-sm rounded-md m-1 transition-all duration-200 border-l-4`}
              >
                <div className={`p-2 rounded-full mr-2 ${activeTab === 'courses' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <FiBook className={`${activeTab === 'courses' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                My Courses
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`${
                  activeTab === 'groups'
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                } flex items-center px-4 py-3 font-medium text-sm rounded-md m-1 transition-all duration-200 border-l-4`}
              >
                <div className={`p-2 rounded-full mr-2 ${activeTab === 'groups' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <FiUsers className={`${activeTab === 'groups' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                My Groups
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`${
                  activeTab === 'events'
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                } flex items-center px-4 py-3 font-medium text-sm rounded-md m-1 transition-all duration-200 border-l-4`}
              >
                <div className={`p-2 rounded-full mr-2 ${activeTab === 'events' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <FiCalendar className={`${activeTab === 'events' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                My Events
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`${
                  activeTab === 'saved'
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                } flex items-center px-4 py-3 font-medium text-sm rounded-md m-1 transition-all duration-200 border-l-4`}
              >
                <div className={`p-2 rounded-full mr-2 ${activeTab === 'saved' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <FiBookmark className={`${activeTab === 'saved' ? 'text-green-600' : 'text-gray-500'}`} />
                </div>
                Saved Items
              </button>
            </nav>
          </div>
        </div>

        {/* Tab content */}
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-6">
          {/* Courses tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900 mr-4">My Enrolled Courses</h2>
                    <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  </div>
                </div>
                <Link
                  href="/courses"
                  className="text-sm font-medium text-green-600 hover:text-green-500 ml-4 whitespace-nowrap"
                >
                  Browse More Courses
                </Link>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="text-center py-8">
                  <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No courses yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by enrolling in a course.</p>
                  <div className="mt-6">
                    <Link
                      href="/courses"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Browse Courses
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="h-40 relative">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-20 opacity-60"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {course.level}
                            </span>
                            <span className="text-white text-sm">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="bg-gray-100 rounded-full h-2 w-full mr-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${Math.floor(Math.random() * 100)}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap">In Progress</span>
                        </div>
                        <div className="mt-4">
                          <Link
                            href={`/courses/${course.id}`}
                            className="text-sm font-medium text-green-600 hover:text-green-500"
                          >
                            Continue Learning →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Groups tab */}
          {activeTab === 'groups' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900 mr-4">My Groups</h2>
                    <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  </div>
                </div>
                <Link
                  href="/community"
                  className="text-sm font-medium text-green-600 hover:text-green-500 ml-4 whitespace-nowrap"
                >
                  Find More Groups
                </Link>
              </div>

              {joinedGroups.length === 0 ? (
                <div className="text-center py-8">
                  <FiUsers className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No groups yet</h3>
                  <p className="mt-1 text-sm text-gray-500">Join a group to connect with like-minded individuals.</p>
                  <div className="mt-6">
                    <Link
                      href="/community"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Browse Groups
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {joinedGroups.map((group) => (
                    <div key={group.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      <div className="md:flex">
                        <div className="md:flex-shrink-0 h-48 md:h-auto md:w-48 relative">
                          <Image
                            src={group.image}
                            alt={group.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                        </div>
                        <div className="p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {group.category}
                              </span>
                              <span className="text-sm text-gray-500 flex items-center">
                                <FiUsers className="mr-1" /> {group.memberCount} members
                              </span>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">{group.name}</h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{group.description}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <Link
                              href={`/groups/${group.id}`}
                              className="text-sm font-medium text-green-600 hover:text-green-500"
                            >
                              View Group →
                            </Link>
                            <button className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                              Leave Group
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Events tab */}
          {activeTab === 'events' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900 mr-4">My Upcoming Events</h2>
                    <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  </div>
                </div>
                <Link
                  href="/community"
                  className="text-sm font-medium text-green-600 hover:text-green-500 ml-4 whitespace-nowrap"
                >
                  Find More Events
                </Link>
              </div>

              {savedEvents.length === 0 ? (
                <div className="text-center py-8">
                  <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No events yet</h3>
                  <p className="mt-1 text-sm text-gray-500">RSVP to events to see them here.</p>
                  <div className="mt-6">
                    <Link
                      href="/community"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                    >
                      Browse Events
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedEvents.map((event) => (
                    <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                      {/* Full width image at the top */}
                      <div className="relative h-48 md:h-56 w-full">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                          unoptimized={true}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex justify-between items-center">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {event.isVirtual ? 'Virtual' : 'In-Person'}
                            </span>
                            <span className="text-sm text-white flex items-center font-medium">
                              <FiCalendar className="mr-1" /> {event.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content section */}
                      <div className="p-4 md:p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                        <div className="flex flex-wrap text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg">
                          <div className="mr-6 mb-2 flex items-center">
                            <div className="bg-green-100 p-2 rounded-full mr-2">
                              <FiClock className="text-green-600" />
                            </div>
                            <span>{event.time}</span>
                          </div>
                          <div className="mr-6 mb-2 flex items-center">
                            <div className="bg-green-100 p-2 rounded-full mr-2">
                              {event.isVirtual ?
                                <FiMonitor className="text-green-600" /> :
                                <FiMapPin className="text-green-600" />
                              }
                            </div>
                            <span>{event.location}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <Link
                            href={`/events/${event.id}`}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                          >
                            View Details
                          </Link>
                          <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Cancel RSVP
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Saved Items tab */}
          {activeTab === 'saved' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h2 className="text-xl font-bold text-gray-900 mr-4">Saved Items</h2>
                    <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="text-center py-8">
                <FiBookmark className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No saved items yet</h3>
                <p className="mt-1 text-sm text-gray-500">Bookmark courses, events, or resources to save them for later.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
