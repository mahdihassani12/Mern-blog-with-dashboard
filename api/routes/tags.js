import express from "express";
const router = express.Router();

import { createTag, deleteTag } from "../controllers/tagsController.js";
import protect from "../middleware/auth.js";

router.post("/", protect, createTag);
router.post("/delete", protect, deleteTag);

export default router;
