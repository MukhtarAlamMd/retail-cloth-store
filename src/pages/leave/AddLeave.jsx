import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { createLeave } from "../../services/LeaveService";
import { listEmployees } from "../../services/EmployeeService";

import {
  FaCalendarAlt,
  FaUserTie,
  FaClipboardList,
  FaStickyNote,
  FaSave,
  FaArrowLeft,
} from "react-icons/fa";

const AddLeave = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [leave, setLeave] = useState({
    employeeId: "",
    leaveType: "Casual",
    fromDate: "",
    toDate: "",
    totalDays: "",
    reason: "",
    status: "Pending",
  });

  const loadEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedLeave = {
      ...leave,
      [name]: value,
    };

    if (updatedLeave.fromDate && updatedLeave.toDate) {
      const from = new Date(updatedLeave.fromDate);
      const to = new Date(updatedLeave.toDate);

      if (to >= from) {
        updatedLeave.totalDays =
          Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
      } else {
        updatedLeave.totalDays = "";
      }
    }

    setLeave(updatedLeave);
  };

  const saveLeave = (e) => {
    e.preventDefault();

    if (leave.totalDays === "" || leave.totalDays <= 0) {
      alert("To Date must be greater than or equal to From Date.");
      return;
    }
    setLoading(true);

    createLeave(leave)
      .then(() => {
        alert("Leave Added Successfully.");
        navigate("/leave");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to Save Leave.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaClipboardList className="me-2" />
              Add Leave
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={saveLeave}>
              <div className="row">
                {/* Employee */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaUserTie className="me-2" />
                    Employee
                  </label>

                  <select
                    className="form-select"
                    name="employeeId"
                    value={leave.employeeId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Employee</option>

                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.employeeCode} - {employee.firstName}{" "}
                        {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Leave Type */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Leave Type</label>

                  <select
                    className="form-select"
                    name="leaveType"
                    value={leave.leaveType}
                    onChange={handleChange}
                  >
                    <option value="Casual">Casual Leave</option>

                    <option value="Sick">Sick Leave</option>

                    <option value="Annual">Annual Leave</option>

                    <option value="Maternity">Maternity Leave</option>

                    <option value="Paternity">Paternity Leave</option>

                    <option value="Emergency">Emergency Leave</option>
                  </select>
                </div>

                {/* From Date */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaCalendarAlt className="me-2" />
                    From Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="fromDate"
                    value={leave.fromDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* To Date */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaCalendarAlt className="me-2" />
                    To Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="toDate"
                    value={leave.toDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Total Days */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Total Days</label>

                  <input
                    type="number"
                    className="form-control"
                    value={leave.totalDays}
                    readOnly
                  />
                </div>

                {/* Status */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Status</label>

                  <input
                    type="text"
                    className="form-control"
                    value={leave.status}
                    readOnly
                  />
                </div>

                {/* Reason */}

                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold">
                    <FaStickyNote className="me-2" />
                    Reason
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="reason"
                    value={leave.reason}
                    onChange={handleChange}
                    placeholder="Enter leave reason..."
                    required
                  />
                </div>

                {/* Action Buttons */}

                <div className="col-12">
                  <hr />

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate("/leave")}
                    >
                      <FaArrowLeft className="me-2" />
                      Back
                    </button>

                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FaSave className="me-2" />
                          Save Leave
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>{" "}
              {/* End Row */}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddLeave;
