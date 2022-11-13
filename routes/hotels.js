import express from 'express';
import Hotel from '../models/Hotel.js';
import hotelControllerApi from '../controllers/hotelController.js';
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.get("/", verifyAdmin, hotelControllerApi.createHotel);

// UPDATE
router.put("/update/:id", verifyAdmin, hotelControllerApi.updateHotel);

// LIST / GET
router.get("/list/:id", hotelControllerApi.listHotel);

// LIST / GET ALL
router.get("/listall", hotelControllerApi.listAllHotel);

// DELETE 
router.delete("/delete/:id", verifyAdmin, hotelControllerApi.deleteHotel);

export default router;

// CREATE

// router.post("/", async (req, res) => {

//     const newHotel = new Hotel(req.body)

//     try{
//         const savedHotel = await newHotel.save();
//         res.status(200).json(savedHotel)
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// // UPDATE

// router.put("/update/:id", async (req, res) => {
// 	let id = req.params.id;
// 	let updatedBody = req.body;

//     try{
//         const updatedHotel = await Hotel.findByIdAndUpdate(id, 
//         	{ $set: updatedBody },
//         	{ new: true }
//         );
//         res.status(200).json(updatedHotel)
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// // DELETE
// router.delete("/delete/:id", async (req, res) => {
// 	let id = req.params.id;

//     try{
//         await Hotel.findByIdAndDelete(id);
//         res.status(200).json("Hotel has been deleted");
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// // GET

// router.get("/list/:id", async (req, res) => {
// 	let id = req.params.id;

//     try{
//         const hotel = await Hotel.findById(id);
//         res.status(200).json(hotel);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// });

// // GET ALL

// router.get("/listall", async (req, res, next) => {

//     try{
//         const allHotel = await Hotel.find();
//         res.status(200).json(allHotel);
//     } catch(err) {
//     	next(err);
//         // res.status(500).json(err);
//     }
// });

