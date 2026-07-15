import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";

import { getPayrollById } from "../../services/PayrollService";

import {
  FaMoneyCheckAlt,
  FaArrowLeft,
  FaUserTie,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

const ViewPayroll = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [payroll, setPayroll] = useState({
    employeeCode: "",

    employeeName: "",

    department: "",

    designation: "",

    month: "",

    year: "",

    basicSalary: "",

    bonus: "",

    deduction: "",

    netSalary: "",

    paymentDate: "",

    paymentStatus: "",
  });

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = () => {
    getPayrollById(id)
      .then((response) => {
        setPayroll(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow-lg border-0 rounded-4">
          {/* Header */}

          <div
            className="card-header text-white py-3"
            style={{
              background: "linear-gradient(90deg,#0d6efd,#20c997)",
            }}
          >
            <h3 className="mb-0 fw-bold">
              <FaMoneyCheckAlt className="me-2" />
              Payroll Details
            </h3>
          </div>

          <div className="card-body p-4">
            {/* Employee Information */}

            <div className="card shadow-sm border-0 mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-primary">
                  <FaUserTie className="me-2" />
                  Employee Information
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Employee Code</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.employeeCode}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Employee Name</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.employeeName}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Department</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.department}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Designation</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.designation}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payroll Information */}

            <div className="card shadow-sm border-0">
              <div className="card-header bg-light">
                <h5 className="mb-0 text-success">
                  <FaCalendarAlt className="me-2" />
                  Payroll Information
                </h5>
              </div>

              <div className="card-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Payroll Month</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.month}
                      readOnly
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="fw-bold">Payroll Year</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.year}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="fw-bold text-primary">Basic Salary</label>

                    <input
                      type="text"
                      className="form-control fw-bold"
                      value={`₹ ${payroll.basicSalary}`}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="fw-bold text-success">Bonus</label>

                    <input
                      type="text"
                      className="form-control fw-bold text-success"
                      value={`₹ ${payroll.bonus}`}
                      readOnly
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="fw-bold text-danger">Deduction</label>

                    <input
                      type="text"
                      className="form-control fw-bold text-danger"
                      value={`₹ ${payroll.deduction}`}
                      readOnly
                    />
                  </div>

                  {/* Net Salary */}

                  <div className="col-md-12 mt-4">
                    <div className="card border-0 shadow-lg bg-primary text-white">
                      <div className="card-body text-center">
                        <h5 className="mb-2">Net Salary</h5>

                        <h1 className="fw-bold">₹ {payroll.netSalary}</h1>
                      </div>
                    </div>
                  </div>

                  {/* Payment Date */}

                  <div className="col-md-6 mt-4">
                    <label className="fw-bold">Payment Date</label>

                    <input
                      type="text"
                      className="form-control"
                      value={payroll.paymentDate}
                      readOnly
                    />
                  </div>

                  {/* Payment Status */}

                  <div className="col-md-6 mt-4">
                    <label className="fw-bold">Payment Status</label>

                    <div className="mt-2">
                      <span
                        className={`badge fs-6 px-4 py-2 ${
                          payroll.paymentStatus === "PAID"
                            ? "bg-success"
                            : payroll.paymentStatus === "PENDING"
                              ? "bg-warning text-dark"
                              : "bg-secondary"
                        }`}
                      >
                        {payroll.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary px-4"
                    onClick={() => navigate("/payroll")}
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

export default ViewPayroll;
