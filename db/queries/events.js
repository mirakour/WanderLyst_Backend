import db from "../client.js";

export async function createEvent({trip_id, title, location, date_time, status, created_by}) {
  const result = await db.query(
    `INSERT INTO event (trip_id, title, location, date_time, status, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [trip_id, title, location, date_time, status, created_by]
  );
  return result;
}

export async function getTripEvents(trip_id) {
  const sql = `SELECT * FROM event WHERE trip_id = $1;`;
  const { rows: events } = await db.query(sql, [trip_id]);
  return events;
}

export async function getEvent(id) {
  const sql = await db.query(`SELECT * FROM event WHERE id = $1;`,
  [id])
  return sql.rows[0]
}

export async function editEvent(id, status) {
  const sql = await db.query(`UPDATE event SET status = $2 WHERE id = $1;`,
  [id, status]
  );
}

export async function deleteEvent(id) {
  const sql = await db.query(`DELETE FROM event WHERE id = $1;`,
  [id]
);
}

//get all trips with logged in user
export async function getMyTrips(id) {
  const sql = `SELECT * FROM trip where created_by = $1;`;
  const { rows: trips } = await db.query(sql, [id]);
  return trips;
}