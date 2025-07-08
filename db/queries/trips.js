import db from "../client.js";


export async function createTrip({title, description, start_date, end_date, created_by}) {
  const {rows:[result]} = await db.query(
    "INSERT INTO trip (title, description, start_date, end_date, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
    [title, description, start_date, end_date, created_by]
  );
  console.log(result)
  return result;
}
