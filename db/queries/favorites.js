import db from "../client.js";

export async function createFavorite({user_id, trip_id}) {
  const result = await db.query(
    `INSERT INTO favorite (user_id, trip_id) VALUES ($1, $2) RETURNING *;`,
    [user_id, trip_id]
  );
  return result;
}
