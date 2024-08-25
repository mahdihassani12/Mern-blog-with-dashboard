import Tag from "../models/Tag.js";

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

export { createTag, deleteTag };
