import db from "../client.js";

export async function createEvent({trip_id, title, location, date_time, status, created_by}) {
  const result = await db.query(
    `INSERT INTO event (trip_id, title, location, date_time, status, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [trip_id, title, location, date_time, status, created_by]
  );
  return result;
}

export async function editEvent(trip_id, title, location, date_time, status) {
  const sql = await db.query(`UPDATE event SET title = $1, location = $2, date_time = $3, status = $4 WHERE id = $5;`,
  [title, location, date_time, status, trip_id]
  );
}

export async function getTripEvents(trip_id) {
  const sql = `SELECT * FROM event WHERE trip_id = $1;`;
  const { rows: events } = await db.query(sql, [trip_id]);
  return events;
}


//get all trips with logged in user
export async function getMyTrips(id) {
  const sql = `SELECT * FROM trip where created_by = $1;`;
  const { rows: trips } = await db.query(sql, [id]);
  return trips;
}