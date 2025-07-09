import express from 'express';
import requireUser from '../middleware/auth.js';
import { createComment, getCommentsByTrip, deleteComment } from '../db/queries/comments.js';

const router = express.Router();

// POST /api/comments — Add a new comment to a trip or event
router.post('/', requireUser, async (req, res) => {
  const { trip_id, event_id, comment_text } = req.body;

  if (!trip_id || !comment_text) {
    return res.status(400).json({ error: 'trip_id and comment_text required' });
  }

  try {
    const comment = await createComment({
      trip_id,
      event_id,
      comment_text,
      user_id: req.user.id
    });
    res.status(201).json({ comment });
  } catch (err) {
    console.error('❌ Error creating comment:', err);
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// GET /api/comments/:trip_id — Fetch comments for a specific trip
router.get('/:trip_id', requireUser, async (req, res) => {
  try {
    const comments = await getCommentsByTrip(req.params.trip_id);
    res.json({ comments });
  } catch (err) {
    console.error('❌ Error fetching comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// DELETE /api/comments/:id — Delete a user's own comment
router.delete('/:id', requireUser, async (req, res) => {
  try {
    const deleted = await deleteComment(req.params.id, req.user.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Comment not found or unauthorized' });
    }
    res.json({ message: 'Comment deleted', deleted });
  } catch (err) {
    console.error('❌ Error deleting comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
});

export default router;