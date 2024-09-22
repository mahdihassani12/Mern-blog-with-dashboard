import express from "express";
const router = express.Router();

import {
  createTag,
  deleteTag,
  tags,
  tagsByUser,
  editTag,
  tagById
} from "../controllers/tagsController.js";
import protect from "../middleware/auth.js";

router.get("/", tags);
router.get("/tags", protect, tagsByUser);
router.get("/tag/:id", protect, tagById);
router.put("/:id", protect, editTag);
router.post("/", protect, createTag);
router.post("/delete", protect, deleteTag);

export default router;