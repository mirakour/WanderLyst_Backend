import db from "../client";

export async function createTripMember(user_email, trip_id) {
  const result = await db.query(
    "INSERT INTO trip_member (user_email, trip_id) VALUES ($1, $2) RETURNING *;",
    [user_email, trip_id]
  );
  return result;
}
