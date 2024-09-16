import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk for creating a category
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async ({ title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/categories",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle any error from the API
      return rejectWithValue(error.response.data);
    }
  }
);

// Define async thunk for deleting a category
export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async ({ categoryId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/categories/delete",
        { id: categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      // Handle any error from the API
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for categories slice
const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: null,
};

// Create the categories slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    // Add other synchronous actions if needed, e.g., clearing errors
    resetSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload); // Add the new category to the state
        state.success = "Category created successfully!";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create category";
      })
      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg.categoryId // Filter out the deleted category
        );
        state.success = "Category deleted successfully!";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete category";
      });
  },
});

// Export the actions
export const { resetSuccess } = categoriesSlice.actions;

// Export the reducer
export default categoriesSlice.reducer;
