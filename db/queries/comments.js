import db from '../client.js';

// Create a comment
export async function createComment({ event_id, trip_id, comment_text, user_id }) {
  const { rows: [comment] } = await db.query(
    `INSERT INTO comment (event_id, trip_id, comment_text, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [event_id, trip_id, comment_text, user_id]
  );
  return comment;
}

// Get all comments for a specific trip
export async function getCommentsByTrip(trip_id) {
  const { rows } = await db.query(
    `SELECT * FROM comment WHERE trip_id = $1 ORDER BY created_at DESC;`,
    [trip_id]
  );
  return rows;
}

// Delete a comment (only if made by the user)
export async function deleteComment(id, user_id) {
  const { rows: [deleted] } = await db.query(
    `DELETE FROM comment WHERE id = $1 AND user_id = $2 RETURNING *;`,
    [id, user_id]
  );
  return deleted;
}