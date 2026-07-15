import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import {
  getAllSupplierPayments,
  deleteSupplierPayment,
} from "../../services/SupplierPaymentService";

import {
  FaMoneyBillWave,
  FaSearch,
  FaPlusCircle,
  FaWallet,
  FaReceipt,
  FaRupeeSign,
} from "react-icons/fa";

const SupplierPaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    getAllSupplierPayments()
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removePayment = (id) => {
    if (!window.confirm("Delete this payment?")) return;

    deleteSupplierPayment(id)
      .then(() => {
        loadPayments();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const filteredPayments = payments.filter((payment) =>
    payment.supplierName?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAmount = useMemo(() => {
    return filteredPayments.reduce(
      (sum, payment) => sum + Number(payment.amount || 0),
      0,
    );
  }, [filteredPayments]);

  const todayPayment = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];

    return filteredPayments.filter((payment) => payment.paymentDate === today)
      .length;
  }, [filteredPayments]);

  return (
    <Layout>
      <div className="container-fluid py-4">
        {/* Header */}

        <div
          className="p-4 rounded-4 shadow-lg text-white mb-4"
          style={{
            background: "linear-gradient(135deg,#0d6efd,#6610f2)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className="fw-bold mb-1">
                <FaMoneyBillWave className="me-2" />
                Supplier Payments
              </h2>

              <p className="mb-0 opacity-75">
                Manage all supplier payment transactions efficiently.
              </p>
            </div>

            {(role === "ROLE_ADMIN" || role === "ROLE_MANAGER") && (
              <Link
                to="/add-supplier-payment"
                className="btn btn-light btn-lg fw-bold shadow"
              >
                <FaPlusCircle className="me-2" />
                Add Payment
              </Link>
            )}
          </div>
        </div>

        {/* Dashboard Cards */}

        <div className="row g-4 mb-4">
          <div className="col-lg-4 col-md-6">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: 70,
                    height: 70,
                    background: "#0d6efd",
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaReceipt />
                </div>

                <div>
                  <h6 className="text-muted mb-1">Total Payments</h6>

                  <h2 className="fw-bold text-primary">
                    {filteredPayments.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: 70,
                    height: 70,
                    background: "#198754",
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaWallet />
                </div>

                <div>
                  <h6 className="text-muted mb-1">Total Amount Paid</h6>

                  <h2 className="fw-bold text-success">
                    ₹ {totalAmount.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6">
            <div className="card border-0 shadow rounded-4 h-100">
              <div className="card-body d-flex align-items-center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center me-3"
                  style={{
                    width: 70,
                    height: 70,
                    background: "#ffc107",
                    color: "#fff",
                    fontSize: 28,
                  }}
                >
                  <FaRupeeSign />
                </div>

                <div>
                  <h6 className="text-muted mb-1">Today's Payments</h6>

                  <h2 className="fw-bold text-warning">{todayPayment}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}

        <div className="card shadow rounded-4 border-0 mb-4">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-5">
                <div className="input-group">
                  <span className="input-group-text bg-primary text-white">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Supplier..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card border-0 shadow rounded-4">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead
                  style={{
                    background: "#0d6efd",
                    color: "#fff",
                  }}
                >
                  <tr>
                    <th>ID</th>
                    <th>Supplier</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Reference</th>
                    <th>Remarks</th>
                    <th width="230">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-5">
                        <FaMoneyBillWave
                          size={50}
                          className="text-secondary mb-3"
                        />

                        <h5 className="text-muted">
                          No Supplier Payments Found
                        </h5>

                        <p className="text-secondary">
                          Start by adding your first supplier payment.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((payment) => (
                      <tr key={payment.id}>
                        <td>
                          <strong>#{payment.id}</strong>
                        </td>

                        <td className="fw-semibold">{payment.supplierName}</td>

                        <td className="fw-bold text-success">
                          ₹ {Number(payment.amount).toLocaleString()}
                        </td>

                        <td>{payment.paymentDate}</td>

                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${
                              payment.paymentMethod === "Cash"
                                ? "bg-success"
                                : payment.paymentMethod === "UPI"
                                  ? "bg-primary"
                                  : payment.paymentMethod === "Cheque"
                                    ? "bg-warning text-dark"
                                    : payment.paymentMethod === "Bank Transfer"
                                      ? "bg-info text-dark"
                                      : "bg-secondary"
                            }`}
                          >
                            {payment.paymentMethod}
                          </span>
                        </td>

                        <td>{payment.referenceNumber || "-"}</td>

                        <td>{payment.remarks || "-"}</td>

                        <td>
                          <Link
                            to={`/view-supplier-payment/${payment.id}`}
                            className="btn btn-info btn-sm me-2"
                          >
                            👁 View
                          </Link>

                          {(role === "ROLE_ADMIN" ||
                            role === "ROLE_MANAGER") && (
                            <>
                              <Link
                                to={`/edit-supplier-payment/${payment.id}`}
                                className="btn btn-warning btn-sm me-2"
                              >
                                ✏ Edit
                              </Link>

                              {role === "ROLE_ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => removePayment(payment.id)}
                                >
                                  🗑 Delete
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

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <h6 className="mb-0">
                Total Payments :
                <span className="text-primary fw-bold ms-2">
                  {filteredPayments.length}
                </span>
              </h6>

              <h6 className="mb-0">
                Total Amount :
                <span className="text-success fw-bold ms-2">
                  ₹ {totalAmount.toLocaleString()}
                </span>
              </h6>
            </div>
          </div>
        </div>

        {/* Next Part: Modern Responsive Table with Badges, Action Buttons, Empty State, Hover Effects */}
      </div>
    </Layout>
  );
};

export default SupplierPaymentList;
