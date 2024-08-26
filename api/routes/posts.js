import express from "express";
const router = express.Router();

import {
  getAllPosts,
  getPostsByAuthUser,
  updatePost,
  deletePost,
  createPost,
} from "../controllers/postsController.js";

import protect from "../middleware/auth.js";


router.get("/", getAllPosts);
router.get("/user", protect, getPostsByAuthUser);
router.post("/", protect, createPost);
router.put("/:id", protect, updatePost);
router.delete("/:id", protect, deletePost);

export default router;
