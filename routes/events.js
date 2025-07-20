import express from "express";
import requireUser from "../middleware/auth.js";
import { getEvent, editEvent, deleteEvent } from "../db/queries/events.js";

const router = express.Router();

router.get("/", requireUser, async (req, res) => {
    return res.status(200).send({ message: "this is the events route" });
})

router.get("/:id", requireUser, async (req, res) => {
    const id = Number(req.params.id);
    const event = await getEvent(id)
    if(!event){
        return res.status(404).send({error: "this event does not exsist"})
    }
    return res.status(200).send(event)
})

export default router;