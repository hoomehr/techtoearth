'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ResourceCard from '@/components/cards/ResourceCard';
import SectionHeader from '@/components/SectionHeader';

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [resourcesByCategory, setResourcesByCategory] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResources() {
      try {
        const response = await fetch('/api/resources');
        const data = await response.json();
        setResources(data.resources);

        // Group resources by category
        const groupedResources = data.resources.reduce((acc, resource) => {
          if (!acc[resource.category]) {
            acc[resource.category] = [];
          }
          acc[resource.category].push(resource);
          return acc;
        }, {});

        setResourcesByCategory(groupedResources);
        setCategories(Object.keys(groupedResources));
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchResources();
  }, []);

  return (
    <div>
      {/* Hero section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-left mb-10">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Knowledge Hub
              </span>
            </div>
            <div className="mb-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                Learning Resources
              </h1>
            </div>
            <div className="flex items-center mb-4">
              <p className="text-green-600 text-2xl sm:text-3xl font-semibold mr-4">
                For Your Agricultural Journey
              </p>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
            </div>
            <p className="max-w-3xl text-base text-gray-600 sm:text-lg md:text-xl mb-6">
              Explore our curated collection of books, guides, articles, and tools to help you transition from tech to agriculture.
            </p>
            <div>
              <a
                href="#books"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 shadow-md"
              >
                Browse Resources
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="py-12" id="books">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">Loading resources...</h3>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900">No resources found</h3>
            </div>
          ) : (
            categories.map((category) => (
              <div key={category} className="mb-16" id={category.toLowerCase().replace(/\s+/g, '-')}>
                <div className="text-left mb-6">
                  <div className="mb-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      {category}
                    </h2>
                  </div>
                  <div className="flex items-center mb-4">
                    <p className="text-green-600 text-xl sm:text-2xl font-semibold mr-4">
                      {category === "Books" ? "Essential Reading" :
                       category === "Guides & PDFs" ? "Practical Knowledge" :
                       "Learn & Listen"}
                    </p>
                    <div className="flex-grow h-0.5 bg-gradient-to-r from-green-500 to-transparent rounded-full"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resourcesByCategory[category].map((resource) => (
                    <ResourceCard
                      key={resource.id}
                      id={resource.id}
                      title={resource.title}
                      description={resource.description}
                      type={resource.type}
                      author={resource.author}
                      url={resource.url}
                      image={resource.image}
                      category={resource.category}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* CTA section */}
      <div className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-40 h-40 bg-yellow-300 rounded-full opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-60 h-60 bg-green-400 rounded-full opacity-20"></div>

            <div className="relative pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-white bg-opacity-20 text-white">
                    Contribute
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block mb-2">Have a Resource to Share?</span>
                  <span className="block text-green-200 text-2xl sm:text-3xl">Help Our Community Grow</span>
                </h2>
                <p className="mt-6 max-w-2xl mx-auto text-base text-green-100 sm:text-lg md:mt-8 md:text-xl">
                  If you have a book, article, or tool that has helped you in your transition to agriculture, we'd love to add it to our collection.
                </p>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-green-700 bg-white hover:bg-green-50 transition-colors duration-200"
                  >
                    Suggest a Resource
                  </Link>
                  <Link
                    href="/courses"
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-500 transition-colors duration-200"
                  >
                    Explore Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
