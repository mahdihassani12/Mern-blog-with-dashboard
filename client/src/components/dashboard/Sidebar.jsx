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
            {/* Dropdown menu */}
            <li className={`nav-item ${isDropdownOpen ? "menu-open" : ""}`}>
              <a
                href="#"
                className={`nav-link ${isDropdownOpen ? "active" : ""}`}
                onClick={toggleDropdown}
              >
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Starter Pages
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
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
            {/* Simple Link */}
            <li className="nav-item">
              <Link to="/simple-link" className="nav-link">
                <i className="nav-icon fas fa-th"></i>
                <p>
                  Simple Link
                  <span className="right badge badge-danger">New</span>
                </p>
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
