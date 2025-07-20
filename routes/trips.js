import express from "express";
import db from "../db/client.js";
import { createTrip, getMyTrips, getTripId, getPublicTripId, getPublic_SharedTrips, makeTripPublic, makeTripPrivate, deleteTripId } from "../db/queries/trips.js";
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
    console.log(error)
    res.send(error)
  }

});


//get trip details
router.get("/public/:id", async (req, res) => {
  const id = req.params.id;
  const tripId = await getPublicTripId(id);
  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

//get events in the trip
router.get("/public/:id/events", async (req, res) => {
    const id = Number(req.params.id);
    const events = await getTripEvents(id);
    if (!events) {
    return res.status(404).send({ error: "events doesnt exist" });
  }
  res.status(200).send(events);
});

//get trip user is a part of
router.get("/mytrips",requireUser, async (req, res) => {
try {
  console.log(req.user.id)
  const trips = await getMyTrips(req.user.id)
  res.send(trips);
  console.log(trips)
} catch (error) {
  console.log(error)
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

  console.log(newTrip)
  res.sendStatus(201);
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
  if(!req.body.title){
    return res.status(400).send({ message: "please input a title" });
  }

  const id = Number(req.params.id);
  createEvent({
    trip_id: id,
    title: req.body.title, 
    location: req.body.location, 
    status: req.body.status, 
    created_by: req.body.created_by
  })
  res.status(201).send({ message: "event created"});
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

// Make a trip public
router.patch("/:id/public", requireUser, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTrip = await makeTripPublic(id);
    if (!updatedTrip) {
      return res.status(404).send({ error: "Trip not found" });
    }
    res.status(200).send(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update trip: Trip is still private" });
  }
});

// Make a trip private
router.patch("/:id/private", requireUser, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTrip = await makeTripPrivate(id);
    if (!updatedTrip) {
      return res.status(404).send({ error: "Trip not found" });
    }
    res.status(200).send(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update trip: Trip is still public" });
  }
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

router.delete("/:id", requireUser, async (req, res) => {
  const id = req.params.id;
  const tripId = await deleteTripId(id);
  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

export default router;
