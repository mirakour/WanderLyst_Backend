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

    const user2 = await createUsers({
      email: "2test@test.com",
      name: "test2",
      password: "password",
    });
    
    const user3 = await createUsers({
      email: "3test@test.com",
      name: "test3",
      password: "password",
    });

    const user4 = await createUsers({
      email: "4test@test.com",
      name: "test4",
      password: "password",
    });

    const user5 = await createUsers({
      email: "5test@test.com",
      name: "test5",
      password: "password",
    });

    const user6 = await createUsers({
      email: "6test@test.com",
      name: "test6",
      password: "password",
    });
    
    const user7 = await createUsers({
      email: "7test@test.com",
      name: "test7",
      password: "password",
    });  

    const trip1 = await createTrip({
      title: "Destination Trip",
      description: "Family Vacay",
      public_shared: true,
      start_date: "2025-07-03T21:47:06.143Z",
      end_date: "2025-07-03T21:47:06.143Z",
      created_by: user1.id,
    });

    const trip2 = await createTrip({
      title: "Disney",
      description: "To see Mickey",
      public_shared: true,
      start_date: "2025-07-03T21:47:06.143Z",
      end_date: "2025-07-03T21:47:06.143Z",
      created_by: user3.id,
    });

    const trip3 = await createTrip({
      title: "Back to Mackinac",
      description: "to/from ferry time",
      public_shared: false,
      start_date: "2025-07-03T21:47:06.143Z",
      end_date: "2025-07-03T21:47:06.143Z",
      created_by: user5.id,
    });

    const trip4 = await createTrip({
      title: "Solo Dolo",
      description: "me time",
      public_shared: false,
      start_date: "2025-07-03T21:47:06.143Z",
      end_date: "2025-07-03T21:47:06.143Z",
      created_by: user7.id,
    });


    const trip_member1 = await createTripMember({
      user_email: user1.email,
      user_id: user1.id,
      trip_id: trip1.id,
    });

    const trip_member2 = await createTripMember({
      user_email: user2.email,
      user_id: user2.id,
      trip_id: trip1.id,
    });

    const trip_member3 = await createTripMember({
      user_email: user3.email,
      user_id: user3.id,
      trip_id: trip1.id,
    });

    const trip_member4 = await createTripMember({
      user_email: user4.email,
      user_id: user4.id,
      trip_id: trip1.id,
    });

    const trip_member5 = await createTripMember({
      user_email: user3.email,
      user_id: user3.id,
      trip_id: trip2.id,
    });

    const trip_member6 = await createTripMember({
      user_email: user4.email,
      user_id: user4.id,
      trip_id: trip2.id,
    });

     const trip_member7 = await createTripMember({
      user_email: user5.email,
      user_id: user5.id,
      trip_id: trip2.id,
    });

    const trip_member8 = await createTripMember({
      user_email: user6.email,
      user_id: user6.id,
      trip_id: trip2.id,
    });

     const trip_member9 = await createTripMember({
      user_email: user5.email,
      user_id: user5.id,
      trip_id: trip3.id,
    });

    const trip_member10 = await createTripMember({
      user_email: user7.email,
      user_id: user7.id,
      trip_id: trip4.id,
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
