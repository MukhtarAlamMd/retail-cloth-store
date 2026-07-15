import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listEmployees } from "../../services/EmployeeService";

import Layout from "../../components/Layout";

import {
  getAttendanceById,
  updateAttendance,
} from "../../services/AttendanceService";

import { FaClipboardCheck, FaSave, FaArrowLeft } from "react-icons/fa";

const EditAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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
    loadAttendance();
  }, []);

  const loadEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadAttendance = () => {
    getAttendanceById(id)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  const updateAttendanceRecord = (e) => {
    e.preventDefault();

    updateAttendance(id, attendance)
      .then(() => {
        alert("Attendance Updated Successfully.");
        navigate("/attendance");
      })
      .catch((error) => {
        console.log(error);
        alert("Unable to Update Attendance.");
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-warning text-dark">
            <h4 className="mb-0">
              <FaClipboardCheck className="me-2" />
              Edit Attendance
            </h4>
          </div>

          <div className="card-body">
            <form onSubmit={updateAttendanceRecord}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Employee</label>

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

                <div className="col-md-6 mb-3">
                  <label className="form-label">Attendance Date</label>

                  <input
                    type="date"
                    className="form-control"
                    name="attendanceDate"
                    value={attendance.attendanceDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label className="form-label">Status</label>

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

                <div className="col-md-3 mb-3">
                  <label className="form-label">Check In</label>

                  <input
                    type="time"
                    className="form-control"
                    name="checkInTime"
                    value={attendance.checkInTime || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Check Out</label>

                  <input
                    type="time"
                    className="form-control"
                    name="checkOutTime"
                    value={attendance.checkOutTime || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="form-label">Remarks</label>

                  <textarea
                    rows="3"
                    className="form-control"
                    name="remarks"
                    value={attendance.remarks || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="text-end">
                <button
                  type="button"
                  className="btn btn-secondary me-2"
                  onClick={() => navigate("/attendance")}
                >
                  <FaArrowLeft className="me-2" />
                  Back
                </button>

                <button type="submit" className="btn btn-success">
                  <FaSave className="me-2" />
                  Update Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditAttendance;
