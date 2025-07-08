import db from "../client.js";

export async function createVote({ event_id, trip_id, vote_value }) {
  const result = await db.query(
    `INSERT INTO vote (event_id, trip_id, vote_value) VALUES ($1, $2, $3) RETURNING *;`,
    [event_id, trip_id, vote_value]
  );
  return result;
}
