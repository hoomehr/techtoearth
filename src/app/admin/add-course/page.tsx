'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import ImageUpload from '@/components/ui/ImageUpload';

export default function AddCoursePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    level: 'Beginner',
    duration: '',
    image: '',
    category: '',
    instructor: '',
    price: 0,
    topics: [''],
    modules: [{ title: '', lessons: [''] }],
    lessons: [{ title: '', duration: '', content: '' }]
  });

  // Redirect if not admin or creator
  if (!loading && (!user || (!user.isAdmin && !user.isCreator))) {
    router.push('/profile');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLessonChange = (index, field, value) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons[index] = {
      ...updatedLessons[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      lessons: updatedLessons
    }));
  };

  const addLesson = () => {
    setFormData(prev => ({
      ...prev,
      lessons: [...prev.lessons, { title: '', duration: '', content: '' }]
    }));
  };

  const removeLesson = (index) => {
    const updatedLessons = [...formData.lessons];
    updatedLessons.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      lessons: updatedLessons
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

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...formData.modules];
    updatedModules[index] = {
      ...updatedModules[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const handleModuleLessonChange = (moduleIndex, lessonIndex, value) => {
    const updatedModules = [...formData.modules];
    const updatedLessons = [...updatedModules[moduleIndex].lessons];
    updatedLessons[lessonIndex] = value;
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      lessons: updatedLessons
    };
    setFormData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, { title: '', lessons: [''] }]
    }));
  };

  const removeModule = (index) => {
    const updatedModules = [...formData.modules];
    updatedModules.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const addModuleLesson = (moduleIndex) => {
    const updatedModules = [...formData.modules];
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      lessons: [...updatedModules[moduleIndex].lessons, '']
    };
    setFormData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const removeModuleLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...formData.modules];
    const updatedLessons = [...updatedModules[moduleIndex].lessons];
    updatedLessons.splice(lessonIndex, 1);
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      lessons: updatedLessons
    };
    setFormData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Filter out empty topics
      const filteredTopics = formData.topics.filter(topic => topic.trim() !== '');

      // Filter out empty module lessons and empty modules
      const filteredModules = formData.modules
        .map(module => ({
          ...module,
          lessons: module.lessons.filter(lesson => lesson.trim() !== '')
        }))
        .filter(module => module.title.trim() !== '' && module.lessons.length > 0);

      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        topics: filteredTopics,
        modules: filteredModules,
        creatorId: user?.id // Add the creator ID
      };

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to create course');
      }

      // Redirect to courses page on success
      router.push('/courses');
    } catch (error) {
      console.error('Error creating course:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while creating the course');
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
              Add New Course
            </h1>
          </div>
          <div className="flex items-center mb-4">
            <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">Create educational content</p>
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
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
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
                    label="Course Image"
                    required={true}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Short Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="A brief description of the course (displayed in course cards)"
                />
              </div>

              <div>
                <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700">
                  Long Description *
                </label>
                <textarea
                  id="longDescription"
                  name="longDescription"
                  rows={5}
                  required
                  value={formData.longDescription}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="A detailed description of the course (displayed on the course details page)"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Level *
                  </label>
                  <select
                    id="level"
                    name="level"
                    required
                    value={formData.level}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                    Duration *
                  </label>
                  <input
                    type="text"
                    name="duration"
                    id="duration"
                    required
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g. 4 weeks"
                  />
                </div>

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
                    placeholder="e.g. Sustainable Farming"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
                    Instructor Name *
                  </label>
                  <input
                    type="text"
                    name="instructor"
                    id="instructor"
                    required
                    value={formData.instructor}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g. John Smith"
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price (USD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="e.g. 49.99"
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

                <div className="space-y-3 mb-6">
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

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Modules</h3>
                  <button
                    type="button"
                    onClick={addModule}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Add Module
                  </button>
                </div>

                <div className="space-y-6 mb-8">
                  {formData.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium text-gray-900">Module {moduleIndex + 1}</h4>
                        {formData.modules.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeModule(moduleIndex)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor={`module-title-${moduleIndex}`} className="block text-sm font-medium text-gray-700">
                          Module Title *
                        </label>
                        <input
                          type="text"
                          id={`module-title-${moduleIndex}`}
                          required
                          value={module.title}
                          onChange={(e) => handleModuleChange(moduleIndex, 'title', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">Module Lessons</label>
                          <button
                            type="button"
                            onClick={() => addModuleLesson(moduleIndex)}
                            className="text-xs text-green-600 hover:text-green-700"
                          >
                            + Add Lesson
                          </button>
                        </div>

                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="flex items-center">
                              <input
                                type="text"
                                value={lesson}
                                onChange={(e) => handleModuleLessonChange(moduleIndex, lessonIndex, e.target.value)}
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                                placeholder={`Lesson ${lessonIndex + 1}`}
                              />
                              {module.lessons.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeModuleLesson(moduleIndex, lessonIndex)}
                                  className="ml-2 text-red-600 hover:text-red-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Detailed Lessons</h3>
                  <button
                    type="button"
                    onClick={addLesson}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Add Lesson
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.lessons.map((lesson, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-medium text-gray-900">Lesson {index + 1}</h4>
                        {formData.lessons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLesson(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor={`lesson-title-${index}`} className="block text-sm font-medium text-gray-700">
                            Lesson Title *
                          </label>
                          <input
                            type="text"
                            id={`lesson-title-${index}`}
                            required
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        </div>

                        <div>
                          <label htmlFor={`lesson-duration-${index}`} className="block text-sm font-medium text-gray-700">
                            Duration *
                          </label>
                          <input
                            type="text"
                            id={`lesson-duration-${index}`}
                            required
                            value={lesson.duration}
                            onChange={(e) => handleLessonChange(index, 'duration', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            placeholder="e.g. 30 minutes"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label htmlFor={`lesson-content-${index}`} className="block text-sm font-medium text-gray-700">
                          Content *
                        </label>
                        <textarea
                          id={`lesson-content-${index}`}
                          required
                          rows={3}
                          value={lesson.content}
                          onChange={(e) => handleLessonChange(index, 'content', e.target.value)}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      </div>
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
                      <FiSave className="mr-2" /> Create Course
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
