import db from "../client";

export async function createUsers(email, name, password) {
  const result = await db.query(
    "INSERT INTO user (email, name, password) VALUES ($1, $2, $3) RETURNING *;",
    [email, name, password]
  );
  return result;
}
