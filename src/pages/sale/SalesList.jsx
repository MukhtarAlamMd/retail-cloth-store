import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSales, deleteSale } from "../../services/SaleService";

import {
  FaCashRegister,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaReceipt,
} from "react-icons/fa";

const SalesList = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const response = await getAllSales();

      if (Array.isArray(response.data)) {
        setSales(response.data);
      } else if (Array.isArray(response.data.content)) {
        setSales(response.data.content);
      } else {
        setSales([]);
      }
    } catch (error) {
      console.error(error);
      alert("Unable to load sales.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sale?")) return;

    try {
      await deleteSale(id);
      loadSales();
    } catch (error) {
      console.error(error);
      alert("Unable to delete sale.");
    }
  };

  const filteredSales = sales.filter((sale) =>
    `${sale.invoiceNumber || ""} ${sale.customerName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + Number(sale.grandTotal || 0),
    0,
  );

  const totalPaid = filteredSales.filter(
    (sale) => sale.paymentStatus === "PAID",
  ).length;

  const totalPending = filteredSales.filter(
    (sale) => sale.paymentStatus !== "PAID",
  ).length;

  return (
    <div className="container-fluid py-4">
      {/* Header */}

      <div className="card border-0 shadow-lg mb-4">
        <div
          className="card-body text-white"
          style={{
            background: "linear-gradient(135deg,#198754,#20c997,#0dcaf0)",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                <FaCashRegister className="me-2" />
                Sales Management
              </h2>

              <p className="mb-0">Manage all customer sales efficiently.</p>
            </div>

            <div>
              <button
                className="btn btn-light me-2 shadow"
                onClick={() => navigate("/add-sale")}
              >
                <FaPlus className="me-2" />
                Add Sale
              </button>

              <button
                className="btn btn-dark shadow"
                onClick={() => navigate("/dashboard")}
              >
                <FaArrowLeft className="me-2" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="row mb-4">
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaReceipt size={40} className="text-primary mb-3" />

              <h3>{filteredSales.length}</h3>

              <p className="text-muted mb-0">Total Sales</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaCheckCircle size={40} className="text-success mb-3" />

              <h3>{totalPaid}</h3>

              <p className="text-muted mb-0">Paid Sales</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaClock size={40} className="text-warning mb-3" />

              <h3>{totalPending}</h3>

              <p className="text-muted mb-0">Pending Sales</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaRupeeSign size={40} className="text-danger mb-3" />

              <h4>₹ {totalRevenue.toLocaleString()}</h4>

              <p className="text-muted mb-0">Total Revenue</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-success text-white">
              <FaSearch />
            </span>

            <input
              className="form-control"
              placeholder="Search Invoice or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Sales Table */}

      <div className="card border-0 shadow-lg">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              className="text-white"
              style={{
                background: "linear-gradient(90deg,#198754,#20c997)",
              }}
            >
              <tr>
                <th>#</th>

                <th>Invoice</th>

                <th>Customer</th>

                <th>Date</th>

                <th>Total</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <div
                      className="spinner-border text-success"
                      role="status"
                    ></div>

                    <p className="mt-3 mb-0">Loading Sales...</p>
                  </td>
                </tr>
              ) : filteredSales.length > 0 ? (
                filteredSales.map((sale, index) => (
                  <tr key={sale.id}>
                    <td>
                      <strong>{index + 1}</strong>
                    </td>

                    <td>
                      <span className="badge bg-primary fs-6">
                        {sale.invoiceNumber}
                      </span>
                    </td>

                    <td className="fw-semibold">{sale.customerName}</td>

                    <td>
                      {sale.saleDate
                        ? new Date(sale.saleDate).toLocaleString()
                        : "-"}
                    </td>

                    <td className="fw-bold text-success">
                      ₹ {Number(sale.grandTotal || 0).toLocaleString()}
                    </td>

                    <td>
                      {sale.paymentStatus === "PAID" ? (
                        <span className="badge bg-success px-3 py-2">
                          <FaCheckCircle className="me-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark px-3 py-2">
                          <FaClock className="me-1" />
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm me-2"
                        title="View"
                        onClick={() => navigate(`/view-sale/${sale.id}`)}
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        title="Edit"
                        onClick={() => navigate(`/edit-sale/${sale.id}`)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete"
                        onClick={() => handleDelete(sale.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <FaCashRegister size={70} className="text-secondary mb-3" />

                    <h4 className="text-muted">No Sales Found</h4>

                    <p className="text-muted">
                      Click "Add Sale" to create your first sale.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesList;
