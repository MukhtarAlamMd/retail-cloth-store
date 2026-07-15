import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllCustomers } from "../../services/CustomerService";

import { getAllProducts } from "../../services/ProductService";

import { createSale } from "../../services/SaleService";

import {
  FaShoppingCart,
  FaUser,
  FaBox,
  FaSave,
  FaArrowLeft,
  FaWarehouse,
} from "react-icons/fa";

const AddSale = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);

  const [products, setProducts] = useState([]);

  const [sale, setSale] = useState({
    customerId: "",

    invoiceNumber: "INV-" + Date.now(),

    saleDate: new Date().toISOString().slice(0, 16),

    paymentStatus: "PENDING",
  });

  const [item, setItem] = useState({
    productId: "",

    quantity: 1,

    sellingPrice: 0,

    totalPrice: 0,

    stock: 0,
  });

  useEffect(() => {
    loadCustomers();

    loadProducts();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getAllCustomers();

      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();

      console.log(response.data);

      if (Array.isArray(response.data.content)) {
        setProducts(response.data.content);
      } else if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error(error);
      setProducts([]);
    }
  };

  const handleProduct = (id) => {
    const product = products.find((p) => p.id === Number(id));

    if (product) {
      setItem({
        productId: id,

        quantity: 1,

        sellingPrice: product.price,

        totalPrice: product.price,

        stock: product.stockQuantity,
      });
    }
  };

  const handleQuantity = (value) => {
    let qty = Number(value);

    if (qty <= 0) {
      qty = 1;
    }

    if (qty > item.stock) {
      alert(`Only ${item.stock} quantity available`);

      qty = item.stock;
    }

    setItem({
      ...item,

      quantity: qty,

      totalPrice: qty * item.sellingPrice,
    });
  };

  const submitSale = async (e) => {
    e.preventDefault();

    if (!sale.customerId) {
      alert("Please select customer");

      return;
    }

    if (!item.productId) {
      alert("Please select product");

      return;
    }

    if (item.quantity > item.stock) {
      alert("Insufficient stock");

      return;
    }

    const request = {
      ...sale,

      customerId: Number(sale.customerId),

      items: [
        {
          productId: Number(item.productId),

          quantity: item.quantity,

          sellingPrice: item.sellingPrice,

          totalPrice: item.totalPrice,
        },
      ],
    };

    try {
      console.log(request);

      await createSale(request);

      alert("Sale created successfully");

      navigate("/sales");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to create sale");
    }
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-lg border-0">
        <div
          className="card-header text-white"
          style={{
            background: "linear-gradient(135deg,#198754,#20c997)",
          }}
        >
          <h3 className="fw-bold mb-0">
            <FaShoppingCart className="me-2" />
            Create New Sale
          </h3>
        </div>

        <div className="card-body">
          <form onSubmit={submitSale}>
            {/* Customer */}

            <div className="row mb-3">
              <label className="col-md-3 fw-bold">
                <FaUser className="me-2" />
                Customer
              </label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  value={sale.customerId}
                  onChange={(e) =>
                    setSale({
                      ...sale,

                      customerId: e.target.value,
                    })
                  }
                >
                  <option value="">Select Customer</option>

                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.firstName
                        ? c.firstName + " " + c.lastName
                        : c.customerName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product */}

            <div className="row mb-3">
              <label className="col-md-3 fw-bold">
                <FaBox className="me-2" />
                Product
              </label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  value={item.productId}
                  onChange={(e) => handleProduct(e.target.value)}
                >
                  <option value="">Select Product</option>

                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}- Stock :{p.stockQuantity}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stock Card */}

            {item.productId && (
              <div className="alert alert-info">
                <FaWarehouse />
                Available Stock :<strong>{" " + item.stock}</strong>
                {item.stock <= 5 && (
                  <span className="text-danger ms-3">(Low Stock)</span>
                )}
              </div>
            )}

            {/* Quantity */}

            <div className="row mb-3">
              <label className="col-md-3 fw-bold">Quantity</label>

              <div className="col-md-9">
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  min="1"
                  max={item.stock}
                  onChange={(e) => handleQuantity(e.target.value)}
                />
              </div>
            </div>

            {/* Price */}

            <div className="row mb-3">
              <label className="col-md-3 fw-bold">Selling Price</label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  value={item.sellingPrice}
                  readOnly
                />
              </div>
            </div>

            {/* Total */}

            <div className="row mb-3">
              <label className="col-md-3 fw-bold">Total Amount</label>

              <div className="col-md-9">
                <input
                  className="form-control fw-bold"
                  value={item.totalPrice}
                  readOnly
                />
              </div>
            </div>

            {/* Payment */}

            <div className="row mb-4">
              <label className="col-md-3 fw-bold">Payment Status</label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  value={sale.paymentStatus}
                  onChange={(e) =>
                    setSale({
                      ...sale,

                      paymentStatus: e.target.value,
                    })
                  }
                >
                  <option value="PENDING">Pending</option>

                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>

            <div className="text-center">
              <button className="btn btn-success px-4 me-3">
                <FaSave className="me-2" />
                Save Sale
              </button>

              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={() => navigate("/sales")}
              >
                <FaArrowLeft className="me-2" />
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSale;
