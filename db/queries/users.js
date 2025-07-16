 import db from "../client.js"
 



 /** @returns the entry created according to the provided details */
  export async function createUser({ email, name, password }) {
    const sql = `
      INSERT INTO users (email, name, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows: user } = await db.query(sql, [email, name, password]);
    return user[0];
  };


//loginUser
export async function loginUser({email, password}){
  const sql = `
  SELECT * FROM users WHERE email = $1 AND password = $2`;

  const {rows:user} = await db.query(sql, [email, password]);
  return user[0];
  
};


//getUserById
export async function getUserById(id){
  const sql = `
    SELECT * FROM users WHERE id = $1;`;
    
  const {rows: user} = await db.query(sql, [id]);

  return user[0];
};

//getUserInfo
export async function getUserId({email}){
  const sql = `
    SELECT id FROM users WHERE email = $1;`;
  const {rows: user} = await db.query(sql, [email]);

  return user[0];
};