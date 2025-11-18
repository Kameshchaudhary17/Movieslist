import express from 'express';
import {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  toggleWatched,
  toggleFavorite,
  getMovieStats
} from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';  // ← Make sure this line is correct

const router = express.Router();

// All routes are protected
router.use(protect);

// Stats route (must be before /:id)
router.get('/stats', getMovieStats);

// CRUD routes
router.route('/')
  .get(getMovies)
  .post(createMovie);

router.route('/:id')
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

// Toggle routes
router.patch('/:id/watched', toggleWatched);
router.patch('/:id/favorite', toggleFavorite);

export default router;