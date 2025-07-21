import express from "express";
import requireUser from "../middleware/auth.js";
import { getEvent, editEvent, deleteEvent } from "../db/queries/events.js";

const router = express.Router();

router.get("/", requireUser, async (req, res) => {
    return res.status(200).send({ message: "this is the events route" });
})

//gets a specific event
router.get("/:id", requireUser, async (req, res) => {
    const id = Number(req.params.id)
    const event = await getEvent(id)
    if(!event){
        return res.status(404).send({error: "event does not exsist"})
    }
    return res.status(200).send(event)
})

//edits the event status
router.put("/:id", requireUser, async (req, res) => {
    const newStatus = req.body.status
    if(!newStatus){
        return res.status(400).send({ error: "please include a status" });
    }

    const id = Number(req.params.id)
    const event = await getEvent(id)
    
    if(!event){
        return res.status(404).send({ error: "event does not exsist" });
    }

  editEvent(id, newStatus)
  res.status(201).send({message: "status updated"})
})

//deletes the event
router.delete("/:id", requireUser, async (req, res) => {
    const id = Number(req.params.id)
    const event = await getEvent(id)
    if(!event){
        return res.status(404).send({ error: "event does not exsist" });
    }
deleteEvent(id)
res.status(201).send({ message: "event deleted"});
})

export default router;