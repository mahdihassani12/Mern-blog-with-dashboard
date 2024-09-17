import express from "express";
const router = express.Router();

import {
  categories,
  categoriesByUser,
  editCategory,
  createCategory,
  deleteCategory,
  categoryById
} from "../controllers/categoriesController.js";
import protect from "../middleware/auth.js";

router.get("/", categories);
router.get("/categories", protect, categoriesByUser);
router.get("/category/:id", protect, categoryById);
router.put("/:id", protect, editCategory);
router.post("/", protect, createCategory);
router.post("/delete", protect, deleteCategory);

export default router;
