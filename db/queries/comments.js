import db from "../client.js";

export async function createComment({
  event_id,
  trip_id,
  user_id,
  comment_text,
}) {
  const result = await db.query(
    "INSERT INTO comment (event_id, trip_id, user_id, comment_text) VALUES ($1, $2, $3, $4) RETURNING *;",
    [event_id, trip_id, user_id, comment_text]
  );
  return result;
}
