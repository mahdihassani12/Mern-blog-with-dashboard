import Category from "../models/Category.js";

// List all categories (for admin or general purposes)
const categories = async (req, res, next) => {
  try {
    const allCategories = await Category.find().sort({ createdAt: -1 }); // Sort by `createdAt` in descending order

    if (!allCategories.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(allCategories);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// List categories created by the authenticated user
const categoriesByUser = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming you have `req.user` populated with the authenticated user's details
    const userCategories = await Category.find({ user: userId }).sort({ createdAt: -1 }); // Sort by `createdAt` in descending order

    if (!userCategories.length) {
      return res.status(200).json([]);
    }

    res.status(200).json(userCategories);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Fetch the category by id (protected function)
const categoryById = async (req, res, next) => {
  try {
    const { id } = req.params; // Get the category ID from the params
    const userId = req.user._id; // Assuming `req.user` contains authenticated user details

    // Check if the category exists and belongs to the user
    const category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({ message: "Category not found or not authorized" });
    }

    res.status(200).json(category);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

// Edit an existing category by its ID (only for the category owner)
const editCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user._id; // Assuming you have `req.user` populated with the authenticated user's details

    // Find the category by ID and userId (ensure user is editing their own category)
    let category = await Category.findOne({ _id: id, user: userId });

    if (!category) {
      return res.status(404).json({
        message:
          "Category not found or you do not have permission to edit this category",
      });
    }

    // Update the category details
    category.title = title || category.title;
    category.description = description || category.description;

    // Save the updated category
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
};

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

export {
  createCategory,
  deleteCategory,
  categories,
  categoriesByUser,
  editCategory,
  categoryById
};
