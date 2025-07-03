import db from "./client.js";

import { createEvent } from "./queries/events.js";
import { createFavorite } from "./queries/favorites.js";
import { createTrip } from "./queries/trips.js";
import { createUsers } from "./queries/users.js";
import { createTask } from "./queries/tasks.js";
import { createVote } from "./queries/votes.js";
import { createTripMember } from "./queries/trip_members.js";
import { createComment } from "./queries/comments.js";

async function seed() {
  try {
    await db.connect();

    const user1 = await createUsers({
      email: "1test@test.com",
      name: "test1",
      password: "password",
    });
    

    const trip1 = await createTrip({
      title: "Destination Trip",
      description: "Family Vacay",
      start_date: "2025-07-03T21:47:06.143Z",
      end_date: "2025-07-03T21:47:06.143Z",
      created_by: user1.id,
    });

    const trip_member1 = await createTripMember({
      user_email: user1.email,
      trip_id: trip1.id,
    });

    const event1 = await createEvent({
      trip_id: trip1.id,
      title: "overall trip title",
      location: "washington dc",
      status: "confirmed",
      created_by: user1.id,
    });

    const task1 = await createTask({
      trip_id: trip1.id,
      title: "First Task",
      description: "First task description",
      due_date: "2025-07-03T21:47:06.143Z",
      assigned_to: user1.email,
      complete: false,
      created_by: user1.id,
    });

    const vote1 = await createVote({
      event_id: event1.id,
      trip_id: trip1.id,
      vote_value: false,
    });

    const comment1 = await createComment({
      event_id: event1.id,
      trip_id: trip1.id,
      user_id: user1.id,
      comment_text: "first comment for trip",
    });

    const favorite1 = await createFavorite({
      user_id: user1.id,
      trip_id: trip1.id,
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
