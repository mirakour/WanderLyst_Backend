import express from 'express';
import client from '../db/client.js';
import requireUser from '../middleware/auth.js';
import {verifyToken} from './auth.js'
import { getUserById, getUserId } from '../db/queries/users.js'

const router = express.Router();

// GET /api/user/me
router.get('/me', verifyToken, async (req, res) => {

  const id = req.user.id

  try {

  const userInfo = await getUserById(id);

    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

        res.status(201).json(userInfo)  } 
  catch (err) {
    console.error('❌ Error fetching user info:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
