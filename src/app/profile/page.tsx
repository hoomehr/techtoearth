'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUser, FiBook, FiUsers, FiCalendar, FiSettings, FiHeart, FiBookmark, FiClock, FiMapPin, FiMonitor, FiMail } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('courses');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for edit profile
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    location: ''
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        // Initialize form data with user information
        setFormData({
          name: user.name || '',
          email: user.email || '',
          bio: user.bio || '',
          location: user.location || ''
        });

        // Fetch all courses, events, and groups
        const [coursesResponse, eventsResponse, groupsResponse] = await Promise.all([
          fetch('/api/courses'),
          fetch('/api/events'),
          fetch('/api/groups')
        ]);

        const coursesData = await coursesResponse.json();
        const eventsData = await eventsResponse.json();
        const groupsData = await groupsResponse.json();

        // Filter enrolled courses, saved events, and joined groups
        setEnrolledCourses(
          coursesData.courses.filter(course =>
            user.enrolledCourses && user.enrolledCourses.includes(course.id)
          )
        );

        setSavedEvents(
          eventsData.events.filter(event =>
            user.savedEvents && user.savedEvents.includes(event.id)
          )
        );

        setJoinedGroups(
          groupsData.groups.filter(group =>
            user.joinedGroups && user.joinedGroups.includes(group.id)
          )
        );
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  // Handle opening the edit profile modal
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  // Handle closing the edit profile modal
  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Show loading state
      setIsSubmitting(true);

      // Send the updated profile data to the server
      const response = await fetch('/api/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          ...formData
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update the user in the auth context
      updateUser(data.user);

      // Show success message
      alert('Profile updated successfully!');

      // Close the modal
      closeEditModal();

    } catch (error) {
      console.error('Error updating profile:', error);
      alert(error.message || 'An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state
  if (loading || authLoading) {
    return (
      <div className="min-h-screen py-16" style={{
        backgroundColor: '#b3dfa1',
        backgroundImage: 'linear-gradient(315deg, #b3dfa1 0%, #f0e703 74%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading Profile...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if user not found
  if (!user) {
    return (
      <div className="min-h-screen py-16" style={{
        backgroundColor: '#b3dfa1',
        backgroundImage: 'linear-gradient(315deg, #b3dfa1 0%, #f0e703 74%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Not Logged In</h1>
            <p className="mt-4 text-xl text-gray-500">Please log in to view your profile.</p>
            <div className="mt-10">
              <Link href="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
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
                  <div className="flex items-center">
                    <p className="text-gray-600">{user.email}</p>
                    {user?.isAdmin && (
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        <svg className="mr-1 h-2 w-2 text-red-500" fill="currentColor" viewBox="0 0 8 8">
                          <circle cx="4" cy="4" r="3" />
                        </svg>
                        Admin
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <button
                    onClick={openEditModal}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
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

        {/* Admin Actions */}
        {user?.isAdmin && (
          <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 mr-4">Admin Actions</h2>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/add-course"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Course
              </Link>
              <Link
                href="/admin/add-event"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Event
              </Link>
              <Link
                href="/admin/add-group"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Group
              </Link>
            </div>
          </div>
        )}

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

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          {/* Blurred background */}
          <div className="fixed inset-0 backdrop-blur-sm"></div>

          <div className="flex items-center justify-center min-h-screen p-4 relative" onClick={closeEditModal}>
            {/* Modal panel */}
            <div
              className="bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all max-w-lg w-full p-6 relative z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={closeEditModal}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FiUser className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Edit Profile
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Update your personal information
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="mt-5">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <div className="mt-1">
                        <textarea
                          name="bio"
                          id="bio"
                          rows={3}
                          value={formData.bio}
                          onChange={handleInputChange}
                          className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="Tell us about yourself..."
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiMapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="pl-10 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          placeholder="City, State, Country"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          Save Changes
                          <svg xmlns="http://www.w3.org/2000/svg" className="ml-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={closeEditModal}
                      disabled={isSubmitting}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
