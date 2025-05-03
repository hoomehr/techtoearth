'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function EditCoursePage() {
  const params = useParams();
  const courseId = parseInt(params.id as string);
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    level: '',
    duration: '',
    price: '',
    instructor: '',
    image: '',
    topics: [],
    modules: []
  });

  useEffect(() => {
    // Redirect if not admin
    if (user && !user.isAdmin) {
      router.push('/courses/' + courseId);
      return;
    }

    async function fetchCourse() {
      try {
        const response = await fetch(`/api/courses/${courseId}`);
        if (!response.ok) {
          throw new Error('Course not found');
        }
        const data = await response.json();
        setCourse(data);
        
        // Initialize form data with course data
        setFormData({
          title: data.title || '',
          description: data.description || '',
          longDescription: data.longDescription || '',
          level: data.level || '',
          duration: data.duration || '',
          price: data.price || '',
          instructor: data.instructor || '',
          image: data.image || '',
          topics: data.topics || [],
          modules: data.modules || []
        });
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchCourse();
    }
  }, [courseId, router, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTopicsChange = (e) => {
    const topics = e.target.value.split(',').map(topic => topic.trim());
    setFormData(prev => ({
      ...prev,
      topics
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      // Redirect to course details page
      router.push(`/courses/${courseId}`);
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading Course...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Access Denied</h1>
            <p className="mt-4 text-xl text-gray-500">You don't have permission to edit courses.</p>
            <div className="mt-10">
              <Link href={`/courses/${courseId}`} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Back to Course
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/courses/${courseId}`}
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <FiArrowLeft className="mr-2" /> Back to Course
          </Link>
        </div>

        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                  Instructor
                </label>
                <input
                  type="text"
                  name="instructor"
                  id="instructor"
                  value={formData.instructor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                  Level
                </label>
                <select
                  name="level"
                  id="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g. 6 weeks"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  id="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Short Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                Long Description
              </label>
              <textarea
                name="longDescription"
                id="longDescription"
                rows={6}
                value={formData.longDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="topics" className="block text-sm font-medium text-gray-700">
                Topics (comma-separated)
              </label>
              <textarea
                name="topics"
                id="topics"
                rows={3}
                value={formData.topics.join(', ')}
                onChange={handleTopicsChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href={`/courses/${courseId}`}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {saving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <FiSave className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
