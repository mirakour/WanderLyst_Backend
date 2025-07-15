import db from "../client.js";

export async function createEvent({trip_id, title, location, status, created_by}) {
  const result = await db.query(
    `INSERT INTO event (trip_id, title, location, status, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [trip_id, title, location, status, created_by]
  );
  return result;
}

export async function getTripEvents(trip_id) {
  const sql = await db.query(
    "SELECT * FROM event WHERE trip_id = $1;",[trip_id]
  )
  return sql.rows;
}