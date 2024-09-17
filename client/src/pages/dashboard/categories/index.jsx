import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { fetchCategoriesByUser } from "../../../features/categories/categoriesSlice"; 

function Index() {
  const dispatch = useDispatch();
  const [setPageHeader] = useOutletContext();

  const { token } = useSelector((state) => state.auth.user);
  const { categories, loading, error } = useSelector(
    (state) => state.categories
  );

  // Set the page header
  useEffect(() => {
    setPageHeader("Categories List");
  }, [setPageHeader]);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategoriesByUser(token));
  }, [dispatch, token]);

  // Function to truncate description to five words
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 5 ? words.slice(0, 5).join(" ") + "..." : description;
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Categories</h3>

              <div className="card-tools">
                <Link to="create" className="btn btn-sm btn-primary">
                  Add new
                </Link>
              </div>
            </div>
            <div className="card-body table-responsive p-0">
              {loading && <p>Loading...</p>}
              {error && <p>Error fetching categories: {error}</p>}
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
                    {categories?.length > 0 ? (
                      categories.map((category, idx) => (
                        <tr key={category.id}>
                          <td>{idx + 1}</td>
                          <td>{category.title}</td>
                          <td>{truncateDescription(category.description)}</td>
                          <td>
                            <button className="btn btn-sm btn-primary mr-2">
                              Edit
                            </button>
                            <button className="btn btn-sm btn-danger">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4">No categories available</td>
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
