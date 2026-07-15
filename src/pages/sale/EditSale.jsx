import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSaleById, updateSale } from "../../services/SaleService";

import { getAllCustomers } from "../../services/CustomerService";
import { getAllProducts } from "../../services/ProductService";

const EditSale = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [sale, setSale] = useState({
    customerId: "",
    invoiceNumber: "",
    saleDate: "",
    paymentStatus: "PENDING",
  });

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      sellingPrice: 0,
      totalPrice: 0,
    },
  ]);

  useEffect(() => {
    loadCustomers();
    loadProducts();
    loadSale();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await getAllCustomers();

      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        setCustomers(response.data.content || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await getAllProducts();

      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts(response.data.content || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadSale = async () => {
    try {
      const response = await getSaleById(id);

      const data = response.data;

      setSale({
        customerId: data.customerId,
        invoiceNumber: data.invoiceNumber,
        saleDate: data.saleDate?.substring(0, 16),
        paymentStatus: data.paymentStatus,
      });

      setItems(data.items);
    } catch (error) {
      console.error(error);
      alert("Unable to load sale.");
    }
  };

  const handleSaleChange = (e) => {
    const { name, value } = e.target;

    setSale({
      ...sale,
      [name]: value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    updatedItems[index][field] = value;

    if (field === "productId") {
      const product = products.find((p) => p.id === Number(value));

      if (product) {
        updatedItems[index].sellingPrice = product.price;
      }
    }

    updatedItems[index].totalPrice =
      updatedItems[index].quantity * updatedItems[index].sellingPrice;

    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        productId: "",
        quantity: 1,
        sellingPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirm = window.confirm("Update this sale?");

    if (!confirm) return;

    const saleRequest = {
      ...sale,

      customerId: Number(sale.customerId),

      items: items.map((item) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
        sellingPrice: Number(item.sellingPrice),
        totalPrice: Number(item.totalPrice),
      })),
    };

    try {
      await updateSale(id, saleRequest);

      alert("Sale updated successfully.");

      navigate("/sales");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Unable to update sale.");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3>Edit Sale</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label className="col-md-3">Customer</label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  name="customerId"
                  value={sale.customerId}
                  onChange={handleSaleChange}
                >
                  <option value="">Select Customer</option>

                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.firstName} {customer.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3">Invoice</label>

              <div className="col-md-9">
                <input
                  className="form-control"
                  value={sale.invoiceNumber}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-3">
              <label className="col-md-3">Sale Date</label>

              <div className="col-md-9">
                <input
                  type="datetime-local"
                  className="form-control"
                  name="saleDate"
                  value={sale.saleDate}
                  onChange={handleSaleChange}
                />
              </div>
            </div>

            <hr />

            <h5>Products</h5>

            {items.map((item, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                <select
                  className="form-select mb-2"
                  value={item.productId}
                  onChange={(e) =>
                    handleItemChange(index, "productId", e.target.value)
                  }
                >
                  <option value="">Select Product</option>

                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>

                <input
                  className="form-control mb-2"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", Number(e.target.value))
                  }
                />

                <input
                  className="form-control mb-2"
                  value={item.sellingPrice}
                  readOnly
                />

                <input
                  className="form-control mb-2"
                  value={item.totalPrice}
                  readOnly
                />

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              className="btn btn-success mb-3"
              onClick={addItem}
            >
              + Add Product
            </button>

            <div className="row mb-4">
              <label className="col-md-3">Payment</label>

              <div className="col-md-9">
                <select
                  className="form-select"
                  name="paymentStatus"
                  value={sale.paymentStatus}
                  onChange={handleSaleChange}
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary me-2" type="submit">
              Update Sale
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/sales")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditSale;
