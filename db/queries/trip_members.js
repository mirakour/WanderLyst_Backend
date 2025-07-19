import db from "../client.js";

export async function createTripMember({user_email, user_id, trip_id}) {
  const result = await db.query(
    `INSERT INTO trip_member (user_email, user_id, trip_id) VALUES ($1, $2, $3) RETURNING *;`,
    [user_email, user_id, trip_id]
  );
  return result;
}

export async function getTripMember(trip_id) {
  const sql = `SELECT * FROM trip_member where trip_id = $1;`;
  const { rows: tripmember } = await db.query(sql, [trip_id]);
  return tripmember;
}
