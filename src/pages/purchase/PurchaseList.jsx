import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAllPurchases,
  deletePurchase,
} from "../../services/PurchaseService";

import {
  FaShoppingCart,
  FaPlus,
  FaArrowLeft,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
  FaBoxes,
} from "react-icons/fa";

const PurchaseList = () => {
  const navigate = useNavigate();

  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {
    try {
      const response = await getAllPurchases();

      setPurchases(
        Array.isArray(response.data)
          ? response.data
          : response.data.content || [],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this purchase?")) return;

    try {
      await deletePurchase(id);

      loadPurchases();
    } catch (error) {
      console.error(error);
      alert("Unable to delete purchase.");
    }
  };

  const filteredPurchases = purchases.filter((purchase) =>
    `${purchase.productName || ""} ${purchase.supplierName || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalAmount = filteredPurchases.reduce(
    (sum, purchase) => sum + Number(purchase.totalCost || 0),
    0,
  );

  const totalPaid = filteredPurchases.filter(
    (purchase) => purchase.paymentStatus === "PAID",
  ).length;

  const totalPending = filteredPurchases.filter(
    (purchase) => purchase.paymentStatus !== "PAID",
  ).length;

  return (
    <div className="container-fluid py-4">
      {/* Header */}

      <div className="card shadow-lg border-0 mb-4">
        <div
          className="card-body text-white"
          style={{
            background: "linear-gradient(135deg,#0d6efd,#4e73df,#6610f2)",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="fw-bold mb-2">
                <FaShoppingCart className="me-2" />
                Purchase Management
              </h2>

              <p className="mb-0">
                Manage all purchase transactions quickly and efficiently.
              </p>
            </div>

            <div>
              <button
                className="btn btn-light me-2 shadow"
                onClick={() => navigate("/add-purchase")}
              >
                <FaPlus className="me-2" />
                Add Purchase
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
              <FaShoppingCart size={40} className="text-primary mb-3" />

              <h3>{filteredPurchases.length}</h3>

              <p className="text-muted mb-0">Total Purchases</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaCheckCircle size={40} className="text-success mb-3" />

              <h3>{totalPaid}</h3>

              <p className="text-muted mb-0">Paid Purchases</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaClock size={40} className="text-warning mb-3" />

              <h3>{totalPending}</h3>

              <p className="text-muted mb-0">Pending Payments</p>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card border-0 shadow h-100">
            <div className="card-body text-center">
              <FaRupeeSign size={40} className="text-danger mb-3" />

              <h4>₹ {totalAmount.toLocaleString()}</h4>

              <p className="text-muted mb-0">Total Amount</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}

      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-primary text-white">
              <FaSearch />
            </span>

            <input
              className="form-control"
              placeholder="Search Supplier or Product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Purchase Table */}

      <div className="card border-0 shadow-lg">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead
              className="text-white"
              style={{
                background: "linear-gradient(90deg,#0d6efd,#6610f2)",
              }}
            >
              <tr>
                <th>ID</th>

                <th>Supplier</th>

                <th>Product</th>

                <th>Date</th>

                <th>Quantity</th>

                <th>Price</th>

                <th>Total</th>

                <th>Status</th>

                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPurchases.length > 0 ? (
                filteredPurchases.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>
                      <strong>#{purchase.id}</strong>
                    </td>

                    <td className="fw-semibold">{purchase.supplierName}</td>

                    <td>
                      <FaBoxes className="text-primary me-2" />

                      {purchase.productName}
                    </td>

                    <td>{purchase.purchaseDate}</td>

                    <td>
                      <span className="badge bg-info fs-6">
                        {purchase.quantityPurchased}
                      </span>
                    </td>

                    <td>₹ {purchase.purchasePrice}</td>

                    <td className="fw-bold text-success">
                      ₹ {purchase.totalCost}
                    </td>

                    <td>
                      {purchase.paymentStatus === "PAID" ? (
                        <span className="badge bg-success px-3 py-2">Paid</span>
                      ) : (
                        <span className="badge bg-warning text-dark px-3 py-2">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm me-2"
                        title="View Purchase"
                        onClick={() =>
                          navigate(`/view-purchase/${purchase.id}`)
                        }
                      >
                        <FaEye />
                      </button>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        title="Edit Purchase"
                        onClick={() =>
                          navigate(`/edit-purchase/${purchase.id}`)
                        }
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        title="Delete Purchase"
                        onClick={() => handleDelete(purchase.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <FaShoppingCart size={70} className="text-secondary mb-3" />

                    <h4 className="text-muted">No Purchase Records Found</h4>

                    <p className="text-muted">
                      Click "Add Purchase" to create your first purchase.
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

export default PurchaseList;
