import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useNavigate } from "react-router-dom";
import { createCategory } from "../../../features/categories/categoriesSlice";

function Create() {
  const [setPageHeader] = useOutletContext();

  // Local state for form inputs
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth.user);
  const { loading, error, success } = useSelector((state) => state.categories);

  // Set the page header
  useEffect(() => {
    setPageHeader("Create New Category");
  }, [setPageHeader]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the createCategory action with title and description
    dispatch(createCategory({ title, description, token }));
    navigate("/dashboard/categories");
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add a Category</h4>
            </div>

            {/* Form for creating category */}
            <form onSubmit={handleSubmit}>
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
                  className="form-control"
                  rows="3"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="card-footer">
                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>

          {/* Show success or error message */}
          {success && <p className="text-success mt-2">{success}</p>}
          {error && <p className="text-danger mt-2">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Create;
