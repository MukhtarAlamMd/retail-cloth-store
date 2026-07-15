import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";

import { getLeaveById } from "../../services/LeaveService";

import {
  FaClipboardList,
  FaUserTie,
  FaCalendarAlt,
  FaStickyNote,
  FaArrowLeft,
} from "react-icons/fa";

const ViewLeave = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [leave, setLeave] = useState({
    employeeCode: "",
    employeeName: "",
    leaveType: "",
    fromDate: "",
    toDate: "",
    totalDays: "",
    reason: "",
    status: "",
  });

  const loadLeave = () => {
    getLeaveById(id)
      .then((response) => {
        const data = response.data;

        setLeave({
          employeeCode: data.employeeCode || data.employee?.employeeCode || "",

          employeeName:
            data.employeeName ||
            (data.employee
              ? `${data.employee.firstName} ${data.employee.lastName}`
              : ""),

          leaveType: data.leaveType,

          fromDate: data.fromDate ? data.fromDate.substring(0, 10) : "",

          toDate: data.toDate ? data.toDate.substring(0, 10) : "",

          totalDays: data.totalDays,

          reason: data.reason,

          status: data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadLeave();
  });

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-info text-white">
            <h4 className="mb-0">
              <FaClipboardList className="me-2" />
              View Leave
            </h4>
          </div>

          <div className="card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaUserTie className="me-2" />
                  Employee Code
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={leave.employeeCode}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Employee Name</label>

                <input
                  type="text"
                  className="form-control"
                  value={leave.employeeName}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Leave Type</label>

                <input
                  type="text"
                  className="form-control"
                  value={leave.leaveType}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Status</label>

                <input
                  type="text"
                  className="form-control"
                  value={leave.status}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaCalendarAlt className="me-2" />
                  From Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={leave.fromDate}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  <FaCalendarAlt className="me-2" />
                  To Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={leave.toDate}
                  readOnly
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Total Days</label>

                <input
                  type="number"
                  className="form-control"
                  value={leave.totalDays}
                  readOnly
                />
              </div>

              <div className="col-md-12 mb-4">
                <label className="form-label fw-bold">
                  <FaStickyNote className="me-2" />
                  Reason
                </label>

                <textarea
                  className="form-control"
                  rows="4"
                  value={leave.reason}
                  readOnly
                />
              </div>

              <div className="col-12">
                <hr />

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/leave")}
                  >
                    <FaArrowLeft className="me-2" />
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ViewLeave;
