import db from "../client.js";

export async function createEvent({trip_id, title, location, status, created_by}) {
  const result = await db.query(
    "INSERT INTO event (trip_id, title, location, status, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [trip_id, title, location, status, created_by]
  );
  return result;
}
