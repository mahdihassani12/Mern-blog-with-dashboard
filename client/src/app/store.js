import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import tagsReducer from "../features/tags/tagsSlice";
import postsReducer from "../features/posts/postsSlice"; // Import the posts slice

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    posts: postsReducer, // Add the posts reducer to the store
  },
});

export default store;