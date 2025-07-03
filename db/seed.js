import db from "./client.js";

import { createUsers } from "./queries/users.js";

async function seed() {
  try {
    await db.connect();

    const user1 = await createUsers({
      email: "test@test.com",
      name: "test1",
      password,
    });

    console.log("🌱 Database seeded.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await db.end();
  }
}

await seed();
await db.end();
