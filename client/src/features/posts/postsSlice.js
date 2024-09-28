import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk for creating a post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, description, categories, tags, featuredImage, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/posts",
        { title, description, categories, tags, featuredImage },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error creating post");
    }
  }
);

// Define async thunk for deleting a post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the request headers
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Error deleting the post");
    }
  }
);

// Define async thunk for fetching all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts");
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching posts");
    }
  }
);

// Define async thunk for fetching a post by ID
export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/posts/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching post by ID");
    }
  }
);

// Define async thunk for fetching posts by authenticated user
export const fetchPostsByUser = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/posts/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Error fetching user posts");
    }
  }
);

// Define async thunk for editing a post
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, title, description, categories, tags, featuredImage, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/posts/${id}`,
        { title, description, categories, tags, featuredImage },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Error editing the post");
    }
  }
);

// Initial state for posts slice
const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
  success: null,
};

// Create the posts slice
const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetSuccess: (state) => {
      state.success = null;
    },
    resetPost: (state) => {
      state.post = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload); // Add the new post to the state
        state.success = "Post created successfully!";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create post";
      })
      // Delete Post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.meta.arg.postId // Filter out the deleted post
        );
        state.success = "Post deleted successfully!";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete post";
      })
      // Fetch all Posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch posts";
      })
      // Fetch Post by ID
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload; // Store the fetched post
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch post by ID";
      })
      // Fetch Posts by Auth User
      .addCase(fetchPostsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user posts";
      })
      // Edit Post
      .addCase(editPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the state
        }
        state.success = "Post updated successfully!";
      })
      .addCase(editPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit post";
      });
  },
});

// Export the actions
export const { resetSuccess, resetPost } = postsSlice.actions;

// Export the reducer
export default postsSlice.reducer;