import express from "express";
import { signup, signin, googleAuth } from "../controllers/auths.js";

const router = express.Router();

// CREATE USER

router.post("/signup", signup);

// CREATE USER
router.post("/signin", signin);

// GOOGLE SIGN
router.post("/google", googleAuth);

export default router;
