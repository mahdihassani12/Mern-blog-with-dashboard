import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, reset } from "../../features/auth/authSlice";

function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Add state for the dropdown
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/");
  };

  // Toggle dropdown
  const toggleDropdown = (e) => {
    e.preventDefault(); // Prevent default anchor behavior to stop page refresh
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link text-center">
        <span className="brand-text font-weight-light">The Blog Logo</span>
      </Link>
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <Link to="/profile" className="d-block">
              {user
                ? user.name.charAt(0).toUpperCase() + user.name.slice(1)
                : "Admin"}
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
            <li className="nav-item">
              <Link to="posts" className="nav-link">
                <i className="nav-icon fas fa-pen-nib"></i>
                <p>Posts</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="categories" className="nav-link">
                <i className="nav-icon fas fa-list"></i>
                <p>Categories</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="tags" className="nav-link">
                <i className="nav-icon fas fa-tags"></i>
                <p>Tags</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Users</p>
              </Link>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                <i className="nav-icon fas fa-sign-out-alt"></i>
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
