'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AddGroupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    meetingFrequency: '',
    memberCount: 0,
    isPrivate: false,
    topics: ['']
  });

  // Redirect if not admin
  if (!loading && (!user || !user.isAdmin)) {
    router.push('/profile');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...formData.topics];
    updatedTopics[index] = value;
    setFormData(prev => ({
      ...prev,
      topics: updatedTopics
    }));
  };

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const removeTopic = (index) => {
    const updatedTopics = [...formData.topics];
    updatedTopics.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      topics: updatedTopics
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty topics
      const filteredTopics = formData.topics.filter(topic => topic.trim() !== '');

      // Ensure memberCount is a number
      const memberCount = parseInt(formData.memberCount.toString()) || 0;

      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        topics: filteredTopics,
        memberCount: memberCount
      };

      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create group');
      }

      // Redirect to groups page on success
      router.push('/community');
    } catch (error) {
      console.error('Error creating group:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while creating the group');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16" style={{
        backgroundColor: '#b3dfa1',
        backgroundImage: 'linear-gradient(315deg, #b3dfa1 0%, #f0e703 74%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Loading...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{
      backgroundColor: '#b3dfa1',
      backgroundImage: 'linear-gradient(315deg, #b3dfa1 0%, #f0e703 74%)'
    }}>
      {/* Background decorative elements */}
      <div className="fixed top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="fixed bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl z-0"></div>
      <div className="fixed top-1/3 left-1/4 w-40 h-40 bg-green-300 rounded-full opacity-10 blur-2xl z-0"></div>
      <div className="fixed bottom-1/3 right-1/4 w-60 h-60 bg-yellow-300 rounded-full opacity-10 blur-2xl z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page header */}
        <div className="mb-12 text-left">
          <div className="inline-block mb-4">
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Admin
            </span>
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Add New Group
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Create community spaces</p>
            <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
          </div>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <Link href="/profile" className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-500">
              <FiArrowLeft className="mr-2" /> Back to Profile
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Group Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>

                <div>
                  <ImageUpload
                    initialImageUrl={formData.image}
                    onImageChange={(url, file) => {
                      if (file) {
                        // If a file was uploaded, handle the upload
                        const handleFileUpload = async () => {
                          const formData = new FormData();
                          formData.append('file', file);

                          try {
                            const response = await fetch('/api/upload', {
                              method: 'POST',
                              body: formData
                            });

                            if (!response.ok) {
                              throw new Error('Failed to upload image');
                            }

                            const data = await response.json();
                            setFormData(prev => ({
                              ...prev,
                              image: data.url
                            }));
                          } catch (error) {
                            console.error('Error uploading image:', error);
                            alert('Failed to upload image. Please try again.');
                          }
                        };

                        handleFileUpload();
                      } else {
                        // If just a URL was provided
                        setFormData(prev => ({
                          ...prev,
                          image: url
                        }));
                      }
                    }}
                    label="Group Image"
                    required={true}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g. Urban Farming"
                  />
                </div>

                <div>
                  <label htmlFor="meetingFrequency" className="block text-sm font-medium text-gray-700">
                    Meeting Frequency
                  </label>
                  <input
                    type="text"
                    name="meetingFrequency"
                    id="meetingFrequency"
                    value={formData.meetingFrequency}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g. Weekly, Monthly"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center">
                    <input
                      id="isPrivate"
                      name="isPrivate"
                      type="checkbox"
                      checked={formData.isPrivate}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPrivate" className="ml-2 block text-sm font-medium text-gray-700">
                      Private Group
                    </label>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Check if membership requires approval</p>
                </div>

                <div>
                  <label htmlFor="memberCount" className="block text-sm font-medium text-gray-700">
                    Initial Member Count
                  </label>
                  <input
                    type="number"
                    name="memberCount"
                    id="memberCount"
                    min="0"
                    value={formData.memberCount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Topics</h3>
                  <button
                    type="button"
                    onClick={addTopic}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Add Topic
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.topics.map((topic, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="text"
                        value={topic}
                        onChange={(e) => handleTopicChange(index, e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="e.g. Sustainable Practices"
                      />
                      {formData.topics.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTopic(index)}
                          className="ml-2 text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.push('/profile')}
                  className="mr-4 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" /> Create Group
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
