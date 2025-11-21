import Movie from '../models/movie.js';


// @desc    Create new movie
// @route   POST /api/movies
// @access  Private
export const createMovie = async (req, res) => {
  try {
    const { title, description, rating, genre, year, duration, poster, watched, favorite } = req.body;
    
    // Validation
    if (!title || !description || !genre || !year || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }
    
    const movie = await Movie.create({
      title,
      description,
      rating: rating || 0,
      genre,
      year,
      duration,
      poster: poster || undefined,
      watched: watched || false,
      favorite: favorite || false,
      userId: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Movie added successfully',
      data: movie
    });
  } catch (error) {
    console.error('Create Movie Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating movie',
      error: error.message
    });
  }
};

// @desc    Update movie
// @route   PUT /api/movies/:id
// @access  Private
export const updateMovie = async (req, res) => {
  try {
    let movie = await Movie.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Movie updated successfully',
      data: movie
    });
  } catch (error) {
    console.error('Update Movie Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating movie',
      error: error.message
    });
  }
};

// @desc    Get all movies for a user
// @route   GET /api/movies
// @access  Private
export const getMovies = async (req, res) => {
  try {
    const { genre, watched, favorite, search, sortBy } = req.query;
    
    // Build query
    let query = { userId: req.user._id };
    
    if (genre && genre !== 'all') {
      query.genre = genre;
    }
    
    if (watched !== undefined) {
      query.watched = watched === 'true';
    }
    
    if (favorite === 'true') {
      query.favorite = true;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    // Build sort
    let sort = {};
    switch (sortBy) {
      case 'rating':
        sort = { rating: -1 };
        break;
      case 'year':
        sort = { year: -1 };
        break;
      case 'title':
        sort = { title: 1 };
        break;
      default:
        sort = { addedDate: -1 };
    }
    
    const movies = await Movie.find(query).sort(sort);
    
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    console.error('Get Movies Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching movies',
      error: error.message
    });
  }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Private
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Get Movie Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching movie',
      error: error.message
    });
  }
};

// @desc    Delete movie
// @route   DELETE /api/movies/:id
// @access  Private
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    console.error('Delete Movie Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting movie',
      error: error.message
    });
  }
};

// @desc    Toggle movie watched status
// @route   PATCH /api/movies/:id/watched
// @access  Private
export const toggleWatched = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    movie.watched = !movie.watched;
    await movie.save();
    
    res.status(200).json({
      success: true,
      message: `Movie marked as ${movie.watched ? 'watched' : 'unwatched'}`,
      data: movie
    });
  } catch (error) {
    console.error('Toggle Watched Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Toggle movie favorite status
// @route   PATCH /api/movies/:id/favorite
// @access  Private
export const toggleFavorite = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }
    
    movie.favorite = !movie.favorite;
    await movie.save();
    
    res.status(200).json({
      success: true,
      message: `Movie ${movie.favorite ? 'added to' : 'removed from'} favorites`,
      data: movie
    });
  } catch (error) {
    console.error('Toggle Favorite Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user movie statistics
// @route   GET /api/movies/stats
// @access  Private
export const getMovieStats = async (req, res) => {
  try {
    const movies = await Movie.find({ userId: req.user._id });
    
    const stats = {
      total: movies.length,
      watched: movies.filter(m => m.watched).length,
      favorites: movies.filter(m => m.favorite).length,
      avgRating: movies.length > 0 
        ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1) 
        : 0,
      genreBreakdown: {}
    };
    
    // Calculate genre breakdown
    movies.forEach(movie => {
      stats.genreBreakdown[movie.genre] = (stats.genreBreakdown[movie.genre] || 0) + 1;
    });
    
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get Stats Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
};