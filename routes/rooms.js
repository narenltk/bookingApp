import express from 'express';
import Hotel from '../models/Hotel.js';
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms } from '../controllers/roomController.js';
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
router.put("/update/:id", verifyAdmin, updateRoom);

// LIST / GET
router.get("/list/:id", getRoom);

// LIST / GET ALL
router.get("/listall", getRooms);

// DELETE 
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

export default router;