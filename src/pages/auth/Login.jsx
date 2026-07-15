import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/AuthService";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    setError("");

    loginUser(login)
      .then((response) => {
        const data = response.data;

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);

        if (data.role === "ROLE_ADMIN") {
          navigate("/dashboard");
        } else if (data.role === "ROLE_MANAGER") {
          navigate("/dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => {
        setError("Invalid email or password");
      });
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="text-center">Login</h3>
            </div>

            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={login.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={login.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
