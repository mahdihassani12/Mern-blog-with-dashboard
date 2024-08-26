import Post from "../models/Post.js";

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
    const posts = await Post.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// Create a new post (if needed)
const createPost = async (req, res, next) => {
  try {
    const { title, descriptions, categories, tags, featuredImage } = req.body;

    if (!title || !descriptions) {
      res.status(400);
      throw new Error("Please add all required fields");
    }

    const post = new Post({
      user: req.user._id,
      title,
      descriptions,
      categories,
      tags,
      featuredImage,
    });

    const createdPost = await post.save();

    res.status(201).json(createdPost);
  } catch (error) {
    next(error);
  }
};

// Update a post
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404);
      throw new Error("Post not found");
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to update this post");
    }

    const { title, descriptions, categories, tags, featuredImage } = req.body;

    post.title = title || post.title;
    post.descriptions = descriptions || post.descriptions;
    post.categories = categories || post.categories;
    post.tags = tags || post.tags;
    post.featuredImage = featuredImage || post.featuredImage;

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
      res.status(404);
      throw new Error("Post not found");
    }

    // Check if the logged-in user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("User not authorized to delete this post");
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export { getAllPosts, getPostsByAuthUser, createPost, updatePost, deletePost };
