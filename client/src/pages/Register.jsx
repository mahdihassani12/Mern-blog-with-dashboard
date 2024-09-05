import React from "react";
import "../assets/auth.css";

function Register() {
  return (
    <div className="wrapper">
      <form className="form-signin">
        <h2 className="form-signin-heading">Please Register</h2>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Name"
          required
          autoFocus
        />
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Email Address"
          required
        />
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password"
          required
        />
        <select className="form-control" name="role" required>
          <option value="user">User</option>
          <option value="editor">Editor</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
