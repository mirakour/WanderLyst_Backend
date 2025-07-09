import db from "../client.js";

export async function createTrip({
  title,
  description,
  start_date,
  end_date,
  created_by,
}) {
  const {
    rows: [result],
  } = await db.query(
    `INSERT INTO trip (title, description, start_date, end_date, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [title, description, start_date, end_date, created_by]
  );
  console.log(result);
  return result;
}

export async function getTrip() {
  const sql = `SELECT * FROM trip;`;
  const { rows: trips } = await db.query(sql);
  return trips;
}

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



