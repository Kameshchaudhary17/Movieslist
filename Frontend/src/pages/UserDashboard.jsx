import { useState } from 'react';
import { Film, Users, Star, Plus } from 'lucide-react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import RightSidebar from '../components/RightSidebar.jsx';

export default function MovieDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample movie data
  const myMovies = [
    { id: 1, title: 'The Dark Knight', rating: 9.0, genre: 'Action', year: 2008, poster: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&h=450&fit=crop' },
    { id: 2, title: 'Inception', rating: 8.8, genre: 'Sci-Fi', year: 2010, poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop' },
    { id: 3, title: 'Interstellar', rating: 8.6, genre: 'Sci-Fi', year: 2014, poster: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=300&h=450&fit=crop' },
    { id: 4, title: 'Pulp Fiction', rating: 8.9, genre: 'Crime', year: 1994, poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop' },
    { id: 5, title: 'The Matrix', rating: 8.7, genre: 'Sci-Fi', year: 1999, poster: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop' },
    { id: 6, title: 'Fight Club', rating: 8.8, genre: 'Drama', year: 1999, poster: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=300&h=450&fit=crop' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Navbar Component */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar Component */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Movies</p>
                  <p className="text-3xl font-bold text-white mt-1">248</p>
                </div>
                <div className="bg-purple-600 bg-opacity-20 p-3 rounded-xl">
                  <Film className="w-8 h-8 text-purple-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Friends</p>
                  <p className="text-3xl font-bold text-white mt-1">42</p>
                </div>
                <div className="bg-blue-600 bg-opacity-20 p-3 rounded-xl">
                  <Users className="w-8 h-8 text-blue-400" />
                </div>
              </div>
            </div>
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg Rating</p>
                  <p className="text-3xl font-bold text-white mt-1">8.4</p>
                </div>
                <div className="bg-yellow-600 bg-opacity-20 p-3 rounded-xl">
                  <Star className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Add Movie Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">My Collection</h2>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Add Movie</span>
            </button>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {myMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden transition-all hover:scale-105 hover:shadow-2xl cursor-pointer group"
              >
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-3 right-3 bg-black bg-opacity-70 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold text-sm">{movie.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold text-sm mb-1 truncate">{movie.title}</h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{movie.year}</span>
                    <span className="text-purple-400 font-semibold">{movie.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar Component */}
        <RightSidebar />
      </div>
    </div>
  );
}