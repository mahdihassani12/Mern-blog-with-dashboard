import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { fetchTagsByUser, deleteTag } from "../../../features/tags/tagsSlice"; // Import tag actions

function Index() {
  const dispatch = useDispatch();
  const [setPageHeader] = useOutletContext();

  const { token } = useSelector((state) => state.auth.user);
  const { tags, loading, error } = useSelector(
    (state) => state.tags // Access the tags state
  );

  // Set the page header
  useEffect(() => {
    setPageHeader("Tags List");
  }, [setPageHeader]);

  // Fetch tags when component mounts
  useEffect(() => {
    dispatch(fetchTagsByUser(token)); // Dispatch fetchTagsByUser action
  }, [dispatch, token]);

  // Function to truncate description to five words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
  };

  // Function to handle tag deletion
  const handleDelete = (tagId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
    if (confirmDelete) {
      dispatch(deleteTag({ tagId, token })); // Dispatch deleteTag action
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tags</h3>

              <div className="card-tools">
                <Link to="create" className="btn btn-sm btn-primary">
                  Add new
                </Link>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              {loading && <p>Loading...</p>}
              {error && <p className="text-center">{error}</p>}
              {!loading && !error && (
                <table className="table table-hover text-nowrap">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Operation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tags?.length > 0 ? (
                      tags.map((tag, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td>{tag.title}</td>
                          <td>{truncateDescription(tag.description)}</td>
                          <td>
                            <Link to={`edit/${tag._id}`} className="btn btn-sm btn-primary mr-2"> 
                              Edit
                            </Link>
                            <button 
                              className="btn btn-sm btn-danger" 
                              onClick={() => handleDelete(tag._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No tags available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;