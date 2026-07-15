import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  listLeaves,
  deleteLeave,
  approveLeave,
  rejectLeave,
} from "../../services/LeaveService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";

const LeaveList = () => {
  const navigate = useNavigate();

  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  // ================= Load Leaves =================

  const getAllLeaves = () => {
    listLeaves()
      .then((response) => {
        setLeaves(response.data);
        setFilteredLeaves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllLeaves();
  }, []);

  // ================= Search =================

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    const result = leaves.filter(
      (leave) =>
        leave.employeeName?.toLowerCase().includes(value.toLowerCase()) ||
        leave.employeeCode?.toLowerCase().includes(value.toLowerCase()) ||
        leave.leaveType?.toLowerCase().includes(value.toLowerCase()) ||
        leave.status?.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredLeaves(result);
  };

  // ================= Delete =================

  const deleteLeaveData = (id) => {
    if (!window.confirm("Are you sure you want to delete this leave?")) {
      return;
    }

    deleteLeave(id)
      .then(() => {
        alert("Leave Deleted Successfully");
        getAllLeaves();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ================= Approve =================

  const handleApprove = (id) => {
    approveLeave(id)
      .then(() => {
        alert("Leave Approved");
        getAllLeaves();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ================= Reject =================

  const handleReject = (id) => {
    rejectLeave(id)
      .then(() => {
        alert("Leave Rejected");
        getAllLeaves();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <FaCalendarAlt className="me-2" />
              Leave Management
            </h4>

            {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
              <button
                className="btn btn-light"
                onClick={() => navigate("/add-leave")}
              >
                <FaPlus className="me-2" />
                Add Leave
              </button>
            )}
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

                    <th>Employee</th>

                    <th>Leave Type</th>

                    <th>From</th>

                    <th>To</th>

                    <th>Total Days</th>

                    <th>Status</th>

                    <th width="420">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeaves.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center">
                        No Leave Records Found
                      </td>
                    </tr>
                  ) : (
                    filteredLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>

                        <td>
                          <strong>{leave.employeeCode}</strong>
                          <br />
                          {leave.employeeName}
                        </td>

                        <td>{leave.leaveType}</td>

                        <td>{leave.fromDate}</td>

                        <td>{leave.toDate}</td>

                        <td>{leave.totalDays}</td>

                        <td>
                          <span
                            className={`badge ${
                              leave.status === "Approved"
                                ? "bg-success"
                                : leave.status === "Rejected"
                                  ? "bg-danger"
                                  : "bg-warning text-dark"
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => navigate(`/view-leave/${leave.id}`)}
                          >
                            <FaEye className="me-1" />
                            View
                          </button>

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() =>
                                  navigate(`/edit-leave/${leave.id}`)
                                }
                              >
                                <FaEdit className="me-1" />
                                Edit
                              </button>

                              {leave.status === "Pending" && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() => handleApprove(leave.id)}
                                  >
                                    <FaCheck />
                                  </button>

                                  <button
                                    className="btn btn-danger btn-sm me-2"
                                    onClick={() => handleReject(leave.id)}
                                  >
                                    <FaTimes />
                                  </button>
                                </>
                              )}

                              {role === "ROLE_ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => deleteLeaveData(leave.id)}
                                >
                                  <FaTrash className="me-1" />
                                  Delete
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <strong>Total Leave Records : {filteredLeaves.length}</strong>

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

export default LeaveList;
