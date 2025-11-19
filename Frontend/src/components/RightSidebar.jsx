import { MessageCircle, Star } from 'lucide-react';

const RightSidebar = () => {
  const friends = [
    { id: 1, name: 'Sarah Johnson', avatar: 'SJ', movies: 142, online: true },
    { id: 2, name: 'Mike Chen', avatar: 'MC', movies: 98, online: true },
    { id: 3, name: 'Emma Davis', avatar: 'ED', movies: 203, online: false },
    { id: 4, name: 'Alex Thompson', avatar: 'AT', movies: 156, online: true },
  ];

  const trendingMovies = [
    { id: 1, title: 'Oppenheimer', rating: 8.5, watchers: 245 },
    { id: 2, title: 'Barbie', rating: 7.9, watchers: 312 },
    { id: 3, title: 'Dune: Part Two', rating: 8.8, watchers: 198 },
  ];

  return (
    <aside className="w-80 p-6 space-y-6">
      {/* Online Friends */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
        <h3 className="text-white font-bold text-lg mb-4 flex items-center justify-between">
          <span>Friends Online</span>
          <span className="text-sm text-gray-400">{friends.filter(f => f.online).length}/{friends.length}</span>
        </h3>
        <div className="space-y-3">
          {friends.map((friend) => (
            <div key={friend.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-700 hover:bg-opacity-50 transition-colors cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {friend.avatar}
                </div>
                {friend.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{friend.name}</p>
                <p className="text-gray-400 text-xs">{friend.movies} movies</p>
              </div>
              <MessageCircle className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
            </div>
          ))}
        </div>
        <button className="w-full mt-4 py-2 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors">
          View All Friends
        </button>
      </div>

      {/* Trending */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
        <h3 className="text-white font-bold text-lg mb-4">Trending Now</h3>
        <div className="space-y-3">
          {trendingMovies.map((movie, idx) => (
            <div key={movie.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-700 hover:bg-opacity-50 transition-colors cursor-pointer">
              <div className="text-2xl font-bold text-purple-400">{idx + 1}</div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">{movie.title}</p>
                <div className="flex items-center space-x-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-400">{movie.rating}</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400">{movie.watchers} watching</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;