import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getUser, updateUser } from "../../services/UserService";

const EditUser = () => {
  const { id } = useParams();

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

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    getUser(id)
      .then((response) => {
        setUser({
          ...response.data,
          password: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  function validate() {
    let valid = true;

    const copy = {};

    if (user.firstName.trim() === "") {
      copy.firstName = "First name is required";
      valid = false;
    }

    if (user.lastName.trim() === "") {
      copy.lastName = "Last name is required";
      valid = false;
    }

    if (user.email.trim() === "") {
      copy.email = "Email is required";
      valid = false;
    }

    if (user.phone.trim() === "") {
      copy.phone = "Phone is required";
      valid = false;
    }

    if (user.address.trim() === "") {
      copy.address = "Address is required";
      valid = false;
    }

    setErrors(copy);

    return valid;
  }

  function updateUserHandler(e) {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    updateUser(id, user)
      .then(() => {
        alert("User updated successfully.");

        navigate("/users");
      })
      .catch((error) => {
        console.error(error);

        alert("Unable to update user.");
      });
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="card shadow">
            <div className="card-header bg-warning">
              <h3>Edit User</h3>
            </div>

            <div className="card-body">
              <form onSubmit={updateUserHandler}>
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
                      className="form-control"
                      value={user.email}
                      disabled
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">New Password</label>

                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep existing password"
                    />
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

                <button type="submit" className="btn btn-warning me-2">
                  Update
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

export default EditUser;
