import express from "express";
import db from "../db/client.js";
import { createTrip, getTrip, getTripId } from "../db/queries/trips.js";
import { getTripMember } from "../db/queries/trip_members.js";
import requireUser from "../middleware/auth.js";
import { getTripEvents, createEvent } from "../db/queries/events.js";

const router = express.Router();

//get trip user is a part of
router.get("/", requireUser, async (req, res) => {
  const getTrips = await getTrip();
  res.send(getTrips);
});

//post newly creeated trip
router.post("/", requireUser, async (req, res) => {
  const newTrip = await createTrip({
    title,
    description,
    start_date,
    end_date,
    created_by,
  });

  res.sendStatus(201).send(newTrip);
});

//get trip details
router.get("/:tripid", requireUser, async (req, res) => {
  const id = Number(req.params.tripid);
  const tripId = await getTripId(id);

  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

//get events in the trip
router.get("/:tripid/events", requireUser, async (req, res) => {
    const id = Number(req.params.tripid);
    const events = getTripEvents(id);
    
    if (!events) {
    return res.status(404).send({ error: "events doesnt exist" });
  }
  res.status(200).send(events);
});

//post event to a trip
router.post("/:tripid/events", requireUser, async (req, res) => {
  const id = Number(req.params.id);
  createEvent(id, req.body.title, req.body.location, req.body.status, req.body.created_by)
  res.status(201).send(events);
});

router.get("/:tripid/members", requireUser, async (req, res) => {
  const id = Number(req.params.trip_id);
  const tripMemberId = await getTripMember(id);
  if (!tripMemberId) {
    return res.status(404).send({ error: "trip id doesnt exist" });
  }
  res.send(tripMemberId);
});

export default router;
