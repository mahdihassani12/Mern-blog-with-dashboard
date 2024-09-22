import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editTag } from "../../../features/tags/tagsSlice"; // Import editTag from tagsSlice
import axios from "axios";

function Edit() {
  const { tagId } = useParams(); // Get tag ID from URL params
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const tagState = useSelector((state) => state.tags);

  useEffect(() => {
    // Fetch the tag details when the component mounts
    const fetchTag = async () => {
      try {
        const response = await axios.get(`/api/tags/tag/${tagId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { title, description } = response.data;
        setTitle(title);
        setDescription(description);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch tag");
        setLoading(false);
      }
    };

    fetchTag();
  }, [tagId, token]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(editTag({ id: tagId, title, description, token }))
      .unwrap()
      .then(() => {
        setSuccess("Tag updated successfully!");
        navigate("/dashboard/tags"); // Adjust the navigation path if necessary
      })
      .catch((err) => {
        console.log(err);
        setError(err.message || "Failed to update tag");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Edit Tag</h4>
          </div>

          {/* Form for editing tag */}
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
                disabled={loading}
              />

              {/* Description input */}
              <textarea
                className="form-control"
                rows="3"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            <div className="card-footer">
              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>

        {/* Show success or error message */}
        {success && <p className="text-success mt-2">{success}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Edit;