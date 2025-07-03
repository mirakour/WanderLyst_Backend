import db from "../client";


export async function createTrip(title, description, start_date, end_date) {
  const result = await db.query(
    "INSERT INTO trip (title, description, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *;",
    [title, description, start_date, end_date]
  );
  return result;
}
