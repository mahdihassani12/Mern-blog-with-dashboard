import Category from "../models/Category.js";

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id; // Assuming you have `req.user` populated with the authenticated user's details

    // Validate required fields
    if (!title || !description) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Create the category
    const category = await Category.create({
      title,
      description,
      user: userId, // Associate category with the user
    });

    res.status(201).json(category);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    const userId = req.user._id; // Assuming you have `req.user` populated with the authenticated user's details

    // Find the category by ID and userId
    const category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      res.status(404);
      throw new Error(
        "Category not found or you do not have permission to delete this category"
      );
    }

    // Delete the category
    await category.deleteOne();

    res
      .status(200)
      .json({ message: "Category deleted successfully", success: "true" });
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

export { createCategory, deleteCategory };
