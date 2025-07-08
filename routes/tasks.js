import express from 'express';
import requireUser from '../middleware/auth.js';
import {
  createTask,
  getTasksByTripId,
  updateTask,
  deleteTask
} from '../db/queries/tasks.js';

const router = express.Router();

// POST /api/tasks
router.post('/', requireUser, async (req, res) => {
  try {
    const { trip_id, title, description, due_date, assigned_to } = req.body;
    const created_by = req.user.id;

    const task = await createTask({
      trip_id,
      title,
      description,
      due_date,
      assigned_to,
      created_by
    });

    res.status(201).json({ task });
  } catch (err) {
    console.error('❌ Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// GET /api/tasks/:trip_id
router.get('/:trip_id', requireUser, async (req, res) => {
  try {
    const { trip_id } = req.params;
    const tasks = await getTasksByTripId(trip_id);
    res.json({ tasks });
  } catch (err) {
    console.error('❌ Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// PATCH /api/tasks/:id
router.patch('/:id', requireUser, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await updateTask(id, updates);
    res.json({ task });
  } catch (err) {
    console.error('❌ Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', requireUser, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteTask(id);
    res.json({ message: 'Task deleted', deleted });
  } catch (err) {
    console.error('❌ Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;