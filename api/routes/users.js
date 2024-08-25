import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/usersController.js";

import protect from "../middleware/auth.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

export default router;
