'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

export default function EditGroupPage() {
  const params = useParams();
  const groupId = parseInt(params.id as string);
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [group, setGroup] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    meetingFrequency: '',
    image: '',
    bannerImage: ''
  });

  useEffect(() => {
    // Redirect if not admin
    if (user && !user.isAdmin) {
      router.push('/groups/' + groupId);
      return;
    }

    async function fetchGroup() {
      try {
        const response = await fetch(`/api/groups/${groupId}`);
        if (!response.ok) {
          throw new Error('Group not found');
        }
        const data = await response.json();
        setGroup(data);
        
        // Initialize form data with group data
        setFormData({
          name: data.name || '',
          description: data.description || '',
          category: data.category || '',
          location: data.location || '',
          meetingFrequency: data.meetingFrequency || '',
          image: data.image || '',
          bannerImage: data.bannerImage || ''
        });
      } catch (error) {
        console.error('Error fetching group:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchGroup();
    }
  }, [groupId, router, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update group');
      }

      // Redirect to group details page
      router.push(`/groups/${groupId}`);
    } catch (error) {
      console.error('Error updating group:', error);
      alert('Failed to update group. Please try again.');
    } finally {
      setSaving(false);
    }
  };

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

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">Access Denied</h1>
            <p className="mt-4 text-xl text-gray-500">You don't have permission to edit groups.</p>
            <div className="mt-10">
              <Link href={`/groups/${groupId}`} className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                Back to Group
              </Link>
            </div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Link
            href={`/groups/${groupId}`}
            className="inline-flex items-center text-green-600 hover:text-green-700"
          >
            <FiArrowLeft className="mr-2" /> Back to Group
          </Link>
        </div>

        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Group</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Group Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Urban Farming">Urban Farming</option>
                  <option value="Permaculture">Permaculture</option>
                  <option value="Sustainable Agriculture">Sustainable Agriculture</option>
                  <option value="Organic Farming">Organic Farming</option>
                  <option value="Hydroponics">Hydroponics</option>
                  <option value="Regenerative Agriculture">Regenerative Agriculture</option>
                </select>
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
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
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Group Image URL
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

              <div>
                <label htmlFor="bannerImage" className="block text-sm font-medium text-gray-700">
                  Banner Image URL
                </label>
                <input
                  type="url"
                  name="bannerImage"
                  id="bannerImage"
                  value={formData.bannerImage}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={6}
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Link
                href={`/groups/${groupId}`}
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
