import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Sidebar() {
  // Retrieve user data from Redux store
  const { user } = useSelector((state) => state.auth);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link text-center">
        <span className="brand-text font-weight-light">The Blog Logo</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/profile" className="d-block">
              {user ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : "Admin"}
            </Link>
          </div>
        </div>
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item menu-open">
              <Link to="/dashboard" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Starter Pages
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/active" className="nav-link active">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Active Page</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/inactive" className="nav-link">
                    <i className="far fa-circle nav-icon"></i>
                    <p>Inactive Page</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/simple-link" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Simple Link
                  <span className="right badge badge-danger">New</span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
