import db from '../client.js';

// Create a vote (yes/no) for an event
export async function createVote({ event_id, trip_id, vote_value, user_id }) {
  const { rows: [vote] } = await db.query(
    `INSERT INTO vote (event_id, trip_id, vote_value, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *;`,
    [event_id, trip_id, vote_value, user_id]
  );
  return vote;
}

// Get all votes for an event by trip
export async function getVotesByEvent(event_id) {
  const { rows } = await db.query(
    `SELECT * FROM vote WHERE event_id = $1;`,
    [event_id]
  );
  return rows;
}

// Update a user's vote
export async function updateVote({ id, vote_value }) {
  const { rows: [vote] } = await db.query(
    `UPDATE vote
     SET vote_value = $1, updated_at = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING *;`,
    [vote_value, id]
  );
  return vote;
}

// Remove a user's vote
export async function deleteVote({ id, user_id }) {
  const { rows: [deleted] = [] } = await db.query(
    `DELETE FROM vote
     WHERE id = $1 AND user_id = $2
     RETURNING *;`,
    [id, user_id]
  );
  return deleted;
}
