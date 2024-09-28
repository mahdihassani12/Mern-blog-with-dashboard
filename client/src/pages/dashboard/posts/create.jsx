import React, { useEffect } from "react";


function Create() {
  useEffect(() => {
    
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Add a Post</h4>
            </div>

            {/* Form for creating post */}
            <form>
              <div className="card-body">
                {/* Title input */}
                <input className="form-control mb-3" type="text" placeholder="Title" required />

                {/* Description input */}
                <textarea className="form-control mb-3" rows="5" placeholder="Description" required />

                {/* Featured Image input */}
                <label className="form-label">Featured Image</label>
                <input className="form-control mb-3" type="file" accept="image/*" />

                {/* Categories select */}
                <label className="form-label">Categories</label>
                <select className="form-control mb-3" multiple="multiple">
                  <option value="category1">Category 1</option>
                  <option value="category2">Category 2</option>
                  <option value="category3">Category 3</option>
                  <option value="category4">Category 4</option>
                </select>

                {/* Tags select */}
                <label className="form-label">Tags</label>
                <select className="form-control mb-3" multiple>
                  <option value="tag1">Tag 1</option>
                  <option value="tag2">Tag 2</option>
                  <option value="tag3">Tag 3</option>
                </select>
              </div>
              
              <div className="card-footer">
                {/* Submit button */}
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Success or error message */}
          <p className="text-success mt-2">Success message</p>
          <p className="text-danger mt-2">Error message</p>
        </div>
      </div>
    </>
  );
}

export default Create;