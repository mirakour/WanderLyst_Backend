import db from "../client.js";


// Create a favorite
export async function createFavorite({ user_id, trip_id }) {
  const { rows: [favorite] } = await db.query(
    "INSERT INTO favorite (user_id, trip_id) VALUES ($1, $2) RETURNING *;",
    [user_id, trip_id]
  );
  return favorite;
}

// Get all favorites for a specific user
export async function getFavoritesByUser(user_id) {
  const { rows } = await db.query(
    "SELECT * FROM favorite WHERE user_id = $1;",
    [user_id]
  );
  return rows;
}

// Get favorites for a specific user
export async function checkFavoritesById({ user_id, trip_id }) {
  const { rows } = await db.query(
    "SELECT * FROM favorite WHERE user_id = $1 AND trip_id = $2;",
    [user_id, trip_id]
  );
  return rows[0];
}


// Delete a favorite
export async function deleteFavorite({ user_id, trip_id }) {
  const { rows: [deleted] } = await db.query(
    "DELETE FROM favorite WHERE user_id = $1 AND trip_id = $2 RETURNING *;",
    [user_id, trip_id]
  );
  return deleted;
}

