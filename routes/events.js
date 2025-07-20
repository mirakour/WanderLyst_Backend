import express from "express";
import requireUser from "../middleware/auth.js";
import { getEvent, editEvent, deleteEvent } from "../db/queries/events.js";

const router = express.Router();

router.get("/", requireUser, async (req, res) => {
    return res.status(200).send({ message: "le events" });
})

export default router;