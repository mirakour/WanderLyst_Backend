import express from "express";
import db from "../db/client.js";
import { createTrip, getMyTrips, getTripId, getPublic_SharedTrips } from "../db/queries/trips.js";
import { getTripMember } from "../db/queries/trip_members.js";
import requireUser from "../middleware/auth.js";
import { getTripEvents, createEvent } from "../db/queries/events.js";

const router = express.Router();
router.get("/public", async (req, res) => {
  try {
      const trips = await getPublic_SharedTrips();
  if (!trips) {
    return res.status(404).send({ error: "These are not the trips you are looking for" });
  }
  res.send(trips);
  } catch (error) {
    // console.log(error)
    res.send(error)
  }

});


//get public_shared trips
router.get("/public_shared", async (req, res) => {
  try {
    const trips = await getPublic_SharedTrips();

    if (!trips) {
      return res.status(404).json({ error: "These are not the trips you are looking for" });
    }

    res.json(trips);
  } catch (err) {
    console.error("Error fetching public_shared trips:", err);
    res.status(500).json({ error: "Internal server error" });
  }
})

//get trip user is a part of
router.get("/mytrips",requireUser, async (req, res) => {
try {
  const trips = await getMyTrips(req.user.id)
  res.send(trips);
} catch (error) {
  res.send(error)
}

});

//post newly creeated trip
router.post("/", requireUser, async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const start_date = req.body.start_date;
  const end_date = req.body.end_date;
  const created_by = req.user.id;

  const newTrip = await createTrip({
    title,
    description,
    start_date,
    end_date,
    created_by,
  });

  // console.log(newTrip)
  res.sendStatus(201).send({newTrip});
});


//get events in the trip
router.get("/:id/events", requireUser, async (req, res) => {
    const id = Number(req.params.id);
    const events = await getTripEvents(id);
    if (!events) {
    return res.status(404).send({ error: "events doesnt exist" });
  }
  res.status(200).send(events);
});

//post event to a trip
router.post("/:id/events", requireUser, async (req, res) => {
  const id = Number(req.params.id);
  createEvent(id, req.body.title, req.body.location, req.body.status, req.body.created_by)
  res.status(201).send(events);
});


//get trip members
router.get("/:id/members", requireUser, async (req, res) => {
  const id = Number(req.params.id);
  const tripMemberId = await getTripMember(id);
  if (!tripMemberId) {
    return res.status(404).send({ error: "trip id doesnt exist" });
  }
  res.send(tripMemberId);
});


//get trip details
router.get("/:id", requireUser, async (req, res) => {
  const id = req.params.id;
  const tripId = await getTripId(id);
  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

export default router;
