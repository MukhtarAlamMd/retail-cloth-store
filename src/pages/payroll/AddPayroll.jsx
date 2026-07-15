import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";

import { createPayroll } from "../../services/PayrollService";
import { listEmployees } from "../../services/EmployeeService";

import {
  FaMoneyCheckAlt,
  FaSave,
  FaArrowLeft,
  FaUserTie,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

const AddPayroll = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [payroll, setPayroll] = useState({
    employeeId: "",

    month: "",

    year: new Date().getFullYear(),

    basicSalary: "",

    bonus: 0,

    deduction: 0,

    netSalary: 0,

    paymentDate: "",

    paymentStatus: "PENDING",
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    calculateNetSalary();
  }, [payroll.basicSalary, payroll.bonus, payroll.deduction]);

  const loadEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const calculateNetSalary = () => {
    const basic = parseFloat(payroll.basicSalary) || 0;

    const bonus = parseFloat(payroll.bonus) || 0;

    const deduction = parseFloat(payroll.deduction) || 0;

    const netSalary = basic + bonus - deduction;

    setPayroll((prev) => ({
      ...prev,
      netSalary,
    }));
  };

  const handleChange = (e) => {
    setPayroll({
      ...payroll,

      [e.target.name]: e.target.value,
    });
  };

  // Save Payroll
  const savePayroll = (e) => {
    e.preventDefault();

    if (payroll.employeeId === "") {
      alert("Please select an employee.");
      return;
    }

    if (payroll.month === "") {
      alert("Please select month.");
      return;
    }

    if (payroll.basicSalary === "") {
      alert("Please enter basic salary.");
      return;
    }

    if (Number(payroll.basicSalary) < 0) {
      alert("Basic salary cannot be negative.");
      return;
    }

    if (Number(payroll.bonus) < 0) {
      alert("Bonus cannot be negative.");
      return;
    }

    if (Number(payroll.deduction) < 0) {
      alert("Deduction cannot be negative.");
      return;
    }

    if (payroll.paymentDate === "") {
      alert("Please select payment date.");
      return;
    }

    setLoading(true);

    createPayroll(payroll)
      .then(() => {
        alert("Payroll Generated Successfully.");

        navigate("/payroll");
      })

      .catch((error) => {
        console.log(error);

        if (error.response?.data?.message) {
          alert(error.response.data.message);
        } else {
          alert("Unable to generate payroll.");
        }
      })

      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      <div className="container mt-4">
        <div className="card shadow border-0">
          <div className="card-header bg-success text-white">
            <h3 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              Generate Payroll
            </h3>
          </div>

          <div className="card-body">
            <form onSubmit={savePayroll}>
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
                    value={payroll.employeeId}
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

                {/* Month */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-bold">
                    <FaCalendarAlt className="me-2" />
                    Month
                  </label>

                  <select
                    className="form-select"
                    name="month"
                    value={payroll.month}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Month</option>

                    <option value="January">January</option>
                    <option value="February">February</option>
                    <option value="March">March</option>
                    <option value="April">April</option>
                    <option value="May">May</option>
                    <option value="June">June</option>
                    <option value="July">July</option>
                    <option value="August">August</option>
                    <option value="September">September</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                {/* Year */}

                <div className="col-md-3 mb-3">
                  <label className="form-label fw-bold">Year</label>

                  <input
                    type="number"
                    className="form-control"
                    name="year"
                    value={payroll.year}
                    onChange={handleChange}
                    min="2020"
                    max="2100"
                    required
                  />
                </div>

                {/* Basic Salary */}

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">
                    <FaRupeeSign className="me-2" />
                    Basic Salary
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="basicSalary"
                    value={payroll.basicSalary}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                {/* Bonus */}

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Bonus</label>

                  <input
                    type="number"
                    className="form-control"
                    name="bonus"
                    value={payroll.bonus}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                {/* Deduction */}

                <div className="col-md-4 mb-3">
                  <label className="form-label fw-bold">Deduction</label>

                  <input
                    type="number"
                    className="form-control"
                    name="deduction"
                    value={payroll.deduction}
                    onChange={handleChange}
                    min="0"
                  />
                </div>

                {/* Net Salary */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-success">
                    Net Salary
                  </label>

                  <input
                    type="number"
                    className="form-control fw-bold bg-light"
                    value={payroll.netSalary}
                    readOnly
                  />
                </div>

                {/* Payment Date */}

                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Payment Date</label>

                  <input
                    type="date"
                    className="form-control"
                    name="paymentDate"
                    value={payroll.paymentDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Payment Status */}

                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold">Payment Status</label>

                  <select
                    className="form-select"
                    name="paymentStatus"
                    value={payroll.paymentStatus}
                    onChange={handleChange}
                  >
                    <option value="PENDING">Pending</option>

                    <option value="PAID">Paid</option>
                  </select>
                </div>

                {/* Buttons */}

                <div className="col-12">
                  <hr />

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => navigate("/payroll")}
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
                          Generate Payroll
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

export default AddPayroll;
