import db from "../client.js";


export async function createTrip({title, description, public_shared, start_date, end_date, created_by,
}) { const {rows: [result] } = await db.query(
    `INSERT INTO trip (title, description, public_shared, start_date, end_date, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
    [title, description, public_shared, start_date, end_date, created_by]
  );
  console.log(result);
  return result;

}
//get all trips with logged in user
export async function getMyTrips(id) {
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

//get a public trip of a certain id
export async function getPublicTripId(id) {
  const sql = `SELECT * from trip WHERE public_shared = true AND id = $1;`;
  const { rows: trips } = await db.query(sql, [id]);
  return trips[0];
}

//get all public shared trips
export async function getPublic_SharedTrips() {
  const sql = `SELECT * from trip WHERE public_shared = true;`;
  const { rows: trips } = await db.query(sql);
  return trips;
}

// Update trip details to make it public
export async function makeTripPublic(id) {
  const sql = `UPDATE trip SET public_shared = true WHERE id = $1 RETURNING *;`;
  const { rows: [updatedTrip] } = await db.query(sql, [id]);
  return updatedTrip;
}

// Update trip details to make it private
export async function makeTripPrivate(id) {
  const sql = `UPDATE trip SET public_shared = false WHERE id = $1 RETURNING *;`;
  const { rows: [updatedTrip] } = await db.query(sql, [id]);
  return updatedTrip;
}