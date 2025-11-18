import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
    default: 0
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Action', 'Sci-Fi', 'Drama', 'Crime', 'Thriller', 'Comedy', 'Horror', 'Romance', 'Adventure', 'Animation']
  },
  year: {
    type: Number,
    required: [true, 'Year is required']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  poster: {
    type: String,
    default: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=450&fit=crop'
  },
  watched: {
    type: Boolean,
    default: false
  },
  favorite: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
movieSchema.index({ userId: 1, genre: 1 });
movieSchema.index({ userId: 1, watched: 1 });
movieSchema.index({ userId: 1, favorite: 1 });

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;