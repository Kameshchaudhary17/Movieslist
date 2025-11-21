import React, { useState, useEffect } from 'react';
import { X, Film, Star, Calendar, Clock, Tag, Loader2 } from 'lucide-react';

export default function AddMovieModal({ isOpen, onClose, onAddMovie, onUpdateMovie, movieToEdit = null }) {
  const [formData, setFormData] = useState({
    title: '',
    year: '',
    genre: '',
    rating: '',
    duration: '',
    poster: '',
    description: '',
    watched: false,
    favorite: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const genres = ['Action', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Comedy', 'Horror', 'Romance', 'Adventure', 'Animation'];

  // API Base URL - Update this with your backend URL
  const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

  // Populate form when editing
  useEffect(() => {
    if (movieToEdit) {
      setFormData({
        title: movieToEdit.title || '',
        year: movieToEdit.year || '',
        genre: movieToEdit.genre || '',
        rating: movieToEdit.rating || '',
        duration: movieToEdit.duration || '',
        poster: movieToEdit.poster || '',
        description: movieToEdit.description || '',
        watched: movieToEdit.watched || false,
        favorite: movieToEdit.favorite || false
      });
    }
  }, [movieToEdit]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (formData.year < 1800 || formData.year > new Date().getFullYear() + 5) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }
    
    if (!formData.rating) {
      newErrors.rating = 'Rating is required';
    } else if (formData.rating < 0 || formData.rating > 10) {
      newErrors.rating = 'Rating must be between 0 and 10';
    }
    
    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  setIsLoading(true);
  setApiError('');

  try {
    const token = localStorage.getItem('token');
    
    // DEBUG: Check token
    console.log('Token from localStorage:', token);
    console.log('Token exists:', !!token);
    console.log('Token length:', token?.length);
    
    if (!token) {
      setApiError('You must be logged in to perform this action. Please log in again.');
      setIsLoading(false);
      return;
    }

      console.log('Token found:', token ? 'Yes' : 'No');
      console.log('API URL:', API_BASE_URL);

      // Prepare the payload
      const payload = {
        title: formData.title,
        year: parseInt(formData.year),
        genre: formData.genre,
        rating: parseFloat(formData.rating),
        duration: formData.duration,
        poster: formData.poster || undefined,
        description: formData.description,
        watched: formData.watched,
        favorite: formData.favorite
      };

      let response;

      if (movieToEdit) {
        // Update existing movie
        response = await fetch(`${API_BASE_URL}/movie/${movieToEdit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      } else {
        // Create new movie
        response = await fetch(`${API_BASE_URL}/movie`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();

      console.log('Response status:', response.status);
      console.log('Response data:', data);

      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 401) {
          // Token is invalid or expired
          localStorage.removeItem('token'); // Clear invalid token
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error(data.message || 'Something went wrong');
      }

      // Success - call the appropriate callback
      if (movieToEdit) {
        onUpdateMovie(data.data);
      } else {
        onAddMovie(data.data);
      }

      resetForm();
      onClose();
    } catch (error) {
      console.error('Error submitting movie:', error);
      setApiError(error.message || 'Failed to save movie. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      year: '',
      genre: '',
      rating: '',
      duration: '',
      poster: '',
      description: '',
      watched: false,
      favorite: false
    });
    setErrors({});
    setApiError('');
  };

  const handleClose = () => {
    if (!isLoading) {
      resetForm();
      onClose();
    }
  };

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      handleClose();
    }
  };

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isLoading]);

  if (!isOpen) return null;

  const isEditMode = !!movieToEdit;

  return (
    <div 
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between z-10 backdrop-blur-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg shadow-lg">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isEditMode ? 'Edit Movie' : 'Add New Movie'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="p-2 hover:bg-gray-700 rounded-lg transition-all hover:rotate-90 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-5">
          {/* API Error Message */}
          {apiError && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
              <span className="text-red-500 text-xl">⚠</span>
              <div className="flex-1">
                <p className="text-red-400 font-medium">Error</p>
                <p className="text-red-300 text-sm mt-1">{apiError}</p>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Movie Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter movie title"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.title ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.title && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.title}</p>}
          </div>

          {/* Year and Genre Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Year *</span>
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="2024"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.year ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.year && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.year}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center space-x-2">
                <Tag className="w-4 h-4 text-purple-400" />
                <span>Genre *</span>
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.genre ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <option value="">Select genre</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              {errors.genre && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.genre}</p>}
            </div>
          </div>

          {/* Rating and Duration Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Rating (0-10) *</span>
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="8.5"
                step="0.1"
                min="0"
                max="10"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.rating ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.rating && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.rating}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Duration *</span>
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="120 min"
                disabled={isLoading}
                className={`w-full px-4 py-3 bg-gray-800 border ${errors.duration ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              />
              {errors.duration && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.duration}</p>}
            </div>
          </div>

          {/* Poster URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Poster URL (optional)
            </label>
            <input
              type="url"
              name="poster"
              value={formData.poster}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="text-gray-500 text-xs mt-1">If left empty, a default poster will be used</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter movie description..."
              rows="4"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-gray-800 border ${errors.description ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {errors.description && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠</span>{errors.description}</p>}
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-6 bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                name="watched"
                checked={formData.watched}
                onChange={handleChange}
                disabled={isLoading}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Mark as watched</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                name="favorite"
                checked={formData.favorite}
                onChange={handleChange}
                disabled={isLoading}
                className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-red-600 focus:ring-2 focus:ring-red-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span className="text-gray-300 font-medium group-hover:text-white transition-colors">Add to favorites</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
            >
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              <span>{isLoading ? 'Saving...' : isEditMode ? 'Update Movie' : 'Add Movie'}</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}