'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiX, FiImage } from 'react-icons/fi';

interface ImageUploadProps {
  initialImageUrl?: string;
  onImageChange: (imageUrl: string, file?: File) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  initialImageUrl = '',
  onImageChange,
  label = 'Image',
  required = false
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (png, jpg, jpeg, gif)');
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    // For now, we'll just create a local URL for preview
    // In a real implementation, you would upload the file to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      onImageChange(result, file);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);

    // TODO: Implement actual file upload to server
    // const formData = new FormData();
    // formData.append('file', file);
    // fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     setImageUrl(data.url);
    //     onImageChange(data.url);
    //     setIsUploading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error uploading file:', error);
    //     setError('Failed to upload image. Please try again.');
    //     setIsUploading(false);
    //   });
  };

  const handleRemoveImage = () => {
    setImageUrl('');
    onImageChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    onImageChange(url);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Image preview */}
      {imageUrl && (
        <div className="relative mt-2 mb-4">
          <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300">
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="h-full w-full object-cover"
              onError={() => setError('Invalid image URL')}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 rounded-full bg-white p-1 text-gray-500 shadow-md hover:text-gray-700"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Upload area */}
      {!imageUrl && (
        <div
          className={`mt-1 flex justify-center rounded-md border-2 border-dashed px-6 pt-5 pb-6 ${
            isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-1 text-center">
            <FiImage className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-offset-2 hover:text-green-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={fileInputRef}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
          </div>
        </div>
      )}

      {/* URL input option */}
      <div className="mt-3">
        <label htmlFor="image-url" className="block text-sm font-medium text-gray-700">
          Or enter image URL
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="image-url"
            id="image-url"
            value={imageUrl}
            onChange={handleUrlInputChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}

      {/* Loading indicator */}
      {isUploading && (
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg className="mr-2 h-4 w-4 animate-spin text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing image...
        </div>
      )}
    </div>
  );
}
