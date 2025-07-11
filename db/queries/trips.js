import db from "../client.js";

export async function createTrip({title, description, start_date, end_date, created_by,
}) {
  const sql = `INSERT INTO trip (title, description, start_date, end_date, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
  const { rows: trips } = await db.query(sql, [title, description, start_date, end_date, created_by]);
  return trips;
}
//get all trips with logged in user
export async function getTrip(id) {
  const sql = `SELECT * FROM trip where created_by = $1;`;
  const { rows: trips } = await db.query(sql, [id]);
  return trips;
}
//get a trip of a certain id
export async function getTripId(id) {
  const sql = `SELECT * from trip WHERE id = $1;`;
  const { rows: trips } = await db.query(sql, [id]);
  return trips[0];
}

export async function getPublicTrips() {
  const sql = `SELECT * from trip WHERE public = true;`;
  const { rows: trips } = await db.query(sql);
  return trips[0];
}
