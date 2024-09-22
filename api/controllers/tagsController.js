import Tag from "../models/Tag.js";

// List all tags (for admin or general purposes)
const tags = async (req, res, next) => {
  try {
    const allTags = await Tag.find().sort({ createdAt: -1 }); // Sort by `createdAt` in descending order

    if (!allTags.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(allTags);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// List tags created by the authenticated user
const tagsByUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have `req.user` populated with the authenticated user's details
    const userTags = await Tag.find({ user: userId }).sort({ createdAt: -1 }); // Sort by `createdAt` in descending order

    if (!userTags.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(userTags);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Fetch the tag by ID (protected function)
const tagById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the tag ID from the params
    const userId = req.user._id; // Assuming `req.user` contains authenticated user details

    // Check if the tag exists and belongs to the user
    const tag = await Tag.findOne({ _id: id, user: userId });

    if (!tag) {
      return res.status(404).json({ message: "Tag not found or not authorized" });
    }

    res.status(200).json(tag);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Edit an existing tag by its ID (only for the tag owner)
const editTag = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user._id;

    // Find the tag by ID and userId (ensure user is editing their own tag)
    let tag = await Tag.findOne({ _id: id, user: userId });

    if (!tag) {
      return res.status(404).json({
        message: "Tag not found or you do not have permission to edit this tag",
      });
    }

    // Update the tag details
    tag.title = title || tag.title;
    tag.description = description || tag.description;

    // Save the updated tag
    const updatedTag = await tag.save();

    res.status(200).json(updatedTag);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Create a new tag
const createTag = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id;

    // Validate required fields
    if (!title || !description) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Create the tag
    const tag = await Tag.create({
      title,
      description,
      user: userId, // Associate tag with the user
    });

    res.status(201).json(tag);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Delete a tag by ID
const deleteTag = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userId = req.user._id;

    // Find the tag by ID and userId
    const tag = await Tag.findOne({ _id: id, user: userId });

    if (!tag) {
      res.status(404);
      throw new Error(
        "Tag not found or you do not have permission to delete this tag"
      );
    }

    // Delete the tag
    await tag.deleteOne();

    res
      .status(200)
      .json({ message: "Tag deleted successfully", success: "true" });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

export { createTag, deleteTag, tags, tagsByUser, editTag, tagById };