import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPurchaseById } from "../../services/PurchaseService";

const ViewPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [purchase, setPurchase] = useState({
    supplierName: "",
    productName: "",
    purchaseDate: "",
    quantity: 0,
    costPrice: 0,
    totalAmount: 0,
    paymentStatus: "",
  });

  useEffect(() => {
    loadPurchase();
  }, []);

  const loadPurchase = async () => {
    try {
      const response = await getPurchaseById(id);
      setPurchase(response.data);
    } catch (error) {
      console.error("Error loading purchase:", error);
      alert("Unable to load purchase details.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">View Purchase</h3>
        </div>

        <div className="card-body">
          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Purchase ID</label>

            <div className="col-md-9">{id}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Supplier</label>

            <div className="col-md-9">{purchase.supplierName}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Product</label>

            <div className="col-md-9">{purchase.productName}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Purchase Date</label>

            <div className="col-md-9">{purchase.purchaseDate}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Quantity</label>

            <div className="col-md-9">{purchase.quantityPurchased}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Cost Price</label>

            <div className="col-md-9">₹ {purchase.purchasePrice}</div>
          </div>

          <div className="row mb-3">
            <label className="col-md-3 fw-bold">Total Amount</label>

            <div className="col-md-9">₹ {purchase.totalCost}</div>
          </div>

          <div className="row mb-4">
            <label className="col-md-3 fw-bold">Payment Status</label>

            <div className="col-md-9">
              {purchase.paymentStatus === "PAID" ? (
                <span className="badge bg-success">Paid</span>
              ) : (
                <span className="badge bg-warning text-dark">Pending</span>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/purchases")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;
