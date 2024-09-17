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
      return rejectWithValue(error.response.data || error.message);
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
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for fetching all categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for fetching categories by authenticated user
export const fetchCategoriesByUser = createAsyncThunk(
  "categories/fetchCategoriesByUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

// Define async thunk for editing a category
export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/categories/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
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
      })
      // Fetch all Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch categories";
      })
      // Fetch Categories by Auth User
      .addCase(fetchCategoriesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user categories";
      })
      // Edit Category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the category in the state
        }
        state.success = "Category updated successfully!";
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit category";
      })
  },
});

// Export the actions
export const { resetSuccess } = categoriesSlice.actions;

// Export the reducer
export default categoriesSlice.reducer;