import express from 'express';
import registerApi from '../controllers/authController.js';

const router = express.Router();

router.post("/register", registerApi.register);

router.post("/login", registerApi.login);

export default router;