import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout";

import {
  listPayrolls,
  deletePayroll,
  markAsPaid,
  markAsPending,
} from "../../services/PayrollService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaMoneyCheckAlt,
} from "react-icons/fa";

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);

  const [filteredPayrolls, setFilteredPayrolls] = useState([]);

  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    getAllPayrolls();
  }, []);

  const getAllPayrolls = () => {
    listPayrolls()
      .then((response) => {
        setPayrolls(response.data);

        setFilteredPayrolls(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    const filtered = payrolls.filter(
      (payroll) =>
        payroll.employeeName?.toLowerCase().includes(value.toLowerCase()) ||
        payroll.employeeCode?.toLowerCase().includes(value.toLowerCase()) ||
        payroll.month?.toLowerCase().includes(value.toLowerCase()) ||
        payroll.paymentStatus?.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredPayrolls(filtered);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this payroll record?")) {
      return;
    }

    deletePayroll(id)
      .then(() => {
        getAllPayrolls();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaid = (id) => {
    markAsPaid(id)
      .then(() => {
        getAllPayrolls();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handlePending = (id) => {
    markAsPending(id)
      .then(() => {
        getAllPayrolls();
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="card shadow">
          <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
            <h4 className="mb-0">
              <FaMoneyCheckAlt className="me-2" />
              Payroll Management
            </h4>

            {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
              <Link to="/add-payroll" className="btn btn-light">
                <FaPlus className="me-2" />
                Generate Payroll
              </Link>
            )}
          </div>

          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Employee / Month..."
                    value={search}
                    onChange={handleSearch}
                  />

                  <span className="input-group-text">
                    <FaSearch />
                  </span>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>

                    <th>Employee</th>

                    <th>Month</th>

                    <th>Year</th>

                    <th>Basic</th>

                    <th>Bonus</th>

                    <th>Deduction</th>

                    <th>Net Salary</th>

                    <th>Status</th>

                    <th width="330">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayrolls.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="text-center">
                        No Payroll Records Found
                      </td>
                    </tr>
                  ) : (
                    filteredPayrolls.map((payroll) => (
                      <tr key={payroll.id}>
                        <td>{payroll.id}</td>

                        <td>
                          <strong>{payroll.employeeCode}</strong>

                          <br />

                          {payroll.employeeName}
                        </td>

                        <td>{payroll.month}</td>

                        <td>{payroll.year}</td>

                        <td>₹ {payroll.basicSalary}</td>

                        <td className="text-success">₹ {payroll.bonus}</td>

                        <td className="text-danger">₹ {payroll.deduction}</td>

                        <td>
                          <strong className="text-primary">
                            ₹ {payroll.netSalary}
                          </strong>
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              payroll.paymentStatus === "PAID"
                                ? "bg-success"
                                : payroll.paymentStatus === "PENDING"
                                  ? "bg-warning text-dark"
                                  : "bg-info"
                            }`}
                          >
                            {payroll.paymentStatus}
                          </span>
                        </td>

                        <td>
                          <Link
                            to={`/view-payroll/${payroll.id}`}
                            className="btn btn-info btn-sm me-1"
                          >
                            <FaEye />
                          </Link>

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              <Link
                                to={`/edit-payroll/${payroll.id}`}
                                className="btn btn-warning btn-sm me-1"
                              >
                                <FaEdit />
                              </Link>
                            </>
                          )}

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              {payroll.paymentStatus !== "PAID" && (
                                <button
                                  className="btn btn-success btn-sm me-1"
                                  onClick={() => handlePaid(payroll.id)}
                                  title="Mark as Paid"
                                >
                                  <FaCheckCircle />
                                </button>
                              )}

                              {payroll.paymentStatus !== "PENDING" && (
                                <button
                                  className="btn btn-secondary btn-sm me-1"
                                  onClick={() => handlePending(payroll.id)}
                                  title="Mark as Pending"
                                >
                                  <FaClock />
                                </button>
                              )}

                              {role === "ROLE_ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => handleDelete(payroll.id)}
                                  title="Delete Payroll"
                                >
                                  <FaTrash />
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

            {/* Pagination Ready Footer */}

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">
                Total Payroll Records :{" "}
                <strong>{filteredPayrolls.length}</strong>
              </small>

              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <span className="page-link">Previous</span>
                  </li>

                  <li className="page-item active">
                    <span className="page-link">1</span>
                  </li>

                  <li className="page-item disabled">
                    <span className="page-link">Next</span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PayrollList;
