import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FrontendLayout from "./layouts/FrontendLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import Home from "./pages/frontend/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Provider } from "react-redux";
import store from "./app/store";
import AuthProvider from "./components/AuthProvider";

// Import Post components
import IndexPosts from "./pages/dashboard/posts/index"; // Posts list
import CreatePost from "./pages/dashboard/posts/create"; // Create Post
import EditPost from "./pages/dashboard/posts/edit"; // Edit Post

// Import Tag components
import IndexTags from "./pages/dashboard/tags/index"; // Tags list
import CreateTag from "./pages/dashboard/tags/create"; // Create Tag
import EditTag from "./pages/dashboard/tags/edit"; // Edit Tag

// Import Category components
import IndexCategories from "./pages/dashboard/categories/index"; // Categories list
import CreateCategory from "./pages/dashboard/categories/create"; // Create Category
import EditCategory from "./pages/dashboard/categories/edit"; // Edit Category

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<FrontendLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<AuthProvider />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />

            {/* Posts Routes */}
            <Route path="posts" element={<IndexPosts />} />
            <Route path="posts/create" element={<CreatePost />} />
            <Route path="posts/edit/:postId" element={<EditPost />} />

            {/* Tags Routes */}
            <Route path="tags" element={<IndexTags />} />
            <Route path="tags/create" element={<CreateTag />} />
            <Route path="tags/edit/:tagId" element={<EditTag />} />

            {/* Categories Routes */}
            <Route path="categories" element={<IndexCategories />} />
            <Route path="categories/create" element={<CreateCategory />} />
            <Route path="categories/edit/:categoryId" element={<EditCategory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
