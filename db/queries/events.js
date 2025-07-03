import db from "../client";

export async function createEvent(trip_id, title, location, status) {
  const result = await db.query(
    "INSERT INTO event (trip_id, title, location, status) VALUES ($1, $2, $3, $4) RETURNING *;",
    [trip_id, title, location, status]
  );
  return result;
}
