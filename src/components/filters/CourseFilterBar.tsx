'use client';

import { useState, useEffect, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';

interface CourseFilterBarProps {
  levels: string[];
  topics: string[];
  onFilterChange: (filters: {
    search: string;
    levels: string[];
    topics: string[];
  }) => void;
  coursesData: {
    id: number;
    title: string;
    description: string;
    level: string;
    topics: string[];
    // other properties
  }[];
}

export default function CourseFilterBar({ levels, topics, onFilterChange, coursesData }: CourseFilterBarProps) {
  const [search, setSearch] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Display only first 5 topics by default
  const displayedTopics = topics.slice(0, 5);
  const additionalTopics = topics.slice(5);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Count courses for each level and topic
  const getLevelCount = (level: string) => {
    return coursesData.filter(course => course.level === level).length;
  };

  const getTopicCount = (topic: string) => {
    return coursesData.filter(course => course.topics.includes(topic)).length;
  };

  useEffect(() => {
    onFilterChange({
      search,
      levels: selectedLevels,
      topics: selectedTopics,
    });
  }, [search, selectedLevels, selectedTopics, onFilterChange]);

  const handleLevelToggle = (level: string) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  const handleTopicToggle = (topic: string, closeDropdown = false) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );

    // Close dropdown if requested (when selecting from dropdown)
    if (closeDropdown) {
      setIsTopicsDropdownOpen(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setSelectedLevels([]);
    setSelectedTopics([]);
  };

  // Check if any filters are active
  const hasActiveFilters = search || selectedLevels.length > 0 || selectedTopics.length > 0;

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 mb-8 ${hasActiveFilters ? 'border-2 border-green-500' : ''}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Column */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Search</h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FiSearch size={18} />
            </div>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Level Column */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => handleLevelToggle(level)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedLevels.includes(level)
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {level} <span className="ml-1 text-xs opacity-75">({coursesData.filter(course => course.level === level).length})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Topics Column */}
        <div>
          <h3 className="font-medium text-gray-700 mb-2">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {displayedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicToggle(topic)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTopics.includes(topic)
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                }`}
              >
                {topic} <span className="ml-1 text-xs opacity-75">({coursesData.filter(course => course.topics.includes(topic)).length})</span>
              </button>
            ))}

            {additionalTopics.length > 0 && (
              <div className="relative inline-block" ref={dropdownRef}>
                <button
                  onClick={() => setIsTopicsDropdownOpen(!isTopicsDropdownOpen)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center ${
                    additionalTopics.some(topic => selectedTopics.includes(topic))
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>+{additionalTopics.length} More</span>
                  <span className="ml-1">{isTopicsDropdownOpen ? '▲' : '▼'}</span>
                  {additionalTopics.some(topic => selectedTopics.includes(topic)) && (
                    <span className="ml-1 bg-white text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {additionalTopics.filter(topic => selectedTopics.includes(topic)).length}
                    </span>
                  )}
                </button>

                {isTopicsDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-60 bg-white rounded-md shadow-lg py-1 max-h-60 overflow-auto">
                    {additionalTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicToggle(topic, true)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                          selectedTopics.includes(topic) ? 'bg-green-50 text-green-800 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {topic} <span className="ml-1 text-xs opacity-75">({coursesData.filter(course => course.topics.includes(topic)).length})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleClearFilters}
            className="px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors flex items-center"
          >
            <span>Clear All Filters</span>
            <span className="ml-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(selectedLevels.length + selectedTopics.length + (search ? 1 : 0))}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
