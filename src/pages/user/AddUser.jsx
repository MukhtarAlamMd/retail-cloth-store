import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { createUser } from "../../services/UserService";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "ROLE_MANAGER",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    let valid = true;

    const errorCopy = {};

    if (user.firstName.trim() === "") {
      errorCopy.firstName = "First name is required";
      valid = false;
    }

    if (user.lastName.trim() === "") {
      errorCopy.lastName = "Last name is required";
      valid = false;
    }

    if (user.email.trim() === "") {
      errorCopy.email = "Email is required";
      valid = false;
    }

    if (user.password.trim() === "") {
      errorCopy.password = "Password is required";
      valid = false;
    }

    if (user.phone.trim() === "") {
      errorCopy.phone = "Phone is required";
      valid = false;
    }

    if (user.address.trim() === "") {
      errorCopy.address = "Address is required";
      valid = false;
    }

    setErrors(errorCopy);

    return valid;
  }

  function saveUser(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    createUser(user)
      .then(() => {
        alert("User created successfully.");

        navigate("/users");
      })
      .catch((error) => {
        console.error(error);

        alert("Unable to create user.");
      });
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3>Add User</h3>
            </div>

            <div className="card-body">
              <form onSubmit={saveUser}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name</label>

                    <input
                      type="text"
                      name="firstName"
                      className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                      value={user.firstName}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{errors.firstName}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>

                    <input
                      type="text"
                      name="lastName"
                      className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                      value={user.lastName}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{errors.lastName}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>

                    <input
                      type="email"
                      name="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      value={user.email}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{errors.email}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>

                    <input
                      type="password"
                      name="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      value={user.password}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>

                    <input
                      type="text"
                      name="phone"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      value={user.phone}
                      onChange={handleChange}
                    />

                    <div className="invalid-feedback">{errors.phone}</div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Role</label>

                    <select
                      className="form-select"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                    >
                      <option value="ROLE_ADMIN">Admin</option>

                      <option value="ROLE_MANAGER">Manager</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Address</label>

                  <textarea
                    rows="3"
                    name="address"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    value={user.address}
                    onChange={handleChange}
                  />

                  <div className="invalid-feedback">{errors.address}</div>
                </div>

                <button type="submit" className="btn btn-success me-2">
                  Save
                </button>

                <Link to="/users" className="btn btn-secondary">
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
