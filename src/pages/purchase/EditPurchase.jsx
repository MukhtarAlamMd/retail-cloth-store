import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPurchaseById,
  updatePurchase,
} from "../../services/PurchaseService";
import { getAllProducts } from "../../services/ProductService";
import { getAllSuppliers } from "../../services/SupplierService";

const EditPurchase = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [purchase, setPurchase] = useState({
    supplierId: "",
    productId: "",
    quantityPurchased: "",
    purchasePrice: "",
    totalCost: 0,
    purchaseDate: "",
  });

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    loadPurchase();
    loadProducts();
    loadSuppliers();
  }, []);

  useEffect(() => {
    const total =
      Number(purchase.quantityPurchased || 0) *
      Number(purchase.purchasePrice || 0);

    setPurchase((prev) => ({
      ...prev,
      totalCost: total,
    }));
  }, [purchase.quantityPurchased, purchase.purchasePrice]);

  const loadPurchase = async () => {
    try {
      const response = await getPurchaseById(id);

      setPurchase({
        ...response.data,
        purchaseDate: response.data.purchaseDate
          ? response.data.purchaseDate.substring(0, 16)
          : "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (Array.isArray(response.data.content)) {
        setProducts(response.data.content);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const loadSuppliers = async () => {
    try {
      const response = await getAllSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
      setSuppliers([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPurchase((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Purchase:", purchase);

    try {
      await updatePurchase(id, purchase);

      alert("Purchase updated successfully.");

      navigate("/purchases");
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
      alert("Unable to update purchase.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning">
          <h3>Edit Purchase</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Supplier</label>

              <select
                className="form-select"
                name="supplierId"
                value={purchase.supplierId}
                onChange={handleChange}
                required
              >
                <option value="">Select Supplier</option>

                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Product</label>

              <select
                className="form-select"
                name="productId"
                value={purchase.productId}
                onChange={handleChange}
                required
              >
                <option value="">Select Product</option>

                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label>Purchase Date</label>

              <input
                type="datetime-local"
                className="form-control"
                name="purchaseDate"
                value={purchase.purchaseDate}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Quantity Purchased</label>

              <input
                type="number"
                className="form-control"
                name="quantityPurchased"
                value={purchase.quantityPurchased}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Purchase Price</label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                name="purchasePrice"
                value={purchase.purchasePrice}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Total Cost</label>

              <input
                type="number"
                className="form-control"
                value={purchase.totalCost}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label>Payment Status</label>

              <select
                className="form-select"
                name="paymentStatus"
                value={purchase.paymentStatus}
                onChange={handleChange}
              >
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
              </select>
            </div>

            <button type="submit" className="btn btn-warning me-2">
              Update Purchase
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/purchases")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPurchase;
