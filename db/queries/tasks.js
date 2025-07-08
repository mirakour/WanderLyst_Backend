import db from "../client.js";

export async function createTask({
  trip_id,
  title,
  description,
  due_date,
  assigned_to,
  complete,
  created_by
}) {
  const result = await db.query(
    `INSERT INTO task (trip_id, title, description, due_date, assigned_to, complete, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
    [trip_id, title, description, due_date, assigned_to, complete, created_by]
  );
  return result;
}
