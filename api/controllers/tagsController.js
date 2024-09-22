import Tag from "../models/Tag.js";

// List all tags (for admin or general purposes)
const tags = async (req, res, next) => {
  try {
    const allTags = await Tag.find().sort({ createdAt: -1 }); // Sort by `createdAt` in descending order
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
      return res.status(404).json({ message: "No tags found for this user" });
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

export { createTag, deleteTag, tags, tagsByUser, editTag, tagById };