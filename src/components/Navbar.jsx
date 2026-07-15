import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaStore } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4"
      style={{
        height: "70px",
      }}
    >
      {/* Left */}
      <div className="d-flex align-items-center">
        <FaStore size={28} className="text-primary me-2" />

        <h4 className="mb-0 fw-bold text-primary">Retail Cloth Store</h4>
      </div>

      {/* Right */}

      <div className="ms-auto d-flex align-items-center">
        {!token && (
          <>
            <Link to="/login" className="btn btn-primary me-2">
              Login
            </Link>

            <Link to="/register" className="btn btn-success">
              Register
            </Link>
          </>
        )}

        {token && (
          <>
            <div className="text-end me-4">
              <div className="fw-bold">{name}</div>

              <small className="text-muted">{role}</small>
            </div>

            <FaUserCircle size={38} className="text-secondary me-4" />

            <button className="btn btn-danger" onClick={logout}>
              <FaSignOutAlt className="me-2" />
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
