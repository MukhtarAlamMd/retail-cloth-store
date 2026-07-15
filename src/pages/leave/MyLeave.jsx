import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";
import { getLeavesByEmployee } from "../../services/LeaveService";

import { FaCalendarAlt, FaSearch, FaEye } from "react-icons/fa";

const MyLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState("");

  // Logged-in Employee Id
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    loadMyLeaves();
  }, []);

  const loadMyLeaves = () => {
    getLeavesByEmployee(employeeId)
      .then((response) => {
        setLeaves(response.data);
        setFilteredLeaves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    setSearch(value);

    const filtered = leaves.filter(
      (leave) =>
        leave.leaveType?.toLowerCase().includes(value) ||
        leave.status?.toLowerCase().includes(value) ||
        leave.reason?.toLowerCase().includes(value),
    );

    setFilteredLeaves(filtered);
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaCalendarAlt className="me-2" />
              My Leave
            </h4>
          </div>

          <div className="card-body">
            {/* Search */}
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Leave..."
                    value={search}
                    onChange={handleSearch}
                  />

                  <span className="input-group-text">
                    <FaSearch />
                  </span>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Leave Type</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Total Days</th>
                    <th>Status</th>
                    <th>Reason</th>
                    <th width="120">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeaves.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No Leave Records Found
                      </td>
                    </tr>
                  ) : (
                    filteredLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>

                        <td>{leave.leaveType}</td>

                        <td>{leave.fromDate}</td>

                        <td>{leave.toDate}</td>

                        <td>{leave.totalDays}</td>

                        <td>
                          <span
                            className={`badge ${
                              leave.status === "APPROVED"
                                ? "bg-success"
                                : leave.status === "REJECTED"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>

                        <td>{leave.reason}</td>

                        <td>
                          <Link
                            to={`/view-leave/${leave.id}`}
                            className="btn btn-info btn-sm"
                          >
                            <FaEye className="me-1" />
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                <strong>Total Leave Requests :</strong> {filteredLeaves.length}
              </div>

              <div>
                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Previous
                </button>

                <button
                  className="btn btn-outline-secondary btn-sm mx-2"
                  disabled
                >
                  1
                </button>

                <button className="btn btn-outline-secondary btn-sm" disabled>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyLeave;
