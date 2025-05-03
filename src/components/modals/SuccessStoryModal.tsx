'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiX, FiClock, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { SuccessStoryProps } from '@/components/cards/SuccessStoryCard';

interface SuccessStoryModalProps {
  storyId: number | null;
  onClose: () => void;
}

export default function SuccessStoryModal({ storyId, onClose }: SuccessStoryModalProps) {
  const [story, setStory] = useState<SuccessStoryProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (storyId === null) return;

    async function fetchStory() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/success-stories/${storyId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch success story');
        }
        const data = await response.json();
        setStory(data);
      } catch (err) {
        console.error('Error fetching success story:', err);
        setError('Failed to load the success story. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchStory();
  }, [storyId]);

  if (!storyId) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-filter backdrop-blur-md transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white bg-opacity-95 rounded-xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-1 text-gray-500 hover:text-gray-700 focus:outline-none z-10 shadow-md"
          >
            <FiX className="h-6 w-6" />
          </button>

          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading success story...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          ) : story ? (
            <div className="flex flex-col md:flex-row p-2">
              {/* Image section */}
              <div className="md:w-2/5 relative">
                <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                  <Image
                    src={story.imageSrc}
                    alt={story.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 md:hidden">
                  <h3 className="text-2xl font-bold text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-600">Former {story.formerRole}</p>
                </div>
              </div>

              {/* Content section */}
              <div className="md:w-3/5 p-4 md:p-6">
                <div className="hidden md:block mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{story.name}</h3>
                  <p className="text-sm text-gray-600">Former {story.formerRole}</p>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FiBriefcase className="text-green-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Career Transition</p>
                      <p className="font-medium flex items-center">
                        {story.formerRole}
                        <FiArrowRight className="mx-2 text-green-500" />
                        {story.currentRole}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FiClock className="text-green-600 h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Transition Year</p>
                      <p className="font-medium">{story.transitionYear}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Their Story</h4>
                  <div className="prose max-w-none">
                    <p className="text-gray-600 mb-4 italic">
                      "{story.testimonial}"
                    </p>
                    <p className="text-gray-600">
                      After years in the tech industry as a {story.formerRole}, {story.name} made the bold decision to transition to agriculture in {story.transitionYear}. Now working as a {story.currentRole}, they've found a fulfilling career that combines their technical expertise with their passion for sustainable food production.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={onClose}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
