import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createPurchase } from "../../services/PurchaseService";
import { getAllProducts } from "../../services/ProductService";
import { getAllSuppliers } from "../../services/SupplierService";

const AddPurchase = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});

  const [purchase, setPurchase] = useState({
    supplierId: "",
    productId: "",
    quantityPurchased: "",
    purchasePrice: "",
    totalCost: 0,
    purchaseDate: new Date().toISOString().slice(0, 16),
    paymentStatus: "PENDING",
  });

  useEffect(() => {
    loadSuppliers();
    loadProducts();
  }, []);

  const loadSuppliers = async () => {
    try {
      const response = await getAllSuppliers();

      console.log(response.data);

      setSuppliers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else if (response.data.content) {
        setProducts(response.data.content);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updated = {
      ...purchase,
      [name]: value,
    };

    if (name === "quantityPurchased" || name === "purchasePrice") {
      const qty = Number(
        name === "quantityPurchased" ? value : updated.quantityPurchased,
      );

      const price = Number(
        name === "purchasePrice" ? value : updated.purchasePrice,
      );

      updated.totalCost = qty * price;
    }

    setPurchase(updated);
  };

  const validate = () => {
    const temp = {};

    if (!purchase.supplierId) temp.supplierId = "Select Supplier";
    if (!purchase.productId) temp.productId = "Select Product";

    if (!purchase.quantityPurchased || purchase.quantityPurchased <= 0)
      temp.quantityPurchased = "Invalid quantity";

    if (!purchase.purchasePrice || purchase.purchasePrice <= 0)
      temp.purchasePrice = "Invalid price";

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await createPurchase(purchase);
      alert("Purchase Added Successfully");
      navigate("/purchases");
    } catch (error) {
      console.error(error);
      alert("Unable to Save Purchase");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Add Purchase</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Supplier */}
            <div className="mb-3">
              <label>Supplier</label>
              <select
                className="form-select"
                name="supplierId"
                value={purchase.supplierId}
                onChange={handleChange}
              >
                <option value="">Select Supplier</option>

                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.supplierName}
                  </option>
                ))}
              </select>
              <small className="text-danger">{errors.supplierId}</small>
            </div>

            {/* Product */}
            <div className="mb-3">
              <label>Product</label>
              <select
                className="form-select"
                name="productId"
                value={purchase.productId}
                onChange={handleChange}
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <small className="text-danger">{errors.productId}</small>
            </div>

            {/* Quantity */}
            <div className="mb-3">
              <label>Quantity</label>
              <input
                type="number"
                className="form-control"
                name="quantityPurchased"
                value={purchase.quantityPurchased}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.quantityPurchased}</small>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label>Purchase Price</label>
              <input
                type="number"
                className="form-control"
                name="purchasePrice"
                value={purchase.purchasePrice}
                onChange={handleChange}
              />
              <small className="text-danger">{errors.purchasePrice}</small>
            </div>

            {/* Total */}
            <div className="mb-3">
              <label>Total Cost</label>
              <input
                type="number"
                className="form-control"
                value={purchase.totalCost}
                readOnly
              />
            </div>

            <button className="btn btn-success" type="submit">
              Save
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2"
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

export default AddPurchase;
