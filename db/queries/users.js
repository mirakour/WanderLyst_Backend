import db from "../client.js";

export async function createUsers({ email, name, password }) {
  const {rows:[result]} = await db.query(
    `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING *;`,
    [email, name, password]
  );
  return result;
}


//{rows:result} : - renaming rows to result
// {} are for de-structure-ing an object; shaves off the top layer of the object; not nested;
//[] - brining back the first index result of the object; 0th index;