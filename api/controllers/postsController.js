import Post from "../models/Post.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url'; // Import for getting the current file URL
import { dirname } from 'path'; // Import for path manipulations

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Get all posts by authenticated user
const getPostsByAuthUser = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.user._id }).populate("user", "name email");
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Create a new post
const createPost = async (req, res, next) => {
  try {
    const { title, description, categories, tags } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: "Please add all fields" });
    }

    // Initialize featuredImage as an empty string
    let featuredImage = "";

    // Check if an image file is provided
    if (req.files && req.files.featuredImage) {
      let image = req.files.featuredImage;

      // Define the upload path (using path module)
      const uploadPath = path.join(__dirname, "../public/uploads/", image.name);

      // Move the image to the uploads folder
      image.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ message: "Image upload failed", error: err });
        }
      });

      // Set the image URL to be stored in the database
      featuredImage = `/uploads/${image.name}`;
    }

    // Create the post
    const post = await Post.create({
      title,
      description,
      categories: categories || [],
      tags: tags || [],
      featuredImage,
      user: userId,
    });

    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

// Get a post by ID
const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate("user", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, categories, tags } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized to update this post" });
    }

    // Check for a new image file
    let featuredImage = post.featuredImage;
    if (req.files && req.files.featuredImage) {
      let image = req.files.featuredImage;

      // Define the new upload path
      const uploadPath = path.join(__dirname, "../public/uploads/", image.name);

      // Delete old image if exists
      if (featuredImage) {
        const oldImagePath = path.join(__dirname, "../public", featuredImage);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Move new image to uploads
      image.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ message: "Image upload failed", error: err });
        }
      });

      featuredImage = `/uploads/${image.name}`;
    }

    // Update post fields
    post.title = title || post.title;
    post.description = description || post.description;
    post.categories = categories || post.categories;
    post.tags = tags || post.tags;
    post.featuredImage = featuredImage;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete a post
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized to delete this post" });
    }

    // Delete the associated image if exists
    if (post.featuredImage) {
      const imagePath = path.join(__dirname, "../public", post.featuredImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the post from the database
    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, getPostsByAuthUser, createPost, getPostById, updatePost, deletePost };