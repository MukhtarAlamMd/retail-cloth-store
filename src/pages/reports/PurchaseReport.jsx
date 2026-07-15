import { useEffect, useMemo, useState } from "react";
import Layout from "../../components/Layout";
import { getPurchaseReport } from "../../services/ReportService";

import {
  FaSearch,
  FaTruckLoading,
  FaPrint,
  FaFileExcel,
  FaFilePdf,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

const PurchaseReport = () => {
  const [purchases, setPurchases] = useState([]);
  const [filteredPurchases, setFilteredPurchases] = useState([]);

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPurchaseReport();
  }, [fromDate, toDate]);

  useEffect(() => {
    filterPurchases();
  }, [search, fromDate, toDate, purchases]);

  const loadPurchaseReport = async () => {
    try {
      setLoading(true);

      let start = fromDate;
      let end = toDate;

      // Default dates if empty
      if (!start) {
        const firstDay = new Date();
        firstDay.setDate(1);
        start = firstDay.toISOString().split("T")[0];
      }

      if (!end) {
        end = new Date().toISOString().split("T")[0];
      }

      const response = await getPurchaseReport(start, end);
      console.log(response.data);

      setPurchases(response.data);
      setFilteredPurchases(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterPurchases = () => {
    let data = [...purchases];

    if (search.trim() !== "") {
      data = data.filter(
        (item) =>
          (item.supplierName || "")
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          (item.productName || "").toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (fromDate !== "") {
      data = data.filter((item) => item.purchaseDate >= fromDate);
    }

    if (toDate !== "") {
      data = data.filter((item) => item.purchaseDate <= toDate);
    }

    setFilteredPurchases(data);
  };

  const totalPurchase = useMemo(() => {
    return filteredPurchases.reduce(
      (sum, item) => sum + (item.totalCost || 0),
      0,
    );
  }, [filteredPurchases]);

  const exportExcel = () => {
    alert("Excel Export will be added.");
  };

  const exportPdf = () => {
    alert("PDF Export will be added.");
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Layout>
      <div className="container-fluid mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold text-success">
            <FaTruckLoading className="me-2" />
            Purchase Report
          </h3>

          <div>
            <button className="btn btn-success me-2" onClick={exportExcel}>
              <FaFileExcel className="me-2" />
              Excel
            </button>

            <button className="btn btn-danger me-2" onClick={exportPdf}>
              <FaFilePdf className="me-2" />
              PDF
            </button>

            <button className="btn btn-dark" onClick={printReport}>
              <FaPrint className="me-2" />
              Print
            </button>
          </div>
        </div>

        <div className="card shadow border-0 mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-lg-4">
                <label className="form-label fw-semibold">
                  Search Supplier / Product
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

              <div className="col-lg-3">
                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-2" />
                  From Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-lg-3">
                <label className="form-label fw-semibold">
                  <FaCalendarAlt className="me-2" />
                  To Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-lg-2 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={loadPurchaseReport}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow border-0">
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between">
              <strong>Purchase List</strong>

              <strong className="text-success">
                <FaRupeeSign />

                {totalPurchase.toFixed(2)}
              </strong>
            </div>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>

                    <th>Date</th>

                    <th>Supplier</th>

                    <th>Product</th>

                    <th>Quantity</th>

                    <th>Total</th>

                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : filteredPurchases.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center text-danger">
                        No Purchase Records Found
                      </td>
                    </tr>
                  ) : (
                    filteredPurchases.map((purchase, index) => (
                      <tr key={purchase.purchaseId}>
                        <td>{index + 1}</td>

                        <td>{purchase.purchaseDate}</td>

                        <td>{purchase.supplierName}</td>

                        <td>{purchase.productName}</td>

                        <td>{purchase.quantityPurchased}</td>

                        <td>₹ {purchase.totalCost}</td>

                        <td>
                          <span
                            className={`badge ${
                              purchase.paymentStatus === "PAID"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {purchase.paymentStatus}
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

export default PurchaseReport;
