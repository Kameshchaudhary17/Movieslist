import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Film, Search, Plus, Star, Filter, Grid, List, Calendar, Clock, Eye, Heart, Trash2, Edit, Play, Loader2 } from 'lucide-react';
import AddMovieModel from '../components/AddMovieModel.jsx';

const API_URL = 'http://localhost:5000/api';

export default function MyLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('library');
  const [loading, setLoading] = useState(true);

  // Movies state - now fetched from backend
  const [movies, setMovies] = useState([]);

  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Comedy', 'Horror', 'Romance', 'Adventure', 'Animation'];

  // Fetch movies from backend on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/movie`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      console.log('Fetched movies:', data);

      if (response.ok && data.success) {
        setMovies(data.data || []);
      } else {
        console.error('Failed to fetch movies:', data.message);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = (newMovie) => {
    console.log('Movie added:', newMovie);
    setMovies(prev => [...prev, newMovie]);
  };

  const handleUpdateMovie = (updatedMovie) => {
    console.log('Movie updated:', updatedMovie);
    setMovies(prev => prev.map(movie => 
      movie._id === updatedMovie._id ? updatedMovie : movie
    ));
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/movie/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMovies(prev => prev.filter(movie => movie._id !== movieId));
        console.log('Movie deleted successfully');
      } else {
        alert(data.message || 'Failed to delete movie');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete movie');
    }
  };

  const handleEditClick = (movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/movie/${movieId}/favorite`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMovies(prev => prev.map(movie => 
          movie._id === movieId ? data.data : movie
        ));
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  // Calculate stats from movies
  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.watched).length,
    favorites: movies.filter(m => m.favorite).length,
    avgRating: movies.length > 0 
      ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1)
      : '0.0'
  };

  const filteredMovies = movies.filter(movie => {
    // Search filter
    if (searchQuery && !movie.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Status/Genre filter
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'watched') return movie.watched;
    if (selectedFilter === 'unwatched') return !movie.watched;
    if (selectedFilter === 'favorites') return movie.favorite;
    return movie.genre.toLowerCase() === selectedFilter.toLowerCase();
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading your movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-950">

      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">My Library</h1>
                <p className="text-gray-400">Manage your movie collection</p>
              </div>
              <button
                onClick={() => {
                  setMovieToEdit(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Add Movie</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Total Movies</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                  </div>
                  <Film className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Watched</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.watched}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Favorites</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.favorites}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Avg Rating</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.avgRating}</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Filters and View Controls */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Filter Buttons */}
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedFilter === 'all'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSelectedFilter('watched')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedFilter === 'watched'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Watched
                  </button>
                  <button
                    onClick={() => setSelectedFilter('unwatched')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedFilter === 'unwatched'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Watchlist
                  </button>
                  <button
                    onClick={() => setSelectedFilter('favorites')}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                      selectedFilter === 'favorites'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Favorites
                  </button>

                  {/* Genre Dropdown */}
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg font-semibold text-sm border border-gray-600 focus:outline-none focus:border-purple-500"
                  >
                    <option value="all">All Genres</option>
                    {genres.filter(g => g !== 'All').map(genre => (
                      <option key={genre} value={genre.toLowerCase()}>{genre}</option>
                    ))}
                  </select>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'grid'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'list'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Movies Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredMovies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group relative"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.poster || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop'}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleFavorite(movie._id)}
                        className={`p-2 rounded-lg backdrop-blur-sm transition-colors ${movie.favorite ? 'bg-red-600 text-white' : 'bg-black bg-opacity-50 text-white hover:bg-red-600'}`}
                      >
                        <Heart className="w-4 h-4" fill={movie.favorite ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        onClick={() => handleEditClick(movie)}
                        className="p-2 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm text-white hover:bg-purple-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteMovie(movie._id)}
                        className="p-2 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-2 left-2 bg-black bg-opacity-70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold text-sm">{movie.rating}</span>
                    </div>

                    {/* Watch Status */}
                    {movie.watched && (
                      <div className="absolute bottom-2 left-2 bg-green-600 bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-white font-semibold text-xs">Watched</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-1 truncate">{movie.title}</h3>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">{movie.year}</span>
                      <span className="text-purple-400 font-semibold">{movie.genre}</span>
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{movie.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredMovies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4 hover:bg-gray-700 hover:bg-opacity-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={movie.poster || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop'}
                      alt={movie.title}
                      className="w-20 h-28 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="text-white font-bold text-lg mb-1">{movie.title}</h3>
                          <p className="text-gray-400 text-sm mb-2">{movie.description}</p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-gray-400">{movie.year}</span>
                            <span className="text-purple-400 font-semibold">{movie.genre}</span>
                            <span className="text-gray-400">{movie.duration}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-white font-bold">{movie.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {movie.watched && (
                            <span className="bg-green-600 bg-opacity-20 text-green-400 px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>Watched</span>
                            </span>
                          )}
                          <button 
                            onClick={() => handleToggleFavorite(movie._id)}
                            className={`p-2 rounded-lg transition-colors ${movie.favorite ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-red-600 hover:text-white'}`}
                          >
                            <Heart className="w-5 h-5" fill={movie.favorite ? 'currentColor' : 'none'} />
                          </button>
                          <button 
                            onClick={() => handleEditClick(movie)}
                            className="p-2 bg-gray-700 rounded-lg text-gray-400 hover:bg-purple-600 hover:text-white transition-colors"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteMovie(movie._id)}
                            className="p-2 bg-gray-700 rounded-lg text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredMovies.length === 0 && (
            <div className="text-center py-20">
              <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No movies found</h3>
              <p className="text-gray-500">Try adjusting your filters or add some movies to your library</p>
            </div>
          )}
        </main>
      </div>

      {/* Modal - Placed at the end, outside everything */}
      <AddMovieModel 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddMovie={handleAddMovie}
        onUpdateMovie={handleUpdateMovie}
        movieToEdit={movieToEdit}
      />
    </div>
  );
}