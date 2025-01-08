import { Router } from "express";
import { registerUser, loginUser } from "../controller/authController";


const router = Router();

// POST: Register User
router.post('/register', registerUser);

// POST: Login User
router.post('/login', loginUser);

export default router;
