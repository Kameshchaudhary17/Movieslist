import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { Users, UserPlus, Search, MessageCircle, Film, Star, UserCheck, UserX, MoreVertical, Mail, Check, X } from 'lucide-react';

export default function Friend() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('friends');
  const [friendTab, setFriendTab] = useState('all'); // 'all', 'requests', 'suggestions'

  // Sample friends data
  const friends = [
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      avatar: 'SJ', 
      username: '@sarahjohnson',
      movies: 142, 
      commonMovies: 34,
      online: true,
      bio: 'Movie enthusiast | Love sci-fi and thrillers',
      joinedDate: 'Jan 2024',
      avgRating: 8.2
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      avatar: 'MC', 
      username: '@mikechen',
      movies: 98, 
      commonMovies: 21,
      online: true,
      bio: 'Action movies are my thing 🎬',
      joinedDate: 'Feb 2024',
      avgRating: 7.8
    },
    { 
      id: 3, 
      name: 'Emma Davis', 
      avatar: 'ED', 
      username: '@emmadavis',
      movies: 203, 
      commonMovies: 45,
      online: false,
      bio: 'Classic cinema lover | Old Hollywood fan',
      joinedDate: 'Dec 2023',
      avgRating: 8.9
    },
    { 
      id: 4, 
      name: 'Alex Thompson', 
      avatar: 'AT', 
      username: '@alexthompson',
      movies: 156, 
      commonMovies: 28,
      online: true,
      bio: 'Horror movies all day every day 👻',
      joinedDate: 'Mar 2024',
      avgRating: 7.5
    },
    { 
      id: 5, 
      name: 'Jessica Lee', 
      avatar: 'JL', 
      username: '@jessicalee',
      movies: 187, 
      commonMovies: 52,
      online: false,
      bio: 'Documentary enthusiast | True stories',
      joinedDate: 'Jan 2024',
      avgRating: 8.4
    },
    { 
      id: 6, 
      name: 'David Kumar', 
      avatar: 'DK', 
      username: '@davidkumar',
      movies: 124, 
      commonMovies: 19,
      online: true,
      bio: 'Comedy and drama fan',
      joinedDate: 'Apr 2024',
      avgRating: 8.0
    },
  ];

  const friendRequests = [
    { 
      id: 1, 
      name: 'Olivia Martin', 
      avatar: 'OM', 
      username: '@oliviamartin',
      movies: 95, 
      commonMovies: 12,
      bio: 'Romance & Drama lover',
      mutualFriends: 3
    },
    { 
      id: 2, 
      name: 'James Wilson', 
      avatar: 'JW', 
      username: '@jameswilson',
      movies: 156, 
      commonMovies: 23,
      bio: 'Marvel & DC fan',
      mutualFriends: 5
    },
    { 
      id: 3, 
      name: 'Sophia Brown', 
      avatar: 'SB', 
      username: '@sophiabrown',
      movies: 78, 
      commonMovies: 8,
      bio: 'Indie films enthusiast',
      mutualFriends: 2
    },
  ];

  const suggestions = [
    { 
      id: 1, 
      name: 'Robert Garcia', 
      avatar: 'RG', 
      username: '@robertgarcia',
      movies: 210, 
      commonMovies: 56,
      bio: 'Classic movies collector',
      mutualFriends: 8
    },
    { 
      id: 2, 
      name: 'Mia Rodriguez', 
      avatar: 'MR', 
      username: '@miarodriguez',
      movies: 145, 
      commonMovies: 31,
      bio: 'Sci-fi and fantasy fan',
      mutualFriends: 6
    },
    { 
      id: 3, 
      name: 'Noah Anderson', 
      avatar: 'NA', 
      username: '@noahanderson',
      movies: 167, 
      commonMovies: 42,
      bio: 'Animation lover 🎨',
      mutualFriends: 7
    },
    { 
      id: 4, 
      name: 'Ava Taylor', 
      avatar: 'AT', 
      username: '@avataylor',
      movies: 134, 
      commonMovies: 28,
      bio: 'Thriller and mystery fan',
      mutualFriends: 4
    },
  ];

  const stats = {
    total: friends.length,
    online: friends.filter(f => f.online).length,
    requests: friendRequests.length,
    commonMovies: Math.round(friends.reduce((acc, f) => acc + f.commonMovies, 0) / friends.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Friends</h1>
                <p className="text-gray-400">Connect with fellow movie enthusiasts</p>
              </div>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg">
                <UserPlus className="w-5 h-5" />
                <span className="font-semibold">Add Friend</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Total Friends</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Online Now</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.online}</p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 bg-opacity-20 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Pending Requests</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.requests}</p>
                  </div>
                  <UserPlus className="w-8 h-8 text-blue-400" />
                </div>
              </div>
              <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-xs">Avg Common</p>
                    <p className="text-2xl font-bold text-white mt-1">{stats.commonMovies}</p>
                  </div>
                  <Film className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-1 flex space-x-1 mb-6">
              <button
                onClick={() => setFriendTab('all')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  friendTab === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                All Friends ({friends.length})
              </button>
              <button
                onClick={() => setFriendTab('requests')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all relative ${
                  friendTab === 'requests'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Requests ({friendRequests.length})
                {friendRequests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {friendRequests.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setFriendTab('suggestions')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all ${
                  friendTab === 'suggestions'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                Suggestions ({suggestions.length})
              </button>
            </div>
          </div>

          {/* All Friends Tab */}
          {friendTab === 'all' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {friends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 hover:bg-gray-700 hover:bg-opacity-50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          {friend.avatar}
                        </div>
                        {friend.online && (
                          <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-4 border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{friend.name}</h3>
                        <p className="text-gray-400 text-sm">{friend.username}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{friend.bio}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-700">
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{friend.movies}</p>
                      <p className="text-gray-400 text-xs">Movies</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{friend.commonMovies}</p>
                      <p className="text-gray-400 text-xs">Common</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">{friend.avgRating}</p>
                      <p className="text-gray-400 text-xs">Avg Rating</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm font-semibold">Message</span>
                    </button>
                    <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                      <Film className="w-4 h-4" />
                      <span className="text-sm font-semibold">View Library</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Friend Requests Tab */}
          {friendTab === 'requests' && (
            <div className="space-y-4">
              {friendRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 hover:bg-gray-700 hover:bg-opacity-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {request.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">{request.name}</h3>
                        <p className="text-gray-400 text-sm mb-1">{request.username}</p>
                        <p className="text-gray-400 text-sm mb-2">{request.bio}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-400">{request.movies} movies</span>
                          <span className="text-purple-400">{request.commonMovies} common</span>
                          <span className="text-gray-400">{request.mutualFriends} mutual friends</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg transition-all">
                        <Check className="w-5 h-5" />
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {friendRequests.length === 0 && (
                <div className="text-center py-20">
                  <UserCheck className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">No pending requests</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              )}
            </div>
          )}

          {/* Suggestions Tab */}
          {friendTab === 'suggestions' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 hover:bg-gray-700 hover:bg-opacity-50 transition-all"
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3">
                      {suggestion.avatar}
                    </div>
                    <h3 className="text-white font-bold text-lg">{suggestion.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{suggestion.username}</p>
                    <p className="text-gray-400 text-sm mb-3">{suggestion.bio}</p>
                    <div className="flex items-center space-x-4 text-sm mb-4">
                      <span className="text-gray-400">{suggestion.movies} movies</span>
                      <span className="text-purple-400">{suggestion.commonMovies} common</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-4">
                      {suggestion.mutualFriends} mutual friends
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span className="text-sm font-semibold">Add Friend</span>
                    </button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-all">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}