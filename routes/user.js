import express from 'express';
import userControllerApi from '../controllers/userController.js';
// import verifyToken from '../utils/verifyToken.js';
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// });

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// });

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete your account")
// });

// UPDATE
router.put("/update/:id", verifyUser, userControllerApi.updateUser);

// LIST / GET
router.get("/list/:id", verifyUser, userControllerApi.listUser);

// LIST / GET ALL
router.get("/listall", verifyAdmin, userControllerApi.listAllUser);

// DELETE 
router.delete("/delete/:id", verifyAdmin, userControllerApi.deteteUser);

export default router;