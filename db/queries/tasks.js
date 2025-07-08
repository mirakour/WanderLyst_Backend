import db from '../client.js';

// Create a task
export async function createTask({ trip_id, title, description, due_date, assigned_to, created_by }) {
  const { rows: [task] } = await db.query(
    `INSERT INTO task (trip_id, title, description, due_date, assigned_to, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [trip_id, title, description, due_date, assigned_to, created_by]
  );
  return task;
}

// Get tasks by trip_id
export async function getTasksByTripId(trip_id) {
  const { rows } = await db.query(
    `SELECT * FROM task WHERE trip_id = $1 ORDER BY due_date ASC;`,
    [trip_id]
  );
  return rows;
}

// Update a task
export async function updateTask(id, updates) {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  const setString = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const { rows: [updated] } = await db.query(
    `UPDATE task SET ${setString}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *;`,
    [...values, id]
  );
  return updated;
}

// Delete a task
export async function deleteTask(id) {
  const { rows: [deleted] } = await db.query(
    `DELETE FROM task WHERE id = $1 RETURNING *;`,
    [id]
  );
  return deleted;
}
