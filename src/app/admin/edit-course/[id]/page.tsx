'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import ImageUpload from '@/components/ui/ImageUpload';

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
    category: '',
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
          category: data.category || '',
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
    setSaving(true);

    try {
      // Filter out empty topics
      const filteredTopics = formData.topics.filter(topic => topic.trim() !== '');

      // Filter out empty module lessons and empty modules
      const filteredModules = formData.modules
        .map(module => ({
          ...module,
          lessons: module.lessons.filter(lesson =>
            typeof lesson === 'string' ? lesson.trim() !== '' : true
          )
        }))
        .filter(module => module.title.trim() !== '' && module.lessons.length > 0);

      // Prepare data for submission
      const dataToSubmit = {
        ...formData,
        topics: filteredTopics,
        modules: filteredModules
      };

      const response = await fetch(`/api/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
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
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="e.g. Sustainable Farming"
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
                              value={typeof lesson === 'string' ? lesson : (lesson.title || '')}
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
