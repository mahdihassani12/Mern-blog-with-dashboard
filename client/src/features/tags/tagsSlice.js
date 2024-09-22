import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk for creating a tag
export const createTag = createAsyncThunk(
  "tags/createTag",
  async ({ title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/tags",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error creating the tag");
    }
  }
);

// Define async thunk for deleting a tag
export const deleteTag = createAsyncThunk(
  "tags/deleteTag",
  async ({ tagId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/tags/delete",
        { id: tagId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error deleting the tag");
    }
  }
);

// Define async thunk for fetching all tags
export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tags");
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching the tags");
    }
  }
);

// Define async thunk for fetching tags by authenticated user
export const fetchTagsByUser = createAsyncThunk(
  "tags/fetchTagsByUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/tags/tags", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // This will return an empty array if no tags are found
    } catch (error) {
      return rejectWithValue("Error fetching the tags");
    }
  }
);

// Define async thunk for editing a tag
export const editTag = createAsyncThunk(
  "tags/editTag",
  async ({ id, title, description, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/tags/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error editing the tag");
    }
  }
);

// Initial state for tags slice
const initialState = {
  tags: [],
  loading: false,
  error: null,
  success: null,
};

// Create the tags slice
const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    // Add other synchronous actions if needed, e.g., clearing errors
    resetSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Tag
      .addCase(createTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags.push(action.payload); // Add the new tag to the state
        state.success = "Tag created successfully!";
      })
      .addCase(createTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create tag";
      })
      // Delete Tag
      .addCase(deleteTag.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = state.tags.filter(
          (tag) => tag._id !== action.meta.arg.tagId // Filter out the deleted tag
        );
        state.success = "Tag deleted successfully!";
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete tag";
      })
      // Fetch all Tags
      .addCase(fetchTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch tags";
      })
      // Fetch Tags by Auth User
      .addCase(fetchTagsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTagsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user tags";
      })
      // Edit Tag
      .addCase(editTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTag.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tags.findIndex(
          (tag) => tag._id === action.payload._id
        );
        if (index !== -1) {
          state.tags[index] = action.payload; // Update the tag in the state
        }
        state.success = "Tag updated successfully!";
      })
      .addCase(editTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit tag";
      });
  },
});

// Export the actions
export const { resetSuccess } = tagsSlice.actions;

// Export the reducer
export default tagsSlice.reducer;
