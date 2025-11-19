import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Film, Search, Plus, Star, Filter, Grid, List, Calendar, Clock, Eye, Heart, Trash2, Edit, Play } from 'lucide-react';
import AddMovieModel from '../components/AddMovieModel.jsx';

export default function MyLibrary() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieToEdit, setMovieToEdit] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('library');

  // Sample movie data - Changed to state so it can be updated
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'The Dark Knight',
      rating: 9.0,
      genre: 'Action',
      year: 2008,
      duration: '152 min',
      watched: true,
      favorite: true,
      addedDate: '2024-01-15',
      poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop',
      description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.'
    },
    {
      id: 2,
      title: 'Inception',
      rating: 8.8,
      genre: 'Sci-Fi',
      year: 2010,
      duration: '148 min',
      watched: true,
      favorite: false,
      addedDate: '2024-01-20',
      poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea.'
    },
    {
      id: 3,
      title: 'Interstellar',
      rating: 8.6,
      genre: 'Sci-Fi',
      year: 2014,
      duration: '169 min',
      watched: false,
      favorite: true,
      addedDate: '2024-02-01',
      poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.'
    },
    {
      id: 4,
      title: 'Pulp Fiction',
      rating: 8.9,
      genre: 'Crime',
      year: 1994,
      duration: '154 min',
      watched: true,
      favorite: false,
      addedDate: '2024-02-10',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.'
    },
    {
      id: 5,
      title: 'The Matrix',
      rating: 8.7,
      genre: 'Sci-Fi',
      year: 1999,
      duration: '136 min',
      watched: true,
      favorite: true,
      addedDate: '2024-02-15',
      poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop',
      description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.'
    },
    {
      id: 6,
      title: 'Fight Club',
      rating: 8.8,
      genre: 'Drama',
      year: 1999,
      duration: '139 min',
      watched: false,
      favorite: false,
      addedDate: '2024-02-20',
      poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop',
      description: 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.'
    },
    {
      id: 7,
      title: 'Forrest Gump',
      rating: 8.8,
      genre: 'Drama',
      year: 1994,
      duration: '142 min',
      watched: true,
      favorite: true,
      addedDate: '2024-02-25',
      poster: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop',
      description: 'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.'
    },
    {
      id: 8,
      title: 'The Shawshank Redemption',
      rating: 9.3,
      genre: 'Drama',
      year: 1994,
      duration: '142 min',
      watched: true,
      favorite: true,
      addedDate: '2024-03-01',
      poster: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'
    },
  ]);

  const handleAddMovie = (newMovie) => {
    setMovies(prev => [...prev, newMovie]);
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovies(prev => prev.map(movie => 
      movie.id === updatedMovie.id ? updatedMovie : movie
    ));
  };

  const handleDeleteMovie = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(prev => prev.filter(movie => movie.id !== movieId));
    }
  };

  const handleEditClick = (movie) => {
    setMovieToEdit(movie);
    setIsModalOpen(true);
  };

  const handleToggleFavorite = (movieId) => {
    setMovies(prev => prev.map(movie => 
      movie.id === movieId ? { ...movie, favorite: !movie.favorite } : movie
    ));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMovieToEdit(null);
  };

  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Comedy'];

  const stats = {
    total: movies.length,
    watched: movies.filter(m => m.watched).length,
    favorites: movies.filter(m => m.favorite).length,
    avgRating: (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1)
  };

  const filteredMovies = movies.filter(movie => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'watched') return movie.watched;
    if (selectedFilter === 'unwatched') return !movie.watched;
    if (selectedFilter === 'favorites') return movie.favorite;
    return movie.genre.toLowerCase() === selectedFilter.toLowerCase();
  });

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
                  key={movie.id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group relative"
                >
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Quick Actions */}
                    <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleToggleFavorite(movie.id)}
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
                        onClick={() => handleDeleteMovie(movie.id)}
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
                  key={movie.id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4 hover:bg-gray-700 hover:bg-opacity-50 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={movie.poster}
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
                            onClick={() => handleToggleFavorite(movie.id)}
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
                            onClick={() => handleDeleteMovie(movie.id)}
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