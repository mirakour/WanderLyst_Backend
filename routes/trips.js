import express from "express";
import db from "../db/client.js";
import { createTrip, getTrip, getTripId, getPublicTrips } from "../db/queries/trips.js";
import { getTripMember } from "../db/queries/trip_members.js";
import requireUser from "../middleware/auth.js";

const router = express.Router();

//get trip user is a part of
router.get("/", requireUser, async (req, res) => {
  const getTrips = await getTrip({
    id,
    title,
    description,
    start_date,
    end_date,
    created_by,
    created_at,
    updated_at,
  });
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
  const id = req.params.tripid;
  const tripId = await getTripId(id);

  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }
  res.send(tripId);
});

router.get("/:tripid/members", requireUser, async (req, res) => {
  const id = Number(req.params.trip_id);
  const tripMemberId = await getTripMember(id);
  if (!tripMemberId) {
    return res.status(404).send({ error: "trip id doesnt exist" });
  }
  res.send(tripMemberId);
});

router.get("/public", async (req, res) => {
  const trips = await getPublicTrips();
  if (!trips) {
    return res.status(404).send({ error: "These are not the trips you are looking for" });
  }
  res.send(trips);
});

export default router;
