import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  listAttendance,
  deleteAttendance,
} from "../../services/AttendanceService";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaClipboardCheck,
} from "react-icons/fa";

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    getAllAttendance();
  }, []);

  const getAllAttendance = () => {
    listAttendance()
      .then((response) => {
        setAttendanceList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeAttendance = (id) => {
    if (!window.confirm("Delete this attendance?")) {
      return;
    }

    deleteAttendance(id)
      .then(() => {
        getAllAttendance();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container">
        <h3>
          <FaClipboardCheck className="me-2" />
          Attendance Management
        </h3>

        <Link to="/add-attendance" className="btn btn-primary mb-3">
          <FaPlus className="me-2" />
          Add Attendance
        </Link>

        {/* Table will be added in the next step */}
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">
              <FaClipboardCheck className="me-2" />
              Attendance List
            </h4>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Employee Code</th>
                    <th>Employee Name</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Remarks</th>
                    <th width="180">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {attendanceList.length > 0 ? (
                    attendanceList.map((attendance) => (
                      <tr key={attendance.id}>
                        <td>{attendance.id}</td>

                        <td>{attendance.employeeCode}</td>

                        <td>{attendance.employeeName}</td>

                        <td>{attendance.attendanceDate}</td>

                        <td>
                          <span
                            className={
                              attendance.status === "Present"
                                ? "badge bg-success"
                                : attendance.status === "Absent"
                                  ? "badge bg-danger"
                                  : attendance.status === "Leave"
                                    ? "badge bg-warning text-dark"
                                    : "badge bg-info"
                            }
                          >
                            {attendance.status}
                          </span>
                        </td>

                        <td>{attendance.checkInTime}</td>

                        <td>{attendance.checkOutTime}</td>

                        <td>{attendance.remarks}</td>

                        <td>
                          <Link
                            to={`/view-attendance/${attendance.id}`}
                            className="btn btn-info btn-sm me-1"
                          >
                            <FaEye />
                          </Link>

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              <Link
                                to={`/edit-attendance/${attendance.id}`}
                                className="btn btn-warning btn-sm me-1"
                              >
                                <FaEdit />
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => removeAttendance(attendance.id)}
                              >
                                <FaTrash />
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center text-muted">
                        No Attendance Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AttendanceList;
