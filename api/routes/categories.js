import express from "express";
const router = express.Router();

import {
  createCategory,
  deleteCategory,
} from "../controllers/categoriesController.js";
import protect from "../middleware/auth.js";

router.post("/", protect, createCategory);
router.post("/delete", protect, deleteCategory);

export default router;
