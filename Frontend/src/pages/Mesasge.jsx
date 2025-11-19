import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { MessageCircle, Search, Send, Paperclip, Smile, MoreVertical, Phone, Video, Info, Image, Film, Star } from 'lucide-react';

export default function Message() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [chatSearch, setChatSearch] = useState('');

  // Sample conversations data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'SJ',
      username: '@sarahjohnson',
      lastMessage: 'Have you seen the new Dune movie? It\'s amazing!',
      timestamp: '2m ago',
      unread: 2,
      online: true,
      typing: false
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'MC',
      username: '@mikechen',
      lastMessage: 'Thanks for the recommendation! Added it to my list.',
      timestamp: '15m ago',
      unread: 0,
      online: true,
      typing: false
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: 'ED',
      username: '@emmadavis',
      lastMessage: 'That Hitchcock film was incredible! 🎬',
      timestamp: '1h ago',
      unread: 0,
      online: false,
      typing: false
    },
    {
      id: 4,
      name: 'Alex Thompson',
      avatar: 'AT',
      username: '@alexthompson',
      lastMessage: 'Want to watch the new horror release together?',
      timestamp: '2h ago',
      unread: 5,
      online: true,
      typing: false
    },
    {
      id: 5,
      name: 'Jessica Lee',
      avatar: 'JL',
      username: '@jessicalee',
      lastMessage: 'Just finished my 200th movie! 🎉',
      timestamp: '3h ago',
      unread: 0,
      online: false,
      typing: false
    },
    {
      id: 6,
      name: 'David Kumar',
      avatar: 'DK',
      username: '@davidkumar',
      lastMessage: 'Check out this comedy, you\'ll love it!',
      timestamp: '5h ago',
      unread: 1,
      online: true,
      typing: false
    },
  ];

  // Sample messages for selected chat
  const messages = {
    1: [
      {
        id: 1,
        sender: 'them',
        text: 'Hey! How are you doing?',
        timestamp: '10:30 AM',
        avatar: 'SJ'
      },
      {
        id: 2,
        sender: 'me',
        text: 'I\'m good! Just added some new movies to my collection.',
        timestamp: '10:32 AM',
        avatar: 'JD'
      },
      {
        id: 3,
        sender: 'them',
        text: 'Nice! What did you add?',
        timestamp: '10:33 AM',
        avatar: 'SJ'
      },
      {
        id: 4,
        sender: 'me',
        text: 'The Dark Knight trilogy and some Nolan classics.',
        timestamp: '10:35 AM',
        avatar: 'JD'
      },
      {
        id: 5,
        sender: 'them',
        text: 'Excellent choice! Christopher Nolan is a genius.',
        timestamp: '10:36 AM',
        avatar: 'SJ'
      },
      {
        id: 6,
        sender: 'them',
        text: 'Have you seen the new Dune movie? It\'s amazing!',
        timestamp: '10:38 AM',
        avatar: 'SJ'
      },
      {
        id: 7,
        sender: 'me',
        text: 'Not yet! Is it as good as the first one?',
        timestamp: '10:40 AM',
        avatar: 'JD'
      },
      {
        id: 8,
        sender: 'them',
        text: 'Even better! The visuals are stunning. You should definitely watch it.',
        timestamp: '10:42 AM',
        avatar: 'SJ'
      },
    ],
    2: [
      {
        id: 1,
        sender: 'them',
        text: 'Thanks for the movie recommendation!',
        timestamp: '9:15 AM',
        avatar: 'MC'
      },
      {
        id: 2,
        sender: 'me',
        text: 'You\'re welcome! Let me know what you think.',
        timestamp: '9:20 AM',
        avatar: 'JD'
      },
      {
        id: 3,
        sender: 'them',
        text: 'Thanks for the recommendation! Added it to my list.',
        timestamp: '9:45 AM',
        avatar: 'MC'
      },
    ],
    4: [
      {
        id: 1,
        sender: 'them',
        text: 'Hey! Want to watch the new horror release together?',
        timestamp: '8:30 AM',
        avatar: 'AT'
      },
      {
        id: 2,
        sender: 'them',
        text: 'I heard it\'s really scary!',
        timestamp: '8:31 AM',
        avatar: 'AT'
      },
      {
        id: 3,
        sender: 'them',
        text: 'Let me know if you\'re interested.',
        timestamp: '8:32 AM',
        avatar: 'AT'
      },
    ],
  };

  const selectedConversation = conversations.find(c => c.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="flex max-w-7xl mx-auto">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-6">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl border border-gray-700 h-[calc(100vh-8rem)] flex overflow-hidden">
            {/* Conversations List */}
            <div className="w-80 border-r border-gray-700 flex flex-col">
              {/* Header */}
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Messages</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    value={chatSearch}
                    onChange={(e) => setChatSearch(e.target.value)}
                    className="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg py-2 pl-10 pr-4 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 border-b border-gray-700 cursor-pointer transition-all ${
                      selectedChat === conv.id
                        ? 'bg-purple-600 bg-opacity-20'
                        : 'hover:bg-gray-700 hover:bg-opacity-30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {conv.avatar}
                        </div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold text-sm truncate">{conv.name}</h3>
                          <span className="text-gray-400 text-xs">{conv.timestamp}</span>
                        </div>
                        <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                          {conv.unread}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedConversation.avatar}
                        </div>
                        {selectedConversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{selectedConversation.name}</h3>
                        <p className="text-gray-400 text-xs">
                          {selectedConversation.online ? 'Active now' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Info className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex items-end space-x-2 max-w-md ${message.sender === 'me' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {message.avatar}
                          </div>
                          <div>
                            <div
                              className={`px-4 py-2 rounded-2xl ${
                                message.sender === 'me'
                                  ? 'bg-purple-600 text-white'
                                  : 'bg-gray-700 text-white'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                            <p className={`text-xs text-gray-500 mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-700">
                    <div className="flex items-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Image className="w-5 h-5" />
                      </button>
                      <div className="flex-1 bg-gray-700 bg-opacity-50 rounded-xl border border-gray-600 focus-within:border-purple-500 transition-all">
                        <textarea
                          value={messageInput}
                          onChange={(e) => setMessageInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type a message..."
                          rows="1"
                          className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none resize-none"
                        />
                      </div>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all">
                        <Smile className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleSendMessage}
                        className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg transition-all"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <MessageCircle className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-400 mb-2">Select a conversation</h3>
                    <p className="text-gray-500">Choose from your existing conversations to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}