import db from "../client.js";

// Get trip members
export async function getTripMember(tripId) {
  const sql = `SELECT trip_member.id, trip_member.user_email
               FROM trip_member
               WHERE trip_id = $1;`;
  const { rows } = await db.query(sql, [tripId]);
  return rows;
}

// Add a new trip member
export async function createTripMember({ trip_id, user_email, user_id }) {
  const sql = `INSERT INTO trip_member (trip_id, user_email, user_id)
               VALUES ($1, $2, $3)
               RETURNING *;`;
  const { rows: [newMember] } = await db.query(sql, [trip_id, user_email, user_id]);
  return newMember;
}

// Add a member by email
export async function addTripMember(tripId, user_email) {
  // Look up user_id from email
  const { rows: [user] } = await db.query(
    `SELECT id FROM users WHERE email = $1;`,
    [user_email]
  );

  if (!user) {
    throw new Error(`User with email ${user_email} does not exist`);
  }

  const sql = `INSERT INTO trip_member (trip_id, user_email, user_id)
               VALUES ($1, $2, $3)
               RETURNING *;`;
  const { rows: [newMember] } = await db.query(sql, [tripId, user_email, user.id]);
  return newMember;
}

// Update a member's email
export async function updateTripMember(memberId, user_email) {
  const { rows: [user] } = await db.query(
    `SELECT id FROM users WHERE email = $1;`,
    [user_email]
  );

  if (!user) {
    throw new Error(`User with email ${user_email} does not exist`);
  }

  const sql = `UPDATE trip_member
               SET user_email = $1, user_id = $2
               WHERE id = $3
               RETURNING *;`;
  const { rows: [updatedMember] } = await db.query(sql, [user_email, user.id, memberId]);
  return updatedMember;
}

// Delete a member
export async function deleteTripMember(memberId) {
  const sql = `DELETE FROM trip_member
               WHERE id = $1
               RETURNING *;`;
  const { rows: [deletedMember] } = await db.query(sql, [memberId]);
  return deletedMember;
}