import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesByUser } from "../../../features/categories/categoriesSlice";
import { fetchTagsByUser } from "../../../features/tags/tagsSlice";
import { createPost } from "../../../features/posts/postsSlice";

function Create() {
  const dispatch = useDispatch();

  // State for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Accessing token, categories, tags, and post creation status from the Redux store
  const { token } = useSelector((state) => state.auth.user);
  const { categories } = useSelector((state) => state.categories);
  const { tags } = useSelector((state) => state.tags);
  const { isSuccess, isError, message } = useSelector((state) => state.posts);

  // Fetch categories and tags when component mounts
  useEffect(() => {
    dispatch(fetchCategoriesByUser(token));
    dispatch(fetchTagsByUser(token));
  }, [dispatch, token]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("featuredImage", featuredImage); // file
    
    // Append each selected category to FormData
    selectedCategories.forEach((category) => {
      formData.append("categories[]", category); // Use 'categories[]' for array
    });
    
    // Append each selected tag to FormData
    selectedTags.forEach((tag) => {
      formData.append("tags[]", tag); // Use 'tags[]' for array
    });
    
    // Dispatch with the formData and token
    dispatch(createPost({ formData, token }));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add a Post</h4>
            </div>

            {/* Form for creating post */}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="card-body">
                {/* Title input */}
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />

                {/* Description input */}
                <textarea
                  className="form-control mb-3"
                  rows="5"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />

                {/* Featured Image input */}
                <label className="form-label">Featured Image</label>
                <input
                  className="form-control mb-3"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                />

                {/* Categories select */}
                <label className="form-label">Categories</label>
                <select
                  className="form-control mb-3"
                  multiple
                  value={selectedCategories}
                  onChange={(e) =>
                    setSelectedCategories(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {categories?.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.title}
                      </option>
                    ))
                  ) : (
                    <option>No categories available</option>
                  )}
                </select>

                {/* Tags select */}
                <label className="form-label">Tags</label>
                <select
                  className="form-control mb-3"
                  multiple
                  value={selectedTags}
                  onChange={(e) =>
                    setSelectedTags(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                >
                  {tags?.length > 0 ? (
                    tags.map((tag) => (
                      <option key={tag._id} value={tag._id}>
                        {tag.title}
                      </option>
                    ))
                  ) : (
                    <option>No tags available</option>
                  )}
                </select>
              </div>

              <div className="card-footer">
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>

            {/* Success or error message */}
            {isSuccess && <p className="text-success mt-2">Post created successfully!</p>}
            {isError && <p className="text-danger mt-2">{message || "Error creating post"}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;