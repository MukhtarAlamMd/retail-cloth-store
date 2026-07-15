import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/AuthService";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "ROLE_MANAGER",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setUser({
      ...user,

      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSuccess("");
    setError("");

    registerUser(user)
      .then((response) => {
        setSuccess(response.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })

      .catch((error) => {
        if (error.response) {
          setError(error.response.data.message || "Registration Failed");
        } else {
          setError("Unable to connect to server");
        }
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="text-center">Register</h3>
            </div>

            <div className="card-body">
              {success && <div className="alert alert-success">{success}</div>}

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">First Name</label>

                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={user.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>

                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={user.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Role</label>

                  <select
                    name="role"
                    className="form-select"
                    value={user.role}
                    onChange={handleChange}
                  >
                    <option value="ROLE_ADMIN">Admin</option>

                    <option value="ROLE_MANAGER">Manager</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-success w-100">
                  Register
                </button>
              </form>

              <div className="text-center mt-3">
                Already have an account?
                <Link to="/login" className="ms-2">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
