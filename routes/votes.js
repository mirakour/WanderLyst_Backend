import express from 'express';
import requireUser from '../middleware/auth.js';
import { createVote, getVotesByEvent, updateVote, deleteVote } from '../db/queries/votes.js';

const router = express.Router();

// POST /api/votes — add a vote
router.post('/', requireUser, async (req, res) => {
  const { event_id, trip_id, vote_value } = req.body;
  if (!event_id || !trip_id || vote_value === undefined) {
    return res.status(400).json({ error: 'event_id, trip_id and vote_value are required' });
  }
  try {
    const vote = await createVote({
      event_id, trip_id, vote_value, user_id: req.user.id
    });
    res.status(201).json({ vote });
  } catch (err) {
    console.error('❌ Error creating vote:', err);
    res.status(500).json({ error: 'Failed to add vote' });
  }
});

// GET /api/votes/event/:event_id — get votes for an event
router.get('/event/:event_id', requireUser, async (req, res) => {
  try {
    const votes = await getVotesByEvent(req.params.event_id);
    res.json({ votes });
  } catch (err) {
    console.error('❌ Error fetching votes:', err);
    res.status(500).json({ error: 'Failed to fetch votes' });
  }
});

// PATCH /api/votes/:id — update a vote
router.patch('/:id', requireUser, async (req, res) => {
  const { vote_value } = req.body;
  if (vote_value === undefined) {
    return res.status(400).json({ error: 'vote_value is required' });
  }
  try {
    const updated = await updateVote({ id: req.params.id, vote_value });
    res.json({ vote: updated });
  } catch (err) {
    console.error('❌ Error updating vote:', err);
    res.status(500).json({ error: 'Failed to update vote' });
  }
});

// DELETE /api/votes/:id — remove a vote
router.delete('/:id', requireUser, async (req, res) => {
  try {
    const deleted = await deleteVote({ id: req.params.id, user_id: req.user.id });
    if (!deleted) {
      return res.status(404).json({ error: 'Vote not found or unauthorized' });
    }
    res.json({ message: 'Vote removed', deleted });
  } catch (err) {
    console.error('❌ Error deleting vote:', err);
    res.status(500).json({ error: 'Failed to delete vote' });
  }
});

export default router;