import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Create() {
  const [setPageHeader] = useOutletContext();

  // Optionally set the page header for this component
  useEffect(() => {
    setPageHeader("Create New Category"); // Set custom header
  }, [setPageHeader]);

  return (
    <>
      <div className="row">
        <div className="col-md-6">

          <div className="card">
            <div class="card-header">
                <h4 className="card-title">Add a category</h4>
            </div>
            <div className="card-body">
              <input className="form-control" type="title" placeholder="Title" />
              <textarea className="form-control" rows="3" placeholder="Description"></textarea>
            </div>
            <div class="card-footer">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>

        </div>{" "}
        {/* /col */}
      </div>
    </>
  );
}

export default Create;
