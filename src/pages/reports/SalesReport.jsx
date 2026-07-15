import { useEffect, useMemo, useState } from "react";

import Layout from "../../components/Layout";

import { getSalesReport } from "../../services/ReportService";

import {
  FaSearch,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaShoppingCart,
  FaRupeeSign,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const SalesReport = () => {
  const [sales, setSales] = useState([]);

  const [filteredSales, setFilteredSales] = useState([]);

  const [search, setSearch] = useState("");

  const [paymentFilter, setPaymentFilter] = useState("ALL");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(false);

  // ===============================
  // Load Sales Report
  // ===============================

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      setLoading(true);

      const response = await getSalesReport();

      const data = Array.isArray(response.data) ? response.data : [];

      setSales(data);

      setFilteredSales(data);
    } catch (error) {
      console.error("Sales Report Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Filtering
  // ===============================

  useEffect(() => {
    let data = [...sales];

    // Search Filter

    if (search.trim()) {
      data = data.filter(
        (sale) =>
          (sale.invoiceNumber || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (sale.customerName || "")
            .toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    // Payment Filter

    if (paymentFilter !== "ALL") {
      data = data.filter((sale) => sale.paymentStatus === paymentFilter);
    }

    // Date Filter

    if (fromDate) {
      data = data.filter(
        (sale) => new Date(sale.saleDate) >= new Date(fromDate),
      );
    }

    if (toDate) {
      data = data.filter((sale) => new Date(sale.saleDate) <= new Date(toDate));
    }

    setFilteredSales(data);
  }, [search, paymentFilter, fromDate, toDate, sales]);

  // ===============================
  // Summary Calculation
  // ===============================

  const totalSales = useMemo(() => {
    return filteredSales.reduce(
      (sum, item) => sum + Number(item.totalAmount || 0),

      0,
    );
  }, [filteredSales]);

  const totalPaid = useMemo(() => {
    return filteredSales
      .filter((item) => (item.paymentStatus === item.paymentStatus) === "PAID")
      .reduce(
        (sum, item) => sum + Number(item.totalAmount || 0),

        0,
      );
  }, [filteredSales]);

  const totalPending = useMemo(() => {
    return filteredSales
      .filter((item) => item.paymentStatus === "PENDING")
      .reduce(
        (sum, item) => sum + Number(item.totalAmount || 0),

        0,
      );
  }, [filteredSales]);

  // ===============================
  // Payment Badge
  // ===============================

  const paymentBadge = (status) => {
    switch (status) {
      case "PAID":
        return "bg-success";

      case "PENDING":
        return "bg-warning text-dark";

      case "FAILED":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        {/* Header */}

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-primary">
            <FaShoppingCart className="me-2" />
            Sales Report
          </h3>

          <div>
            <button
              className="btn btn-success me-2"
              onClick={() => alert("Excel export coming")}
            >
              <FaFileExcel className="me-2" />
              Excel
            </button>

            <button
              className="btn btn-danger me-2"
              onClick={() => alert("PDF export coming")}
            >
              <FaFilePdf className="me-2" />
              PDF
            </button>

            <button className="btn btn-dark" onClick={() => window.print()}>
              <FaPrint className="me-2" />
              Print
            </button>
          </div>
        </div>

        {/* Summary Cards */}

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h6 className="text-muted">Total Sales</h6>

                <h3 className="text-primary">
                  <FaRupeeSign />

                  {totalSales.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h6 className="text-muted">Paid Amount</h6>

                <h3 className="text-success">
                  <FaCheckCircle className="me-2" />₹ {totalPaid.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0">
              <div className="card-body">
                <h6 className="text-muted">Pending Amount</h6>

                <h3 className="text-warning">
                  <FaClock className="me-2" />₹ {totalPending.toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}

        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold">
                  Search Invoice / Customer
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <FaSearch />
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-md-2">
                <label className="form-label fw-bold">Payment</label>

                <select
                  className="form-select"
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                >
                  <option value="ALL">All</option>

                  <option value="PAID">Paid</option>

                  <option value="PENDING">Pending</option>
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold">From Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label fw-bold">To Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sales Table */}

        <div className="card shadow border-0">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Invoice</th>

                    <th>Date</th>

                    <th>Customer</th>

                    <th>Total Amount</th>

                    <th>Payment Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredSales.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-danger">
                        No Sales Found
                      </td>
                    </tr>
                  ) : (
                    filteredSales.map((sale, index) => (
                      <tr key={sale.saleId}>
                        <td>{index + 1}</td>

                        <td>{sale.invoiceNumber}</td>

                        <td>
                          {sale.saleDate
                            ? new Date(sale.saleDate).toLocaleString()
                            : "-"}
                        </td>

                        <td>{sale.customerName}</td>

                        <td>₹ {Number(sale.totalAmount || 0).toFixed(2)}</td>

                        <td>
                          <span
                            className={`badge ${paymentBadge(
                              sale.paymentStatus,
                            )}`}
                          >
                            {sale.paymentStatus || "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))
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

export default SalesReport;
