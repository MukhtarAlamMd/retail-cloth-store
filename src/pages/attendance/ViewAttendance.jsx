import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import { getAttendanceById } from "../../services/AttendanceService";

import { FaClipboardCheck, FaArrowLeft } from "react-icons/fa";

const ViewAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = () => {
    getAttendanceById(id)
      .then((response) => {
        setAttendance(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">
              <FaClipboardCheck className="me-2" />
              View Attendance
            </h4>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Employee Code</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendance.employeeCode || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Employee Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendance.employeeName || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Attendance Date</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendance.attendanceDate || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Status</label>

                <input
                  type="text"
                  className="form-control"
                  value={attendance.status || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Check In Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendance.checkInTime || ""}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Check Out Time</label>
                <input
                  type="text"
                  className="form-control"
                  value={attendance.checkOutTime || ""}
                  readOnly
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label fw-bold">Remarks</label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={attendance.remarks || ""}
                  readOnly
                />
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/attendance")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewAttendance;
