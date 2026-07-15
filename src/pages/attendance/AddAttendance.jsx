import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

import { createAttendance } from "../../services/AttendanceService";

import { listEmployees } from "../../services/EmployeeService";

import {
  FaClipboardCheck,
  FaSave,
  FaArrowLeft,
  FaCalendarAlt,
  FaUserTie,
  FaClock,
  FaStickyNote,
} from "react-icons/fa";

const AddAttendance = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [attendance, setAttendance] = useState({
    employeeId: "",

    attendanceDate: "",

    status: "Present",

    checkInTime: "",

    checkOutTime: "",

    remarks: "",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })

      .catch((error) => {
        console.log(error);

        alert("Unable to load employees.");
      });
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,

      [e.target.name]: e.target.value,
    });
  };

  const saveAttendance = (e) => {
    e.preventDefault();

    if (attendance.employeeId === "") {
      alert("Please select Employee.");
      return;
    }

    if (attendance.attendanceDate === "") {
      alert("Attendance Date is required.");
      return;
    }

    setLoading(true);

    createAttendance(attendance)
      .then(() => {
        alert("Attendance Added Successfully.");

        navigate("/attendance");
      })

      .catch((error) => {
        console.log(error);

        alert("Unable to Save Attendance.");
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-primary text-white">
            <h3 className="mb-0">
              <FaClipboardCheck className="me-2" />
              Add Attendance
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={saveAttendance}>
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
                    value={attendance.employeeId}
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

                {/* Attendance Date */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">
                    <FaCalendarAlt className="me-2" />
                    Attendance Date
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="attendanceDate"
                    value={attendance.attendanceDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Status</label>

                  <select
                    className="form-select"
                    name="status"
                    value={attendance.status}
                    onChange={handleChange}
                  >
                    <option value="Present">Present</option>

                    <option value="Absent">Absent</option>

                    <option value="Leave">Leave</option>

                    <option value="Half Day">Half Day</option>
                  </select>
                </div>

                {/* Check In */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-bold">
                    <FaClock className="me-2" />
                    Check In
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    name="checkInTime"
                    value={attendance.checkInTime}
                    onChange={handleChange}
                  />
                </div>

                {/* Check Out */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-bold">
                    <FaClock className="me-2" />
                    Check Out
                  </label>

                  <input
                    type="time"
                    className="form-control"
                    name="checkOutTime"
                    value={attendance.checkOutTime}
                    onChange={handleChange}
                  />
                </div>

                {/* Remarks */}

                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold">
                    <FaStickyNote className="me-2" />
                    Remarks
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    name="remarks"
                    value={attendance.remarks}
                    onChange={handleChange}
                    placeholder="Enter remarks..."
                  />
                </div>

                {/* Buttons */}

                <div className="col-12">
                  <hr />

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate("/attendance")}
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
                          Save Attendance
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddAttendance;
