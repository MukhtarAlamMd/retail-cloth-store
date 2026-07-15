import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { getUser } from "../../services/UserService";

const ViewUser = () => {
  const { id } = useParams();

  const [user, setUser] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  function loadUser() {
    getUser(id)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1">
        <Navbar />

        <div className="container mt-4">
          <div className="card shadow">
            <div className="card-header bg-info text-white">
              <h3>User Details</h3>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-3 fw-bold">User ID</div>

                <div className="col-md-9">{user.id}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">First Name</div>

                <div className="col-md-9">{user.firstName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">Last Name</div>

                <div className="col-md-9">{user.lastName}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">Email</div>

                <div className="col-md-9">{user.email}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">Phone</div>

                <div className="col-md-9">{user.phone}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">Address</div>

                <div className="col-md-9">{user.address}</div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3 fw-bold">Role</div>

                <div className="col-md-9">
                  <span className="badge bg-primary">{user.role}</span>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-3 fw-bold">Status</div>

                <div className="col-md-9">
                  {user.active ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-danger">Inactive</span>
                  )}
                </div>
              </div>

              <Link to="/users" className="btn btn-secondary">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
