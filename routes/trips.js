import express from "express";
import db from "../db/client.js";
import { createTrip, getMyTrips, getTripId, getPublicTripId, getPublic_SharedTrips, makeTripPublic, makeTripPrivate, deleteTripId, updateTrip } from "../db/queries/trips.js";
import {
  getTripMember,
  addTripMember,
  updateTripMember,
  deleteTripMember
} from "../db/queries/trip_members.js";
import requireUser from "../middleware/auth.js";
import { getTripEvents, createEvent, editEvent, deleteEvent } from "../db/queries/events.js";

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

//get public events in the trip
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
  ////console.log(req.user.id)
  const trips = await getMyTrips(req.user.id)
  res.send(trips);
  //console.log(trips)
} catch (error) {
  //console.log(error)
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

  //console.log(newTrip)
  res.status(201).json(newTrip);
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
    date_time: req.body.date_time, 
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

//Update Trip
router.patch("/:id", requireUser, async (req, res) => {
  const id = req.params.id;
  const { title, description, public_shared, start_date, end_date } = req.body;

  try {
    const updatedTrip = await updateTrip({
      id,
      title,
      description,
      public_shared,
      start_date,
      end_date,
      created_by: req.user.id
    });
    if (!updatedTrip) {
      return res.status(404).send({ error: "Trip not found" });
    }
    res.status(200).send(updatedTrip);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update trip" });
  }
});


//Delete trip
router.delete("/:id", requireUser, async (req, res) => {
  const id = req.params.id;
  const tripId = await deleteTripId(id);
  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

// POST - Add a member to a trip
router.post("/:id/members", requireUser, async (req, res) => {
  const tripId = Number(req.params.id);
  const { email } = req.body;
  try {
    const newMember = await addTripMember(tripId, email);
    const updatedMembers = await getTripMember(tripId);
    res.status(201).send(updatedMembers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to add member" });
  }
});

// PATCH - Edit a member email
router.patch("/:id/members/:memberId", requireUser, async (req, res) => {
  const tripId = Number(req.params.id);
  const memberId = Number(req.params.memberId);
  const { email } = req.body;
  try {
    const updatedMember = await updateTripMember(memberId, email);
    const updatedMembers = await getTripMember(tripId);
    res.status(200).send(updatedMembers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to update member" });
  }
});

// DELETE - Remove a member
router.delete("/:id/members/:memberId", requireUser, async (req, res) => {
  const tripId = Number(req.params.id);
  const memberId = Number(req.params.memberId);
  try {
    const deleted = await deleteTripMember(memberId);
    const updatedMembers = await getTripMember(tripId);
    res.status(200).send(updatedMembers);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to delete member" });
  }
});

export default router;
