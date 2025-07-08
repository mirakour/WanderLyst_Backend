import express from 'express';
import { createFavorite, getFavoritesByUser, deleteFavorite } from '../db/queries/favorites.js';
import requireUser from '../middleware/auth.js';

const router = express.Router();

// GET /api/favorites - Get all favorites for the logged-in user
router.get('/', requireUser, async (req, res) => {
  try {
    const user_id = req.user.id;
    const favorites = await getFavoritesByUser(user_id);
    res.json({ favorites });
  } catch (err) {
    console.error('❌ Error fetching favorites:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

// POST /api/favorites - Add a favorite trip for the logged-in user
router.post('/', requireUser, async (req, res) => {
  const user_id = req.user.id;
  const { trip_id } = req.body;

  if (!trip_id) {
    return res.status(400).json({ error: 'trip_id is required' });
  }

  try {
    const favorite = await createFavorite({ user_id, trip_id });
    res.status(201).json({ favorite });
  } catch (err) {
    console.error('❌ Error adding favorite:', err);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

// DELETE /api/favorites - Remove a favorite trip for the logged-in user
router.delete('/', requireUser, async (req, res) => {
  const user_id = req.user.id;
  const { trip_id } = req.body;

  if (!trip_id) {
    return res.status(400).json({ error: 'trip_id is required' });
  }

  try {
    const deleted = await deleteFavorite({ user_id, trip_id });
    if (!deleted) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ message: 'Favorite removed', deleted });
  } catch (err) {
    console.error('❌ Error removing favorite:', err);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

export default router;