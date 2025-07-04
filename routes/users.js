import express from 'express';
import client from '../db/client.js';
import requireUser from '../middleware/auth.js';

const router = express.Router();

// GET /api/user/me
router.get('/me', requireUser, async (req, res) => {
  try {
    const { id } = req.user;

    const { rows: [user] } = await client.query(
      `SELECT id, email, name FROM users WHERE id = $1`,
      [id]
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (err) {
    console.error('❌ Error fetching user info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;