import express from "express";
import db from "../db/client.js";
import { createTrip, getTrip, getTripId, getPublic_SharedTrips } from "../db/queries/trips.js";
import { getTripMember } from "../db/queries/trip_members.js";
import requireUser from "../middleware/auth.js";

const router = express.Router();

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
router.get("/", requireUser, async (req, res) => {
  const getTrips = await getTrip(req.user.id)
  res.send(getTrips);
});

//post newly creeated trip
router.post("/", requireUser, async (req, res) => {
  const newTrip = await createTrip({
    title,
    description,
    start_date,
    end_date,
    created_by: req.user.id,
  });
  
  res.sendStatus(201).json(newTrip);
});

//get trip details
router.get("/:tripid", requireUser, async (req, res) => {
  const id = req.params.tripid;
  const tripId = await getTripId(id);

  if (!tripId) {
    return res.status(404).send({ error: "trip doesnt exist" });
  }

  //Todo Public Status of trip go next if true or check if user is trip member to return unauthorized if not public and not current user is not trip member

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


export default router;
